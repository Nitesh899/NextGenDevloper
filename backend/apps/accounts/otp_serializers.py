from django.utils import timezone
from rest_framework import serializers

from .models import OTPVerification
from .security import OTP_MAX_ATTEMPTS


class SendOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

    def validate_phone_number(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Phone number is required."
            )

        return value


class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

    otp_code = serializers.CharField(
        max_length=6,
        min_length=6,
    )

    def validate_phone_number(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Phone number is required."
            )

        return value

    def validate_otp_code(self, value):
        value = value.strip()

        if not value.isdigit():
            raise serializers.ValidationError(
                "OTP must contain only numbers."
            )

        if len(value) != 6:
            raise serializers.ValidationError(
                "OTP must be exactly 6 digits."
            )

        return value

    def validate(self, attrs):
        phone_number = attrs["phone_number"]
        otp_code = attrs["otp_code"]

        otp = (
            OTPVerification.objects
            .filter(
                phone_number=phone_number,
                is_verified=False,
            )
            .order_by("-created_at")
            .first()
        )

        if not otp:
            raise serializers.ValidationError(
                "No active OTP found."
            )

        if otp.expires_at <= timezone.now():
            raise serializers.ValidationError(
                "OTP has expired. Please request a new OTP."
            )

        if otp.attempts >= OTP_MAX_ATTEMPTS:
            raise serializers.ValidationError(
                "Maximum OTP attempts exceeded. Please request a new OTP."
            )

        if otp.otp_code != otp_code:
            otp.attempts += 1

            otp.save(
                update_fields=[
                    "attempts",
                ]
            )

            remaining_attempts = max(
                0,
                OTP_MAX_ATTEMPTS - otp.attempts,
            )

            if remaining_attempts == 0:
                raise serializers.ValidationError(
                    "Maximum OTP attempts exceeded. Please request a new OTP."
                )

            raise serializers.ValidationError(
                f"Invalid OTP. {remaining_attempts} attempts remaining."
            )

        attrs["otp"] = otp

        return attrs


class ResendOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

    def validate_phone_number(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Phone number is required."
            )

        return value


