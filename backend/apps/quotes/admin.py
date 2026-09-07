from django.contrib import admin

from .models import QuoteRequest, QuoteService


class QuoteServiceInline(admin.TabularInline):
    model = QuoteService
    extra = 0
    fields = [
        "service_name",
        "description",
        "estimated_quantity",
        "created_at",
    ]
    readonly_fields = ["created_at"]


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "email",
        "project_type",
        "budget_range",
        "timeline",
        "priority",
        "status",
        "assigned_to",
        "created_at",
    ]

    list_filter = [
        "status",
        "priority",
        "project_type",
        "budget_range",
        "timeline",
        "created_at",
    ]

    search_fields = [
        "name",
        "email",
        "phone_number",
        "company_name",
        "project_title",
        "project_description",
    ]

    readonly_fields = [
        "ip_address",
        "user_agent",
        "contacted_at",
        "proposal_sent_at",
        "completed_at",
        "created_at",
        "updated_at",
    ]

    autocomplete_fields = [
        "user",
        "assigned_to",
    ]

    inlines = [
        QuoteServiceInline,
    ]

    fieldsets = (
        (
            "Client Information",
            {
                "fields": (
                    "user",
                    "name",
                    "email",
                    "phone_number",
                    "company_name",
                )
            },
        ),
        (
            "Project Information",
            {
                "fields": (
                    "project_type",
                    "project_title",
                    "project_description",
                    "required_features",
                    "existing_website",
                    "preferred_technologies",
                )
            },
        ),
        (
            "Budget & Timeline",
            {
                "fields": (
                    "budget_range",
                    "timeline",
                    "priority",
                )
            },
        ),
        (
            "Additional Information",
            {
                "fields": (
                    "additional_notes",
                )
            },
        ),
        (
            "Management",
            {
                "fields": (
                    "status",
                    "assigned_to",
                    "admin_notes",
                )
            },
        ),
        (
            "Workflow Timestamps",
            {
                "fields": (
                    "contacted_at",
                    "proposal_sent_at",
                    "completed_at",
                )
            },
        ),
        (
            "Technical Information",
            {
                "classes": ("collapse",),
                "fields": (
                    "ip_address",
                    "user_agent",
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    ordering = [
        "-created_at",
    ]


@admin.register(QuoteService)
class QuoteServiceAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "quote_request",
        "service_name",
        "estimated_quantity",
        "created_at",
    ]

    search_fields = [
        "service_name",
        "description",
        "quote_request__name",
        "quote_request__email",
    ]

    list_filter = [
        "created_at",
    ]

    readonly_fields = [
        "created_at",
    ]

    autocomplete_fields = [
        "quote_request",
    ]

    ordering = [
        "-created_at",
    ]