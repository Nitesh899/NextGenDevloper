from django.db import models


class CareerDepartment(models.Model):
    """
    Departments used to organize career opportunities.
    """

    name = models.CharField(
        max_length=150,
        unique=True,
    )

    slug = models.SlugField(
        max_length=180,
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
        verbose_name = "Career Department"
        verbose_name_plural = "Career Departments"

    def __str__(self):
        return self.name


class JobOpening(models.Model):
    """
    Job openings displayed on the Careers page.
    """

    class EmploymentType(models.TextChoices):
        FULL_TIME = "FULL_TIME", "Full-time"
        PART_TIME = "PART_TIME", "Part-time"
        CONTRACT = "CONTRACT", "Contract"
        INTERNSHIP = "INTERNSHIP", "Internship"
        FREELANCE = "FREELANCE", "Freelance"

    class WorkMode(models.TextChoices):
        REMOTE = "REMOTE", "Remote"
        HYBRID = "HYBRID", "Hybrid"
        ON_SITE = "ON_SITE", "On-site"

    class ExperienceLevel(models.TextChoices):
        ENTRY = "ENTRY", "Entry Level"
        JUNIOR = "JUNIOR", "Junior"
        MID = "MID", "Mid Level"
        SENIOR = "SENIOR", "Senior"
        LEAD = "LEAD", "Lead"
        EXPERT = "EXPERT", "Expert"

    class Status(models.TextChoices):
        OPEN = "OPEN", "Open"
        PAUSED = "PAUSED", "Paused"
        CLOSED = "CLOSED", "Closed"
        DRAFT = "DRAFT", "Draft"

    title = models.CharField(
        max_length=200,
    )

    slug = models.SlugField(
        max_length=220,
        unique=True,
    )

    department = models.ForeignKey(
        CareerDepartment,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="job_openings",
    )

    short_description = models.CharField(
        max_length=255,
        blank=True,
    )

    description = models.TextField(
        blank=True,
    )

    responsibilities = models.TextField(
        blank=True,
        help_text="Enter one responsibility per line.",
    )

    requirements = models.TextField(
        blank=True,
        help_text="Enter one requirement per line.",
    )

    preferred_qualifications = models.TextField(
        blank=True,
        help_text="Enter one preferred qualification per line.",
    )

    required_skills = models.TextField(
        blank=True,
        help_text="Enter skills separated by commas.",
    )

    benefits = models.TextField(
        blank=True,
        help_text="Enter one benefit per line.",
    )

    employment_type = models.CharField(
        max_length=20,
        choices=EmploymentType.choices,
        default=EmploymentType.FULL_TIME,
    )

    work_mode = models.CharField(
        max_length=20,
        choices=WorkMode.choices,
        default=WorkMode.REMOTE,
    )

    experience_level = models.CharField(
        max_length=20,
        choices=ExperienceLevel.choices,
        default=ExperienceLevel.ENTRY,
    )

    location = models.CharField(
        max_length=150,
        blank=True,
        help_text="Example: Mumbai, India or Remote.",
    )

    salary_min = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )

    salary_max = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )

    salary_currency = models.CharField(
        max_length=10,
        default="INR",
    )

    salary_period = models.CharField(
        max_length=30,
        default="year",
        help_text="Example: year, month, hour.",
    )

    application_url = models.URLField(
        blank=True,
    )

    application_email = models.EmailField(
        blank=True,
    )

    application_deadline = models.DateField(
        null=True,
        blank=True,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
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
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.title