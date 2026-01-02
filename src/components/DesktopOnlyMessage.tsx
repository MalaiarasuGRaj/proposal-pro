import React from "react";
import { Laptop } from "lucide-react";

export const DesktopOnlyMessage = () => {
    return (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-card w-full max-w-md p-8 rounded-lg shadow-xl border border-border flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
                <div className="p-6 bg-primary/10 rounded-full animate-pulse">
                    <Laptop className="w-12 h-12 text-primary" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-foreground">
                        Desktop Only Application
                    </h1>

                    <div className="space-y-2">
                        <p className="text-lg font-medium text-foreground">
                            Connect PMS Tool is designed for desktop use only.
                        </p>
                        <p className="text-muted-foreground">
                            Please open this application on a desktop or laptop computer to access the full functionality.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
