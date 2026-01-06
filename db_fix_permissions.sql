-- Grant necessary permissions to anon and authenticated roles
-- This is often required in addition to RLS policies
GRANT ALL ON TABLE public.proposals TO anon;
GRANT ALL ON TABLE public.proposals TO authenticated;
GRANT ALL ON TABLE public.proposals TO service_role;

-- Re-apply the policy just in case (idempotent if using CREATE OR REPLACE, but standard CREATE throws if exists, so we just run grants here)
-- If the policy already exists from the previous step, these GRANTs should unblock the action.
