-- Velora Grand Hotel & Spa - Supabase Database Schema

-- 1. Create Admins Table
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial admin user
INSERT INTO public.admins (username, email)
VALUES ('saqibkhan', 'sk80139082@gmail.com')
ON CONFLICT (username) DO NOTHING;

-- 2. Create Rooms Table
CREATE TABLE IF NOT EXISTS public.rooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    capacity INT DEFAULT 2,
    bed_type TEXT,
    size TEXT,
    main_image TEXT,
    status TEXT DEFAULT 'Available',
    amenities JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    room_id TEXT NOT NULL,
    room_name TEXT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    adults INT DEFAULT 2,
    children INT DEFAULT 0,
    special_requests TEXT,
    total_amount NUMERIC(10,2) NOT NULL,
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for Public Access
CREATE POLICY "Allow public read access to rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow guests to view their own bookings" ON public.bookings FOR SELECT USING (true);

-- 6. Storage Bucket for Room Images
-- Note: Create a public storage bucket named "room-images" in Supabase Storage dashboard.
