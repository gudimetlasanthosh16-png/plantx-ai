import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Camera, Sparkles, Menu, X, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-emerald-950/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-800 via-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-700/20 group-hover:scale-105 transition-transform duration-300">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900">
                  Plant<span className="text-emerald-600">X</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  AI
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-700/70 tracking-wide hidden sm:block">
                Botanical Pathology & Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/') 
                  ? 'text-emerald-800 bg-emerald-50 font-semibold' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link 
              to="/scan" 
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/scan') 
                  ? 'text-emerald-800 bg-emerald-50 font-semibold' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Instant Scanner
            </Link>

            <a 
              href="#how-it-works" 
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 transition-all"
            >
              How It Works
            </a>

            <a 
              href="#diseases" 
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 transition-all flex items-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pathology Guide</span>
            </a>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-xs font-medium text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Multi-Vision AI active</span>
            </div>

            <Link
              to="/scan"
              className="relative inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
              <span>Diagnose Leaf</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/scan"
              className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm"
              title="Quick Scan"
            >
              <Camera className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-emerald-950/10 bg-white/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-medium ${
              isActive('/') ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'
            }`}
          >
            Home
          </Link>
          <Link
            to="/scan"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-medium ${
              isActive('/scan') ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'
            }`}
          >
            Instant Scanner
          </Link>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            How It Works
          </a>
          <a
            href="#diseases"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Pathology Guide
          </a>
          <div className="pt-2">
            <Link
              to="/scan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-center shadow-md shadow-emerald-600/30"
            >
              <Camera className="w-5 h-5" />
              <span>Launch Plant Scanner</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
