from rest_framework.throttling import AnonRateThrottle


class LoginRateThrottle(AnonRateThrottle):
    scope = "auth_login"


class OTPRateThrottle(AnonRateThrottle):
    scope = "auth_otp"


class RegisterRateThrottle(AnonRateThrottle):
    scope = "auth_register"