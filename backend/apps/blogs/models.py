from django.conf import settings
from django.db import models


class BlogCategory(models.Model):
    """
    Categories used to organize blog posts.
    """

    name = models.CharField(
        max_length=100,
        unique=True,
    )

    slug = models.SlugField(
        max_length=120,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    display_order = models.PositiveIntegerField(
        default=0,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["display_order", "name"]
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.name


class BlogTag(models.Model):
    """
    Tags used to classify blog posts.
    """

    name = models.CharField(
        max_length=100,
        unique=True,
    )

    slug = models.SlugField(
        max_length=120,
        unique=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    """
    Main blog post model.
    """

    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        PUBLISHED = "PUBLISHED", "Published"
        ARCHIVED = "ARCHIVED", "Archived"

    title = models.CharField(
        max_length=250,
    )

    slug = models.SlugField(
        max_length=280,
        unique=True,
    )

    excerpt = models.TextField(
        blank=True,
        help_text="Short summary displayed on blog cards.",
    )

    content = models.TextField(
        blank=True,
        help_text="Main blog article content.",
    )

    cover_image = models.ImageField(
        upload_to="blogs/covers/",
        null=True,
        blank=True,
    )

    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="posts",
    )

    tags = models.ManyToManyField(
        BlogTag,
        blank=True,
        related_name="posts",
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="blog_posts",
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
    )

    is_featured = models.BooleanField(
        default=False,
    )

    is_active = models.BooleanField(
        default=True,
    )

    reading_time = models.PositiveIntegerField(
        default=1,
        help_text="Estimated reading time in minutes.",
    )

    views_count = models.PositiveIntegerField(
        default=0,
    )

    published_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title


class BlogSEO(models.Model):
    """
    SEO metadata associated with a blog post.
    """

    post = models.OneToOneField(
        BlogPost,
        on_delete=models.CASCADE,
        related_name="seo",
    )

    meta_title = models.CharField(
        max_length=255,
        blank=True,
    )

    meta_description = models.TextField(
        blank=True,
    )

    meta_keywords = models.CharField(
        max_length=500,
        blank=True,
        help_text="Comma-separated keywords.",
    )

    canonical_url = models.URLField(
        blank=True,
    )

    og_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="Open Graph title.",
    )

    og_description = models.TextField(
        blank=True,
        help_text="Open Graph description.",
    )

    og_image = models.ImageField(
        upload_to="blogs/seo/",
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"SEO - {self.post.title}"