-- Add missing DELETE policy for proposals table
create policy "Enable delete for all users"
on public.proposals
for delete
using (true);

-- Also ensure proposal_logs is secure but accessible (optional check)
-- (We already defined policies for logs in the previous script)
