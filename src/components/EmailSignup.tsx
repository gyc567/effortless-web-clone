import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Thank you!",
      description: "We'll be in touch soon with more information.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="w-full px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-xl mx-auto">
        <div className="card-shadow bg-card rounded-2xl p-6 md:p-8 border border-border">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Stay Updated
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Get notified about product updates, special offers, and availability.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-base"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              size="lg"
              className="h-12 px-8 font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailSignup;
