import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import EasyStepsSection from "@/components/landing/EasyStepsSection";

const Home = () => (
  <main className="relative">
    {/* Background Effects */}
    <div className="fixed top-36 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />
    <HeroSection />
    <ServicesSection />
    <EasyStepsSection />
  </main>
);

export default Home;
