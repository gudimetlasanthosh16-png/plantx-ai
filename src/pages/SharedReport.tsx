import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import LZString from 'lz-string';
import { motion } from 'framer-motion';
import { AlertTriangle, Droplets, Sun, Info, HeartPulse, CheckCircle2, Leaf, ShieldCheck } from 'lucide-react';
import { type PlantAnalysisResult } from '../services/api';

const SharedReport: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<PlantAnalysisResult | null>(null);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(dataParam);
        if (decompressed) {
          setResult(JSON.parse(decompressed));
        } else {
          throw new Error("Decompression failed");
        }
      } catch (err) {
        console.error("Failed to parse shared data", err);
        navigate('/error');
      }
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  if (!result) return <div className="p-8 text-center">Loading Report...</div>;

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Healthy': return 'text-primary bg-primary/10 border-primary';
      case 'Warning': return 'text-warning bg-warning/10 border-warning';
      case 'Critical': return 'text-danger bg-danger/10 border-danger';
      default: return 'text-gray-500 bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-heading font-bold text-gray-500 flex items-center justify-center gap-2">
          <Leaf className="text-primary" /> Shared Plant Report
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl overflow-hidden shadow-xl border border-primary/10"
      >
        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-dark-background">{result.plant_name}</h1>
            <p className="text-gray-500 italic mb-2">{result.scientific_name}</p>
            <div className={`inline-block px-4 py-1 rounded-full font-bold text-sm border ${getHealthColor(result.health)}`}>
              {result.health}
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-primary">
              <span className="font-bold text-dark-background text-sm">{result.confidence}%</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">AI Confidence</p>
            </div>
          </div>
        </div>

        {result.disease !== 'None' && (
          <div className="p-8 bg-danger/5 border-b border-danger/10">
            <div className="flex gap-3 items-start">
              <AlertTriangle className="text-danger flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-danger text-lg">Disease Detected: {result.disease}</h3>
                <p className="text-sm text-gray-700 mt-1">Severity: <span className="font-semibold">{result.severity}</span></p>
              </div>
            </div>
          </div>
        )}

        <div className="p-8 bg-gray-50/50">
          <div className="grid md:grid-cols-2 gap-8">
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
                    <h4 className="font-semibold text-dark-background mb-2 text-sm">Scientific Analysis</h4>
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
        
        <div className="p-6 bg-white border-t border-gray-100 text-center">
          <p className="text-gray-500 mb-4">Want to scan your own plants?</p>
          <Link to="/scan" className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-secondary transition inline-block">
            Start Scanning Free
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SharedReport;
