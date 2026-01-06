import { useState, useEffect } from "react";
import { ProposalData } from "@/types/proposal";

export interface StoredProposal {
    id: string;
    timestamp: number;
    data: ProposalData;
}

const STORAGE_KEY = "proposal_history";

export function useProposalHistory() {
    const [history, setHistory] = useState<StoredProposal[]>([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setHistory(JSON.parse(stored));
            }
        } catch (error) {
            console.error("Failed to load proposal history:", error);
        }
    };

    const saveProposal = (data: ProposalData) => {
        try {
            const newProposal: StoredProposal = {
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                data,
            };

            const updatedHistory = [newProposal, ...history];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
            setHistory(updatedHistory);
        } catch (error) {
            console.error("Failed to save proposal:", error);
        }
    };

    const deleteProposal = (id: string) => {
        try {
            const updatedHistory = history.filter((p) => p.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
            setHistory(updatedHistory);
        } catch (error) {
            console.error("Failed to delete proposal:", error);
        }
    };

    const clearHistory = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            setHistory([]);
        } catch (error) {
            console.error("Failed to clear history:", error);
        }
    };

    // Proposal Count Logic
    const [proposalCount, setProposalCount] = useState(1);
    const COUNT_STORAGE_KEY = "proposal_count";
    const YEAR_STORAGE_KEY = "proposal_year";

    useEffect(() => {
        try {
            const currentYear = new Date().getFullYear().toString();
            const storedYear = localStorage.getItem(YEAR_STORAGE_KEY);
            const storedCount = localStorage.getItem(COUNT_STORAGE_KEY);

            if (storedYear !== currentYear) {
                // New year, reset counter
                setProposalCount(1);
                localStorage.setItem(COUNT_STORAGE_KEY, "1");
                localStorage.setItem(YEAR_STORAGE_KEY, currentYear);
            } else if (storedCount) {
                // Same year, load counter
                setProposalCount(parseInt(storedCount, 10));
            } else {
                // Initial setup for current year
                localStorage.setItem(YEAR_STORAGE_KEY, currentYear);
                localStorage.setItem(COUNT_STORAGE_KEY, "1");
            }
        } catch (error) {
            console.error("Failed to load proposal count:", error);
        }
    }, []);

    const incrementProposalCount = () => {
        try {
            const newCount = proposalCount + 1;
            setProposalCount(newCount);
            localStorage.setItem(COUNT_STORAGE_KEY, newCount.toString());
        } catch (error) {
            console.error("Failed to save proposal count:", error);
        }
    };

    return {
        history,
        saveProposal,
        deleteProposal,
        clearHistory,
        refreshHistory: loadHistory,
        proposalCount,
        incrementProposalCount
    };
}
