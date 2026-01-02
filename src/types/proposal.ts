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
  price: string;
}

export const PROGRAM_OPTIONS = [
  "Data Science",
  "AI & Machine Learning",
  "Generative AI",
  "Full Stack Development",
] as const;

export const PRICING_MODEL_OPTIONS = [
  "Cost per Trainer per Day",
  "Cost per Student",
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
  price: "",
};
