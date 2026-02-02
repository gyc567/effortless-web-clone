import { CreditCard, Truck, Shield, Lock, Clock, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full px-4 md:px-8 py-8 border-t border-border bg-card/50">
      <div className="max-w-4xl mx-auto">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="w-4 h-4 text-primary" />
            <span>Worldwide Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="w-4 h-4 text-primary" />
            <span>Pay with Card / PayPal</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>30-Day Returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Ships in 2-3 Days</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 mb-6 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" />
          <span>Secure checkout • Encrypted payments • Your data stays private</span>
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
