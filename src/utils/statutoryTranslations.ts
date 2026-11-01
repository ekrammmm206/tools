export type StatutoryLang = 'en' | 'bn';

/**
 * Common statutory translations mapping for Bangladeshi legal, RJSC,
 * partnership, and civil registry documents.
 */
export const STATUTORY_TRANSLATIONS: Record<string, { en: string; bn: string }> = {
  // Generic statutory headers & meta
  'doc.ref': { en: 'Ref. No.:', bn: 'স্মারক নং:' },
  'doc.date': { en: 'Date:', bn: 'তারিখ:' },
  'doc.regNo': { en: 'Reg. No.:', bn: 'নিবন্ধন নং:' },
  'doc.regDate': { en: 'Reg. Date:', bn: 'নিবন্ধনের তারিখ:' },
  'doc.regOffice': { en: 'Registered Office:', bn: 'নিবন্ধিত কার্যালয়:' },
  'doc.natureOfBusiness': { en: 'Nature of Business:', bn: 'ব্যবসায়ের ধরণ:' },
  'doc.sl': { en: 'Sl. No.', bn: 'ক্র. নং' },
  'doc.name': { en: 'Name', bn: 'নাম' },
  'doc.father': { en: "Father's Name:", bn: 'পিতার নাম:' },
  'doc.mother': { en: "Mother's Name:", bn: 'মাতার নাম:' },
  'doc.spouse': { en: "Spouse's Name:", bn: 'স্বামী/স্ত্রীর নাম:' },
  'doc.presentAddress': { en: 'Present Address:', bn: 'বর্তমান ঠিকানা:' },
  'doc.permanentAddress': { en: 'Permanent Address:', bn: 'স্থায়ী ঠিকানা:' },
  'doc.nid': { en: 'NID No.:', bn: 'জাতীয় পরিচয়পত্র নং:' },
  'doc.tin': { en: 'e-TIN No.:', bn: 'ই-টিন নং:' },
  'doc.occupation': { en: 'Occupation:', bn: 'পেশা:' },
  'doc.religion': { en: 'Religion:', bn: 'ধর্ম:' },
  'doc.nationality': { en: 'Nationality:', bn: 'জাতীয়তা:' },
  'doc.dob': { en: 'Date of Birth:', bn: 'জন্ম তারিখ:' },
  'doc.mobile': { en: 'Mobile / Phone:', bn: 'মোবাইল নং:' },
  'doc.signature': { en: 'Signature', bn: 'স্বাক্ষর' },
  'doc.seal': { en: 'Official Seal', bn: 'দাপ্তরিক সিলমোহর' },
  'doc.total': { en: 'Total:', bn: 'সর্বমোট:' },
  'doc.amount': { en: 'Amount (BDT)', bn: 'পরিমাণ (টাকা)' },
  'doc.inWords': { en: 'In Words:', bn: 'কথায়:' },
  'doc.authorizedSignatory': { en: 'Authorized Signatory', bn: 'ক্ষমতাপ্রাপ্ত স্বাক্ষরকারী' },
  'doc.notaryPublic': { en: 'Notary Public, Dhaka, Bangladesh', bn: 'নোটারি পাবলিক, ঢাকা, বাংলাদেশ' },
  'doc.witnesses': { en: 'Witnesses:', bn: 'সাক্ষীগণের বিবরণ:' },

  // Partnership Reconstitution & Form V
  'recon.noticeTitle': {
    en: 'Notice of Extraordinary Meeting of Partners',
    bn: 'অংশীদারগণের বিশেষ সাধারণ সভার বিজ্ঞপ্তি'
  },
  'recon.noticeAgenda': {
    en: 'Agenda of the Meeting:',
    bn: 'সভার আলোচ্যসূচি:'
  },
  'recon.incomingParticulars': {
    en: 'Particulars of the Proposed Incoming Partner:',
    bn: 'প্রস্তাবিত নতুন যোগদানকারী অংশীদারের বিবরণী:'
  },
  'recon.minutesTitle': {
    en: 'Minutes of Extraordinary Meeting of Partners',
    bn: 'অংশীদারগণের বিশেষ সাধারণ সভার কার্যবিবরণী'
  },
  'recon.resignationTitle': {
    en: 'Letter of Resignation of Retiring Partner',
    bn: 'অব্যাহতিপ্রাপ্ত অংশীদারের আনুষ্ঠানিক পদত্যাগপত্র'
  },
  'recon.affidavitTitle': {
    en: 'Affidavit of Non-Indebtedness & Voluntary Resignation',
    bn: 'দায়মুক্তির হলফনামা ও স্বেচ্ছায় পদত্যাগের অঙ্গীকারনামা'
  },
  'recon.formVTitle': {
    en: 'FORM V: NOTICE OF CHANGE IN THE CONSTITUTION OF REGISTERED FIRM',
    bn: 'ফরম ৫: নিবন্ধিত অংশীদারী ফার্মের গঠনে পরিবর্তনের সংবিধিবদ্ধ নোটিশ'
  },
  'recon.formVSub': {
    en: '[Under Section 63(1) of the Partnership Act, 1932 and Rule 4(2)]',
    bn: '[অংশীদারী আইন, ১৯৩২-এর ৬৩(১) ধারা এবং বিধি ৪(২) মোতাবেক]'
  },
  'recon.forwardingTitle': {
    en: 'Statutory Forwarding Letter to Registrar of Joint Stock Companies & Firms',
    bn: 'যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তরে (RJSC) সংবিধিবদ্ধ আবেদনপত্র'
  },
  'recon.publicNoticeTitle': {
    en: 'Public Notice: Reconstitution of Partnership Firm',
    bn: 'সর্বসাধারণের অবগতির জন্য গণবিজ্ঞপ্তি: অংশীদারী ফার্মের পুনর্গঠন'
  },
  'recon.gazetteTitle': {
    en: 'The Bangladesh Gazette - Statutory Notification',
    bn: 'দ্য বাংলাদেশ গেজেট - সংবিধিবদ্ধ সরকারি বিজ্ঞপ্তি'
  },
  'recon.incomingPartner': { en: 'Incoming Partner', bn: 'নতুন অংশীদার' },
  'recon.outgoingPartner': { en: 'Outgoing / Retiring Partner', bn: 'অব্যাহতিপ্রাপ্ত অংশীদার' },
  'recon.continuingPartner': { en: 'Continuing Partner', bn: 'বহাল অংশীদার' },
  'recon.managingPartner': { en: 'Managing Partner', bn: 'ব্যবস্থাপনা অংশীদার' },
  'recon.sharePct': { en: 'Share Ratio (%)', bn: 'শেয়ার অনুপাত (%)' },
  'recon.capitalAmt': { en: 'Capital Contribution', bn: 'মূলধন বিনিয়োগ' },

  // RJSC Annual Return & AGM
  'rjsc.noticeTitle': {
    en: 'NOTICE OF THE ANNUAL GENERAL MEETING (AGM)',
    bn: 'বার্ষিক সাধারণ সভার (এজিএম) বিজ্ঞপ্তি'
  },
  'rjsc.minutesTitle': {
    en: 'MINUTES OF THE ANNUAL GENERAL MEETING (AGM)',
    bn: 'বার্ষিক সাধারণ সভার কার্যবিবরণী'
  },
  'rjsc.directorsReport': {
    en: "DIRECTORS' REPORT TO THE SHAREHOLDERS",
    bn: 'শেয়ারহোল্ডারদের উদ্দেশ্যে পরিচালকগণের বার্ষিক প্রতিবেদন'
  },
  'rjsc.formXII': {
    en: 'FORM XII: PARTICULARS OF DIRECTORS & MANAGING AGENTS',
    bn: 'ফরম ১২: পরিচালক ও ব্যবস্থাপনা এজেন্টগণের বিবরণী'
  },
  'rjsc.scheduleX': {
    en: 'SCHEDULE X (FORM 117): ANNUAL SUMMARY OF SHARE CAPITAL & SHARES',
    bn: 'তফসিল ১০ (ফরম ১১৭): শেয়ার মূলধন ও শেয়ারের বার্ষিক সংক্ষিপ্ত বিবরণী'
  },
  'rjsc.authCapital': { en: 'Authorized Share Capital:', bn: 'অনুমোদিত শেয়ার মূলধন:' },
  'rjsc.paidUpCapital': { en: 'Paid-up Share Capital:', bn: 'পরিশোধিত শেয়ার মূলধন:' },
  'rjsc.sharesCount': { en: 'Number of Shares:', bn: 'মোট শেয়ারের সংখ্যা:' },
  'rjsc.nominalValue': { en: 'Nominal Value Per Share:', bn: 'শেয়ার প্রতি অভিহিত মূল্য:' },
  'rjsc.chairman': { en: 'Chairman of the Meeting', bn: 'সভার সভাপতি / চেয়ারম্যান' },
  'rjsc.managingDirector': { en: 'Managing Director', bn: 'ব্যবস্থাপনা পরিচালক' },

  // Partnership Deed
  'deed.title': {
    en: 'DEED OF PARTNERSHIP',
    bn: 'অংশীদারী চুক্তিপত্র / দলিল'
  },
  'deed.stamp': {
    en: 'Non-Judicial Stamp Tk. 2000/-',
    bn: 'নন-জুডিশিয়াল স্ট্যাম্প ২০০০/- টাকা'
  },
  'deed.act': {
    en: 'Partnership Act, 1932 (Act IX of 1932)',
    bn: 'অংশীদারী আইন, ১৯৩২ (১৯৩২ সালের ৯ নং আইন)'
  },
  'deed.byAndBetween': {
    en: '— BY AND BETWEEN —',
    bn: '— পক্ষগণের মধ্যে চুক্তি —'
  },
  'deed.firstParty': {
    en: 'FIRST PARTY / MANAGING PARTNER',
    bn: 'প্রথম পক্ষ / ব্যবস্থাপনা অংশীদার'
  },
  'deed.secondParty': {
    en: 'SECOND PARTY / PARTNER',
    bn: 'দ্বিতীয় পক্ষ / অংশীদার'
  },
  'deed.capitalContribution': {
    en: 'Clause 5: Capital Contribution & Shareholding',
    bn: '৫ম দফা: মূলধন বিনিয়োগ ও শেয়ার অংশীদারিত্ব'
  },
  'deed.profitSharing': {
    en: 'Clause 6: Profit & Loss Distribution',
    bn: '৬ষ্ঠ দফা: লাভ ও ক্ষতি বণ্টন'
  },
  'deed.banking': {
    en: 'Clause 7: Bank Account Operation',
    bn: '৭ম দফা: ব্যাংক হিসাব পরিচালনা'
  },
  'deed.dissolution': {
    en: 'Clause 22: Retirement & Dissolution',
    bn: '২২তম দফা: অবসর গ্রহণ ও বিলোপসাধন'
  },

  // Combined Dossier
  'combined.birthTitle': {
    en: 'Birth Registration Certificate',
    bn: 'জন্ম নিবন্ধন সনদপত্র'
  },
  'combined.govBd': {
    en: "Government of the People's Republic of Bangladesh",
    bn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'
  },
  'combined.birthOffice': {
    en: 'Office of the Registrar of Birth and Death',
    bn: 'জন্ম ও মৃত্যু নিবন্ধকের কার্যালয়'
  },
  'combined.nidTitle': {
    en: 'National ID Verification & Certification',
    bn: 'জাতীয় পরিচয়পত্র যাচাই ও প্রত্যয়ন বিবরণী'
  },
  'combined.treeTitle': {
    en: 'Family Lineage Tree & Relationship Certificate',
    bn: 'পারিবারিক বংশলতিকা ও উত্তরাধিকার প্রত্যয়ন'
  },
  'combined.nikahTitle': {
    en: 'Muslim Marriage Registration Certificate (Nikahnama)',
    bn: 'মুসলিম বিবাহ নিবন্ধন সনদপত্র (নিকাহনামা)'
  },
  'combined.policeTitle': {
    en: 'Police Clearance Verification Certificate',
    bn: 'বাংলাদেশ পুলিশ ক্লিয়ারেন্স যাচাই প্রত্যয়নপত্র'
  },
  'combined.affidavitTitle': {
    en: 'Affidavit of Financial Declaration & Support',
    bn: 'আর্থিক সচ্ছলতা ও পৃষ্ঠপোষকতার শপথনামা'
  },
  'combined.khatianTitle': {
    en: 'Land Ownership & Khatian Record (Porcha)',
    bn: 'জমির মালিকানা স্বত্ব ও খতিয়ান বিবরণী (পর্চা)'
  },

  // Asset Valuation
  'val.coverTitle': {
    en: 'Certified Report on the Valuation of Immovable & Movable Assets',
    bn: 'স্থাবর ও অস্থাবর সম্পদের প্রত্যয়িত মূল্যায়ন প্রতিবেদন'
  },
  'val.toc': {
    en: 'TABLE OF CONTENTS',
    bn: 'সূচিপত্র'
  },
  'val.summaryTitle': {
    en: 'SUMMARY OF TOTAL NET WORTH OF SPONSOR',
    bn: 'স্পন্সরের সর্বমোট নিট সম্পদের সংক্ষিপ্ত বিবরণী'
  },
  'val.incomeTitle': {
    en: 'CERTIFICATION OF ANNUAL INCOME',
    bn: 'বার্ষিক আয়ের সংবিধিবদ্ধ প্রত্যয়নপত্র'
  },
  'val.landValTitle': {
    en: 'VALUATION OF LANDS & IMMOVABLE PROPERTIES',
    bn: 'জমি ও স্থাবর সম্পত্তিসমূহের মূল্যায়ন বিবরণী'
  },
  'val.charteredFirm': {
    en: 'Government Approved Chartered Valuation Surveyors',
    bn: 'সরকার অনুমোদিত চার্টার্ড মূল্যায়নকারী ও জরিপ প্রতিষ্ঠান'
  },

  // Company Registration
  'comp.coverTitle': {
    en: 'STATUTORY INCORPORATION DOSSIER',
    bn: 'সংবিধিবদ্ধ কোম্পানি নিবন্ধন নথিপত্র'
  },
  'comp.memoTitle': {
    en: 'MEMORANDUM OF ASSOCIATION',
    bn: 'কোম্পানির স্মারকলিপি (মেমোরেন্ডাম অব অ্যাসোসিয়েশন)'
  },
  'comp.articlesTitle': {
    en: 'ARTICLES OF ASSOCIATION',
    bn: 'কোম্পানির পরিমেল নিয়মাবলী (আর্টিকেলস অব অ্যাসোসিয়েশন)'
  },
  'comp.subscribersList': {
    en: 'LIST OF SUBSCRIBERS & SHAREHOLDERS',
    bn: 'স্বত্বাধিকারী ও শেয়ারহোল্ডারদের নামীয় তালিকা'
  },

  // Withholding Return (TDS / NBR)
  'withholding.ackTitle': {
    en: 'ACKNOWLEDGEMENT RECEIPT OF FILING OF TAX DEDUCTION RETURN AT SOURCE',
    bn: 'উৎসে কর কর্তন রিটার্ন দাখিলের সংবিধিবদ্ধ প্রাপ্তি স্বীকারপত্র'
  },
  'withholding.ackSub': {
    en: '(submit in a separate page)',
    bn: '(পৃথক পৃষ্ঠায় দাখিল করিতে হইবে)'
  },
  'withholding.returnFy': {
    en: 'Return for the Financial Year',
    bn: 'করবর্ষ / সংশ্লিষ্ট অর্থবছর'
  },
  'withholding.applicableMonth': {
    en: 'Applicable for the month of',
    bn: 'সংশ্লিষ্ট প্রযোজ্য মাস'
  },
  'withholding.personName': {
    en: 'Name of the Person:',
    bn: 'রিটার্ন দাখিলকারী ব্যক্তি/কোম্পানির নাম:'
  },
  'withholding.win': {
    en: 'Withholding Identification Number (WIN):',
    bn: 'উইথহোল্ডিং সনাক্তকরণ নম্বর (WIN):'
  },
  'withholding.circle': {
    en: 'Taxes Circle:',
    bn: 'কর সার্কেল:'
  },
  'withholding.zone': {
    en: 'Taxes Zone:',
    bn: 'কর অঞ্চল:'
  },
  'withholding.submissionDate': {
    en: 'Date of Submission (DD-MM-YYYY)',
    bn: 'দাখিলের তারিখ (দিন-মাস-বৎসর)'
  },
  'withholding.entryNo': {
    en: 'Tax Office Entry Number',
    bn: 'কর অফিসের এন্ট্রি নম্বর'
  },
  'withholding.recSignature': {
    en: 'Signature and seal of the official receiving the return',
    bn: 'রিটার্ন গ্রহণকারী রাজস্ব কর্মকর্তার স্বাক্ষর ও সিলমোহর'
  },
  'withholding.sourcesTitle': {
    en: 'Sources and amount of tax deducted at source',
    bn: 'উৎসে কর কর্তনের উৎস ও কর্তিত করের পরিমাণ'
  },
  'withholding.treasuryTitle': {
    en: 'Particulars of the tax deducted at source credited to the government treasury',
    bn: 'সরকারি কোষাগারে জমাকৃত উৎসে কর্তিত করের বিবরণী'
  },
  'withholding.scheduleCTitle': {
    en: 'Schedule-C: Particulars of tax deducted at source from salaries',
    bn: 'তফসিল-গ: বেতন হইতে উৎসে কর কর্তন ও কোষাগারে জমার বিস্তারিত বিবরণী'
  },
  'withholding.scheduleATitle': {
    en: 'Schedule-A: Particulars of tax deducted at source from services',
    bn: 'তফসিল-ক: বিভিন্ন সেবা হইতে উৎসে কর কর্তনের বিবরণী'
  },
  'withholding.verificationTitle': {
    en: 'Verification & Declaration',
    bn: 'সত্যপাঠ ও সংবিধিবদ্ধ ঘোষণা'
  }
};

/**
 * Helper to fetch translation with fallback
 */
export function t(key: string, lang: StatutoryLang, fallback?: string): string {
  const item = STATUTORY_TRANSLATIONS[key];
  if (!item) return fallback || key;
  return item[lang] || fallback || item.en;
}

/**
 * Format number into English or Bengali numeral string depending on active language
 */
export function formatStatutoryNumeral(val: string | number, lang: StatutoryLang): string {
  if (lang === 'bn') {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(val).replace(/[0-9]/g, (w) => bnDigits[parseInt(w, 10)]);
  }
  return String(val);
}
