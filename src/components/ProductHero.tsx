import miniPc from "@/assets/mini-pc.png";
import { Cpu, HardDrive, Wifi, Zap, Globe, Shield } from "lucide-react";

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

        {/* Product Image */}
        <div className="relative mx-auto max-w-md mb-10 animate-scale-in">
          <div className="animate-float">
            <img
              src={miniPc}
              alt="MiniBot PC - Compact desktop computer"
              className="w-full h-auto product-shadow rounded-2xl"
            />
          </div>
        </div>

        {/* Feature Badges */}
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

        {/* Specs Table */}
        <div className="max-w-2xl mx-auto bg-card rounded-xl border border-border p-6 text-left animate-fade-in">
          <h3 className="font-semibold mb-4 text-center">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Processor</p>
                <p className="text-muted-foreground">RK3588 (8-core) or Intel N100</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Memory</p>
                <p className="text-muted-foreground">8GB LPDDR5</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Storage</p>
                <p className="text-muted-foreground">128GB M.2 NVMe SSD</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Connectivity</p>
                <p className="text-muted-foreground">WiFi 6 + Bluetooth 5.2</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Ports</p>
                <p className="text-muted-foreground">USB-C, HDMI 2.1, RJ45</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">OS</p>
                <p className="text-muted-foreground">Windows 11 + OpenClaw</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
