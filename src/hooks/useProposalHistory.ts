import { useState, useEffect } from "react";
import { ProposalData } from "@/types/proposal";
import { supabase } from "@/lib/supabase";

export interface StoredProposal {
    id: string;
    created_at: string;
    data: ProposalData;
    proposal_number: string;
}

export function useProposalHistory() {
    const [history, setHistory] = useState<StoredProposal[]>([]);
    const [proposalCount, setProposalCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadHistory();
        loadProposalCount();
    }, []);

    const loadHistory = async () => {
        try {
            console.log("Loading history from Supabase...");
            const { data, error } = await supabase
                .from('proposals')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Supabase select error:", error);
                throw error;
            }

            console.log("Fetched proposals:", data);

            if (data) {
                const mapData = data.map(item => ({
                    id: item.id,
                    created_at: item.created_at,
                    proposal_number: item.proposal_number,
                    data: {
                        collegeName: item.college_name,
                        location: item.location,
                        contactPerson: item.contact_person,
                        mobileNumber: item.mobile_number,
                        emailId: item.email_id,
                        programName: item.program_name,
                        batch: item.batch,
                        trainingDays: item.training_days,
                        pricingModel: item.pricing_model,
                        numberOfBatches: item.number_of_batches,
                        numberOfStudents: item.number_of_students,
                        price: item.price
                    } as ProposalData
                }));
                setHistory(mapData);
            }
        } catch (error) {
            console.error("Failed to load history:", error);
        }
    };

    // ... (rest of file)

    const deleteProposal = async (id: string) => {
        try {
            const { error } = await supabase.from('proposals').delete().eq('id', id);
            if (error) throw error;
            // Optimistic update
            setHistory(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Failed to delete proposal:", error);
            // Alert the user to the specific error
            // @ts-ignore
            alert(`Failed to delete: ${error.message || 'Unknown error'}`);
        }
    };

    const clearHistory = async () => {
        try {
            // Needed to delete all rows. 
            // Note: DELETE without WHERE is often blocked by RLS or Supabase safety limits without a policy allowing it or using a specific where clause.
            // For now, we'll try standard delete.
            const { error } = await supabase.from('proposals').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Hack to delete all
            if (error) throw error;
            setHistory([]);
        } catch (error) {
            console.error("Failed to clear history:", error);
        }
    };

    const loadProposalCount = async () => {
        try {
            const currentYear = new Date().getFullYear();
            const { data, error } = await supabase
                .from('proposal_logs')
                .select('sequence_number')
                .eq('year', currentYear)
                .order('sequence_number', { ascending: false })
                .limit(1);

            if (error) throw error;

            const maxCount = data && data.length > 0 ? data[0].sequence_number : 0;
            setProposalCount(maxCount);
        } catch (error) {
            console.error("Failed to load proposal count:", error);
        }
    };

    const saveProposal = async (data: ProposalData): Promise<string | null> => {
        setLoading(true);
        try {
            const currentYear = new Date().getFullYear();

            // Optimistic locking / Race condition handling could go here
            // For now, allow DB unique constraint to fail if parallel, but we will retry once

            let retry = 0;
            while (retry < 3) {
                // 1. Get latest count again from LOGS table
                const { data: maxData } = await supabase
                    .from('proposal_logs')
                    .select('sequence_number')
                    .eq('year', currentYear)
                    .order('sequence_number', { ascending: false })
                    .limit(1);

                const nextSeq = (maxData && maxData.length > 0 ? maxData[0].sequence_number : 0) + 1;
                const nextNum = `CTS/${currentYear}/${nextSeq.toString().padStart(3, '0')}`;

                // 2. Insert into Logs (for persistence) AND Proposals (for display)
                const { error: logError } = await supabase.from('proposal_logs').insert({
                    proposal_number: nextNum,
                    sequence_number: nextSeq,
                    year: currentYear,
                    college_name: data.collegeName,
                    program_name: data.programName,
                    pricing_model: data.pricingModel,
                    total_amount: data.price
                });

                if (logError) {
                    if (logError.code === '23505') { // Unique violation on logs
                        console.warn("Race condition in logs, retrying...");
                        retry++;
                        continue;
                    }
                    throw logError;
                }

                // 3. Insert into Main Repository
                const { error } = await supabase.from('proposals').insert({
                    proposal_number: nextNum,
                    sequence_number: nextSeq,
                    year: currentYear,
                    college_name: data.collegeName,
                    location: data.location,
                    contact_person: data.contactPerson,
                    mobile_number: data.mobileNumber,
                    email_id: data.emailId,
                    program_name: data.programName,
                    batch: data.batch,
                    training_days: data.trainingDays,
                    pricing_model: data.pricingModel,
                    number_of_batches: data.numberOfBatches,
                    number_of_students: data.numberOfStudents,
                    price: data.price
                });

                if (!error) {
                    await loadHistory();
                    await loadProposalCount();
                    setLoading(false);
                    return nextNum;
                }

                if (error.code === '23505') { // Unique violation (proposal_number)
                    console.warn("Race condition detected, retrying...");
                    retry++;
                } else {
                    throw error;
                }
            }
            throw new Error("Failed to secure a unique proposal number after retries.");

        } catch (error) {
            console.error("Failed to save proposal:", error);
            if (error instanceof Error) {
                console.error("Error message:", error.message);
                console.error("Error stack:", error.stack);
            }
            // Log Supabase specific error if available
            // @ts-ignore
            if (error?.code) console.error("Supabase Error Code:", error.code);
            // @ts-ignore
            if (error?.details) console.error("Supabase Error Details:", error.details);

            setLoading(false);
            return null;
        }
    };

    // Exposing the new functions added above

    return {
        history,
        saveProposal,
        proposalCount, // This is the MAX count, so current prediction is this + 1
        refreshHistory: loadHistory,
        deleteProposal,
        clearHistory,
        loading
    };
}
