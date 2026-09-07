from django.db import transaction
from rest_framework import serializers

from .models import QuoteRequest, QuoteService


class QuoteServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteService
        fields = [
            "service_name",
            "description",
            "estimated_quantity",
        ]

    def validate_service_name(self, value):
        value = value.strip()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Service name must contain at least 2 characters."
            )

        if len(value) > 150:
            raise serializers.ValidationError(
                "Service name is too long."
            )

        return value

    def validate_description(self, value):
        value = value.strip()

        if len(value) > 5000:
            raise serializers.ValidationError(
                "Service description is too long."
            )

        return value

    def validate_estimated_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Quantity must be at least 1."
            )

        if value > 100:
            raise serializers.ValidationError(
                "Quantity cannot be greater than 100."
            )

        return value


class QuoteRequestSerializer(serializers.ModelSerializer):
    services = QuoteServiceSerializer(
        many=True,
        required=False,
    )

    class Meta:
        model = QuoteRequest
        fields = [
            "name",
            "email",
            "phone_number",
            "company_name",
            "project_type",
            "project_title",
            "project_description",
            "required_features",
            "existing_website",
            "budget_range",
            "timeline",
            "preferred_technologies",
            "additional_notes",
            "priority",
            "services",
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

    def validate_company_name(self, value):
        value = value.strip()

        if len(value) > 200:
            raise serializers.ValidationError(
                "Company name is too long."
            )

        return value

    def validate_project_title(self, value):
        value = value.strip()

        if len(value) > 200:
            raise serializers.ValidationError(
                "Project title is too long."
            )

        return value

    def validate_project_description(self, value):
        value = value.strip()

        if len(value) < 20:
            raise serializers.ValidationError(
                "Project description must contain at least 20 characters."
            )

        if len(value) > 20000:
            raise serializers.ValidationError(
                "Project description is too long."
            )

        return value

    def validate_required_features(self, value):
        value = value.strip()

        if len(value) > 10000:
            raise serializers.ValidationError(
                "Required features are too long."
            )

        return value


    def validate_existing_website(self, value):
        return value.strip()

    def validate_preferred_technologies(self, value):
        value = value.strip()

        if len(value) > 5000:
            raise serializers.ValidationError(
                "Preferred technologies are too long."
            )

        return value

    def validate_additional_notes(self, value):
        value = value.strip()

        if len(value) > 10000:
            raise serializers.ValidationError(
                "Additional notes are too long."
            )

        return value

    def validate_services(self, value):
        if len(value) > 20:
            raise serializers.ValidationError(
                "You can request a maximum of 20 services."
            )

        return value


    @transaction.atomic
    def create(self, validated_data):
        services_data = validated_data.pop(
            "services",
            [],
        )

        quote_request = QuoteRequest.objects.create(
            **validated_data
        )

        QuoteService.objects.bulk_create(
            [
                QuoteService(
                    quote_request=quote_request,
                    **service_data,
                )
                for service_data in services_data
            ]
        )

        return quote_request