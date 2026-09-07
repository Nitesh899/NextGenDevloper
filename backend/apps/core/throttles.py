from rest_framework.throttling import AnonRateThrottle


class ContactRateThrottle(AnonRateThrottle):
    scope = "contact"


class QuoteRateThrottle(AnonRateThrottle):
    scope = "quote"