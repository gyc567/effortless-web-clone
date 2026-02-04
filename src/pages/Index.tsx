import Header from "@/components/Header";
import ProductHero from "@/components/ProductHero";
import OpenClawSection from "@/components/OpenClawSection";
import EmailSignup from "@/components/EmailSignup";
import PaymentSection from "@/components/PaymentSection";
import ReferralPromotion from "@/components/ReferralPromotion";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductHero />
        <OpenClawSection />
        <PaymentSection />
        <ReferralPromotion />
        <EmailSignup />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
// Referral system deployed - Wed Feb  4 09:28:10 AM UTC 2026
