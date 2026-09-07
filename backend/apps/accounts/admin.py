from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import OTPVerification, User, UserProfile


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Admin configuration for the custom User model.
    """

    ordering = ("-created_at",)

    list_display = (
        "email",
        "phone_number",
        "account_type",
        "is_email_verified",
        "is_phone_verified",
        "is_staff",
        "is_active",
        "created_at",
    )

    list_filter = (
        "account_type",
        "is_email_verified",
        "is_phone_verified",
        "is_staff",
        "is_superuser",
        "is_active",
    )

    search_fields = (
        "email",
        "phone_number",
        "first_name",
        "last_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
        "last_login",
        "date_joined",
    )

    fieldsets = (
        (
            "Login Information",
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (
            "Personal Information",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "phone_number",
                )
            },
        ),
        (
            "Verification",
            {
                "fields": (
                    "is_email_verified",
                    "is_phone_verified",
                )
            },
        ),
        (
            "Account",
            {
                "fields": (
                    "account_type",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Important Dates",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    add_fieldsets = (
        (
            "Create User",
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "phone_number",
                    "account_type",
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """
    Admin configuration for user profiles.
    """

    list_display = (
        "user",
        "company",
        "designation",
        "city",
        "country",
        "created_at",
    )

    search_fields = (
        "user__email",
        "company",
        "designation",
        "city",
        "country",
    )

    list_filter = (
        "country",
        "created_at",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-created_at",
    )


@admin.register(OTPVerification)
class OTPVerificationAdmin(admin.ModelAdmin):
    """
    Admin configuration for OTP verification records.
    """

    list_display = (
        "phone_number",
        "user",
        "otp_type",
        "is_verified",
        "attempts",
        "expires_at",
        "verified_at",
        "created_at",
    )

    search_fields = (
        "phone_number",
        "user__email",
    )

    list_filter = (
        "otp_type",
        "is_verified",
        "created_at",
    )

    readonly_fields = (
        "created_at",
        "verified_at",
    )

    ordering = (
        "-created_at",
    )