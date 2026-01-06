-- Create a new table for permanent proposal logs/audit trail
CREATE TABLE proposal_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    proposal_number TEXT NOT NULL UNIQUE,
    sequence_number INTEGER NOT NULL,
    year INTEGER NOT NULL,
    -- Store simplified metadata just for context
    college_name TEXT,
    program_name TEXT,
    pricing_model TEXT,
    total_amount TEXT
);

-- Enable Row Level Security
ALTER TABLE proposal_logs ENABLE ROW LEVEL SECURITY;

-- Allow all actions for now (development mode)
-- In production, this should likely be INSERT/SELECT only, no DELETE
CREATE POLICY "Enable all access for all users" ON proposal_logs
    FOR ALL USING (true) WITH CHECK (true);

-- Grant access to authenticated and anon users
GRANT ALL ON proposal_logs TO authenticated;
GRANT ALL ON proposal_logs TO anon;
