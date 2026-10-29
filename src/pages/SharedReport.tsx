import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Droplets, 
  Sun, 
  HeartPulse, 
  CheckCircle2, 
  ShieldCheck, 
  Camera, 
  ArrowLeft,
  Beaker,
  Sprout,
  TrendingDown,
  ShieldAlert,
  Compass,
  Bug,
  Clock,
  Gauge,
  Eye,
  ThermometerSnowflake,
  Calendar,
  CloudSun
} from 'lucide-react';
import { type PlantAnalysisResult } from '../services/api';
import { decompressPlantData } from '../utils/shareReportHelper';

const SharedReport: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<PlantAnalysisResult | null>(null);

  useEffect(() => {
    const dataParam = searchParams.get('data') || searchParams.get('share');
    if (dataParam) {
      const decoded = decompressPlantData(dataParam);
      if (decoded) {
        setResult(decoded);
      } else {
        navigate('/error');
      }
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  if (!result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 font-heading font-semibold">Loading Shared Medical Dossier...</p>
      </div>
    );
  }

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'Healthy': 
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Warning': 
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Critical': 
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default: 
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const vigor = result.photosynthetic_vigor || (result.health === 'Healthy' ? 96 : result.health === 'Warning' ? 70 : 45);

  return (
    <div className="min-h-screen bg-[#F8FAF7] bg-radial-mesh py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to PlantX AI</span>
          </Link>

          <Link
            to="/scan"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition shadow-sm"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan My Own Plant</span>
          </Link>
        </div>

        {/* Main Shared Dossier Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/80"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">Shared Plant Medical Record</span>
              </div>
              <h1 className="text-3xl font-heading font-extrabold">{result.plant_name}</h1>
              <p className="text-emerald-200/80 font-serif italic text-sm">{result.scientific_name}</p>
            </div>

            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">AI Confidence</span>
                <span className="text-2xl font-extrabold font-heading text-white">{result.confidence}%</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Status</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mt-0.5 ${getHealthBadge(result.health)}`}>
                  {result.health}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Condition Banner */}
            {result.disease && result.disease.toLowerCase() !== 'none' ? (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3.5">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-amber-950 text-lg">
                    Condition: {result.disease}
                  </h3>
                  <p className="text-xs text-amber-800 font-semibold mt-0.5">
                    Severity: {result.severity}
                  </p>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-emerald-950 text-lg">Specimen is Healthy</h3>
                  <p className="text-sm text-emerald-800">{result.description}</p>
                </div>
              </div>
            )}

            {/* Weather Trigger Window */}
            {result.favorable_weather && (
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-2.5 text-xs text-amber-950">
                <CloudSun className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span><strong>Pathogen Weather Window:</strong> {result.favorable_weather}</span>
              </div>
            )}

            {/* Real-Time Photo Evidence Cues */}
            {result.visual_forensic_cues && result.visual_forensic_cues.length > 0 && (
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-emerald-950 text-sm flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-emerald-700" />
                    <span>Real-Time Leaf Photo Evidence</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-extrabold uppercase">
                    Verified
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950">
                  {result.visual_forensic_cues.map((cue, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Photosynthetic Vigor Bar */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-600" />
                  Canopy Photosynthetic Vigor
                </span>
                <span className="font-extrabold font-space text-emerald-900 text-sm">
                  {vigor}% Active Foliage
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  style={{ width: `${vigor}%` }}
                  className={`h-full rounded-full ${
                    vigor >= 80 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                      : vigor >= 60 
                      ? 'bg-gradient-to-r from-amber-400 to-emerald-500' 
                      : 'bg-gradient-to-r from-rose-500 to-amber-500'
                  }`}
                />
              </div>
            </div>

            {/* Deep Agricultural Intelligence 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Yield Loss & Harvest PHI */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <TrendingDown className="w-4 h-4 text-amber-600" />
                  <span>Harvest & Yield Impact</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-amber-950">
                  {result.yield_loss_risk || 'Monitor crop canopy regularly'}
                </p>
                <div className="pt-2 border-t border-amber-200/60 flex items-start space-x-2 text-xs text-amber-800">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{result.harvest_waiting_period || 'Standard safe harvest window'}</span>
                </div>
              </div>

              {/* Contagion & Quarantine */}
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-3">
                <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Plot Contagion & Buffer</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700">
                  {result.transmission_mode || 'Airborne moisture dispersal'}
                </p>
                <div className="pt-2 border-t border-rose-200/60 flex items-start space-x-2 text-xs text-rose-900 font-semibold">
                  <Compass className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-rose-600" />
                  <span>{result.quarantine_radius || 'Maintain 5m quarantine buffer'}</span>
                </div>
              </div>

              {/* Soil Health & Nutrients */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
                  <HeartPulse className="w-4 h-4 text-emerald-600" />
                  <span>Soil Deficiencies & pH</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  {result.soil_deficiency || 'Optimal nutrient baseline'}
                </p>
                <div className="pt-2 border-t border-emerald-200/60 text-xs text-emerald-900 font-medium">
                  {result.soil_ph_recommendation || 'Maintain pH 6.0 - 6.8'}
                </div>
              </div>

              {/* Pollinator & Spray Timing */}
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-3">
                <div className="flex items-center space-x-2 text-teal-900 font-bold text-sm">
                  <Bug className="w-4 h-4 text-teal-600" />
                  <span>Tree Stage & Pollinator Safety</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  {result.pollinator_safety || 'Spray at dusk to protect bees'}
                </p>
                <div className="pt-2 border-t border-teal-200/60 flex items-start space-x-2 text-xs text-teal-900 font-semibold">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-teal-600" />
                  <span>{result.spray_timing_window || '5:30 PM - 7:30 PM'}</span>
                </div>
              </div>

            </div>

            {/* Canopy Cooling & Thermal Stress Management */}
            {result.cooling_tips && result.cooling_tips.length > 0 && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/80 via-white to-teal-50/80 border border-blue-200/80 space-y-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <ThermometerSnowflake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-slate-900 text-sm">
                      Canopy Cooling & Thermal Stress Protocols
                    </h4>
                    <p className="text-[11px] text-slate-500">Root buffering, shading & morning hydration</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.cooling_tips.map((tip, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-blue-100 flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-Step Treatment Timeline */}
            {result.treatment_timeline && (
              <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-950 font-bold text-sm">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>Phased Recovery Action Plan</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white border border-emerald-100">
                    <span className="text-[10px] font-bold text-rose-700 uppercase block">Day 1</span>
                    <p className="text-xs text-slate-700 mt-1">{result.treatment_timeline.day_1}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-emerald-100">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">Day 3–5</span>
                    <p className="text-xs text-slate-700 mt-1">{result.treatment_timeline.day_3_5}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block">Day 7–14</span>
                    <p className="text-xs text-slate-700 mt-1">{result.treatment_timeline.day_7_14}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Prescribed Treatments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Organic Remedies */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-emerald-900 text-sm flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Recommended Organic Treatment</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {result.organic_treatment.map((t, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-heading font-bold text-slate-900 text-sm flex items-center space-x-2">
                  <Beaker className="w-4 h-4 text-slate-600" />
                  <span>Standard Chemical Formulation</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {result.chemical_treatment.map((t, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0"></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Environmental Care Protocol */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs uppercase mb-1">
                  <Droplets className="w-4 h-4" />
                  <span>Watering</span>
                </div>
                <p className="text-xs text-slate-700">{result.water}</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase mb-1">
                  <Sun className="w-4 h-4" />
                  <span>Sunlight</span>
                </div>
                <p className="text-xs text-slate-700">{result.sunlight}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase mb-1">
                  <HeartPulse className="w-4 h-4" />
                  <span>Fertilizer</span>
                </div>
                <p className="text-xs text-slate-700">{result.fertilizer}</p>
              </div>
            </div>

          </div>

          {/* Footer Callout */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 text-center space-y-3">
            <p className="text-xs text-slate-500">
              Want to diagnose your own plants with PlantX AI?
            </p>
            <Link
              to="/scan"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-md shadow-emerald-700/20"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Plant Scanner</span>
            </Link>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default SharedReport;
