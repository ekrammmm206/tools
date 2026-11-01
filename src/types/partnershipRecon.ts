export interface FirmInfo {
  firmName: string;
  regNo: string;
  regDate: string;
  reconDate: string;
  regAddress: string;
}

export interface ExistingPartner {
  id: string;
  name: string;
  father: string;
  address: string;
  sharePct: string;
  capitalAmt: string;
  role: string;
  dob?: string;
  nid?: string;
  tin?: string;
  mobile?: string;
  email?: string;
  nationality?: string;
}

export interface OutgoingPartner {
  name: string;
  parents: string;
  address: string;
  shareAmt: string;
  sharePct: string;
  resignDate: string;
}

export interface IncomingPartner {
  name: string;
  father: string;
  mother: string;
  address: string;
  dob: string;
  nid: string;
  tin: string;
  mobile: string;
  nationality: string;
  occupation: string;
  religion: string;
  sharePct: string;
  capitalAmt: string;
}

export interface AuthRepresentative {
  name: string;
  nid: string;
  dob: string;
  mobile: string;
  email: string;
}

export interface MeetingDetails {
  meetDate: string;
  submissionNo: string;
  noticeDate?: string;
}

export interface PartnershipReconState {
  selectedSubDoc:
    | 'all'
    | 'notice'
    | 'minutes'
    | 'resignation'
    | 'affidavit'
    | 'formV'
    | 'forwarding'
    | 'publicNotice'
    | 'gazette';
  firm: FirmInfo;
  partner1: ExistingPartner;
  partner2: ExistingPartner;
  outgoing: OutgoingPartner;
  incoming: IncomingPartner;
  representative: AuthRepresentative;
  meeting: MeetingDetails;
}
