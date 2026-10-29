export type SupportedLanguage = 'English' | 'Hindi' | 'Telugu' | 'Tamil' | 'Kannada' | 'Malayalam';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  langCode: string; // for SpeechSynthesis
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'English', label: 'English', nativeLabel: 'English', langCode: 'en-US' },
  { code: 'Hindi', label: 'Hindi', nativeLabel: 'हिंदी (Hindi)', langCode: 'hi-IN' },
  { code: 'Telugu', label: 'Telugu', nativeLabel: 'తెలుగు (Telugu)', langCode: 'te-IN' },
  { code: 'Tamil', label: 'Tamil', nativeLabel: 'தமிழ் (Tamil)', langCode: 'ta-IN' },
  { code: 'Kannada', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ (Kannada)', langCode: 'kn-IN' },
  { code: 'Malayalam', label: 'Malayalam', nativeLabel: 'മലയാളം (Malayalam)', langCode: 'ml-IN' },
];

export interface PageContent {
  nav: {
    solutions: string;
    technology: string;
    impact: string;
    aboutUs: string;
    resources: string;
    getInTouch: string;
    tagline: string;
  };
  hero: {
    badge: string;
    headingPart1: string;
    headingProtecting: string;
    headingTomorrow: string;
    subtitle: string;
    ctaExplore: string;
    ctaImpact: string;
    features: Array<{ title: string; body: string }>;
  };
  stats: {
    species: string;
    pathogens: string;
    speed: string;
    openAccess: string;
  };
  samples: {
    badge: string;
    heading: string;
    desc: string;
    condition: string;
    analyzeBtn: string;
  };
  workflow: {
    badge: string;
    heading: string;
    desc: string;
    steps: Array<{ title: string; desc: string; tag: string }>;
  };
  diseases: {
    badge: string;
    heading: string;
    desc: string;
    items: Array<{ title: string; desc: string; covered: string }>;
  };
  faq: {
    badge: string;
    heading: string;
    items: Array<{ q: string; a: string }>;
  };
  cta: {
    badge: string;
    heading: string;
    desc: string;
    btnCamera: string;
    btnSample: string;
  };
  speechSummary: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, PageContent> = {
  English: {
    nav: {
      solutions: "Solutions",
      technology: "Technology",
      impact: "Impact",
      aboutUs: "About Us",
      resources: "Resources",
      getInTouch: "Get in Touch",
      tagline: "Powering a Better Tomorrow",
    },
    hero: {
      badge: "AI Botanical Pathology • 98.4% Precision",
      headingPart1: "Powering today.",
      headingProtecting: "Protecting",
      headingTomorrow: "tomorrow.",
      subtitle: "We deliver innovative green energy and botanical AI solutions that drive agricultural progress, protect our planet's harvest, and empower farmers with instant organic leaf diagnostics.",
      ctaExplore: "Explore Solutions",
      ctaImpact: "Our Impact",
      features: [
        { title: "Clean Vision AI", body: "Reliable. Botanical. Responsible." },
        { title: "Sustainable Harvest", body: "Organic bio-remedies for crop health." },
        { title: "Global Farm Impact", body: "120+ crops protected worldwide." },
      ],
    },
    stats: {
      species: "Botanical Species",
      pathogens: "Crop Pathogens",
      speed: "AI Vision Speed",
      openAccess: "Free & Open Access",
    },
    samples: {
      badge: "Instant Demonstration",
      heading: "Try It Immediately with Pre-Loaded Leaves",
      desc: "Don't have a leaf photo on your device right now? Click any real sample below to see the full clinical pathology diagnosis.",
      condition: "Condition:",
      analyzeBtn: "Analyze This Sample",
    },
    workflow: {
      badge: "Diagnostic Pipeline",
      heading: "How PlantX Diagnoses Your Crops",
      desc: "A seamless pipeline from leaf capture to actionable botanical prescriptions in 3 clear steps.",
      steps: [
        {
          title: "Snap or Upload Leaf",
          desc: "Use your smartphone or desktop webcam to frame the affected leaf, or simply upload an existing high-resolution photo from your gallery.",
          tag: "Instant camera & file drop",
        },
        {
          title: "Deep Neural Vision AI",
          desc: "Our vision model cross-examines leaf chlorosis, necrotic spotting, pustules, and fungal hyphae patterns to identify the exact botanical pathogen.",
          tag: "Sub-2 second edge inference",
        },
        {
          title: "Actionable Cure Dossier",
          desc: "Receive comprehensive organic remedies, chemical dosages, recovery timelines, and QR code reports available in English, Hindi, and Telugu.",
          tag: "Multilingual & QR shareable",
        },
      ],
    },
    diseases: {
      badge: "Pathology Coverage",
      heading: "Common Plant Pathogens We Detect",
      desc: "From microscopic fungal spores to bacterial ooze and viral mosaic mutations.",
      items: [
        {
          title: "Fungal Blights & Rots",
          desc: "Early blight, Late blight, Anthracnose, and Fusarium wilt caused by airborne and soil-borne fungal spores.",
          covered: "Covered: Tomatoes, Potatoes, Mangoes, Apples",
        },
        {
          title: "Powdery & Downy Mildews",
          desc: "White powdery fungal patches and yellowish oily upper leaf lesions that stunt photosynthesis.",
          covered: "Covered: Cucurbits, Grapes, Roses, Peas",
        },
        {
          title: "Bacterial Cankers & Spots",
          desc: "Corky pustules, water-soaked haloes, and stem cankers transmitted through wind-blown rain and pruning tools.",
          covered: "Covered: Citrus (Lemon/Orange), Peppers, Stone fruit",
        },
        {
          title: "Viral Mosaics & Leaf Curl",
          desc: "Leaf puckering, yellow mosaic marbling, and stunted internodes transmitted via whiteflies and aphids.",
          covered: "Covered: Papaya, Chillies, Tobacco, Beans",
        },
        {
          title: "Nutrient Deficiencies",
          desc: "Interveinal chlorosis, magnesium deficiency, nitrogen yellowing, and blossom end rot calcium starvation.",
          covered: "Covered: All agricultural & ornamental flora",
        },
        {
          title: "Pest Damage & Infestations",
          desc: "Leafminer serpentine trails, spider mite stippling, thrips silvering, and scale insect residue.",
          covered: "Covered: Universal botanical leaves",
        },
      ],
    },
    faq: {
      badge: "Assistance",
      heading: "Frequently Asked Questions",
      items: [
        {
          q: "How accurate is PlantX AI in detecting leaf diseases?",
          a: "PlantX AI leverages multi-model computer vision trained on botanical pathology datasets across hundreds of fruit trees, vegetables, and ornamental flora. It achieves over 95% diagnostic precision when given a clear, well-lit photograph of the infected leaf surface.",
        },
        {
          q: "Does PlantX recommend safe organic treatments?",
          a: "Yes! Every diagnosis prioritizes eco-friendly, organic remedies (such as cold-pressed neem oil, bio-fungicides like Bacillus subtilis, and proper cultural pruning) before suggesting targeted agricultural chemicals.",
        },
        {
          q: "Can I use PlantX in my local language like Hindi or Telugu?",
          a: "Absolutely! The diagnostic report features an instant multilingual translator supporting English, Hindi, Telugu, Tamil, Kannada, and Malayalam, along with an interactive text-to-speech audio reader.",
        },
        {
          q: "Can I share reports with agricultural extension workers or farmers?",
          a: "Yes. PlantX generates high-density shareable QR codes that anyone can scan with their phone, plus a 1-click 'Save as Image' button for printing or messaging.",
        },
      ],
    },
    cta: {
      badge: "Start Right Now",
      heading: "Protect Your Harvest Today",
      desc: "Diagnose your first plant in under 10 seconds. Free forever, no registration needed.",
      btnCamera: "Launch Live Camera",
      btnSample: "Test with Tomato Sample",
    },
    speechSummary: "Welcome to PlantX AI. Powering today, protecting tomorrow. We deliver innovative green energy and botanical AI solutions that protect crops and empower farmers with instant organic leaf diagnostics. You can scan any plant leaf with your camera or upload a photo to receive instant organic remedy prescriptions.",
  },

  Hindi: {
    nav: {
      solutions: "समाधान",
      technology: "तकनीक",
      impact: "प्रभाव",
      aboutUs: "हमारे बारे में",
      resources: "संसाधन",
      getInTouch: "संपर्क करें",
      tagline: "बेहतर कल के लिए ऊर्जा",
    },
    hero: {
      badge: "एआई वनस्पति रोग निदान • 98.4% सटीकता",
      headingPart1: "आज को ऊर्जावान बनाना।",
      headingProtecting: "सुरक्षित करना",
      headingTomorrow: "आने वाले कल को।",
      subtitle: "हम अत्याधुनिक हरित ऊर्जा और वनस्पति एआई समाधान प्रदान करते हैं जो कृषि प्रगति को गति देते हैं, फसलों की रक्षा करते हैं और किसानों को तुरंत जैविक उपचार उपलब्ध कराते हैं।",
      ctaExplore: "समाधान देखें",
      ctaImpact: "हमारा प्रभाव",
      features: [
        { title: "स्वच्छ विज़न एआई", body: "विश्वसनीय। वानस्पतिक। जिम्मेदार।" },
        { title: "सतत फसल सुरक्षा", body: "फसल स्वास्थ्य हेतु जैविक उपचार।" },
        { title: "वैश्विक कृषि प्रभाव", body: "विश्वभर में 120+ फसलों की सुरक्षा।" },
      ],
    },
    stats: {
      species: "पादप प्रजातियां",
      pathogens: "फसल रोगजनक",
      speed: "एआई स्कैन गति",
      openAccess: "100% मुफ़्त एवं खुला",
    },
    samples: {
      badge: "त्वरित परीक्षण",
      heading: "नमूना पत्तियों के साथ तुरंत जांचें",
      desc: "क्या अभी आपके पास पत्ती की तस्वीर नहीं है? पूर्ण रोग निदान देखने के लिए नीचे दिए गए किसी भी नमूने पर क्लिक करें।",
      condition: "स्थिति:",
      analyzeBtn: "इस नमूने का विश्लेषण करें",
    },
    workflow: {
      badge: "निदान प्रक्रिया",
      heading: "PlantX आपकी फसलों का निदान कैसे करता है",
      desc: "पत्ती की तस्वीर लेने से लेकर जैविक उपचार प्राप्त करने तक केवल 3 आसान चरण।",
      steps: [
        {
          title: "पत्ती की तस्वीर लें या अपलोड करें",
          desc: "प्रभावित पत्ती को कैमरे से स्कैन करें या अपनी गैलरी से स्पष्ट फोटो अपलोड करें।",
          tag: "त्वरित कैमरा और फाइल अपलोड",
        },
        {
          title: "डीप न्यूरल विज़न एआई",
          desc: "हमारा विज़न मॉडल पत्ती के धब्बों, फफूंद और रोगों की पहचान सूक्ष्म स्तर पर करता है।",
          tag: "2 सेकंड से कम में निदान",
        },
        {
          title: "उपचार एवं दवा की पूरी रिपोर्ट",
          desc: "जैविक उपचार, दवा की खुराक और ठीक होने की समय-सीमा की पूरी रिपोर्ट अपनी भाषा में पाएं।",
          tag: "बहुभाषी और क्यूआर कोड शेयरिंग",
        },
      ],
    },
    diseases: {
      badge: "रोग कवरेज",
      heading: "प्रमुख फसल रोग जिनकी हम पहचान करते हैं",
      desc: "फंगल संक्रमण से लेकर जीवाणु जनित धब्बे और वायरल मोज़ेक तक संपूर्ण जांच।",
      items: [
        {
          title: "फंगल झुलसा और सड़न",
          desc: "अगेती झुलसा, पछेती झुलसा, एन्थ्रेक्नोज और उकठा रोग जो कवक बीजाणुओं से फैलते हैं।",
          covered: "शामिल: टमाटर, आलू, आम, सेब",
        },
        {
          title: "चूर्णिल एवं मृदुरोमिल फफूंदी",
          desc: "पत्तियों पर सफेद चूर्ण जैसे धब्बे जो प्रकाश संश्लेषण को रोककर पौधे को कमजोर करते हैं।",
          covered: "शामिल: खीरा, अंगूर, गुलाब, मटर",
        },
        {
          title: "जीवाणु कैंकर और धब्बे",
          desc: "पत्तियों और तने पर पानी जैसे धब्बे जो बारिश और संक्रमित औजारों से फैलते हैं।",
          covered: "शामिल: नींबू, मिर्च, संतरा",
        },
        {
          title: "वायरल मोज़ेक और पत्ती मरोड़",
          desc: "पत्तियों का मुड़ना और पीला पड़ना जो सफेद मक्खी और कीटों द्वारा फैलता है।",
          covered: "शामिल: पपीता, मिर्च, तंबाकू, बीन्स",
        },
        {
          title: "पोषक तत्वों की कमी",
          desc: "नाइट्रोजन, मैग्नीशियम और कैल्शियम की कमी से पत्तियों का पीला पड़ना।",
          covered: "शामिल: सभी कृषि और बागवानी फसलें",
        },
        {
          title: "कीट प्रकोप और क्षति",
          desc: "लीफ माइनर, स्पाइडर माइट और रस चूसक कीटों के संक्रमण की पहचान।",
          covered: "शामिल: सार्वभौमिक वनस्पति पत्तियां",
        },
      ],
    },
    faq: {
      badge: "सहायता",
      heading: "अक्सर पूछे जाने वाले प्रश्न",
      items: [
        {
          q: "पौधों के रोगों का पता लगाने में PlantX AI कितना सटीक है?",
          a: "PlantX AI सैकड़ों फसलों और फलों के डेटा पर प्रशिक्षित है। स्पष्ट फोटो देने पर यह 95% से अधिक सटीकता से रोग की पहचान करता है।",
        },
        {
          q: "क्या PlantX सुरक्षित जैविक उपचार सुझाता है?",
          a: "हाँ! रासायनिक दवाओं से पहले हम नीम तेल और बायो-फंगीसाइड जैसे सुरक्षित जैविक उपचार को प्राथमिकता देते हैं।",
        },
        {
          q: "क्या मैं इसे अपनी स्थानीय भाषा में उपयोग कर सकता हूँ?",
          a: "हाँ, यह हिंदी, तेलुगु, तमिल, कन्नड़, मलयालम और अंग्रेजी भाषाओं और ऑडियो वाचक का पूरा समर्थन करता है।",
        },
        {
          q: "क्या मैं अपनी रिपोर्ट किसानों या कृषि विशेषज्ञों से साझा कर सकता हूँ?",
          a: "हाँ, आप 1-क्लिक में क्यूआर कोड या इमेज डाउनलोड करके किसी के भी साथ रिपोर्ट साझा कर सकते हैं।",
        },
      ],
    },
    cta: {
      badge: "अभी शुरू करें",
      heading: "अपनी फसल को आज ही सुरक्षित करें",
      desc: "10 सेकंड से कम समय में अपने पहले पौधे का परीक्षण करें। बिल्कुल मुफ्त, पंजीकरण की आवश्यकता नहीं।",
      btnCamera: "लाइव कैमरा शुरू करें",
      btnSample: "टमाटर के नमूने से जांचें",
    },
    speechSummary: "प्लांट एक्स एआई में आपका स्वागत है। आज को ऊर्जावान बनाकर, आने वाले कल की फसलों की रक्षा करना हमारा संकल्प है। हम अत्याधुनिक हरित तकनीक और वानस्पतिक एआई प्रदान करते हैं जो फसल रोगों की तुरंत पहचान कर सुरक्षित जैविक उपचार उपलब्ध कराता है। आप अपने कैमरे से पत्ती को स्कैन करके तुरंत रिपोर्ट प्राप्त कर सकते हैं।",
  },

  Telugu: {
    nav: {
      solutions: "పరిష్కారాలు",
      technology: "సాంకేతికత",
      impact: "ప్రభావం",
      aboutUs: "మా గురించి",
      resources: "వనరులు",
      getInTouch: "సంప్రదించండి",
      tagline: "మెరుగైన రేపటి కోసం శక్తి",
    },
    hero: {
      badge: "AI వృక్ష రోగ నిర్ధారణ • 98.4% ఖచ్చితత్వం",
      headingPart1: "నేటిని శక్తివంతం చేస్తూ.",
      headingProtecting: "రక్షిస్తూ",
      headingTomorrow: "రేపటి భవిష్యత్తును.",
      subtitle: "మేము వ్యవసాయ పురోగతిని వేగవంతం చేసే, పంటలను రక్షించే మరియు రైతులకు తక్షణ సేంద్రీయ రోగ నిర్ధారణను అందించే సరికొత్త ఆకుపచ్చ సాంకేతికతను అందిస్తున్నాము.",
      ctaExplore: "పరిష్కారాలు చూడండి",
      ctaImpact: "మా ప్రభావం",
      features: [
        { title: "స్వచ్ఛ విజన్ AI", body: "నమ్మకమైనది. వృక్షసంబంధమైనది. బాధ్యతాయుతమైనది." },
        { title: "సుస్థిర పంట దిగుబడి", body: "పంట సంరక్షణ కోసం సేంద్రీయ పరిష్కారాలు." },
        { title: "ప్రపంచ వ్యవసాయ ప్రభావం", body: "ప్రపంచవ్యాప్తంగా 120+ పంటల సంరక్షణ." },
      ],
    },
    stats: {
      species: "మొక్కల జాతులు",
      pathogens: "పంట తెగుళ్లు",
      speed: "AI స్కానింగ్ వేగం",
      openAccess: "100% ఉచితం",
    },
    samples: {
      badge: "తక్షణ ప్రదర్శన",
      heading: "నమూనా ఆకులతో ఇప్పుడే పరీక్షించండి",
      desc: "మీ దగ్గర ఆకు ఫోటో లేదా? పూర్తి వ్యాధి నిర్ధారణను చూడటానికి క్రింది నమూనాను ఎంచుకోండి.",
      condition: "పరిస్థితి:",
      analyzeBtn: "ఈ నమూనాను విశ్లేషించండి",
    },
    workflow: {
      badge: "నిర్ధారణ విధానం",
      heading: "PlantX పంట తెగుళ్లను ఎలా గుర్తిస్తుంది",
      desc: "ఆకు ఫోటో తీయడం నుండి చికిత్స పొందడం వరకు కేవలం 3 దశల ప్రక్రియ.",
      steps: [
        {
          title: "ఆకును స్కాన్ చేయండి లేదా అప్‌లోడ్ చేయండి",
          desc: "మీ ఫోన్ కెమెరాతో తెగులు సోకిన ఆకును స్కాన్ చేయండి లేదా ఫోటోను అప్‌లోడ్ చేయండి.",
          tag: "తక్షణ కెమెరా & ఫోటో అప్‌లోడ్",
        },
        {
          title: "డీప్ న్యూరల్ విజన్ AI",
          desc: "ఆకుల మచ్చలు, ఫంగస్ తీరును విశ్లేషించి ఖచ్చితమైన తెగులును గుర్తిస్తుంది.",
          tag: "2 సెకన్లలో వేగవంతమైన గుర్తింపు",
        },
        {
          title: "ఆచరణాత్మక నివారణ నివేదిక",
          desc: "సేంద్రీయ మందులు, మోతాదులు మరియు సంరక్షణ పద్ధతుల వివరాలు మీ భాషలోనే లభిస్తాయి.",
          tag: "తెలుగు అనువాదం & QR కోడ్",
        },
      ],
    },
    diseases: {
      badge: "వ్యాధుల పరిధి",
      heading: "మేము గుర్తించే సాధారణ పంట తెగుళ్లు",
      desc: "శిలీంధ్రాలు, బ్యాక్టీరియా మరియు వైరస్ ద్వారా సంభవించే వ్యాధుల సమగ్ర గుర్తింపు.",
      items: [
        {
          title: "ఫంగల్ తెగుళ్లు & కుళ్లు",
          desc: "ముందస్తు తెగులు, లేట్ బ్లైట్, ఆంథ్రాక్నోస్ మరియు ఎండు తెగులు.",
          covered: "రక్షణ: టమోటా, బంగాళాదుంప, మామిడి, యాపిల్",
        },
        {
          title: "బూడిద తెగులు & డౌనీ మిల్డో",
          desc: "ఆకులపై తెల్లటి బూడిద మచ్చలు ఏర్పడి కిరణజన్య సంయోగక్రియను దెబ్బతీస్తాయి.",
          covered: "రక్షణ: దోస, ద్రాక్ష, గులాబీ, బఠానీ",
        },
        {
          title: "బ్యాక్టీరియా మచ్చలు & క్యాంకర్",
          desc: "వర్షపు నీరు మరియు కత్తిరింపు పనిముట్ల ద్వారా వ్యాపించే బ్యాక్టీరియా మచ్చలు.",
          covered: "రక్షణ: నిమ్మ, మిరప, నారింజ",
        },
        {
          title: "వైరల్ మొజాయిక్ & ఆకు ముడత",
          desc: "తెల్లదోమల ద్వారా వ్యాపించే ఆకు ముడత మరియు మొజాయిక్ వైరస్.",
          covered: "రక్షణ: బొప్పాయి, మిరప, పొగాకు, చిక్కుడు",
        },
        {
          title: "పోషకాల లోపాలు",
          desc: "నత్రజని, మెగ్నీషియం లోపం వల్ల ఆకులు పసుపు రంగులోకి మారడం.",
          covered: "రక్షణ: అన్ని పంటలు మరియు కూరగాయలు",
        },
        {
          title: "కీటకాల దాడి & నష్టం",
          desc: "లీఫ్ మైనర్, ఎర్ర నల్లి మరియు రసం పీల్చే పురుగుల నష్టం.",
          covered: "రక్షణ: సార్వత్రిక పంట ఆకులు",
        },
      ],
    },
    faq: {
      badge: "సహాయం",
      heading: "తరచుగా అడిగే ప్రశ్నలు",
      items: [
        {
          q: "ఆకు వ్యాధులను గుర్తించడంలో PlantX AI ఎంత ఖచ్చితమైనది?",
          a: "PlantX AI వందలాది పంటల డేటా ఆధారంగా శిక్షణ పొందింది. ఇది 95% పైగా ఖచ్చితత్వంతో రోగ నిర్ధారణ చేస్తుంది.",
        },
        {
          q: "PlantX సురక్షితమైన సేంద్రీయ నివారణలను సూచిస్తుందా?",
          a: "అవును! రసాయన మందుల కంటే ముందు వేపనూనె మరియు బయో-ఫంగిసైడ్స్ వంటి సేంద్రీయ పద్ధతులకు ప్రాధాన్యత ఇస్తుంది.",
        },
        {
          q: "నేను దీన్ని తెలుగులో ఉపయోగించవచ్చా?",
          a: "ఖచ్చితంగా! నివేదికను తెలుగులో చదవవచ్చు మరియు ఆడియో రూపంలో స్పష్టంగా వినవచ్చు.",
        },
        {
          q: "నేను ఈ నివేదికను ఇతరులతో పంచుకోవచ్చా?",
          a: "అవును. QR కోడ్ లేదా ఫోటో ద్వారా ఎవరితోనైనా సులభంగా షేర్ చేసుకోవచ్చు.",
        },
      ],
    },
    cta: {
      badge: "ఇప్పుడే ప్రారంభించండి",
      heading: "మీ పంటను ఈరోజే రక్షించుకోండి",
      desc: "10 సెకన్లలోపు మీ మొదటి మొక్కను ఉచితంగా పరీక్షించండి. రిజిస్ట్రేషన్ అవసరం లేదు.",
      btnCamera: "కెమెరాను ప్రారంభించండి",
      btnSample: "టమోటా నమూనాతో పరీక్షించండి",
    },
    speechSummary: "ప్లాంట్ ఎక్స్ ఏఐ కి స్వాగతం. నేటి వ్యవసాయాన్ని బలోపేతం చేస్తూ, రేపటి పంటను రక్షించడమే మా లక్ష్యం. మేము అత్యాధునిక హరిత సాంకేతికత మరియు ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ ద్వారా పంట తెగుళ్లను వెంటనే గుర్తించి, సేంద్రీయ నివారణలను అందిస్తాము. మీ ఫోన్ కెమెరాతో ఆకును స్కాన్ చేసి వెంటనే నివేదిక పొందండి.",
  },

  Tamil: {
    nav: {
      solutions: "தீர்வுகள்",
      technology: "தொழில்நுட்பம்",
      impact: "தாக்கம்",
      aboutUs: "எங்களை பற்றி",
      resources: "வளங்கள்",
      getInTouch: "தொடர்பு கொள்க",
      tagline: "சிறந்த நாளைய விடியலுக்கான ஆற்றல்",
    },
    hero: {
      badge: "AI தாவர நோய் கண்டறிதல் • 98.4% துல்லியம்",
      headingPart1: "இன்றைய ஆற்றல்.",
      headingProtecting: "பாதுகாப்போம்",
      headingTomorrow: "நாளைய உலகை.",
      subtitle: "விவசாய வளர்ச்சியை ஊக்குவிக்கும், பயிர்களை பாதுகாக்கும் மற்றும் விவசாயிகளுக்கு உடனடி இயற்கை சிகிச்சை முறைகளை வழங்கும் பசுமை தொழில்நுட்பத்தை வழங்குகிறோம்.",
      ctaExplore: "தீர்வுகளைக் காண்க",
      ctaImpact: "எங்கள் தாக்கம்",
      features: [
        { title: "சுத்தமான பார்வை AI", body: "நம்பகமானது. தாவரவியல் சார்ந்தது. பொறுப்பானது." },
        { title: "நிலையான அறுவடை", body: "பயிர் ஆரோக்கியத்திற்கான இயற்கை தீர்வுகள்." },
        { title: "உலகளாவிய விவசாய தாக்கம்", body: "உலகளவில் 120+ பயிர்கள் பாதுகாப்பு." },
      ],
    },
    stats: {
      species: "தாவர இனங்கள்",
      pathogens: "பயிர் நோய்க்கிருமிகள்",
      speed: "AI ஸ்கேன் வேகம்",
      openAccess: "100% இலவசம்",
    },
    samples: {
      badge: "உடனடி மாதிரி",
      heading: "மாதிரி இலைகள் மூலம் உடனடியாக சோதிக்கவும்",
      desc: "இப்போது உங்களிடம் இலையின் புகைப்படம் இல்லையா? முழுமையான நோய் கண்டறிதலைக் காண கீழே உள்ள மாதிரியை கிளிக் செய்யவும்.",
      condition: "நிலைமை:",
      analyzeBtn: "இம்மாதிரியை பகுப்பாய்வு செய்க",
    },
    workflow: {
      badge: "கண்டறியும் செயல்முறை",
      heading: "PlantX பயிர் நோய்களை எவ்வாறு கண்டறிகிறது",
      desc: "இலையை புகைப்படம் எடுப்பது முதல் இயற்கை சிகிச்சை பெறுவது வரை 3 எளிய படிகள்.",
      steps: [
        {
          title: "இலையை புகைப்படம் எடுக்கவும்",
          desc: "கேமரா மூலம் பாதிக்கப்பட்ட இலையை ஸ்கேன் செய்யவும் அல்லது படத்தைப் பதிவேற்றவும்.",
          tag: "உடனடி கேமரா மற்றும் பதிவேற்றம்",
        },
        {
          title: "ஆழ்ந்த நரம்பியல் பார்வை AI",
          desc: "இலையின் புள்ளிகள் மற்றும் பூஞ்சை அமைப்பை ஆராய்ந்து துல்லியமான நோயைக் கண்டறிகிறது.",
          tag: "2 வினாடிகளுக்குள் விரைவான முடிவு",
        },
        {
          title: "செயல்படக்கூடிய சிகிச்சை அறிக்கை",
          desc: "இயற்கை மருந்துகள், மருந்து அளவுகள் மற்றும் பாதுகாப்பு வழிகாட்டுதல்கள் தமிழில் கிடைக்கும்.",
          tag: "தமிழ் மொழிபெயர்ப்பு & QR பகிர்வு",
        },
      ],
    },
    diseases: {
      badge: "நோய்கள் கவரேஜ்",
      heading: "நாங்கள் கண்டறியும் பொதுவான பயிர் நோய்கள்",
      desc: "பூஞ்சை தொற்றுகள் முதல் பாக்டீரியா புள்ளிகள் மற்றும் வைரஸ் நோய்கள் வரை முழுமையான கவரேஜ்.",
      items: [
        {
          title: "பூஞ்சை கருகல் & அழுகல்",
          desc: "முன் கருகல், பின் கருகல், ஆந்த்ராக்னோஸ் மற்றும் வாடல் நோய்கள்.",
          covered: "பாதுகாக்கப்படும் பயிர்கள்: தக்காளி, உருளைக்கிழங்கு, மா, ஆப்பிள்",
        },
        {
          title: "சாம்பல் நோய் & கீழ்நோக்கு சாம்பல்",
          desc: "இலைகளில் வெள்ளை சாம்பல் படிந்து ஒளிச்சேர்க்கையைத் தடுக்கிறது.",
          covered: "பாதுகாக்கப்படும் பயிர்கள்: வெள்ளரி, திராட்சை, ரோஜா, பட்டாணி",
        },
        {
          title: "பாக்டீரியா புண்கள் & புள்ளிகள்",
          desc: "மழைநீர் மற்றும் வெட்டுக்கருவிகள் மூலம் பரவும் பாக்டீரியா தொற்றுகள்.",
          covered: "பாதுகாக்கப்படும் பயிர்கள்: எலுமிச்சை, மிளகாய், ஆரஞ்சு",
        },
        {
          title: "வைரஸ் மொசைக் & இலை சுருட்டை",
          desc: "வெள்ளை ஈக்களால் பரவும் இலை சுருட்டை மற்றும் மொசைக் வைரஸ்.",
          covered: "பாதுகாக்கப்படும் பயிர்கள்: பப்பாளி, மிளகாய், புகையிலை, பீன்ஸ்",
        },
        {
          title: "ஊட்டச்சத்து குறைபாடுகள்",
          desc: "நைட்ரஜன், மெக்னீசியம் குறைபாட்டால் இலைகள் மஞ்சள் நிறமாக மாறுதல்.",
          covered: "பாதுகாக்கப்படும் பயிர்கள்: அனைத்து காய்கறி மற்றும் பழப் பயிர்கள்",
        },
        {
          title: "பூச்சித் தாக்குதல் & சேதம்",
          desc: "இலை துளைப்பான், சிலந்திப் பூச்சிகள் மற்றும் சாறு உறிஞ்சும் பூச்சிகளின் சேதம்.",
          covered: "பாதுகாக்கப்படும் பயிர்கள்: அனைத்து தாவர இலைகள்",
        },
      ],
    },
    faq: {
      badge: "உதவி",
      heading: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      items: [
        {
          q: "தாவர நோய்களைக் கண்டறிவதில் PlantX AI எவ்வளவு துல்லியமானது?",
          a: "PlantX AI நூற்றுக்கணக்கான பயிர்களின் தரவுகளில் பயிற்றுவிக்கப்பட்டுள்ளது. இது 95% க்கும் அதிகமான துல்லியத்துடன் நோய்களைக் கண்டறிகிறது.",
        },
        {
          q: "PlantX பாதுகாப்பான இயற்கை சிகிச்சைகளை பரிந்துரைக்கிறதா?",
          a: "ஆம்! இரசாயன மருந்துகளுக்கு முன் வேப்பெண்ணெய் மற்றும் இயற்கை பூஞ்சைக்கொல்லிகளுக்கு முன்னுரிமை அளிக்கிறது.",
        },
        {
          q: "நான் இதை தமிழில் பயன்படுத்தலாமா?",
          a: "நிச்சயமாக! முழு அறிக்கையையும் தமிழில் படிக்கலாம் மற்றும் ஆடியோ வடிவில் தெளிவாகக் கேட்கலாம்.",
        },
        {
          q: "நான் இந்த அறிக்கையை மற்றவர்களுடன் பகிரலாமா?",
          a: "ஆம், QR குறியீடு அல்லது புகைப்படம் மூலம் எளிய முறையில் பகிரலாம்.",
        },
      ],
    },
    cta: {
      badge: "இப்போதே தொடங்குக",
      heading: "உங்கள் பயிரை இன்றே பாதுகாக்கவும்",
      desc: "10 வினாடிகளுக்குள் உங்கள் பயிரை இலவசமாக சோதிக்கவும். பதிவு செய்ய தேவையில்லை.",
      btnCamera: "கேமராவைத் தொடங்கவும்",
      btnSample: "தக்காளி மாதிரியுடன் சோதிக்கவும்",
    },
    speechSummary: "பிளான்ட் எக்ஸ் ஏஐ-க்கு உங்களை வரவேற்கிறோம். இன்றைய உழைப்பை வலிமையாக்கி, நாளைய அறுவடையை பாதுகாப்பதே எங்கள் நோக்கம். பயிர் நோய்களை உடனுக்குடன் கண்டறிந்து, இயற்கையான பூச்சி கட்டுப்பாடு மற்றும் உர மேலாண்மை முறைகளை எளிய தமிழில் வழங்குகிறோம். உங்கள் கைபேசி கேமரா மூலம் இலையை ஸ்கேன் செய்து உடனடி பலன் பெறுங்கள்.",
  },

  Kannada: {
    nav: {
      solutions: "ಪರಿಹಾರಗಳು",
      technology: "ತಂತ್ರಜ್ಞಾನ",
      impact: "ಪರಿಣಾಮ",
      aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ",
      resources: "ಸಂಪನ್ಮೂಲಗಳು",
      getInTouch: "ಸಂಪರ್ಕಿಸಿ",
      tagline: "ಉತ್ತಮ ನಾಳೆಗಾಗಿ ಶಕ್ತಿ",
    },
    hero: {
      badge: "AI ಸಸ್ಯ ರೋಗ ಪತ್ತೆ • 98.4% ನಿಖರತೆ",
      headingPart1: "ಇಂದಿನ ಶಕ್ತಿ.",
      headingProtecting: "ರಕ್ಷಿಸುವುದು",
      headingTomorrow: "ಮುಂದಿನ ನಾಳೆಯನ್ನು.",
      subtitle: "ಕೃಷಿ ಪ್ರಗತಿಯನ್ನು ಹೆಚ್ಚಿಸುವ, ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸುವ ಮತ್ತು ರೈತರಿಗೆ ತಕ್ಷಣದ ಸಾವಯವ ರೋಗ ನಿರ್ಣಯವನ್ನು ಒದಗಿಸುವ ಸುಧಾರಿತ ಹಸಿರು ತಂತ್ರಜ್ಞಾನವನ್ನು ನಾವು ನೀಡುತ್ತೇವೆ.",
      ctaExplore: "ಪರಿಹಾರಗಳನ್ನು ನೋಡಿ",
      ctaImpact: "ನಮ್ಮ ಪರಿಣಾಮ",
      features: [
        { title: "ಸ್ವಚ್ಛ ದೃಷ್ಟಿ AI", body: "ವಿಶ್ವಾಸಾರ್ಹ. ಸಸ್ಯಶಾಸ್ತ್ರೀಯ. ಜವಾಬ್ದಾರಿಯುತ." },
        { title: "ಸುಸ್ಥಿರ ಇಳುವರಿ", body: "ಬೆಳೆ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಸಾವಯವ ಪರಿಹಾರಗಳು." },
        { title: "ಜಾಗತಿಕ ಕೃಷಿ ಪ್ರಭಾವ", body: "ವಿಶ್ವದಾದ್ಯಂತ 120+ ಬೆಳೆಗಳ ಸಂರಕ್ಷಣೆ." },
      ],
    },
    stats: {
      species: "ಸಸ್ಯ ಪ್ರಭೇದಗಳು",
      pathogens: "ಬೆಳೆ ರೋಗಾಣುಗಳು",
      speed: "AI ಸ್ಕ್ಯಾನ್ ವೇಗ",
      openAccess: "100% ಉಚಿತ ಪ್ರವೇಶ",
    },
    samples: {
      badge: "ತಕ್ಷಣದ ಪರೀಕ್ಷೆ",
      heading: "ಮಾದರಿ ಎಲೆಗಳೊಂದಿಗೆ ಈಗಲೇ ಪರಿಶೀಲಿಸಿ",
      desc: "ಈಗ ನಿಮ್ಮ ಬಳಿ ಎಲೆಯ ಫೋಟೋ ಇಲ್ಲವೇ? ಪೂರ್ಣ ರೋಗ ನಿರ್ಣಯವನ್ನು ನೋಡಲು ಕೆಳಗಿನ ಯಾವುದೇ ಮಾದರಿಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
      condition: "ಸ್ಥಿತಿ:",
      analyzeBtn: "ಈ ಮಾದರಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    },
    workflow: {
      badge: "ನಿರ್ಣಯ ವಿಧಾನ",
      heading: "PlantX ಬೆಳೆ ರೋಗಗಳನ್ನು ಹೇಗೆ ಪತ್ತೆ ಮಾಡುತ್ತದೆ",
      desc: "ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯುವುದರಿಂದ ಸಾವಯವ ಔಷಧ ಪಡೆಯುವವರೆಗೆ ಕೇವಲ 3 ಹಂತಗಳು.",
      steps: [
        {
          title: "ಎಲೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
          desc: "ಕ್ಯಾಮೆರಾದೊಂದಿಗೆ ರೋಗಪೀಡಿತ ಎಲೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
          tag: "ತ್ವರಿತ ಕ್ಯಾಮೆರಾ & ಫೋಟೋ ಡ್ರಾಪ್",
        },
        {
          title: "ಡೀಪ್ ನ್ಯೂರಲ್ ವಿಷನ್ AI",
          desc: "ಎಲೆಯ ಕಲೆಗಳು ಮತ್ತು ಶಿಲೀಂಧ್ರ ಮಾದರಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ನಿಖರವಾದ ರೋಗವನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ.",
          tag: "2 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ತ್ವರಿತ ಫಲಿತಾಂಶ",
        },
        {
          title: "ಸಮಗ್ರ ಚಿಕಿತ್ಸಾ ವರದಿ",
          desc: "ಸಾವಯವ ಔಷಧಗಳು, ಪ್ರಮಾಣ ಮತ್ತು ಆರೈಕೆಯ ವಿವರಗಳು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲೇ ದೊರೆಯುತ್ತವೆ.",
          tag: "ಕನ್ನಡ ಅನುವಾದ & QR ಹಂಚಿಕೆ",
        },
      ],
    },
    diseases: {
      badge: "ರೋಗ ವ್ಯಾಪ್ತಿ",
      heading: "ನಾವು ಪತ್ತೆಹಚ್ಚುವ ಸಾಮಾನ್ಯ ಬೆಳೆ ರೋಗಗಳು",
      desc: "ಶಿಲೀಂಧ್ರ ಸೋಂಕುಗಳಿಂದ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಕಲೆಗಳು ಮತ್ತು ವೈರಲ್ ರೋಗಗಳ ಸಮಗ್ರ ಪತ್ತೆ.",
      items: [
        {
          title: "ಶಿಲೀಂಧ್ರ ಮುರುಟು & ಕೊಳೆತ",
          desc: "ಮುಂಚಿನ ಮುರುಟು, ತಡವಾದ ಮುರುಟು, ಆಂಥ್ರಾಕ್ನೋಸ್ ಮತ್ತು ಸೊರಗು ರೋಗ.",
          covered: "ರಕ್ಷಣೆ: ಟೊಮೆಟೊ, ಆಲೂಗಡ್ಡೆ, ಮಾವು, ಸೇಬು",
        },
        {
          title: "ಬೂದಿ ರೋಗ & ಡೌನಿ ಶಿಲೀಂಧ್ರ",
          desc: "ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬೂದಿ ಕಲೆಗಳು ಉಂಟಾಗಿ ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ತಡೆಯುತ್ತದೆ.",
          covered: "ರಕ್ಷಣೆ: ಸೌತೆಕಾಯಿ, ದ್ರಾಕ್ಷಿ, ಗುಲಾಬಿ, ಬಟಾಣಿ",
        },
        {
          title: "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಕಲೆಗಳು & ಕ್ಯಾಂಕರ್",
          desc: "ಮಳೆನೀರು ಮತ್ತು ಕತ್ತರಿಸುವ ಉಪಕರಣಗಳ ಮೂಲಕ ಹರಡುವ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೋಂಕು.",
          covered: "ರಕ್ಷಣೆ: ನಿಂಬೆ, ಮೆಣಸಿನಕಾಯಿ, ಕಿತ್ತಳೆ",
        },
        {
          title: "ವೈರಲ್ ಮೊಸಾಯಿಕ್ & ಎಲೆ ಸುರುಟು",
          desc: "ಬಿಳಿ ನೊಣಗಳಿಂದ ಹರಡುವ ಎಲೆ ಸುರುಟು ಮತ್ತು ಮೊಸಾಯಿಕ್ ವೈರಸ್.",
          covered: "ರಕ್ಷಣೆ: ಪರಂಗಿ, ಮೆಣಸಿನಕಾಯಿ, ತಂಬಾಕು, ಹುರುಳಿ",
        },
        {
          title: "ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ",
          desc: "ಸಾರಜನಕ ಮತ್ತು ಮೆಗ್ನೀಸಿಯಮ್ ಕೊರತೆಯಿಂದ ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು.",
          covered: "ರಕ್ಷಣೆ: ಎಲ್ಲಾ ಕೃಷಿ ಮತ್ತು ತೋಟಗಾರಿಕಾ ಬೆಳೆಗಳು",
        },
        {
          title: "ಕೀಟಗಳ ಬಾಧೆ & ಹಾನಿ",
          desc: "ಎಲೆ ಕೊರೆಯುವ ಹುಳು ಮತ್ತು ರಸ ಹೀರುವ ಕೀಟಗಳ ಹಾನಿಯ ಪತ್ತೆ.",
          covered: "ರಕ್ಷಣೆ: ಎಲ್ಲಾ ಸಸ್ಯಗಳ ಎಲೆಗಳು",
        },
      ],
    },
    faq: {
      badge: "ಸಹಾಯ",
      heading: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
      items: [
        {
          q: "ಸಸ್ಯ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುವಲ್ಲಿ PlantX AI ಎಷ್ಟು ನಿಖರವಾಗಿದೆ?",
          a: "PlantX AI ನೂರಾರು ಬೆಳೆಗಳ ಮಾಹಿತಿಯೊಂದಿಗೆ ತರಬೇತಿ ಪಡೆದಿದೆ. ಇದು 95% ಕ್ಕಿಂತ ಹೆಚ್ಚು ನಿಖರತೆಯೊಂದಿಗೆ ರೋಗವನ್ನು ಗುರುತಿಸುತ್ತದೆ.",
        },
        {
          q: "PlantX ಸುರಕ್ಷಿತ ಸಾವಯವ ಚಿಕಿತ್ಸೆಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆಯೇ?",
          a: "ಹೌದು! ರಾಸಾಯನಿಕಗಳ ಬದಲಿಗೆ ಬೇವಿನ ಎಣ್ಣೆ ಮತ್ತು ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕಗಳಂತಹ ಸುರಕ್ಷಿತ ವಿಧಾನಗಳಿಗೆ ಆದ್ಯತೆ ನೀಡುತ್ತದೆ.",
        },
        {
          q: "ನಾನು ಇದನ್ನು ಕನ್ನಡದಲ್ಲಿ ಬಳಸಬಹುದೇ?",
          a: "ಖಂಡಿತವಾಗಿ! ಸಂಪೂರ್ಣ ವರದಿಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಓದಬಹುದು ಮತ್ತು ಆಡಿಯೋ ಮೂಲಕ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಬಹುದು.",
        },
        {
          q: "ನಾನು ಈ ವರದಿಯನ್ನು ಇತರರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಬಹುದೇ?",
          a: "ಹೌದು, QR ಕೋಡ್ ಅಥವಾ ಚಿತ್ರದ ಮೂಲಕ ಸುಲಭವಾಗಿ ಹಂಚಿಕೊಳ್ಳಬಹುದು.",
        },
      ],
    },
    cta: {
      badge: "ಈಗಲೇ ಪ್ರಾರಂಭಿಸಿ",
      heading: "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಇಂದೇ ರಕ್ಷಿಸಿ",
      desc: "10 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ನಿಮ್ಮ ಸಸ್ಯವನ್ನು ಉಚಿತವಾಗಿ ಪರೀಕ್ಷಿಸಿ. ಯಾವುದೇ ನೋಂದಣಿ ಅಗತ್ಯವಿಲ್ಲ.",
      btnCamera: "ಕ್ಯಾಮೆರಾ ಪ್ರಾರಂಭಿಸಿ",
      btnSample: "ಟೊಮೆಟೊ ಮಾದರಿಯೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿ",
    },
    speechSummary: "ಪ್ಲಾಂಟ್ ಎಕ್ಸ್ ಎಐ ಗೆ ಸುಸ್ವಾಗತ. ಇಂದಿನ ಕೃಷಿಯನ್ನು ಸಶಕ್ತಗೊಳಿಸಿ ನಾಳೆಯ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸುವುದು ನಮ್ಮ ಗುರಿ. ನಾವು ಸುಧಾರಿತ ಹಸಿರು ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಎಐ ಮೂಲಕ ಬೆಳೆ ರೋಗಗಳನ್ನು ತಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಿ ಸಾವಯವ ಪರಿಹಾರಗಳನ್ನು ನೀಡುತ್ತೇವೆ. ನಿಮ್ಮ ಫೋನ್ ಕ್ಯಾಮೆರಾದಿಂದ ಎಲೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ತಕ್ಷಣ ವರದಿ ಪಡೆಯಿರಿ.",
  },

  Malayalam: {
    nav: {
      solutions: "പരിഹാരങ്ങൾ",
      technology: "സാങ്കേതികവിദ്യ",
      impact: "സ്വാധീനം",
      aboutUs: "ഞങ്ങളെക്കുറിച്ച്",
      resources: "വിഭവങ്ങൾ",
      getInTouch: "ബന്ധപ്പെടുക",
      tagline: "മെച്ചപ്പെട്ട നാളേക്കുള്ള ഊർജ്ജം",
    },
    hero: {
      badge: "AI സസ്യ രോഗ നിർണയം • 98.4% കൃത്യത",
      headingPart1: "ഇന്നത്തെ ഊർജ്ജം.",
      headingProtecting: "സംരക്ഷിക്കാം",
      headingTomorrow: "നാളെയുടെ വിളവുകൾ.",
      subtitle: "കാർഷിക പുരോഗതിയെ ത്വരിതപ്പെടുത്തുന്നതും വിളകളെ സംരക്ഷിക്കുന്നതും കർഷകർക്ക് തൽക്ഷണ ജൈവ പരിഹാരങ്ങൾ നൽകുന്നതുമായ ഹരിത സാങ്കേതികവിദ്യ ഞങ്ങൾ വാഗ്ദാനം ചെയ്യുന്നു.",
      ctaExplore: "പരിഹാരങ്ങൾ കാണുക",
      ctaImpact: "ഞങ്ങളുടെ സ്വാധീനം",
      features: [
        { title: "ക്ലീൻ വിഷൻ AI", body: "വിശ്വസനീയം. സസ്യശാസ്ത്രപരം. ഉത്തരവാദിത്തമുള്ളത്." },
        { title: "സുസ്ഥിര വിളവ്", body: "വിള സംരക്ഷണത്തിന് ജൈവ ഔഷധങ്ങൾ." },
        { title: "ആഗോള കാർഷിക സ്വാധീനം", body: "ലോകമെമ്പാടും 120+ വിളകളുടെ സംരക്ഷണം." },
      ],
    },
    stats: {
      species: "സസ്യ ഇനങ്ങൾ",
      pathogens: "വിള രോഗകാരികൾ",
      speed: "AI സ്കാൻ വേഗത",
      openAccess: "100% സൗജന്യ പ്രവേശനം",
    },
    samples: {
      badge: "തത്സമയ പ്രദർശനം",
      heading: "മാതൃകാ ഇലകൾ ഉപയോഗിച്ച് ഇപ്പോൾ തന്നെ പരിശോധിക്കൂ",
      desc: "ഇപ്പോൾ നിങ്ങളുടെ പക്കൽ ഇലയുടെ ഫോട്ടോ ഇല്ലേ? പൂർണ്ണമായ രോഗനിർണ്ണയം കാണാൻ താഴെയുള്ള ഏതെങ്കിലും മാതൃകയിൽ ക്ലിക്ക് ചെയ്യുക.",
      condition: "അവസ്ഥ:",
      analyzeBtn: "ഈ മാതൃക പരിശോധിക്കുക",
    },
    workflow: {
      badge: "രോഗനിർണയ പ്രക്രിയ",
      heading: "PlantX നിങ്ങളുടെ വിള രോഗങ്ങൾ എങ്ങനെ കണ്ടെത്തുന്നു",
      desc: "ഇലയുടെ ഫോട്ടോ എടുക്കുന്നത് മുതൽ ജൈവ മരുന്ന് വിവരങ്ങൾ ലഭിക്കുന്നത് വരെ 3 ലളിതമായ ഘട്ടങ്ങൾ.",
      steps: [
        {
          title: "ഇല സ്കാൻ ചെയ്യുക അല്ലെങ്കിൽ അപ്‌ലോഡ് ചെയ്യുക",
          desc: "ഫോൺ ക്യാമറ ഉപയോഗിച്ച് ഇല സ്കാൻ ചെയ്യുക അല്ലെങ്കിൽ വ്യക്തമായ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.",
          tag: "തൽക്ഷണ ക്യാമറയും ഫോട്ടോ ഡ്രോപ്പും",
        },
        {
          title: "ഡീപ് ന്യൂറൽ വിഷൻ AI",
          desc: "ഇലയിലെ പുള്ളികളും കുമിൾ ബാധകളും സൂക്ഷ്മമായി പരിശോധിച്ച് രോഗം കൃത്യമായി കണ്ടെത്തുന്നു.",
          tag: "2 സെക്കൻഡിൽ അതിവേഗ കണ്ടെത്തൽ",
        },
        {
          title: "പ്രവർത്തനക്ഷമമായ ചികിത്സാ റിപ്പോർട്ട്",
          desc: "ജൈവ മരുന്നുകൾ, അളവുകൾ, പരിചരണ നിർദ്ദേശങ്ങൾ മലയാളത്തിൽ തന്നെ ലഭ്യമാകുന്നു.",
          tag: "മലയാളം തർജ്ജമയും QR പങ്കിടലും",
        },
      ],
    },
    diseases: {
      badge: "രോഗ വ്യാപ്തി",
      heading: "ഞങ്ങൾ കണ്ടെത്തുന്ന സാധാരണ വിള രോഗങ്ങൾ",
      desc: "കുമിൾ രോഗങ്ങൾ മുതൽ ബാക്ടീരിയൽ പുള്ളികളും വൈറസ് രോഗങ്ങളും വരെയുള്ള സമഗ്ര പരിശോധന.",
      items: [
        {
          title: "കുമിൾ കരിഞ്ഞുപോകലും ചീയലും",
          desc: "ഏർലി ബ്ലൈറ്റ്, ലേറ്റ് ബ്ലൈറ്റ്, ആന്ത്രാക്നോസ്, വാട്ടരോഗം എന്നിവ.",
          covered: "സംരക്ഷണം: തക്കാളി, ഉരുളക്കിഴങ്ങ്, മാവ്, ആപ്പിൾ",
        },
        {
          title: "ചാരപ്പൂപ്പലും ഡൗണി മിൽഡ്യൂവും",
          desc: "ഇലകളിൽ വെളുത്ത പൊടി പോലെ പടരുന്ന കുമിൾ ബാധ പ്രകാശസംശ്ലേഷണത്തെ തടസ്സപ്പെടുത്തുന്നു.",
          covered: "സംരക്ഷണം: വെള്ളരി, മുന്തിരി, റോസ്, പയർ",
        },
        {
          title: "ബാക്ടീരിയൽ പുള്ളികളും വ്രണങ്ങളും",
          desc: "മഴവെള്ളത്തിലൂടെയും വെട്ടുപകരണങ്ങളിലൂടെയും പകരുന്ന ബാക്ടീരിയ രോഗങ്ങൾ.",
          covered: "സംരക്ഷണം: നാരകം, മുളക്, ഓറഞ്ച്",
        },
        {
          title: "വൈറൽ മൊസൈക്കും ഇലച്ചുരുളലും",
          desc: "വെള്ളീച്ചകളിലൂടെ പകരുന്ന ഇലച്ചുരുളലും മൊസൈക് വൈറസും.",
          covered: "സംരക്ഷണം: പപ്പായ, മുളക്, പുകയില, പയറുകൾ",
        },
        {
          title: "പോഷകങ്ങളുടെ കുറവ്",
          desc: "നൈട്രജൻ, മഗ്നീഷ്യം എന്നിവയുടെ കുറവ് മൂലം ഇലകൾ മഞ്ഞനിറമാകുന്നത്.",
          covered: "സംരക്ഷണം: എല്ലാ പച്ചക്കറി, പഴവർഗ്ഗ വിളകൾ",
        },
        {
          title: "കീടബാധയും നാശനഷ്ടങ്ങളും",
          desc: "ഇല തുരപ്പൻ പുഴുക്കളും നീരൂറ്റി കുടിക്കുന്ന കീടങ്ങളും ഉണ്ടാക്കുന്ന നാശനഷ്ടങ്ങൾ.",
          covered: "സംരക്ഷണം: സാർവ്വത്രിക സസ്യ ഇലകൾ",
        },
      ],
    },
    faq: {
      badge: "സഹായം",
      heading: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
      items: [
        {
          q: "സസ്യ രോഗങ്ങൾ കണ്ടെത്തുന്നതിൽ PlantX AI എത്രത്തോളം കൃത്യതയുള്ളതാണ്?",
          a: "PlantX AI നൂറുകണക്കിന് വിളകളുടെ വിവരങ്ങളിൽ പരിശീലനം നേടിയതാണ്. ഇത് 95%-ൽ കൂടുതൽ കൃത്യതയോടെ രോഗം നിർണ്ണയിക്കുന്നു.",
        },
        {
          q: "PlantX സുരക്ഷിതമായ ജൈവ ചികിത്സകൾ ശുപാർശ ചെയ്യുന്നുണ്ടോ?",
          a: "അതെ! രാസവളങ്ങൾക്ക് പകരം വേപ്പെണ്ണയും ജൈവ കുമിൾനാശിനികളും പോലുള്ള പ്രകൃതിദത്ത രീതികൾക്കാണ് ഞങ്ങൾ മുൻഗണന നൽകുന്നത്.",
        },
        {
          q: "എനിക്ക് ഇത് മലയാളത്തിൽ ഉപയോഗിക്കാൻ കഴിയുമോ?",
          a: "തീർച്ചയായും! മുഴുവൻ വിവരങ്ങളും മലയാളത്തിൽ വായിക്കാനും ഓഡിയോ ആയി വ്യക്തമായി കേൾക്കാനും സാധിക്കും.",
        },
        {
          q: "എനിക്ക് ഈ റിപ്പോർട്ട് മറ്റുള്ളവരുമായി പങ്കിടാൻ കഴിയുമോ?",
          a: "അതെ, QR കോഡ് വഴിയോ ഇമേജ് ഡൗൺലോഡ് ചെയ്തോ ആരുമായും പങ്കിടാം.",
        },
      ],
    },
    cta: {
      badge: "ഇപ്പോൾ തന്നെ തുടങ്ങൂ",
      heading: "നിങ്ങളുടെ വിളകളെ ഇന്നുതന്നെ സംരക്ഷിക്കൂ",
      desc: "10 സെക്കൻഡിനുള്ളിൽ നിങ്ങളുടെ ചെടി സൗജന്യമായി പരിശോധിക്കൂ. രജിസ്ട്രേഷൻ ആവശ്യമില്ല.",
      btnCamera: "ക്യാമറ തുറക്കുക",
      btnSample: "തക്കാളി മാതൃക പരിശോധിക്കുക",
    },
    speechSummary: "പ്ലാന്റ് എക്സ് എഐ-യിലേക്ക് സ്വാഗതം. ഇന്നത്തെ കൃഷിയെ ശാക്തീകരിച്ച് നാളത്തെ വിളവുകളെ സംരക്ഷിക്കുകയാണ് ഞങ്ങളുടെ ലക്ഷ്യം. അത്യാധുനിക ഹരിത സാങ്കേതികവിദ്യയിലൂടെ വിള രോഗങ്ങൾ തൽക്ഷണം കണ്ടെത്തുകയും ജൈവ പരിഹാരങ്ങൾ നൽകുകയും ചെയ്യുന്നു. നിങ്ങളുടെ ഫോൺ ക്യാമറ ഉപയോഗിച്ച് ഇല സ്കാൻ ചെയ്ത് ഉടൻ തന്നെ റിപ്പോർട്ട് നേടൂ.",
  },
};

