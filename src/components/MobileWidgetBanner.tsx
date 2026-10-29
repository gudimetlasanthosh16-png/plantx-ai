import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Camera, 
  PlusCircle, 
  X, 
  Share, 
  Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { SupportedLanguage } from '../data/translations';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const MobileWidgetBanner: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // 1. Device check: Phone or Tablet detection
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isTouch = navigator.maxTouchPoints > 0;
      const isMobileDevice = /iphone|ipad|ipod|android|tablet|silk|kindle/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 1024;
      setIsMobileOrTablet((isMobileDevice || isTouch) && isSmallScreen);

      // iOS Safari check
      const isApple = /iphone|ipad|ipod/i.test(userAgent);
      setIsIOS(isApple);

      // Check if already running in standalone PWA / widget mode
      const isPWA = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;
      setIsStandalone(isPWA);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // 2. Capture Android/Chrome PWA install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 3. Check dismissal memory (24h cooldown)
    const dismissedTime = localStorage.getItem('plantx_widget_dismissed');
    if (dismissedTime && Date.now() - parseInt(dismissedTime) < 1000 * 60 * 60 * 24) {
      setIsBannerDismissed(true);
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleDismiss = () => {
    setIsBannerDismissed(true);
    localStorage.setItem('plantx_widget_dismissed', Date.now().toString());
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setInstallSuccess(true);
          setDeferredPrompt(null);
          setTimeout(() => setIsBannerDismissed(true), 2500);
        }
      } catch (err) {
        console.error('Install prompt error:', err);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Fallback for Android browser where prompt hasn't fired yet
      setShowIOSModal(true);
    }
  };

  // If user is on a desktop or already opened inside the widget/PWA, hide the installation banner
  if (!isMobileOrTablet || isStandalone) {
    return null;
  }

  // Multilingual content strings keyed by SupportedLanguage
  const contentMap: Partial<Record<SupportedLanguage, { 
    title: string; 
    subtitle: string; 
    btn: string; 
    scanBtn: string; 
    iosTitle: string; 
    step1: string; 
    step2: string; 
    step3: string 
  }>> = {
    Telugu: {
      title: "హోమ్ స్క్రీన్ విడ్జెట్ జోడించండి 🌿",
      subtitle: "ప్రతిసారీ వెబ్‌సైట్‌కు రాకుండా, 1-క్లిక్‌తో కెమెరా తెరిచి పంట రోగాలను స్కాన్ చేయండి.",
      btn: "విడ్జెట్ జోడించు (+)",
      scanBtn: "తక్షణ స్కాన్ ⚡",
      iosTitle: "ఫోన్ / ట్యాబ్ హోమ్ స్క్రీన్‌కు విడ్జెట్ జోడించండి",
      step1: "Safari బ్రౌజర్ దిగువన ఉన్న 'Share' (షేర్) బటన్ నొక్కండి.",
      step2: "క్రిందికి స్క్రోల్ చేసి 'Add to Home Screen' (హోమ్ స్క్రీన్‌కు జోడించు) ఎంచుకోండి.",
      step3: "'Add' నొక్కండి. ఇప్పుడు మీ స్క్రీన్‌పై విడ్జెట్ ఐకాన్ సిద్ధం!"
    },
    Hindi: {
      title: "होम स्क्रीन विजेट जोड़ें 🌿",
      subtitle: "हर बार वेबसाइट खोले बिना, 1-टैप में कैमरा खोलकर फसल की बीमारी की तुरंत जांच करें।",
      btn: "विजेट जोड़ें (+)",
      scanBtn: "तुरंत स्कैन ⚡",
      iosTitle: "फोन या टैबलेट होम स्क्रीन पर विजेट लगाएं",
      step1: "सफारी या क्रोम में 'Share' (शेयर) बटन दबाएं।",
      step2: "नीचे स्क्रॉल करके 'Add to Home Screen' चुनें।",
      step3: "'Add' पर टैप करें. 1-क्लिक प्लांट स्कैनर विजेट तैयार है!"
    },
    Tamil: {
      title: "முகப்புத்திரை விட்ஜெட்டைச் சேர்க்கவும் 🌿",
      subtitle: "ஒவ்வொரு முறையும் வலைத்தளத்தை திறக்காமல், 1-க்ளிக்கில் கேமராவைத் திறந்து நோய் கண்டறியவும்.",
      btn: "விட்ஜெட் சேர் (+)",
      scanBtn: "உடனடி ஸ்கேன் ⚡",
      iosTitle: "முகப்புத்திரையில் விட்ஜெட் சேர்க்கவும்",
      step1: "உலாவியின் 'Share' பொத்தானைத் தட்டவும்.",
      step2: "'Add to Home Screen' என்பதைத் தேர்ந்தெடுக்கவும்.",
      step3: "'Add' என்பதை அழுத்தவும். விட்ஜெட் தயாராக உள்ளது!"
    },
    English: {
      title: "Add Quick-Scan Home Screen Widget 🌿",
      subtitle: "No need to open browser every time! 1-Tap widget to launch camera & diagnose plant diseases instantly.",
      btn: "Add Widget (+)",
      scanBtn: "Instant Scan ⚡",
      iosTitle: "Add PlantX Widget to Phone / Tablet",
      step1: "Tap the 'Share' icon in your browser toolbar.",
      step2: "Scroll down and select 'Add to Home Screen'.",
      step3: "Tap 'Add' in the top right. Instant 1-Tap Scanner is ready!"
    }
  };

  const text = contentMap[language] || contentMap.English!;

  return (
    <>
      {/* 1. Expandable Smart Mobile/Tablet Banner */}
      <AnimatePresence>
        {!isBannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white shadow-xl border-b border-emerald-500/30 px-4 py-3 relative z-30"
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Left icon & description */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-300 p-0.5 shadow-md shrink-0 flex items-center justify-center">
                  <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-emerald-300" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-emerald-200">
                      {text.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold tracking-wider uppercase border border-emerald-400/30">
                      Phone & Tablet
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs mt-0.5 line-clamp-1 sm:line-clamp-none">
                    {text.subtitle}
                  </p>
                </div>

                {/* Dismiss button */}
                <button
                  onClick={handleDismiss}
                  className="sm:hidden text-slate-400 hover:text-white p-1 rounded-lg"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
                >
                  {installSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>{text.btn}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigate('/scanner?instant=true')}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 font-semibold text-xs border border-white/10 active:scale-95 transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{text.scanBtn}</span>
                </button>

                <button
                  onClick={handleDismiss}
                  className="hidden sm:inline-flex text-slate-400 hover:text-white p-1.5 rounded-lg ml-1"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Persistent Floating Mini-Widget Button (For quick access on mobile when banner is dismissed) */}
      <AnimatePresence>
        {isBannerDismissed && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-5 z-40 sm:hidden flex flex-col items-end gap-2"
          >
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600/95 text-white shadow-2xl border border-emerald-400/40 backdrop-blur-md active:scale-90 transition-all font-semibold text-xs"
            >
              <Smartphone className="w-4 h-4 text-emerald-200 animate-bounce" />
              <span>{text.btn}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. iOS & Browser Step-by-Step Installation Modal */}
      <AnimatePresence>
        {showIOSModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-emerald-100 relative"
            >
              {/* Close Icon */}
              <button
                onClick={() => setShowIOSModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-inner">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900">
                    {text.iosTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'Telugu' 
                      ? "1-క్లిక్ విడ్జెట్ తో మీ ఫోన్ స్క్రీన్ నుండే నేరుగా స్కాన్ చేయండి"
                      : "Create a 1-tap launcher widget on your device home screen"}
                  </p>
                </div>
              </div>

              {/* 3-Step Visual Guide */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-5">
                
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      {language === 'Telugu' ? "బ్రౌజర్ మెనూ ఓపెన్ చేయండి" : "Tap Share in Browser"}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span>{text.step1}</span>
                      <Share className="w-3.5 h-3.5 text-emerald-600 shrink-0 inline" />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      {language === 'Telugu' ? "హోమ్ స్క్రీన్ కు ఎంచుకోండి" : "Select Add to Home Screen"}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span>{text.step2}</span>
                      <PlusCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 inline" />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      {language === 'Telugu' ? "విడ్జెట్ సిద్ధం" : "Confirm & Launch"}
                    </span>
                    <span className="text-slate-600">{text.step3}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  {language === 'Telugu' ? "అర్థమైంది (Got It)" : "Got It"}
                </button>
                <button
                  onClick={() => {
                    setShowIOSModal(false);
                    navigate('/scanner?instant=true');
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-4 h-4" />
                  <span>{text.scanBtn}</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileWidgetBanner;
