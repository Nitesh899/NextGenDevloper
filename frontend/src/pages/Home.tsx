import HeroSection from "../components/home/HeroSection";
import AboutPreview from "../components/home/AboutPreview";
import TechnologySection from "../components/home/TechnologySection";
import ServicesPreview from "../components/home/ServicesPreview";
import FeaturedProjects from "../components/home/FeaturedProjects";
import ExperienceStats from "../components/home/ExperienceStats";
import RoadmapPreview from "../components/home/RoadmapPreview";
import TestimonialsPreview from "../components/home/TestimonialsPreview";
import BlogPreview from "../components/home/BlogPreview";


export default function Home() {
  return (
    <>
      <HeroSection />

      <AboutPreview />

      <TechnologySection />

      <ServicesPreview />

      <FeaturedProjects />

      <ExperienceStats />

      <RoadmapPreview />

      <TestimonialsPreview />

      <BlogPreview />

  
    </>
  );
}