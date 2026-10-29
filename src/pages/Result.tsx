import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { 
  Activity, 
  AlertTriangle, 
  Droplets, 
  Sun, 
  Info, 
  HeartPulse, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  X, 
  Download, 
  Volume2, 
  Square, 
  Globe,
  Sparkles,
  MessageSquare,
  Send,
  Clock,
  RotateCcw,
  Beaker,
  Sprout,
  TrendingDown,
  ShieldAlert,
  Bug,
  Compass,
  Zap,
  Gauge,
  Eye,
  ThermometerSnowflake,
  Calendar,
  CloudSun,
  Leaf
} from 'lucide-react';
import { analyzePlantImage, translateAnalysis, askBotanistChat, type PlantAnalysisResult } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGE_OPTIONS, type SupportedLanguage } from '../data/translations';
import { compressPlantData } from '../utils/shareReportHelper';

const LoadingScreen = () => {
  const steps = [
    { label: "Inspecting Leaf Architecture...", sub: "Extracting vein patterns and cellular textures from real-time photo" },
    { label: "Neural Pathology Scan...", sub: "Evaluating chlorosis, lesion borders, and cuticle integrity" },
    { label: "Cross-Referencing Disease Database...", sub: "Matching pathogen species and verifying observable symptoms" },
    { label: "Calculating Yield Risk & Soil Needs...", sub: "Analyzing harvest vulnerability and nutrient deficits" },
    { label: "Compiling Agricultural & Cooling Dossier...", sub: "Formulating thermal management and phased recovery plan" }
  ];
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="relative w-36 h-36 mb-8">
        <div className="absolute inset-0 border-4 border-emerald-900/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-teal-400/30 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sprout className="h-12 w-12 text-emerald-600 animate-pulse" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-md"
        >
          <p className="text-xl font-heading text-slate-900 font-bold mb-1">
            {steps[stepIndex].label}
          </p>
          <p className="text-sm text-slate-500 font-normal">
            {steps[stepIndex].sub}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center space-x-1.5">
        {steps.map((_, i) => (
          <span 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === stepIndex ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-300'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

const uiTranslations: Record<SupportedLanguage, Record<string, string>> = {
  English: {
    scanAnother: "Scan Another Plant",
    overview: "Diagnostic Overview",
    symptoms: "Observed Symptoms",
    cause: "Pathological Cause",
    scientificAnalysis: "In-Depth Botanical Reasoning",
    careRecommendations: "Environmental & Care Prescriptions",
    watering: "Watering Schedule",
    sunlight: "Sunlight Requirements",
    fertilizer: "Soil & Nutrients",
    treatmentPlan: "Curative Treatment Regimen",
    organic: "Organic & Bio-Control",
    chemical: "Standard Agricultural Chemical",
    estRecovery: "Recovery Horizon",
    prevention: "Prophylactic & Cultural Prevention",
    diseaseDetected: "Pathogen / Condition",
    severity: "Severity Level",
    aiConfidence: "AI Diagnostic Confidence",
    accuracyScore: "Computer Vision Accuracy",
    translating: "Translating dossier...",
    generatingReport: "Share QR Medical Card",
    saveAsImage: "Download Mobile Report (PNG)",
    askDoctor: "Ask PlantX Botanist AI",
    askPlaceholder: "Ask follow-up question (e.g. How to cool the roots in summer?)",
    tabTreatment: "Curative Treatment & Pathology",
    tabAgriculture: "Agricultural Risk & Soil Health",
    tabCare: "Agronomic Care & Environment",
    tabChat: "Ask Botanist AI",
    vigorLabel: "Canopy Photosynthetic Vigor",
    activeTissue: "Active Chlorophyll Leaf Area",
    yieldRiskTitle: "Harvest & Economic Yield Risk",
    yieldLoss: "Projected Harvest Yield Loss",
    harvestWaiting: "Pre-Harvest Interval (PHI) / Safe Consumption Window",
    contagionTitle: "Contagion & Plot Transmission Risk",
    transmissionMode: "Pathogen Vector & Dispersal",
    quarantineRadius: "Recommended Quarantine Buffer",
    vulnerableCrops: "Nearby Susceptible Crops",
    soilHealthTitle: "Soil Chemistry & Nutrient Deficiencies",
    soilDeficiency: "Leaf-Manifested Nutrient Deficit",
    soilPh: "Optimal Soil pH Range & Amendments",
    phenologyTitle: "Tree Phenology & Pollinator Safety",
    growthStage: "Current Plant Life Stage",
    pollinatorSafety: "Honeybee & Pollinator Protection",
    sprayTiming: "Optimal Spray Window & Rainfast Time",
    forensicTitle: "Verified Real-Time Leaf Photo Evidence",
    coolingTitle: "Thermal Stress Relief & Canopy Cooling Protocols",
    weatherTitle: "Pathogen Weather Trigger & Humidity Window",
    timelineTitle: "Phased Recovery Action Timeline",
    day1Label: "Day 1: Immediate Sanitization & Isolation",
    day35Label: "Day 3–5: Active Treatment & Cooling",
    day714Label: "Day 7–14: Recovery Verification & Follow-up"
  },
  Hindi: {
    scanAnother: "एक और पौधा स्कैन करें",
    overview: "नैदानिक अवलोकन",
    symptoms: "देखे गए लक्षण",
    cause: "रोग का कारण",
    scientificAnalysis: "गहन वैज्ञानिक विश्लेषण",
    careRecommendations: "पर्यावरण और देखभाल संबंधी सुझाव",
    watering: "सिंचाई कार्यक्रम",
    sunlight: "धूप की आवश्यकता",
    fertilizer: "उर्वरक और मिट्टी",
    treatmentPlan: "उपचार योजना",
    organic: "जैविक उपचार",
    chemical: "रासायनिक उपचार",
    estRecovery: "रिकवरी का समय",
    prevention: "रोकथाम के उपाय",
    diseaseDetected: "बीमारी का नाम",
    severity: "गंभीरता का स्तर",
    aiConfidence: "एआई विश्वास स्तर",
    accuracyScore: "सटीकता स्कोर",
    translating: "अनुवाद हो रहा है...",
    generatingReport: "QR रिपोर्ट साझा करें",
    saveAsImage: "मोबाइल रिपोर्ट डाउनलोड करें (PNG)",
    askDoctor: "पादप विशेषज्ञ से पूछें",
    askPlaceholder: "सवाल पूछें (उदा. गर्मी में जड़ों को ठंडा कैसे रखें?)",
    tabTreatment: "रोग उपचार एवं पैथोलॉजी",
    tabAgriculture: "कृषि जोखिम एवं मृदा स्वास्थ्य",
    tabCare: "कृषि देखभाल एवं पर्यावरण",
    tabChat: "कृषि विशेषज्ञ एआई से पूछें",
    vigorLabel: "कैनोपी प्रकाश संश्लेषण क्षमता",
    activeTissue: "सक्रिय हरित पर्ण ऊतक",
    yieldRiskTitle: "फसल उत्पादन एवं आर्थिक जोखिम",
    yieldLoss: "अनुमानित फसल उत्पादन हानि",
    harvestWaiting: "सुरक्षित तुड़ाई अंतराल (PHI)",
    contagionTitle: "रोग प्रसार एवं पड़ोसी खेत जोखिम",
    transmissionMode: "रोग प्रसार माध्यम",
    quarantineRadius: "अनुशंसित पृथक्करण दूरी",
    vulnerableCrops: "संवेदनशील पड़ोसी फसलें",
    soilHealthTitle: "मृदा रसायन एवं पोषक तत्व कमी",
    soilDeficiency: "पहचाने गए पोषक तत्वों की कमी",
    soilPh: "उपयुक्त मृदा पीएच एवं सुधार",
    phenologyTitle: "वृक्ष अवस्था एवं परागणकर्ता सुरक्षा",
    growthStage: "पौधे की विकास अवस्था",
    pollinatorSafety: "मधुमक्खी एवं परागणकर्ता सुरक्षा",
    sprayTiming: "छिड़काव का सही समय एवं वर्षा प्रतिरोध",
    forensicTitle: "पत्ती की वास्तविक फोटो से प्रमाणित साक्ष्य",
    coolingTitle: "गर्मी से बचाव एवं पौधों को ठंडा रखने के उपाय",
    weatherTitle: "रोग सक्रिय करने वाला मौसम एवं आर्द्रता",
    timelineTitle: "चरणबद्ध सुधार एवं उपचार समयरेखा",
    day1Label: "दिन 1: तत्काल छंटाई एवं पृथक्करण",
    day35Label: "दिन 3–5: उपचार छिड़काव एवं कूलिंग",
    day714Label: "दिन 7–14: सुधार निरीक्षण एवं फॉलो-अप"
  },
  Telugu: {
    scanAnother: "మరొక మొక్కను స్కాన్ చేయండి",
    overview: "వ్యాధి నిర్ధారణ అవలోకనం",
    symptoms: "గుర్తించిన లక్షణాలు",
    cause: "రోగ కారణం",
    scientificAnalysis: "శాస్త్రీయ విశ్లేషణ",
    careRecommendations: "పర్యావరణం మరియు సంరక్షణ సూచనలు",
    watering: "నీటిపారుదల షెడ్యూల్",
    sunlight: "సూర్యరశ్మి అవసరాలు",
    fertilizer: "ఎరువులు & నేల",
    treatmentPlan: "చికిత్స ప్రణాళిక",
    organic: "సేంద్రీయ పద్ధతులు",
    chemical: "రసాయన మందులు",
    estRecovery: "కోలుకునే సమయం",
    prevention: "నివారణ చర్యలు",
    diseaseDetected: "గుర్తించిన వ్యాధి",
    severity: "తీవ్రత స్థాయి",
    aiConfidence: "AI విశ్వసనీయత",
    accuracyScore: "ఖచ్చితత్వం స్కోరు",
    translating: "అనువదిస్తోంది...",
    generatingReport: "QR నివేదిక షేర్ చేయండి",
    saveAsImage: "మొబైల్ నివేదిక డౌన్‌లోడ్ (PNG)",
    askDoctor: "వృక్ష నిపుణుడిని అడగండి",
    askPlaceholder: "ప్రశ్న అడగండి (ఉదా. ఎండ వేడిమి నుంచి మొక్కను ఎలా చల్లబరచాలి?)",
    tabTreatment: "చికిత్స & రోగ నిర్ధారణ",
    tabAgriculture: "వ్యవసాయ నష్ట భయం & నేల ఆరోగ్యం",
    tabCare: "వ్యవసాయ సంరక్షణ & పర్యావరణం",
    tabChat: "వృక్ష శాస్త్రజ్ఞుడిని అడగండి",
    vigorLabel: "ఆకుల కిరణజన్య సంయోగ క్రియ సామర్థ్యం",
    activeTissue: "సజీవ ఆకుపచ్చ కణజాలం",
    yieldRiskTitle: "దిగుబడి నష్ట ప్రమాదం",
    yieldLoss: "అంచనా వేసిన దిగుబడి నష్టం",
    harvestWaiting: "కోతకు ముందు వేచి ఉండాల్సిన సమయం (PHI)",
    contagionTitle: "వ్యాప్తి ప్రమాదం & సమీప పొలాలు",
    transmissionMode: "వ్యాధి వ్యాప్తి విధానం",
    quarantineRadius: "సిఫార్సు చేయబడిన ఐసోలేషన్ దూరం",
    vulnerableCrops: "ప్రభావితమయ్యే ఇతర పంటలు",
    soilHealthTitle: "నేల రసాయనం & పోషకాల లోపం",
    soilDeficiency: "గుర్తించిన పోషకాల లోపం",
    soilPh: "అనుకూలమైన నేల pH & సవరణ",
    phenologyTitle: "చెట్టు దశ & తేనెటీగల భద్రత",
    growthStage: "ప్రస్తుత పంట పెరుగుదల దశ",
    pollinatorSafety: "తేనెటీగల భద్రత & జాగ్రత్తలు",
    sprayTiming: "స్ప్రే చేయడానికి ఉత్తమ సమయం",
    forensicTitle: "ఫోటో ఆధారిత ప్రత్యక్ష ఆధారాలు",
    coolingTitle: "ఎండ వేడి నివారణ & చల్లదనం పద్ధతులు",
    weatherTitle: "వ్యాధిని పెంచే వాతావరణం & తేమ శాతం",
    timelineTitle: "దశలవారీ చికిత్స కాలక్రమం",
    day1Label: "1వ రోజు: తక్షణ కత్తిరింపు & వేరుచేయడం",
    day35Label: "3-5 రోజులు: ఔషధ ప్రయోగం & చల్లబరచడం",
    day714Label: "7-14 రోజులు: రికవరీ సమీక్ష & పర్యవేక్షణ"
  },
  Tamil: {
    scanAnother: "மற்றொரு தாவரத்தை ஸ்கேன் செய்க",
    overview: "கண்டறியப்பட்ட கண்ணோட்டம்",
    symptoms: "கண்டறியப்பட்ட அறிகுறிகள்",
    cause: "நோய்க்கான காரணம்",
    scientificAnalysis: "ஆழமான தாவரவியல் விளக்கம்",
    careRecommendations: "சுற்றுச்சூழல் மற்றும் பராமரிப்பு",
    watering: "நீர்ப்பாசன அட்டவணை",
    sunlight: "சூரிய ஒளி தேவைகள்",
    fertilizer: "மண் மற்றும் உரங்கள்",
    treatmentPlan: "சிகிச்சை திட்டம்",
    organic: "இயற்கை மற்றும் உயிரியல் முறைகள்",
    chemical: "வேளாண் வேதியியல் தெளிப்பு",
    estRecovery: "குணமாகும் காலம்",
    prevention: "தடுப்பு நடவடிக்கைகள்",
    diseaseDetected: "கண்டறியப்பட்ட நோய்",
    severity: "தீவிர நிலை",
    aiConfidence: "AI துல்லியம்",
    accuracyScore: "கணிப்பீட்டு துல்லியம்",
    translating: "மொழிபெயர்க்கப்படுகிறது...",
    generatingReport: "QR அட்டை பகிர்க",
    saveAsImage: "மொபைல் அறிக்கை பதிவிறக்குக (PNG)",
    askDoctor: "தாவர மருத்துவரிடம் கேளுங்கள்",
    askPlaceholder: "கேள்வி கேளுங்கள் (எ.கா. வெப்பத்திலிருந்து செடியை பாதுகாப்பது எப்படி?)",
    tabTreatment: "சிகிச்சை மற்றும் நோயியல்",
    tabAgriculture: "விவசாய இடர் மற்றும் மண் வளம்",
    tabCare: "வேளாண் பராமரிப்பு",
    tabChat: "விஞ்ஞானி AI-யிடம் கேளுங்கள்",
    vigorLabel: "இலைகளின் ஒளிச்சேர்க்கை வீரியம்",
    activeTissue: "ஆரோக்கியமான பச்சைய திசு",
    yieldRiskTitle: "மகசூல் இழப்பு மற்றும் பொருளாதார இடர்",
    yieldLoss: "எதிர்பார்க்கப்படும் மகசூல் இழப்பு",
    harvestWaiting: "அறுவடைக்கு முந்தைய காத்திருப்பு காலம் (PHI)",
    contagionTitle: "நோய் பரவல் மற்றும் பாதுகாப்பு வளையம்",
    transmissionMode: "நோய் பரவும் முறை",
    quarantineRadius: "பரிந்துரைக்கப்பட்ட தனிமைப்படுத்தல் தூரம்",
    vulnerableCrops: "அருகிலுள்ள பாதிக்கப்படக்கூடிய பயிர்கள்",
    soilHealthTitle: "மண் சத்து மற்றும் ஊட்டச்சத்து குறைபாடு",
    soilDeficiency: "இலையில் கண்டறியப்பட்ட சத்துக் குறைபாடு",
    soilPh: "பரிந்துரைக்கப்பட்ட மண் pH அளவு",
    phenologyTitle: "மரத்தின் வளர்ச்சி நிலை மற்றும் தேனீ பாதுகாப்பு",
    growthStage: "தற்போதைய வளர்ச்சி நிலை",
    pollinatorSafety: "தேனீக்கள் மற்றும் மகரந்தச் சேர்க்கை பாதுகாப்பு",
    sprayTiming: "சிறந்த தெளிப்பு நேரம்",
    forensicTitle: "புகைப்பட அடிப்படையிலான சான்றுகள்",
    coolingTitle: "வெப்பத் தணிப்பு மற்றும் குளிர்ச்சி முறைகள்",
    weatherTitle: "நோய் பரப்பும் வானிலை மற்றும் ஈரப்பதம்",
    timelineTitle: "படிபடியான மீட்பு அட்டவணை",
    day1Label: "நாள் 1: கவாத்து செய்தல் & தனிமைப்படுத்துதல்",
    day35Label: "நாள் 3–5: மருந்து தெளித்தல் மற்றும் குளிர்ச்சி",
    day714Label: "நாள் 7–14: வளர்ச்சி ஆய்வு"
  },
  Kannada: {
    scanAnother: "ಮತ್ತೊಂದು ಸಸ್ಯವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    overview: "ರೋಗ ನಿರ್ಣಯ ಸಾರಾಂಶ",
    symptoms: "ಕಂಡುಬಂದ ಲಕ್ಷಣಗಳು",
    cause: "ರೋಗದ ಕಾರಣ",
    scientificAnalysis: "ವೈಜ್ಞಾನಿಕ ವಿಶ್ಲೇಷಣೆ",
    careRecommendations: "ಪರಿಸರ ಮತ್ತು ಆರೈಕೆ ಶಿಫಾರಸುಗಳು",
    watering: "ನೀರಿನ ವೇಳಾಪಟ್ಟಿ",
    sunlight: "ಸೂರ್ಯನ ಬೆಳಕಿನ ಅಗತ್ಯತೆ",
    fertilizer: "ಮಣ್ಣು ಮತ್ತು ಪೋಷಕಾಂಶಗಳು",
    treatmentPlan: "ಚಿಕಿತ್ಸಾ ಯೋಜನೆ",
    organic: "ಸಾವಯವ ಚಿಕಿತ್ಸೆ",
    chemical: "ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ",
    estRecovery: "ಗುಣಮುಖವಾಗುವ ಸಮಯ",
    prevention: "ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು",
    diseaseDetected: "ಗುರುತಿಸಲಾದ ರೋಗ",
    severity: "ತೀವ್ರತೆಯ ಮಟ್ಟ",
    aiConfidence: "AI ನಿಖರತೆ",
    accuracyScore: "ಕಂಪ್ಯೂಟರ್ ದೃಷ್ಟಿ ಸ್ಕೋರ್",
    translating: "ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...",
    generatingReport: "QR ವರದಿ ಹಂಚಿಕೊಳ್ಳಿ",
    saveAsImage: "ಮೊಬೈಲ್ ವರದಿ ಡೌನ್‌ಲೋಡ್ (PNG)",
    askDoctor: "ಸಸ್ಯ ತಜ್ಞರನ್ನು ಕೇಳಿ",
    askPlaceholder: "ಪ್ರಶ್ನೆ ಕೇಳಿ (ಉದಾ: ಶಾಖದ ಸಮಯದಲ್ಲಿ ಬೇರುಗಳನ್ನು ತಂಪಾಗಿಸುವುದು ಹೇಗೆ?)",
    tabTreatment: "ಚಿಕಿತ್ಸೆ ಮತ್ತು ರೋಗಶಾಸ್ತ್ರ",
    tabAgriculture: "ಕೃಷಿ ನಷ್ಟ ಅಪಾಯ ಮತ್ತು ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
    tabCare: "ಕೃಷಿ ಆರೈಕೆ ಮತ್ತು ಪರಿಸರ",
    tabChat: "ಸಸ್ಯ ತಜ್ಞ AI ಕೇಳಿ",
    vigorLabel: "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯ ಚೈತನ್ಯ ಮಟ್ಟ",
    activeTissue: "ಸಕ್ರಿಯ ಹಸಿರು ಪೋಷಕಾಂಶ ಅಂಗಾಂಶ",
    yieldRiskTitle: "ಇಳುವರಿ ನಷ್ಟ ಮತ್ತು ಆರ್ಥಿಕ ಅಪಾಯ",
    yieldLoss: "ಅಂದಾಜು ಬೆಳೆ ಇಳುವರಿ ನಷ್ಟ",
    harvestWaiting: "ಕೊಯ್ಲಿಗೆ ಮೊದಲು ಕಾಯುವ ಅವಧಿ (PHI)",
    contagionTitle: "ರೋಗ ಹರಡುವಿಕೆ ಮತ್ತು ಪಕ್ಕದ ಜಮೀನಿನ ಅಪಾಯ",
    transmissionMode: "ರೋಗ ಹರಡುವ ವಿಧಾನ",
    quarantineRadius: "ಪ್ರತ್ಯೇಕತೆಯ ಕನಿಷ್ಠ ದೂರ",
    vulnerableCrops: "ಹತ್ತಿರದ ಸೂಕ್ಷ್ಮ ಬೆಳೆಗಳು",
    soilHealthTitle: "ಮಣ್ಣಿನ ರಾಸಾಯನಿಕತೆ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ",
    soilDeficiency: "ಕಂಡುಬಂದ ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ",
    soilPh: "ಸೂಕ್ತ ಮಣ್ಣಿನ pH ಮತ್ತು ಸುಧಾರಣೆ",
    phenologyTitle: "ಸಸ್ಯದ ಹಂತ ಮತ್ತು ಜೇನುನೊಣಗಳ ಸುರಕ್ಷತೆ",
    growthStage: "ಪ್ರಸ್ತುತ ಬೆಳವಣಿಗೆಯ ಹಂತ",
    pollinatorSafety: "ಜೇನುನೊಣ ಮತ್ತು ಪರಾಗಸ್ಪರ್ಶಕ ಸುರಕ್ಷತೆ",
    sprayTiming: "ಸಿಂಪಡಿಸಲು ಸೂಕ್ತ ಸಮಯ",
    forensicTitle: "ಫೋಟೋ ಆಧಾರಿತ ನೈಜ ದೃಶ್ಯ ಪುರಾವೆ",
    coolingTitle: "ಶಾಖ ಒತ್ತಡ ನಿರ್ವಹಣೆ ಮತ್ತು ತಂಪಾಗಿಸುವ ಕ್ರಮಗಳು",
    weatherTitle: "ರೋಗ ಹರಡುವ ಹವಾಮಾನ ಮತ್ತು ತೇವಾಂಶ",
    timelineTitle: "ಹಂತ-ಹಂತದ ಚಿಕಿತ್ಸಾ ವೇಳಾಪಟ್ಟಿ",
    day1Label: "ದಿನ 1: ತ್ವರಿತ ಕತ್ತರಿಸುವಿಕೆ ಮತ್ತು ಪ್ರತ್ಯೇಕತೆ",
    day35Label: "ದಿನ 3–5: ಚಿಕಿತ್ಸೆ ಮತ್ತು ತಂಪುಗೊಳಿಸುವಿಕೆ",
    day714Label: "ದಿನ 7–14: ಚೇತರಿಕೆ ಪರಿಶೀಲನೆ"
  },
  Malayalam: {
    scanAnother: "മറ്റൊരു ചെടി സ്കാൻ ചെയ്യുക",
    overview: "രോഗനിർണ്ണയ അവലോകനം",
    symptoms: "കണ്ടെത്തിയ ലക്ഷണങ്ങൾ",
    cause: "രോഗകാരണം",
    scientificAnalysis: "ആഴത്തിലുള്ള ശാസ്ത്രീയ വിശകലനം",
    careRecommendations: "പരിപാലന നിർദ്ദേശങ്ങൾ",
    watering: "നനയ്ക്കൽ ക്രമം",
    sunlight: "സൂര്യപ്രകാശം",
    fertilizer: "വളവും മണ്ണും",
    treatmentPlan: "ചികിത്സാ പദ്ധതി",
    organic: "ജൈവ ചികിത്സ",
    chemical: "രാസകീടനാശിനി പ്രയോഗം",
    estRecovery: "രോഗശമന സമയം",
    prevention: "പ്രതിരോധ മാർഗ്ഗങ്ങൾ",
    diseaseDetected: "രോഗത്തിന്റെ പേര്",
    severity: "തീവ്രത നില",
    aiConfidence: "AI കൃത്യത",
    accuracyScore: "കംപ്യൂട്ടർ വിഷൻ സ്കോർ",
    translating: "തർജ്ജമ ചെയ്യുന്നു...",
    generatingReport: "QR റിപ്പോർട്ട് പങ്കിടുക",
    saveAsImage: "മൊബൈൽ റിപ്പോർട്ട് ഡൗൺലോഡ് (PNG)",
    askDoctor: "സസ്യ വിദഗ്ദ്ധനോട് ചോദിക്കുക",
    askPlaceholder: "ചോദ്യങ്ങൾ ചോദിക്കുക (ഉദാ: ചൂടുകാലത്ത് വേരുകൾ എങ്ങനെ തണുപ്പിക്കാം?)",
    tabTreatment: "ചികിത്സയും രോഗവിവരങ്ങളും",
    tabAgriculture: "കാർഷിക നഷ്ട സാധ്യതയും മണ്ണിന്റെ ആരോഗ്യവും",
    tabCare: "കാർഷിക പരിപാലനം",
    tabChat: "സസ്യശാസ്ത്രജ്ഞനായ AI-യോട് ചോദിക്കുക",
    vigorLabel: "പ്രകാശസംശ്ലേഷണ ശേഷി നിരക്ക്",
    activeTissue: "ആരോഗ്യമുള്ള പച്ച ഇല കോശങ്ങൾ",
    yieldRiskTitle: "വിളവ് നഷ്ട സാധ്യത",
    yieldLoss: "പ്രതീക്ഷിക്കുന്ന വിളവ് നഷ്ടം",
    harvestWaiting: "വിളവെടുപ്പിന് മുമ്പുള്ള കാത്തിരിപ്പ് സമയം (PHI)",
    contagionTitle: "രോഗവ്യാപന സാധ്യത",
    transmissionMode: "രോഗം പടരുന്ന വിധം",
    quarantineRadius: "ക്വാറന്റൈൻ അകലം",
    vulnerableCrops: "സാധ്യതയുള്ള മറ്റ് വിളകൾ",
    soilHealthTitle: "മണ്ണിന്റെ ഗുണവും പോഷക കുറവും",
    soilDeficiency: "കണ്ടെത്തിയ പോഷക കുറവ്",
    soilPh: "അനുയോജ്യമായ മണ്ണ് pH",
    phenologyTitle: "ചെടിയുടെ വളർച്ചാ ഘട്ടവും തേനീച്ച സംരക്ഷണവും",
    growthStage: "നിലവിലെ വളർച്ചാ ഘട്ടം",
    pollinatorSafety: "തേനീച്ച സംരക്ഷണ നിർദ്ദേശം",
    sprayTiming: "മരുന്ന് തളിക്കാൻ ഏറ്റവും അനുയോജ്യമായ സമയം",
    forensicTitle: "ഫോട്ടോ അടിസ്ഥാനമാക്കിയുള്ള തെളിവുകൾ",
    coolingTitle: "ചൂട് ലഘൂകരണവും തണുപ്പ് പരിപാലനവും",
    weatherTitle: "രോഗം പടരുന്ന കാലാവസ്ഥയും ഈർപ്പവും",
    timelineTitle: "ഘട്ടം ഘട്ടമായുള്ള പരിചരണ ഘട്ടങ്ങൾ",
    day1Label: "ദിവസം 1: രോഗബാധയുള്ള ഭാഗങ്ങൾ മുറിച്ചുമാറ്റൽ",
    day35Label: "ദിവസം 3–5: പരിചരണ തളിക്കലും തണുപ്പിക്കലും",
    day714Label: "ദിവസം 7–14: പുരോഗതി വിലയിരുത്തൽ"
  }
};

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PlantAnalysisResult | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPng, setIsGeneratingPng] = useState(false);

  // Synchronize with global LanguageContext
  const { language, setLanguage, isSpeaking, speak, stopSpeaking } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const [cachedResults, setCachedResults] = useState<Record<string, PlantAnalysisResult>>({});

  // Chat follow-up state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'treatment' | 'agriculture' | 'care' | 'chat'>('treatment');

  const imageSrc = location.state?.image;
  const presetData = location.state?.presetData as PlantAnalysisResult | undefined;

  const analysisFetched = useRef(false);

  useEffect(() => {
    if (!imageSrc && !presetData) {
      navigate('/scan');
      return;
    }

    if (analysisFetched.current) return;
    analysisFetched.current = true;

    // If preset data was passed (e.g. from sample plants), use it directly
    if (presetData) {
      setResult(presetData);
      setCachedResults({ 'English': presetData });
      setLoading(false);
      return;
    }

    const fetchAnalysis = async () => {
      try {
        const data = await analyzePlantImage(imageSrc);
        setResult(data);
        setCachedResults({ 'English': data });
      } catch (err) {
        console.error("Diagnostic error:", err);
        navigate('/error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [imageSrc, presetData, navigate]);

  // Translate result when language changes
  useEffect(() => {
    const handleTranslate = async () => {
      if (!result || language === 'English') {
        if (cachedResults['English']) {
          setResult(cachedResults['English']);
        }
        return;
      }

      if (cachedResults[language]) {
        setResult(cachedResults[language]);
        return;
      }

      setIsTranslating(true);
      try {
        const englishResult = cachedResults['English'] || result;
        const translated = await translateAnalysis(englishResult, language);
        setCachedResults(prev => ({ ...prev, [language]: translated }));
        setResult(translated);
      } catch (err) {
        console.error("Translation failed", err);
      } finally {
        setIsTranslating(false);
      }
    };
    handleTranslate();
  }, [language]);

  if (loading) return <LoadingScreen />;
  if (!result) return null;

  const t = uiTranslations[language] || uiTranslations.English;

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'Healthy': 
        return {
          pill: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          ring: 'border-emerald-500'
        };
      case 'Warning': 
        return {
          pill: 'bg-amber-100 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          ring: 'border-amber-500'
        };
      case 'Critical': 
        return {
          pill: 'bg-rose-100 text-rose-800 border-rose-300',
          dot: 'bg-rose-500',
          ring: 'border-rose-500'
        };
      default: 
        return {
          pill: 'bg-slate-100 text-slate-800 border-slate-300',
          dot: 'bg-slate-500',
          ring: 'border-slate-500'
        };
    }
  };

  const badgeStyle = getHealthBadge(result.health);

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    const narrative = `${result.plant_name}. ${result.scientific_name}. Health status is ${result.health}. ${
      result.disease !== 'None' 
        ? `Disease detected is ${result.disease}. Severity is ${result.severity}. Symptoms: ${result.symptoms.join(", ")}. Organic recommendation: ${result.organic_treatment.join(", ")}. Cooling and thermal tips: ${result.cooling_tips?.join(", ") || 'Ensure adequate root mulching'}. Harvest yield impact: ${result.yield_loss_risk || 'Monitor closely'}.` 
        : 'The plant shows optimum health and photosynthesis vitality with zero pathogen marks.'
    }`;

    speak(narrative);
  };

  // Ultra-compact QR code generator for 100% reliable mobile camera scanning on any host
  const handleShare = () => {
    if (result) {
      const compressed = compressPlantData(result);
      // Use root query parameter `/?share=...` which is supported on every static web host without 404
      const url = `${window.location.origin}/?share=${compressed}`;
      setShareUrl(url);
      setShowQR(true);
    }
  };

  // Generates crisp, mobile-proportioned structured Grid PNG card instead of tall skinny page
  const handleShareAsImage = async () => {
    if (mobileCardRef.current && result) {
      setIsGeneratingPng(true);
      try {
        // Allow fonts and background to paint cleanly
        await new Promise((resolve) => setTimeout(resolve, 150));
        const dataUrl = await toPng(mobileCardRef.current, { 
          pixelRatio: 2.2, 
          cacheBust: true,
          quality: 0.95
        });
        const link = document.createElement('a');
        link.download = `PlantX-Mobile-Diagnosis-${result.plant_name.replace(/\s+/g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Failed to generate mobile card image", error);
        alert("Failed to export mobile snapshot. Please try again.");
      } finally {
        setIsGeneratingPng(false);
      }
    }
  };

  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuestion.trim() || isChatLoading || !result) return;

    const userQ = inputQuestion.trim();
    setInputQuestion('');
    const updatedHistory = [...chatMessages, { role: 'user' as const, content: userQ }];
    setChatMessages(updatedHistory);
    setIsChatLoading(true);

    try {
      const reply = await askBotanistChat(result, userQ, updatedHistory);
      setChatMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev, 
        { role: 'assistant', content: "I'm having trouble connecting right now. Ensure standard sanitary pruning, root mulch cooling, and apply the prescribed treatment." }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const vigor = result.photosynthetic_vigor || (result.health === 'Healthy' ? 96 : result.health === 'Warning' ? 70 : 45);

  return (
    <div className="min-h-screen bg-[#F8FAF7] bg-radial-mesh py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          
          <button 
            onClick={() => navigate('/scan')}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.scanAnother}</span>
          </button>

          <div className="flex items-center space-x-3">
            {/* Multilingual Selector */}
            <div className="flex items-center bg-slate-100 rounded-xl px-3 py-1.5 text-xs font-semibold border border-slate-200">
              <Globe className="h-3.5 w-3.5 text-emerald-600 mr-2" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-transparent outline-none text-slate-800 font-bold cursor-pointer font-space"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.nativeLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* Read Aloud Button */}
            <button 
              onClick={handleSpeech}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm font-space cursor-pointer ${
                isSpeaking 
                  ? 'bg-rose-600 text-white animate-pulse' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
              title={isSpeaking ? "Stop Speech" : "Listen to Diagnosis"}
            >
              {isSpeaking ? (
                <>
                  <Square className="h-3.5 w-3.5 fill-current" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Read Aloud</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Printable / Savable Main Responsive Web Dossier */}
        <div ref={resultRef} className="glass-card rounded-3xl overflow-hidden border border-white/80 shadow-2xl bg-white">
          
          {/* Header Banner Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-slate-200/80">
            
            {/* Leaf Image Column */}
            <div className="lg:col-span-4 relative min-h-[280px] lg:min-h-full bg-slate-900 overflow-hidden">
              <img 
                src={imageSrc} 
                alt="Scanned specimen" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none"></div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-md flex items-center space-x-1.5 ${badgeStyle.pill}`}>
                  <span className={`w-2 h-2 rounded-full ${badgeStyle.dot}`}></span>
                  <span>{result.health} Condition</span>
                </span>
              </div>

              {/* Specimen Tag */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Specimen Capture</span>
                <p className="text-xs text-slate-300 font-mono">ID: PX-AI-{Math.floor(Math.random() * 89999 + 10000)}</p>
              </div>
            </div>

            {/* Specimen Details & Quick Metrics */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wide uppercase border border-emerald-200">
                    Agricultural Pathology & Crop Health Dossier
                  </span>
                  {isTranslating && (
                    <span className="text-xs font-semibold text-emerald-600 animate-pulse flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t.translating}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
                  {result.plant_name}
                </h1>
                <p className="text-slate-500 font-serif italic text-base sm:text-lg mt-0.5">
                  {result.scientific_name}
                </p>
              </div>

              {/* Canopy Photosynthetic Vigor Bar */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-emerald-600" />
                    {t.vigorLabel}
                  </span>
                  <span className="font-extrabold font-space text-emerald-900 text-sm">
                    {vigor}% {t.activeTissue}
                  </span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${vigor}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      vigor >= 80 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                        : vigor >= 60 
                        ? 'bg-gradient-to-r from-amber-400 to-emerald-500' 
                        : 'bg-gradient-to-r from-rose-500 to-amber-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>{100 - vigor}% Necrotic / Chlorotic Area</span>
                  <span className="font-medium text-emerald-800">
                    {vigor >= 80 ? 'Optimal Light Absorption' : vigor >= 60 ? 'Moderate Foliage Compromise' : 'Severe Vascular & Chloroplast Damage'}
                  </span>
                </div>
              </div>

              {/* Confidence & Severity Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Accuracy Gauge Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-4">
                  <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-white border-4 border-emerald-500 shadow-sm flex-shrink-0">
                    <span className="font-heading font-extrabold text-slate-900 text-sm">
                      {result.confidence}%
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {t.aiConfidence}
                    </h4>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      {t.accuracyScore}
                    </p>
                  </div>
                </div>

                {/* Severity Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <AlertTriangle className={`w-6 h-6 ${result.health === 'Healthy' ? 'text-emerald-500' : 'text-amber-500'}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {t.severity}
                    </h4>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {result.severity || (result.health === 'Healthy' ? 'None' : 'Moderate')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Disease Alert Banner (if disease detected) */}
              {result.disease && result.disease.toLowerCase() !== 'none' ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      {t.diseaseDetected}
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-amber-950 mt-0.5">
                      {result.disease}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Agronomic Assessment
                    </span>
                    <p className="text-sm font-bold text-emerald-950">
                      No Pathogen or Blight Detected. Specimen is flourishing.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleShare}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-emerald-600 text-emerald-800 text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t.generatingReport}</span>
                </button>

                <button
                  onClick={handleShareAsImage}
                  disabled={isGeneratingPng}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isGeneratingPng ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>{isGeneratingPng ? "Generating Mobile Card..." : t.saveAsImage}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Interactive 4-Tab Navigation */}
          <div className="border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 pt-4 flex flex-wrap gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('treatment')}
              className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-heading font-bold transition-all border-t border-x cursor-pointer ${
                activeTab === 'treatment'
                  ? 'bg-white text-emerald-900 border-slate-200 border-b-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 border-transparent'
              }`}
            >
              {t.tabTreatment}
            </button>

            <button
              onClick={() => setActiveTab('agriculture')}
              className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-heading font-bold transition-all border-t border-x flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'agriculture'
                  ? 'bg-white text-emerald-900 border-slate-200 border-b-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 border-transparent'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.tabAgriculture}</span>
            </button>

            <button
              onClick={() => setActiveTab('care')}
              className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-heading font-bold transition-all border-t border-x cursor-pointer ${
                activeTab === 'care'
                  ? 'bg-white text-emerald-900 border-slate-200 border-b-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 border-transparent'
              }`}
            >
              {t.tabCare}
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3.5 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-heading font-bold transition-all border-t border-x flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white text-emerald-900 border-slate-200 border-b-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 border-transparent'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.tabChat}</span>
              {chatMessages.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              )}
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8">
            
            {/* TAB 1: Curative Treatment & Pathology */}
            {activeTab === 'treatment' && (
              <div className="space-y-8">
                
                {/* 2-Column Overview & Remedies Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Left: Pathology Observations & Real-Time Photo Forensics */}
                  <div className="space-y-6">
                    
                    {/* Overview */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <h3 className="font-heading font-bold text-slate-900 text-base flex items-center space-x-2">
                        <Info className="w-4 h-4 text-emerald-600" />
                        <span>{t.overview}</span>
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {result.description}
                      </p>
                    </div>

                    {/* Real-Time Verified Photo Evidence Card */}
                    {result.visual_forensic_cues && result.visual_forensic_cues.length > 0 && (
                      <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading font-bold text-emerald-950 text-sm flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-emerald-700" />
                            <span>{t.forensicTitle}</span>
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-extrabold uppercase font-space">
                            Photo Grounded
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-800 italic">
                          Observable visual markers analyzed directly from your uploaded leaf image:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                          {result.visual_forensic_cues.map((cue, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                              <span>{cue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Symptoms Checklist */}
                    {result.symptoms && result.symptoms.length > 0 && (
                      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                        <h4 className="font-heading font-bold text-slate-900 text-sm flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span>{t.symptoms}</span>
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-700">
                          {result.symptoms.map((symptom, i) => (
                            <li key={i} className="flex items-start space-x-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Cause & In-Depth Scientific Reasoning */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <h4 className="font-heading font-bold text-slate-900 text-sm flex items-center space-x-2">
                        <Beaker className="w-4 h-4 text-emerald-700" />
                        <span>{t.scientificAnalysis}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold">Etiology:</span> {result.cause}
                      </p>
                      {result.detailed_reasoning && (
                        <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200 italic">
                          {result.detailed_reasoning}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Right: Prescribed Treatment Protocol */}
                  <div className="space-y-6">
                    
                    {/* Organic Remedies */}
                    <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500/30 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-bold text-emerald-950 text-base flex items-center space-x-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-600" />
                          <span>{t.organic}</span>
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          Recommended First
                        </span>
                      </div>

                      <ul className="space-y-2.5 text-sm text-slate-700">
                        {result.organic_treatment.map((treatment, i) => (
                          <li key={i} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start space-x-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Conventional Agricultural Chemical */}
                    {result.chemical_treatment && result.chemical_treatment.length > 0 && (
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                        <h4 className="font-heading font-bold text-slate-900 text-sm flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-slate-500" />
                          <span>{t.chemical}</span>
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                          {result.chemical_treatment.map((treatment, i) => (
                            <li key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></span>
                              <span>{treatment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Weather Trigger & Humidity Window */}
                    {result.favorable_weather && (
                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                        <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                          <CloudSun className="w-4 h-4 text-amber-600" />
                          <span>{t.weatherTitle}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 font-medium">
                          {result.favorable_weather}
                        </p>
                      </div>
                    )}

                    {/* Recovery Time Horizon */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {t.estRecovery}
                        </h4>
                        <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                          {result.recovery_time}
                        </p>
                      </div>
                    </div>

                    {/* Prophylactic Prevention Tips */}
                    {result.prevention && result.prevention.length > 0 && (
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                        <h4 className="font-heading font-bold text-slate-900 text-sm flex items-center space-x-2">
                          <ShieldCheck className="w-4 h-4 text-teal-600" />
                          <span>{t.prevention}</span>
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                          {result.prevention.map((tip, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 flex-shrink-0"></span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>

                </div>

                {/* Phased Step-by-Step Recovery Timeline */}
                {result.treatment_timeline && (
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/90 border border-emerald-200 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-emerald-700" />
                      <h3 className="font-heading font-extrabold text-emerald-950 text-base">
                        {t.timelineTitle}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                      
                      {/* Day 1 */}
                      <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-xs space-y-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase font-space">
                          {t.day1Label}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                          {result.treatment_timeline.day_1}
                        </p>
                      </div>

                      {/* Day 3-5 */}
                      <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-xs space-y-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase font-space">
                          {t.day35Label}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                          {result.treatment_timeline.day_3_5}
                        </p>
                      </div>

                      {/* Day 7-14 */}
                      <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-xs space-y-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase font-space">
                          {t.day714Label}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium pt-1">
                          {result.treatment_timeline.day_7_14}
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: Agricultural Risk & Soil Health */}
            {activeTab === 'agriculture' && (
              <div className="space-y-6">
                
                {/* 2x2 Grid of Agricultural Diagnostics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Card 1: Harvest & Economic Yield Loss Risk */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 border border-amber-200/90 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                        <TrendingDown className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-space">
                        Yield Security
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                        {t.yieldRiskTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Untreated disease progression & economic threshold
                      </p>
                    </div>

                    {/* Yield Loss Metric Box */}
                    <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                        {t.yieldLoss}
                      </span>
                      <p className="text-base sm:text-lg font-heading font-extrabold text-amber-950">
                        {result.yield_loss_risk || "Minimal impact under standard cultural practice"}
                      </p>
                    </div>

                    {/* Pre-Harvest Interval (PHI) */}
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
                          {t.harvestWaiting}
                        </span>
                        <p className="text-xs sm:text-sm text-amber-900 font-medium mt-1">
                          {result.harvest_waiting_period || "No chemical residues. Safe for consumption upon standard post-harvest wash."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Contagion & Neighboring Plot Risk */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-50/80 via-white to-rose-50/30 border border-rose-200/90 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold font-space">
                        Biosecurity Buffer
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                        {t.contagionTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Transmission vector and perimeter buffer quarantine
                      </p>
                    </div>

                    {/* Transmission Mode */}
                    <div className="p-3.5 rounded-2xl bg-white border border-rose-200/80 space-y-1">
                      <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                        {t.transmissionMode}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                        {result.transmission_mode || "Wind-borne fungal conidia and splashing moisture"}
                      </p>
                    </div>

                    {/* Quarantine Buffer Radius */}
                    <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center space-x-3">
                      <Compass className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold text-rose-950 uppercase tracking-wider block">
                          {t.quarantineRadius}
                        </span>
                        <p className="text-xs text-rose-900 font-bold mt-0.5">
                          {result.quarantine_radius || "Maintain minimum 5-meter isolation zone from healthy beds"}
                        </p>
                      </div>
                    </div>

                    {/* Vulnerable Crops Chips */}
                    {result.vulnerable_crops && result.vulnerable_crops.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                          {t.vulnerableCrops}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {result.vulnerable_crops.map((crop, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 rounded-lg bg-rose-100/80 text-rose-900 text-xs font-semibold border border-rose-200"
                            >
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card 3: Soil Chemistry & Nutrient Deficiencies */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 border border-emerald-200/90 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                        <HeartPulse className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold font-space">
                        Substrate Health
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                        {t.soilHealthTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Foliar chlorosis markers & soil pH conditioning
                      </p>
                    </div>

                    {/* Soil Nutrient Deficits */}
                    <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-xs space-y-1.5">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                        {t.soilDeficiency}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                        {result.soil_deficiency || "Slight Nitrogen / Potassium deficit indicated by lower leaf chlorosis"}
                      </p>
                    </div>

                    {/* pH & Conditioning */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                          {t.soilPh}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-950 font-bold text-xs font-mono">
                          pH Target
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                        {result.soil_ph_recommendation || "Maintain pH between 6.0 – 6.8 with seasoned farmyard manure."}
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Tree Phenology & Pollinator Safety */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30 border border-teal-200/90 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
                        <Bug className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold font-space">
                        Eco-Pollinators
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                        {t.phenologyTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Crop stage, honeybee toxicity & rainfast window
                      </p>
                    </div>

                    {/* Growth Stage */}
                    <div className="p-3.5 rounded-2xl bg-white border border-teal-200/80 space-y-1">
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                        {t.growthStage}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-bold">
                        {result.growth_stage || "Active Vegetative & Blossom Budding Stage"}
                      </p>
                    </div>

                    {/* Pollinator & Bee Safety Guideline */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                      <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        {t.pollinatorSafety}
                      </span>
                      <p className="text-xs text-amber-950 font-medium leading-relaxed">
                        {result.pollinator_safety || "Spray strictly at dusk/sunset when honeybees and pollinators return to hives."}
                      </p>
                    </div>

                    {/* Spray Timing Window */}
                    <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-teal-700 flex-shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold text-teal-950 uppercase tracking-wider block">
                          {t.sprayTiming}
                        </span>
                        <p className="text-xs text-teal-900 font-bold mt-0.5">
                          {result.spray_timing_window || "5:30 PM – 7:30 PM (Requires 3 hours dry time before rain)"}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Dedicated Canopy Cooling & Heat Stress Protocol Card */}
                {result.cooling_tips && result.cooling_tips.length > 0 && (
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/80 via-white to-teal-50/80 border border-blue-200/80 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                          <ThermometerSnowflake className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-heading font-extrabold text-slate-900 text-base">
                            {t.coolingTitle}
                          </h3>
                          <p className="text-xs text-slate-500">
                            Practical root buffering, transpiration mitigation & canopy shading
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold font-space">
                        Thermal Relief
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                      {result.cooling_tips.map((tip, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                            {tip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 3: Agronomic Care & Environment */}
            {activeTab === 'care' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Water */}
                <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">
                    {t.watering}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.water}
                  </p>
                </div>

                {/* Sunlight */}
                <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Sun className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">
                    {t.sunlight}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.sunlight}
                  </p>
                </div>

                {/* Fertilizer */}
                <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">
                    {t.fertilizer}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.fertilizer}
                  </p>
                </div>

              </div>
            )}

            {/* TAB 4: Interactive Botanist AI Chat */}
            {activeTab === 'chat' && (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Ask any follow-up questions regarding this <strong>{result.plant_name}</strong> diagnosis. Our agricultural AI is loaded with this plant's specific symptoms, yield risk, and cooling care plan.
                  </p>
                </div>

                {/* Chat History Container */}
                <div className="min-h-[220px] max-h-[380px] overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  {chatMessages.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 space-y-2">
                      <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="text-sm">No messages yet. Ask below!</p>
                      <div className="flex flex-wrap justify-center gap-2 pt-2">
                        <button
                          onClick={() => {
                            setInputQuestion("How do I protect this plant from extreme heat waves?");
                          }}
                          className="px-3 py-1.5 rounded-full bg-white border text-xs text-slate-600 hover:border-emerald-500 hover:text-emerald-700 cursor-pointer"
                        >
                          How to protect from extreme heat?
                        </button>
                        <button
                          onClick={() => {
                            setInputQuestion("What is the pre-harvest waiting time after spraying?");
                          }}
                          className="px-3 py-1.5 rounded-full bg-white border text-xs text-slate-600 hover:border-emerald-500 hover:text-emerald-700 cursor-pointer"
                        >
                          Pre-harvest waiting interval?
                        </button>
                        <button
                          onClick={() => {
                            setInputQuestion("Should I mulch the soil to keep roots cool?");
                          }}
                          className="px-3 py-1.5 rounded-full bg-white border text-xs text-slate-600 hover:border-emerald-500 hover:text-emerald-700 cursor-pointer"
                        >
                          Should I mulch the root zone?
                        </button>
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-emerald-600 text-white font-medium rounded-br-none'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))
                  )}

                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-500 flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        <span>Botanist AI is typing advice...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    value={inputQuestion}
                    onChange={(e) => setInputQuestion(e.target.value)}
                    placeholder={t.askPlaceholder}
                    className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-slate-800"
                  />
                  <button
                    type="submit"
                    disabled={isChatLoading || !inputQuestion.trim()}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-700/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Footer of the Dossier */}
          <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
            <span>PlantX Artificial Intelligence Botanical Dossier</span>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Validated by Real-Time Multi-Vision Pathology & Agronomic Intelligence</span>
            </div>
          </div>

        </div>

      </div>

      {/* DEDICATED MOBILE DIAGNOSTIC GRID CARD FOR PNG EXPORT */}
      {/* Off-screen rendered container so html-to-image can compute exact retina dimensions without stretching */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div 
          ref={mobileCardRef}
          className="w-[740px] bg-white text-slate-900 p-7 rounded-[2.5rem] border-4 border-emerald-600 shadow-2xl space-y-4 font-sans relative overflow-hidden"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* Card Top Brand & Rx Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-100">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-xs font-black tracking-wider uppercase text-emerald-800 block">
                  PlantX AI • Agricultural Diagnostic Prescription
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Certified Botanical Pathology Dossier
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 block font-bold">
                Rx ID: PX-{result.plant_name.slice(0, 3).toUpperCase()}-{result.confidence}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Specimen Hero Strip */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white p-4 rounded-2xl flex items-center space-x-4 shadow-sm">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-400/50 flex-shrink-0 bg-black">
              <img 
                src={imageSrc} 
                alt="Specimen" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${badgeStyle.pill}`}>
                  {result.health}
                </span>
                <span className="text-xs text-emerald-200 font-mono">
                  {result.confidence}% Match
                </span>
              </div>
              <h2 className="text-xl font-bold font-space truncate mt-1 text-white">
                {result.plant_name}
              </h2>
              <p className="text-xs italic text-emerald-200/80 truncate">
                {result.scientific_name}
              </p>
              <p className="text-xs font-bold text-amber-300 mt-0.5 truncate">
                {result.disease && result.disease !== 'None' ? `Pathogen: ${result.disease} (${result.severity})` : 'Specimen is in Optimal Health'}
              </p>
            </div>
          </div>

          {/* Canopy Photosynthetic Vigor Bar */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-emerald-950">
              <span>Canopy Photosynthetic Vigor</span>
              <span className="text-emerald-800">{vigor}% Active Green Foliage</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div 
                style={{ width: `${vigor}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
              />
            </div>
          </div>

          {/* THE STRUCTURED 2x3 MOBILE GRID */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Box 1: Observed Symptoms & Photo Evidence */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold text-slate-900 uppercase">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Observed Photo Symptoms</span>
              </div>
              <ul className="text-[11px] text-slate-700 space-y-1 leading-snug">
                {result.symptoms.slice(0, 2).map((s, i) => (
                  <li key={i} className="flex items-start space-x-1">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span className="line-clamp-2">{s}</span>
                  </li>
                ))}
                {result.visual_forensic_cues && (
                  <li className="flex items-start space-x-1 text-emerald-900 font-medium">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span className="line-clamp-2">{result.visual_forensic_cues[0]}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Box 2: Harvest & Yield Security */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold text-amber-950 uppercase">
                <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                <span>Yield Loss & Safe Harvest</span>
              </div>
              <p className="text-[11px] font-bold text-amber-900 leading-snug">
                Loss Risk: {result.yield_loss_risk || 'Standard yield safety'}
              </p>
              <p className="text-[10px] text-amber-800 leading-snug">
                PHI Window: {result.harvest_waiting_period || 'Standard wash before use'}
              </p>
            </div>

            {/* Box 3: Prescribed Curative Treatment */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold text-emerald-950 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Treatment Prescription</span>
              </div>
              <p className="text-[11px] text-emerald-950 leading-snug">
                <strong className="text-emerald-800 font-bold">Bio-Remedy:</strong> {result.organic_treatment[0] || 'Cold-pressed neem oil spray'}
              </p>
              {result.chemical_treatment && result.chemical_treatment[0] && (
                <p className="text-[10px] text-slate-600 leading-snug">
                  <strong>Agri Chemical:</strong> {result.chemical_treatment[0]}
                </p>
              )}
            </div>

            {/* Box 4: Canopy Cooling & Thermal Care */}
            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold text-blue-950 uppercase">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-600" />
                <span>Cooling & Heat Relief</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-snug">
                {result.cooling_tips?.[0] || 'Apply 3-inch straw mulch to keep root zone 5°C cooler.'}
              </p>
              <p className="text-[10px] text-blue-900 leading-snug font-medium">
                {result.cooling_tips?.[1] || 'Deploy 35-50% shade cloth during afternoon peak heat.'}
              </p>
            </div>

            {/* Box 5: Biosecurity & Buffer Quarantine */}
            <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold text-rose-950 uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>Contagion & Plot Buffer</span>
              </div>
              <p className="text-[11px] text-rose-900 leading-snug">
                Vector: {result.transmission_mode || 'Airborne moisture dispersal'}
              </p>
              <p className="text-[10px] text-rose-800 font-bold leading-snug">
                Buffer: {result.quarantine_radius || 'Maintain 5-meter isolation radius'}
              </p>
            </div>

            {/* Box 6: Soil Health & Pollinator Protection */}
            <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold text-teal-950 uppercase">
                <Bug className="w-3.5 h-3.5 text-teal-600" />
                <span>Soil & Bee Protection</span>
              </div>
              <p className="text-[11px] text-teal-950 leading-snug">
                Soil pH: {result.soil_ph_recommendation || 'Maintain pH 6.0 - 6.8'}
              </p>
              <p className="text-[10px] text-teal-900 leading-snug">
                Bee Safety: {result.pollinator_safety || 'Spray at dusk to protect bees'}
              </p>
            </div>

          </div>

          {/* Phased 3-Step Recovery Action Strip */}
          {result.treatment_timeline && (
            <div className="p-3 bg-emerald-50/90 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-950 tracking-wider block">
                Phased Recovery Action Plan
              </span>
              <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] text-slate-700 leading-tight">
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <span className="text-rose-700 font-extrabold block">DAY 1</span>
                  <span>{result.treatment_timeline.day_1}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <span className="text-amber-700 font-extrabold block">DAY 3–5</span>
                  <span>{result.treatment_timeline.day_3_5}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100">
                  <span className="text-emerald-700 font-extrabold block">DAY 7–14</span>
                  <span>{result.treatment_timeline.day_7_14}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Bar with Mini Verification QR Code */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-xs">
                <QRCodeSVG 
                  value={shareUrl || `${window.location.origin}/scan`}
                  size={46}
                  level="M"
                  includeMargin={true}
                  fgColor="#0F172A"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-700 block">
                  Scan to verify online dossier
                </span>
                <span className="text-[9px] text-slate-400 block font-mono">
                  Validated by PlantX Multi-Vision AI Engine
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
                AUTHENTICATED DOSSIER
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ULTRA-COMPACT RAPID-SCAN QR CODE MODAL */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-7 max-w-sm w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer"
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
              
              <div className="text-center mb-5">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider font-space">
                  Rapid Phone Scan
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-slate-900 mt-2">
                  Scan Plant Report
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Point any phone camera or Google Lens to instantly load this complete agricultural dossier.
                </p>
              </div>
              
              {/* High-Contrast Large-Module QR Code with White Quiet Zone Border */}
              <div className="bg-white p-4 rounded-2xl border-4 border-emerald-100 flex items-center justify-center mb-5 shadow-sm">
                <QRCodeSVG 
                  value={shareUrl} 
                  size={240}
                  level="M"
                  includeMargin={true}
                  fgColor="#0F172A"
                />
              </div>

              <div className="text-center space-y-2">
                <p className="text-[11px] text-slate-400 font-mono">
                  Prescription ID: PX-{result.plant_name.slice(0, 3).toUpperCase()}-{(result.confidence).toString()}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert("Share link copied to clipboard!");
                  }}
                  className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Copy Direct Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Result;
