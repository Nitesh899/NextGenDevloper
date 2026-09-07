from rest_framework.permissions import BasePermission


class IsAuthenticatedUser(BasePermission):
    """
    Allows access only to authenticated users.
    """

    message = "Authentication is required to access this resource."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
        )


class IsAdminUser(BasePermission):
    """
    Allows access only to authenticated admin users.
    """

    message = "Administrator access is required."

    def has_permission(self, request, view):
        user = request.user

        return bool(
            user
            and user.is_authenticated
            and user.is_staff
            and user.is_superuser
        )


class IsAdminAccount(BasePermission):
    """
    Allows access only to users whose account_type is ADMIN.
    """

    message = "Admin account access is required."

    def has_permission(self, request, view):
        user = request.user

        return bool(
            user
            and user.is_authenticated
            and user.account_type == "ADMIN"
        )