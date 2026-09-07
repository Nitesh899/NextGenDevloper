from django.contrib import admin

from .models import CareerDepartment, JobOpening


@admin.register(CareerDepartment)
class CareerDepartmentAdmin(admin.ModelAdmin):
    """
    Admin configuration for career departments.
    """

    list_display = (
        "name",
        "slug",
        "is_active",
        "display_order",
        "created_at",
        "updated_at",
    )

    list_filter = (
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
        "slug",
        "description",
    )

    list_editable = (
        "is_active",
        "display_order",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "display_order",
        "name",
    )


@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    """
    Admin configuration for job openings.
    """

    list_display = (
        "title",
        "department",
        "employment_type",
        "work_mode",
        "experience_level",
        "location",
        "status",
        "is_featured",
        "application_deadline",
        "created_at",
    )

    list_filter = (
        "department",
        "employment_type",
        "work_mode",
        "experience_level",
        "status",
        "is_featured",
        "application_deadline",
        "created_at",
    )

    search_fields = (
        "title",
        "slug",
        "short_description",
        "description",
        "location",
        "required_skills",
        "responsibilities",
        "requirements",
        "preferred_qualifications",
        "benefits",
        "department__name",
    )

    list_editable = (
        "status",
        "is_featured",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    autocomplete_fields = (
        "department",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    date_hierarchy = "created_at"

    ordering = (
        "display_order",
        "-created_at",
    )

    fieldsets = (
        (
            "Job Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "department",
                    "short_description",
                    "description",
                )
            },
        ),
        (
            "Job Requirements",
            {
                "fields": (
                    "responsibilities",
                    "requirements",
                    "preferred_qualifications",
                    "required_skills",
                    "benefits",
                )
            },
        ),
        (
            "Employment Details",
            {
                "fields": (
                    "employment_type",
                    "work_mode",
                    "experience_level",
                    "location",
                )
            },
        ),
        (
            "Salary",
            {
                "fields": (
                    "salary_min",
                    "salary_max",
                    "salary_currency",
                    "salary_period",
                )
            },
        ),
        (
            "Application",
            {
                "fields": (
                    "application_url",
                    "application_email",
                    "application_deadline",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "status",
                    "is_featured",
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