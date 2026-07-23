import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SellerRegister = () => {
  return (
    <div className="min-h-screen hero-gradient flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Become a Seller
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Monetize Your AI Agent Skills
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">🚀 Publish Your Skills</h2>
              <p className="text-gray-300">List your AI agent skills for global buyers to discover and purchase.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">💰 Earn USDC</h2>
              <p className="text-gray-300">Get paid in USDC on Base chain. Fast, secure settlements.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">📊 Dashboard</h2>
              <p className="text-gray-300">Track sales, manage orders, and monitor your earnings.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">🔧 Easy Integration</h2>
              <p className="text-gray-300">Deploy with zero cost using OpenClaw's infrastructure.</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-white">Ready to start selling?</h3>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
              Connect Wallet
            </button>
          </div>

          <div className="flex justify-center gap-12">
            <div className="text-center">
              <span className="block text-3xl font-bold text-white">500+</span>
              <span className="text-gray-400">Active Sellers</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-white">1000+</span>
              <span className="text-gray-400">Skills Listed</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-white">$50K+</span>
              <span className="text-gray-400">Monthly GMV</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerRegister;
