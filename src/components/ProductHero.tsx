import miniPc from "@/assets/mini-pc.png";

const ProductHero = () => {
  return (
    <section className="w-full px-4 md:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in text-balance">
          The <span className="text-primary">MiniBot</span> PC
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Pre-installed Windows with latest OpenClaw Agent. Ready to use out of the box.
        </p>

        {/* Pricing */}
        <div className="flex items-baseline justify-center gap-3 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="price-current">$200</span>
          <span className="price-original">$299</span>
        </div>

        {/* Product Image */}
        <div className="relative mx-auto max-w-md mb-10 animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <div className="animate-float">
            <img 
              src={miniPc} 
              alt="MiniBot PC - Compact desktop computer" 
              className="w-full h-auto product-shadow rounded-2xl"
            />
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <span className="feature-badge">8GB RAM</span>
          <span className="feature-badge">128GB M.2 SSD</span>
          <span className="feature-badge">Remote Control</span>
          <span className="feature-badge">Plug & Play</span>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
