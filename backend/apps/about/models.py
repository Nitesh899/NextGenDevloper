from django.db import models


class AboutPage(models.Model):
    """
    Main About page content for NextGenDevloper.
    """

    title = models.CharField(
        max_length=200,
        default="About NextGenDevloper",
    )

    short_intro = models.TextField(
        blank=True,
    )

    description = models.TextField(
        blank=True,
    )

    mission = models.TextField(
        blank=True,
    )

    vision = models.TextField(
        blank=True,
    )

    profile_image = models.ImageField(
        upload_to="about/",
        null=True,
        blank=True,
    )

    years_of_experience = models.PositiveIntegerField(
        default=0,
    )

    projects_completed = models.PositiveIntegerField(
        default=0,
    )

    clients_served = models.PositiveIntegerField(
        default=0,
    )

    technologies_count = models.PositiveIntegerField(
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

    def __str__(self):
        return self.title


class Skill(models.Model):
    """
    Technical and professional skills displayed on the About page.
    """

    class SkillLevel(models.TextChoices):
        BEGINNER = "BEGINNER", "Beginner"
        INTERMEDIATE = "INTERMEDIATE", "Intermediate"
        ADVANCED = "ADVANCED", "Advanced"
        EXPERT = "EXPERT", "Expert"

    name = models.CharField(
        max_length=100,
    )

    category = models.CharField(
        max_length=100,
        blank=True,
    )

    level = models.CharField(
        max_length=20,
        choices=SkillLevel.choices,
        default=SkillLevel.INTERMEDIATE,
    )

    proficiency = models.PositiveSmallIntegerField(
        default=50,
        help_text="Skill proficiency from 0 to 100.",
    )

    icon_name = models.CharField(
        max_length=100,
        blank=True,
        help_text="React Icon or Lucide icon name.",
    )

    description = models.TextField(
        blank=True,
    )

    display_order = models.PositiveIntegerField(
        default=0,
    )

    is_featured = models.BooleanField(
        default=False,
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
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name


class Experience(models.Model):
    """
    Professional experience displayed on the About page.
    """

    title = models.CharField(
        max_length=200,
    )

    company = models.CharField(
        max_length=200,
        blank=True,
    )

    location = models.CharField(
        max_length=150,
        blank=True,
    )

    employment_type = models.CharField(
        max_length=100,
        blank=True,
        help_text="Example: Full-time, Freelance, Internship.",
    )

    description = models.TextField(
        blank=True,
    )

    responsibilities = models.TextField(
        blank=True,
        help_text="Use one responsibility per line.",
    )

    technologies = models.TextField(
        blank=True,
        help_text="Use comma-separated technology names.",
    )

    company_logo = models.ImageField(
        upload_to="experience/",
        null=True,
        blank=True,
    )

    start_date = models.DateField()

    end_date = models.DateField(
        null=True,
        blank=True,
    )

    is_current = models.BooleanField(
        default=False,
    )

    display_order = models.PositiveIntegerField(
        default=0,
    )

    is_featured = models.BooleanField(
        default=False,
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
        ordering = ["-start_date", "display_order"]

    def __str__(self):
        return self.title