from django.urls import path

from .views import (
    RegisterAPIView,
    LoginAPIView,
    TokenRefreshAPIView,
    SendOTPAPIView,
    VerifyOTPAPIView,
    ResendOTPAPIView,
    CurrentUserAPIView,
    LogoutAPIView,
)


urlpatterns = [
    path(
        "register/",
        RegisterAPIView.as_view(),
        name="register",
    ),

    path(
        "login/",
        LoginAPIView.as_view(),
        name="login",
    ),

    path(
        "token/refresh/",
        TokenRefreshAPIView.as_view(),
        name="token-refresh",
    ),

    path(
        "send-otp/",
        SendOTPAPIView.as_view(),
        name="send-otp",
    ),

    path(
        "verify-otp/",
        VerifyOTPAPIView.as_view(),
        name="verify-otp",
    ),

    path(
        "resend-otp/",
        ResendOTPAPIView.as_view(),
        name="resend-otp",
    ),

    path(
        "me/",
        CurrentUserAPIView.as_view(),
        name="current-user",
    ),

    path(
        "logout/",
        LogoutAPIView.as_view(),
        name="logout",
    ),
]