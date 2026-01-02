import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ProposalData } from "@/types/proposal";

export function usePdfExport() {
  const exportToPdf = useCallback(
    async (element: HTMLElement | null, data: ProposalData) => {
      if (!element) return;

      try {
        // Generate canvas from the element
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        
        // A4 dimensions in mm
        const pdfWidth = 210;
        const pdfHeight = 297;
        
        // Calculate dimensions to maintain aspect ratio
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        // Create PDF
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        let heightLeft = imgHeight;
        let position = 0;
        let page = 1;

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add additional pages if content exceeds one page
        while (heightLeft > 0) {
          position = -(pdfHeight * page);
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
          page++;
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
