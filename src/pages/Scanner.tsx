import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Camera, Image as ImageIcon, RotateCcw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Scanner: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
    }
  }, [webcamRef]);

  const handleRetake = () => {
    setImageSrc(null);
  };

  const handleAnalyze = () => {
    // In a real app, you would pass the image data to state management or navigate with state
    navigate('/result', { state: { image: imageSrc } });
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
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-dark-background">Scan Your Plant</h1>
        <p className="text-text mt-2">Position the affected leaf clearly in the frame.</p>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-primary/20 relative aspect-[3/4] md:aspect-video flex flex-col">
        {!imageSrc ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-full h-full object-cover"
            />
            {/* Scanner overlay effect */}
            <div className="absolute inset-0 border-2 border-primary/50 m-4 rounded-xl pointer-events-none">
              <motion.div 
                className="w-full h-1 bg-primary/80 shadow-[0_0_10px_#16A34A]"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                style={{ position: 'absolute' }}
              />
            </div>
            
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center gap-6">
              <button 
                onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')}
                className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition"
              >
                <RotateCcw className="h-6 w-6" />
              </button>
              
              <button 
                onClick={capture}
                className="w-16 h-16 rounded-full bg-primary border-4 border-white/50 flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                <Camera className="h-7 w-7 text-white" />
              </button>
              
              <button className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition relative overflow-hidden cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
                <ImageIcon className="h-6 w-6" />
              </button>
            </div>
          </>
        ) : (
          <>
            <img src={imageSrc} alt="Captured plant" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
              <button 
                onClick={handleRetake}
                className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-medium hover:bg-white/30 transition"
              >
                Retake
              </button>
              <button 
                onClick={handleAnalyze}
                className="px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-secondary transition flex items-center gap-2 shadow-lg"
              >
                <span>Analyze Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Scanner;
