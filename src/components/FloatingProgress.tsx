import React from 'react';
import { CheckCircle2, FileText } from 'lucide-react';

interface FloatingProgressProps {
    current: number;
    total: number;
}

export function FloatingProgress({ current, total }: FloatingProgressProps) {
    const percentage = Math.round((current / total) * 100);
    const isComplete = current === total;

    // SVG Configuration
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="fixed bottom-8 right-8 z-50 group">
            <div className="relative flex items-center justify-center p-2 bg-card rounded-full shadow-paper border border-border hover:scale-105 transition-transform duration-200">
                {/* Tooltip */}
                <div className="absolute right-full mr-4 px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {isComplete ? 'All fields completed!' : `${current} of ${total} fields completed`}
                </div>

                {/* Circular Progress SVG */}
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background Circle */}
                        <circle
                            className="text-secondary"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="32"
                            cy="32"
                        />
                        {/* Progress Circle */}
                        <circle
                            className="text-primary transition-all duration-500 ease-out"
                            strokeWidth="4"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="32"
                            cy="32"
                        />
                    </svg>

                    {/* Centered Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {isComplete ? (
                            <CheckCircle2 className="w-6 h-6 text-success animate-in zoom-in" />
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-xs font-bold text-primary">{percentage}%</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
