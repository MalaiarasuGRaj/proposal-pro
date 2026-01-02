import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ProposalData } from "@/types/proposal";

export function usePdfExport() {
  const exportToPdf = useCallback(
    async (element: HTMLElement | null, data: ProposalData) => {
      if (!element) return;

      try {
        // Find all pdf-page sections
        const pages = element.querySelectorAll('.pdf-page');
        
        // A4 dimensions in mm
        const pdfWidth = 210;
        const pdfHeight = 297;
        
        // Create PDF
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Render each page section separately
        for (let i = 0; i < pages.length; i++) {
          const pageElement = pages[i] as HTMLElement;
          
          // Generate canvas for this page section
          const canvas = await html2canvas(pageElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
          });

          const imgData = canvas.toDataURL("image/png");
          
          // Calculate dimensions to fit A4
          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * pdfWidth) / canvas.width;
          
          // Add new page for pages after the first
          if (i > 0) {
            pdf.addPage();
          }
          
          // Add image centered vertically if shorter than page
          const yPosition = imgHeight < pdfHeight ? 0 : 0;
          pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
        }

        // Generate filename
        const collegeName = data.collegeName.replace(/[^a-zA-Z0-9]/g, "_") || "College";
        const programName = data.programName.replace(/[^a-zA-Z0-9]/g, "_") || "Program";
        const filename = `Connect_Training_Proposal_${collegeName}_${programName}.pdf`;

        pdf.save(filename);
      } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
      }
    },
    []
  );

  return { exportToPdf };
}
