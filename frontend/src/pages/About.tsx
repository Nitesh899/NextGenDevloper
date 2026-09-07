import AboutHero from "../components/about/AboutHero";
import AboutIntroduction from "../components/about/AboutIntroduction";
import MissionVision from "../components/about/MissionVision";
import SkillsSection from "../components/about/SkillsSection";
import ExperienceTimeline from "../components/about/ExperienceTimeline";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutIntroduction />
      <MissionVision />
      <SkillsSection />
      <ExperienceTimeline />
    </>
  );
}