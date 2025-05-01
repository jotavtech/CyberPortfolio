import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
