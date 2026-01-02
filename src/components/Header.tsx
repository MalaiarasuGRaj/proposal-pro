import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/Connect Logo.png"
              alt="Connect Logo"
              className="w-10 h-10 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">Connect Training Solutions</h1>
              <p className="text-xs text-muted-foreground">Proposal Management System</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Auto-generate professional proposals</span>
          </div>
        </div>
      </div>
    </header>
  );
}
