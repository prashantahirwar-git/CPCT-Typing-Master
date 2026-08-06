export interface CPCTPassage {
  id: string;
  title: string;
  language: 'english' | 'hindi';
  category: 'CPCT Official Level' | 'Government Office' | 'Beginner' | 'Numbers & Symbols' | 'General Knowledge' | 'Court & Judicial Orders';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  recommendedDurationMinutes: 1 | 3 | 5 | 10 | 15;
  wordCount: number;
  content: string;
}

export const CPCT_PASSAGES: CPCTPassage[] = [
  // ==========================================
  // ENGLISH PASSAGES (1, 3, 5, 10, 15 MINUTES)
  // ==========================================
  
  // 1 Minute English Sprints
  {
    id: 'eng-1m-1',
    title: '1-Min English Sprint - Home Row & Fundamentals',
    language: 'english',
    category: 'Beginner',
    difficulty: 'Easy',
    recommendedDurationMinutes: 1,
    wordCount: 42,
    content: `The quick brown fox jumps over the lazy dog. Daily typing practice improves finger rhythm and muscle memory. Rest your wrists comfortably near the keyboard edge and maintain posture. Steady keystrokes lead to accurate and swift administrative speed.`
  },
  {
    id: 'eng-1m-2',
    title: '1-Min English Sprint - MP Revenue Notification',
    language: 'english',
    category: 'Government Office',
    difficulty: 'Medium',
    recommendedDurationMinutes: 1,
    wordCount: 48,
    content: `All revenue officers across district branches must submit weekly digitized land record entries before Friday afternoon. Verify survey numbers, plot dimensions, and applicant identity documents carefully to ensure complete accuracy in public land registry databases.`
  },

  // 3 Minutes English Tests
  {
    id: 'eng-3m-1',
    title: '3-Min English Test - E-Governance in Madhya Pradesh',
    language: 'english',
    category: 'CPCT Official Level',
    difficulty: 'Medium',
    recommendedDurationMinutes: 3,
    wordCount: 135,
    content: `Madhya Pradesh has made significant strides in implementing state-wide e-governance systems to deliver public services directly to citizens. Online portals such as MP e-District and Jan Seva Kendra allow individuals to apply for income certificates, domicile proof, and land revenue extracts without visiting government headquarters.

Preparing for the CPCT examination equips candidates with speed and precision required for digital office management. Computer proficiency, accurate typing skills, and familiarity with internet communication form the core requirements for clerk, steno, and data entry operator roles in state government departments.`
  },
  {
    id: 'eng-3m-2',
    title: '3-Min English Test - Hardware & Network Fundamentals',
    language: 'english',
    category: 'CPCT Official Level',
    difficulty: 'Hard',
    recommendedDurationMinutes: 3,
    wordCount: 142,
    content: `A computer architecture consists of hardware components that process data under the supervision of system instructions. The central processing unit coordinates arithmetic calculations and logical operations while RAM provides high-speed volatile storage during active processing.

Secondary storage devices, including solid state drives and optical media, store persistent system files, application programs, and official documents. Local area networks enable secure file sharing and printer communication within municipal offices. Understanding IP addresses, gateway settings, and wireless protocols ensures seamless office automation and troubleshooting.`
  },

  // 5 Minutes English Tests
  {
    id: 'eng-5m-1',
    title: '5-Min English Test - Collectorate Office Administration',
    language: 'english',
    category: 'Government Office',
    difficulty: 'Medium',
    recommendedDurationMinutes: 5,
    wordCount: 228,
    content: `Administrative governance in district collectorate offices requires meticulous file tracking and timely response to citizen petitions. Modern government branches rely on computerized file movement software to log file creation dates, department transfers, and supervisor approval stamps.

When processing public inquiries under the Right to Information Act, clerical staff must retrieve archived digital records with absolute accuracy. Typing speed plays a vital role when entering detailed inspection reports, drafting official circulars, and updating official web portals.

Candidates aspiring for government positions must cultivate rhythmic typing habits. Maintaining a constant typing cadence reduces mental stress and keystroke errors during long shifts. Furthermore, mastering shift key combinations and numerical keypad shortcuts accelerates tabular data entry.`
  },
  {
    id: 'eng-5m-2',
    title: '5-Min English Test - Legal & High Court Registry Format',
    language: 'english',
    category: 'Court & Judicial Orders',
    difficulty: 'Hard',
    recommendedDurationMinutes: 5,
    wordCount: 245,
    content: `IN THE HIGH COURT OF MADHYA PRADESH, BENCH AT INDORE.
WRIT PETITION NO. 4082 OF 2026.
IN THE MATTER OF: PUBLIC INTEREST LITIGATION FOR RURAL ROAD DEVELOPMENT.

Notice is hereby issued to the respondents to file an affidavit in reply within four weeks from the date of receipt of this order. The learned Government Advocate accepts notice on behalf of State authorities and requests time to compile progress reports regarding road construction grants allocated under Prime Minister Rural Road Scheme.

Judicial typists and court reporters must exhibit exemplary precision when transcribing courtroom testimony, legal briefs, and bench notifications. A single typographical error in statutory references, case numbers, or party names can lead to procedural delays. Therefore, typing candidates must practice double-checking alphanumeric codes, capitalization rules, and punctuation standards.`
  },

  // 10 Minutes English Tests
  {
    id: 'eng-10m-1',
    title: '10-Min English Test - Comprehensive Digital MP Survey',
    language: 'english',
    category: 'CPCT Official Level',
    difficulty: 'Medium',
    recommendedDurationMinutes: 10,
    wordCount: 430,
    content: `The State of Madhya Pradesh has pioneered digital Transformation initiatives across civil administration, agriculture, and public health sectors. By establishing high-speed optical fiber connectivity across rural panchayats, the government has connected millions of rural residents to online portals.

Through integrated digital service centers, farmers can check crop procurement rates, request soil health testing, and apply for government subsidies directly from their village. This rapid technological integration has created a massive demand for skilled computer operators who can type accurately in both English and regional languages.

The Computer Proficiency Certification Test, popularly known as CPCT, was introduced by the Department of Information Technology to standardize recruitment criteria for data entry operators, stenographers, assistant grade-3 staff, and clerical personnel in state government departments.

The CPCT assessment measures three critical competencies: basic computer knowledge, English typing speed, and Hindi typing proficiency. In the English typing section, candidates are evaluated on net words per minute and overall accuracy over a dedicated duration.

To score high marks in English typing, candidates must focus on proper hand placement on the home row keys. Resting the fingers gently on A-S-D-F and J-K-L-Semicolon creates a reliable baseline for touch typing without looking down at the physical keyboard.

Furthermore, rhythm and relaxation are essential for sustaining typing speed over extended intervals. Fast typists avoid slamming keys forcefully; instead, they use light, springy finger taps. Regular practice on varied text passages helps candidates adapt to complex words, capital letters, and special punctuation symbols frequently used in official notifications.

As government departments shift towards paperless office environments, digital document management, spreadsheet calculations, and electronic correspondence have become daily routines. Candidates who demonstrate superior typing speed along with error-free key entry consistently perform better in competitive selection lists.`
  },

  // 15 Minutes English CPCT Full Exam Standard
  {
    id: 'eng-15m-1',
    title: '15-Min English Exam - Official MP CPCT Master Paper',
    language: 'english',
    category: 'CPCT Official Level',
    difficulty: 'Hard',
    recommendedDurationMinutes: 15,
    wordCount: 650,
    content: `Public sector administrative work demands speed, accuracy, and absolute precision when entering digital records into central server databases. In Madhya Pradesh, the CPCT exam serves as the official benchmark for assessing candidates seeking appointments in state secretariats, collectorates, municipal corporations, and district courts.

Paragraph 1: History and Evolution of Administrative Data Management
In earlier decades, government offices relied heavily on physical registers, manual paper filing, and typewriter machines. This traditional methodology required extensive physical archive space and made document retrieval slow and labor intensive. With the advent of personal computers and high-speed network connections, administrative governance underwent a profound revolution. Modern e-office platforms allow administrative files to be created, reviewed, approved, and archived electronically within minutes.

Paragraph 2: Role of Computer Proficiency in Public Governance
A proficient data entry operator or clerical secretary acts as the bridge between citizen requests and executive decisions. When a citizen submits an application for welfare assistance, birth registration, or business licensing, the computer operator enters applicant particulars into the database. High typing speed combined with zero typing mistakes ensures that public service delivery deadlines prescribed under the Guarantee of Public Services Act are met without unnecessary backlog.

Paragraph 3: Key Mechanics and Ergonomics of High-Speed Typing
Achieving a net speed exceeding fifty words per minute requires dedicated physical posture and refined finger coordination. Position your monitor directly at eye level to avoid neck strain during long testing sessions. Keep your spine straight, elbows bent at ninety-degree angles, and feet flat on the floor. When typing, allow your fingers to glide lightly across the mechanical switches. Looking repeatedly at the physical keys disrupts visual focus and drastically reduces typing speed. Trusting tactile muscle memory enables your mind to read upcoming words while your fingers automatically strike the correct keys.

Paragraph 4: Handling Punctuation, Numbers, and Complex Vocabulary
Official office memorandums often contain complex legal terminology, numerical reference codes, percentages, dates, and official designations. For example: Memo No. 894/IT-2026 dated 14th August allocated Rs. 12,50,000/- for computer laboratory upgrades across 45 district schools. Candidates who only practice basic lowercase letter passages often stumble when encountering numbers, hyphenated terms, and symbols. Therefore, balanced practice incorporating numbers and shift key combinations is critical for mastering the CPCT exam.

Paragraph 5: Exam Strategy and Performance Psychology
During the actual CPCT examination session, remaining calm under time pressure is key to success. Do not panic if you commit an initial typing error; simply correct it using backspace or continue with steady rhythm if backspace is restricted. Focus on maintaining nineties accuracy throughout the fifteen minute duration. Remember that accuracy directly influences net speed calculations, as uncorrected errors incur speed deductions. Consistent daily practice with simulated exam timers builds confidence, eliminates exam anxiety, and guarantees outstanding performance on test day.`
  },

  // =======================================
  // HINDI PASSAGES (1, 3, 5, 10, 15 MINUTES)
  // =======================================

  // 1 Minute Hindi Sprints
  {
    id: 'hin-1m-1',
    title: '1-मिनट हिंदी स्प्रिंट - होम रो अभ्यास एवं शुद्धता',
    language: 'hindi',
    category: 'Beginner',
    difficulty: 'Easy',
    recommendedDurationMinutes: 1,
    wordCount: 45,
    content: `मध्य प्रदेश सीपीसीटी परीक्षा में हिंदी टाइपिंग का विशेष महत्व है। सही उंगलियों का प्रयोग करके प्रतिदिन अभ्यास करने से गति और सटीकता में निरंतर वृद्धि होती है। कुंजीपटल पर सही स्थिति बनाए रखें और एकाग्रता के साथ टाइपिंग करें।`
  },
  {
    id: 'hin-1m-2',
    title: '1-मिनट हिंदी स्प्रिंट - शासकीय आदेश सूचना',
    language: 'hindi',
    category: 'Government Office',
    difficulty: 'Medium',
    recommendedDurationMinutes: 1,
    wordCount: 50,
    content: `समस्त कार्यालय प्रमुखों को निर्देशित किया जाता है कि ई-गवर्नेंस पोर्टल पर लंबित आवेदनों का त्वरित निस्तारण करें। डाटा प्रविष्टि में पूर्ण शुद्धता बनाए रखना अनिवार्य है ताकि आम नागरिकों को लोक सेवा गारंटी अधिनियम के तहत समयबद्ध सेवाएं मिल सकें।`
  },

  // 3 Minutes Hindi Tests
  {
    id: 'hin-3m-1',
    title: '3-मिनट हिंदी टेस्ट - मध्य प्रदेश डिजिटल ई-गवर्नेंस',
    language: 'hindi',
    category: 'CPCT Official Level',
    difficulty: 'Medium',
    recommendedDurationMinutes: 3,
    wordCount: 130,
    content: `मध्य प्रदेश राज्य में सूचना प्रौद्योगिकी और डिजिटल सेवाओं के विस्तार से प्रशासनिक पारदर्शिता में अभूतपूर्व वृद्धि हुई है। जन सेवा केंद्रों तथा एमपी ऑनलाइन पोर्टलों के माध्यम से नागरिक अब घर बैठे जाति प्रमाण पत्र, मूल निवासी प्रमाण पत्र और भू-अभिलेख की प्रतिलिपियां प्राप्त कर रहे हैं।

कंप्यूटर दक्षता प्रमाण पत्र परीक्षा यानी सीपीसीटी, राज्य में शासकीय नौकरियों की तैयारी कर रहे युवाओं के लिए एक महत्वपूर्ण सीढ़ी है। हिंदी टाइपिंग में न्यूनतम बीस शब्द प्रति मिनट की गति उत्तीर्ण होने के लिए आवश्यक है। नियमित अभ्यास, शुद्धता पर ध्यान और कीबोर्ड की उंगलियों की सही स्थिति से अभ्यर्थी सरलता से सफलता प्राप्त कर सकते हैं।`
  },
  {
    id: 'hin-3m-2',
    title: '3-मिनट हिंदी टेस्ट - कार्यालयीन कार्यप्रणाली एवं पत्राचार',
    language: 'hindi',
    category: 'Government Office',
    difficulty: 'Hard',
    recommendedDurationMinutes: 3,
    wordCount: 140,
    content: `शासकीय कार्यालयों में दैनिक पत्राचार, नस्ती संचालन और बैठकों के कार्यवृत्त तैयार करने के लिए दक्ष कंप्यूटर ऑपरेटरों की आवश्यकता होती है। ई-फाइल प्रणाली के लागू होने से कागजी फाइलों के स्थान पर डिजिटल फाइलों का चलन तेजी से बढ़ा है।

किसी भी सरकारी पत्र में स्पष्टता, शुद्ध भाषा और सही प्रारूप का होना अत्यंत आवश्यक है। त्रुटिरहित टाइपिंग से न केवल समय की बचत होती है बल्कि प्रशासनिक निर्णयों के क्रियान्वयन में भी गति आती है। परीक्षार्थियों को चाहिए कि वे हिंदी रेमिंगटन गेल अथवा इनस्क्रिप्ट लेआउट पर नियमित रूप से अभ्यास करें।`
  },

  // 5 Minutes Hindi Tests
  {
    id: 'hin-5m-1',
    title: '5-मिनट हिंदी टेस्ट - कलेक्टोरेट एवं राजस्व प्रशासन',
    language: 'hindi',
    category: 'Government Office',
    difficulty: 'Medium',
    recommendedDurationMinutes: 5,
    wordCount: 220,
    content: `जिला कलेक्टोरेट कार्यालय में प्रशासनिक व्यवस्था को सुचारू रूप से चलाने के लिए राजस्व, आपदा प्रबंधन, निर्वाचन एवं विकास शाखाओं में कंप्यूटर डाटा एंट्री ऑपरेटरों की महत्वपूर्ण भूमिका होती है।

प्रथम अनुच्छेद: राजस्व अभिलेखों का डिजिटलीकरण
राजस्व शाखा द्वारा भूमि अभिलेखों और खसरा-खतौनी की प्रविष्टियों को डिजिटल सर्वर पर अद्यतन किया जा रहा है। किसानों को उनकी भूमि संबंधी दस्तावेज तुरंत उपलब्ध कराने के लिए ऑपरेटरों की टाइपिंग गति और शुद्धता उच्च स्तर की होनी चाहिए। एक छोटी सी त्रुटि से भू-स्वामियों को अनावश्यक असुविधा का सामना करना पड़ सकता है।

द्वितीय अनुच्छेद: सीपीसीटी परीक्षा की तैयारी की रणनीति
सीपीसीटी की हिंदी टाइपिंग परीक्षा में सफलता पाने के लिए निरंतरता ही सबसे बड़ी कुंजी है। अभ्यास के दौरान केवल गति बढ़ाने के बजाय शुद्धता पर अधिक ध्यान देना चाहिए। जब आपकी शुद्धता पचानवे प्रतिशत से अधिक होगी, तब गति स्वतः ही बढ़ जाएगी। प्रत्येक दिन कम से कम तीस मिनट का समय समर्पित रूप से हिंदी टाइपिंग टेस्ट को दें।`
  },
  {
    id: 'hin-5m-2',
    title: '5-मिनट हिंदी टेस्ट - उच्च न्यायालय एवं न्यायिक आदेश',
    language: 'hindi',
    category: 'Court & Judicial Orders',
    difficulty: 'Hard',
    recommendedDurationMinutes: 5,
    wordCount: 235,
    content: `उच्च न्यायालय मध्य प्रदेश, पीठ इंदौर।
याचिका क्रमांक १२४५/२०२६।
विषय: लोकहित याचिका एवं पर्यावरण संरक्षण निर्देश।

माननीय न्यायालय द्वारा दिए गए आदेशानुसार समस्त संबंधित विभागों को निर्देशित किया जाता है कि वे चार सप्ताह की समय सीमा के भीतर अपना शपथ पत्र प्रस्तुत करें। न्यायालीन आदेशों एवं निर्णयों का प्रारूप तैयार करते समय विधिक शब्दावली और विराम चिन्हों का शुद्ध प्रयोग अनिवार्य है।

न्यायालयीन स्टेनोग्राफर एवं टाइपिंग ऑपरेटरों के लिए त्वरित निर्णय प्रलेखन अत्यंत महत्वपूर्ण जिम्मेदारी है। हिंदी टाइपिंग करते समय संयुक्ताक्षर, मात्राओं के प्रयोग और अंक प्रविष्टि पर विशेष ध्यान देना चाहिए। अभ्यासकर्ता को चाहिए कि वह कठिन विधिक शब्दों और संख्यात्मक विवरणों का बार-बार अभ्यास करे ताकि परीक्षा भवन में किसी भी प्रकार का संकोच न रहे।`
  },

  // 10 Minutes Hindi Tests
  {
    id: 'hin-10m-1',
    title: '10-मिनट हिंदी टेस्ट - मध्य प्रदेश ई-गवर्नेंस एवं विकास यात्रा',
    language: 'hindi',
    category: 'CPCT Official Level',
    difficulty: 'Medium',
    recommendedDurationMinutes: 10,
    wordCount: 410,
    content: `मध्य प्रदेश में ई-गवर्नेंस और सूचना प्रौद्योगिकी के क्षेत्र में अभूतपूर्व प्रगति हुई है। राज्य सरकार ने ग्रामीण और शहरी क्षेत्रों के बीच डिजिटल अंतर को समाप्त करने के लिए व्यापक स्तर पर अधोसंरचना का निर्माण किया है।

ग्राम पंचायतों तक हाई-स्पीड इंटरनेट कनेक्टिविटी पहुँचाने से अब दूरदराज के ग्रामीण भी सरकारी योजनाओं का लाभ अपने गाँव में ही प्राप्त कर रहे हैं। ई-कृषि पोर्टल के माध्यम से किसान भाई फसलों के न्यूनतम समर्थन मूल्य, मौसम का पूर्वानुमान और आधुनिक कृषि तकनीकों की जानकारी प्राप्त कर रहे हैं।

इस विशाल डिजिटल क्रांति को सफल बनाने में राज्य के कुशल कंप्यूटर ऑपरेटरों और डाटा एंट्री सहायकों का अमूल्य योगदान है। विभिन्न शासकीय विभागों जैसे स्वास्थ्य, शिक्षा, राजस्व, पुलिस एवं महिला बाल विकास में हजारों पदों पर योग्य कंप्यूटर सहायकों की नियुक्ति की जा रही है।

इन पदों पर भर्ती के लिए मध्य प्रदेश शासन द्वारा सीपीसीटी परीक्षा को अनिवार्य योग्यता घोषित किया गया है। सीपीसीटी परीक्षा का मुख्य उद्देश्य यह सुनिश्चित करना है कि शासकीय कार्यालयों में नियुक्त होने वाले कर्मचारी कंप्यूटर संचालन और टाइपिंग कार्य में पूर्णतः सक्षम हों।

हिंदी टाइपिंग खंड में सफल होने के लिए अभ्यर्थियों को कम से कम बीस शब्द प्रति मिनट की शुद्ध गति प्राप्त करनी होती है। उच्च ग्रेड जैसे ग्रेड-ए और ग्रेड-बी प्राप्त करने के लिए चालीस से पचास शब्द प्रति मिनट की गति आवश्यक मानी जाती है।

हिंदी टाइपिंग में रेमिंगटन गेल और इनस्क्रिप्ट कीबोर्ड लेआउट का प्रयोग किया जाता है। अभ्यर्थियों को सलाह दी जाती है कि वे किसी एक लेआउट का चयन करके उस पर निष्ठापूर्वक अभ्यास करें। कीबोर्ड पर उंगलियों का सही विन्यास बनाए रखना, बिना कीबोर्ड देखे टाइपिंग करने की आदत डालना और स्क्रीन पर ध्यान केंद्रित रखना सफलता के मुख्य सूत्र हैं।

टाइपिंग अभ्यास करते समय बैकस्पेस का प्रयोग कम से कम करने का प्रयास करें। अत्यधिक बैकस्पेस का प्रयोग करने से टाइपिंग का प्रवाह टूटता है और समय व्यर्थ होता है। प्रतिदिन नियमित रूप से विभिन्न विषयों के गद्यांशों का अभ्यास करने से आत्मविश्वास बढ़ता है।`
  },

  // 15 Minutes Hindi CPCT Full Exam Standard
  {
    id: 'hin-15m-1',
    title: '15-मिनट हिंदी परीक्षा - मध्य प्रदेश सीपीसीटी ऑफिशियल मास्टर पेपर',
    language: 'hindi',
    category: 'CPCT Official Level',
    difficulty: 'Hard',
    recommendedDurationMinutes: 15,
    wordCount: 620,
    content: `शासकीय सेवा में कंप्यूटर ऑपरेटर और लिपिकीय संवर्ग के पदों पर कार्य करने के लिए गति, शुद्धता और विषय ज्ञान का होना अत्यंत आवश्यक है। मध्य प्रदेश शासन के विज्ञान एवं प्रौद्योगिकी विभाग द्वारा आयोजित सीपीसीटी परीक्षा अभ्यर्थियों की वास्तविक टाइपिंग क्षमता का सटीक मूल्यांकन करती है।

अनुच्छेद १: शासकीय कार्यालयों में डिजिटल क्रांति
पारंपरिक दौर में सरकारी कार्यालयों में कागजी रजिस्टरों और टाइपराइटर मशीनों का व्यापक उपयोग होता था। इस व्यवस्था में फाइलों को खोजने और सुरक्षित रखने में काफी समय और श्रम लगता था। कंप्यूटर और इंटरनेट के आगमन से प्रशासनिक तंत्र में व्यापक बदलाव आया है। अब सभी विभागीय फाइलें, पत्र और शासकीय आदेश ई-ऑफिस सॉफ्टवेयर के माध्यम से डिजिटल रूप में संचालित किए जाते हैं। इससे कार्य की गति कई गुना बढ़ गई है।

अनुच्छेद २: सीपीसीटी परीक्षा की संरचना और मापदंड
सीपीसीटी परीक्षा तीन मुख्य भागों में विभाजित होती है। पहला भाग कंप्यूटर सामान्य ज्ञान और तार्किक क्षमता का होता है। दूसरा भाग अंग्रेजी टाइपिंग और तीसरा भाग हिंदी टाइपिंग का होता है। हिंदी टाइपिंग परीक्षा पंद्रह मिनट की होती है, जिसमें अभ्यर्थियों को एक विस्तृत हिंदी गद्यांश स्क्रीन पर देखकर टाइप करना होता है। उत्तीर्ण होने के लिए न्यूनतम बीस शुद्ध शब्द प्रति मिनट की गति अनिवार्य है।

अनुच्छेद ३: टाइपिंग का सही तरीका और शरीर की स्थिति
उच्च टाइपिंग गति प्राप्त करने के लिए सही शारीरिक स्थिति यानी पोस्चर का बहुत बड़ा योगदान होता है। कुर्सी पर सीधे बैठें, पीठ को सहारा दें और दोनों पैरों को जमीन पर समतल रखें। कीबोर्ड को अपनी कोहनी के समकोण पर रखें। टाइप करते समय कलाई को टेबल पर दबाकर न रखें, बल्कि हल्का उठाकर रखें। स्क्रीन से आँखों की दूरी लगभग दो फीट होनी चाहिए।

अनुच्छेद ४: संयुक्ताक्षर और मात्राओं का सही अभ्यास
हिंदी भाषा में वर्णमाला की संरचना अंग्रेजी से भिन्न होती है। हिंदी में स्वर, व्यंजन, मात्राएं और संयुक्ताक्षर होते हैं। उदाहरण के लिए: 'प्रशासनिक', 'डिजिटलीकरण', 'स्थानांतरण', 'कार्यालयीन' और 'अधिसूचना' जैसे शब्दों में सही मात्राओं और हलंत का प्रयोग करना होता है। यदि अभ्यर्थी इन कठिन शब्दों का बार-बार अभ्यास नहीं करते तो परीक्षा में उनकी गति धीमी हो जाती है।

अनुच्छेद ५: परीक्षा भवन की रणनीति एवं मानसिक एकाग्रता
परीक्षा भवन में शांत मन और पूर्ण एकाग्रता के साथ टाइपिंग आरंभ करें। आरंभ के दो मिनट में गति की अपेक्षा शुद्धता पर ध्यान दें ताकि एक अच्छा प्रवाह बन सके। यदि कोई शब्द गलत टाइप हो जाए तो तुरंत घबराएं नहीं। अपने ध्यान को आगामी शब्दों पर केंद्रित रखें। पंद्रह मिनट की पूरी अवधि में निरंतर लय बनाए रखें। प्रतिदिन समयबद्ध अभ्यास करने से सीपीसीटी परीक्षा में निश्चित रूप से उत्कृष्ट अंक प्राप्त होंगे।`
  }
];

// Helper to filter passages by language and optional duration
export function getPassagesByFilter(
  language: 'english' | 'hindi',
  durationMinutes?: number,
  category?: string
): CPCTPassage[] {
  let list = CPCT_PASSAGES.filter(p => p.language === language);
  if (category && category !== 'All') {
    list = list.filter(p => p.category === category);
  }
  if (durationMinutes) {
    // Return passages that match or are closely suitable for the duration
    return list.sort((a, b) => {
      const diffA = Math.abs(a.recommendedDurationMinutes - durationMinutes);
      const diffB = Math.abs(b.recommendedDurationMinutes - durationMinutes);
      return diffA - diffB;
    });
  }
  return list;
}

// Helper to ensure infinite looping or continuous text flow if typing extends beyond content
export function getExtendedPassageContent(passage: CPCTPassage, targetDurationMinutes: number): string {
  const baseContent = passage.content.trim();
  // Estimate words needed for target duration (assuming ~40 WPM average = 40 * duration words)
  const wordsNeeded = Math.max(100, targetDurationMinutes * 45);
  const currentWords = baseContent.split(/\s+/).length;

  if (currentWords >= wordsNeeded) {
    return baseContent;
  }

  // Repeat passage with paragraph separator so typing never hits a brick wall
  let extended = baseContent;
  while (extended.split(/\s+/).length < wordsNeeded + 50) {
    extended += '\n\n' + baseContent;
  }
  return extended;
}
