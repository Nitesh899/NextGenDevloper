from django.contrib import admin

from .models import HomeContent, Roadmap, SiteSettings, Technology


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    """
    Admin configuration for global website settings.
    """

    list_display = (
        "site_name",
        "email",
        "phone",
        "is_active",
        "created_at",
        "updated_at",
    )

    list_filter = (
        "is_active",
        "created_at",
    )

    search_fields = (
        "site_name",
        "tagline",
        "email",
        "phone",
        "address",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-created_at",
    )


@admin.register(HomeContent)
class HomeContentAdmin(admin.ModelAdmin):
    """
    Admin configuration for homepage hero/content.
    """

    list_display = (
        "title",
        "subtitle",
        "primary_button_text",
        "secondary_button_text",
        "is_active",
        "created_at",
        "updated_at",
    )

    list_filter = (
        "is_active",
        "created_at",
    )

    search_fields = (
        "title",
        "subtitle",
        "description",
        "primary_button_text",
        "secondary_button_text",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-created_at",
    )


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    """
    Admin configuration for technologies used by NextGenDevloper.
    """

    list_display = (
        "name",
        "short_name",
        "category",
        "is_featured",
        "is_active",
        "display_order",
        "created_at",
    )

    list_filter = (
        "category",
        "is_featured",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
        "short_name",
        "category",
        "description",
    )

    list_editable = (
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
        "name",
    )


@admin.register(Roadmap)
class RoadmapAdmin(admin.ModelAdmin):
    """
    Admin configuration for website/project roadmap.
    """

    list_display = (
        "title",
        "status",
        "start_date",
        "end_date",
        "is_active",
        "display_order",
        "created_at",
    )

    list_filter = (
        "status",
        "is_active",
        "start_date",
        "end_date",
    )

    search_fields = (
        "title",
        "description",
    )

    list_editable = (
        "status",
        "is_active",
        "display_order",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "display_order",
    )