import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  ArrowRight, 
  Grid, 
  Sun, 
  Focus, 
  Info,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SAMPLE_PLANTS } from '../data/samplePlants';

const Scanner: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [showGrid, setShowGrid] = useState(true);
  const [hasCameraError, setHasCameraError] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isInstant = searchParams.get('instant') === 'true';

  const capture = useCallback(() => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImageSrc(screenshot);
    }
  }, [webcamRef]);

  const handleRetake = () => {
    setImageSrc(null);
  };

  const handleAnalyze = () => {
    if (imageSrc) {
      navigate('/result', { state: { image: imageSrc } });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const videoConstraints = {
    facingMode: facingMode,
    width: { ideal: 1920 },
    height: { ideal: 1080 }
  };

  return (
    <div className="min-h-[85vh] bg-[#F8FAF7] bg-radial-mesh py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          {isInstant ? (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-lg shadow-emerald-600/30 animate-pulse">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Instant Home Screen Widget Mode</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200">
              <Focus className="w-3.5 h-3.5" />
              <span>AI Optical Viewfinder</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900">
            Scan Affected Leaf
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
            Center the plant leaf and any discolored lesions within the target frame.
          </p>
        </div>

        {/* Viewfinder Card */}
        <div className="glass-card rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/80 relative mb-8">
          <div className="relative w-full aspect-[4/5] sm:aspect-video rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
            
            {!imageSrc ? (
              <>
                {!hasCameraError ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMediaError={() => setHasCameraError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-8 text-center text-white max-w-sm">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-4">
                      <AlertCircle className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">Camera Unavailable</h3>
                    <p className="text-xs text-slate-400 mb-6">
                      Could not access your device camera. You can still upload any leaf photo or choose from our sample library below.
                    </p>
                    <label className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm cursor-pointer shadow-lg">
                      <Upload className="w-4 h-4" />
                      <span>Upload Leaf Photo</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                )}

                {/* Overlays (when camera is functional) */}
                {!hasCameraError && (
                  <>
                    {/* Grid Overlay */}
                    {showGrid && (
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-30">
                        <div className="border-r border-b border-white"></div>
                        <div className="border-r border-b border-white"></div>
                        <div className="border-b border-white"></div>
                        <div className="border-r border-b border-white"></div>
                        <div className="border-r border-b border-white"></div>
                        <div className="border-b border-white"></div>
                        <div className="border-r border-white"></div>
                        <div className="border-r border-white"></div>
                        <div></div>
                      </div>
                    )}

                    {/* HUD Target Framing */}
                    <div className="absolute inset-0 pointer-events-none p-6 sm:p-10 flex items-center justify-center">
                      <div className="w-full h-full border-2 border-emerald-400/40 rounded-2xl relative">
                        {/* Corner Brackets */}
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
                        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>

                        {/* Scanner Laser Sweep */}
                        <motion.div 
                          className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10B981]"
                          animate={{ top: ['5%', '95%', '5%'] }}
                          transition={{ duration: 3.5, ease: "linear", repeat: Infinity }}
                          style={{ position: 'absolute' }}
                        />

                        {/* Center Target Crosshair */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-60">
                          <div className="w-8 h-8 border border-white/60 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Status Bar */}
                    <div className="absolute top-4 inset-x-4 flex justify-between items-center pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        AI Sensor Ready
                      </span>

                      <div className="flex items-center space-x-2 pointer-events-auto">
                        <button
                          onClick={() => setShowGrid(!showGrid)}
                          className={`p-2 rounded-xl backdrop-blur-md border text-xs font-medium transition ${
                            showGrid 
                              ? 'bg-emerald-600/80 border-emerald-400 text-white' 
                              : 'bg-black/40 border-white/10 text-slate-300'
                          }`}
                          title="Toggle 3x3 Grid"
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Camera Controls Bar */}
                    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex justify-between items-center max-w-md mx-auto">
                      {/* Flip Camera */}
                      <button 
                        onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')}
                        className="p-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition shadow-lg active:scale-95"
                        title="Switch Camera (Front/Rear)"
                      >
                        <RotateCcw className="h-5 w-5" />
                      </button>
                      
                      {/* Shutter Button */}
                      <button 
                        onClick={capture}
                        className="relative group p-1 rounded-full"
                        title="Capture Photo"
                      >
                        <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 backdrop-blur-sm group-hover:scale-105 active:scale-95 transition-transform">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.6)] flex items-center justify-center">
                            <Camera className="h-7 w-7 text-white" />
                          </div>
                        </div>
                      </button>
                      
                      {/* File Upload Button */}
                      <label className="p-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition shadow-lg active:scale-95 cursor-pointer" title="Upload from Device">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileUpload}
                          className="hidden" 
                        />
                        <Upload className="h-5 w-5" />
                      </label>
                    </div>
                  </>
                )}
              </>
            ) : (
              /* Review Captured Image */
              <div className="relative w-full h-full">
                <img src={imageSrc} alt="Captured plant" className="w-full h-full object-cover" />
                
                {/* Captured Confirmation Banner */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Leaf Frame Captured
                  </span>
                </div>

                {/* Bottom Actions */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col sm:flex-row justify-between items-center gap-3">
                  <button 
                    onClick={handleRetake}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-medium text-sm transition shadow-lg flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Photo</span>
                  </button>

                  <button 
                    onClick={handleAnalyze}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-heading font-bold text-base transition-all shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center space-x-2.5 active:scale-98"
                  >
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    <span>Run AI Diagnosis</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Photography Tips Bar */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start space-x-3">
            <Sun className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Bright Natural Light</h4>
              <p className="text-xs text-slate-500 mt-0.5">Avoid deep shadows or dark rooms. Daylight gives highest accuracy.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start space-x-3">
            <Focus className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Focus on Symptoms</h4>
              <p className="text-xs text-slate-500 mt-0.5">Frame the discolored spots, fungal dust, or leaf lesions closely.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start space-x-3">
            <Info className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Single Leaf Priority</h4>
              <p className="text-xs text-slate-500 mt-0.5">Keep the leaf flat. Minimize cluttered soil or backgrounds.</p>
            </div>
          </div>
        </div>

        {/* Quick Pick Sample Plants Shelf */}
        <div className="border-t border-slate-200/80 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-heading font-bold text-slate-900 uppercase tracking-wider">
                Or Test Instant Sample Leaf
              </h3>
              <p className="text-xs text-slate-500">Pick any real specimen to analyze without a camera.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_PLANTS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => navigate('/result', { state: { image: sample.imageUrl, presetData: sample.presetData } })}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-500 text-left transition-all p-2 bg-white hover:shadow-md flex flex-col"
              >
                <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                  <img src={sample.imageUrl} alt={sample.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                    {sample.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 truncate group-hover:text-emerald-700">
                  {sample.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {sample.diseaseName}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scanner;
