
import AboutSection from "@/components/home/AboutSection";
import HeroBanner from "@/components/home/HeroBanner";
import InstagramGallery from "@/components/home/InstagramGallery";

export default function Home() {
  return (
    <div className="w-full">
      <HeroBanner />
      <AboutSection />
      <InstagramGallery />
    </div>
  );
}

