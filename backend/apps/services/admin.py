from django.contrib import admin

from .models import Service, ServiceFeature, ServiceProcess


class ServiceFeatureInline(admin.TabularInline):
    """
    Manage service features directly inside a Service.
    """

    model = ServiceFeature
    extra = 1
    fields = (
        "title",
        "description",
        "icon_name",
        "display_order",
        "is_active",
    )
    ordering = (
        "display_order",
        "title",
    )


class ServiceProcessInline(admin.TabularInline):
    """
    Manage service process steps directly inside a Service.
    """

    model = ServiceProcess
    extra = 1
    fields = (
        "step_number",
        "title",
        "description",
        "icon_name",
        "display_order",
        "is_active",
    )
    ordering = (
        "display_order",
        "step_number",
    )


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    """
    Admin configuration for services.
    """

    list_display = (
        "name",
        "category",
        "status",
        "starting_price",
        "price_label",
        "estimated_duration",
        "is_featured",
        "display_order",
        "updated_at",
    )

    list_filter = (
        "status",
        "category",
        "is_featured",
        "created_at",
        "updated_at",
    )

    search_fields = (
        "name",
        "slug",
        "category",
        "short_description",
        "description",
        "price_label",
        "estimated_duration",
    )

    list_editable = (
        "status",
        "is_featured",
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

    inlines = (
        ServiceFeatureInline,
        ServiceProcessInline,
    )


@admin.register(ServiceFeature)
class ServiceFeatureAdmin(admin.ModelAdmin):
    """
    Admin configuration for individual service features.
    """

    list_display = (
        "title",
        "service",
        "display_order",
        "is_active",
        "created_at",
    )

    list_filter = (
        "service",
        "is_active",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
        "service__name",
    )

    list_editable = (
        "display_order",
        "is_active",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "service",
        "display_order",
        "title",
    )


@admin.register(ServiceProcess)
class ServiceProcessAdmin(admin.ModelAdmin):
    """
    Admin configuration for service process steps.
    """

    list_display = (
        "service",
        "step_number",
        "title",
        "display_order",
        "is_active",
        "created_at",
    )

    list_filter = (
        "service",
        "is_active",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
        "service__name",
    )

    list_editable = (
        "step_number",
        "display_order",
        "is_active",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "service",
        "display_order",
        "step_number",
    )