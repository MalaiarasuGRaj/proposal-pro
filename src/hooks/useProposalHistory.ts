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

    return {
        history,
        saveProposal,
        deleteProposal,
        clearHistory,
        refreshHistory: loadHistory
    };
}
