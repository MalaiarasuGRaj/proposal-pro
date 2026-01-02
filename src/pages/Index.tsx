// Proposal Generator App
import { useState, useRef, useMemo } from "react";
import { Header } from "@/components/Header";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalPreview } from "@/components/ProposalPreview";
import { usePdfExport } from "@/hooks/usePdfExport";
import { ProposalData, initialProposalData } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [proposalData, setProposalData] = useState<ProposalData>(initialProposalData);
  const previewRef = useRef<HTMLDivElement>(null);
  const { exportToPdf } = usePdfExport();
  const { toast } = useToast();

  const isFormComplete = useMemo(() => {
    return Object.values(proposalData).every((value) => value.trim() !== "");
  }, [proposalData]);

  const filledFieldsCount = useMemo(() => {
    return Object.values(proposalData).filter((value) => value.trim() !== "").length;
  }, [proposalData]);

  const totalFields = Object.keys(proposalData).length;

  const handleExportPdf = async () => {
    if (!isFormComplete) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields before exporting.",
        variant: "destructive",
      });
      return;
    }

    try {
      await exportToPdf(previewRef.current, proposalData);
      toast({
        title: "PDF Generated!",
        description: "Your proposal has been downloaded successfully.",
      });
    } catch {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <div className="mb-6 bg-card rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Form Progress</span>
            </div>
            <div className="flex items-center gap-2">
              {isFormComplete && <CheckCircle2 className="w-5 h-5 text-success" />}
              <span className="text-sm text-muted-foreground">
                {filledFieldsCount} of {totalFields} fields completed
              </span>
            </div>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="gradient-button h-2 rounded-full transition-all duration-300"
              style={{ width: `${(filledFieldsCount / totalFields) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content - Two Panel Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Enter Details
              </h2>
            </div>
            
            <ProposalForm data={proposalData} onChange={setProposalData} />

            {/* Export Button - Mobile View */}
            <div className="xl:hidden">
              <Button
                onClick={handleExportPdf}
                disabled={!isFormComplete}
                className="w-full gradient-button text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Proposal as PDF
              </Button>
              {!isFormComplete && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Complete all fields to enable PDF export
                </p>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Live Preview
              </h2>
              
              {/* Export Button - Desktop View */}
              <div className="hidden xl:block">
                <Button
                  onClick={handleExportPdf}
                  disabled={!isFormComplete}
                  className="gradient-button text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Preview Container */}
            <div className="bg-muted rounded-lg p-4 overflow-auto max-h-[calc(100vh-300px)] xl:max-h-[calc(100vh-200px)]">
              <div className="mx-auto rounded-lg overflow-hidden shadow-paper">
                <ProposalPreview ref={previewRef} data={proposalData} />
              </div>
            </div>
            
            {!isFormComplete && (
              <div className="hidden xl:block text-center text-sm text-muted-foreground">
                Complete all fields to enable PDF export
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Connect Training Solutions (P) Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
