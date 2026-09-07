from django.db import models


class SiteSettings(models.Model):
    site_name = models.CharField(
        max_length=100,
        default="NextGenDevloper",
    )
    tagline = models.CharField(
        max_length=255,
        blank=True,
    )
    description = models.TextField(
        blank=True,
    )
    logo = models.ImageField(
        upload_to="site/",
        null=True,
        blank=True,
    )
    favicon = models.ImageField(
        upload_to="site/",
        null=True,
        blank=True,
    )
    email = models.EmailField(
        blank=True,
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
    )
    address = models.TextField(
        blank=True,
    )
    github_url = models.URLField(
        blank=True,
    )
    linkedin_url = models.URLField(
        blank=True,
    )
    instagram_url = models.URLField(
        blank=True,
    )
    youtube_url = models.URLField(
        blank=True,
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

    def __str__(self):
        return self.site_name


class HomeContent(models.Model):
    title = models.CharField(
        max_length=200,
    )
    subtitle = models.CharField(
        max_length=255,
        blank=True,
    )
    description = models.TextField(
        blank=True,
    )
    primary_button_text = models.CharField(
        max_length=100,
        default="Explore Projects",
    )
    primary_button_url = models.CharField(
        max_length=255,
        default="/projects",
    )
    secondary_button_text = models.CharField(
        max_length=100,
        default="Request Quote",
    )
    secondary_button_url = models.CharField(
        max_length=255,
        default="/request-quote",
    )
    hero_image = models.ImageField(
        upload_to="home/",
        null=True,
        blank=True,
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

    def __str__(self):
        return self.title


class Technology(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
    )
    short_name = models.CharField(
        max_length=50,
        blank=True,
    )
    description = models.TextField(
        blank=True,
    )
    icon_name = models.CharField(
        max_length=100,
        blank=True,
        help_text="React Icon or Lucide icon name.",
    )
    website_url = models.URLField(
        blank=True,
    )
    category = models.CharField(
        max_length=100,
        blank=True,
    )
    is_featured = models.BooleanField(
        default=False,
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

    def __str__(self):
        return self.name


class Roadmap(models.Model):
    class Status(models.TextChoices):
        PLANNED = "PLANNED", "Planned"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        COMPLETED = "COMPLETED", "Completed"

    title = models.CharField(
        max_length=200,
    )
    description = models.TextField(
        blank=True,
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PLANNED,
    )
    start_date = models.DateField(
        null=True,
        blank=True,
    )
    end_date = models.DateField(
        null=True,
        blank=True,
    )
    display_order = models.PositiveIntegerField(
        default=0,
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
        ordering = ["display_order"]

    def __str__(self):
        return self.title