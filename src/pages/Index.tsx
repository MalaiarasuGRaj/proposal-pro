// Proposal Generator App
import { useState, useRef, useMemo } from "react";
import { Header } from "@/components/Header";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalPreview } from "@/components/ProposalPreview";
import { usePdfExport } from "@/hooks/usePdfExport";
import { ProposalData, initialProposalData } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, Trash2, FolderOpen } from "lucide-react";
import { FloatingProgress } from "@/components/FloatingProgress";
import { useToast } from "@/hooks/use-toast";
import { useProposalHistory } from "@/hooks/useProposalHistory";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [proposalData, setProposalData] = useState<ProposalData>(initialProposalData);
  const previewRef = useRef<HTMLDivElement>(null);
  const { exportToPdf } = usePdfExport();
  const { toast } = useToast();
  const { saveProposal } = useProposalHistory();

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
      saveProposal(proposalData);
      toast({
        title: "PDF Generated!",
        description: "Your proposal has been downloaded and saved to repository.",
      });
    } catch {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearForm = () => {
    setProposalData(initialProposalData);
    toast({
      title: "Form Cleared",
      description: "All fields have been reset to empty.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Floating Progress Indicator */}
        <FloatingProgress current={filledFieldsCount} total={totalFields} />

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
            <div className="xl:hidden space-y-3">
              <Button
                onClick={handleExportPdf}
                disabled={!isFormComplete}
                className="w-full gradient-button text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Proposal as PDF
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                    disabled={filledFieldsCount === 0}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Form
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all data you have entered. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearForm} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                      Clear Form
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

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

              {/* Action Buttons - Desktop View */}
              <div className="hidden xl:flex items-center gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      disabled={filledFieldsCount === 0}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all data you have entered. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearForm} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                        Clear Form
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  onClick={() => window.location.href = '/repository'}
                  variant="outline"
                  className="shadow-sm hover:shadow-md transition-all"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Repository
                </Button>

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
