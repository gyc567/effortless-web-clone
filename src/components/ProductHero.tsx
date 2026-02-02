import miniPc from "@/assets/mini-pc.png";
import { Cpu, HardDrive, Wifi, Zap, Globe, Shield, ArrowRight } from "lucide-react";

const ProductHero = () => {
  return (
    <section className="w-full px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in text-balance">
          The <span className="text-primary">MiniBot</span> PC
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
          Your private AI assistant in a box. Pre-installed OpenClaw, ready to use.
        </p>

        {/* Pricing */}
        <div className="flex items-baseline justify-center gap-3 mb-6 animate-fade-in">
          <span className="text-4xl font-bold text-primary">$199</span>
          <span className="text-xl text-muted-foreground line-through">$299</span>
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Save $100
          </span>
        </div>

        {/* Product Image - Apple Style with Personalization */}
        <div className="relative mx-auto max-w-lg mb-12 animate-scale-in">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent rounded-3xl blur-3xl -z-10" />
          
          {/* Product container */}
          <div className="relative bg-gradient-to-b from-gray-100 to-white rounded-3xl p-8 shadow-2xl product-shadow">
            <img
              src={miniPc}
              alt="MiniBot PC - Compact desktop computer"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
              Pre-installed OpenClaw
            </div>
          </div>
        </div>

        {/* Feature Badges - Apple Style */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="feature-badge flex items-center gap-1">
            <Cpu className="w-4 h-4" /> RK3588 / N100
          </span>
          <span className="feature-badge flex items-center gap-1">
            <HardDrive className="w-4 h-4" /> 8GB RAM
          </span>
          <span className="feature-badge flex items-center gap-1">
            <HardDrive className="w-4 h-4" /> 128GB SSD
          </span>
          <span className="feature-badge flex items-center gap-1">
            <Wifi className="w-4 h-4" /> WiFi 6
          </span>
        </div>

        {/* Specs Table - Apple Style */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left animate-fade-in">
          <h3 className="font-semibold mb-4 text-center text-lg">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <Cpu className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Processor</p>
                <p className="text-muted-foreground">RK3588 (8-core) or Intel N100</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <Zap className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Memory</p>
                <p className="text-muted-foreground">8GB LPDDR5</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <HardDrive className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Storage</p>
                <p className="text-muted-foreground">128GB M.2 NVMe SSD</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <Wifi className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Connectivity</p>
                <p className="text-muted-foreground">WiFi 6 + Bluetooth 5.2</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <Globe className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Ports</p>
                <p className="text-muted-foreground">USB-C, HDMI 2.1, RJ45</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">OS</p>
                <p className="text-muted-foreground">Ubuntu 22.04/24.04 + OpenClaw</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 animate-fade-in">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
          >
            Get Yours Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
