import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Zap, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HeroLeft: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const featureIcons = [Zap, Leaf, Globe];

  return (
    <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-7 bg-white/85 backdrop-blur-2xl p-6 sm:p-10 rounded-[32px] border-2 border-emerald-300/60 shadow-[0_20px_60px_-15px_rgba(0,158,82,0.18)] relative">

      {/* Top Floating Botanical Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold font-space w-fit shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-emerald-700 animate-spin" style={{ animationDuration: '6s' }} />
        <span>{t.hero.badge}</span>
      </motion.div>

      {/* 1. H1 Headline with Glowing Highlight Underline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[32px] sm:text-[44px] md:text-[50px] lg:text-[52px] leading-[1.12] font-extrabold tracking-tight font-space text-slate-900"
      >
        {t.hero.headingPart1} <br />
        <span className="relative inline-block mt-1">
          {t.hero.headingProtecting}{' '}
          <span className="text-[#009e52] relative z-10 underline decoration-emerald-400 decoration-wavy decoration-3 underline-offset-8">
            {t.hero.headingTomorrow}
          </span>
        </span>
      </motion.h1>

      {/* 2. Hero Subtitle / Body with Solid Contrast */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg leading-relaxed text-slate-700 font-sans max-w-xl font-medium"
      >
        {t.hero.subtitle}
      </motion.p>

      {/* 3. Action Buttons Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
      >
        {/* Primary Emerald CTA */}
        <button
          onClick={() => navigate('/scan')}
          className="bg-gradient-to-r from-[#1d6b38] to-[#009e52] hover:from-[#144b27] hover:to-[#008947] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-emerald-800/30 hover:shadow-2xl hover:shadow-emerald-700/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center space-x-3 group cursor-pointer font-space"
        >
          <span>{t.hero.ctaExplore}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
        </button>

        {/* Secondary Botanical CTA */}
        <a
          href="#diseases"
          className="border-2 border-emerald-600/40 hover:border-emerald-600 bg-emerald-50/70 hover:bg-emerald-100/90 text-emerald-950 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center space-x-2.5 group cursor-pointer shadow-sm font-space"
        >
          <Leaf className="w-5 h-5 text-[#009e52] group-hover:scale-110 transition-transform duration-200" />
          <span>{t.hero.ctaImpact}</span>
        </a>
      </motion.div>

      {/* 4. Bottom Feature Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="pt-6 border-t border-emerald-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {t.hero.features.map((feature, idx) => {
            const Icon = featureIcons[idx] || Zap;
            return (
              <div
                key={idx}
                className="group p-4 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/90 border border-emerald-200/80 hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between space-y-2.5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#009e52] shadow-sm group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-[15px] font-bold leading-tight font-space text-emerald-950 group-hover:text-[#009e52] transition-colors duration-200">
                    {feature.title}
                  </h4>
                  <p className="text-[12px] leading-relaxed text-slate-600 font-sans mt-1">
                    {feature.body}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </motion.div>

    </div>
  );
};

export default HeroLeft;
