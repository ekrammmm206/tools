import { DocumentState } from '../types/company';

// Pre-generated SVG portraits for sharp, vector-quality statutory portrait photo placeholders
export const AVATAR_SVGS: Record<string, string> = {
  woman1: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' width='100' height='120'>
    <rect width='100' height='120' fill='%23f4f1ea'/>
    <circle cx='50' cy='42' r='20' fill='%23e6b89c'/>
    <path d='M30 42 C 30 22 70 22 70 42 C 68 55 60 62 50 62 C 40 62 32 55 30 42 Z' fill='%232c2523'/>
    <path d='M32 38 C 35 25 65 25 68 38 C 65 30 35 30 32 38 Z' fill='%231a1514'/>
    <!-- Saree / Formal Attire -->
    <path d='M20 120 L28 72 C 32 68 68 68 72 72 L80 120 Z' fill='%238b1e2a'/>
    <path d='M36 74 L50 96 L64 74' fill='%23d4af37' stroke='%23b8860b' stroke-width='1'/>
    <circle cx='50' cy='36' r='1.5' fill='%23a11d20'/>
    <circle cx='43' cy='42' r='1.5' fill='%23333'/>
    <circle cx='57' cy='42' r='1.5' fill='%23333'/>
    <path d='M47 50 Q50 53 53 50' stroke='%23a85858' stroke-width='1.2' fill='none'/>
  </svg>`,
  woman2: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' width='100' height='120'>
    <rect width='100' height='120' fill='%23f8fafc'/>
    <circle cx='50' cy='42' r='19' fill='%23f1c29b'/>
    <path d='M28 35 C 28 18 72 18 72 35 C 72 58 64 64 50 64 C 36 64 28 58 28 35 Z' fill='%231e293b'/>
    <!-- Blazer -->
    <path d='M20 120 L28 70 C 35 66 65 66 72 70 L80 120 Z' fill='%231e3a5f'/>
    <path d='M42 70 L50 90 L58 70' fill='%23ffffff'/>
    <circle cx='44' cy='43' r='1.5' fill='%23333'/>
    <circle cx='56' cy='43' r='1.5' fill='%23333'/>
    <path d='M47 51 Q50 53 53 51' stroke='%23bd5353' stroke-width='1.2' fill='none'/>
  </svg>`,
  man1: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' width='100' height='120'>
    <rect width='100' height='120' fill='%23eef2f6'/>
    <!-- Head & Neck -->
    <path d='M44 56 L44 72 L56 72 L56 56 Z' fill='%23d9a57c'/>
    <ellipse cx='50' cy='42' rx='18' ry='22' fill='%23e2b28c'/>
    <!-- Hair -->
    <path d='M30 36 C 30 20 70 20 70 36 C 70 26 62 20 50 20 C 38 20 30 26 30 36 Z' fill='%23222'/>
    <!-- Suit -->
    <path d='M16 120 L24 70 C 34 66 66 66 76 70 L84 120 Z' fill='%231e293b'/>
    <!-- Shirt & Tie -->
    <path d='M42 68 L50 82 L58 68 Z' fill='%23ffffff'/>
    <path d='M48 72 L52 72 L53 100 L47 100 Z' fill='%23a91d22'/>
    <!-- Face details -->
    <circle cx='43' cy='41' r='1.5' fill='%23222'/>
    <circle cx='57' cy='41' r='1.5' fill='%23222'/>
    <path d='M48 48 Q50 49 52 48' stroke='%23333' stroke-width='1' fill='none'/>
    <path d='M46 54 Q50 56 54 54' stroke='%23884433' stroke-width='1' fill='none'/>
  </svg>`,
  man2: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' width='100' height='120'>
    <rect width='100' height='120' fill='%23f1f5f9'/>
    <path d='M44 56 L44 72 L56 72 L56 56 Z' fill='%23cca078'/>
    <ellipse cx='50' cy='42' rx='19' ry='22' fill='%23d7ab83'/>
    <!-- Hair with graying temples -->
    <path d='M29 36 C 29 18 71 18 71 36 C 68 26 50 22 32 30 Z' fill='%23475569'/>
    <!-- Glasses -->
    <rect x='37' y='38' width='10' height='7' rx='1' fill='none' stroke='%23334155' stroke-width='1.2'/>
    <rect x='53' y='38' width='10' height='7' rx='1' fill='none' stroke='%23334155' stroke-width='1.2'/>
    <path d='M47 41 L53 41' stroke='%23334155' stroke-width='1.2'/>
    <!-- Suit -->
    <path d='M16 120 L24 70 C 34 66 66 66 76 70 L84 120 Z' fill='%23334155'/>
    <path d='M42 68 L50 82 L58 68 Z' fill='%23ffffff'/>
    <path d='M48 72 L52 72 L53 100 L47 100 Z' fill='%232563eb'/>
    <circle cx='42' cy='41' r='1.3' fill='%231e293b'/>
    <circle cx='58' cy='41' r='1.3' fill='%231e293b'/>
    <path d='M46 54 Q50 56 54 54' stroke='%23773322' stroke-width='1' fill='none'/>
  </svg>`,
  man3: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' width='100' height='120'>
    <rect width='100' height='120' fill='%23f8fafc'/>
    <path d='M44 56 L44 72 L56 72 L56 56 Z' fill='%23dfaa84'/>
    <ellipse cx='50' cy='42' rx='18' ry='22' fill='%23e6b692'/>
    <path d='M30 35 C 30 20 70 20 70 35 C 70 24 60 21 50 21 C 40 21 30 24 30 35 Z' fill='%2318181b'/>
    <!-- Formal Sherwani / Blazer -->
    <path d='M16 120 L24 70 C 34 66 66 66 76 70 L84 120 Z' fill='%23064e3b'/>
    <path d='M44 68 L50 80 L56 68 Z' fill='%23ffffff'/>
    <path d='M49 70 L51 70 L51 120 L49 120 Z' fill='%23d97706'/>
    <!-- Mustache -->
    <path d='M43 51 Q50 49 57 51 Q50 54 43 51 Z' fill='%23222'/>
    <circle cx='43' cy='40' r='1.5' fill='%23222'/>
    <circle cx='57' cy='40' r='1.5' fill='%23222'/>
  </svg>`
};

export const DEFAULT_DOCUMENT_STATE: DocumentState = {
  company: {
    companyName: 'The Royal Nirman Ltd',
    presenterName: 'Md. Abdul Hye',
    presenterDesignation: 'Managing Director',
    presenterAddress: 'House- 56/3, Lake Cirkus, Dhannondi, Newmarket, Dhaka, Post: 1205',
    date: '25- Oct- 26',
    filingFee: 'Tk. 200/-',
    authorizedCapital: 100000000,
    faceValuePerShare: 10,
    numberingSystem: 'international',
    regOfficeLocation: 'Dhaka, Bangladesh'
  },
  directors: [
    {
      id: 'dir-1',
      name: 'Sultana Rahman',
      address: 'House No-174, Modhu Bazar, West Dhanmondi, Dhaka',
      description: 'Business',
      signatureText: 'Sultana Rahman'
    },
    {
      id: 'dir-2',
      name: 'Md. Abdul Hye',
      address: 'House-56/3, Lake Cirkus, Dhanmondi, Newmarket, Dhaka, Post: 1205',
      description: 'Business',
      signatureText: 'Md. Abdul Hye'
    },
    {
      id: 'dir-3',
      name: 'Sonia Ibnat Dina',
      address: 'House-74, Road-12/A, West Dhanmondi, Hazaribag Park, Dhaka-1209',
      description: 'Business',
      signatureText: 'Sonia Ibnat Dina'
    },
    {
      id: 'dir-4',
      name: 'Kartick Chandra Paul',
      address: '26/D/2, Haji Afsar Uddin Road, Jikatola, Dhanmondi, Dhaka-1209',
      description: 'Business',
      signatureText: 'Kartick Chandra Paul'
    },
    {
      id: 'dir-5',
      name: 'Md Akharul Islam',
      address: '357/1, Kuwet Mosjid, Ahmmadnagar, Mirpur-1216',
      description: 'Business',
      signatureText: 'Md Akharul Islam'
    }
  ],
  subscribers: [
    {
      id: 'sub-1',
      name: 'Sultana Rahman',
      role: 'Chairman',
      address: 'House No-174, Modhu Bazar, West Dhanmondi, Dhaka',
      father: 'Md. Fazlur Rahman',
      mother: 'Kamrunnesa',
      dob: '08-Aug-62',
      email: 'sultana.rahman@royalnirman.com',
      phone: '+8801712521847',
      tin: '782377809107',
      nationality: 'Bangladeshi',
      nid: '86962096861000000',
      shares: 1000000,
      avatarStyle: 'woman1',
      signatureText: 'Sultana'
    },
    {
      id: 'sub-2',
      name: 'Md. Abdul Hye',
      role: 'Managing Director',
      address: 'House-56/3, Lake Cirkus, Dhanmondi, Newmarket, Dhaka, Post: 1205',
      father: 'Abdul Hakim Sarkar',
      mother: 'Zobaida Begum',
      dob: '25-Sep-71',
      email: 'abdul.hye@royalnirman.com',
      phone: '+8801788064683',
      tin: '731136670858',
      nationality: 'Bangladeshi',
      nid: '50738337731000000',
      shares: 1000000,
      avatarStyle: 'man1',
      signatureText: 'Abdul Hye'
    },
    {
      id: 'sub-3',
      name: 'Sonia Ibnat Dina',
      role: 'Director',
      address: 'House-74, Road-12/A, West Dhanmondi, Hazaribag Park, Dhaka-1209',
      father: 'Gohor Ali Khan',
      mother: 'Mohim Khatun',
      dob: '29/12/1991',
      email: 'sonia.dina@royalnirman.com',
      phone: '+8801858107102',
      tin: '298671326396',
      nationality: 'Bangladeshi',
      nid: '82291014831000000',
      shares: 1000000,
      avatarStyle: 'woman2',
      signatureText: 'Sonia'
    },
    {
      id: 'sub-4',
      name: 'Kartick Chandra Paul',
      role: 'Director',
      address: '26/D/2, Haji Afsar Uddin Road, Jikatola, Dhanmondi, Dhaka-1209',
      father: 'Nanda Dulal Paul',
      mother: 'Bakul Rani Paul',
      dob: '16/12/1969',
      email: 'kartick.paul@royalnirman.com',
      phone: '+8801751477466',
      tin: '582178882689',
      nationality: 'Bangladeshi',
      nid: '5545801135',
      shares: 1000000,
      avatarStyle: 'man2',
      signatureText: 'Kartick'
    },
    {
      id: 'sub-5',
      name: 'Md Akharul Islam',
      role: 'Director',
      address: '357/1, Kuwet Mosjid, Ahmmadnagar, Mirpur-1216',
      father: 'Md. Jahanuddin',
      mother: 'Khairunnesa',
      dob: '18/10/1972',
      email: 'akharul.islam@royalnirman.com',
      phone: '+8801713850224',
      tin: '115445945019',
      nationality: 'Bangladeshi',
      nid: '4157165384',
      shares: 1000000,
      avatarStyle: 'man3',
      signatureText: 'Akharul'
    },
    {
      id: 'sub-6',
      name: 'Sagir Rahman',
      role: 'Director',
      address: '174, Modhubazar, West Dhanmondi, Jighatola, Dhanmondi, Dhaka-1209',
      father: 'Rafik Rahman',
      mother: 'Sultana Rahman',
      dob: '11/09/1989',
      email: 'sagir.rahman@royalnirman.com',
      phone: '+8801984432041',
      tin: '976698943211',
      nationality: 'Bangladeshi',
      nid: '9146132817',
      shares: 1000000,
      avatarStyle: 'man1',
      signatureText: 'Sagir'
    },
    {
      id: 'sub-7',
      name: 'Sagir Rahman (Holding Unit 2)',
      role: 'Director',
      address: '174, Modhubazar, West Dhanmondi, Jighatola, Dhanmondi, Dhaka-1209',
      father: 'Rafik Rahman',
      mother: 'Sultana Rahman',
      dob: '11/09/1989',
      email: 'sagir.rahman@royalnirman.com',
      phone: '+8801984432041',
      tin: '976698943211',
      nationality: 'Bangladeshi',
      nid: '9146132817',
      shares: 1000000,
      avatarStyle: 'man1',
      signatureText: 'Sagir'
    },
    {
      id: 'sub-8',
      name: 'Sagir Rahman (Holding Unit 3)',
      role: 'Director',
      address: '174, Modhubazar, West Dhanmondi, Jighatola, Dhanmondi, Dhaka-1209',
      father: 'Rafik Rahman',
      mother: 'Sultana Rahman',
      dob: '11/09/1989',
      email: 'sagir.rahman@royalnirman.com',
      phone: '+8801984432041',
      tin: '976698943211',
      nationality: 'Bangladeshi',
      nid: '9146132817',
      shares: 1000000,
      avatarStyle: 'man1',
      signatureText: 'Sagir'
    },
    {
      id: 'sub-9',
      name: 'Sagir Rahman (Holding Unit 4)',
      role: 'Director',
      address: '174, Modhubazar, West Dhanmondi, Jighatola, Dhanmondi, Dhaka-1209',
      father: 'Rafik Rahman',
      mother: 'Sultana Rahman',
      dob: '11/09/1989',
      email: 'sagir.rahman@royalnirman.com',
      phone: '+8801984432041',
      tin: '976698943211',
      nationality: 'Bangladeshi',
      nid: '9146132817',
      shares: 1000000,
      avatarStyle: 'man1',
      signatureText: 'Sagir'
    },
    {
      id: 'sub-10',
      name: 'Sagir Rahman (Holding Unit 5)',
      role: 'Director',
      address: '174, Modhubazar, West Dhanmondi, Jighatola, Dhanmondi, Dhaka-1209',
      father: 'Rafik Rahman',
      mother: 'Sultana Rahman',
      dob: '11/09/1989',
      email: 'sagir.rahman@royalnirman.com',
      phone: '+8801984432041',
      tin: '976698943211',
      nationality: 'Bangladeshi',
      nid: '9146132817',
      shares: 1000000,
      avatarStyle: 'man1',
      signatureText: 'Sagir'
    }
  ],
  signatories: [
    {
      id: 'sig-1',
      name: 'Minhazul Islam',
      address: 'G-5, bti Centara Grand, 144. 144/1 Green Road, Dhaka-1215, Bangladesh.',
      phone: '+8801855628384',
      nid: '5106944878'
    },
    {
      id: 'sig-2',
      name: 'Md.Anamul Haque',
      address: 'G- 5, bti Centara Grand, 144. 144/1 Green Road, Dhaka- 1215, Bangladesh.',
      phone: '+8801721- 742017',
      nid: '8695492598'
    }
  ],
  includedSections: {
    cover: true,
    formI: true,
    formIX: true,
    moa: true,
    signatories: true,
    formXII: false
  }
};
