import { PartnershipReconState } from '../types/partnershipRecon';

export const DEFAULT_PARTNERSHIP_RECON_STATE: PartnershipReconState = {
  selectedSubDoc: 'all',
  firm: {
    firmName: 'M/s. VitaSkin',
    regNo: 'P-49428',
    regDate: '30-08-2022',
    reconDate: '20-04-2025',
    regAddress: 'Delvistaa Fuljhuri (level: 9), 59(new), Satmasjid Road, Dhanmondi, Dhaka-1209, Bangladesh'
  },
  partner1: {
    id: 'p1',
    name: 'Farhad Hosen',
    father: 'Alim Uddin',
    address: 'Vill:Kashimpur, P.O-Palibazar, Pst.-Durgapur, Dist.- Rajshahi-6240.',
    sharePct: '35%',
    capitalAmt: '1,000,000',
    role: 'Managing Partner',
    dob: '11 February 1989',
    nid: '1480033594',
    mobile: '01812127200',
    email: 'mr-farhad@hotmail.com',
    nationality: 'Bangladeshi'
  },
  partner2: {
    id: 'p2',
    name: 'Rebeka Sultana Liza',
    father: 'Engr. Abdur Razzak',
    address: 'House: 57/55, Road: Laksham Road, P.O: Comilla Adarsha Sadar, Comilla Pouroshova, Comilla-3500.',
    sharePct: '32.5%',
    capitalAmt: '1,500,000',
    role: 'Partner',
    nationality: 'Bangladeshi'
  },
  outgoing: {
    name: 'Lina Malek',
    parents: 'M. A. Malek & Vikarun Nisa',
    address: 'House: 85, C/4, Road-12/A, Danmondi R/A, P.O-Jigatala, Danmondi, Dhaka-1209.',
    shareAmt: '10,00,000 Taka',
    sharePct: '32.50%',
    resignDate: '30 March 2025'
  },
  incoming: {
    name: 'Md. Raihan-Ul-Islam',
    father: 'Zahidul Islam',
    mother: 'Ayesha Begum',
    address: '7/C, Aminabad Co-operative Housing Society, 56-57, Siddeswari Road, Ramna, Dhaka-1217',
    dob: '30 April 1982',
    nid: '7323793880',
    tin: '138243616554',
    mobile: '01819136089',
    nationality: 'Bangladeshi',
    occupation: 'Business',
    religion: 'Islam',
    sharePct: '32.50%',
    capitalAmt: '1,000,000'
  },
  representative: {
    name: 'Md. Rafiqul Islam',
    nid: '914 299 9532',
    dob: '01 September 1978',
    mobile: '01893796133',
    email: 'ri0780109@gmail.com'
  },
  meeting: {
    meetDate: '20/04/2025 at 11:00 A.M.',
    submissionNo: '2025198694',
    noticeDate: '05 April 2025'
  }
};
