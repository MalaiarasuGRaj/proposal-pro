export interface ProposalData {
  collegeName: string;
  location: string;
  contactPerson: string;
  mobileNumber: string;
  emailId: string;
  programName: string;
  batch: string;
  trainingDays: string;
  pricingModel: string;
  numberOfBatches: string;
  numberOfStudents: string;
  price: string;
}

export const PROGRAM_OPTIONS = [
  "Aptitude (Foundation)",
  "Aptitude (Advanced)",
  "Company-Specific Training",
  "Interview Skills",
  "Java Training",
  "Python Training",
  "Full Stack (Java)",
  "Full Stack (Python)",
  "Soft Skill Training",
  "Mock Interview",
  "Campus Recruitment Training (CRT)",
] as const;

export const PRICING_MODEL_OPTIONS = [
  "Cost per Trainer per Day",
  "Cost per Student per Day",
] as const;

export const initialProposalData: ProposalData = {
  collegeName: "",
  location: "",
  contactPerson: "",
  mobileNumber: "",
  emailId: "",
  programName: "",
  batch: "",
  trainingDays: "",
  pricingModel: "",
  numberOfBatches: "",
  numberOfStudents: "",
  price: "",
};
