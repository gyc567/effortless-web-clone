import { Bot, Zap, MessageSquare, Globe, Sparkles } from "lucide-react";

const OpenClawSection = () => {
  const features = [
    {
      icon: Bot,
      title: "Personal AI Assistant",
      description: "Your own AI that remembers everything and learns your preferences over time.",
    },
    {
      icon: MessageSquare,
      title: "Multi-Platform Integration",
      description: "Connect via Discord, Telegram, WhatsApp, or any messaging platform you prefer.",
    },
    {
      icon: Zap,
      title: "Extensible Skills",
      description: "Create custom automations for email, calendar, smart home, and more.",
    },
    {
      icon: Globe,
      title: "Self-Hosted & Private",
      description: "Your data stays on your device. Full control, no cloud dependency.",
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-12 md:py-20 bg-card border-y border-border">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Built-in AI Power
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Fully Integrated with{" "}
            <a 
              href="https://openclaw.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              OpenClaw
            </a>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            MiniBot PC comes pre-configured with OpenClaw — the open-source personal AI assistant 
            that transforms how you interact with technology. Just power on and start chatting.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-background border border-border card-shadow hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Experience the future of personal AI — ready out of the box.
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
