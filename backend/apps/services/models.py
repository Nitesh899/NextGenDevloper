from django.db import models


class Service(models.Model):
    """
    Main services offered by NextGenDevloper.
    """

    class ServiceStatus(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        INACTIVE = "INACTIVE", "Inactive"

    name = models.CharField(
        max_length=150,
    )

    slug = models.SlugField(
        max_length=180,
        unique=True,
    )

    short_description = models.CharField(
        max_length=255,
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

    image = models.ImageField(
        upload_to="services/",
        null=True,
        blank=True,
    )

    category = models.CharField(
        max_length=100,
        blank=True,
        help_text="Example: Web Development, Mobile Development, AI.",
    )

    starting_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )

    price_label = models.CharField(
        max_length=100,
        blank=True,
        help_text="Example: Starting from, Custom pricing, Contact us.",
    )

    estimated_duration = models.CharField(
        max_length=100,
        blank=True,
        help_text="Example: 2-4 weeks.",
    )

    status = models.CharField(
        max_length=20,
        choices=ServiceStatus.choices,
        default=ServiceStatus.ACTIVE,
    )

    is_featured = models.BooleanField(
        default=False,
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


class ServiceFeature(models.Model):
    """
    Features and benefits associated with a service.
    """

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="features",
    )

    title = models.CharField(
        max_length=150,
    )

    description = models.TextField(
        blank=True,
    )

    icon_name = models.CharField(
        max_length=100,
        blank=True,
        help_text="React Icon or Lucide icon name.",
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
        ordering = ["display_order", "title"]

    def __str__(self):
        return f"{self.service.name} - {self.title}"


class ServiceProcess(models.Model):
    """
    Process steps used to explain how a service is delivered.
    """

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="process_steps",
    )

    step_number = models.PositiveIntegerField(
        default=1,
    )

    title = models.CharField(
        max_length=150,
    )

    description = models.TextField(
        blank=True,
    )

    icon_name = models.CharField(
        max_length=100,
        blank=True,
        help_text="React Icon or Lucide icon name.",
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
        ordering = ["display_order", "step_number"]

    def __str__(self):
        return f"{self.service.name} - Step {self.step_number}: {self.title}"