import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, ArrowRight, ChevronDown, Menu, X, Wind, Droplets, Sun, Cpu, Sparkles, Wifi, Users, Shield, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface DropdownItem {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const solutions: DropdownItem[] = [
    {
      name: 'Leaf Pathology Vision',
      desc: 'Deep neural diagnosis across 120+ crops & 50+ diseases',
      icon: Wind,
      href: '/scan',
    },
    {
      name: 'Organic Remedy Engine',
      desc: 'Eco-certified bio-fungicides & natural prescriptions',
      icon: Droplets,
      href: '/#samples',
    },
    {
      name: 'Unified Harvest Defense',
      desc: 'Continuous early blight, mildew & pathogen prevention',
      icon: Sun,
      href: '/#diseases',
    },
  ];

  const technologies: DropdownItem[] = [
    {
      name: 'Multi-Spectral Neural Nets',
      desc: 'High-precision microscopic leaf feature matching',
      icon: Cpu,
      href: '/#how-it-works',
    },
    {
      name: 'Synchronized AI Dispatch',
      desc: 'Sub-2s multi-vision consensus & pathogen scoring',
      icon: Sparkles,
      href: '/#how-it-works',
    },
    {
      name: 'Offline Field Edge Inference',
      desc: 'Field-ready diagnostic pipeline for remote growers',
      icon: Wifi,
      href: '/scan',
    },
  ];

  const aboutItems: DropdownItem[] = [
    {
      name: 'Our Visionaries & Agronomists',
      desc: 'Botanical scientists & computer vision researchers',
      icon: Users,
      href: '/#how-it-works',
    },
    {
      name: 'Environmental Counsel',
      desc: 'Pioneering zero-toxic chemical sustainable farming',
      icon: Shield,
      href: '/#diseases',
    },
    {
      name: 'Support & FAQs',
      desc: 'Comprehensive grower guides & diagnostic troubleshooting',
      icon: HelpCircle,
      href: '/#faq',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-emerald-100/90 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center transition-all group-hover:bg-emerald-100/80 shadow-sm">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Leaf className="w-5 h-5 text-[#009e52]" />
              </motion.div>
            </div>

            <div className="flex flex-col">
              <span className="text-[21px] font-bold tracking-tight font-space text-slate-900 leading-none">
                Plant<span className="text-[#009e52]">X</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase font-space text-slate-400 mt-1">
                {t.nav.tagline}
              </span>
            </div>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors flex items-center space-x-1 group cursor-pointer"
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>{t.nav.solutions}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-80 pt-2 z-50"
                  >
                    <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xl space-y-1">
                      {solutions.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#009e52] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-800 font-space group-hover:text-[#009e52] transition-colors">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-500 font-sans mt-0.5 leading-snug">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Technology Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('technology')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors flex items-center space-x-1 group cursor-pointer"
                aria-expanded={activeDropdown === 'technology'}
              >
                <span>{t.nav.technology}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-transform duration-200 ${activeDropdown === 'technology' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'technology' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-80 pt-2 z-50"
                  >
                    <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xl space-y-1">
                      {technologies.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#009e52] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-800 font-space group-hover:text-[#009e52] transition-colors">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-500 font-sans mt-0.5 leading-snug">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Impact */}
            <a
              href="#diseases"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              {t.nav.impact}
            </a>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors flex items-center space-x-1 group cursor-pointer"
                aria-expanded={activeDropdown === 'about'}
              >
                <span>{t.nav.aboutUs}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-84 pt-2 z-50"
                  >
                    <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xl space-y-1">
                      {aboutItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={idx}
                            to={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#009e52] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-800 font-space group-hover:text-[#009e52] transition-colors">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-500 font-sans mt-0.5 leading-snug">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources */}
            <a
              href="#samples"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              {t.nav.resources}
            </a>

          </nav>

          {/* Right: Language Selector + Read Aloud + CTA */}
          <div className="flex items-center space-x-2.5">
            
            {/* Integrated Multilingual & Read Aloud Pill */}
            <LanguageSelector className="hidden md:inline-flex" />

            <Link
              to="/scan"
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1d6b38] to-[#009e52] hover:from-[#144b27] hover:to-[#008947] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all group cursor-pointer font-space flex-shrink-0"
            >
              <span>{t.nav.getInTouch}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-b border-slate-100 bg-white/95 backdrop-blur-xl px-6 py-5 space-y-4 shadow-xl"
          >
            {/* Mobile Language Selector */}
            <div className="pb-3 border-b border-slate-100">
              <LanguageSelector className="w-full justify-between" />
            </div>

            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  location.pathname === '/' ? 'text-[#009e52] bg-emerald-50 font-semibold' : 'text-slate-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/scan"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-[#009e52]"
              >
                {t.nav.solutions}
              </Link>
              <a
                href="#diseases"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-[#009e52]"
              >
                {t.nav.impact}
              </a>
              <a
                href="#samples"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-[#009e52]"
              >
                {t.nav.resources}
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:text-[#009e52]"
              >
                {t.nav.aboutUs}
              </a>
            </div>

            <div className="pt-2">
              <Link
                to="/scan"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1d6b38] to-[#009e52] text-white font-semibold text-center flex items-center justify-center space-x-2 shadow-md group"
              >
                <span>{t.nav.getInTouch}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
