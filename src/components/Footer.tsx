import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0B1510] text-slate-300 pt-16 pb-12 overflow-hidden border-t border-emerald-950">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-emerald-600/10 to-transparent blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-900/50">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                Plant<span className="text-emerald-400">X</span>
                <span className="text-xs ml-1.5 font-bold uppercase tracking-wider text-emerald-400/80">AI</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering farmers, agronomists, and home gardeners with instant botanical disease diagnosis and tailored organic treatment plans.
            </p>

            <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Vision AI Engine: Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Diagnostic Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/scan" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Live Camera Scanner</span>
                </Link>
              </li>
              <li>
                <Link to="/scan" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>High-Res Leaf Upload</span>
                </Link>
              </li>
              <li>
                <a href="#samples" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Sample Plant Showcase</span>
                </a>
              </li>
              <li>
                <a href="#diseases" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Pathogen Encyclopedia</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Plant Pathology Features */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Intelligence Highlights
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Multi-Vision Model Consensus</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>Organic & Eco-First Remedies</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Regional Language Support (हिंदी, తెలుగు)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Instant QR Medical Reports</span>
              </li>
            </ul>
          </div>

          {/* Agricultural Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Agronomic Advisory
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/5">
              PlantX AI is engineered as an intelligent diagnostic aid. For large-scale commercial crop epidemics or severe quarantine conditions, always confirm treatment dosages with your regional agriculture extension bureau.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <span>&copy; {new Date().getFullYear()} PlantX AI. Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for sustainable agriculture.</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="https://github.com/gudimetlasanthosh16-png/plantx-ai" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">•</span>
            <span>Version 2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
