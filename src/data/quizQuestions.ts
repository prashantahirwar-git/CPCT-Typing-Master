export interface QuizQuestion {
  id: string;
  category: 'Computer Fundamentals' | 'MS Office (Word/Excel/PowerPoint)' | 'Networking & Internet' | 'Hardware & Security' | 'General Awareness & Reasoning';
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctOptionIndex: number; // 0, 1, 2, or 3
  explanationEn?: string;
  explanationHi?: string;
}

export const CPCT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'cpct-q1',
    category: 'Computer Fundamentals',
    questionEn: 'Cache and main memory will lose their contents when the power of a computer is off. This property is referred to as ______.',
    questionHi: 'कैश और मुख्य मेमोरी अपनी सामग्री (कंटेंट) खो देंगे जब बिजली बंद हो जाएगी, इस गुण को ___________ के रूप में संदर्भित किया जाता है।',
    optionsEn: ['dynamic', 'static', 'volatility', 'non-volatile'],
    optionsHi: ['डायनमिक (dynamic)', 'स्टैटिक (static)', 'वोलैटिलिटी (volatility)', 'नॉन-वोलेटाइल (non-volatile)'],
    correctOptionIndex: 2,
    explanationEn: 'RAM and Cache memory are volatile memory because they lose saved data as soon as power is turned off.',
    explanationHi: 'रैम और कैश मेमोरी वोलेटाइल (अस्थाई) होती हैं क्योंकि पावर बंद होते ही इनका डेटा नष्ट हो जाता है।'
  },
  {
    id: 'cpct-q2',
    category: 'Computer Fundamentals',
    questionEn: 'Which of the following is a set of instructions embedded on a piece of hardware at the time of manufacturing and tells the device how to operate?',
    questionHi: 'निम्नलिखित में से कौन सा हार्डवेयर के निर्माण के समय उस पर सन्निहित निर्देशों का एक सेट है और डिवाइस को संचालित करने का तरीका बताता है?',
    optionsEn: ['Application Software', 'Utility Software', 'Firmware', 'Freeware'],
    optionsHi: ['एप्लिकेशन सॉफ्टवेयर (Application Software)', 'यूटिलिटी सॉफ्टवेयर (Utility Software)', 'फर्मवेयर (Firmware)', 'फ्रीवेयर (Freeware)'],
    correctOptionIndex: 2,
    explanationEn: 'Firmware (like BIOS/UEFI) is permanent software programmed into read-only memory during hardware production.',
    explanationHi: 'फर्मवेयर (जैसे BIOS) हार्डवेयर में स्थाई रूप से चिप पर लिखा गया प्रोग्राम होता है जो बूट प्रक्रिया संचालित करता है।'
  },
  {
    id: 'cpct-q3',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'You CANNOT save an MS-Excel 2016 file in a/an _______ format.',
    questionHi: 'आप MS-Excel 2016 फाइल को _____ फ़ॉर्मेट में सेव नहीं कर सकते।',
    optionsEn: ['PDF', 'PSD', 'TXT', 'XML'],
    optionsHi: ['PDF', 'PSD', 'TXT', 'XML'],
    correctOptionIndex: 1,
    explanationEn: 'PSD is Adobe Photoshop Document format, which Excel cannot export natively.',
    explanationHi: 'PSD एडोब फोटोशॉप की फाइल का एक्सटेंशन है, जिसे एक्सेल से सेव नहीं किया जा सकता।'
  },
  {
    id: 'cpct-q4',
    category: 'Hardware & Security',
    questionEn: 'What does the term SCSI stand for?',
    questionHi: 'SCSI का पूर्ण रूप __________ है।',
    optionsEn: ['Small Computer Software Interface', 'Small Computer Storage Interface', 'Small Computer System Interface', 'Small Computer Standard Interface'],
    optionsHi: ['Small Computer Software Interface', 'Small Computer Storage Interface', 'Small Computer System Interface', 'Small Computer Standard Interface'],
    correctOptionIndex: 2,
    explanationEn: 'SCSI stands for Small Computer System Interface, used for connecting disk drives and peripheral devices.',
    explanationHi: 'SCSI का पूरा नाम Small Computer System Interface है।'
  },
  {
    id: 'cpct-q5',
    category: 'Hardware & Security',
    questionEn: 'In a computer, which device is functionally opposite to a keyboard?',
    questionHi: 'एक कंप्यूटर में, कौन-सा डिवाइस कार्यात्मक रूप से कीबोर्ड से विपरीत है?',
    optionsEn: ['Joystick', 'Track ball', 'Mouse', 'Printer'],
    optionsHi: ['जॉयस्टिक (Joystick)', 'ट्रेक बॉल (Track ball)', 'माउस (Mouse)', 'प्रिंटर (Printer)'],
    correctOptionIndex: 3,
    explanationEn: 'A keyboard is an input device while a printer is an output device.',
    explanationHi: 'कीबोर्ड एक इनपुट डिवाइस है जबकि प्रिंटर एक आउटपुट डिवाइस है जो इसके विपरीत कार्य करता है।'
  },
  {
    id: 'cpct-q6',
    category: 'Computer Fundamentals',
    questionEn: 'Which of the following is an example of open source software?',
    questionHi: 'निम्नलिखित में से कौन सा ओपन सोर्स सॉफ्टवेयर का एक उदाहरण है?',
    optionsEn: ['Netflix', 'MySQL', 'McAfee', 'Google Chrome'],
    optionsHi: ['नेटफ्लिक्स (Netflix)', 'MySQL', 'मैकएफी (McAfee)', 'गूगल क्रोम (Google Chrome)'],
    correctOptionIndex: 1,
    explanationEn: 'MySQL is an open-source relational database management system.',
    explanationHi: 'MySQL एक प्रसिद्ध ओपन-सोर्स डेटाबेस प्रबंधन सॉफ्टवेयर है।'
  },
  {
    id: 'cpct-q7',
    category: 'Computer Fundamentals',
    questionEn: 'Which keyboard shortcut key is used to rename a highlighted icon, file or folder in Windows 10?',
    questionHi: 'Windows 10 में हाइलाइट किए गए आइकन, फाइल या फोल्डर का नाम बदलने के लिए किस कीबोर्ड शॉर्टकट कुंजी का उपयोग किया जाता है?',
    optionsEn: ['F3', 'F5', 'F2', 'F4'],
    optionsHi: ['F3', 'F5', 'F2', 'F4'],
    correctOptionIndex: 2,
    explanationEn: 'F2 is the standard universal shortcut key for renaming selected files or folders in Windows.',
    explanationHi: 'Windows में फ़ाइल या फोल्डर को रीनेम करने के लिए F2 शॉर्टकट कुंजी का प्रयोग किया जाता है।'
  },
  {
    id: 'cpct-q8',
    category: 'Hardware & Security',
    questionEn: 'Cortana is an intelligent personal assistant developed by ____________.',
    questionHi: 'कॉर्टाना (Cortana) ____________ द्वारा विकसित एक बुद्धिमान व्यक्तिगत सहायक है।',
    optionsEn: ['Microsoft', 'Apple', 'HP', 'Oracle'],
    optionsHi: ['माइक्रोसॉफ्ट (Microsoft)', 'एप्पल (Apple)', 'एचपी (HP)', 'ओरेकल (Oracle)'],
    correctOptionIndex: 0,
    explanationEn: 'Cortana is the virtual assistant created by Microsoft for Windows.',
    explanationHi: 'कॉर्टाना माइक्रोसॉफ्ट द्वारा निर्मित वर्चुअल वॉइस असिस्टेंट है।'
  },
  {
    id: 'cpct-q9',
    category: 'Networking & Internet',
    questionEn: 'Which of the following ranges across countries and continents?',
    questionHi: 'निम्नलिखित में से किसकी रेंज देश और महाद्वीपों तक होती है?',
    optionsEn: ['LAN', 'MAN', 'WAN', 'WLAN'],
    optionsHi: ['LAN (लोकल एरिया नेटवर्क)', 'MAN (मेट्रोपॉलिटन एरिया नेटवर्क)', 'WAN (वाइड एरिया नेटवर्क)', 'WLAN'],
    correctOptionIndex: 2,
    explanationEn: 'WAN (Wide Area Network) spans broad geographical areas including countries and continents (e.g. The Internet).',
    explanationHi: 'WAN (Wide Area Network) का विस्तार पूरे देशों और महाद्वीपों तक होता है।'
  },
  {
    id: 'cpct-q10',
    category: 'Hardware & Security',
    questionEn: 'What is the full form of UPS?',
    questionHi: 'यूपीएस (UPS) का पूर्ण रूप क्या है?',
    optionsEn: ['Uninterruptible power supply', 'Unified power supply', 'Uninterruptible power sink', 'Universal power sink'],
    optionsHi: ['Uninterruptible power supply (अनइंटरप्टिबल पावर सप्लाई)', 'Unified power supply', 'Uninterruptible power sink', 'Universal power sink'],
    correctOptionIndex: 0,
    explanationEn: 'UPS provides battery backup power during main electrical power failures.',
    explanationHi: 'UPS का पूरा नाम Uninterruptible Power Supply है जो बिजली जाने पर बैकअप देता है।'
  },
  {
    id: 'cpct-q11',
    category: 'Networking & Internet',
    questionEn: 'With reference to computer networks, what is the full form of OSI?',
    questionHi: 'कंप्यूटर नेटवर्क के संदर्भ में, OSI का पूर्ण रूप क्या है?',
    optionsEn: ['Open Systems Interconnection', 'Open Source Interconnection', 'Open Systems Internet', 'Open Static Interconnection'],
    optionsHi: ['Open Systems Interconnection', 'Open Source Interconnection', 'Open Systems Internet', 'Open Static Interconnection'],
    correctOptionIndex: 0,
    explanationEn: 'OSI model stands for Open Systems Interconnection, consisting of 7 network layers.',
    explanationHi: 'OSI का पूरा नाम Open Systems Interconnection है जिसमें 7 लेयर्स होती हैं।'
  },
  {
    id: 'cpct-q12',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'Which of the following keyboard shortcuts is used to hide a row in MS-Excel 2019?',
    questionHi: 'MS-Excel 2019 में एक पंक्ति (row) को छिपाने के लिए किस कीबोर्ड शॉर्टकट का उपयोग किया जाता है?',
    optionsEn: ['Ctrl + 9', 'Ctrl + 0', 'Ctrl + 1', 'Ctrl + 2'],
    optionsHi: ['Ctrl + 9', 'Ctrl + 0', 'Ctrl + 1', 'Ctrl + 2'],
    correctOptionIndex: 0,
    explanationEn: 'Ctrl + 9 hides selected rows in Excel, while Ctrl + 0 hides selected columns.',
    explanationHi: 'एक्सेल में पंक्ति को हाइड करने के लिए Ctrl + 9 तथा कॉलम को हाइड करने के लिए Ctrl + 0 दबाया जाता है।'
  },
  {
    id: 'cpct-q13',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'Which function in MS-Excel 2019 should be used to find the average of a set of numbers?',
    questionHi: 'MS-Excel 2019 में संख्याओं के समूह का औसत ज्ञात करने के लिए किस फ़ंक्शन का उपयोग करना चाहिए?',
    optionsEn: ['Avg', 'Average', 'Mean', 'Mode'],
    optionsHi: ['Avg', 'Average', 'Mean', 'Mode'],
    correctOptionIndex: 1,
    explanationEn: 'In MS-Excel, the function name is =AVERAGE(range).',
    explanationHi: 'एक्सेल में औसत निकालने के लिए =AVERAGE() फ़ंक्शन का प्रयोग किया जाता है।'
  },
  {
    id: 'cpct-q14',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'Which keyboard shortcut is used to select an entire column in MS-Excel 2019?',
    questionHi: 'MS-Excel 2019 में संपूर्ण कॉलम का चयन करने के लिए किस कीबोर्ड शॉर्टकट कुंजी का उपयोग किया जाता है?',
    optionsEn: ['Ctrl + Spacebar', 'Alt + Spacebar', 'Shift + Spacebar', 'Spacebar'],
    optionsHi: ['Ctrl + Spacebar', 'Alt + Spacebar', 'Shift + Spacebar', 'Spacebar'],
    correctOptionIndex: 0,
    explanationEn: 'Ctrl + Spacebar selects the entire column, while Shift + Spacebar selects the entire row.',
    explanationHi: 'Ctrl + Spacebar से पूरा कॉलम तथा Shift + Spacebar से पूरी रो (पंक्ति) सेलेक्ट होती है।'
  },
  {
    id: 'cpct-q15',
    category: 'Networking & Internet',
    questionEn: 'What is CMYK with reference to graphics printing?',
    questionHi: 'ग्राफिक्स प्रिंटिंग के संदर्भ में, CMYK का पूर्ण रूप क्या है?',
    optionsEn: ['Cyan, Magenta, Yellow and Key (Black)', 'Chain Multipurpose Yellow and Kinetic', 'Color Mode Yellow and Key', 'Cyan, Magical Yellow and Key'],
    optionsHi: ['Cyan, Magenta, Yellow and Key (Black)', 'Chain Multipurpose Yellow and Kinetic', 'Color Mode Yellow and Key', 'Cyan, Magical Yellow and Key'],
    correctOptionIndex: 0,
    explanationEn: 'CMYK stands for Cyan, Magenta, Yellow, and Key (Black), used in color printing.',
    explanationHi: 'प्रिंटिंग तकनीक में CMYK का अर्थ Cyan, Magenta, Yellow, Key (Black) होता है।'
  },
  {
    id: 'cpct-q16',
    category: 'Computer Fundamentals',
    questionEn: 'What is a nibble in computer memory terminology?',
    questionHi: 'कंप्यूटर मेमोरी शब्दावली में निबल (nibble) क्या है?',
    optionsEn: ['It is a group of 4 bits', 'It is 1 bit', 'It is a group of 4 bytes', 'It is a group of 8 bits'],
    optionsHi: ['यह 4 बिट का समूह है', 'यह 1 बिट है', 'यह 4 बाइट का समूह है', 'यह 8 बिट का समूह है'],
    correctOptionIndex: 0,
    explanationEn: 'A nibble consists of 4 bits (half of a byte). 8 bits make 1 byte.',
    explanationHi: '1 निबल = 4 बिट। 8 बिट मिलकर 1 बाइट बनाते हैं।'
  },
  {
    id: 'cpct-q17',
    category: 'Hardware & Security',
    questionEn: 'Which of the following is NOT a passive threat as malware but can be harmful to privacy and data security?',
    questionHi: 'निम्नलिखित में से कौन-सा एक पैसिव (निष्क्रिय) थ्रेट के रूप में मैलवेयर नहीं माना जाता है, लेकिन आपकी प्राइवेसी और सुरक्षा के लिए हानिकारक हो सकता है?',
    optionsEn: ['Greyware', 'Virus', 'Worm', 'Trojan horse'],
    optionsHi: ['ग्रेवेयर (Greyware)', 'वायरस (Virus)', 'वर्म (Worm)', 'ट्रोजन हॉर्स (Trojan horse)'],
    correctOptionIndex: 0,
    explanationEn: 'Greyware refers to unwanted applications or programs (like adware/spyware) that are not strictly classified as viruses but annoy users.',
    explanationHi: 'ग्रेवेयर ऐसे अवांछित सॉफ्टवेयर होते हैं जो सीधे वायरस नहीं होते पर आपकी गोपनीयता के लिए कष्टप्रद होते हैं।'
  },
  {
    id: 'cpct-q18',
    category: 'Networking & Internet',
    questionEn: 'Which protocol is used for transferring mail between mail servers?',
    questionHi: 'कौन-सा प्रोटोकॉल, मेल सर्वरों के बीच मेल ट्रांसफर करने के लिए उपयोग किया जाता है?',
    optionsEn: ['HTTP', 'SMTP', 'FTP', 'TELNET'],
    optionsHi: ['HTTP', 'SMTP', 'FTP', 'TELNET'],
    correctOptionIndex: 1,
    explanationEn: 'SMTP (Simple Mail Transfer Protocol) is the standard protocol for sending emails.',
    explanationHi: 'ईमेल भेजने तथा ट्रांसफर करने के लिए SMTP (Simple Mail Transfer Protocol) का प्रयोग होता है।'
  },
  {
    id: 'cpct-q19',
    category: 'Computer Fundamentals',
    questionEn: 'How many bits are there in an IPv6 address?',
    questionHi: 'IPv6 एड्रेस में कितने बिट (bits) होते हैं?',
    optionsEn: ['16 bits', '32 bits', '64 bits', '128 bits'],
    optionsHi: ['16 बिट', '32 बिट', '64 बिट', '128 बिट'],
    correctOptionIndex: 3,
    explanationEn: 'IPv6 uses 128-bit IP addresses, whereas IPv4 uses 32-bit addresses.',
    explanationHi: 'IPv6 का एड्रेस 128 बिट का होता है, जबकि IPv4 32 बिट का होता है।'
  },
  {
    id: 'cpct-q20',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'In MS-Word 2019, what is it called when a large capital letter is created at the beginning of a paragraph?',
    questionHi: 'MS-Word 2019 में, जब पैराग्राफ की शुरुआत में एक बड़ा कैपिटल लेटर बनाते हैं, तो उसे क्या कहते हैं?',
    optionsEn: ['Drop cap', 'Header', 'Smart Art', 'Add-in'],
    optionsHi: ['ड्रॉप कैप (Drop cap)', 'हेडर (Header)', 'स्मार्ट आर्ट (Smart Art)', 'ऐड-इन (Add-in)'],
    correctOptionIndex: 0,
    explanationEn: 'Drop Cap enlarges the first letter of a paragraph to cover 2-3 lines.',
    explanationHi: 'ड्रॉप कैप विकल्प पैराग्राफ के प्रथम अक्षर को बड़ा (2-3 पंक्तियों में विस्तृत) कर देता है।'
  },
  {
    id: 'cpct-q21',
    category: 'General Awareness & Reasoning',
    questionEn: 'Door is related to Bang in the same way as Chain is related to ______.',
    questionHi: 'दरवाजे (Door) का \'बैंग (Bang)\' से वही संबंध है जो \'चेन (Chain)\' का ______ से संबंध है।',
    optionsEn: ['Thunder', 'Clinch', 'Tinkle', 'Clank'],
    optionsHi: ['थंडर (Thunder)', 'क्लिंच (Clinch)', 'टिंकल (Tinkle)', 'क्लैंक (Clank)'],
    correctOptionIndex: 3,
    explanationEn: 'A closing door makes a Bang sound; a moving/dropping chain makes a Clank sound.',
    explanationHi: 'दरवाजे की आवाज़ को Bang कहते हैं और जंजीर/चेन की खनखनाहट की आवाज़ को Clank कहते हैं।'
  },
  {
    id: 'cpct-q22',
    category: 'General Awareness & Reasoning',
    questionEn: 'Haldia oil refinery is located in which Indian State?',
    questionHi: 'हल्दिया रिफाइनरी भारत के किस राज्य में स्थित है?',
    optionsEn: ['West Bengal', 'Bihar', 'Andhra Pradesh', 'Odisha'],
    optionsHi: ['पश्चिम बंगाल', 'बिहार', 'आंध्र प्रदेश', 'ओडिशा'],
    correctOptionIndex: 0,
    explanationEn: 'Haldia Refinery is located in the Purba Medinipur district of West Bengal.',
    explanationHi: 'हल्दिया तेल शोधनागार पश्चिम बंगाल राज्य में स्थित है।'
  },
  {
    id: 'cpct-q23',
    category: 'General Awareness & Reasoning',
    questionEn: 'Pandit Shiv Kumar Sharma is a legendary exponent of which musical instrument?',
    questionHi: 'पंडित शिव कुमार शर्मा किस वाद्य यंत्र के प्रसिद्ध प्रतिपादक हैं?',
    optionsEn: ['Mandolin', 'Santoor', 'Sitar', 'Veena'],
    optionsHi: ['मैन्डोलिन', 'संतूर', 'सितार', 'वीणा'],
    correctOptionIndex: 1,
    explanationEn: 'Pandit Shivkumar Sharma was a world-renowned Indian classical Santoor player.',
    explanationHi: 'पंडित शिवकुमार शर्मा भारत के सुप्रसिद्ध शास्त्रीय संतूर वादक थे।'
  },
  {
    id: 'cpct-q24',
    category: 'Computer Fundamentals',
    questionEn: 'Which software component locates the Kernel, loads it into main memory, and starts operating system execution on power up?',
    questionHi: 'कौन-सा सॉफ्टवेयर घटक कर्नेल (Kernel) को लोकेट करके मुख्य मेमोरी में लोड करता है और पावर ऑन होने पर संचालन शुरू करता है?',
    optionsEn: ['Bootstrap loader', 'Dispatcher', 'Assembler', 'Linker'],
    optionsHi: ['बूटस्ट्रैप लोडर (Bootstrap loader)', 'डिस्पैचर (Dispatcher)', 'असेम्बलर (Assembler)', 'लिंकर (Linker)'],
    correctOptionIndex: 0,
    explanationEn: 'The Bootstrap Loader is stored in ROM/BIOS and loads the OS Kernel during booting.',
    explanationHi: 'बूटस्ट्रैप लोडर कंप्यूटर चालू होते ही ओएस कर्नेल को लोड करता है।'
  },
  {
    id: 'cpct-q25',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'In MS-Excel 2019, what is the default cell reference type when referencing cells in formulas?',
    questionHi: 'MS-Excel 2019 में, फ़ार्मुलों में सेल संदर्भित करते समय डिफ़ॉल्ट सेल रेफरेंस प्रकार क्या होता है?',
    optionsEn: ['Relative reference', 'Absolute reference', 'Reflexive reference', 'Mixed cell reference'],
    optionsHi: ['रिलेटिव रेफरेंस (Relative reference)', 'आब्सोल्यूट रेफरेंस (Absolute reference)', 'रिफ्लेक्सिव रेफरेंस', 'मिक्स्ड सेल रेफरेंस'],
    correctOptionIndex: 0,
    explanationEn: 'Relative cell reference (e.g. A1) is Excel\'s default. It adjusts automatically when copied to other cells.',
    explanationHi: 'एक्सेल में डिफ़ॉल्ट सेल रेफरेंस रिलेटिव (जैसे A1) होता है, जो कॉपी करने पर बदल जाता है।'
  },
  {
    id: 'cpct-q26',
    category: 'Hardware & Security',
    questionEn: '______________ is a programmable device that takes in input, performs arithmetic and logical operations, and produces output.',
    questionHi: '______________ एक प्रोग्राम करने योग्य डिवाइस है जो इनपुट लेता है, उस पर कुछ अंकगणितीय और तार्किक ऑपरेशन करता है और वांछित आउटपुट उत्पन्न करता है।',
    optionsEn: ['SMPS', 'UPS', 'Microprocessor', 'Bus'],
    optionsHi: ['एसएमपीएस (SMPS)', 'यूपीएस (UPS)', 'माइक्रोप्रोसेसर (Microprocessor)', 'बस (Bus)'],
    correctOptionIndex: 2,
    explanationEn: 'A microprocessor is an integrated circuit that contains the functions of a CPU, executing logic and arithmetic operations.',
    explanationHi: 'माइक्रोप्रोसेसर एक चिप होती है जो इनपुट लेकर एरिथमेटिक और लॉजिकल गणनाएं करके आउटपुट देती है।'
  },
  {
    id: 'cpct-q27',
    category: 'Computer Fundamentals',
    questionEn: 'Which of the following is a Python language editor?',
    questionHi: 'इनमें से कौन-सा पायथन (Python) भाषा संपादक है?',
    optionsEn: ['Tally', 'Coda', 'Jupyter', 'SnapTouch'],
    optionsHi: ['टैली (Tally)', 'कोडा (Coda)', 'जुपिटर (Jupyter)', 'स्नैपटच (SnapTouch)'],
    correctOptionIndex: 2,
    explanationEn: 'Jupyter Notebook is a popular web-based interactive development environment for Python.',
    explanationHi: 'जुपिटर (Jupyter Notebook) पायथन कोडिंग और डेटा साइंस के लिए एक प्रसिद्ध संपादक है।'
  },
  {
    id: 'cpct-q28',
    category: 'Hardware & Security',
    questionEn: 'Which of the following is utility software?',
    questionHi: 'निम्नलिखित में से कौनसा यूटिलिटी सॉफ्टवेयर है?',
    optionsEn: ['Avast Antivirus', 'BIOS', 'Android', 'MS-Word'],
    optionsHi: ['एवास्ट एंटीवायरस (Avast Antivirus)', 'BIOS', 'एंड्रॉइड (Android)', 'MS-Word'],
    correctOptionIndex: 0,
    explanationEn: 'Avast Antivirus is utility software used to maintain system security, while Android is OS and MS-Word is application software.',
    explanationHi: 'एंटीवायरस सॉफ़्टवेयर कंप्यूटर सुरक्षा रखरखाव के लिए यूटिलिटी सॉफ़्टवेयर श्रेणी में आता है।'
  },
  {
    id: 'cpct-q29',
    category: 'Hardware & Security',
    questionEn: 'Which of the following is TRUE with reference to DVD?',
    questionHi: 'DVD के संदर्भ में निम्नलिखित में से कौन सा सत्य है?',
    optionsEn: ['Full form of DVD is Digital Valid Disk', 'DVDs are not portable', 'DVD-R offers a write-once approach', 'DVD ROM is used for both reading and writing'],
    optionsHi: ['DVD का पूर्ण रूप डिजिटल वैलिड डिस्क है', 'DVD पोर्टेबल नहीं हैं', 'DVD-R एक बार लिखने (write-once) का तरीका प्रदान करता है', 'DVD ROM पढ़ने और लिखने दोनों के लिए उपयोग किया जाता है'],
    correctOptionIndex: 2,
    explanationEn: 'DVD-R (Recordable) allows data to be written once onto the disk, after which the data becomes permanent.',
    explanationHi: 'DVD-R (Recordable) डिस्क में केवल एक बार डेटा लिखा (राइट) जा सकता है।'
  },
  {
    id: 'cpct-q30',
    category: 'Hardware & Security',
    questionEn: 'Which plotter draws exact vector graphics on paper or other media using a rotating cylinder?',
    questionHi: 'निम्नलिखित में से कौन सा प्लॉटर कागज़ या अन्य मीडिया पर सटीक वेक्टर ग्राफिक्स बनाता है?',
    optionsEn: ['Cutting Plotter', 'Pinch Roller', 'Cycle Plotter', 'Drum Plotter'],
    optionsHi: ['कटिंग प्लॉटर (Cutting Plotter)', 'पिंच रोलर (Pinch Roller)', 'साइकिल प्लॉटर (Cycle Plotter)', 'ड्रम प्लॉटर (Drum Plotter)'],
    correctOptionIndex: 3,
    explanationEn: 'A Drum Plotter wraps paper around a drum with a drum rotation mechanism to draw high-precision vector graphics.',
    explanationHi: 'ड्रम प्लॉटर (Drum Plotter) पेपर को ड्रम पर लपेटकर सटीक वेक्टर आरेख खींचता है।'
  },
  {
    id: 'cpct-q31',
    category: 'Networking & Internet',
    questionEn: '___________ is an internet service consisting of thousands of newsgroups.',
    questionHi: '___________ एक इंटरनेट सेवा है जिसमें हजारों समाचार समूह (newsgroups) शामिल हैं।',
    optionsEn: ['USECASE', 'USENET', 'USESET', 'UCENET'],
    optionsHi: ['USECASE', 'USENET', 'USESET', 'UCENET'],
    correctOptionIndex: 1,
    explanationEn: 'USENET is a worldwide distributed discussion system where users post articles to newsgroups.',
    explanationHi: 'USENET एक इंटरनेट सेवा है जो विभिन्न न्यूज़ग्रुप और चर्चा मंचों का समूह प्रदान करती है।'
  },
  {
    id: 'cpct-q32',
    category: 'Hardware & Security',
    questionEn: 'Which device is commonly used to protect an internal network from unauthorized external access?',
    questionHi: 'अवांछित पहुंच (एक्सेस) से आंतरिक नेटवर्क की सुरक्षा के लिए आमतौर पर कौन-सा डिवाइस उपयोग किया जाता है?',
    optionsEn: ['Firewall', 'Router', 'Switch', 'Hub'],
    optionsHi: ['फ़ायरवॉल (Firewall)', 'राउटर (Router)', 'स्विच (Switch)', 'हब (Hub)'],
    correctOptionIndex: 0,
    explanationEn: 'A Firewall monitors and filters incoming and outgoing network traffic based on security rules.',
    explanationHi: 'फ़ायरवॉल (Firewall) नेटवर्क पर अनधिकृत एक्सेस और हैकिंग को रोकने के लिए सुरक्षा कवच प्रदान करता है।'
  },
  {
    id: 'cpct-q33',
    category: 'Hardware & Security',
    questionEn: 'AES symmetric encryption algorithm performs all its computations on ________ of data rather than in bits.',
    questionHi: 'एईएस (AES) सममित एन्क्रिप्शन एल्गोरिदम बिट्स के बजाय डेटा के ________ पर अपनी सभी गणना करता है।',
    optionsEn: ['bytes', 'numbers', 'cells', 'digits'],
    optionsHi: ['बाइट्स (bytes)', 'नंबर (numbers)', 'सेल्स (cells)', 'डिजिट्स (digits)'],
    correctOptionIndex: 0,
    explanationEn: 'Advanced Encryption Standard (AES) operates on 128-bit blocks organized as a 4x4 matrix of bytes.',
    explanationHi: 'AES एल्गोरिदम बिट्स के स्थान पर बाइट्स (Bytes) की मैट्रिक्स पर कार्य करता है।'
  },
  {
    id: 'cpct-q34',
    category: 'Networking & Internet',
    questionEn: 'When a router needs to send a packet to another computer/network, what address must it know?',
    questionHi: 'जब किसी राउटर को एक पैकेट को दूसरे कंप्यूटर/नेटवर्क में भेजने की आवश्यकता होती है, तो उसे क्या पता होना चाहिए?',
    optionsEn: ['Datagram', 'Path name', 'Transport medium', 'IP address'],
    optionsHi: ['डेटाग्राम (Datagram)', 'पाथ नेम (Path name)', 'परिवहन माध्यम', 'IP एड्रेस (IP address)'],
    correctOptionIndex: 3,
    explanationEn: 'Routers use IP addresses in the packet header to route data packets to destination networks.',
    explanationHi: 'राउटर डेटा पैकेट को सही गंतव्य तक पहुँचाने के लिए IP एड्रेस का उपयोग करता है।'
  },
  {
    id: 'cpct-q35',
    category: 'Hardware & Security',
    questionEn: 'How is computer monitor display size measured?',
    questionHi: 'कंप्यूटर मॉनिटर का आकार (माप) कैसे मापा जाता है?',
    optionsEn: ['From left top to left bottom', 'From right top to right bottom', 'From corner to corner diagonally', 'From left top to right top'],
    optionsHi: ['बाएं शीर्ष से बाएं तल तक', 'दायें शीर्ष से दायें तल तक', 'कोने से कोने तक (तिरछे रूप से)', 'बाएं शीर्ष से दाएं शीर्ष तक'],
    correctOptionIndex: 2,
    explanationEn: 'Screen display sizes (monitors, TVs, laptops) are always measured diagonally from corner to opposite corner.',
    explanationHi: 'स्क्रीन की साइज़ (इंच में) एक कोने से विपरीत विकर्ण (Diagonal) कोने की दूरी से नापी जाती है।'
  },
  {
    id: 'cpct-q36',
    category: 'Hardware & Security',
    questionEn: 'A/an ___________ is a weakness in an information system or security procedures that could be exploited by a threat source.',
    questionHi: '____________ एक सूचना प्रणाली या सुरक्षा प्रक्रियाओं में एक कमजोरी है जिसका खतरा स्रोत द्वारा शोषण किया जा सकता है।',
    optionsEn: ['threat', 'vulnerability', 'control', 'attack'],
    optionsHi: ['थ्रेट (threat)', 'वल्नरेबिलिटी (vulnerability)', 'कंट्रोल (control)', 'अटैक (attack)'],
    correctOptionIndex: 1,
    explanationEn: 'Vulnerability is a flaw or weakness in system security design, implementation, or operation.',
    explanationHi: 'वल्नरेबिलिटी (Vulnerability) सिस्टम की वह सुरक्षा खामी या कमजोरी होती है जिसका हैकर्स फायदा उठा सकते हैं।'
  },
  {
    id: 'cpct-q37',
    category: 'Computer Fundamentals',
    questionEn: 'Which file format extension is used for Java Server Pages?',
    questionHi: 'जावा सर्वर पेज (Java Server Page) के लिए निम्नलिखित में से किस फाइल फॉर्मेट (एक्सटेंशन) का उपयोग किया जाता है?',
    optionsEn: ['.js', '.java', '.jsp', '.jspl'],
    optionsHi: ['.js', '.java', '.jsp', '.jspl'],
    correctOptionIndex: 2,
    explanationEn: 'JavaServer Pages files have the .jsp extension.',
    explanationHi: 'JavaServer Pages वेब फाइलों का एक्सटेंशन .jsp होता है।'
  },
  {
    id: 'cpct-q38',
    category: 'Computer Fundamentals',
    questionEn: 'The file extension WPD is used for which type of files?',
    questionHi: 'फाइल फॉर्मेट WPD का उपयोग निम्नलिखित में से किस फाइल के लिए किया जाता है?',
    optionsEn: ['Image File', 'Compressed Archive File', 'Winamp Playlist', 'WordPerfect Document File'],
    optionsHi: ['इमेज फाइल', 'कम्प्रेस्ड आर्काइव फाइल', 'विनैम्प प्लेलिस्ट', 'वर्डपरफेक्ट डॉक्यूमेंट फाइल (WordPerfect Document File)'],
    correctOptionIndex: 3,
    explanationEn: 'WPD is the standard document file extension for Corel WordPerfect files.',
    explanationHi: 'WPD एक्सटेंशन वर्डपरफेक्ट (WordPerfect) डॉक्यूमेंट फाइल के लिए प्रयोग होता है।'
  },
  {
    id: 'cpct-q39',
    category: 'Computer Fundamentals',
    questionEn: 'Which of the following is NOT a direct benefit of Software Testing?',
    questionHi: 'निम्नलिखित में से कौन-सा, सॉफ्टवेयर परीक्षण का लाभ नहीं है?',
    optionsEn: ['Bug free application', 'Cost effective', 'Low failure rate', 'Gathering requirements'],
    optionsHi: ['बग मुक्त एप्लीकेशन', 'लागत प्रभावी', 'कम विफलता', 'आवश्यकताओं को इकट्ठा करना (Gathering requirements)'],
    correctOptionIndex: 3,
    explanationEn: 'Gathering requirements is done in the requirement analysis phase of SDLC, not during software testing.',
    explanationHi: 'आवश्यकताएँ इकट्ठा करना (Requirements Gathering) SDLC के शुरुआती चरण में होता है, टेस्टिंग में नहीं।'
  },
  {
    id: 'cpct-q40',
    category: 'Networking & Internet',
    questionEn: 'Which address identifies a specific process or service running on a host computer?',
    questionHi: 'निम्नलिखित में से कौन-सा एक एड्रेस है जो किसी होस्ट पर एक विशेष प्रोसेस की पहचान करता है?',
    optionsEn: ['IP address', 'Port number', 'Network address', 'MAC address'],
    optionsHi: ['IP एड्रेस', 'पोर्ट नंबर (Port number)', 'नेटवर्क एड्रेस', 'मैक एड्रेस (MAC address)'],
    correctOptionIndex: 1,
    explanationEn: 'While IP identifies the computer on a network, the Port Number identifies the specific application process.',
    explanationHi: 'IP एड्रेस होस्ट डिवाइस पहचानता है, जबकि पोर्ट नंबर (जैसे HTTP port 80) विशिष्ट एप्लीकेशन प्रोसेस को पहचानता है।'
  },
  {
    id: 'cpct-q41',
    category: 'Networking & Internet',
    questionEn: 'A ________ is a hardware device that converts digital computer signals into analog signals for telephone lines and vice versa.',
    questionHi: '__________ एक उपकरण है जो डिजिटल कंप्यूटर सिग्नल को एनालॉग सिग्नल में परिवर्तित करता है और इसका विपरीत भी करता है।',
    optionsEn: ['router', 'hub', 'modem', 'codec'],
    optionsHi: ['राउटर (router)', 'हब (hub)', 'मॉडेम (modem)', 'कोडेक (codec)'],
    correctOptionIndex: 2,
    explanationEn: 'MODEM stands for MOdulator-DEModulator, converting digital data to analog for transmission.',
    explanationHi: 'मॉडेम (MODEM) सिग्नल मॉड्युलेशन (डिजिटल से एनालॉग) तथा डिमॉड्युलेशन का कार्य करता है।'
  },
  {
    id: 'cpct-q42',
    category: 'Networking & Internet',
    questionEn: 'Which network cable consists of glass or plastic cores that transmit data as light pulses?',
    questionHi: 'कौन सी केबल ग्लास या प्लास्टिक कोर से बनी होती है और प्रकाश पल्स के रूप में डेटा संचारित करती है?',
    optionsEn: ['Twisted pair cable', 'Coaxial cable', 'Fibre optic cable', 'Unshielded twisted pair'],
    optionsHi: ['ट्विस्टेड पेयर केबल', 'कोएक्सिअल केबल', 'फाइबर ऑप्टिक केबल (Fibre optic cable)', 'अनशील्डेड ट्विस्टेड पेअर'],
    correctOptionIndex: 2,
    explanationEn: 'Fibre Optic Cables transmit data using total internal reflection of light along thin glass/plastic fibers.',
    explanationHi: 'फाइबर ऑप्टिक केबल का मुख्य कोर काँच/ग्लास का बना होता है और डेटा प्रकाश की गति से भेजता है।'
  },
  {
    id: 'cpct-q43',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'To create a chart in MS-Excel 2019, which ribbon tab should you click?',
    questionHi: 'MS-Excel 2019 में चार्ट या ग्राफ बनाने के लिए किस टैब का उपयोग किया जाता है?',
    optionsEn: ['File tab', 'Home tab', 'Insert tab', 'View tab'],
    optionsHi: ['फाइल टैब', 'होम टैब', 'इंसर्ट टैब (Insert tab)', 'व्यू टैब'],
    correctOptionIndex: 2,
    explanationEn: 'In MS Excel, charts, graphics, shapes, and pivot tables are placed under the Insert tab.',
    explanationHi: 'एक्सेल में चार्ट जोड़ने के लिए Insert -> Recommended Charts का प्रयोग होता है।'
  },
  {
    id: 'cpct-q44',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'A chart ________ is a brief, descriptive label that summarizes the main topic of a graph.',
    questionHi: 'चार्ट ________ एक संक्षिप्त, वर्णनात्मक लेबल है जो ग्राफ के मुख्य उद्देश्य को सारांशित करता है।',
    optionsEn: ['axes', 'title', 'source', 'legend'],
    optionsHi: ['एक्सेस (Axes)', 'टाइटल (Title)', 'सोर्स (Source)', 'लीजेंड (Legend)'],
    correctOptionIndex: 1,
    explanationEn: 'Chart Title appears at the top of a chart to give context on what data is being presented.',
    explanationHi: 'चार्ट टाइटल (Chart Title) चार्ट के मुख्य विषय का नाम दर्शाता है।'
  },
  {
    id: 'cpct-q45',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'Which keyboard shortcut is used to apply italic formatting in MS-Excel 2019?',
    questionHi: 'MS-Excel 2019 में अक्षरों को इटैलिक करने के लिए किस कीबोर्ड शॉर्टकट का उपयोग किया जाता है?',
    optionsEn: ['Ctrl + I', 'Ctrl + B', 'Ctrl + U', 'Ctrl + V'],
    optionsHi: ['Ctrl + I', 'Ctrl + B', 'Ctrl + U', 'Ctrl + V'],
    correctOptionIndex: 0,
    explanationEn: 'Ctrl + I toggles Italic text, Ctrl + B toggles Bold, and Ctrl + U toggles Underline.',
    explanationHi: 'Ctrl + I से टेक्स्ट इटैलिक (तिरछा) होता है।'
  },
  {
    id: 'cpct-q46',
    category: 'Networking & Internet',
    questionEn: 'In a network, ________ measures the time delay for data packets to travel to their destination.',
    questionHi: 'नेटवर्क में, __________ डेटा को अपने गंतव्य तक पहुंचने में लगने वाले समय (विलंब) को मापता है।',
    optionsEn: ['network latency', 'bandwidth', 'frequency', 'wavelength'],
    optionsHi: ['नेटवर्क लेटेंसी (Network latency)', 'बैंडविड्थ (Bandwidth)', 'फ्रिक्वेंसी', 'वेवलेंथ'],
    correctOptionIndex: 0,
    explanationEn: 'Latency refers to the total time taken for a packet of data to travel from source to destination across a network.',
    explanationHi: 'नेटवर्क लेटेंसी डेटा पैकेट जाने में हुई देरी का मापदंड होता है।'
  },
  {
    id: 'cpct-q47',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'In OpenOffice Calc, which function returns TRUE if a cell value refers to text and FALSE otherwise?',
    questionHi: 'ओपन ऑफिस कैल्क (OpenOffice Calc) में यदि सेल का मान टेक्स्ट है तो कौन-सा फ़ंक्शन TRUE रिटर्न देता है?',
    optionsEn: ['ISTEXT', 'TEXT', 'TRUE', 'VALUE'],
    optionsHi: ['ISTEXT', 'TEXT', 'TRUE', 'VALUE'],
    correctOptionIndex: 0,
    explanationEn: 'The =ISTEXT(value) function checks whether a given cell content is textual data.',
    explanationHi: 'ISTEXT फ़ंक्शन जांचता है कि दी गई वैल्यू टेक्स्ट है या नहीं।'
  },
  {
    id: 'cpct-q48',
    category: 'Computer Fundamentals',
    questionEn: 'Which of the following programming languages is NOT classified under high-level languages?',
    questionHi: 'निम्नलिखित में से कौन-सी प्रोग्रामिंग भाषा उच्च स्तरीय (high-level) भाषाओं के अंतर्गत वर्गीकृत नहीं है?',
    optionsEn: ['Machine language', 'Fortran', 'Java', 'C++'],
    optionsHi: ['मशीन भाषा (Machine language)', 'फोरट्रान (Fortran)', 'जावा (Java)', 'C++'],
    correctOptionIndex: 0,
    explanationEn: 'Machine language is a low-level language written in binary code (0s and 1s) directly understood by the CPU.',
    explanationHi: 'मशीन भाषा लो-लेवल प्रोग्रामिंग भाषा (0 और 1) होती है, हाई-लेवल भाषा नहीं।'
  },
  {
    id: 'cpct-q49',
    category: 'MS Office (Word/Excel/PowerPoint)',
    questionEn: 'The keyboard shortcut \'Alt + P\' in MS-Word 2019 switches to which ribbon tab?',
    questionHi: 'MS-Word 2019 में की-बोर्ड शॉर्टकट \'Alt + P\' का उपयोग किस टैब पर जाने के लिए किया जाता है?',
    optionsEn: ['Layout', 'File', 'Insert', 'Design'],
    optionsHi: ['लेआउट (Layout)', 'फाइल (File)', 'इंसर्ट (Insert)', 'डिजाइन (Design)'],
    correctOptionIndex: 0,
    explanationEn: 'Alt + P is the key tip shortcut for navigating directly to the Layout tab in Word 2019.',
    explanationHi: 'Alt + P दबाने पर वर्ड 2019 में Layout (लेआउट) टैब खुल जाता है।'
  },
  {
    id: 'cpct-q50',
    category: 'Computer Fundamentals',
    questionEn: 'With reference to computational speed of supercomputers, what is the full form of FLOPs?',
    questionHi: 'कंप्यूटर और सुपरकंप्यूटर की प्रचालन गति के संदर्भ में, FLOPs का पूर्ण रूप क्या है?',
    optionsEn: ['Floating-Point Operations per second', 'Floating-Point Operands per second', 'Floating-Point Outputs per second', 'Floating-Point Organizations per second'],
    optionsHi: ['Floating-Point Operations per second', 'Floating-Point Operands per second', 'Floating-Point Outputs per second', 'Floating-Point Organizations per second'],
    correctOptionIndex: 0,
    explanationEn: 'FLOPs stands for Floating-Point Operations Per Second, measuring computer performance in mathematical calculations.',
    explanationHi: 'FLOPs का पूरा नाम Floating-Point Operations Per Second है जो सुपरकंप्यूटर की गति मापने की इकाई है।'
  }
];
