from rest_framework import serializers
from rest_framework import serializers

from apps.about.models import (
    AboutPage,
    Experience,
    Skill,
)

from apps.blogs.models import (
    BlogCategory,
    BlogPost,
    BlogSEO,
    BlogTag,
)

from apps.careers.models import (
    CareerDepartment,
    JobOpening,
)

from apps.core.models import (
    HomeContent,
    Roadmap,
    SiteSettings,
    Technology,
)

from apps.projects.models import Project

from apps.services.models import (
    Service,
    ServiceFeature,
    ServiceProcess,
)

from apps.testimonials.models import Testimonial


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class HomeContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeContent
        fields = "__all__"


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = "__all__"


class RoadmapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roadmap
        fields = "__all__"


class AboutPageSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = AboutPage
        fields = "__all__"

    def get_profile_image(self, obj):
        request = self.context.get("request")
        return get_absolute_url(request, obj.profile_image)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = "__all__"


class ServiceProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProcess
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    gallery_image_1 = serializers.SerializerMethodField()
    gallery_image_2 = serializers.SerializerMethodField()
    gallery_image_3 = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = "__all__"

    def get_thumbnail(self, obj):
        request = self.context.get("request")
        return get_absolute_url(request, obj.thumbnail)

    def get_gallery_image_1(self, obj):
        request = self.context.get("request")
        return get_absolute_url(request, obj.gallery_image_1)

    def get_gallery_image_2(self, obj):
        request = self.context.get("request")
        return get_absolute_url(request, obj.gallery_image_2)

    def get_gallery_image_3(self, obj):
        request = self.context.get("request")
        return get_absolute_url(request, obj.gallery_image_3)


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = "__all__"


class BlogTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTag
        fields = "__all__"


class BlogPostSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = "__all__"

    def get_cover_image(self, obj):
        request = self.context.get("request")
        return get_absolute_url(request, obj.cover_image)


class BlogSEOSerializer(serializers.ModelSerializer):
    og_image = serializers.SerializerMethodField()

    class Meta:
        model = BlogSEO
        fields = "__all__"

    def get_og_image(self, obj):
        request = self.context.get("request")
        return get_absolute_url(request, obj.og_image)


class CareerDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerDepartment
        fields = "__all__"


class JobOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    client_photo = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = "__all__"

    def get_client_photo(self, obj):
        request = self.context.get("request")
        return get_absolute_url(request, obj.client_photo)


def get_absolute_url(request, file_field):
    if not file_field:
        return None

    url = file_field.url

    if request:
        return request.build_absolute_uri(url)

    return url