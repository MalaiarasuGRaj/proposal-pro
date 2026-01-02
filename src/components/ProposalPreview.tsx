import { forwardRef } from "react";
import { ProposalData } from "@/types/proposal";
import connectLogo from "@/assets/connect-logo.jpg";
import qrWhatsapp from "@/assets/qr-whatsapp.jpg";
import qrWebsite from "@/assets/qr-website.jpg";

interface ProposalPreviewProps {
  data: ProposalData;
}

export const ProposalPreview = forwardRef<HTMLDivElement, ProposalPreviewProps>(
  ({ data }, ref) => {
    const getValue = (value: string, placeholder: string) => {
      return value || `{{${placeholder}}}`;
    };

    return (
      <div ref={ref} className="proposal-paper bg-white">
        {/* Page 1 - Cover Page */}
        <div className="min-h-[800px] flex flex-col p-8">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <img 
              src={connectLogo} 
              alt="Connect Training Solutions" 
              className="h-20 mx-auto mb-4 object-contain"
            />
            <div className="text-sm text-proposal-muted space-y-1">
              <p>Tirunelveli, Tamil Nadu - 627001</p>
              <p>+91 9600965961</p>
              <p className="text-primary">www.connecteducation.com</p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center my-8">
            <h1 className="text-3xl font-bold text-proposal-header tracking-wide">
              TRAINING PROPOSAL
            </h1>
          </div>

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
                    Connect Training Solutions (P) Ltd
                  </td>
                </tr>
              </tbody>
            </table>
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
          <div className="text-center text-xs text-proposal-muted pt-4 border-t border-proposal-table-border">
            CONNECT Training Solutions (P) Ltd. | Tirunelveli - 627001 | Ph: +91 9600965961
          </div>
        </div>

        {/* Page Break */}
        <div className="border-t-4 border-dashed border-proposal-table-border my-4"></div>

        {/* Page 2 - Fee Structure */}
        <div className="min-h-[400px] flex flex-col p-8">
          <h2 className="text-2xl font-bold text-proposal-header mb-8 text-center">
            Fee Structure
          </h2>

          <div className="space-y-6 flex-grow">
            <div className="bg-secondary/30 rounded-lg p-6 border border-proposal-table-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-proposal-muted font-medium">Pricing Model:</span>
                <span className="text-proposal-text font-semibold text-lg">
                  {getValue(data.pricingModel, "PRICING_MODEL")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-proposal-muted font-medium">Price (INR):</span>
                <span className="text-proposal-header font-bold text-2xl">
                  ₹{getValue(data.price, "PRICE")}
                </span>
              </div>
            </div>

            <p className="text-sm text-proposal-muted italic">
              * All prices are subject to revision based on final training requirements and approvals.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-proposal-muted pt-4 border-t border-proposal-table-border">
            CONNECT Training Solutions (P) Ltd. | Tirunelveli - 627001 | Ph: +91 9600965961
          </div>
        </div>

        {/* Page Break */}
        <div className="border-t-4 border-dashed border-proposal-table-border my-4"></div>

        {/* Page 3 - Terms & Conditions */}
        <div className="min-h-[600px] flex flex-col p-8">
          <h2 className="text-2xl font-bold text-proposal-header mb-6">
            Terms & Conditions:
          </h2>

          <ol className="list-decimal list-outside ml-5 space-y-3 text-sm text-proposal-text flex-grow">
            <li>This proposal is valid for a period of 30 days from the date of issue unless stated otherwise.</li>
            <li>The scope of training, duration, and deliverables will be finalized based on mutual agreement and documented in writing.</li>
            <li>Any modifications to the agreed scope may result in changes to the commercial terms and timelines.</li>
            <li>Payment terms, including advance and balance payment schedules, will be communicated separately and must be adhered to as agreed.</li>
            <li>Training schedules are subject to trainer availability and confirmation from the client.</li>
            <li>Connect Training Solutions (P) Ltd. reserves the right to reschedule training sessions due to unforeseen circumstances, with prior notice to the client.</li>
            <li>All training materials, content, and methodologies provided remain the intellectual property of Connect Training Solutions (P) Ltd. and may not be reproduced or distributed without written consent.</li>
            <li>The client is responsible for ensuring participant availability, infrastructure, and necessary arrangements required for the training program.</li>
            <li>Cancellation or postponement requests must be communicated in advance and may be subject to applicable charges.</li>
            <li>This proposal is confidential and intended solely for the addressed organization. It should not be shared with third parties without prior approval.</li>
          </ol>

          {/* Connect with CONNECT section */}
          <div className="mt-8 pt-6 border-t border-proposal-table-border">
            <h3 className="text-lg font-bold text-proposal-header mb-4 text-center">
              Connect with CONNECT:
            </h3>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <p className="text-sm text-proposal-muted mb-2">WhatsApp Chat</p>
                <img src={qrWhatsapp} alt="WhatsApp QR Code" className="w-24 h-24 mx-auto" />
                <p className="text-xs text-proposal-muted mt-2">Scan to Chat</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-proposal-muted mb-2">Website</p>
                <img src={qrWebsite} alt="Website QR Code" className="w-24 h-24 mx-auto" />
                <p className="text-xs text-proposal-muted mt-2">Scan to visit website</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-proposal-muted pt-4 mt-4 border-t border-proposal-table-border">
            CONNECT Training Solutions (P) Ltd. | Tirunelveli - 627001 | Ph: +91 9600965961
          </div>
        </div>
      </div>
    );
  }
);

ProposalPreview.displayName = "ProposalPreview";
