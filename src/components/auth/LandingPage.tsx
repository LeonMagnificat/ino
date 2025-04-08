import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LandingPage(): JSX.Element {
  const executeScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80; // Height of your fixed navbar
      const elementPosition = element.offsetTop; // Using offsetTop for more reliable positioning
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Enable smooth scrolling for the entire page
  useEffect(() => {
    // Add CSS to ensure the page is scrollable
    document.body.style.overflowY = 'auto';

    // Clean up function
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);
  return (
    <div className="bg-gradient-to-b from-[#0F051D] to-[#1A0B2E] text-white flex flex-col items-center px-6 overflow-x-hidden min-h-screen">
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-6 fixed top-0 z-50 bg-gradient-to-b from-[#0F051D]/95 to-transparent backdrop-blur-sm">
        <h1 className="text-xl font-bold">Ino</h1>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" onClick={(e) => { e.preventDefault(); executeScroll('features'); }} className="text-white hover:text-gray-300">Features</a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); executeScroll('testimonials'); }} className="text-white hover:text-gray-300">Testimonials</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); executeScroll('how-it-works'); }} className="text-white hover:text-gray-300">How It Works</a>
          <Link to="/login" className="text-white bg-transparent px-4 py-2 hover:bg-white/10 rounded">Login</Link>
          <Link to="/signup" className="bg-white text-black px-4 py-2 rounded hover:bg-white/90">Sign Up</Link>
        </div>
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-24 pt-16 max-w-4xl">
        <div className="bg-[#6227A7] text-sm px-4 py-2 rounded-full inline-block">
          New: AI-powered analytics now available! <a href="#features" onClick={(e) => { e.preventDefault(); executeScroll('features'); }} className="underline">See what's new</a>
        </div>
        <h2 className="text-5xl font-bold mt-6 leading-tight">
          Unlock business insights <br /> with powerful analytics
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          Vaultflow helps teams make better decisions with real-time data visualization, custom reports, and AI-powered insights that drive growth.
        </p>
        <div className="mt-6 space-x-4">
          <button className="bg-white text-black px-6 py-3 rounded font-medium hover:bg-white/90">Start Free Trial</button>
          <button className="text-white border border-white px-6 py-3 rounded font-medium hover:bg-white/10" onClick={() => executeScroll('how-it-works')}>Schedule Demo</button>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="mt-12 w-full max-w-5xl">
        <div style={{ backgroundColor: '#1A0B2E', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <img src="/dashboard.png" alt="Analytics dashboard preview" style={{ borderRadius: '8px', width: '100%' }} />
        </div>
      </div>

      {/* Key Features Section */}
      <div id="features" className="mt-24 w-full max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need in one platform</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful tools to help you track, analyze, and optimize your business performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
            <div className="bg-[#6227A7] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-400">Monitor your business performance with live dashboards and instant insights.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
            <div className="bg-[#6227A7] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-400">Leverage machine learning to uncover patterns and predict future trends.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
            <div className="bg-[#6227A7] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Reporting</h3>
            <p className="text-gray-400">Create tailored reports with drag-and-drop simplicity for any stakeholder.</p>
          </div>
        </div>
      </div>

      {/* Testimonials with Humaaans */}
      <div id="testimonials" className="mt-24 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">Trusted by innovative teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 mr-4">
                <img src="/images/Humaaans/standing-1.svg" alt="Customer" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <p className="text-gray-400">Marketing Director, Acme Inc.</p>
              </div>
            </div>
            <p className="text-gray-300 italic">"Vaultflow transformed how we analyze campaign performance. The insights we've gained have increased our ROI by 37% in just three months."</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 mr-4">
                <img src="/images/Humaaans/sitting-1.svg" alt="Customer" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Michael Chen</h3>
                <p className="text-gray-400">CTO, TechNova</p>
              </div>
            </div>
            <p className="text-gray-300 italic">"The AI-powered forecasting has been a game-changer for our product planning. We can now anticipate market shifts with remarkable accuracy."</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 mr-4">
                <img src="/images/Humaaans/standing-2.svg" alt="Customer" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Jessica Williams</h3>
                <p className="text-gray-400">CEO, GrowthLabs</p>
              </div>
            </div>
            <p className="text-gray-300 italic">"Implementing Vaultflow was the best decision we made last year. The platform's ease of use and depth of insights have accelerated our growth strategy."</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="mt-24 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16">How Vaultflow works for your business</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0 relative">
              <div className="absolute top-0 left-0 bg-[#6227A7] w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
              <img src="/images/Humaaans/working-1.svg" alt="Connect data sources" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Connect your data sources</h3>
              <p className="text-gray-400">Easily integrate with your existing tools and platforms with our 50+ pre-built connectors.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0 relative">
              <div className="absolute top-0 left-0 bg-[#6227A7] w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
              <img src="/images/Humaaans/working-2.svg" alt="Customize dashboards" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Customize your dashboards</h3>
              <p className="text-gray-400">Build personalized views with our intuitive drag-and-drop interface, no coding required.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0 relative">
              <div className="absolute top-0 left-0 bg-[#6227A7] w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
              <img src="/images/Humaaans/sitting-2.svg" alt="Analyze data" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Analyze and discover insights</h3>
              <p className="text-gray-400">Let our AI identify trends, anomalies, and opportunities hidden in your data.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0 relative">
              <div className="absolute top-0 left-0 bg-[#6227A7] w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
              <img src="/images/Humaaans/standing-3.svg" alt="Take action" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Take action and grow</h3>
              <p className="text-gray-400">Make data-driven decisions and set up automated workflows based on your insights.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 w-full max-w-6xl mb-20">
        <div className="bg-gradient-to-r from-[#6227A7] to-[#8A42D5] rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your analytics?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of companies using Vaultflow to make better decisions with data.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-white text-[#6227A7] px-6 py-3 rounded font-medium hover:bg-white/90">Start your free 14-day trial</button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded font-medium hover:bg-white/10">
              Request a demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl py-8 border-t border-white/10 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold">Vaultflow</h1>
            <p className="text-gray-400 text-sm">© 2023 Vaultflow, Inc. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white">Security</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
