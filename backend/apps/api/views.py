from django.db.models import Prefetch

from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.about.models import AboutPage, Experience, Skill
from apps.blogs.models import BlogCategory, BlogPost, BlogSEO, BlogTag
from apps.careers.models import CareerDepartment, JobOpening
from apps.core.models import HomeContent, Roadmap, SiteSettings, Technology
from apps.projects.models import Project
from apps.services.models import Service, ServiceFeature, ServiceProcess
from apps.testimonials.models import Testimonial

from .serializers import (
    AboutPageSerializer,
    BlogCategorySerializer,
    BlogPostSerializer,
    BlogSEOSerializer,
    BlogTagSerializer,
    CareerDepartmentSerializer,
    ExperienceSerializer,
    HomeContentSerializer,
    JobOpeningSerializer,
    ProjectSerializer,
    RoadmapSerializer,
    ServiceFeatureSerializer,
    ServiceProcessSerializer,
    ServiceSerializer,
    SiteSettingsSerializer,
    SkillSerializer,
    TechnologySerializer,
    TestimonialSerializer,
)


@api_view(["GET"])
def portfolio_api(request):
    """
    Main public portfolio API.

    Returns all public portfolio content
    in a single JSON response.
    """

    # ==============================
    # CORE / HOME
    # ==============================

    site_settings = (
        SiteSettings.objects
        .filter(is_active=True)
        .first()
    )

    home_content = (
        HomeContent.objects
        .filter(is_active=True)
        .first()
    )

    technologies = (
        Technology.objects
        .filter(is_active=True)
        .order_by("display_order", "name")
    )

    roadmap = (
        Roadmap.objects
        .filter(is_active=True)
        .order_by("display_order")
    )


    # ==============================
    # ABOUT
    # ==============================

    about_page = (
        AboutPage.objects
        .filter(is_active=True)
        .first()
    )

    skills = (
        Skill.objects
        .filter(is_active=True)
        .order_by("display_order", "name")
    )

    experiences = (
        Experience.objects
        .filter(is_active=True)
        .order_by("-start_date", "display_order")
    )


    # ==============================
    # SERVICES
    # ==============================

    service_features_queryset = (
        ServiceFeature.objects
        .filter(is_active=True)
        .order_by("display_order", "title")
    )

    service_processes_queryset = (
        ServiceProcess.objects
        .filter(is_active=True)
        .order_by("display_order", "step_number")
    )

    services = (
        Service.objects
        .filter(status="ACTIVE")
        .order_by("display_order", "name")
    )

    service_features = (
        ServiceFeature.objects
        .filter(is_active=True)
        .order_by(
            "service_id",
            "display_order",
            "title",
        )
    )

    service_processes = (
        ServiceProcess.objects
        .filter(is_active=True)
        .order_by(
            "service_id",
            "display_order",
            "step_number",
        )
    )


    # ==============================
    # PROJECTS
    # ==============================

    projects = (
        Project.objects
        .filter(is_active=True)
        .order_by(
            "display_order",
            "-created_at",
        )
    )


    # ==============================
    # BLOG
    # ==============================

    blog_categories = (
        BlogCategory.objects
        .filter(is_active=True)
        .order_by(
            "display_order",
            "name",
        )
    )

    blog_tags = (
        BlogTag.objects
        .filter(is_active=True)
        .order_by("name")
    )

    blog_posts = (
        BlogPost.objects
        .filter(
            status="PUBLISHED",
            is_active=True,
        )
        .select_related(
            "category",
            "author",
        )
        .prefetch_related("tags")
        .order_by(
            "-published_at",
            "-created_at",
        )
    )

    blog_seo = (
        BlogSEO.objects
        .filter(
            post__status="PUBLISHED",
            post__is_active=True,
        )
        .select_related("post")
    )


    # ==============================
    # CAREERS
    # ==============================

    career_departments = (
        CareerDepartment.objects
        .filter(is_active=True)
        .order_by(
            "display_order",
            "name",
        )
    )

    job_openings = (
        JobOpening.objects
        .filter(
            status="OPEN",
        )
        .select_related("department")
        .order_by(
            "display_order",
            "-created_at",
        )
    )


    # ==============================
    # TESTIMONIALS
    # ==============================

    testimonials = (
        Testimonial.objects
        .filter(
            status="APPROVED",
            is_active=True,
        )
        .order_by(
            "display_order",
            "-created_at",
        )
    )

    # ==============================
    # FINAL RESPONSE
    # ==============================

    return Response(
        {
            "success": True,
            "message": "NextGenDevloper portfolio data retrieved successfully.",
            "data": {
                # Core / Home
                "site_settings": (
                    SiteSettingsSerializer(site_settings).data
                    if site_settings
                    else None
                ),
                "home": (
                    HomeContentSerializer(home_content).data
                    if home_content
                    else None
                ),
                "technologies": TechnologySerializer(
                    technologies,
                    many=True,
                ).data,
                "roadmap": RoadmapSerializer(
                    roadmap,
                    many=True,
                ).data,

                # About
                "about": (
                    AboutPageSerializer(
                        about_page,
                        context={"request": request},
                    ).data
                    if about_page
                    else None
                ),
                "skills": SkillSerializer(
                    skills,
                    many=True,
                ).data,
                "experience": ExperienceSerializer(
                    experiences,
                    many=True,
                ).data,

                # Services
                "services": ServiceSerializer(
                    services,
                    many=True,
                ).data,
                "service_features": ServiceFeatureSerializer(
                    service_features,
                    many=True,
                ).data,
                "service_processes": ServiceProcessSerializer(
                    service_processes,
                    many=True,
                ).data,

                # Projects
                "projects": ProjectSerializer(
                    projects,
                    many=True,
                    context={"request": request},
                ).data,

                # Blog
                "blog_categories": BlogCategorySerializer(
                    blog_categories,
                    many=True,
                ).data,
                "blog_tags": BlogTagSerializer(
                    blog_tags,
                    many=True,
                ).data,
                "blog_posts": BlogPostSerializer(
                    blog_posts,
                    many=True,
                    context={"request": request},
                ).data,
                "blog_seo": BlogSEOSerializer(
                    blog_seo,
                    many=True,
                    context={"request": request},
                ).data,

                # Careers
                "career_departments": CareerDepartmentSerializer(
                    career_departments,
                    many=True,
                ).data,
                "job_openings": JobOpeningSerializer(
                    job_openings,
                    many=True,
                ).data,

                # Testimonials
                "testimonials": TestimonialSerializer(
                    testimonials,
                    many=True,
                    context={"request": request},
                ).data,
            },
        }
    )