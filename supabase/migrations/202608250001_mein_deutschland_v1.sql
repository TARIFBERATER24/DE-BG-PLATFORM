create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  email text,
  postal_code text,
  city text,
  household_size integer check (household_size is null or household_size > 0),
  housing_type text check (housing_type is null or housing_type in ('rent','own')),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  provider text not null,
  product_name text,
  customer_number text,
  contract_number text,
  monthly_price numeric(12,2),
  annual_price numeric(12,2),
  start_date date,
  end_date date,
  cancellation_deadline date,
  notice_period text,
  auto_renewal boolean,
  status text not null default 'active',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  document_type text not null default 'other',
  storage_path text not null,
  related_contract_id uuid references public.contracts(id) on delete set null,
  processing_status text not null default 'uploaded',
  created_at timestamptz not null default now()
);

create table if not exists public.deadlines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete cascade,
  title text not null,
  description text,
  deadline_at date not null,
  deadline_type text not null default 'other',
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null default 'info',
  title text not null,
  body text,
  read boolean not null default false,
  related_entity_type text,
  related_entity_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.tariff_consultations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  status text not null default 'started',
  input_data jsonb not null default '{}'::jsonb,
  result_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.affiliate_offers (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  provider text not null,
  product_name text,
  source text,
  affiliate_url text,
  price_data jsonb not null default '{}'::jsonb,
  commission_data jsonb,
  active boolean not null default false,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.contracts enable row level security;
alter table public.documents enable row level security;
alter table public.deadlines enable row level security;
alter table public.notifications enable row level security;
alter table public.tariff_consultations enable row level security;
alter table public.affiliate_offers enable row level security;

create policy "profiles own row" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "contracts own rows" on public.contracts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "documents own rows" on public.documents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "deadlines own rows" on public.deadlines for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notifications own rows" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "consultations own rows" on public.tariff_consultations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, first_name, last_name, email)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('private-documents', 'private-documents', false, 5242880, array['application/pdf','image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "users upload own documents" on storage.objects for insert to authenticated
with check (bucket_id = 'private-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "users read own documents" on storage.objects for select to authenticated
using (bucket_id = 'private-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "users delete own documents" on storage.objects for delete to authenticated
using (bucket_id = 'private-documents' and (storage.foldername(name))[1] = auth.uid()::text);

create index if not exists contracts_user_id_idx on public.contracts(user_id);
create index if not exists deadlines_user_id_deadline_at_idx on public.deadlines(user_id, deadline_at);
create index if not exists documents_user_id_created_at_idx on public.documents(user_id, created_at desc);
create index if not exists notifications_user_id_created_at_idx on public.notifications(user_id, created_at desc);
