import { QuizQuestion } from '../quizQuestions';

export const quizPart1: QuizQuestion[] = [
  {
    id: 'cpct-q1',
    category: 'Computer Fundamentals',
    questionEn: 'Cache and main memory will lose their contents when the power of a computer is off. This property is referred to as ______.',
    questionHi: 'कैश और मुख्य मेमोरी अपनी सामग्री (कंटेंट) खो देंगे जब बिजली बंद हो जाएगी, इस गुण को ___________ के रूप में संदर्भित किया जाता है।',
    optionsEn: ['dynamic', 'static', 'volatility', 'non-volatile'],
    optionsHi: ['डायनमिक (dynamic)', 'स्टैटिक (static)', 'वोलैटिलिटी (volatility)', 'नॉन-वोलेटाइल (non-volatile)'],
    correctOptionIndex: 2,
    explanationEn: 'RAM and Cache memory lose saved data as soon as power is turned off.',
    explanationHi: 'रैम और कैश मेमोरी वोलेटाइल (अस्थाई) होती हैं क्योंकि पावर बंद होते ही इनका डेटा नष्ट हो जाता है।'
  },
  {
    id: 'cpct-q2',
    category: 'Computer Fundamentals',
    questionEn: 'Which of the following is a set of instructions embedded on a piece of hardware at the time of manufacturing?',
    questionHi: 'निम्नलिखित में से कौन सा हार्डवेयर के निर्माण के समय उस पर सन्निहित निर्देशों का एक सेट है?',
    optionsEn: ['Application Software', 'Utility Software', 'Firmware', 'Freeware'],
    optionsHi: ['एप्लिकेशन सॉफ्टवेयर', 'यूटिलिटी सॉफ्टवेयर', 'फर्मवेयर (Firmware)', 'फ्रीवेयर'],
    correctOptionIndex: 2,
    explanationEn: 'Firmware (like BIOS/UEFI) is permanent software programmed into read-only memory during hardware production.',
    explanationHi: 'फर्मवेयर (जैसे BIOS) हार्डवेयर में स्थाई रूप से चिप पर लिखा गया प्रोग्राम होता है।'
  },
  {
    id: 'cpct-q3',
    category: 'Computer Fundamentals',
    questionEn: 'Which register holds the memory address of the next instruction to be executed by the CPU?',
    questionHi: 'सीपीयू द्वारा निष्पादित किए जाने वाले अगले निर्देश का मेमोरी पता कौन सा रजिस्टर रखता है?',
    optionsEn: ['Accumulator', 'Program Counter (PC)', 'Instruction Register (IR)', 'Memory Data Register (MDR)'],
    optionsHi: ['एक्यूपुलेटर (Accumulator)', 'प्रोग्राम काउंटर (Program Counter - PC)', 'इन्स्ट्रक्शन रजिस्टर (IR)', 'मेमोरी डेटा रजिस्टर (MDR)'],
    correctOptionIndex: 1,
    explanationEn: 'Program Counter (PC) stores the address of the next instruction to be fetched and executed.',
    explanationHi: 'प्रोग्राम काउंटर (PC) अगले एक्सीक्यूट होने वाले निर्देश का मेमोरी एड्रेस स्टोर करता है।'
  },
  {
    id: 'cpct-q4',
    category: 'Hardware & Security',
    questionEn: 'What does the acronym SCSI stand for?',
    questionHi: 'SCSI का पूर्ण रूप क्या है?',
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
    questionHi: 'कंप्यूटर में, कौन-सा डिवाइस कार्यात्मक रूप से कीबोर्ड के विपरीत है?',
    optionsEn: ['Joystick', 'Track ball', 'Mouse', 'Printer'],
    optionsHi: ['जॉयस्टिक (Joystick)', 'ट्रेक बॉल (Track ball)', 'माउस (Mouse)', 'प्रिंटर (Printer)'],
    correctOptionIndex: 3,
    explanationEn: 'A keyboard is a primary text input device, while a printer is a hard-copy output device.',
    explanationHi: 'कीबोर्ड एक इनपुट डिवाइस है जबकि प्रिंटर आउटपुट प्रदान करता है।'
  },
  {
    id: 'cpct-q6',
    category: 'Computer Fundamentals',
    questionEn: 'Which of the following is an example of open source relational database software?',
    questionHi: 'निम्नलिखित में से कौन सा ओपन सोर्स डेटाबेस का एक उदाहरण है?',
    optionsEn: ['Oracle', 'MySQL', 'MS Access', 'IBM DB2'],
    optionsHi: ['ओरेकल', 'MySQL', 'एमएस एक्सेस', 'IBM DB2'],
    correctOptionIndex: 1,
    explanationEn: 'MySQL is an open-source relational database management system.',
    explanationHi: 'MySQL एक प्रसिद्ध ओपन-सोर्स रिलेशनल डेटाबेस सॉफ्टवेयर है।'
  },
  {
    id: 'cpct-q7',
    category: 'Computer Fundamentals',
    questionEn: 'Which keyboard shortcut key is used to rename a highlighted icon, file or folder in Windows?',
    questionHi: 'Windows में हाइलाइट किए गए आइकन, फाइल या फोल्डर का नाम बदलने (Rename) के लिए किस कुंजी का उपयोग किया जाता है?',
    optionsEn: ['F3', 'F5', 'F2', 'F4'],
    optionsHi: ['F3', 'F5', 'F2', 'F4'],
    correctOptionIndex: 2,
    explanationEn: 'F2 is the standard universal shortcut key for renaming selected files or folders in Windows.',
    explanationHi: 'Windows में फ़ाइल या फोल्डर का नाम बदलने के लिए F2 शॉर्टकट कुंजी का प्रयोग किया जाता है।'
  },
  {
    id: 'cpct-q8',
    category: 'Computer Fundamentals',
    questionEn: 'What is the full form of ALU in computer architecture?',
    questionHi: 'कंप्यूटर आर्किटेक्चर में ALU का पूरा नाम क्या है?',
    optionsEn: ['Arithmetic Logic Unit', 'Array Logic Unit', 'Application Logic Unit', 'Automated Logic Unit'],
    optionsHi: ['Arithmetic Logic Unit', 'Array Logic Unit', 'Application Logic Unit', 'Automated Logic Unit'],
    correctOptionIndex: 0,
    explanationEn: 'ALU stands for Arithmetic Logic Unit, performing mathematical and logical operations inside CPU.',
    explanationHi: 'ALU का पूरा नाम Arithmetic Logic Unit है जो अंकगणितीय और तार्किक गणना करता है।'
  },
  {
    id: 'cpct-q9',
    category: 'Computer Fundamentals',
    questionEn: 'Which generation of computers used Microprocessors (VLSI/ULSI) circuits?',
    questionHi: 'किस पीढ़ी के कंप्यूटरों में माइक्रोप्रोसेसर (VLSI/ULSI) तकनीक का प्रयोग किया गया था?',
    optionsEn: ['First Generation', 'Second Generation', 'Third Generation', 'Fourth Generation'],
    optionsHi: ['प्रथम पीढ़ी', 'द्वितीय पीढ़ी', 'तृतीय पीढ़ी', 'चतुर्थ पीढ़ी'],
    correctOptionIndex: 3,
    explanationEn: '4th generation computers utilized microprocessors (Very Large Scale Integration).',
    explanationHi: 'चतुर्थ पीढ़ी के कंप्यूटरों में माइक्रोप्रोसेसर और VLSI चिप्स का उपयोग किया गया।'
  },
  {
    id: 'cpct-q10',
    category: 'Computer Fundamentals',
    questionEn: '1 Petabyte (PB) is equivalent to how many Terabytes (TB)?',
    questionHi: '1 पेटौबाइट (PB) कितने टेराबाइट (TB) के बराबर होता है?',
    optionsEn: ['1000 TB', '1024 TB', '512 TB', '2048 TB'],
    optionsHi: ['1000 TB', '1024 TB', '512 TB', '2048 TB'],
    correctOptionIndex: 1,
    explanationEn: '1 PB = 1024 TB (Binary conversion standard: 2^10 = 1024).',
    explanationHi: '1 PB = 1024 टेराबाइट (TB) होता है।'
  },
  {
    id: 'cpct-q11',
    category: 'Computer Fundamentals',
    questionEn: 'Which memory type operates at the fastest speed in a computer system?',
    questionHi: 'कंप्यूटर सिस्टम में कौन सी मेमोरी सबसे तेज गति से कार्य करती है?',
    optionsEn: ['RAM', 'Hard Disk', 'CPU Registers', 'Cache Memory'],
    optionsHi: ['रैम (RAM)', 'हार्ड डिस्क (Hard Disk)', 'सीपीयू रजिस्टर्स (CPU Registers)', 'कैश मेमोरी (Cache)'],
    correctOptionIndex: 2,
    explanationEn: 'CPU Registers located directly inside the processor core are the fastest storage memory.',
    explanationHi: 'प्रोसेसर के अंदर स्थित CPU रजिस्टर्स सबसे तेज मेमोरी होते हैं।'
  },
  {
    id: 'cpct-q12',
    category: 'Computer Fundamentals',
    questionEn: 'Which component is considered the "Brain" of the computer?',
    questionHi: 'कंप्यूटर का "मस्तिष्क" (Brain) किसे कहा जाता है?',
    optionsEn: ['RAM', 'CPU', 'Motherboard', 'Hard Drive'],
    optionsHi: ['रैम', 'सीपीयू (CPU)', 'मदरबोर्ड', 'हार्ड ड्राइव'],
    correctOptionIndex: 1,
    explanationEn: 'Central Processing Unit (CPU) controls execution of instructions and processing operations.',
    explanationHi: 'सेंट्रल प्रोसेसिंग यूनिट (CPU) कंप्यूटर का मस्तिष्क कहलाता है।'
  },
  {
    id: 'cpct-q13',
    category: 'Computer Fundamentals',
    questionEn: 'EEPROM stands for _____________.',
    questionHi: 'EEPROM का अर्थ ____________ है।',
    optionsEn: [
      'Electrically Erasable Programmable Read-Only Memory',
      'Electronic Erasable Programmable Read-Only Memory',
      'Electrically Encrypted Programmable Read-Only Memory',
      'Electrically Erasable Processed Read-Only Memory'
    ],
    optionsHi: [
      'Electrically Erasable Programmable Read-Only Memory',
      'Electronic Erasable Programmable Read-Only Memory',
      'Electrically Encrypted Programmable Read-Only Memory',
      'Electrically Erasable Processed Read-Only Memory'
    ],
    correctOptionIndex: 0,
    explanationEn: 'EEPROM is non-volatile memory that can be erased and rewritten electrically.',
    explanationHi: 'EEPROM का मतलब Electrically Erasable Programmable Read-Only Memory है जिसे विद्युत संकेतों द्वारा मिटाया जा सकता है।'
  },
  {
    id: 'cpct-q14',
    category: 'Computer Fundamentals',
    questionEn: 'Which number system uses base 16?',
    questionHi: 'किस संख्या प्रणाली (Number System) का आधार 16 (Base 16) होता है?',
    optionsEn: ['Binary', 'Octal', 'Decimal', 'Hexadecimal'],
    optionsHi: ['बाइनरी (Binary)', 'ऑक्टल (Octal)', 'डेसिमल (Decimal)', 'हेक्साडेसिमल (Hexadecimal)'],
    correctOptionIndex: 3,
    explanationEn: 'Hexadecimal system uses 16 symbols (0-9 and A-F).',
    explanationHi: 'हेक्साडेसिमल संख्या प्रणाली का बेस 16 होता है (0-9 अंक एवं A-F अक्षर)।'
  },
  {
    id: 'cpct-q15',
    category: 'Computer Fundamentals',
    questionEn: 'What is the binary representation of decimal number 25?',
    questionHi: 'दशमलव संख्या 25 का बाइनरी रूप क्या है?',
    optionsEn: ['11001', '10011', '11100', '10101'],
    optionsHi: ['11001', '10011', '11100', '10101'],
    correctOptionIndex: 0,
    explanationEn: '25 in binary: 16 + 8 + 1 = 11001_2.',
    explanationHi: '25 को बाइनरी में बदलने पर 16 + 8 + 0 + 0 + 1 = 11001 प्राप्त होता है।'
  },
  {
    id: 'cpct-q16',
    category: 'Computer Fundamentals',
    questionEn: 'Booting a computer that is already turned ON is called _______.',
    questionHi: 'पहले से चालू कंप्यूटर को रीस्टार्ट (Restart) करने की प्रक्रिया को क्या कहा जाता है?',
    optionsEn: ['Cold Booting', 'Warm Booting', 'Hard Booting', 'Fast Booting'],
    optionsHi: ['कोल्ड बूटिंग', 'वार्म बूटिंग (Warm Booting)', 'हार्ड बूटिंग', 'फास्ट बूटिंग'],
    correctOptionIndex: 1,
    explanationEn: 'Warm booting refers to restarting a system without turning power completely off.',
    explanationHi: 'सिस्टम को रीस्टार्ट करने को वार्म बूटिंग (Warm Booting) कहा जाता है।'
  },
  {
    id: 'cpct-q17',
    category: 'Computer Fundamentals',
    questionEn: 'In MS-DOS / Command Prompt, which command is used to clear the screen?',
    questionHi: 'MS-DOS या कमांड प्रॉम्प्ट में स्क्रीन को साफ (Clear) करने के लिए किस कमांड का उपयोग किया जाता है?',
    optionsEn: ['CLEAR', 'CLS', 'CLEAN', 'ERASE'],
    optionsHi: ['CLEAR', 'CLS', 'CLEAN', 'ERASE'],
    correctOptionIndex: 1,
    explanationEn: 'CLS clears the Command Prompt terminal screen in MS-DOS and Windows.',
    explanationHi: 'CLS (Clear Screen) कमांड प्रॉम्प्ट की स्क्रीन साफ करने की कमांड है।'
  },
  {
    id: 'cpct-q18',
    category: 'Computer Fundamentals',
    questionEn: 'Which key is pressed during startup to enter BIOS Setup in most computers?',
    questionHi: 'अधिकांश कंप्यूटरों में स्टार्ट-अप के दौरान BIOS सेटअप में प्रवेश करने के लिए कौन-सी कुंजी दबाई जाती है?',
    optionsEn: ['F2 or Del', 'F8', 'F12', 'Shift + Enter'],
    optionsHi: ['F2 या Del', 'F8', 'F12', 'Shift + Enter'],
    correctOptionIndex: 0,
    explanationEn: 'F2 or Delete keys are standard BIOS access hotkeys during system POST.',
    explanationHi: 'सिस्टम चालू होते समय F2 या Delete की दबाने पर BIOS सेटअप खुलता है।'
  },
  {
    id: 'cpct-q19',
    category: 'Computer Fundamentals',
    questionEn: 'Which unit converts human-readable input data into binary language understood by computer?',
    questionHi: 'मानव द्वारा पढ़े जाने वाले डेटा को बाइनरी कोड में परिवर्तित करने वाली इकाई कौन-सी है?',
    optionsEn: ['Output Unit', 'Input Unit', 'Storage Unit', 'Control Unit'],
    optionsHi: ['आउटपुट यूनिट', 'इनपुट यूनिट (Input Unit)', 'स्टोरेज यूनिट', 'कंट्रोल यूनिट'],
    correctOptionIndex: 1,
    explanationEn: 'Input devices convert raw user input into electrical binary signals.',
    explanationHi: 'इनपुट यूनिट यूजर द्वारा दी गई जानकारी को डिजिटल बाइनरी सिग्नल में बदलती है।'
  },
  {
    id: 'cpct-q20',
    category: 'Computer Fundamentals',
    questionEn: 'Which storage medium uses magnetic platters spinning at high RPMs?',
    questionHi: 'कौन सा स्टोरेज माध्यम उच्च आरपीएम (RPM) पर घूमने वाली चुंबकीय प्लेटर का उपयोग करता है?',
    optionsEn: ['Solid State Drive (SSD)', 'Hard Disk Drive (HDD)', 'CD-ROM', 'USB Flash Drive'],
    optionsHi: ['सॉलिड स्टेट ड्राइव (SSD)', 'हार्ड डिस्क ड्राइव (HDD)', 'सीडी-रोम (CD-ROM)', 'यूएसबी पेन ड्राइव'],
    correctOptionIndex: 1,
    explanationEn: 'HDD uses magnetic spinning platters read by moving magnetic heads.',
    explanationHi: 'हार्ड डिस्क (HDD) में घूमने वाली मैग्नेटिक डिस्क्स होती हैं।'
  },
  {
    id: 'cpct-q21',
    category: 'Computer Fundamentals',
    questionEn: 'Which optical storage disc format offers standard single-layer capacity of 4.7 GB?',
    questionHi: 'किस ऑप्टिकल स्टोरेज डिस्क प्रारूप की मानक सिंगल-लेयर क्षमता 4.7 GB होती है?',
    optionsEn: ['CD-ROM', 'DVD-ROM', 'Blu-ray Disc', 'Floppy Disk'],
    optionsHi: ['CD-ROM', 'DVD-ROM', 'ब्लू-रे डिस्क', 'फ्लॉपी डिस्क'],
    correctOptionIndex: 1,
    explanationEn: 'Standard single-layer DVD has a data capacity of 4.7 GB.',
    explanationHi: 'मानक सिंगल-लेयर DVD की भंडारण क्षमता 4.7 GB होती है।'
  },
  {
    id: 'cpct-q22',
    category: 'Computer Fundamentals',
    questionEn: 'Storage capacity of a standard 3.5-inch Floppy Disk is ________.',
    questionHi: 'मानक 3.5-इंच फ्लॉपी डिस्क की भंडारण क्षमता कितनी होती है?',
    optionsEn: ['1.44 MB', '1.44 GB', '700 MB', '4.7 MB'],
    optionsHi: ['1.44 MB', '1.44 GB', '700 MB', '4.7 MB'],
    correctOptionIndex: 0,
    explanationEn: 'Standard High Density (HD) 3.5-inch floppy disk holds 1.44 Megabytes.',
    explanationHi: '3.5-इंच HD फ्लॉपी डिस्क की क्षमता 1.44 MB होती है।'
  },
  {
    id: 'cpct-q23',
    category: 'Computer Fundamentals',
    questionEn: 'Which memory type retains data permanently even when computer is powered off?',
    questionHi: 'कंप्यूटर बंद होने पर भी कौन सी मेमोरी डेटा को स्थाई रूप से सुरक्षित रखती है?',
    optionsEn: ['SRAM', 'DRAM', 'ROM', 'Cache'],
    optionsHi: ['SRAM', 'DRAM', 'ROM (Read Only Memory)', 'कैश'],
    correctOptionIndex: 2,
    explanationEn: 'ROM is non-volatile memory storing startup firmware permanently.',
    explanationHi: 'ROM एक नॉन-वोलेटाइल स्थायी मेमोरी है जो बिजली बंद होने पर भी डेटा नहीं खोती।'
  },
  {
    id: 'cpct-q24',
    category: 'Computer Fundamentals',
    questionEn: 'Which printer technology uses an ink ribbon and pin matrix to strike paper physically?',
    questionHi: 'किस प्रिंटर तकनीक में स्याही वाले रिबन पर पिन से प्रहार करके अक्षर छापे जाते हैं?',
    optionsEn: ['Laser Printer', 'Inkjet Printer', 'Dot Matrix Printer', 'Thermal Printer'],
    optionsHi: ['लेजर प्रिंटर', 'इंकजेट प्रिंटर', 'डॉट मैट्रिक्स प्रिंटर (Dot Matrix)', 'थर्मल प्रिंटर'],
    correctOptionIndex: 2,
    explanationEn: 'Dot Matrix is an impact printer using pins striking an inked ribbon.',
    explanationHi: 'डॉट मैट्रिक्स प्रिंटर एक इम्पैक्ट प्रिंटर है जिसमें पिन रिबन पर चोट करती है।'
  },
  {
    id: 'cpct-q25',
    category: 'Computer Fundamentals',
    questionEn: 'Which printer is commonly used at billing counters in shops because of quiet operation and heat-based paper print?',
    questionHi: 'दुकानों के बिलिंग काउंटर पर शांत संचालन और गर्मी द्वारा छपाई के लिए किस प्रिंटर का व्यापक उपयोग होता है?',
    optionsEn: ['Dot Matrix Printer', 'Thermal Printer', 'Line Printer', 'Plotter'],
    optionsHi: ['डॉट मैट्रिक्स प्रिंटर', 'थर्मल प्रिंटर (Thermal Printer)', 'लाइन प्रिंटर', 'प्लॉटर'],
    correctOptionIndex: 1,
    explanationEn: 'Thermal printers use heat-sensitive paper to generate receipts quickly and quietly.',
    explanationHi: 'थर्मल प्रिंटर विशेष ताप-संवेदनशील रसीद कागज पर प्रिंट करते हैं।'
  },
  {
    id: 'cpct-q26',
    category: 'Computer Fundamentals',
    questionEn: 'Resolution of a monitor or printer is measured in ________.',
    questionHi: 'मॉनिटर या प्रिंटर के रेजोल्यूशन (Resolution) की गुणवत्ता किसमें मापी जाती है?',
    optionsEn: ['DPI (Dots Per Inch)', 'PPM (Pages Per Minute)', 'RPM (Rotations Per Minute)', 'Hz (Hertz)'],
    optionsHi: ['DPI (Dots Per Inch)', 'PPM (Pages Per Minute)', 'RPM', 'Hz (हर्ट्ज़)'],
    correctOptionIndex: 0,
    explanationEn: 'DPI (Dots Per Inch) determines spatial printing and display resolution clarity.',
    explanationHi: 'DPI (डॉट्स पर इंच) से प्रिंटिंग और डिस्प्ले की स्पष्टता/रेजोल्यूशन मापी जाती है।'
  },
  {
    id: 'cpct-q27',
    category: 'Computer Fundamentals',
    questionEn: 'Printing speed of a Laser printer is measured in ________.',
    questionHi: 'लेजर प्रिंटर की प्रिंटिंग गति को किस इकाई में मापा जाता है?',
    optionsEn: ['CPS (Characters per second)', 'LPM (Lines per minute)', 'PPM (Pages per minute)', 'DPI'],
    optionsHi: ['CPS', 'LPM', 'PPM (Pages Per Minute)', 'DPI'],
    correctOptionIndex: 2,
    explanationEn: 'PPM (Pages Per Minute) indicates laser printer output speed.',
    explanationHi: 'लेज़र प्रिंटर की गति PPM (पेज प्रति मिनट) में मापी जाती है।'
  },
  {
    id: 'cpct-q28',
    category: 'Computer Fundamentals',
    questionEn: 'Which device is used for printing large architectural blueprints and engineering maps?',
    questionHi: 'बड़े आर्किटेक्चरल नक्शे और इंजीनियरिंग ब्लू-प्रिंट प्रिंट करने के लिए किस उपकरण का उपयोग किया जाता है?',
    optionsEn: ['Laser Printer', 'Plotter', 'Scanner', 'Dot Matrix Printer'],
    optionsHi: ['लेजर प्रिंटर', 'प्लॉटर (Plotter)', 'स्कैनर', 'डॉट मैट्रिक्स प्रिंटर'],
    correctOptionIndex: 1,
    explanationEn: 'Plotters draw continuous high-precision vector graphics and large blueprint designs.',
    explanationHi: 'प्लॉटर बड़े बैनर, नक्शे और वेक्टर ग्राफिक्स प्रिंट करने के काम आता है।'
  },
  {
    id: 'cpct-q29',
    category: 'Computer Fundamentals',
    questionEn: 'Which input device is used to scan OMR answer sheets in competitive examinations?',
    questionHi: 'प्रतियोगी परीक्षाओं की OMR उत्तर पुस्तिकाओं को जांचने के लिए किस इनपुट डिवाइस का उपयोग किया जाता है?',
    optionsEn: ['MICR', 'OCR', 'OMR (Optical Mark Reader)', 'Bar Code Reader'],
    optionsHi: ['MICR', 'OCR', 'OMR (Optical Mark Reader)', 'बारकोड रीडर'],
    correctOptionIndex: 2,
    explanationEn: 'Optical Mark Reader (OMR) detects dark pencil/pen bubble marks on standard test sheets.',
    explanationHi: 'OMR (Optical Mark Reader) परीक्षा फॉर्म और उत्तर पत्रक के गोलों को पढ़ने में प्रयुक्त होता है।'
  },
  {
    id: 'cpct-q30',
    category: 'Computer Fundamentals',
    questionEn: 'Which technology is used by banks on cheque leaves to process cheque clearance rapidly?',
    questionHi: 'बैंकों में चेक क्लीयरेंस प्रक्रिया को तीव्र बनाने हेतु चेक पर किस तकनीक की कोडिंग का उपयोग होता है?',
    optionsEn: ['OMR', 'MICR (Magnetic Ink Character Recognition)', 'OCR', 'UPC'],
    optionsHi: ['OMR', 'MICR (Magnetic Ink Character Recognition)', 'OCR', 'UPC'],
    correctOptionIndex: 1,
    explanationEn: 'MICR reads magnetic ink codes printed at bottom of bank cheques.',
    explanationHi: 'बैंकों में चेक पर छपे 9-अंकों वाले कोड को MICR (Magnetic Ink Character Recognition) द्वारा पढ़ा जाता है।'
  },
  {
    id: 'cpct-q31',
    category: 'Computer Fundamentals',
    questionEn: 'Which key acts as a toggle key on a computer keyboard?',
    questionHi: 'कीबोर्ड पर कौन-सी कुंजी टॉगल की (Toggle Key) का कार्य करती है?',
    optionsEn: ['Caps Lock', 'Shift', 'Control', 'Alt'],
    optionsHi: ['Caps Lock', 'Shift', 'Control', 'Alt'],
    correctOptionIndex: 0,
    explanationEn: 'Caps Lock, Num Lock, and Scroll Lock toggle states on or off upon each press.',
    explanationHi: 'Caps Lock और Num Lock टॉगल की कहलाते हैं क्योंकि ये ऑन/ऑफ स्थिति बदलते हैं।'
  },
  {
    id: 'cpct-q32',
    category: 'Computer Fundamentals',
    questionEn: 'Combination keys like Ctrl, Alt, and Shift are also known as _______ keys.',
    questionHi: 'Ctrl, Alt, और Shift जैसी कुंजियों को और किस नाम से जाना जाता है?',
    optionsEn: ['Function Keys', 'Modifier Keys', 'Navigation Keys', 'Numeric Keys'],
    optionsHi: ['फ़ंक्शन कीज', 'मॉडीफायर कीज (Modifier Keys)', 'नेविगेशन कीज', 'न्यूमेरिक कीज'],
    correctOptionIndex: 1,
    explanationEn: 'Modifier keys modify the output of other keys pressed simultaneously.',
    explanationHi: 'Ctrl, Alt और Shift अन्य कुंजियों के प्रभाव को बदलते हैं, इसलिए इन्हें Modifier Keys कहा जाता है।'
  },
  {
    id: 'cpct-q33',
    category: 'Computer Fundamentals',
    questionEn: 'How many Function Keys (F1-F12) are present on a standard computer keyboard?',
    questionHi: 'एक मानक कीबोर्ड पर कुल कितनी फ़ंक्शन कुंजियाँ (Function Keys) होती हैं?',
    optionsEn: ['10', '12', '14', '16'],
    optionsHi: ['10', '12', '14', '16'],
    correctOptionIndex: 1,
    explanationEn: 'Standard computer keyboards feature 12 function keys from F1 to F12.',
    explanationHi: 'कीबोर्ड में सबसे ऊपर F1 से लेकर F12 तक कुल 12 फंक्शन कीज होती हैं।'
  },
  {
    id: 'cpct-q34',
    category: 'Computer Fundamentals',
    questionEn: 'The shortcut key to open Windows File Explorer directly is ________.',
    questionHi: 'Windows में सीधे फाइल एक्सप्लोरर (File Explorer) खोलने की शॉर्टकट की क्या है?',
    optionsEn: ['Windows Key + E', 'Windows Key + R', 'Windows Key + D', 'Windows Key + F'],
    optionsHi: ['Win + E', 'Win + R', 'Win + D', 'Win + F'],
    correctOptionIndex: 0,
    explanationEn: 'Win + E instantly launches File Explorer in Windows.',
    explanationHi: 'Win + E दबाने से तुरंत फाइल एक्सप्लोरर खुलता है।'
  },
  {
    id: 'cpct-q35',
    category: 'Computer Fundamentals',
    questionEn: 'Which key shortcut minimizes all open windows to show desktop instantly?',
    questionHi: 'सभी खुली हुई विंडो को एक साथ मिनिमाइज करके डेस्कटॉप दिखाने का शॉर्टकट क्या है?',
    optionsEn: ['Win + D', 'Win + L', 'Win + P', 'Win + Tab'],
    optionsHi: ['Win + D', 'Win + L', 'Win + P', 'Win + Tab'],
    correctOptionIndex: 0,
    explanationEn: 'Win + D toggles desktop view by minimizing/restoring active windows.',
    explanationHi: 'Win + D कीबोर्ड शॉर्टकट दबाकर तुरंत डेस्कटॉप पर पहुँचा जा सकता है।'
  },
  {
    id: 'cpct-q36',
    category: 'Computer Fundamentals',
    questionEn: 'Which Windows shortcut locks user workstation account instantly?',
    questionHi: 'कंप्यूटर स्क्रीन या यूज़र अकाउंट को तुरंत लॉक (Lock) करने का शॉर्टकट क्या है?',
    optionsEn: ['Win + L', 'Ctrl + Alt + Del', 'Win + K', 'Alt + F4'],
    optionsHi: ['Win + L', 'Ctrl + Alt + Del', 'Win + K', 'Alt + F4'],
    correctOptionIndex: 0,
    explanationEn: 'Win + L locks the Windows session requiring user password to unlock.',
    explanationHi: 'Win + L से विंडोज लॉक स्क्रीन मोड में चला जाता है।'
  },
  {
    id: 'cpct-q37',
    category: 'Computer Fundamentals',
    questionEn: 'Which key sequence opens Windows Task Manager directly?',
    questionHi: 'टास्क मैनेजर (Task Manager) को सीधे खोलने की शॉर्टकट कुंजी कौन-सी है?',
    optionsEn: ['Ctrl + Shift + Esc', 'Ctrl + Alt + Tab', 'Win + Shift + M', 'Alt + Shift + Esc'],
    optionsHi: ['Ctrl + Shift + Esc', 'Ctrl + Alt + Tab', 'Win + Shift + M', 'Alt + Shift + Esc'],
    correctOptionIndex: 0,
    explanationEn: 'Ctrl + Shift + Esc directly opens Task Manager without passing security menu.',
    explanationHi: 'Ctrl + Shift + Esc कीबोर्ड शॉर्टकट दबाने से सीधे Task Manager खुल जाता है।'
  },
  {
    id: 'cpct-q38',
    category: 'Computer Fundamentals',
    questionEn: 'Which shortcut reopens the most recently closed browser tab in Google Chrome or Edge?',
    questionHi: 'ब्राउजर में हाल ही में बंद किए गए टैब को दोबारा खोलने का शॉर्टकट क्या है?',
    optionsEn: ['Ctrl + Shift + T', 'Ctrl + T', 'Ctrl + N', 'Ctrl + Shift + N'],
    optionsHi: ['Ctrl + Shift + T', 'Ctrl + T', 'Ctrl + N', 'Ctrl + Shift + N'],
    correctOptionIndex: 0,
    explanationEn: 'Ctrl + Shift + T restores recently closed browser tabs in order.',
    explanationHi: 'Ctrl + Shift + T दबाने पर गलती से बंद हुआ पिछला टैब वापस खुल जाता है।'
  },
  {
    id: 'cpct-q39',
    category: 'Computer Fundamentals',
    questionEn: 'What is the full form of ASCII in data representation?',
    questionHi: 'डेटा प्रतिनिधित्व में ASCII का पूर्ण रूप क्या है?',
    optionsEn: [
      'American Standard Code for Information Interchange',
      'American Standard Code for Information Integration',
      'Asian Standard Code for Information Interchange',
      'Automated Standard Code for Information Interchange'
    ],
    optionsHi: [
      'American Standard Code for Information Interchange',
      'American Standard Code for Information Integration',
      'Asian Standard Code for Information Interchange',
      'Automated Standard Code for Information Interchange'
    ],
    correctOptionIndex: 0,
    explanationEn: 'ASCII stands for American Standard Code for Information Interchange encoding 128 characters.',
    explanationHi: 'ASCII का पूरा नाम American Standard Code for Information Interchange है।'
  },
  {
    id: 'cpct-q40',
    category: 'Computer Fundamentals',
    questionEn: 'Standard ASCII code uses how many bits to represent a character?',
    questionHi: 'मानक ASCII कोड में एक कैरेक्टर को रिप्रेजेंट करने के लिए कितने बिट्स (Bits) का उपयोग होता है?',
    optionsEn: ['7 bits', '8 bits', '16 bits', '32 bits'],
    optionsHi: ['7 बिट्स', '8 बिट्स', '16 बिट्स', '32 बिट्स'],
    correctOptionIndex: 0,
    explanationEn: 'Standard ASCII uses 7 bits (128 unique character codes). Extended ASCII uses 8 bits.',
    explanationHi: 'मूल ASCII कोड 7-बिट का होता है (2^7 = 128 कोड्स)।'
  },
  {
    id: 'cpct-q41',
    category: 'Computer Fundamentals',
    questionEn: 'Unicode character set was designed to support ________.',
    questionHi: 'यूनिकोड (Unicode) कैरेक्टर सेट का निर्माण किस उद्देश्य के लिए किया गया?',
    optionsEn: [
      'Only English letters',
      'Universal encoding for all global languages',
      'Only binary numbers',
      'Only UNIX operating system fonts'
    ],
    optionsHi: [
      'केवल अंग्रेजी अक्षरों के लिए',
      'विश्व की सभी भाषाओं के अक्षरों एवं प्रतीकों को सपोर्ट करने के लिए',
      'केवल बाइनरी नंबरों के लिए',
      'केवल UNIX ऑपरेटिंग सिस्टम के लिए'
    ],
    correctOptionIndex: 1,
    explanationEn: 'Unicode provides a universal numeric identifier for every character across world scripts (including Hindi Mangal / Kruti Dev).',
    explanationHi: 'यूनिकोड दुनिया की सभी भाषाओं (हिन्दी सहित) के लेखन प्रतीकों को मानकीकृत कोड प्रदान करता है।'
  },
  {
    id: 'cpct-q42',
    category: 'Computer Fundamentals',
    questionEn: 'Which software translates high-level source code to machine code line-by-line during execution?',
    questionHi: 'कौन-सा सॉफ्टवेयर हाई-लेवल कोड को एक-एक लाइन करके मशीन कोड में अनुवादित करता है?',
    optionsEn: ['Compiler', 'Interpreter', 'Assembler', 'Linker'],
    optionsHi: ['कंपाइलर (Compiler)', 'इंटरप्रेटर (Interpreter)', 'असेम्बलर (Assembler)', 'लिंकर (Linker)'],
    correctOptionIndex: 1,
    explanationEn: 'Interpreter executes line-by-line, whereas Compiler converts the entire code block at once.',
    explanationHi: 'इंटरप्रेटर प्रोग्राम कोड की एक-एक लाइन को पढ़कर मशीन भाषा में अनुवाद करता है।'
  },
  {
    id: 'cpct-q43',
    category: 'Computer Fundamentals',
    questionEn: 'Which language translator converts Assembly language code into Machine Code?',
    questionHi: 'असेंबली भाषा (Assembly Language) को मशीन भाषा में बदलने वाले सॉफ्टवेयर को क्या कहते हैं?',
    optionsEn: ['Compiler', 'Interpreter', 'Assembler', 'Loader'],
    optionsHi: ['कंपाइलर', 'इंटरप्रेटर', 'असेम्बलर (Assembler)', 'लोडर'],
    correctOptionIndex: 2,
    explanationEn: 'Assembler translates assembly pneumonic code into binary machine code.',
    explanationHi: 'असेम्बलर असेम्बली भाषा को मशीनी कोड में परिवर्तित करता है।'
  },
  {
    id: 'cpct-q44',
    category: 'Computer Fundamentals',
    questionEn: 'System software that loads an executable file from hard drive into RAM memory is called _______.',
    questionHi: 'हार्ड डिस्क से निष्पादन योग्य (Executable) फाइल को RAM में लोड करने वाले सिस्टम प्रोग्राम को क्या कहा जाता है?',
    optionsEn: ['Loader', 'Linker', 'Editor', 'Debugger'],
    optionsHi: ['लोडर (Loader)', 'लिंकर (Linker)', 'एडिटर', 'डीबगर'],
    correctOptionIndex: 0,
    explanationEn: 'Loader is an OS utility that loads program binaries into RAM memory for CPU execution.',
    explanationHi: 'लोडर प्रोग्राम को मेमोरी (RAM) में लोड करता है ताकि सीपीयू उसे रन करा सके।'
  },
  {
    id: 'cpct-q45',
    category: 'Computer Fundamentals',
    questionEn: 'Which operating system component manages direct hardware interaction and system resources at lowest layer?',
    questionHi: 'ऑपरेटिंग सिस्टम का कौन-सा कोर घटक हार्डवेयर संसाधनों का सीधे नियंत्रण और प्रबंधन करता है?',
    optionsEn: ['Shell', 'Kernel', 'GUI', 'CLI'],
    optionsHi: ['शेल (Shell)', 'कर्नेल (Kernel)', 'जीयूआई (GUI)', 'सीएलआई (CLI)'],
    correctOptionIndex: 1,
    explanationEn: 'Kernel is the central core of OS handling system calls, CPU scheduling, and memory allocation.',
    explanationHi: 'कर्नेल ऑपरेटिंग सिस्टम का केंद्रीय मुख्य भाग (Core) होता है।'
  },
  {
    id: 'cpct-q46',
    category: 'Computer Fundamentals',
    questionEn: 'Linux operating system was originally created by ________ in 1991.',
    questionHi: 'लाइनेक्स (Linux) ऑपरेटिंग सिस्टम की शुरुआत 1991 में किसके द्वारा की गई थी?',
    optionsEn: ['Linus Torvalds', 'Bill Gates', 'Steve Jobs', 'Dennis Ritchie'],
    optionsHi: ['लाइनस टोरवाल्ड्स (Linus Torvalds)', 'बिल गेट्स', 'स्टीव जॉब्स', 'डेनिसा रिची'],
    correctOptionIndex: 0,
    explanationEn: 'Linus Torvalds created the Linux kernel in 1991 as open-source OS.',
    explanationHi: 'Linux का विकास लाइनस टोरवाल्ड्स (Linus Torvalds) ने किया था।'
  },
  {
    id: 'cpct-q47',
    category: 'Computer Fundamentals',
    questionEn: 'Which command in Linux displays current directory path in terminal?',
    questionHi: 'Linux में वर्तमान वर्किंग डायरेक्टरी का पाथ (Path) देखने के लिए किस कमांड का उपयोग किया जाता है?',
    optionsEn: ['pwd', 'cd', 'dir', 'path'],
    optionsHi: ['pwd (Print Working Directory)', 'cd', 'dir', 'path'],
    correctOptionIndex: 0,
    explanationEn: '`pwd` stands for Print Working Directory in Unix/Linux.',
    explanationHi: 'pwd कमांड वर्तमान डायरेक्टरी का पूरा पथ प्रदर्शित करती है।'
  },
  {
    id: 'cpct-q48',
    category: 'Computer Fundamentals',
    questionEn: 'Which memory management technique uses hard drive disk space as an extension of physical RAM?',
    questionHi: 'कौन सी मेमोरी तकनीक RAM की कमी होने पर हार्ड डिस्क के स्थान का उपयोग अतिरिक्त रैम के रूप में करती है?',
    optionsEn: ['Cache Memory', 'Virtual Memory', 'Flash Memory', 'Buffer Memory'],
    optionsHi: ['कैश मेमोरी', 'वर्चुअल मेमोरी (Virtual Memory)', 'फ्लैश मेमोरी', 'बफर मेमोरी'],
    correctOptionIndex: 1,
    explanationEn: 'Virtual Memory simulates additional RAM space using swap file/paging on hard drive.',
    explanationHi: 'वर्चुअल मेमोरी हार्ड डिस्क के कुछ भाग का उपयोग अस्थायी RAM की तरह करती है।'
  },
  {
    id: 'cpct-q49',
    category: 'Computer Fundamentals',
    questionEn: 'Spooling (Simultaneous Peripheral Operations On-Line) is most commonly associated with which device operation?',
    questionHi: 'स्पूलिंग (Spooling) प्रक्रिया मुख्य रूप से किस उपकरण के कार्य प्रबंधन से संबंधित है?',
    optionsEn: ['Printing jobs queue', 'Keyboard buffering', 'Monitor refresh', 'Speaker audio volume'],
    optionsHi: ['प्रिंटर जॉब कतार (Print Queue)', 'कीबोर्ड बफरिंग', 'मॉनिटर रिफ्रेश', 'स्पीकर वॉल्यूम'],
    correctOptionIndex: 0,
    explanationEn: 'Spooling holds print jobs temporarily in buffer disk space until printer finishes previous documents.',
    explanationHi: 'स्पूलिंग प्रिंटर को भेजे गए कई डॉक्यूमेंट्स को कतारबद्ध (Print Queue) करने की प्रक्रिया है।'
  },
  {
    id: 'cpct-q50',
    category: 'Computer Fundamentals',
    questionEn: 'With reference to computational speed of supercomputers, what is the full form of FLOPs?',
    questionHi: 'सुपरकंप्यूटर की प्रचालन गति के संदर्भ में, FLOPs का पूर्ण रूप क्या है?',
    optionsEn: ['Floating-Point Operations per second', 'Floating-Point Operands per second', 'Floating-Point Outputs per second', 'Floating-Point Organizations per second'],
    optionsHi: ['Floating-Point Operations per second', 'Floating-Point Operands per second', 'Floating-Point Outputs per second', 'Floating-Point Organizations per second'],
    correctOptionIndex: 0,
    explanationEn: 'FLOPs stands for Floating-Point Operations Per Second.',
    explanationHi: 'FLOPs का पूरा नाम Floating-Point Operations Per Second है जो सुपरकंप्यूटर की गति मापने की इकाई है।'
  }
];
