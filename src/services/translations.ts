export type Language = 'en' | 'ta' | 'hi';

export interface TranslationSchema {
  title: string;
  selectLanguage: string;
  selectRole: string;
  adminPanel: string;
  userPanel: string;
  aiDetection: string;
  attendance: string;
  modules: string;
  settings: string;
  dashboard: string;
  trainees: string;
  farmTask: string;
  cropMonitoring: string;
  attendanceProduction: string;
  inventory: string;
  reports: string;
  collapse: string;
  logout: string;
  uploadBox: string;
  preview: string;
  results: string;
  cropType: string;
  cropHealth: string;
  suggestedAction: string;
  healthGood: string;
  healthWarning: string;
  actionNone: string;
  actionPesticide: string;
  attendanceRecords: string;
  attendanceRate: string;
  quizTitle: string;
  question: string;
  score: string;
  finish: string;
  next: string;
  totalTrainees: string;
  activeTasks: string;
  productionYield: string;
  recentActivity: string;
  growthStage: string;
  healthCondition: string;
  seeds: string;
  fertilizers: string;
  tools: string;
  quantity: string;
  status: string;
  date: string;
  name: string;
  type: string;
  productionTrends: string;
  taskCompletion: string;
  attendanceAnalytics: string;
  dummySettings: string;
  placeholderResults: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    title: "Farm Operations & Training",
    selectLanguage: "Select Your Language",
    selectRole: "Select Your Role",
    adminPanel: "Admin Panel",
    userPanel: "User Panel",
    aiDetection: "AI Detection",
    attendance: "Attendance",
    modules: "Modules",
    settings: "Settings",
    dashboard: "Dashboard",
    trainees: "Trainees",
    farmTask: "Farm Task",
    cropMonitoring: "Crop Monitoring",
    attendanceProduction: "Attendance Production",
    inventory: "Inventory",
    reports: "Reports",
    collapse: "Collapse",
    logout: "Logout",
    uploadBox: "Click or drag to upload crop image",
    preview: "Image Preview",
    results: "AI Detection Results",
    cropType: "Crop Type",
    cropHealth: "Crop Health Status",
    suggestedAction: "Suggested Action",
    healthGood: "Healthy",
    healthWarning: "Action Needed (Pests Detected)",
    actionNone: "Continue monitoring",
    actionPesticide: "Apply organic pesticide",
    attendanceRecords: "Attendance Records",
    attendanceRate: "Attendance Percentage",
    quizTitle: "Vocational Knowledge Quiz",
    question: "Question",
    score: "Your Score",
    finish: "Finish Quiz",
    next: "Next",
    totalTrainees: "Total Trainees",
    activeTasks: "Active Farm Tasks",
    productionYield: "Production Yield",
    recentActivity: "Recent Activity",
    growthStage: "Growth Stage",
    healthCondition: "Health Condition",
    seeds: "Seeds",
    fertilizers: "Fertilizers",
    tools: "Tools",
    quantity: "Quantity",
    status: "Status",
    date: "Date",
    name: "Name",
    type: "Type",
    productionTrends: "Production Trends",
    taskCompletion: "Task Completion Statistics",
    attendanceAnalytics: "Attendance Analytics",
    dummySettings: "Configure your profile and system preferences here.",
    placeholderResults: "Results will appear once an image is uploaded and processed."
  },
  ta: {
    title: "பண்ணை செயல்பாடுகள் மற்றும் பயிற்சி",
    selectLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    selectRole: "உங்கள் பங்கினைத் தேர்ந்தெடுக்கவும்",
    adminPanel: "நிர்வாகக் குழு",
    userPanel: "பயனர் குழு",
    aiDetection: "AI கண்டறிதல்",
    attendance: "வருகை",
    modules: "பாடங்கள்",
    settings: "அமைப்புகள்",
    dashboard: "டாஷ்போர்டு",
    trainees: "பயிற்சி பெறுபவர்கள்",
    farmTask: "பண்ணை பணி",
    cropMonitoring: "பயிர் கண்காணிப்பு",
    attendanceProduction: "வருகை உற்பத்தி",
    inventory: "சரக்கு இருப்பு",
    reports: "அறிக்கைகள்",
    collapse: "சுருக்கு",
    logout: "வெளியேறு",
    uploadBox: "பயிர் படத்தைப் பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுக்கவும்",
    preview: "படத்தின் முன்னோட்டம்",
    results: "AI கண்டறிதல் முடிவுகள்",
    cropType: "பயிர் வகை",
    cropHealth: "பயிர் ஆரோக்கிய நிலை",
    suggestedAction: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    healthGood: "ஆரோக்கியமானது",
    healthWarning: "நடவடிக்கை தேவை (பூச்சிகள் கண்டறியப்பட்டன)",
    actionNone: "கண்காணிப்பைத் தொடரவும்",
    actionPesticide: "இயற்கை பூச்சிக்கொல்லியைப் பயன்படுத்தவும்",
    attendanceRecords: "வருகை பதிவுகள்",
    attendanceRate: "வருகை சதவீதம்",
    quizTitle: "தொழிற்கல்வி அறிவு வினாடி வினா",
    question: "கேள்வி",
    score: "உங்கள் மதிப்பெண்",
    finish: "வினாடி வினாவை முடிக்கவும்",
    next: "அடுத்து",
    totalTrainees: "மொத்த பயிற்சியாளர்கள்",
    activeTasks: "செயலில் உள்ள பண்ணை பணிகள்",
    productionYield: "உற்பத்தி மகசூல்",
    recentActivity: "சமீபத்திய செயல்பாடு",
    growthStage: "வளர்ச்சி நிலை",
    healthCondition: "ஆரோக்கிய நிலை",
    seeds: "விதைகள்",
    fertilizers: "உரங்கள்",
    tools: "கருவிகள்",
    quantity: "அளவு",
    status: "நிலை",
    date: "தேதி",
    name: "பெயர்",
    type: "வகை",
    productionTrends: "உற்பத்தி போக்குகள்",
    taskCompletion: "பணி நிறைவு புள்ளிவிவரங்கள்",
    attendanceAnalytics: "வருகை பகுப்பாய்வு",
    dummySettings: "உங்கள் சுயவிவரம் மற்றும் கணினி விருப்பங்களை இங்கே உள்ளமைக்கவும்.",
    placeholderResults: "படம் பதிவேற்றம் செய்யப்பட்டு செயலாக்கப்படும் போது முடிவுகள் தோன்றும்."
  },
  hi: {
    title: "कृषि संचालन और प्रशिक्षण",
    selectLanguage: "अपनी भाषा चुनें",
    selectRole: "अपनी भूमिका चुनें",
    adminPanel: "एडमिन पैनल",
    userPanel: "यूज़र पैनल",
    aiDetection: "AI डिटेक्शन",
    attendance: "उपस्थिति",
    modules: "मॉड्यूल",
    settings: "सेटिंग्स",
    dashboard: "डैशबोर्ड",
    trainees: "प्रशिक्षु",
    farmTask: "कृषि कार्य",
    cropMonitoring: "फसल निगरानी",
    attendanceProduction: "उपस्थिति उत्पादन",
    inventory: "इन्वेंट्री",
    reports: "रिपोर्ट्स",
    collapse: "संकुचित करें",
    logout: "लॉगआउट",
    uploadBox: "फसल की छवि अपलोड करने के लिए क्लिक करें या खींचें",
    preview: "छवि पूर्वावलोकन",
    results: "AI डिटेक्शन परिणाम",
    cropType: "फसल का प्रकार",
    cropHealth: "फसल स्वास्थ्य स्थिति",
    suggestedAction: "सुझाया गया कार्य",
    healthGood: "स्वस्थ",
    healthWarning: "कार्रवाई आवश्यक (कीड़े पाए गए)",
    actionNone: "निगरानी जारी रखें",
    actionPesticide: "जैविक कीटनाशक का प्रयोग करें",
    attendanceRecords: "उपस्थिति रिकॉर्ड",
    attendanceRate: "उपस्थिति प्रतिशत",
    quizTitle: "व्यावसायिक ज्ञान प्रश्नोत्तरी",
    question: "प्रश्न",
    score: "आपका स्कोर",
    finish: "प्रश्नोत्तरी समाप्त करें",
    next: "अगला",
    totalTrainees: "कुल प्रशिक्षु",
    activeTasks: "सक्रिय कृषि कार्य",
    productionYield: "उत्पादन उपज",
    recentActivity: "हाल की गतिविधि",
    growthStage: "विकास की अवस्था",
    healthCondition: "स्वास्थ्य स्थिति",
    seeds: "बीज",
    fertilizers: "उर्वरक",
    tools: "उपकरण",
    quantity: "मात्रा",
    status: "स्थिति",
    date: "तारीख",
    name: "नाम",
    type: "प्रकार",
    productionTrends: "उत्पादन रुझान",
    taskCompletion: "कार्य पूर्णता आँकड़े",
    attendanceAnalytics: "उपस्थिति विश्लेषण",
    dummySettings: "अपनी प्रोफ़ाइल और सिस्टम प्राथमिकताओं को यहाँ कॉन्फ़िगर करें।",
    placeholderResults: "छवि अपलोड होने और संसाधित होने के बाद परिणाम दिखाई देंगे।"
  }
};
