from django.conf import settings
from django.db import models


class QuoteRequest(models.Model):
    """
    Stores project quotation requests submitted by visitors or users.
    """

    class ProjectType(models.TextChoices):
        WEBSITE = "WEBSITE", "Website"
        WEB_APP = "WEB_APP", "Web Application"
        MOBILE_APP = "MOBILE_APP", "Mobile Application"
        ECOMMERCE = "ECOMMERCE", "E-Commerce"
        AI_ML = "AI_ML", "AI / Machine Learning"
        SOFTWARE = "SOFTWARE", "Software Development"
        API = "API", "API Development"
        AUTOMATION = "AUTOMATION", "Business Automation"
        UI_UX = "UI_UX", "UI/UX Design"
        OTHER = "OTHER", "Other"

    class BudgetRange(models.TextChoices):
        UNDER_25K = "UNDER_25K", "Under ₹25,000"
        RANGE_25K_50K = "25K_50K", "₹25,000 - ₹50,000"
        RANGE_50K_1L = "50K_1L", "₹50,000 - ₹1,00,000"
        RANGE_1L_3L = "1L_3L", "₹1,00,000 - ₹3,00,000"
        RANGE_3L_5L = "3L_5L", "₹3,00,000 - ₹5,00,000"
        ABOVE_5L = "ABOVE_5L", "Above ₹5,00,000"
        CUSTOM = "CUSTOM", "Custom Budget"

    class Timeline(models.TextChoices):
        ASAP = "ASAP", "As Soon As Possible"
        ONE_MONTH = "ONE_MONTH", "Within 1 Month"
        ONE_TO_THREE = "1_TO_3_MONTHS", "1-3 Months"
        THREE_TO_SIX = "3_TO_6_MONTHS", "3-6 Months"
        SIX_PLUS = "6_PLUS_MONTHS", "6+ Months"
        FLEXIBLE = "FLEXIBLE", "Flexible"

    class Priority(models.TextChoices):
        LOW = "LOW", "Low"
        NORMAL = "NORMAL", "Normal"
        HIGH = "HIGH", "High"
        URGENT = "URGENT", "Urgent"

    class Status(models.TextChoices):
        NEW = "NEW", "New"
        REVIEWING = "REVIEWING", "Reviewing"
        CONTACTED = "CONTACTED", "Client Contacted"
        PROPOSAL_SENT = "PROPOSAL_SENT", "Proposal Sent"
        NEGOTIATION = "NEGOTIATION", "Negotiation"
        APPROVED = "APPROVED", "Approved"
        REJECTED = "REJECTED", "Rejected"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="quote_requests",
    )

    name = models.CharField(
        max_length=150,
    )

    email = models.EmailField()

    phone_number = models.CharField(
        max_length=20,
        blank=True,
    )

    company_name = models.CharField(
        max_length=200,
        blank=True,
    )

    project_type = models.CharField(
        max_length=30,
        choices=ProjectType.choices,
        default=ProjectType.WEBSITE,
    )

    project_title = models.CharField(
        max_length=200,
        blank=True,
    )

    project_description = models.TextField(
        help_text="Detailed description of the project.",
    )

    required_features = models.TextField(
        blank=True,
        help_text="Enter one required feature per line.",
    )

    existing_website = models.URLField(
        blank=True,
    )

    budget_range = models.CharField(
        max_length=20,
        choices=BudgetRange.choices,
        default=BudgetRange.CUSTOM,
    )

    timeline = models.CharField(
        max_length=30,
        choices=Timeline.choices,
        default=Timeline.FLEXIBLE,
    )

    preferred_technologies = models.TextField(
        blank=True,
        help_text="Enter preferred technologies separated by commas.",
    )

    additional_notes = models.TextField(
        blank=True,
    )

    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.NORMAL,
    )

    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.NEW,
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_quote_requests",
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

    contacted_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    proposal_sent_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    completed_at = models.DateTimeField(
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

    def save(self, *args, **kwargs):
        from django.utils import timezone

        if self.status == self.Status.CONTACTED and not self.contacted_at:
            self.contacted_at = timezone.now()

        if (
            self.status == self.Status.PROPOSAL_SENT
            and not self.proposal_sent_at
        ):
            self.proposal_sent_at = timezone.now()

        if self.status == self.Status.COMPLETED and not self.completed_at:
            self.completed_at = timezone.now()

        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} - {self.project_title or self.project_type}"



class QuoteService(models.Model):
    """
    Individual services requested as part of a quotation.
    """

    quote_request = models.ForeignKey(
        QuoteRequest,
        on_delete=models.CASCADE,
        related_name="services",
    )

    service_name = models.CharField(
        max_length=150,
    )

    description = models.TextField(
        blank=True,
    )

    estimated_quantity = models.PositiveIntegerField(
        default=1,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"{self.quote_request.name} - {self.service_name}"