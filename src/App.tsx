import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProposalHistory from "./pages/ProposalHistory";
import NotFound from "./pages/NotFound";
import { DesktopOnlyMessage } from "./components/DesktopOnlyMessage";

import { SignedIn, SignedOut, SignIn, ClerkProvider, RedirectToSignIn } from "@clerk/clerk-react";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const App = () => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Mobile Block Message */}
        <div className="lg:hidden">
          <DesktopOnlyMessage />
        </div>

        {/* Main Application */}
        <div className="hidden lg:block">
          <BrowserRouter>
            <SignedOut>
              <div className="flex items-center justify-center min-h-screen bg-background">
                <SignIn routing="hash" />
              </div>
            </SignedOut>
            <SignedIn>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/repository" element={<ProposalHistory />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SignedIn>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
