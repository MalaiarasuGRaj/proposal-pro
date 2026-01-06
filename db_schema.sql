-- Create the proposals table
create table public.proposals (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  proposal_number text unique not null,
  sequence_number integer not null,
  year integer not null,
  college_name text,
  location text,
  contact_person text,
  mobile_number text,
  email_id text,
  program_name text,
  batch text,
  training_days text,
  pricing_model text,
  number_of_batches text,
  number_of_students text,
  price text
);

-- Enable Row Level Security (RLS)
alter table public.proposals enable row level security;

-- Create a policy that allows anyone to insert (since we have no auth yet)
-- WARNING: For production with sensitive data, you should add Authentication.
create policy "Enable insert for all users"
on public.proposals
for insert
with check (true);

-- Create a policy that allows anyone to select
create policy "Enable read for all users"
on public.proposals
for select
using (true);

-- Create a policy that allows anyone to update
create policy "Enable update for all users"
on public.proposals
for update
using (true);
