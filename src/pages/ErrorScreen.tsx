import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RotateCcw, Camera, Sparkles, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { SAMPLE_PLANTS } from '../data/samplePlants';

const ErrorScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] bg-[#F8FAF7] bg-radial-mesh flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 max-w-lg w-full text-center border border-slate-200/80 space-y-6"
      >
        {/* Warning Icon Badge */}
        <div className="w-20 h-20 bg-amber-50 border border-amber-200 rounded-3xl flex items-center justify-center mx-auto text-amber-600 shadow-inner">
          <AlertCircle className="h-10 w-10" />
        </div>
        
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            Diagnostic Unclear
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-2">
            Leaf Could Not Be Verified
          </h1>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            The computer vision model was unable to extract clear pathology markers from this image. This typically occurs when the lighting is dim, blurry, or the subject is not a plant leaf.
          </p>
        </div>

        {/* Helpful Photography Tips */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs text-slate-600">
          <div className="font-bold text-slate-900 uppercase tracking-wide">For Better Results:</div>
          <div className="flex items-center space-x-2">
            <Sun className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>Use bright natural daylight or direct lamp lighting</span>
          </div>
          <div className="flex items-center space-x-2">
            <Camera className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Hold camera steady 4-8 inches away from the leaf surface</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button 
            onClick={() => navigate('/scan')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm transition shadow-lg shadow-emerald-700/20 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Scan Another Leaf</span>
          </button>

          <button 
            onClick={() => navigate('/result', { state: { image: SAMPLE_PLANTS[0].imageUrl, presetData: SAMPLE_PLANTS[0].presetData } })}
            className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center space-x-2"
          >
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Test with Pre-Loaded Tomato Sample Instead</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default ErrorScreen;
