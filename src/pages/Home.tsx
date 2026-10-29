import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ScanLine, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle, 
  Droplets, 
  ChevronDown, 
  Activity, 
  Layers,
  Sprout,
  Bug,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroLeft from '../components/HeroLeft';
import HeroRight from '../components/HeroRight';
import LanguageSelector from '../components/LanguageSelector';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';
import { SAMPLE_PLANTS, type SamplePlant } from '../data/samplePlants';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { t } = useLanguage();

  const openSamplePlant = (sample: SamplePlant) => {
    navigate('/result', { 
      state: { 
        image: sample.imageUrl, 
        presetData: sample.presetData 
      } 
    });
  };

  const diseaseIcons = [
    AlertTriangle,
    Layers,
    Activity,
    Sparkles,
    Droplets,
    ShieldCheck
  ];

  return (
    <div className="w-full relative overflow-hidden min-h-screen text-slate-800">
      
      {/* 3D Liquid Canvas Background Animation - Crystal-clear ripples over visible sunlit forest */}
      <LiquidEffectAnimation 
        className="fixed inset-0 z-0 pointer-events-none opacity-95" 
        imageSrc="/bright-trees.jpg"
        color="#ffffff"
        metalness={0.02}
        roughness={0.35}
        rain={true}
      />
      
      {/* Foreground Content Stack */}
      <div className="relative z-10">
        
        {/* Floating Multilingual & Read Aloud Control (Matching user screenshot) */}
        <div className="fixed top-24 right-6 z-40 hidden sm:block animate-in fade-in slide-in-from-top-4 duration-300">
          <LanguageSelector className="shadow-2xl border-2 border-emerald-300/80 bg-white/95" />
        </div>

        {/* 1. Motion Graphical Hero Section */}
        <section className="relative pt-8 pb-14 md:pt-14 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              <HeroLeft />
              <HeroRight />
            </div>
          </div>
        </section>

        {/* 2. Metrics / Stats Bar - Redesigned Floating Emerald Cards */}
        <section className="py-8 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-emerald-200/80 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[#009e52] flex-shrink-0 shadow-sm">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#009e52] font-space tracking-tight">
                    120+
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-950/80 uppercase tracking-wider font-space">
                    {t.stats.species}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-emerald-200/80 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 flex-shrink-0 shadow-sm">
                  <Bug className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 font-space tracking-tight">
                    50+
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-950/80 uppercase tracking-wider font-space">
                    {t.stats.pathogens}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-emerald-200/80 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[#009e52] flex-shrink-0 shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#009e52] font-space tracking-tight">
                    &lt; 2.0s
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-950/80 uppercase tracking-wider font-space">
                    {t.stats.speed}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-emerald-200/80 hover:border-emerald-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 font-space tracking-tight">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-950/80 uppercase tracking-wider font-space">
                    {t.stats.openAccess}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Sample Plants Quick-Test Gallery - Elevated Botanical Cards */}
        <section id="samples" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-14 p-8 rounded-3xl bg-white/85 backdrop-blur-xl border-2 border-emerald-300/60 shadow-xl">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-300 font-space shadow-sm">
                {t.samples.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-space font-extrabold text-slate-900 mt-3">
                {t.samples.heading}
              </h2>
              <p className="text-slate-700 mt-3 text-base font-sans font-medium">
                {t.samples.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SAMPLE_PLANTS.map((sample) => {
                const statusColor = 
                  sample.status === 'Healthy' 
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                    : sample.status === 'Warning' 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-rose-100 text-rose-900 border-rose-300';

                return (
                  <motion.div
                    key={sample.id}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => openSamplePlant(sample)}
                    className="cursor-pointer bg-white/95 backdrop-blur-2xl rounded-[30px] overflow-hidden border-2 border-emerald-200/80 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-2xl group flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={sample.imageUrl} 
                        alt={sample.name} 
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold border shadow-md ${statusColor} font-space`}>
                          {sample.status}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold font-space border border-white/20">
                          {sample.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-b from-transparent to-emerald-50/40">
                      <div>
                        <h3 className="font-space font-extrabold text-slate-900 text-lg group-hover:text-[#009e52] transition-colors">
                          {sample.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{sample.subtitle}</p>
                      </div>

                      <div className="pt-2 border-t border-emerald-100">
                        <p className="text-xs text-slate-500 font-sans">{t.samples.condition}</p>
                        <p className="text-sm font-bold text-emerald-950 truncate font-space">{sample.diseaseName}</p>
                      </div>

                      <button 
                        className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold transition-all duration-200 flex items-center justify-center space-x-1.5 font-space shadow-md group-hover:shadow-lg"
                      >
                        <span>{t.samples.analyzeBtn}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 4. How It Works (3 Steps) - Multilingual Pipeline */}
        <section id="how-it-works" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-16 p-8 rounded-3xl bg-white/85 backdrop-blur-xl border-2 border-emerald-300/60 shadow-xl">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-300 font-space shadow-sm">
                {t.workflow.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-space font-extrabold text-slate-900 mt-3">
                {t.workflow.heading}
              </h2>
              <p className="text-slate-700 mt-3 text-base font-sans font-medium">
                {t.workflow.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {t.workflow.steps.map((step, idx) => {
                const gradients = [
                  'from-[#1d6b38] to-[#009e52]',
                  'from-teal-700 to-emerald-600',
                  'from-emerald-800 to-green-600'
                ];
                return (
                  <div 
                    key={idx}
                    className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-8 relative hover:-translate-y-2 transition-all duration-300 border-2 border-emerald-200/80 hover:border-emerald-500 shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${gradients[idx] || gradients[0]} text-white font-space font-extrabold text-2xl flex items-center justify-center mb-6 shadow-md`}>
                        {idx + 1}
                      </div>
                      <h3 className="font-space font-extrabold text-xl text-slate-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-emerald-100 flex items-center space-x-2 text-xs font-bold text-[#009e52]">
                      <CheckCircle2 className="w-4 h-4 text-[#009e52]" />
                      <span>{step.tag}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. Common Crop Pathogens Encyclopedia Preview - Multilingual */}
        <section id="diseases" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <div className="text-center max-w-3xl mx-auto mb-14 p-8 rounded-3xl bg-white/85 backdrop-blur-xl border-2 border-emerald-300/60 shadow-xl">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-300 font-space shadow-sm">
                {t.diseases.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-space font-extrabold text-slate-900 mt-3">
                {t.diseases.heading}
              </h2>
              <p className="text-slate-700 mt-3 text-base font-sans font-medium">
                {t.diseases.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.diseases.items.map((disease, idx) => {
                const Icon = diseaseIcons[idx] || AlertTriangle;
                const colors = [
                  'bg-rose-50 text-rose-600 border-rose-200',
                  'bg-amber-50 text-amber-600 border-amber-200',
                  'bg-orange-50 text-orange-600 border-orange-200',
                  'bg-purple-50 text-purple-600 border-purple-200',
                  'bg-blue-50 text-blue-600 border-blue-200',
                  'bg-emerald-100 text-[#009e52] border-emerald-200'
                ];
                return (
                  <div 
                    key={idx}
                    className="p-7 rounded-[28px] bg-white/95 backdrop-blur-2xl border-2 border-emerald-200/80 hover:border-emerald-500 shadow-lg hover:shadow-2xl transition-all duration-300 space-y-3.5"
                  >
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm ${colors[idx] || colors[0]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-space font-extrabold text-slate-900 text-xl">{disease.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                      {disease.desc}
                    </p>
                    <div className="text-xs font-extrabold text-[#009e52] font-space pt-2 border-t border-emerald-100">
                      {disease.covered}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 6. FAQ Section - Multilingual */}
        <section id="faq" className="py-20 relative">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            
            <div className="text-center mb-12 p-8 rounded-3xl bg-white/85 backdrop-blur-xl border-2 border-emerald-300/60 shadow-xl">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-300 font-space shadow-sm">
                {t.faq.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-space font-extrabold text-slate-900 mt-3">
                {t.faq.heading}
              </h2>
            </div>

            <div className="space-y-4">
              {t.faq.items.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="border-2 border-emerald-200/80 hover:border-emerald-400 rounded-2xl overflow-hidden transition-all bg-white/95 backdrop-blur-2xl shadow-md"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left font-space font-extrabold text-slate-900 flex justify-between items-center bg-transparent hover:bg-emerald-50/50 transition-colors cursor-pointer"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-emerald-600 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-[#009e52]' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-5 text-sm text-slate-700 leading-relaxed font-sans border-t border-emerald-100 bg-emerald-50/30"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 7. Bottom CTA Banner - Multilingual */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="rounded-[40px] p-10 sm:p-16 relative overflow-hidden bg-gradient-to-br from-[#0c1a12] via-[#144b27] to-[#1d6b38] border-2 border-emerald-400/40 text-white text-center shadow-2xl shadow-emerald-950/40 space-y-6">
              
              {/* Decorative Mesh Ring */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

              <span className="px-5 py-2 rounded-full bg-white/15 text-emerald-200 text-xs font-extrabold uppercase tracking-wider border border-white/20 font-space shadow-inner inline-block">
                {t.cta.badge}
              </span>
              <h2 className="text-3xl sm:text-5xl font-space font-extrabold tracking-tight">
                {t.cta.heading}
              </h2>
              <p className="text-emerald-100/90 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-sans font-medium">
                {t.cta.desc}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/scan')}
                  className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-[#144b27] font-space font-extrabold text-lg shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
                >
                  <ScanLine className="w-5 h-5 text-[#009e52]" />
                  <span>{t.cta.btnCamera}</span>
                </button>
                <button
                  onClick={() => openSamplePlant(SAMPLE_PLANTS[0])}
                  className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 border-2 border-emerald-400/50 text-white font-space font-extrabold text-lg transition-all cursor-pointer shadow-lg"
                >
                  <span>{t.cta.btnSample}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};

export default Home;
