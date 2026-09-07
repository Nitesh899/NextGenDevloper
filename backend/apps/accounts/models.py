from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserManager(BaseUserManager):
    """
    Custom manager for User model.
    """

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email address is required.")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields,
        )

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault(
            "account_type",
            User.AccountType.ADMIN,
        )

        if not password:
            raise ValueError("Superuser password is required.")

        return self.create_user(
            email=email,
            password=password,
            **extra_fields,
        )


class User(AbstractUser):
    """
    Custom user model for NextGenDevloper.
    """

    username = None

    class AccountType(models.TextChoices):
        USER = "USER", "User"
        ADMIN = "ADMIN", "Admin"

    email = models.EmailField(
        unique=True,
        db_index=True,
    )

    phone_number = models.CharField(
        max_length=15,
        unique=True,
        null=True,
        blank=True,
        db_index=True,
    )

    is_phone_verified = models.BooleanField(
        default=False,
    )

    is_email_verified = models.BooleanField(
        default=False,
    )

    account_type = models.CharField(
        max_length=20,
        choices=AccountType.choices,
        default=AccountType.USER,
    )

    failed_login_attempts = models.PositiveSmallIntegerField(
        default=0,
    )

    login_blocked_until = models.DateTimeField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email



class UserProfile(models.Model):
    """
    Additional information related to a user.
    """

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
    )

    profile_image = models.ImageField(
        upload_to="profiles/",
        null=True,
        blank=True,
    )

    bio = models.TextField(
        blank=True,
    )

    company = models.CharField(
        max_length=150,
        blank=True,
    )

    designation = models.CharField(
        max_length=150,
        blank=True,
    )

    city = models.CharField(
        max_length=100,
        blank=True,
    )

    country = models.CharField(
        max_length=100,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"{self.user.email} Profile"



class OTPVerification(models.Model):
    """
    Stores temporary OTP verification records.
    """

    class OTPType(models.TextChoices):
        PHONE_LOGIN = "PHONE_LOGIN", "Phone Login"
        PHONE_REGISTER = "PHONE_REGISTER", "Phone Registration"
        PASSWORD_RESET = "PASSWORD_RESET", "Password Reset"

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="otp_verifications",
        null=True,
        blank=True,
    )

    phone_number = models.CharField(
        max_length=15,
        db_index=True,
    )

    otp_code = models.CharField(
        max_length=6,
    )

    otp_type = models.CharField(
        max_length=30,
        choices=OTPType.choices,
    )

    is_verified = models.BooleanField(
        default=False,
    )

    attempts = models.PositiveSmallIntegerField(
        default=0,
    )

    expires_at = models.DateTimeField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    verified_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.phone_number} - {self.otp_type}"