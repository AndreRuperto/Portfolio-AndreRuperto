import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import GithubActivity from '@/components/GithubActivity';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ResumeSection />
        <SkillsSection />
        <ProjectsSection />
        <GithubActivity />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
