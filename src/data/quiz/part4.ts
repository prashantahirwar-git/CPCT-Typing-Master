import { QuizQuestion } from '../quizQuestions';

export const quizPart4: QuizQuestion[] = [
  {
    id: 'cpct-q151',
    category: 'Networking & Internet',
    questionEn: 'What is the length of an IPv4 address in bits?',
    questionHi: 'IPv4 एड्रेस की कुल लंबाई कितने बिट्स (Bits) होती है?',
    optionsEn: ['32 bits', '64 bits', '128 bits', '16 bits'],
    optionsHi: ['32 बिट्स', '64 बिट्स', '128 बिट्स', '16 बिट्स'],
    correctOptionIndex: 0,
    explanationEn: 'IPv4 addresses are 32-bit binary numbers divided into 4 octets separated by dots (e.g. 192.168.1.1).',
    explanationHi: 'IPv4 एड्रेस 32 बिट (4 ऑक्टेट्स) का होता है।'
  },
  {
    id: 'cpct-q152',
    category: 'Networking & Internet',
    questionEn: 'What is the length of an IPv6 address in bits?',
    questionHi: 'IPv6 एड्रेस कितने बिट्स (Bits) का होता है?',
    optionsEn: ['128 bits', '32 bits', '64 bits', '256 bits'],
    optionsHi: ['128 बिट्स', '32 बिट्स', '64 बिट्स', '256 बिट्स'],
    correctOptionIndex: 0,
    explanationEn: 'IPv6 addresses are 128-bit hexadecimal strings divided into 8 groups.',
    explanationHi: 'IPv6 एड्रेस 128 बिट का होता है जो हेक्साडेसिमल प्रारूप में लिखा जाता है।'
  },
  {
    id: 'cpct-q153',
    category: 'Networking & Internet',
    questionEn: 'Which hardware address uniquely identifies a Network Interface Card (NIC) globally?',
    questionHi: 'नेटवर्क इंटरफेस कार्ड (NIC) को विश्व स्तर पर विशिष्ट रूप से पहचानने वाला हार्डवेयर पता कौन-सा है?',
    optionsEn: ['MAC Address', 'IP Address', 'URL', 'Port Number'],
    optionsHi: ['मैक एड्रेस (MAC Address)', 'आईपी एड्रेस', 'URL', 'पोर्ट नंबर'],
    correctOptionIndex: 0,
    explanationEn: 'MAC (Media Access Control) address is a unique 48-bit physical address assigned to NIC during production.',
    explanationHi: 'MAC एड्रेस एक भौतिक 48-बिट का पता होता है जो हर NIC कार्ड में फिक्स होता है।'
  },
  {
    id: 'cpct-q154',
    category: 'Networking & Internet',
    questionEn: 'What is the size of a standard physical MAC Address in bits?',
    questionHi: 'मानक भौतिक मैक (MAC) एड्रेस का आकार कितना होता है?',
    optionsEn: ['48 bits (6 Bytes)', '32 bits', '64 bits', '128 bits'],
    optionsHi: ['48 बिट्स (6 बाइट्स)', '32 बिट्स', '64 बिट्स', '128 बिट्स'],
    correctOptionIndex: 0,
    explanationEn: 'MAC Address consists of 48 bits written as 6 pairs of hexadecimal digits (e.g., 00:1A:2B:3C:4D:5E).',
    explanationHi: 'MAC एड्रेस 48 बिट (6 बाइट) का हेक्साडेसिमल एड्रेस होता है।'
  },
  {
    id: 'cpct-q155',
    category: 'Networking & Internet',
    questionEn: 'In OSI networking reference model, how many distinct layers exist?',
    questionHi: 'OSI (Open Systems Interconnection) नेटवर्किंग मॉडल में कुल कितनी परतें (Layers) होती हैं?',
    optionsEn: ['7 layers', '4 layers', '5 layers', '6 layers'],
    optionsHi: ['7 लेयर्स', '4 लेयर्स', '5 लेयर्स', '6 लेयर्स'],
    correctOptionIndex: 0,
    explanationEn: 'OSI model contains 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
    explanationHi: 'OSI नेटवर्क मॉडल में कुल 7 लेयर्स होती हैं।'
  },
  {
    id: 'cpct-q156',
    category: 'Networking & Internet',
    questionEn: 'Which layer of OSI model handles physical cabling, electrical signals, and bit transmission?',
    questionHi: 'OSI मॉडल की कौन-सी परत केबल, विद्युत सिग्नल और बिट्स ट्रांसमिशन से संबंधित है?',
    optionsEn: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    optionsHi: ['फिजिकल लेयर (Physical Layer)', 'डेटा लिंक लेयर', 'नेटवर्क लेयर', 'ट्रांसपोर्ट लेयर'],
    correctOptionIndex: 0,
    explanationEn: 'Physical Layer (Layer 1) manages physical hardware interfaces and bit stream transmission.',
    explanationHi: 'फिजिकल लेयर OSI मॉडल की पहली (Layer 1) सबसे निचली लेयर है।'
  },
  {
    id: 'cpct-q157',
    category: 'Networking & Internet',
    questionEn: 'Which layer of OSI model is responsible for packet routing across logical IP networks?',
    questionHi: 'OSI मॉडल की कौन-सी परत डेटा पैकेट्स के राउटिंग (Routing) और IP एड्रेसिंग के लिए जिम्मेदार है?',
    optionsEn: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Session Layer'],
    optionsHi: ['नेटवर्क लेयर (Network Layer)', 'ट्रांसपोर्ट लेयर', 'डेटा लिंक लेयर', 'सेशन लेयर'],
    correctOptionIndex: 0,
    explanationEn: 'Network Layer (Layer 3) handles IP addressing and packet routing across networks.',
    explanationHi: 'नेटवर्क लेयर (Layer 3) IP एड्रेस और राउटिंग का काम संभालती है।'
  },
  {
    id: 'cpct-q158',
    category: 'Networking & Internet',
    questionEn: 'Which protocol provides secure encrypted web browsing communication over port 443?',
    questionHi: 'सुरक्षित एन्क्रिप्टेड वेब ब्राउज़िंग के लिए पोर्ट 443 पर किस प्रोटोकॉल का उपयोग होता है?',
    optionsEn: ['HTTPS', 'HTTP', 'FTP', 'SMTP'],
    optionsHi: ['HTTPS (HyperText Transfer Protocol Secure)', 'HTTP', 'FTP', 'SMTP'],
    correctOptionIndex: 0,
    explanationEn: 'HTTPS encrypts web traffic using SSL/TLS encryption over port 443.',
    explanationHi: 'HTTPS सुरक्षित वेब कम्युनिकेशन के लिए SSL/TLS तकनीक और पोर्ट 443 का प्रयोग करता है।'
  },
  {
    id: 'cpct-q159',
    category: 'Networking & Internet',
    questionEn: 'Which protocol is used specifically for sending outgoing emails across email servers?',
    questionHi: 'ईमेल सर्वर के माध्यम से आउटगोइंग ईमेल भेजने के लिए किस प्रोटोकॉल का उपयोग किया जाता है?',
    optionsEn: ['SMTP', 'POP3', 'IMAP', 'HTTP'],
    optionsHi: ['SMTP (Simple Mail Transfer Protocol)', 'POP3', 'IMAP', 'HTTP'],
    correctOptionIndex: 0,
    explanationEn: 'SMTP (Simple Mail Transfer Protocol) sends outgoing email messages.',
    explanationHi: 'SMTP का उपयोग ईमेल भेजने (Sending Emails) के लिए किया जाता है।'
  },
  {
    id: 'cpct-q160',
    category: 'Networking & Internet',
    questionEn: 'Which protocol downloads incoming emails from email server onto client device and deletes them from server by default?',
    questionHi: 'कौन सा प्रोटोकॉल सर्वर से ईमेल को लोकल डिवाइस पर डाउनलोड करके सर्वर से हटा देता है?',
    optionsEn: ['POP3', 'SMTP', 'IMAP', 'SNMP'],
    optionsHi: ['POP3 (Post Office Protocol 3)', 'SMTP', 'IMAP', 'SNMP'],
    correctOptionIndex: 0,
    explanationEn: 'POP3 (Post Office Protocol v3) downloads messages locally and removes them from server.',
    explanationHi: 'POP3 मेल डाउनलोड करने का प्रोटोकॉल है।'
  },
  {
    id: 'cpct-q161',
    category: 'Networking & Internet',
    questionEn: 'Which email protocol syncs inbox folders continuously across multiple devices simultaneously?',
    questionHi: 'विभिन्न उपकरणों (फोन, लैपटॉप) पर ईमेल इनबॉक्स को रियल-टाइम सिंक रखने वाला प्रोटोकॉल कौन-सा है?',
    optionsEn: ['IMAP', 'POP3', 'SMTP', 'FTP'],
    optionsHi: ['IMAP (Internet Message Access Protocol)', 'POP3', 'SMTP', 'FTP'],
    correctOptionIndex: 0,
    explanationEn: 'IMAP keeps messages synchronized directly on the email server across all client apps.',
    explanationHi: 'IMAP सभी डिवाइसेज पर ईमेल फोल्डर्स को सिंक रखता है।'
  },
  {
    id: 'cpct-q162',
    category: 'Networking & Internet',
    questionEn: 'Which network service translates human-friendly domain names (e.g. www.google.com) into IP addresses?',
    questionHi: 'डोमेन नेम (जैसे www.google.com) को कंप्यूटर के IP एड्रेस में बदलने वाली सेवा को क्या कहते हैं?',
    optionsEn: ['DNS (Domain Name System)', 'DHCP', 'NAT', 'ARP'],
    optionsHi: ['DNS (Domain Name System)', 'DHCP', 'NAT', 'ARP'],
    correctOptionIndex: 0,
    explanationEn: 'DNS translates domain names into numerical IP addresses needed for routing.',
    explanationHi: 'DNS (Domain Name System) वेबसाइट एड्रेस को आईपी एड्रेस में मैप करता है।'
  },
  {
    id: 'cpct-q163',
    category: 'Networking & Internet',
    questionEn: 'Which network protocol automatically assigns dynamic IP addresses to devices joining a network?',
    questionHi: 'नेटवर्क से जुड़ने वाले उपकरणों को स्वचालित रूप से IP एड्रेस आबंटित करने वाला प्रोटोकॉल कौन सा है?',
    optionsEn: ['DHCP', 'DNS', 'FTP', 'Telnet'],
    optionsHi: ['DHCP (Dynamic Host Configuration Protocol)', 'DNS', 'FTP', 'Telnet'],
    correctOptionIndex: 0,
    explanationEn: 'DHCP automatically leases IP addresses and subnet masks to network host clients.',
    explanationHi: 'DHCP नेटवर्क डिवाइसेज को स्वतः ही IP एड्रेस देता है।'
  },
  {
    id: 'cpct-q164',
    category: 'Networking & Internet',
    questionEn: 'What is the full form of URL in web address navigation?',
    questionHi: 'वेब एड्रेस में URL का पूर्ण रूप क्या होता है?',
    optionsEn: [
      'Uniform Resource Locator',
      'Universal Resource Locator',
      'Uniform Resource Link',
      'Unified Resource Locator'
    ],
    optionsHi: [
      'Uniform Resource Locator',
      'Universal Resource Locator',
      'Uniform Resource Link',
      'Unified Resource Locator'
    ],
    correctOptionIndex: 0,
    explanationEn: 'URL stands for Uniform Resource Locator.',
    explanationHi: 'URL का पूरा नाम Uniform Resource Locator है।'
  },
  {
    id: 'cpct-q165',
    category: 'Networking & Internet',
    questionEn: 'In domain extension `.gov.in`, `.gov` represents ________ and `.in` represents ________.',
    questionHi: 'डोमेन नाम एक्सटेंशन `.gov.in` में `.gov` और `.in` क्या दर्शाते हैं?',
    optionsEn: [
      'Government organization, India country code',
      'General organization, International',
      'Government office, Industry',
      'Group of Villages, Information'
    ],
    optionsHi: [
      'सरकारी संगठन (Government), भारत का कंट्री कोड (India)',
      'सामान्य संगठन, इंटरनेशनल',
      'सरकारी ऑफिस, इंडस्ट्री',
      'ग्रामीण, सूचना'
    ],
    correctOptionIndex: 0,
    explanationEn: '`.gov` indicates government entity; `.in` is country code top-level domain (ccTLD) for India.',
    explanationHi: '`.gov` सरकारी निकाय और `.in` भारत (कंट्री कोड) को दर्शाता है।'
  },
  {
    id: 'cpct-q166',
    category: 'Networking & Internet',
    questionEn: 'Network topology in which all devices are connected directly to a central Hub or Switch is called _______.',
    questionHi: 'वह नेटवर्क टोपोलॉजी जिसमें सभी कंप्यूटर एक केंद्रीय हब (Central Hub) या स्विच से जुड़े होते हैं?',
    optionsEn: ['Star Topology', 'Bus Topology', 'Ring Topology', 'Mesh Topology'],
    optionsHi: ['स्टार टोपोलॉजी (Star Topology)', 'बस टोपोलॉजी', 'रिंग टोपोलॉजी', 'मेश टोपोलॉजी'],
    correctOptionIndex: 0,
    explanationEn: 'In Star Topology, every node connects directly to a central hub/switch.',
    explanationHi: 'स्टार टोपोलॉजी में सभी नोड्स एक सेंट्रल स्विच/हब से जुड़े होते हैं।'
  },
  {
    id: 'cpct-q167',
    category: 'Networking & Internet',
    questionEn: 'Network topology in which every computer is connected directly to every other computer in the network is called _______.',
    questionHi: 'वह कौन-सी टोपोलॉजी है जिसमें प्रत्येक कंप्यूटर नेटवर्क के अन्य सभी कंप्यूटरों से सीधे जुड़ा होता है?',
    optionsEn: ['Mesh Topology', 'Star Topology', 'Bus Topology', 'Tree Topology'],
    optionsHi: ['मेश टोपोलॉजी (Mesh Topology)', 'स्टार टोपोलॉजी', 'बस टोपोलॉजी', 'ट्री टोपोलॉजी'],
    correctOptionIndex: 0,
    explanationEn: 'Mesh topology provides redundant point-to-point connections between every pair of nodes.',
    explanationHi: 'मेश टोपोलॉजी (Mesh) में सभी नोड्स आपस में एक-दूसरे से पूर्णतः जुड़े होते हैं।'
  },
  {
    id: 'cpct-q168',
    category: 'Networking & Internet',
    questionEn: 'In Bus Topology, devices are connected along a single main communication cable called ________.',
    questionHi: 'बस टोपोलॉजी (Bus Topology) में सभी कंप्यूटर एक ही मुख्य केबल से जुड़े होते हैं, उसे क्या कहते हैं?',
    optionsEn: ['Backbone cable / Bus', 'Central Switch', 'Ring Loop', 'Star Core'],
    optionsHi: ['बैकबोन केबल (Backbone Cable)', 'सेंट्रल स्विच', 'रिंग लूप', 'स्टार कोर'],
    correctOptionIndex: 0,
    explanationEn: 'Bus topology uses a single backbone cable terminated at both ends.',
    explanationHi: 'बस टोपोलॉजी में एक मुख्य केबल (Backbone) होती है।'
  },
  {
    id: 'cpct-q169',
    category: 'Networking & Internet',
    questionEn: 'What is the full form of MODEM in internet connectivity?',
    questionHi: 'इंटरनेट कनेक्टिविटी में MODEM का पूर्ण रूप क्या होता है?',
    optionsEn: [
      'Modulator Demodulator',
      'Modern Demodulator',
      'Mode Digital Encoder',
      'Module Data Transfer'
    ],
    optionsHi: [
      'Modulator Demodulator',
      'Modern Demodulator',
      'Mode Digital Encoder',
      'Module Data Transfer'
    ],
    correctOptionIndex: 0,
    explanationEn: 'MODEM stands for MOdulator-DEModulator converting digital data to analog and vice versa.',
    explanationHi: 'मोडेम (MODEM) का अर्थ Modulator Demodulator होता है।'
  },
  {
    id: 'cpct-q170',
    category: 'Networking & Internet',
    questionEn: 'Standard RJ-45 connector used on Ethernet LAN cables has how many pins?',
    questionHi: 'ईथरनेट लैन (LAN) केबल पर लगने वाले RJ-45 कनेक्टर में कितने पिन होते हैं?',
    optionsEn: ['8 pins', '4 pins', '6 pins', '10 pins'],
    optionsHi: ['8 पिन (8 pins / 8 positions)', '4 पिन', '6 पिन', '10 पिन'],
    correctOptionIndex: 0,
    explanationEn: 'RJ-45 (Registered Jack 45) connector features 8 pin positions for 4 twisted wire pairs.',
    explanationHi: 'RJ-45 कनेक्टर में 8 पिन होते हैं।'
  },
  {
    id: 'cpct-q171',
    category: 'Networking & Internet',
    questionEn: 'Which network type covers a short physical range like a single room or office building?',
    questionHi: 'एक कमरे या सिंगल ऑफिस बिल्डिंग के छोटे दायरे तक सीमित नेटवर्क को क्या कहते हैं?',
    optionsEn: ['LAN (Local Area Network)', 'WAN (Wide Area Network)', 'MAN (Metropolitan Area Network)', 'PAN'],
    optionsHi: ['LAN (Local Area Network)', 'WAN', 'MAN', 'PAN'],
    correctOptionIndex: 0,
    explanationEn: 'LAN spans small physical areas like homes, offices, or schools.',
    explanationHi: 'LAN (Local Area Network) छोटे भौगोलिक क्षेत्र तक सीमित नेटवर्क है।'
  },
  {
    id: 'cpct-q172',
    category: 'Networking & Internet',
    questionEn: 'Internet is the best global example of which network classification?',
    questionHi: 'इंटरनेट (Internet) किस प्रकार के नेटवर्क का सबसे बड़ा वैश्विक उदाहरण है?',
    optionsEn: ['WAN (Wide Area Network)', 'LAN', 'MAN', 'PAN'],
    optionsHi: ['WAN (Wide Area Network)', 'LAN', 'MAN', 'PAN'],
    correctOptionIndex: 0,
    explanationEn: 'The Internet is a globally interconnected Wide Area Network (WAN).',
    explanationHi: 'इंटरनेट दुनिया का सबसे बड़ा WAN (Wide Area Network) है।'
  },
  {
    id: 'cpct-q173',
    category: 'Networking & Internet',
    questionEn: 'Bluetooth communication operates over which network classification range?',
    questionHi: 'ब्लूटूथ (Bluetooth) कनेक्टिविटी किस नेटवर्क श्रेणी के अंतर्गत आती है?',
    optionsEn: ['PAN (Personal Area Network)', 'LAN', 'MAN', 'WAN'],
    optionsHi: ['PAN (Personal Area Network)', 'LAN', 'MAN', 'WAN'],
    correctOptionIndex: 0,
    explanationEn: 'Bluetooth creates a Personal Area Network (PAN) spanning ~10 meters.',
    explanationHi: 'ब्लूटूथ PAN (Personal Area Network) का उदाहरण है जिसकी रेंज 10 मीटर के आसपास होती है।'
  },
  {
    id: 'cpct-q174',
    category: 'Networking & Internet',
    questionEn: 'In a network, ________ measures the time delay for data packets to travel to their destination.',
    questionHi: 'नेटवर्क में, __________ डेटा पैकेट को गंतव्य तक पहुंचने में लगने वाले समय (विलंब) को मापता है।',
    optionsEn: ['Network Latency', 'Bandwidth', 'Frequency', 'Throughput'],
    optionsHi: ['नेटवर्क लेटेंसी (Network Latency)', 'बैंडविड्थ', 'फ्रिक्वेंसी', 'थ्रूपुट'],
    correctOptionIndex: 0,
    explanationEn: 'Latency measures round-trip time delay in packet transmission.',
    explanationHi: 'लेटेंसी डेटा पैकेट्स के स्थानांतरण में होने वाले विलंब समय को मापती है।'
  },
  {
    id: 'cpct-q175',
    category: 'Networking & Internet',
    questionEn: 'Maximum volume of data that can be transmitted across a network connection in a given time is called _______.',
    questionHi: 'किसी नेटवर्क लिंक से प्रति सेकंड स्थानांतरित होने वाले अधिकतम डेटा वॉल्यूम को क्या कहा जाता है?',
    optionsEn: ['Bandwidth', 'Latency', 'Ping', 'Attenuation'],
    optionsHi: ['बैंडविड्थ (Bandwidth)', 'लेटेंसी', 'पिंग', 'एटेन्यूएशन'],
    correctOptionIndex: 0,
    explanationEn: 'Bandwidth represents maximum data capacity of a network line (e.g. 100 Mbps).',
    explanationHi: 'बैंडविड्थ (Bandwidth) नेटवर्क कनेक्शन की डेटा ट्रांसफर क्षमता है।'
  },
  {
    id: 'cpct-q176',
    category: 'Networking & Internet',
    questionEn: 'Loss of signal strength as data travels through network cabling over long distance is called ________.',
    questionHi: 'दूरी बढ़ने पर केबल में सिग्नल की शक्ति में होने वाली कमी (Signal Loss) को क्या कहा जाता है?',
    optionsEn: ['Attenuation', 'Amplification', 'Modulation', 'Distortion'],
    optionsHi: ['एटेन्यूएशन (Attenuation)', 'एम्प्लीफिकेशन', 'मॉड्यूलेशन', 'डिस्टॉर्शन'],
    correctOptionIndex: 0,
    explanationEn: 'Attenuation is the gradual loss in signal intensity along communication media.',
    explanationHi: 'एटेन्यूएशन दूरी बढ़ने पर सिग्नल की क्षमता घटने की प्रक्रिया है।'
  },
  {
    id: 'cpct-q177',
    category: 'Networking & Internet',
    questionEn: 'Which network device regenerates and amplifies weak attenuated signals to extend network length?',
    questionHi: 'कमजोर सिग्नल को रीгенеरेट और एम्प्लीफाई करके आगे बढ़ाने वाले नेटवर्क डिवाइस को क्या कहते हैं?',
    optionsEn: ['Repeater', 'Hub', 'Bridge', 'Gateway'],
    optionsHi: ['रिपीटर (Repeater)', 'हब', 'ब्रिज', 'गेटवे'],
    correctOptionIndex: 0,
    explanationEn: 'Repeaters receive weak incoming signals, regenerate clean copies, and retransmit them.',
    explanationHi: 'रिपीटर सिग्नल की क्षमता दोबारा बढ़ाकर लंबी दूरी तक भेजता है।'
  },
  {
    id: 'cpct-q178',
    category: 'Networking & Internet',
    questionEn: 'Which command prompt utility tests network connectivity and latency to a target server IP address?',
    questionHi: 'कमांड प्रॉम्प्ट में किसी सर्वर से कनेक्टिविटी जांचने के लिए किस कमांड का उपयोग होता है?',
    optionsEn: ['ping', 'ipconfig', 'tracert', 'nslookup'],
    optionsHi: ['ping', 'ipconfig', 'tracert', 'nslookup'],
    correctOptionIndex: 0,
    explanationEn: '`ping` sends ICMP echo requests to verify remote server reachability and latency.',
    explanationHi: 'ping कमांड नेटवर्क कनेक्टिविटी चेक करती है।'
  },
  {
    id: 'cpct-q179',
    category: 'Networking & Internet',
    questionEn: 'In Windows Command Prompt, which command displays local IP address, Subnet Mask, and Default Gateway details?',
    questionHi: 'Windows कमांड प्रॉम्प्ट में स्थानीय कंप्यूटर के IP एड्रेस और नेटवर्क सेटिंग्स देखने के लिए क्या टाइप किया जाता है?',
    optionsEn: ['ipconfig', 'ifconfig', 'netstat', 'ping'],
    optionsHi: ['ipconfig', 'ifconfig (Linux)', 'netstat', 'ping'],
    correctOptionIndex: 0,
    explanationEn: '`ipconfig` shows network interface configuration details in Windows.',
    explanationHi: 'ipconfig विंडो पर वर्तमान नेटवर्क IP डिटेल्स प्रदर्शित करता है।'
  },
  {
    id: 'cpct-q180',
    category: 'Networking & Internet',
    questionEn: 'In Linux terminal, which command displays IP configuration settings?',
    questionHi: 'Linux टर्मिनल में नेटवर्क इंटरफेस का IP एड्रेस देखने के लिए किस कमांड का उपयोग किया जाता है?',
    optionsEn: ['ifconfig or ip a', 'ipconfig', 'netstat', 'ping'],
    optionsHi: ['ifconfig या ip a', 'ipconfig', 'netstat', 'ping'],
    correctOptionIndex: 0,
    explanationEn: '`ifconfig` or `ip addr` displays network interface details in Unix/Linux.',
    explanationHi: 'Linux में ifconfig कमांड द्वारा IP देखा जाता है।'
  },
  {
    id: 'cpct-q181',
    category: 'Networking & Internet',
    questionEn: 'What is the full form of HTML in web page authoring?',
    questionHi: 'वेब पेज डिजाइनिंग में HTML का पूरा नाम क्या होता है?',
    optionsEn: [
      'HyperText Markup Language',
      'HyperText Machine Language',
      'Hyperlink Text Management Language',
      'HighText Transfer Markup Language'
    ],
    optionsHi: [
      'HyperText Markup Language',
      'HyperText Machine Language',
      'Hyperlink Text Management Language',
      'HighText Transfer Markup Language'
    ],
    correctOptionIndex: 0,
    explanationEn: 'HTML stands for HyperText Markup Language.',
    explanationHi: 'HTML का पूरा नाम HyperText Markup Language होता है।'
  },
  {
    id: 'cpct-q182',
    category: 'Networking & Internet',
    questionEn: 'Which tag is used to insert a hyperlink in HTML?',
    questionHi: 'HTML में हाइपरलिंक (Hyperlink) बनाने के लिए किस टैग का उपयोग किया जाता है?',
    optionsEn: ['<a>', '<link>', '<href>', '<url>'],
    optionsHi: ['<a> (Anchor Tag)', '<link>', '<href>', '<url>'],
    correctOptionIndex: 0,
    explanationEn: 'The `<a>` (Anchor) tag with `href` attribute creates hyperlinks in HTML pages.',
    explanationHi: 'HTML में <a> टैग द्वारा लिंक जोड़ा जाता है।'
  },
  {
    id: 'cpct-q183',
    category: 'Networking & Internet',
    questionEn: 'Small text files saved on user web browser by websites to store user preferences and login sessions are called _______.',
    questionHi: 'वेबसाइटों द्वारा यूज़र सेशन और प्राथमिकताओं को सहेजने के लिए ब्राउज़र में सेव की जाने वाली छोटी फाइलों को क्या कहते हैं?',
    optionsEn: ['Cookies', 'Cache', 'History', 'Bookmarks'],
    optionsHi: ['कुकीज़ (Cookies)', 'कैश', 'हिस्ट्री', 'बुकमार्क'],
    correctOptionIndex: 0,
    explanationEn: 'Cookies store session state and preferences locally inside user browser storage.',
    explanationHi: 'कुकीज़ (Cookies) वेबसाइट द्वारा यूजर डेटा याद रखने वाली छोटी टेक्स्ट फाइलें होती हैं।'
  },
  {
    id: 'cpct-q184',
    category: 'Networking & Internet',
    questionEn: 'Which open source web browser was developed by Mozilla Foundation?',
    questionHi: 'मोज़िला फाउंडेशन द्वारा विकसित किया गया प्रसिद्ध ओपन सोर्स वेब ब्राउज़र कौन सा है?',
    optionsEn: ['Firefox', 'Chrome', 'Safari', 'Edge'],
    optionsHi: ['फ़ायरफ़ॉक्स (Mozilla Firefox)', 'क्रोम', 'सफारी', 'एज'],
    correctOptionIndex: 0,
    explanationEn: 'Mozilla Firefox is a popular free open-source web browser.',
    explanationHi: 'मोज़िला फ़ायरफ़ॉक्स एक ओपन सोर्स वेब ब्राउज़र है।'
  },
  {
    id: 'cpct-q185',
    category: 'Networking & Internet',
    questionEn: 'Chromium open-source project forms the base engine for which web browser?',
    questionHi: 'गूगल क्रोम (Google Chrome) और एमएस एज (MS Edge) किस ओपन-सोर्स प्रोजेक्ट पर आधारित हैं?',
    optionsEn: ['Chromium', 'WebKit', 'Gecko', 'Trident'],
    optionsHi: ['क्रोमियम (Chromium Project)', 'वेबकिट', 'गेको', 'ट्राइडेंट'],
    correctOptionIndex: 0,
    explanationEn: 'Chromium is the open-source browser codebase powering Chrome, Edge, Brave, and Opera.',
    explanationHi: 'क्रोमियम ओपेन सोर्स प्रोजेक्ट गूगल क्रोम का आधार है।'
  },
  {
    id: 'cpct-q186',
    category: 'Networking & Internet',
    questionEn: 'Which key is used to enter Full Screen mode in most web browsers like Google Chrome?',
    questionHi: 'गूगल क्रोम में वेबसाइट को फुल स्क्रीन (Full Screen) मोड में देखने के लिए कौन-सी कुंजी दबाई जाती है?',
    optionsEn: ['F11', 'F5', 'F12', 'Esc'],
    optionsHi: ['F11', 'F5', 'F12', 'Esc'],
    correctOptionIndex: 0,
    explanationEn: 'Pressing F11 toggles web browser Full Screen view mode.',
    explanationHi: 'F11 कुंजी दबाने से वेब ब्राउज़र फुल स्क्रीन हो जाता है।'
  },
  {
    id: 'cpct-q187',
    category: 'Networking & Internet',
    questionEn: 'Which shortcut opens Developer Tools console in Google Chrome?',
    questionHi: 'गूगल क्रोम में डेवलपर टूल्स (Developer Tools) खोलने की कुंजी क्या है?',
    optionsEn: ['F12 or Ctrl + Shift + I', 'F11', 'Ctrl + Shift + D', 'F7'],
    optionsHi: ['F12 या Ctrl + Shift + I', 'F11', 'Ctrl + Shift + D', 'F7'],
    correctOptionIndex: 0,
    explanationEn: 'F12 or `Ctrl + Shift + I` opens browser Developer Console inspect window.',
    explanationHi: 'F12 दबाने पर डेवलपर टूल्स कंसोल खुलता है।'
  },
  {
    id: 'cpct-q188',
    category: 'Networking & Internet',
    questionEn: 'Which protocol allows secure remote terminal CLI login access to servers over port 22?',
    questionHi: 'पोर्ट 22 पर रिमोट सर्वर में एन्क्रिप्टेड टर्मिनल लॉगिन एक्सेस देने वाला प्रोटोकॉल कौन सा है?',
    optionsEn: ['SSH (Secure Shell)', 'Telnet', 'FTP', 'RDP'],
    optionsHi: ['SSH (Secure Shell)', 'टैलनेट (Telnet)', 'FTP', 'RDP'],
    correctOptionIndex: 0,
    explanationEn: 'SSH (Secure Shell) provides encrypted command-line server access over port 22.',
    explanationHi: 'SSH पोर्ट 22 पर रिमोट सर्वर का सुरक्षित कमांड-लाइन एक्सेस देता है।'
  },
  {
    id: 'cpct-q189',
    category: 'Networking & Internet',
    questionEn: 'Legacy unencrypted remote terminal protocol operating over port 23 is _______.',
    questionHi: 'पोर्ट 23 पर चलने वाला पुराना असुरक्षित अन-एन्क्रिप्टेड रिमोट टर्मिनल प्रोटोकॉल कौन-सा है?',
    optionsEn: ['Telnet', 'SSH', 'SFTP', 'HTTP'],
    optionsHi: ['टैलनेट (Telnet)', 'SSH', 'SFTP', 'HTTP'],
    correctOptionIndex: 0,
    explanationEn: 'Telnet transmits plain text commands over port 23 without encryption.',
    explanationHi: 'टैलनेट (Telnet) बिना एन्क्रिप्शन के डेटा भेजता है इसलिए यह असुरक्षित है।'
  },
  {
    id: 'cpct-q190',
    category: 'Networking & Internet',
    questionEn: 'What is the full form of FTP in internet file transfer?',
    questionHi: 'इंटरनेट पर फाइल ट्रांसफर करने के लिए उपयोग होने वाले FTP का पूर्ण रूप क्या है?',
    optionsEn: [
      'File Transfer Protocol',
      'Fast Transfer Protocol',
      'Folder Transfer Program',
      'File Terminal Protocol'
    ],
    optionsHi: [
      'File Transfer Protocol',
      'Fast Transfer Protocol',
      'Folder Transfer Program',
      'File Terminal Protocol'
    ],
    correctOptionIndex: 0,
    explanationEn: 'FTP stands for File Transfer Protocol (uses ports 20 and 21).',
    explanationHi: 'FTP का पूरा नाम File Transfer Protocol है।'
  },
  {
    id: 'cpct-q191',
    category: 'Networking & Internet',
    questionEn: 'Which cloud service delivery model provides virtualized infrastructure like virtual servers and storage over internet?',
    questionHi: 'क्लाउड कंप्यूटिंग का कौन सा मॉडल वर्चुअल सर्वर और स्टोरेज जैसी आधारभूत संरचना प्रदान करता है?',
    optionsEn: ['IaaS (Infrastructure as a Service)', 'PaaS', 'SaaS', 'DaaS'],
    optionsHi: ['IaaS (Infrastructure as a Service)', 'PaaS', 'SaaS', 'DaaS'],
    correctOptionIndex: 0,
    explanationEn: 'IaaS (e.g. AWS EC2, Google Cloud Compute) provides virtualized raw computing infrastructure.',
    explanationHi: 'IaaS वर्चुअल सर्वर और स्टोरेज इंफ्रास्ट्रक्चर सेवा के रूप में प्रदान करता है।'
  },
  {
    id: 'cpct-q192',
    category: 'Networking & Internet',
    questionEn: 'Google Docs and Gmail are prime examples of which cloud computing service model?',
    questionHi: 'गूगल डॉक्स (Google Docs) और जीमेल (Gmail) किस क्लाउड सर्विस मॉडल के उदाहरण हैं?',
    optionsEn: ['SaaS (Software as a Service)', 'PaaS', 'IaaS', 'BaaS'],
    optionsHi: ['SaaS (Software as a Service)', 'PaaS', 'IaaS', 'BaaS'],
    correctOptionIndex: 0,
    explanationEn: 'SaaS applications deliver fully functional software directly over web browsers.',
    explanationHi: 'SaaS के तहत सीधे वेब ब्राउज़र पर सॉफ्टवेयर की सुविधा उपलब्ध होती है।'
  },
  {
    id: 'cpct-q193',
    category: 'Networking & Internet',
    questionEn: 'What is the loopback IP address assigned to test local computer network protocol stack?',
    questionHi: 'लोकल कंप्यूटर के नेटवर्क प्रोटोकॉल स्टैक की जांच के लिए लूपबैक (Loopback) IP एड्रेस क्या होता है?',
    optionsEn: ['127.0.0.1', '192.168.1.1', '10.0.0.1', '255.255.255.255'],
    optionsHi: ['127.0.0.1 (Localhost)', '192.168.1.1', '10.0.0.1', '255.255.255.255'],
    correctOptionIndex: 0,
    explanationEn: '127.0.0.1 is the IPv4 loopback address pointing back to current host machine.',
    explanationHi: '127.0.0.1 लूपबैक IP एड्रेस (Localhost) कहलाता है।'
  },
  {
    id: 'cpct-q194',
    category: 'Networking & Internet',
    questionEn: 'Default Subnet Mask for Class A IPv4 address is ________.',
    questionHi: 'क्लास A (Class A) IPv4 एड्रेस का डिफ़ॉल्ट सबनेट मास्क क्या होता है?',
    optionsEn: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
    optionsHi: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
    correctOptionIndex: 0,
    explanationEn: 'Class A default mask is 255.0.0.0 (/8). Class B is 255.255.0.0 (/16). Class C is 255.255.255.0 (/24).',
    explanationHi: 'क्लास A सबनेट मास्क 255.0.0.0 होता है।'
  },
  {
    id: 'cpct-q195',
    category: 'Networking & Internet',
    questionEn: 'Default Subnet Mask for Class C IPv4 address is ________.',
    questionHi: 'क्लास C (Class C) IPv4 एड्रेस का डिफ़ॉल्ट सबनेट मास्क क्या होता है?',
    optionsEn: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.255'],
    optionsHi: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.255'],
    correctOptionIndex: 0,
    explanationEn: 'Class C subnet mask is 255.255.255.0 (/24) providing up to 254 usable host addresses.',
    explanationHi: 'क्लास C का सबनेट मास्क 255.255.255.0 होता है।'
  },
  {
    id: 'cpct-q196',
    category: 'Networking & Internet',
    questionEn: 'Which tool in Windows traces routing hops taken by data packets to reach a destination server?',
    questionHi: 'डेटा पैकेट द्वारा गंतव्य सर्वर तक पहुँचने में लिए गए सभी नेटवर्क राउटर्स (Hops) की सूची दिखाने वाली कमांड कौन सी है?',
    optionsEn: ['tracert', 'traceroute', 'ping', 'route'],
    optionsHi: ['tracert (Traceroute)', 'ping', 'route', 'nslookup'],
    correctOptionIndex: 0,
    explanationEn: '`tracert` utility in Windows tracks packet route and hop counts to destination.',
    explanationHi: 'tracert कमांड पैकेट द्वारा लिए गए सभी राउटर्स का मार्ग ट्रैक करती है।'
  },
  {
    id: 'cpct-q197',
    category: 'Networking & Internet',
    questionEn: 'What is the full form of VoIP technology used in internet calls?',
    questionHi: 'इंटरनेट कॉल के लिए उपयोग की जाने वाली VoIP तकनीक का पूर्ण रूप क्या है?',
    optionsEn: [
      'Voice over Internet Protocol',
      'Voice over Integrated Protocol',
      'Video over Internet Protocol',
      'Voice over Internal Provider'
    ],
    optionsHi: [
      'Voice over Internet Protocol',
      'Voice over Integrated Protocol',
      'Video over Internet Protocol',
      'Voice over Internal Provider'
    ],
    correctOptionIndex: 0,
    explanationEn: 'VoIP stands for Voice over Internet Protocol enabling voice calls over IP data networks.',
    explanationHi: 'VoIP का पूरा नाम Voice over Internet Protocol है।'
  },
  {
    id: 'cpct-q198',
    category: 'Networking & Internet',
    questionEn: 'Search Engine indexing robot that scans the web continuously to discover new web pages is called ________.',
    questionHi: 'सर्च इंजन का वह रोबोट जो वेब पेजों को लगातार स्कैन करके नया डेटा खोजता है, क्या कहलाता है?',
    optionsEn: ['Spider / Crawler', 'Botnet', 'Keylogger', 'Proxy'],
    optionsHi: ['स्पाइडर / वेब क्रॉलर (Web Crawler)', 'बॉटनेट', 'की-लॉगर', 'प्रॉक्सी'],
    correctOptionIndex: 0,
    explanationEn: 'Web crawlers/spiders follow links to index newly published web content for search engines.',
    explanationHi: 'वेब क्रॉलर (Spider/Crawler) सर्च इंजन के लिए नए वेब पेज ढूंढता है।'
  },
  {
    id: 'cpct-q199',
    category: 'Networking & Internet',
    questionEn: 'Internet security protocol SSL stands for ________.',
    questionHi: 'सुरक्षित इंटरनेट संचार में उपयोग होने वाले SSL का पूरा नाम क्या है?',
    optionsEn: [
      'Secure Sockets Layer',
      'Secure Service Layer',
      'System Security Layer',
      'Secure Socket Link'
    ],
    optionsHi: [
      'Secure Sockets Layer',
      'Secure Service Layer',
      'System Security Layer',
      'Secure Socket Link'
    ],
    correctOptionIndex: 0,
    explanationEn: 'SSL stands for Secure Sockets Layer (now upgraded to TLS).',
    explanationHi: 'SSL का अर्थ Secure Sockets Layer है।'
  },
  {
    id: 'cpct-q200',
    category: 'Networking & Internet',
    questionEn: 'An intermediary server that forwards requests between internal clients and external web servers is called a _______ server.',
    questionHi: 'क्लाइंट और बाहरी सर्वर के बीच मध्यस्थ के रूप में कार्य करने वाले सर्वर को क्या कहते हैं?',
    optionsEn: ['Proxy Server', 'DNS Server', 'DHCP Server', 'Mail Server'],
    optionsHi: ['प्रॉक्सी सर्वर (Proxy Server)', 'DNS सर्वर', 'DHCP सर्वर', 'मेल सर्वर'],
    correctOptionIndex: 0,
    explanationEn: 'Proxy servers sit between users and internet to filter traffic, hide origin IP, or cache content.',
    explanationHi: 'प्रॉक्सी सर्वर यूजर और इंटरनेट के बीच मध्यस्थ (Middleman) के रूप में कार्य करता है।'
  }
];
