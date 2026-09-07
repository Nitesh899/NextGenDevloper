from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User

from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
)

from .throttles import (
    LoginRateThrottle,
    OTPRateThrottle,
    RegisterRateThrottle,
)

from .otp_serializers import (
    SendOTPSerializer,
    VerifyOTPSerializer,
    ResendOTPSerializer,
)

from .otp_services import (
    create_phone_otp,
    verify_phone_otp,
)


class RegisterAPIView(APIView):
    """
    Register a new user with email and password.
    """

    permission_classes = [AllowAny]

    throttle_classes = [RegisterRateThrottle]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "success": True,
                    "message": "Account created successfully.",
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {
                "success": False,
                "message": "Registration failed.",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginAPIView(APIView):
    """
    Login using email and password.
    Returns access and refresh JWT tokens.
    """

    permission_classes = [AllowAny]
    throttle_classes = [LoginRateThrottle]

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
            context={"request": request},
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Login failed.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "success": True,
                "message": "Login successful.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )


class TokenRefreshAPIView(APIView):
    """
    Generate a new access token using a refresh token.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TokenRefreshSerializer(
            data=request.data,
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Token refresh failed.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {
                "success": True,
                "message": "Access token refreshed successfully.",
                "access": serializer.validated_data["access"],
                "refresh": serializer.validated_data.get("refresh"),
            },
            status=status.HTTP_200_OK,
        )


class SendOTPAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [OTPRateThrottle]

    def post(self, request):
        serializer = SendOTPSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Invalid phone number.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        phone_number = serializer.validated_data[
            "phone_number"
        ]

        try:
            otp = create_phone_otp(phone_number)

        except ValueError as error:
            return Response(
                {
                    "success": False,
                    "message": str(error),
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        print(
            f"[DEV OTP] {phone_number}: {otp.otp_code}"
        )

        return Response(
            {
                "success": True,
                "message": "OTP generated successfully.",
                "expires_in": 300,
                "resend_after": 60,
            },
            status=status.HTTP_200_OK,
        )


class VerifyOTPAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [OTPRateThrottle]

    def post(self, request):
        serializer = VerifyOTPSerializer(
            data=request.data,
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "OTP verification failed.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp = serializer.validated_data["otp"]

        user = User.objects.filter(
            phone_number=otp.phone_number,
        ).first()

        if not user:
            return Response(
                {
                    "success": False,
                    "message": (
                        "No account is associated with "
                        "this phone number."
                    ),
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        verify_phone_otp(otp)

        user.is_phone_verified = True

        user.save(
            update_fields=[
                "is_phone_verified",
            ]
        )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "success": True,
                "message": "Phone number verified successfully.",
                "verified": True,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )


class ResendOTPAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [OTPRateThrottle]

    def post(self, request):
        serializer = ResendOTPSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Invalid phone number.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        phone_number = serializer.validated_data[
            "phone_number"
        ]

        try:
            otp = create_phone_otp(phone_number)

        except ValueError as error:
            return Response(
                {
                    "success": False,
                    "message": str(error),
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        print(
            f"[DEV OTP] {phone_number}: {otp.otp_code}"
        )

        return Response(
            {
                "success": True,
                "message": "OTP resent successfully.",
                "expires_in": 300,
                "resend_after": 60,
            },
            status=status.HTTP_200_OK,
        )

class CurrentUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "success": True,
                "message": "Authenticated user retrieved successfully.",
                "user": UserSerializer(request.user).data,
            },
            status=status.HTTP_200_OK,
        )


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {
                    "success": False,
                    "message": "Refresh token is required.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {
                    "success": True,
                    "message": "Logout successful.",
                },
                status=status.HTTP_200_OK,
            )

        except Exception:
            return Response(
                {
                    "success": False,
                    "message": "Invalid or expired refresh token.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )