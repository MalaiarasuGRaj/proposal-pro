import { forwardRef } from "react";
import { ProposalData } from "@/types/proposal";
import qrWhatsapp from "@/assets/qr-whatsapp.jpg";

import { PROGRAM_MODULES } from "@/data/modules";

interface ProposalPreviewProps {
  data: ProposalData;
  proposalNumber?: string;
}

export const ProposalPreview = forwardRef<HTMLDivElement, ProposalPreviewProps>(
  ({ data, proposalNumber }, ref) => {
    const getValue = (value: string, placeholder: string) => {
      return value || `{{${placeholder}}}`;
    };

    const Watermark = () => (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <img
          src="/Connect Logo.png"
          alt=""
          className="w-[80%] max-w-[500px] object-contain opacity-[0.08]"
        />
      </div>
    );

    const calculateEstimate = () => {
      const price = parseFloat(data.price.replace(/,/g, "")) || 0;
      const days = parseFloat(data.trainingDays) || 0;
      const batches = parseFloat(data.numberOfBatches) || 0;
      const students = parseFloat(data.numberOfStudents) || 0;

      if (data.pricingModel === "Cost per Trainer per Day") {
        return price * days * batches;
      } else if (data.pricingModel === "Cost per Student per Day") {
        return price * days * students;
      }
      return 0;
    };

    const estimate = calculateEstimate();

    return (
      <div ref={ref} className="proposal-paper bg-white">
        {/* Page 1 - Cover Page with College Details */}
        <div className="pdf-page min-h-[1000px] flex flex-col p-8 relative" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
          <Watermark />
          {/* Presented To / By Table */}
          <div className="my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="gradient-header text-white py-3 px-4 text-left font-semibold w-1/2">
                    Presented To
                  </th>
                  <th className="gradient-header text-white py-3 px-4 text-left font-semibold w-1/2">
                    Presented By
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-proposal-table-border py-3 px-4 text-proposal-text font-medium">
                    {getValue(data.collegeName, "COLLEGE_NAME")}
                  </td>
                  <td className="border border-proposal-table-border py-3 px-4 text-proposal-text">
                    CONNECT Training Solutions (P) Ltd
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-right text-proposal-text font-medium text-sm mb-4 space-y-1">
            <div>
              <b>Date: </b> {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </div>
            {proposalNumber && (
              <div>
                <b>Ref No: </b> {proposalNumber}
              </div>
            )}
          </div>

          {/* College Details Table */}
          <div className="my-6 flex-grow">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-proposal-table-border">
                  <td className="py-3 px-4 text-proposal-muted font-medium bg-secondary/30 w-1/3">
                    College Name:
                  </td>
                  <td className="py-3 px-4 text-proposal-text font-medium">
                    {getValue(data.collegeName, "COLLEGE_NAME")}
                  </td>
                </tr>
                <tr className="border-b border-proposal-table-border">
                  <td className="py-3 px-4 text-proposal-muted font-medium bg-secondary/30">
                    Location:
                  </td>
                  <td className="py-3 px-4 text-proposal-text">
                    {getValue(data.location, "LOCATION")}
                  </td>
                </tr>
                <tr className="border-b border-proposal-table-border">
                  <td className="py-3 px-4 text-proposal-muted font-medium bg-secondary/30">
                    Primary Contact:
                  </td>
                  <td className="py-3 px-4 text-proposal-text">
                    {getValue(data.contactPerson, "CONTACT_PERSON")}
                  </td>
                </tr>
                <tr className="border-b border-proposal-table-border">
                  <td className="py-3 px-4 text-proposal-muted font-medium bg-secondary/30">
                    Mobile Number:
                  </td>
                  <td className="py-3 px-4 text-proposal-text">
                    {getValue(data.mobileNumber, "MOBILE_NUMBER")}
                  </td>
                </tr>
                <tr className="border-b border-proposal-table-border">
                  <td className="py-3 px-4 text-proposal-muted font-medium bg-secondary/30">
                    Email ID:
                  </td>
                  <td className="py-3 px-4 text-proposal-text">
                    {getValue(data.emailId, "EMAIL_ID")}
                  </td>
                </tr>
                <tr className="border-b border-proposal-table-border">
                  <td className="py-3 px-4 text-proposal-muted font-medium bg-secondary/30">
                    Program Name:
                  </td>
                  <td className="py-3 px-4 text-proposal-text font-medium">
                    {getValue(data.programName, "PROGRAM_NAME")}
                  </td>
                </tr>
                <tr className="border-b border-proposal-table-border">
                  <td className="py-3 px-4 text-proposal-muted font-medium bg-secondary/30">
                    Batch:
                  </td>
                  <td className="py-3 px-4 text-proposal-text">
                    {getValue(data.batch, "BATCH")}
                  </td>
                </tr>
                <tr className="border-b border-proposal-table-border">
                  <td className="py-3 px-4 text-proposal-muted font-medium bg-secondary/30">
                    Training Days Required:
                  </td>
                  <td className="py-3 px-4 text-proposal-text">
                    {getValue(data.trainingDays, "TRAINING_DAYS")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-proposal-muted pt-4 border-t border-proposal-table-border" data-html2canvas-ignore="true">
            CONNECT Training Solutions (P) Ltd. | Tirunelveli - 627001 | Ph: +91 9600965961
          </div>
        </div>

        {/* Visual Page Break for Preview */}
        <div className="border-t-4 border-dashed border-proposal-table-border my-4 print:hidden"></div>

        {/* Page 2 - Modules Covered */}
        <div className="pdf-page min-h-[1000px] flex flex-col p-8 relative" style={{ pageBreakAfter: 'always', breakAfter: 'page' }}>
          <Watermark />

          <h2 className="text-2xl font-bold text-proposal-header mb-8 text-center mt-8">
            Modules Covered
          </h2>

          <div className="flex-grow">
            {data.programName && PROGRAM_MODULES[data.programName] ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-proposal-muted mb-6 text-center">
                  Comprehensive curriculum for <span className="text-proposal-text font-bold">{data.programName}</span>
                </p>
                <div className="overflow-hidden border border-proposal-table-border rounded-lg">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="bg-secondary/30 text-proposal-muted py-3 px-4 text-left font-semibold border-b border-proposal-table-border w-16 text-center">
                          #
                        </th>
                        <th className="bg-secondary/30 text-proposal-muted py-3 px-4 text-left font-semibold border-b border-proposal-table-border">
                          Module Name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {PROGRAM_MODULES[data.programName].map((module, idx) => (
                        <tr key={idx} className="border-b border-proposal-table-border last:border-b-0">
                          <td className="py-3 px-4 text-proposal-muted font-medium text-center border-r border-proposal-table-border">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-4 text-proposal-text font-medium">
                            {module}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-2 text-base text-proposal-muted italic">
                  <p><b>Note 1:</b> The above modules indicate an outline of the topics proposed to be covered. A detailed table of contents and session-wise training schedule will be shared via email upon confirmation and completion of the proposal process.</p>
                  <p><b>Note 2:</b> The above table is indicative and can be customized based on the number of training days required and any topic-specific training requested by the College / Client.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-proposal-muted italic">
                {data.programName ? "No specific modules defined for this program." : "Please select a program to view modules."}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-proposal-muted pt-4 border-t border-proposal-table-border" data-html2canvas-ignore="true">
            CONNECT Training Solutions (P) Ltd. | Tirunelveli - 627001 | Ph: +91 9600965961
          </div>
        </div>

        {/* Visual Page Break for Preview */}
        <div className="border-t-4 border-dashed border-proposal-table-border my-4 print:hidden"></div>



        {/* Page 3 - Terms & Conditions */}
        <div className="pdf-page min-h-[1000px] flex flex-col p-8 relative" style={{ pageBreakInside: 'avoid' }}>
          <Watermark />

          <h2 className="text-2xl font-bold text-proposal-header mb-8 text-center">
            Fee Structure
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-secondary/30 rounded-lg p-6 border border-proposal-table-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-proposal-muted font-medium">Module Chosen:</span>
                <span className="text-proposal-text font-semibold text-lg text-right">
                  {getValue(data.programName, "PROGRAM_NAME")}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-proposal-muted font-medium">Number of Days:</span>
                <span className="text-proposal-text font-semibold text-lg text-right">
                  {getValue(data.trainingDays, "TRAINING_DAYS")}
                </span>
              </div>
              {data.pricingModel === "Cost per Trainer per Day" && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-proposal-muted font-medium">Number of Batches:</span>
                  <span className="text-proposal-text font-semibold text-lg text-right">
                    {getValue(data.numberOfBatches, "NUMBER_OF_BATCHES")}
                  </span>
                </div>
              )}
              {data.pricingModel === "Cost per Student per Day" && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-proposal-muted font-medium">Number of Students:</span>
                  <span className="text-proposal-text font-semibold text-lg text-right">
                    {getValue(data.numberOfStudents, "NUMBER_OF_STUDENTS")}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center mb-4">
                <span className="text-proposal-muted font-medium">Pricing Model:</span>
                <span className="text-proposal-text font-semibold text-lg">
                  {getValue(data.pricingModel, "PRICING_MODEL")}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-proposal-muted font-medium">Price (INR):</span>
                <span className="text-proposal-header font-bold text-2xl">
                  ₹{getValue(data.price, "PRICE")}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-proposal-table-border">
                <span className="text-proposal-muted font-bold text-lg">Estimate:</span>
                <span className="text-primary font-bold text-3xl">
                  ₹{estimate.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p className="text-sm text-proposal-muted italic">
              * All prices are subject to revision based on final training requirements and approvals.
            </p>
          </div>
          <h2 className="text-lg font-bold text-proposal-header mb-6">
            Terms & Conditions:
          </h2>

          <div className="space-y-3 text-sm text-proposal-text">
            {[
              "This proposal is valid for a period of 30 days from the date of issue unless stated otherwise.",
              "The scope of training, duration, and deliverables will be finalized based on mutual agreement and documented in writing via e-mail.",
              "50% of the total training fee shall be paid in advance to confirm the training schedule.",
              "The remaining 50% shall be paid on the final day of training / upon completion of the project.",
              "Payments not received within 30 days from the invoice date will attract a late payment charge of 2% per month or part thereof, calculated on a pro-rata per Day basis, until the outstanding amount is settled.",
              "Food and accommodation for the trainer(s), wherever applicable, shall be arranged and borne by the college / institution.",
              "All applicable taxes (including GST, if any) shall be charged extra as per Government of India norms."
            ].map((term, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="font-medium shrink-0 w-6">{index + 1}.</span>
                <span className="flex-1">{term}</span>
              </div>
            ))}
          </div>

          {/* Connect with CONNECT section */}
          <div className="mt-4 pt-4 border-t border-proposal-table-border">
            <h3 className="text-lg font-bold text-proposal-header mb-4 text-center">
              CONNECT Us:
            </h3>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <a
                  href="https://wa.me/919600965961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                  data-pdf-link="whatsapp"
                >
                  <p className="text-sm text-proposal-muted mb-2">WhatsApp Chat</p>
                  <img src={qrWhatsapp} alt="WhatsApp QR Code" className="w-24 h-24 mx-auto" />
                  <p className="text-xs text-proposal-muted mt-0">Click to Chat</p>
                </a>
              </div>
              <div className="text-center">
                <a
                  href="http://connecteducation.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                  data-pdf-link="website"
                >
                  <p className="text-sm text-proposal-muted mb-2">Website</p>
                  <img src="/connecteducation-qr.png" alt="Website QR Code" className="w-24 h-24 mx-auto" />
                  <p className="text-xs text-proposal-muted mt-0">Click to Visit</p>
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-proposal-muted pt-4 mt-auto border-t border-proposal-table-border" data-html2canvas-ignore="true">
            CONNECT Training Solutions (P) Ltd. | Tirunelveli - 627001 | Ph: +91 9600965961
          </div>
        </div>
      </div>
    );
  }
);

ProposalPreview.displayName = "ProposalPreview";
