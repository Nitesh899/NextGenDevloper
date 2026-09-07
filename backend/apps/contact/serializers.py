from rest_framework import serializers

from .models import ContactInquiry


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = [
            "name",
            "email",
            "phone_number",
            "subject",
            "message",
            "inquiry_type",
            "priority",
        ]

    def validate_name(self, value):
        value = value.strip()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Name must contain at least 2 characters."
            )

        if len(value) > 150:
            raise serializers.ValidationError(
                "Name is too long."
            )

        return value

    def validate_email(self, value):
        value = value.strip().lower()

        if len(value) > 254:
            raise serializers.ValidationError(
                "Email address is too long."
            )
        return value

    def validate_phone_number(self, value):
        value = value.strip()

        if len(value) > 20:
            raise serializers.ValidationError(
                "Phone number is too long."
            )
        return value

    def validate_subject(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Subject must contain at least 3 characters."
            )

        if len(value) > 255:
            raise serializers.ValidationError(
                "Subject is too long."
            )

        return value

    def validate_message(self, value):
        value = value.strip()

        if len(value) < 10:
            raise serializers.ValidationError(
                "Message must contain at least 10 characters."
            )

        if len(value) > 10000:
            raise serializers.ValidationError(
                "Message is too long."
            )

        return value