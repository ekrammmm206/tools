import { CombinedDossierState } from '../types/combinedDossier';

export const DEFAULT_COMBINED_STATE: CombinedDossierState = {
  selectedSubDoc: 'all',

  birthCertificate: {
    office: 'Rajshahi City Corporation, Rajshahi',
    ruleText: '(Rule 9, 10 of the Birth and Death Registration (City Corporation) Rules, 2006)',
    formNo: 'BDR Form-3',
    regNo: '20018192209101265',
    regDate: '15/10/2018',
    issueDate: '16/10/2018',
    dob: '25/08/2001',
    dobInWords: 'Twenty Fifth August Two Thousand and One',
    sex: 'Male',
    name: 'MOHAMMAD TANVIR HASAN',
    motherName: 'TASLIMA BEGUM',
    motherNationality: 'Bangladeshi',
    fatherName: 'MD. ROFIQUL ISLAM',
    fatherNationality: 'Bangladeshi',
    pob: 'VILL: KAZI HATA, RAJSHAHI',
    permAddress: 'HOUSE: 212, ROAD: 02, BLOCK: A, KAZIHATA, RAJPARAH, RAJSHAHI',
    assistantTitle: 'Assistant to Registrar',
    registrarTitle: 'Registrar (Seal & Signature)'
  },

  financialDeclaration: {
    notaryDistrict: 'Dhaka, Bangladesh',
    affidavitTitle: 'AFFIDAVIT OF FINANCIAL DECLARATION & PROPERTY VALUATION',
    declarantName: 'MD. ROFIQUL ISLAM',
    fatherName: 'Late Abdul Gafur',
    motherName: 'Late Rahima Khatun',
    address: 'House: 212, Road: 02, Block: A, Kazihata, Rajpara, Rajshahi, Bangladesh',
    nidNo: '19728192209000145',
    religion: 'Islam',
    nationality: 'Bangladeshi',
    studentName: 'MOHAMMAD TANVIR HASAN',
    studentRelation: 'Biological Son',
    studentDob: '25/08/2001',
    studentPassport: 'A03498125',
    institution: 'The University of Auckland',
    courseName: 'Master of Information Technology',
    currencyCode: 'NZD',
    currencySymbol: 'NZ$',
    exchangeRate: 71.83,
    exchangeRateCitation: 'Wise & Bangladesh Bank Benchmark: 1 NZD = 71.83 BDT',
    landProperties: [
      {
        id: 'land-1',
        description: 'Agricultural & Homestead Land, Mouza Chinakandi, JL 78, Upazila Haimchar, Chandpur',
        mouza: 'Chinakandi',
        khatianNo: '1452',
        plotNo: '1689, 1720',
        area: '35.50 Decimals',
        valueBdt: 12500000
      },
      {
        id: 'land-2',
        description: 'Commercial & Homestead Plot, Mouza Uttar Algi, JL 45, Upazila Haimchar, Chandpur',
        mouza: 'Uttar Algi',
        khatianNo: '320',
        plotNo: '760',
        area: '8.25 Decimals',
        valueBdt: 7400000
      },
      {
        id: 'land-3',
        description: 'Multi-Storey Residential Building Flat (Flat 4-A & 4-B), Kazihata, Rajpara, Rajshahi',
        mouza: 'Kazihata',
        khatianNo: '884',
        plotNo: '450',
        area: '2,800 Sq. Ft.',
        valueBdt: 18600000
      }
    ],
    bankAccounts: [
      {
        id: 'bank-1',
        bankName: 'Islami Bank Bangladesh PLC',
        branch: 'Rajshahi Main Branch',
        accountNo: '2050123020084512',
        accountType: 'Mudaraba Savings',
        balanceBdt: 3850000
      },
      {
        id: 'bank-2',
        bankName: 'Dutch-Bangla Bank PLC',
        branch: 'Shaheb Bazar Branch, Rajshahi',
        accountNo: '1151010045672',
        accountType: 'Fixed Deposit (FDR)',
        balanceBdt: 4200000
      },
      {
        id: 'bank-3',
        bankName: 'BRAC Bank PLC',
        branch: 'Alokar More Branch, Rajshahi',
        accountNo: '1501204598110001',
        accountType: 'Current Account',
        balanceBdt: 1950000
      }
    ],
    businessAssets: [
      {
        id: 'biz-1',
        businessName: 'M/S Islam Trading & Agro Enterprise',
        nature: 'Proprietorship (Agro commodities & construction logistics)',
        ownershipPercent: 100,
        valueBdt: 9500000
      }
    ],
    annualIncomes: [
      {
        id: 'inc-1',
        source: 'Agricultural Produce & Fisheries',
        particulars: 'Returns from 43.75 Decimals fertile lands & managed fisheries in Chandpur',
        annualBdt: 720000
      },
      {
        id: 'inc-2',
        source: 'Rental Income from Properties',
        particulars: 'Rental proceeds from Kazihata residential apartment units (Flat 4-A & commercial floors)',
        annualBdt: 680000
      },
      {
        id: 'inc-3',
        source: 'Trading Enterprise Profits',
        particulars: 'Net audited annual profit from M/S Islam Trading & Agro Enterprise',
        annualBdt: 1450000
      }
    ],
    advocateName: 'Advocate K. M. Rezaul Karim, LL.B (Hons), Supreme Court of Bangladesh',
    notaryName: 'A. B. M. Shamsuddin, Advocate & Notary Public (Whole Bangladesh), Dhaka'
  },

  khatian: {
    title: "GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH",
    subtitle: 'Directorate of Land Records and Surveys (DLRS)',
    khatianType: 'B.S. KHATIAN (TRANSLATED TRUE COPY)',
    khatianNo: '1452',
    district: 'Chandpur',
    thana: 'Haimchar',
    mouza: 'Chinakandi',
    jlNo: '78',
    touziNo: '412',
    revenueRent: 'BDT 124.50 (Paid up to 1430 BS)',
    owners: [
      {
        id: 'ko-1',
        name: 'MD. ROFIQUL ISLAM',
        fatherOrHusband: 'Late Abdul Gafur',
        address: 'Vill: Chinakandi, P.O: Haimchar, Dist: Chandpur',
        share: '0.625 (10 Annas)'
      },
      {
        id: 'ko-2',
        name: 'TASLIMA BEGUM',
        fatherOrHusband: 'W/O Md. Rofiqul Islam',
        address: 'Vill: Chinakandi, P.O: Haimchar, Dist: Chandpur',
        share: '0.375 (6 Annas)'
      }
    ],
    plots: [
      {
        id: 'kp-1',
        plotNo: '1689',
        classOfLand: 'Nali (Cultivable Land)',
        totalLandAcre: 0,
        totalLandDecimal: 24.50,
        share: '0.625',
        propLandAcre: 0,
        propLandDecimal: 15.31
      },
      {
        id: 'kp-2',
        plotNo: '1720',
        classOfLand: 'Doba / Waterbody & Fish Pond',
        totalLandAcre: 0,
        totalLandDecimal: 18.00,
        share: '0.625',
        propLandAcre: 0,
        propLandDecimal: 11.25
      },
      {
        id: 'kp-3',
        plotNo: '1805',
        classOfLand: 'Viti / Homestead & Orchard',
        totalLandAcre: 0,
        totalLandDecimal: 14.30,
        share: '0.625',
        propLandAcre: 0,
        propLandDecimal: 8.94
      }
    ],
    certifiedBy: 'Translated and Certified as True English Reproduction from Original B.S. Records by Government Approved Notary Public'
  },

  nidCard: {
    title: "Government of the People's Republic of Bangladesh",
    subTitle: 'National ID Card / জাতীয় পরিচয়পত্র (Certified English Translation)',
    name: 'MOHAMMAD TANVIR HASAN',
    fatherName: 'MD. ROFIQUL ISLAM',
    motherName: 'TASLIMA BEGUM',
    dob: '25 Aug 2001',
    nidNo: '8192209101',
    bloodGroup: 'O+',
    placeOfBirth: 'Rajshahi',
    address: 'House: 212, Road: 02, Block: A, Kazihata, Post: GPO Rajshahi - 6000, Rajpara, Rajshahi City Corporation',
    issueDate: '18/10/2019',
    issuingAuthority: 'Election Commission Bangladesh (জাতীয় পরিচয় নিবন্ধন অনুবিভাগ)',
    photoUrl: ''
  },

  rentalAgreement: {
    agreementDate: '01 January 2024',
    landlordName: 'MD. ROFIQUL ISLAM',
    landlordFather: 'Late Abdul Gafur',
    landlordAddress: 'House 212, Road 02, Kazihata, Rajpara, Rajshahi',
    landlordNid: '19728192209000145',
    landlordPhone: '+880 1711-234567',
    tenantName: 'ENGR. ABDUR RAHMAN',
    tenantFather: 'Md. Jalal Uddin',
    tenantAddress: 'Vill: Durgapur, Upazila: Durgapur, Dist: Rajshahi',
    tenantNid: '19858192209876543',
    tenantPhone: '+880 1819-876543',
    premisesAddress: "Flat 4-A (4th Floor), 'Green Valley Residence', Plot 45, Road 05, Kazihata, Rajpara, Rajshahi",
    monthlyRentBdt: 28000,
    securityDepositBdt: 56000,
    agreementDurationMonths: 24,
    noticePeriodMonths: 2,
    witnesses: [
      {
        id: 'rw-1',
        name: 'Md. Tariqul Alam',
        address: 'House 190, Road 02, Kazihata, Rajshahi',
        nid: '19758192209112233'
      },
      {
        id: 'rw-2',
        name: 'Mahmudul Hasan Shuvo',
        address: 'Flat 3-B, Green Valley, Kazihata, Rajshahi',
        nid: '19908192209445566'
      }
    ]
  },

  sponsorDeclaration: {
    title: 'DECLARATION OF SPONSORSHIP & AFFIDAVIT OF FINANCIAL SUPPORT',
    sponsorName: 'MD. ROFIQUL ISLAM',
    sponsorRelation: 'Biological Father',
    sponsorOccupation: 'Businessman & Property Owner',
    sponsorNid: '19728192209000145',
    sponsorAddress: 'House 212, Road 02, Kazihata, Rajpara, Rajshahi, Bangladesh',
    applicantName: 'MOHAMMAD TANVIR HASAN',
    applicantDob: '25/08/2001',
    applicantPassport: 'A03498125',
    course: 'Master of Information Technology (2 Years)',
    university: 'The University of Auckland',
    country: 'New Zealand',
    currencyCode: 'NZD',
    currencySymbol: 'NZ$',
    exchangeRate: 71.83,
    accounts: [
      {
        id: 'sp-acc-1',
        bankName: 'Islami Bank Bangladesh PLC',
        branch: 'Rajshahi Main Branch',
        accountNo: '2050123020084512',
        accountType: 'Mudaraba Savings',
        balanceBdt: 3850000
      },
      {
        id: 'sp-acc-2',
        bankName: 'Dutch-Bangla Bank PLC',
        branch: 'Shaheb Bazar Branch, Rajshahi',
        accountNo: '1151010045672',
        accountType: 'Fixed Deposit Receipt (FDR)',
        balanceBdt: 4200000
      },
      {
        id: 'sp-acc-3',
        bankName: 'BRAC Bank PLC',
        branch: 'Alokar More Branch, Rajshahi',
        accountNo: '1501204598110001',
        accountType: 'Current Account',
        balanceBdt: 1950000
      },
      {
        id: 'sp-acc-4',
        bankName: 'Sonali Bank PLC',
        branch: 'Court Branch, Rajshahi',
        accountNo: '0104502001482',
        accountType: 'Special Notice Deposit (SND)',
        balanceBdt: 1200000
      }
    ],
    undertakingPoints: [
      'I unconditionally undertake full financial responsibility for my son MOHAMMAD TANVIR HASAN during the entire duration of his studies in New Zealand.',
      'I confirm that all funds deposited in the aforementioned bank accounts are unencumbered, readily withdrawable, and exclusively earmarked to cover his tuition fees, living expenses, accommodation, health insurance, and emergency expenses.',
      'I possess substantial ongoing annual income from my commercial business, agricultural lands, and rental properties in Bangladesh to sustain all costs without requiring recourse to public funds in New Zealand.',
      'I guarantee to finance return airfares and any unforeseen expenditures throughout his lawful stay in New Zealand.'
    ]
  },

  summaryOfDeed: {
    deedNo: '760',
    year: '2014',
    subRegistryOffice: 'Haimchar',
    district: 'Chandpur',
    deedType: 'Saf-Kabala (Absolute Deed of Sale)',
    vendorName: 'Md. Harun-ur-Rashid',
    vendorFather: 'Late Mokbul Hossain',
    vendorAddress: 'Vill: Uttar Algi, P.O: Haimchar, Upazila: Haimchar, Dist: Chandpur',
    vendeeName: 'MD. ROFIQUL ISLAM',
    vendeeFather: 'Late Abdul Gafur',
    vendeeAddress: 'House 212, Road 02, Block A, Kazihata, Rajpara, Rajshahi',
    mouza: 'Uttar Algi',
    jlNo: '45',
    khatianBs: '320',
    plotBs: '1689',
    landClass: 'Viti / Homestead & Residential Land',
    transferredArea: '0.0825 Acre (8.25 Decimals)',
    boundaryNorth: '12-feet Village Pucca Road & Land of Kashem Ali',
    boundarySouth: 'Remaining Owned Land of Vendor Md. Harun-ur-Rashid',
    boundaryEast: 'Government Drainage Canal / Water Drainage Khari',
    boundaryWest: 'Boundary Wall and Existing Land of Md. Rofiqul Islam',
    totalConsiderationBdt: 1850000,
    certifiedStatement: 'Certified to be a true and correct translation into English from the registered Bengali Kabala Deed No. 760/2014 preserved at Sub-Registry Office Haimchar, Chandpur.'
  }
};
