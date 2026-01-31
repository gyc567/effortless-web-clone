import { CreditCard, Truck, Shield } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full px-4 md:px-8 py-8 border-t border-border bg-card/50">
      <div className="max-w-4xl mx-auto">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="w-4 h-4" />
            <span>Worldwide Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="w-4 h-4" />
            <span>Pay with Card / PayPal</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>30-Day Returns</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MiniBot PC. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            OpenClaw is a registered trademark. Not affiliated with OpenAI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
