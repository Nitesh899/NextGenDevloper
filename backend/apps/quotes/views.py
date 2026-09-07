from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import QuoteRequestSerializer

from apps.core.throttles import QuoteRateThrottle


class QuoteRequestCreateView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [QuoteRateThrottle]

    def post(self, request):
        serializer = QuoteRequestSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Please correct the errors below.",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        quote_request = serializer.save(
            user=(
                request.user
                if request.user.is_authenticated
                else None
            ),
            ip_address=self.get_client_ip(request),
            user_agent=request.META.get(
                "HTTP_USER_AGENT",
                "",
            ),
        )

        return Response(
            {
                "success": True,
                "message": (
                    "Thank you for your quotation request. "
                    "We will review your requirements and "
                    "get back to you soon."
                ),
                "quote_id": quote_request.id,
            },
            status=status.HTTP_201_CREATED,
        )

    @staticmethod
    def get_client_ip(request):
        forwarded_for = request.META.get(
            "HTTP_X_FORWARDED_FOR"
        )

        if forwarded_for:
            return forwarded_for.split(",")[0].strip()

        return request.META.get("REMOTE_ADDR")