from datetime import timedelta


# Login protection
LOGIN_MAX_ATTEMPTS = 5
LOGIN_BLOCK_MINUTES = 15


# OTP protection
OTP_MAX_ATTEMPTS = 5
OTP_COOLDOWN_SECONDS = 60
OTP_EXPIRY_MINUTES = 5