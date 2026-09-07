from django.conf import settings
from django.db import models


class ContactInquiry(models.Model):
    """
    Stores messages and inquiries submitted through the Contact page.
    """

    class InquiryType(models.TextChoices):
        GENERAL = "GENERAL", "General Inquiry"
        SERVICE = "SERVICE", "Service Inquiry"
        PROJECT = "PROJECT", "Project Inquiry"
        SUPPORT = "SUPPORT", "Technical Support"
        PARTNERSHIP = "PARTNERSHIP", "Partnership"
        CAREER = "CAREER", "Career"
        OTHER = "OTHER", "Other"

    class Priority(models.TextChoices):
        LOW = "LOW", "Low"
        NORMAL = "NORMAL", "Normal"
        HIGH = "HIGH", "High"
        URGENT = "URGENT", "Urgent"

    class Status(models.TextChoices):
        NEW = "NEW", "New"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        WAITING = "WAITING", "Waiting for Customer"
        RESOLVED = "RESOLVED", "Resolved"
        CLOSED = "CLOSED", "Closed"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="contact_inquiries",
    )

    name = models.CharField(
        max_length=150,
    )

    email = models.EmailField()

    phone_number = models.CharField(
        max_length=20,
        blank=True,
    )

    subject = models.CharField(
        max_length=255,
    )

    message = models.TextField()

    inquiry_type = models.CharField(
        max_length=30,
        choices=InquiryType.choices,
        default=InquiryType.GENERAL,
    )

    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.NORMAL,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW,
    )

    admin_notes = models.TextField(
        blank=True,
        help_text="Internal notes visible only to administrators.",
    )

    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
    )

    user_agent = models.TextField(
        blank=True,
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_contact_inquiries",
    )

    resolved_at = models.DateTimeField(
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
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.subject}"