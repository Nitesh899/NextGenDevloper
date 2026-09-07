from django.contrib import admin

from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    """
    Admin configuration for client testimonials.
    """

    list_display = (
        "client_name",
        "client_designation",
        "company_name",
        "project_name",
        "rating",
        "status",
        "is_featured",
        "is_active",
        "display_order",
        "created_at",
    )

    list_filter = (
        "status",
        "rating",
        "is_featured",
        "is_active",
        "created_at",
    )

    search_fields = (
        "client_name",
        "client_designation",
        "company_name",
        "project_name",
        "testimonial",
    )

    list_editable = (
        "rating",
        "status",
        "is_featured",
        "is_active",
        "display_order",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "display_order",
        "-created_at",
    )

    fieldsets = (
        (
            "Client Information",
            {
                "fields": (
                    "client_name",
                    "client_designation",
                    "company_name",
                    "company_website",
                    "client_photo",
                )
            },
        ),
        (
            "Testimonial",
            {
                "fields": (
                    "testimonial",
                    "rating",
                    "project_name",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "status",
                    "is_featured",
                    "is_active",
                    "display_order",
                )
            },
        ),
        (
            "System Information",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )