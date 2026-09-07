from django.contrib import admin

from .models import BlogCategory, BlogPost, BlogSEO, BlogTag


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for blog categories.
    """

    list_display = (
        "name",
        "slug",
        "is_active",
        "display_order",
        "created_at",
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


@admin.register(BlogTag)
class BlogTagAdmin(admin.ModelAdmin):
    """
    Admin configuration for blog tags.
    """

    list_display = (
        "name",
        "slug",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
        "slug",
    )

    list_editable = (
        "is_active",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "name",
    )


class BlogSEOInline(admin.StackedInline):
    """
    Manage SEO settings directly inside a BlogPost.
    """

    model = BlogSEO
    extra = 0
    max_num = 1

    fieldsets = (
        (
            "Search Engine Optimization",
            {
                "fields": (
                    "meta_title",
                    "meta_description",
                    "meta_keywords",
                    "canonical_url",
                )
            },
        ),
        (
            "Open Graph",
            {
                "fields": (
                    "og_title",
                    "og_description",
                    "og_image",
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

    readonly_fields = (
        "created_at",
        "updated_at",
    )


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    """
    Admin configuration for blog posts.
    """

    list_display = (
        "title",
        "category",
        "author",
        "status",
        "is_featured",
        "is_active",
        "reading_time",
        "views_count",
        "published_at",
        "created_at",
    )

    list_filter = (
        "status",
        "category",
        "is_featured",
        "is_active",
        "published_at",
        "created_at",
    )

    search_fields = (
        "title",
        "slug",
        "excerpt",
        "content",
        "category__name",
        "tags__name",
        "author__email",
    )

    list_editable = (
        "status",
        "is_featured",
        "is_active",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    readonly_fields = (
        "views_count",
        "created_at",
        "updated_at",
    )

    autocomplete_fields = (
        "category",
        "author",
    )

    filter_horizontal = (
        "tags",
    )

    date_hierarchy = "published_at"

    ordering = (
        "-published_at",
        "-created_at",
    )

    inlines = (
        BlogSEOInline,
    )

    fieldsets = (
        (
            "Post Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "excerpt",
                    "content",
                    "cover_image",
                )
            },
        ),
        (
            "Organization",
            {
                "fields": (
                    "category",
                    "tags",
                    "author",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "status",
                    "published_at",
                    "is_featured",
                    "is_active",
                )
            },
        ),
        (
            "Article Statistics",
            {
                "fields": (
                    "reading_time",
                    "views_count",
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


@admin.register(BlogSEO)
class BlogSEOAdmin(admin.ModelAdmin):
    """
    Admin configuration for standalone BlogSEO records.
    """

    list_display = (
        "post",
        "meta_title",
        "canonical_url",
        "created_at",
        "updated_at",
    )

    search_fields = (
        "post__title",
        "post__slug",
        "meta_title",
        "meta_description",
        "meta_keywords",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "-updated_at",
    )