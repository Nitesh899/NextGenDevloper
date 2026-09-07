from django.urls import path

from .views import portfolio_api


urlpatterns = [
    path("portfolio/", portfolio_api, name="portfolio"),
]