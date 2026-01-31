import { Bot, MessageSquare, Zap, Globe, Shield, Smartphone } from "lucide-react";

const OpenClawSection = () => {
  const features = [
    {
      icon: Bot,
      title: "Personal AI Assistant",
      description: "Your own AI that remembers everything and learns your preferences over time.",
    },
    {
      icon: MessageSquare,
      title: "Multi-Platform Support",
      description: "Connect via Telegram, WhatsApp, Discord, WeChat, or web chat.",
    },
    {
      icon: Smartphone,
      title: "Voice & Multimedia",
      description: "Voice commands, image generation, and file processing capabilities.",
    },
    {
      icon: Zap,
      title: "100+ Skills",
      description: "Email automation, calendar management, smart home control, and more.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "Your data stays on your device. No cloud dependency, ever.",
    },
    {
      icon: Globe,
      title: "Open Source",
      description: "Built on OpenClaw, MIT licensed. Inspect the code, modify as you wish.",
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-12 md:py-20 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Bot className="w-4 h-4" />
            Powered by OpenClaw
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Your Private AI, Fully Local
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            MiniBot PC comes pre-configured with OpenClaw — the open-source personal AI assistant
            that keeps your data private while delivering powerful AI capabilities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-background border border-border card-shadow hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="bg-background rounded-xl border border-border overflow-hidden mb-10">
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 font-medium text-sm text-center">
            <div>Feature</div>
            <div className="text-primary">MiniBot PC</div>
            <div className="text-muted-foreground">ChatGPT Plus</div>
          </div>
          <div className="grid grid-cols-3 gap-4 p-4 border-t border-border text-sm text-center">
            <div className="text-left">Data Privacy</div>
            <div className="text-green-600 font-medium">100% Local</div>
            <div className="text-red-500">Cloud-based</div>
          </div>
          <div className="grid grid-cols-3 gap-4 p-4 border-t border-border text-sm text-center">
            <div className="text-left">Monthly Cost</div>
            <div className="text-primary font-medium">$199 (one-time)</div>
            <div className="text-muted-foreground">$20/month</div>
          </div>
          <div className="grid grid-cols-3 gap-4 p-4 border-t border-border text-sm text-center">
            <div className="text-left">Platform Integration</div>
            <div className="text-primary font-medium">All major apps</div>
            <div className="text-muted-foreground">Web only</div>
          </div>
          <div className="grid grid-cols-3 gap-4 p-4 border-t border-border text-sm text-center">
            <div className="text-left">Custom Skills</div>
            <div className="text-primary font-medium">Unlimited</div>
            <div className="text-muted-foreground">Limited</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Experience the future of personal AI — no subscription, total privacy.
          </p>
          <a
            href="https://openclaw.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Learn more about OpenClaw
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OpenClawSection;
