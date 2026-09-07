from django.db import models


class Project(models.Model):
    """
    Projects displayed on the NextGenDevloper website.
    """

    class Category(models.TextChoices):
        WEB = "WEB", "Web Development"
        MOBILE = "MOBILE", "Mobile Development"
        AI = "AI", "Artificial Intelligence"
        SOFTWARE = "SOFTWARE", "Software Development"
        ECOMMERCE = "ECOMMERCE", "E-Commerce"
        BUSINESS = "BUSINESS", "Business Website"
        API = "API", "API Development"
        UI_UX = "UI_UX", "UI/UX Design"
        AUTOMATION = "AUTOMATION", "Automation"
        OTHER = "OTHER", "Other"

    class Status(models.TextChoices):
        PLANNING = "PLANNING", "Planning"
        RUNNING = "RUNNING", "Running"
        COMPLETED = "COMPLETED", "Completed"
        MAINTENANCE = "MAINTENANCE", "Maintenance"
        ARCHIVED = "ARCHIVED", "Archived"

    title = models.CharField(
        max_length=200,
    )

    slug = models.SlugField(
        max_length=220,
        unique=True,
    )

    short_description = models.CharField(
        max_length=255,
        blank=True,
    )

    description = models.TextField(
        blank=True,
    )

    category = models.CharField(
        max_length=30,
        choices=Category.choices,
        default=Category.WEB,
    )

    client_name = models.CharField(
        max_length=200,
        blank=True,
    )

    client_industry = models.CharField(
        max_length=150,
        blank=True,
    )

    thumbnail = models.ImageField(
        upload_to="projects/thumbnails/",
        null=True,
        blank=True,
    )

    gallery_image_1 = models.ImageField(
        upload_to="projects/gallery/",
        null=True,
        blank=True,
    )

    gallery_image_2 = models.ImageField(
        upload_to="projects/gallery/",
        null=True,
        blank=True,
    )

    gallery_image_3 = models.ImageField(
        upload_to="projects/gallery/",
        null=True,
        blank=True,
    )

    technologies = models.TextField(
        blank=True,
        help_text="Enter technology names separated by commas.",
    )

    features = models.TextField(
        blank=True,
        help_text="Enter one project feature per line.",
    )

    github_url = models.URLField(
        blank=True,
    )

    live_demo_url = models.URLField(
        blank=True,
    )

    documentation_url = models.URLField(
        blank=True,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.COMPLETED,
    )

    start_date = models.DateField(
        null=True,
        blank=True,
    )

    completion_date = models.DateField(
        null=True,
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
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.title