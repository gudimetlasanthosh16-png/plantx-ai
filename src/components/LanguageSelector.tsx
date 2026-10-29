import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Volume2, Square, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGE_OPTIONS, type SupportedLanguage } from '../data/translations';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, setLanguage, isSpeaking, speak, stopSpeaking } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const currentOption = LANGUAGE_OPTIONS.find((o) => o.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <div className={`inline-flex items-center space-x-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-1.5 shadow-lg ${className}`}>
      
      {/* 1. Language Dropdown Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200/60 hover:border-emerald-300 text-xs sm:text-sm font-bold font-space transition-all cursor-pointer"
          title="Select Language"
        >
          <Globe className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-none">{currentOption.nativeLabel}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl p-2 border border-emerald-100 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2.5 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-space">
              Select Language
            </div>
            <div className="space-y-1 mt-1">
              {LANGUAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => {
                    setLanguage(opt.code as SupportedLanguage);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    language === opt.code
                      ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                  }`}
                >
                  <span>{opt.nativeLabel}</span>
                  {language === opt.code && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Read Aloud Button (Matching screenshot exactly) */}
      <button
        onClick={() => {
          if (isSpeaking) {
            stopSpeaking();
          } else {
            speak();
          }
        }}
        className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold font-space transition-all cursor-pointer shadow-sm ${
          isSpeaking
            ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
            : 'bg-emerald-50 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-200/90 hover:border-emerald-300'
        }`}
        title={isSpeaking ? "Stop Speaking" : "Read Aloud in Selected Language"}
      >
        {isSpeaking ? (
          <>
            <Square className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Stop Audio</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-[#009e52]" />
            <span>Read Aloud</span>
          </>
        )}
      </button>

    </div>
  );
};

export default LanguageSelector;

