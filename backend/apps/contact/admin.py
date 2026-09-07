from django.contrib import admin

from .models import ContactInquiry


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    """
    Admin configuration for contact inquiries.
    """

    list_display = (
        "name",
        "email",
        "subject",
        "inquiry_type",
        "priority",
        "status",
        "assigned_to",
        "created_at",
        "resolved_at",
    )

    list_filter = (
        "inquiry_type",
        "priority",
        "status",
        "assigned_to",
        "created_at",
        "resolved_at",
    )

    search_fields = (
        "name",
        "email",
        "phone_number",
        "subject",
        "message",
        "admin_notes",
        "user__email",
        "assigned_to__email",
    )

    list_editable = (
        "priority",
        "status",
    )

    autocomplete_fields = (
        "user",
        "assigned_to",
    )

    readonly_fields = (
        "ip_address",
        "user_agent",
        "created_at",
        "updated_at",
        "resolved_at",
    )

    date_hierarchy = "created_at"

    ordering = (
        "-created_at",
    )

    fieldsets = (
        (
            "Customer Information",
            {
                "fields": (
                    "user",
                    "name",
                    "email",
                    "phone_number",
                )
            },
        ),
        (
            "Inquiry",
            {
                "fields": (
                    "subject",
                    "message",
                    "inquiry_type",
                )
            },
        ),
        (
            "Management",
            {
                "fields": (
                    "priority",
                    "status",
                    "assigned_to",
                    "admin_notes",
                )
            },
        ),
        (
            "Technical Information",
            {
                "fields": (
                    "ip_address",
                    "user_agent",
                )
            },
        ),
        (
            "Resolution",
            {
                "fields": (
                    "resolved_at",
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