import { Button } from "@/components/ui/button";
import { Mail, Twitter, Facebook, Linkedin } from "lucide-react";

const XIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-5 h-5 fill-current"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ContactSection = () => {
  const shareUrl = "https://www.openclawai.shop/";
  const shareText = "Check out MiniBot PC - Your Private AI Assistant in a Box ($199)";

  return (
    <section id="contact" className="w-full px-4 md:px-8 py-12 md:py-16 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Ready to order or have questions? Contact us directly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto gap-2 h-12"
            asChild
          >
            <a href="mailto:gyc567@gmail.com">
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </Button>

          <Button 
            variant="default" 
            size="lg"
            className="w-full sm:w-auto gap-2 h-12"
            asChild
          >
            <a 
              href="https://x.com/ericblock2100" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <XIcon />
              Contact on X
            </a>
          </Button>
        </div>

        {/* Share Section */}
        <div className="bg-card rounded-xl border border-border p-6 text-center">
          <p className="text-sm font-medium mb-4">Share this with your friends</p>
          <div className="flex justify-center gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2]/20 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#4267B2]/10 text-[#4267B2] flex items-center justify-center hover:bg-[#4267B2]/20 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2]/20 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Orders shipped within 2-3 business days • Pay via PayPal, Stripe, or crypto
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
