import CTA from "@/components/Landing/CTA";
import FAQ from "@/components/Landing/FAQ";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import HowItWorks from "@/components/Landing/HowItWorks";
import Places from "@/components/Landing/Places";
import WhereTo from "@/components/Landing/WhereTo";
import WhyZig from "@/components/Landing/WhyZig";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <WhereTo />
      <Places />
      <HowItWorks />
      <WhyZig />
      <CTA />
      <FAQ />
      <Footer />
    </div>
  );
}
