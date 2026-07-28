import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, ShieldCheck, Zap, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark-background mb-6"
          >
            Detect Plant Diseases <br className="hidden md:block" />
            <span className="text-primary">Instantly with AI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-text max-w-2xl mx-auto mb-10"
          >
            Scan any plant to identify diseases, get treatment recommendations, and ensure your garden thrives. Fast, accurate, and completely free.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button 
              onClick={() => navigate('/scan')}
              className="bg-primary hover:bg-secondary text-white font-buttons font-semibold text-lg px-8 py-4 rounded-full shadow-lg shadow-primary/30 transition-all flex items-center justify-center mx-auto space-x-2"
            >
              <ScanLine className="h-6 w-6" />
              <span>Scan Plant Now</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-dark-background">How PlantX Helps You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-2xl p-8 border border-primary/10 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Zap className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-dark-background mb-3">Instant AI Analysis</h3>
              <p className="text-text">Get real-time results in seconds using our advanced Vision AI model.</p>
            </div>
            <div className="bg-background rounded-2xl p-8 border border-primary/10 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-secondary/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Sprout className="text-secondary h-7 w-7" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-dark-background mb-3">Accurate Identification</h3>
              <p className="text-text">Identify thousands of plant species and their specific diseases with high accuracy.</p>
            </div>
            <div className="bg-background rounded-2xl p-8 border border-primary/10 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-accent/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="text-accent h-7 w-7" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-dark-background mb-3">Treatment Plans</h3>
              <p className="text-text">Receive tailored organic and chemical treatment recommendations to save your plants.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
