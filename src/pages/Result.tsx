import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import LZString from 'lz-string';
import html2canvas from 'html2canvas';
import { Activity, AlertTriangle, Droplets, Sun, Info, HeartPulse, CheckCircle2, ShieldCheck, Share2, X, Download } from 'lucide-react';
import { analyzePlantImage, type PlantAnalysisResult } from '../services/api';

const LoadingScreen = () => {
  const messages = [
    "Scanning Plant...",
    "Analyzing Leaf Structure...",
    "Detecting Disease...",
    "Generating Recommendations...",
    "Almost Done..."
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Activity className="h-10 w-10 text-primary animate-pulse" />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-heading text-dark-background font-medium"
        >
          {messages[msgIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PlantAnalysisResult | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const resultRef = React.useRef<HTMLDivElement>(null);

  const imageSrc = location.state?.image;

  useEffect(() => {
    if (!imageSrc) {
      navigate('/scan');
      return;
    }

    const fetchAnalysis = async () => {
      try {
        const data = await analyzePlantImage(imageSrc);
        setResult(data);
      } catch (err) {
        navigate('/error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [imageSrc, navigate]);

  if (loading) return <LoadingScreen />;
  if (!result) return null;

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Healthy': return 'text-primary bg-primary/10 border-primary';
      case 'Warning': return 'text-warning bg-warning/10 border-warning';
      case 'Critical': return 'text-danger bg-danger/10 border-danger';
      default: return 'text-gray-500 bg-gray-100 border-gray-300';
    }
  };

  const handleShare = () => {
    if (result) {
      const jsonString = JSON.stringify(result);
      const compressed = LZString.compressToEncodedURIComponent(jsonString);
      const url = `${window.location.origin}/share?data=${compressed}`;
      setShareUrl(url);
      setShowQR(true);
    }
  };

  const handleShareAsImage = async () => {
    if (resultRef.current && result) {
      try {
        const canvas = await html2canvas(resultRef.current, { scale: 2, useCORS: true });
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `PlantX-Report-${result.plant_name.replace(/\s+/g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Failed to generate image", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl overflow-hidden shadow-xl border border-primary/10"
        ref={resultRef}
      >
        {/* Header Section */}
        <div className="md:flex">
          <div className="md:w-1/3 relative h-64 md:h-auto">
            <img src={imageSrc} alt="Scanned Plant" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <div className={`px-4 py-1 rounded-full font-bold text-sm border backdrop-blur-md ${getHealthColor(result.health)}`}>
                {result.health}
              </div>
            </div>
          </div>
          
          <div className="p-8 md:w-2/3 flex flex-col justify-center">
            <h1 className="text-3xl font-heading font-bold text-dark-background">{result.plant_name}</h1>
            <p className="text-gray-500 italic mb-4">{result.scientific_name}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-background border-4 border-primary">
                <span className="font-bold text-dark-background">{result.confidence}%</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">AI Confidence</p>
                <p className="font-medium text-dark-background">Accuracy Score</p>
              </div>
            </div>

            {result.disease !== 'None' && (
              <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 flex gap-3 items-start">
                <AlertTriangle className="text-danger flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-danger">Disease Detected: {result.disease}</h3>
                  <p className="text-sm text-gray-600 mt-1">Severity: <span className="font-semibold">{result.severity}</span></p>
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
               <button 
                onClick={handleShare}
                className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
               >
                 <Share2 className="h-5 w-5" />
                 Generate QR Report
               </button>
               <button 
                onClick={handleShareAsImage}
                className="w-full bg-primary border-2 border-primary text-white hover:bg-primary/90 hover:border-primary/90 transition-colors font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
               >
                 <Download className="h-5 w-5" />
                 Save as Image
               </button>
            </div>
          </div>
        </div>

        {/* Details Sections */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/50">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              {result.disease !== 'None' && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-heading font-bold text-dark-background mb-4 flex items-center gap-2">
                    <Info className="text-primary" /> Overview
                  </h3>
                  <p className="text-text text-sm leading-relaxed mb-4">{result.description}</p>
                  
                  <h4 className="font-semibold text-dark-background mb-2 text-sm">Symptoms:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mb-4">
                    {result.symptoms.map((sym, i) => <li key={i}>{sym}</li>)}
                  </ul>

                  <h4 className="font-semibold text-dark-background mb-2 text-sm">Cause:</h4>
                  <p className="text-sm text-gray-600 mb-4">{result.cause}</p>

                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mt-4">
                    <h4 className="font-semibold text-dark-background mb-2 text-sm flex items-center gap-2">
                       Scientific Analysis
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed italic">
                      {result.detailed_reasoning}
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-heading font-bold text-dark-background mb-4 flex items-center gap-2">
                  <HeartPulse className="text-accent" /> Care Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Droplets className="text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-dark-background">Watering</p>
                      <p className="text-sm text-gray-600">{result.water}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Sun className="text-warning flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-dark-background">Sunlight</p>
                      <p className="text-sm text-gray-600">{result.sunlight}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {result.disease !== 'None' && (
                <>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-heading font-bold text-dark-background mb-4 flex items-center gap-2">
                      <CheckCircle2 className="text-secondary" /> Treatment Plan
                    </h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-dark-background mb-2 text-sm bg-secondary/10 inline-block px-3 py-1 rounded-md text-secondary">Organic</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mt-2">
                        {result.organic_treatment.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-dark-background mb-2 text-sm bg-gray-100 inline-block px-3 py-1 rounded-md text-gray-600">Chemical</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1 mt-2">
                        {result.chemical_treatment.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm"><span className="font-semibold text-dark-background">Est. Recovery:</span> {result.recovery_time}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-heading font-bold text-dark-background mb-4 flex items-center gap-2">
                      <ShieldCheck className="text-primary" /> Prevention
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {result.prevention.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
        
        {/* Actions */}
        <div className="p-6 bg-white border-t border-gray-100 text-center">
          <button 
            onClick={() => navigate('/scan')}
            className="text-primary font-medium hover:text-secondary transition"
          >
            Scan Another Plant
          </button>
        </div>
      </motion.div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full relative"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-dark-background mb-2">Scan & Share</h3>
                <p className="text-sm text-gray-500">Scan this QR code with any device to view the plant report.</p>
              </div>
              
              <div className="bg-white p-4 rounded-2xl border-4 border-gray-100 flex items-center justify-center mb-6 shadow-sm">
                <QRCodeSVG 
                  value={shareUrl} 
                  size={220}
                  level="Q"
                  includeMargin={false}
                  fgColor="#0F172A"
                />
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-400">Powered by PlantX AI</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Result;
