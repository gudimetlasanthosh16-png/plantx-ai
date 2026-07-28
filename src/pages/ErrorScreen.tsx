import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-danger/20"
      >
        <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-10 w-10 text-danger" />
        </div>
        
        <h1 className="text-2xl font-heading font-bold text-dark-background mb-3">Analysis Failed</h1>
        
        <p className="text-text mb-8">
          We couldn't clearly identify a plant or disease in the provided image. Please make sure the image is clear and well-lit.
        </p>
        
        <button 
          onClick={() => navigate('/scan')}
          className="bg-primary hover:bg-secondary text-white font-medium px-6 py-3 rounded-full transition w-full flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Try Again</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorScreen;
