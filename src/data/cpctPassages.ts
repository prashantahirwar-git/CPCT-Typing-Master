export interface CPCTPassage {
  id: string;
  title: string;
  language: 'english' | 'hindi';
  category: 'CPCT Official Level' | 'Government Office' | 'Beginner' | 'Numbers & Symbols' | 'General Knowledge';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  content: string;
}

export const CPCT_PASSAGES: CPCTPassage[] = [
  {
    id: 'eng-cpct-1',
    title: 'CPCT Exam Standard 1 - MP Administrative Governance',
    language: 'english',
    category: 'CPCT Official Level',
    difficulty: 'Medium',
    content: `The Information Technology department of Madhya Pradesh has implemented digital initiatives to streamline governance services across rural and urban centers. Applicants preparing for public recruitment examinations must demonstrate efficient typing speed, accuracy in key placement, and basic computer proficiency. Clear documentation, rapid data entry, and adherence to official formats ensure transparent public administration.`
  },
  {
    id: 'eng-cpct-2',
    title: 'CPCT Exam Standard 2 - Computer Hardware & Networking',
    language: 'english',
    category: 'CPCT Official Level',
    difficulty: 'Medium',
    content: `A central processing unit acts as the primary hardware module that executes arithmetic logic instructions and manages peripheral communications. RAM provides volatile memory for quick temporary retrieval during active sessions, whereas persistent solid state storage holds operating system files, databases, and secure system logs for long term record keeping.`
  },
  {
    id: 'eng-cpct-3',
    title: 'Government Office Memo - District Revenue Office',
    language: 'government Office' as any,
    category: 'Government Office',
    difficulty: 'Hard',
    content: `MEMORANDUM NO. 842/2026: All nodal officers across the Collectorate Office are hereby instructed to finalize land record digitization files before the upcoming quarterly audit on 25th November. Ensure that every entry contains valid reference codes, applicant registration numbers, verified identity proofs, and proper supervisor approvals.`
  },
  {
    id: 'eng-cpct-4',
    title: 'Numbers & Symbols Drill - Data Entry Special',
    language: 'english',
    category: 'Numbers & Symbols',
    difficulty: 'Hard',
    content: `Ref ID #9081-A24; Total Allocation: Rs. 4,75,000/- at 8.5% interest rate per annum. Contact +91-98765-43210 (Ext: 104) or email support@mp.gov.in. Serial Codes: [X-102], [Y-504], & [Z-909]. Ensure 100% precision when typing numeric symbols and special characters.`
  },
  {
    id: 'eng-cpct-5',
    title: 'Beginner Passage - Home Row Fundamentals',
    language: 'english',
    category: 'Beginner',
    difficulty: 'Easy',
    content: `The quick brown fox jumps over the lazy dog. Daily practice improves finger rhythm and muscle memory. Rest your palms comfortably near the desk and keep your elbows relaxed. Consistent speed comes from steady key strokes rather than hurried typing.`
  },
  {
    id: 'hin-cpct-1',
    title: 'हिंदी सीपीसीटी मॉडल 1 - मध्य प्रदेश ई-गवर्नेंस',
    language: 'hindi',
    category: 'CPCT Official Level',
    difficulty: 'Medium',
    content: `मध्य प्रदेश में ई-गवर्नेंस सेवाओं के विस्तार से नागरिकों को सरकारी योजनाओं का लाभ सीधे उनके निकटतम जन सेवा केंद्रों के माध्यम से मिल रहा है। कंप्यूटर दक्षता प्रमाण पत्र परीक्षा अभ्यर्थियों के लिए सरकारी सेवाओं में सफलता का मुख्य आधार है। प्रतिदिन निरंतर अभ्यास करने से गति और सटीकता में सुधार होता है।`
  },
  {
    id: 'hin-cpct-2',
    title: 'हिंदी सीपीसीटी मॉडल 2 - डिजिटल साक्षरता मिशन',
    language: 'hindi',
    category: 'CPCT Official Level',
    difficulty: 'Medium',
    content: `डिजिटल साक्षरता अभियान के अंतर्गत ग्रामीण क्षेत्रों में कंप्यूटर और इंटरनेट उपयोग का प्रशिक्षण दिया जा रहा है। टाइपिंग परीक्षा में समय प्रबंधन अत्यंत आवश्यक है। सभी अभ्यर्थियों को बैकस्पेस का सीमित उपयोग करना चाहिए और ध्यान एकाग्र रखना चाहिए।`
  },
  {
    id: 'hin-cpct-3',
    title: 'हिंदी कार्यालयीन आदेश - जिला कलेक्ट्रेट शाखा',
    language: 'hindi',
    category: 'Government Office',
    difficulty: 'Hard',
    content: `कार्यालय आदेश संख्या ४५६/२०२६: जिला कलेक्टर महोदय के निर्देशानुसार समस्त शासकीय सेवकों को निर्देशित किया जाता है कि ई-फाइल प्रणाली पर प्राप्त पत्रों का निस्तारण सात कार्य दिवसों के भीतर सुनिश्चित करें। त्रुटिरहित टाइपिंग और त्वरित निष्पादन को प्राथमिकता दें।`
  }
];
