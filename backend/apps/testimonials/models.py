from django.db import models


class Testimonial(models.Model):
    """
    Client testimonials displayed on the NextGenDevloper website.
    """

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        APPROVED = "APPROVED", "Approved"
        REJECTED = "REJECTED", "Rejected"

    client_name = models.CharField(
        max_length=150,
    )

    client_designation = models.CharField(
        max_length=150,
        blank=True,
    )

    company_name = models.CharField(
        max_length=200,
        blank=True,
    )

    company_website = models.URLField(
        blank=True,
    )

    client_photo = models.ImageField(
        upload_to="testimonials/",
        null=True,
        blank=True,
    )

    testimonial = models.TextField(
        help_text="Client testimonial or review.",
    )

    rating = models.PositiveSmallIntegerField(
        default=5,
        help_text="Rating from 1 to 5.",
    )

    project_name = models.CharField(
        max_length=200,
        blank=True,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
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
        return f"{self.client_name} - {self.company_name}"