from django.contrib import admin

from .models import AboutPage, Experience, Skill


@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    """
    Admin configuration for the About page.
    """

    list_display = (
        "title",
        "years_of_experience",
        "projects_completed",
        "clients_served",
        "technologies_count",
        "is_active",
        "updated_at",
    )

    list_filter = (
        "is_active",
        "years_of_experience",
        "updated_at",
    )

    search_fields = (
        "title",
        "short_intro",
        "description",
        "mission",
        "vision",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-updated_at",
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """
    Admin configuration for skills and technical expertise.
    """

    list_display = (
        "name",
        "category",
        "level",
        "proficiency",
        "is_featured",
        "is_active",
        "display_order",
        "created_at",
    )

    list_filter = (
        "category",
        "level",
        "is_featured",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
        "category",
        "description",
        "icon_name",
    )

    list_editable = (
        "level",
        "proficiency",
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


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    """
    Admin configuration for professional experience.
    """

    list_display = (
        "title",
        "company",
        "employment_type",
        "start_date",
        "end_date",
        "is_current",
        "is_featured",
        "is_active",
        "display_order",
    )

    list_filter = (
        "employment_type",
        "is_current",
        "is_featured",
        "is_active",
        "start_date",
    )

    search_fields = (
        "title",
        "company",
        "location",
        "employment_type",
        "description",
        "technologies",
        "responsibilities",
    )

    list_editable = (
        "is_current",
        "is_featured",
        "is_active",
        "display_order",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-start_date",
        "display_order",
    )

    date_hierarchy = "start_date"