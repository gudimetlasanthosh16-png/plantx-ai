import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, ShieldCheck, Zap, Sprout, Image as ImageIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="w-full bg-background relative overflow-hidden">
      {/* Scroll-driven Parallax Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 -left-10 text-primary/10 w-64 h-64 blur-sm pointer-events-none rotate-12 z-0">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7,11.5 7,11.5C7,11.5 12,8 17,8Z"/></svg>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-1/4 -right-20 text-accent/10 w-96 h-96 blur-md pointer-events-none -rotate-45 z-0">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7,11.5 7,11.5C7,11.5 12,8 17,8Z"/></svg>
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-20 left-1/4 text-secondary/10 w-48 h-48 pointer-events-none rotate-90 z-0">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7,11.5 7,11.5C7,11.5 12,8 17,8Z"/></svg>
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 z-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466692476877-361ad312386a?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-6 px-6 py-2 rounded-full glass border border-primary/20 text-primary font-medium shadow-sm"
          >
            Nature's Intelligence, Now in Your Hands
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-dark-background mb-6 leading-tight"
          >
            Heal Your Plants <br className="hidden md:block" />
            <span className="text-primary italic">Instantly with AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-text max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Scan any leaf to identify diseases, get rustic treatment recommendations, and ensure your garden thrives naturally. Fast, accurate, and completely free.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mx-auto"
          >
            <button 
              onClick={() => navigate('/scan')}
              className="bg-primary hover:bg-secondary text-white font-buttons font-semibold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center w-full sm:w-auto space-x-2 group hover:-translate-y-1"
            >
              <ScanLine className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Scan Plant</span>
            </button>
            <div className="relative w-full sm:w-auto">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      navigate('/result', { state: { image: reader.result } });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
              />
              <button 
                className="glass-card text-primary font-buttons font-semibold text-lg px-8 py-4 rounded-2xl transition-all flex items-center justify-center w-full sm:w-auto space-x-2 group hover:bg-white/80 hover:-translate-y-1"
              >
                <ImageIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Upload Image</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-heading font-bold text-dark-background mb-4">How PlantX Helps You</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Zap className="text-primary h-8 w-8" />,
                title: "Instant AI Analysis",
                desc: "Get real-time results in seconds using our advanced botanical Vision AI model.",
                delay: 0
              },
              {
                icon: <Sprout className="text-secondary h-8 w-8" />,
                title: "Accurate Identification",
                desc: "Identify thousands of plant species and their specific diseases with high accuracy.",
                delay: 0.2
              },
              {
                icon: <ShieldCheck className="text-accent h-8 w-8" />,
                title: "Natural Treatments",
                desc: "Receive tailored organic and rustic treatment recommendations to save your plants.",
                delay: 0.4
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="glass-card rounded-3xl p-10 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="bg-white/50 backdrop-blur-sm border border-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-heading font-semibold text-dark-background mb-4">{feature.title}</h3>
                <p className="text-text leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

