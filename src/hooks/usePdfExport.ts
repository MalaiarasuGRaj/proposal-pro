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

          // Add Footer
          pdf.setFontSize(8);
          // 400 is normal weight, 500 is medium. We want a muted look so we can use gray color.
          pdf.setTextColor(150);
          const footerText = "CONNECT Training Solutions (P) Ltd. | Tirunelveli - 627001 | Ph: +91 9600965961";
          // Calculate center position
          const pageWidth = pdf.internal.pageSize.getWidth();
          const textWidth = pdf.getTextWidth(footerText);
          const x = (pageWidth - textWidth) / 2;
          // Position at the bottom (297mm height - 10mm margin)
          const y = 287;

          pdf.text(footerText, x, y);
        }

        // Generate filename
        const collegeName = data.collegeName.replace(/[^a-zA-Z0-9 ]/g, " ").trim() || "College";
        const filename = `${collegeName} - Training Proposal.pdf`;

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
