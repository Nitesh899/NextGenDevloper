import os

from django.core.management.base import BaseCommand, CommandError

from apps.accounts.models import User


class Command(BaseCommand):
    help = "Create or update the production admin user from environment variables."

    def handle(self, *args, **options):
        email = os.getenv("ADMIN_EMAIL", "").strip().lower()
        password = os.getenv("ADMIN_PASSWORD", "")

        if not email:
            raise CommandError("ADMIN_EMAIL environment variable is not set.")

        if not password:
            raise CommandError("ADMIN_PASSWORD environment variable is not set.")

        user = User.objects.filter(email__iexact=email).first()

        if user:
            user.email = email
            user.account_type = User.AccountType.ADMIN
            user.is_staff = True
            user.is_superuser = True
            user.is_active = True
            user.set_password(password)

            user.save(
                update_fields=[
                    "email",
                    "account_type",
                    "is_staff",
                    "is_superuser",
                    "is_active",
                    "password",
                ]
            )

            self.stdout.write(
                self.style.SUCCESS(
                    f"Production admin updated successfully: {email}"
                )
            )

            return

        User.objects.create_superuser(
            email=email,
            password=password,
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Production admin created successfully: {email}"
            )
        )