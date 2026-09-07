from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin configuration for portfolio projects.
    """

    list_display = (
        "title",
        "category",
        "status",
        "client_name",
        "is_featured",
        "is_active",
        "display_order",
        "start_date",
        "completion_date",
        "created_at",
    )

    list_filter = (
        "category",
        "status",
        "is_featured",
        "is_active",
        "start_date",
        "completion_date",
        "created_at",
    )

    search_fields = (
        "title",
        "slug",
        "short_description",
        "description",
        "client_name",
        "client_industry",
        "technologies",
        "features",
    )

    list_editable = (
        "status",
        "is_featured",
        "is_active",
        "display_order",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "display_order",
        "-created_at",
    )

    date_hierarchy = "created_at"

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "short_description",
                    "description",
                    "category",
                    "status",
                )
            },
        ),
        (
            "Client Information",
            {
                "fields": (
                    "client_name",
                    "client_industry",
                )
            },
        ),
        (
            "Project Images",
            {
                "fields": (
                    "thumbnail",
                    "gallery_image_1",
                    "gallery_image_2",
                    "gallery_image_3",
                )
            },
        ),
        (
            "Technologies & Features",
            {
                "fields": (
                    "technologies",
                    "features",
                )
            },
        ),
        (
            "Project Links",
            {
                "fields": (
                    "github_url",
                    "live_demo_url",
                    "documentation_url",
                )
            },
        ),
        (
            "Project Timeline",
            {
                "fields": (
                    "start_date",
                    "completion_date",
                )
            },
        ),
        (
            "Display Settings",
            {
                "fields": (
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