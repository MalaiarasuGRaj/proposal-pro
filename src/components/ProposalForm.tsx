import { ProposalData, PROGRAM_OPTIONS, PRICING_MODEL_OPTIONS } from "@/types/proposal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, MapPin, User, Phone, Mail, BookOpen, GraduationCap, Calendar, IndianRupee, Tag } from "lucide-react";

interface ProposalFormProps {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
}

export function ProposalForm({ data, onChange }: ProposalFormProps) {
  const updateField = (field: keyof ProposalData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* College Information Section */}
      <div className="form-section animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          College Information
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="collegeName" className="text-sm font-medium">
              College Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="collegeName"
              placeholder="e.g., XYZ Engineering College"
              value={data.collegeName}
              onChange={(e) => updateField("collegeName", e.target.value)}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              Location <span className="text-destructive">*</span>
            </Label>
            <Input
              id="location"
              placeholder="e.g., Chennai, Tamil Nadu"
              value={data.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="form-section animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactPerson" className="text-sm font-medium">
              Primary Contact Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactPerson"
              placeholder="e.g., Dr. John Smith"
              value={data.contactPerson}
              onChange={(e) => updateField("contactPerson", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobileNumber" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Mobile Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="+91 9876543210"
                value={data.mobileNumber}
                onChange={(e) => updateField("mobileNumber", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emailId" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emailId"
                type="email"
                placeholder="contact@college.edu"
                value={data.emailId}
                onChange={(e) => updateField("emailId", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Training Details Section */}
      <div className="form-section animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Training Details
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="programName" className="text-sm font-medium">
              Program Name <span className="text-destructive">*</span>
            </Label>
            <Select value={data.programName} onValueChange={(value) => updateField("programName", value)}>
              <SelectTrigger className="w-full bg-card">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border z-50">
                {PROGRAM_OPTIONS.map((program) => (
                  <SelectItem key={program} value={program} className="hover:bg-accent">
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batch" className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                Batch (Graduation Year) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="batch"
                placeholder="e.g., 2026"
                value={data.batch}
                onChange={(e) => updateField("batch", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trainingDays" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Training Days Required <span className="text-destructive">*</span>
              </Label>
              <Input
                id="trainingDays"
                placeholder="e.g., 15"
                value={data.trainingDays}
                onChange={(e) => updateField("trainingDays", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fee Structure Section */}
      <div className="form-section animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-primary" />
          Fee Structure
        </h3>
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              Pricing Model <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={data.pricingModel}
              onValueChange={(value) => updateField("pricingModel", value)}
              className="flex flex-col gap-3"
            >
              {PRICING_MODEL_OPTIONS.map((model) => (
                <div key={model} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
                  <RadioGroupItem value={model} id={model} />
                  <Label htmlFor={model} className="cursor-pointer font-normal">
                    {model}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price (INR) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
              <Input
                id="price"
                type="text"
                placeholder="50,000"
                value={data.price}
                onChange={(e) => updateField("price", e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
