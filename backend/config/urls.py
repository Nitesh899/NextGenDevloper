from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

import config.admin


def api_home(request):
    return JsonResponse({
        "success": True,
        "message": "NextGenDevloper API is running.",
        "api": "/api/portfolio/",
        "admin": "/admin/",
    })


urlpatterns = [
    path("", api_home, name="api-home"),

    path("admin/", admin.site.urls),

    path("api/", include("apps.api.urls")),
    path("api/auth/", include("apps.accounts.urls")),
    path("api/contact/", include("apps.contact.urls")),
    path("api/quotes/", include("apps.quotes.urls")),
]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )