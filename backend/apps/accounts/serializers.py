from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User
from django.utils import timezone
from datetime import timedelta

from .security import (
    LOGIN_BLOCK_MINUTES,
    LOGIN_MAX_ATTEMPTS,
)


class UserSerializer(serializers.ModelSerializer):
    """
    Safe public representation of the authenticated user.
    """

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "phone_number",
            "first_name",
            "last_name",
            "is_email_verified",
            "is_phone_verified",
            "account_type",
            "date_joined",
        ]
        read_only_fields = [
            "id",
            "is_email_verified",
            "is_phone_verified",
            "account_type",
            "date_joined",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    """
    Handles new user registration.
    """

    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"},
    )

    password_confirm = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = [
            "email",
            "phone_number",
            "first_name",
            "last_name",
            "password",
            "password_confirm",
        ]

    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return value

    def validate_phone_number(self, value):
        if not value:
            return value

        value = value.strip()

        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError(
                "An account with this phone number already exists."
            )

        return value

    def validate(self, attrs):
        password = attrs.get("password")
        password_confirm = attrs.pop("password_confirm", None)

        if password != password_confirm:
            raise serializers.ValidationError(
                {
                    "password_confirm": "Passwords do not match."
                }
            )

        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)

        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    """
    Validates email/password credentials.
    """

    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )

    def validate(self, attrs):
        email = attrs.get("email", "").strip().lower()
        password = attrs.get("password")

        try:
            user = User.objects.get(
                email__iexact=email
            )
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        now = timezone.now()

        if (
            user.login_blocked_until
            and user.login_blocked_until > now
        ):
            remaining_seconds = int(
                (
                    user.login_blocked_until - now
                ).total_seconds()
            )

            remaining_minutes = max(
                1,
                (remaining_seconds + 59) // 60,
            )

            raise serializers.ValidationError(
                f"Too many failed login attempts. "
                f"Try again in {remaining_minutes} minutes."
            )

        authenticated_user = authenticate(
            request=self.context.get("request"),
            username=email,
            password=password,
        )

        if not authenticated_user:
            user.failed_login_attempts += 1

            if (
                user.failed_login_attempts
                >= LOGIN_MAX_ATTEMPTS
            ):
                user.login_blocked_until = (
                    now
                    + timedelta(
                        minutes=LOGIN_BLOCK_MINUTES
                    )
                )

            user.save(
                update_fields=[
                    "failed_login_attempts",
                    "login_blocked_until",
                ]
            )

            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not authenticated_user.is_active:
            raise serializers.ValidationError(
                "This account is inactive."
            )

        user.failed_login_attempts = 0
        user.login_blocked_until = None

        user.save(
            update_fields=[
                "failed_login_attempts",
                "login_blocked_until",
            ]
        )

        attrs["user"] = authenticated_user

        return attrs