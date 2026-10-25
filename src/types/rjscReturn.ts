export interface PersonShareholder {
  id: string;
  name: string;
  designation: string;
  shares: number;
  father: string;
  mother: string;
  address: string;
  fullAddress: string;
  dob: string;
  email: string;
  phone: string;
  tin: string;
  nid: string;
}

export interface AuthorizedPersonInfo {
  name: string;
  nid: string;
  dob: string;
  mobile: string;
  email: string;
}

export interface CompanyMeetingInfo {
  companyName: string;
  regNo: string;
  noticeRef: string;
  noticeDate: string;
  agmDate: string;
  agmTime: string;
  meetingLocation: string;
  fyEnded: string;
  fyNext: string;
  auditorName: string;
  auditorAddress: string;
  chairmanName: string;
  chairmanAddress: string;
  chairmanNid: string;
  chairmanDob: string;
  chairmanMobile: string;
  chairmanEmail: string;
  mdName: string;
  mdAddress: string;
  shareNominalValue: number; // e.g. 1000 Tk
  shareClass: string; // e.g. Ordinary Share
  authorizedPerson: AuthorizedPersonInfo;
}

export interface RjscReturnState {
  selectedSubDoc:
    | 'all'
    | 'notice'
    | 'minutes'
    | 'form23b'
    | 'attendance'
    | 'consent'
    | 'submission'
    | 'allotments'
    | 'shareholders'
    | 'directors'
    | 'scheduleX';
  meetingInfo: CompanyMeetingInfo;
  people: PersonShareholder[];
  activeConsentPersonId?: string; // If filtering consent page to one person
}
