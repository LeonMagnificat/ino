import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  ChartBarIcon, 
  UsersIcon, 
  BoltIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckIcon,
  PlayIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function LandingPage(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Development Manager, TechCorp",
      content: "Inspire has revolutionized our B2B outreach. The AI-powered opportunity discovery helped us identify 3 new enterprise clients within weeks, increasing our pipeline by 85%.",
      avatar: "/images/Humaaans/standing-1.svg"
    },
    {
      name: "Michael Chen",
      role: "Sales Director, GrowthLabs",
      content: "The web scraping and NLP capabilities are incredible. We now discover opportunities before our competitors even know they exist, giving us a massive competitive advantage.",
      avatar: "/images/Humaaans/sitting-1.svg"
    },
    {
      name: "Jessica Williams",
      role: "Strategic Partnerships Lead, Enterprise Solutions",
      content: "Inspire's personalized recommendations have transformed our approach to B2B sales. We're now reaching out with highly relevant proposals that actually resonate with prospects.",
      avatar: "/images/Humaaans/standing-2.svg"
    }
  ];

  const features = [
    {
      icon: ChartBarIcon,
      title: "AI-Powered Web Scraping",
      description: "Intelligent data extraction from news sources, company websites, and social media to gather real-time insights about your target companies.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: UsersIcon,
      title: "Target Company Analysis",
      description: "Input your target companies and get comprehensive analysis of their recent activities, growth patterns, and business needs.",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: BoltIcon,
      title: "Natural Language Processing",
      description: "Advanced NLP algorithms analyze news articles, press releases, and updates to extract meaningful business insights and trends.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: ShieldCheckIcon,
      title: "Personalized Recommendations",
      description: "Get tailored suggestions on how your services can address specific needs based on real-time company developments and trends.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Opportunity Scoring",
      description: "AI-powered scoring system ranks opportunities by relevance, timing, and potential success probability for your business.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: EyeIcon,
      title: "Market Intelligence",
      description: "Stay ahead with comprehensive market insights, competitor analysis, and industry trends that impact your B2B opportunities.",
      color: "from-teal-500 to-cyan-600"
    }
  ];

  const stats = [
    { value: "85%", label: "More relevant opportunities found" },
    { value: "12hrs", label: "Saved per week on research" },
    { value: "94%", label: "Accuracy in trend analysis" },
    { value: "3.2x", label: "Faster B2B outreach success" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Inspire
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">AI-powered B2B opportunity discovery is here</span>
                <ArrowRightIcon className="w-4 h-4 text-slate-400" />
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Discover Strategic
                </span>
                <br />
                <span className="text-white">B2B Opportunities</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform how you discover and pursue strategic B2B opportunities with AI-powered insights 
                that turn market intelligence into actionable business growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link 
                to="/signup"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRightIcon className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                <PlayIcon className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/30">
                <img 
                  src="/dashboard_mockup.png" 
                  alt="Inspire Dashboard Preview" 
                  className="w-full rounded-xl shadow-lg"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="mt-6 text-center">
                  <p className="text-slate-400 text-sm">
                    Experience the power of AI-driven B2B opportunity discovery
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Everything you need
              </span>
              <br />
              <span className="text-white">to succeed</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Powerful AI-driven tools designed specifically for B2B opportunity discovery. 
              Transform how you identify, analyze, and pursue strategic business opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-slate-600/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trusted by
              </span>
              <br />
              <span className="text-white">B2B professionals worldwide</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See how leading companies are using Inspire to discover strategic B2B opportunities and accelerate growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-3xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeTestimonial 
                          ? 'bg-blue-500 scale-125' 
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <img 
                      src={testimonials[activeTestimonial].avatar} 
                      alt={testimonials[activeTestimonial].name}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>

                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-slate-400 text-lg">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>

              {/* Star ratings */}
              <div className="flex justify-center mt-8">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-slate-800/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                How Inspire works
              </span>
              <br />
              <span className="text-white">for your business</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get started in minutes with our simple 4-step process designed for B2B opportunity discovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                step: 1,
                title: "Describe Your Services",
                description: "Tell us what your company offers - your products, services, and unique value propositions that set you apart in the market.",
                image: "/images/Humaaans/sitting-1.svg"
              },
              {
                step: 2,
                title: "Input Target Companies",
                description: "Add your list of target companies you want to connect with. Our system will analyze each one for relevant opportunities.",
                image: "/images/Humaaans/standing-1.svg"
              },
              {
                step: 3,
                title: "AI Web Scraping & Analysis",
                description: "Our AI scrapes news, updates, and trends about your target companies, using NLP to extract meaningful business insights.",
                image: "/images/Humaaans/sitting-2.svg"
              },
              {
                step: 4,
                title: "Get Personalized Recommendations",
                description: "Receive tailored suggestions on how your services can address specific needs based on real-time company developments.",
                image: "/images/Humaaans/standing-2.svg"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-48 h-48 flex-shrink-0 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-lg">
                    {item.step}
                  </div>
                  <div className="w-full h-full bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-700/50">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-32 h-32 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to discover strategic
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  B2B opportunities?
                </span>
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of B2B professionals who are already using Inspire to discover opportunities, 
                analyze target companies, and accelerate growth with AI-powered insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <Link 
                  to="/signup"
                  className="group bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRightIcon className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="group bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                  <PlayIcon className="w-5 h-5 inline mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center justify-center space-x-8 text-blue-100">
                <div className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5" />
                  <span>Setup in 5 minutes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Inspire
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6 text-slate-400">
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Security</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
              <div className="text-slate-400 text-sm">
                © 2024 Inspire, Inc. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
