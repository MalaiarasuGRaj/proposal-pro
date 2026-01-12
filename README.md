# Connect Training Solutions - Proposal Generator

A specialized web application designed for Connect Training Solutions to streamline the creation of professional training proposals. This tool automates the proposal generation process, ensuring consistency, accuracy, and efficiency.

## 🚀 Key Features

*   **Interactive Proposal Form**: A dynamic multi-step form for entering proposal details, including college information, program selection, pricing models, and contact details.
*   **Real-time Live Preview**: View the proposal document being built in real-time as you enter data, ensuring "what you see is what you get".
*   **Dynamic Fee Calculation**: Automatically calculates estimates based on different pricing models ("Cost per Trainer per Day" vs "Cost per Student per Day").
*   **PDF Generation**: Generates high-quality, professional PDF proposals with a single click, ready for distribution.
*   **Proposal Repository**: A comprehensive history log that saves generated proposals to a Supabase backend. Users can search, filter (by program, date, etc.), delete, and re-download past proposals.
*   **Program & Module Management**: Pre-configured list of training programs and their respective modules (e.g., specific modules for specialized programs) are automatically populated.
*   **Repository Management**: Tools for managing the history, including individual deletions and a "Clear Repository" function.

## 🛠️ Tech Stack

This project is built with a modern, robust frontend stack:

*   **Frontend Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) for fast development and building.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and code quality.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (based on Radix UI) for accessible and customizable components.
*   **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest) for efficient server state management.
*   **Form Handling**: [React Hook Form](https://react-hook-form.com/) combined with [Zod](https://zod.dev/) for schema validation.
*   **PDF Generation**: [html2canvas](https://html2canvas.hertzen.com/) and [jsPDF](https://github.com/parallax/jsPDF) for client-side PDF creation.
*   **Table/Data**: [TanStack Table](https://tanstack.com/table/latest) (if used for advanced data views) and Lucide React for icons.
*   **Backend/Database**: [Supabase](https://supabase.com/) for storing proposal history and authentication (if implemented).
*   **Routing**: [React Router](https://reactrouter.com/) for client-side navigation.

## 📂 Project Structure

*   `src/pages`: Main application pages (`Index.tsx` for the generator, `ProposalHistory.tsx` for the repository).
*   `src/components`: Reusable UI components (ProposalForm, ProposalPreview, etc.) and shadcn/ui primitives.
*   `src/hooks`: Custom React hooks (e.g., `usePdfExport`, `useProposalHistory`, `useMobile`).
*   `src/types`: TypeScript type definitions (e.g., `ProposalData`, `StoredProposal`).
*   `src/integrations/supabase`: Supabase client configuration and generated types.
*   `src/lib`: Utility functions (e.g., `utils.ts`).

## 🏁 Getting Started

To run this project locally, follow these steps:

### Prerequisites

*   Node.js (v18 or higher)
*   npm (or yarn/bun)

### Installation

1.  **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd proposal-pro
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Start the development server**:
    ```sh
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:8080` (or the port shown in your terminal).

## 📝 Usage

1.  **Dashboard**: The landing page presents the proposal generation form.
2.  **Fill Details**: Complete the required fields (College Name, Contact Person, Program, Batch Size, etc.).
3.  **Select Pricing**: Choose a pricing model and enter the rate. The estimate will pinpoint automatically.
4.  **Preview**: Check the "Live Preview" panel to verify the document layout and content.
5.  **Generate**: Click "Download PDF" to save the proposal and add it to the Repository.
6.  **Repository**: Click the "Repository" button to view, search, or manage previously generated proposals.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add some NewFeature'`).
4.  Push to the branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

## 📄 License

[Add License Information Here, e.g., Proprietary or MIT]
