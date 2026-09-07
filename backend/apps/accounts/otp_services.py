import secrets
from datetime import timedelta

from django.utils import timezone

from .models import OTPVerification
from .security import (
    OTP_COOLDOWN_SECONDS,
    OTP_EXPIRY_MINUTES,
    OTP_MAX_ATTEMPTS,
)


OTP_LENGTH = 6


def generate_otp():
    return "".join(
        str(secrets.randbelow(10))
        for _ in range(OTP_LENGTH)
    )


def invalidate_previous_otps(phone_number):
    OTPVerification.objects.filter(
        phone_number=phone_number,
        is_verified=False,
    ).update(
        is_verified=True,
    )


def can_send_otp(phone_number):
    latest_otp = (
        OTPVerification.objects
        .filter(
            phone_number=phone_number,
        )
        .order_by("-created_at")
        .first()
    )

    if not latest_otp:
        return True, 0

    elapsed = (
        timezone.now() - latest_otp.created_at
    ).total_seconds()

    remaining = int(
        OTP_COOLDOWN_SECONDS - elapsed
    )

    if remaining > 0:
        return False, remaining

    return True, 0


def create_phone_otp(phone_number):
    allowed, remaining = can_send_otp(phone_number)

    if not allowed:
        raise ValueError(
            f"Please wait {remaining} seconds before requesting another OTP."
        )

    now = timezone.now()

    invalidate_previous_otps(phone_number)

    otp_code = generate_otp()

    otp = OTPVerification.objects.create(
        phone_number=phone_number,
        otp_code=otp_code,
        otp_type=OTPVerification.OTPType.PHONE_LOGIN,
        expires_at=now + timedelta(
            minutes=OTP_EXPIRY_MINUTES
        ),
        attempts=0,
        is_verified=False,
    )

    return otp


def verify_phone_otp(otp):
    otp.is_verified = True
    otp.verified_at = timezone.now()

    otp.save(
        update_fields=[
            "is_verified",
            "verified_at",
        ]
    )

    return otp



