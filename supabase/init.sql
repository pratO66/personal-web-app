-- Supabase database initialization
-- This file is run when the Supabase container starts

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    bio TEXT,
    email VARCHAR(255),
    location VARCHAR(255),
    avatar_url VARCHAR(500),
    cv_url VARCHAR(500),
    tech_stack JSONB,
    socials JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    long_description TEXT,
    tags JSONB,
    stack JSONB,
    demo_url VARCHAR(500),
    repo_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
    id BIGSERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description TEXT,
    highlights JSONB,
    technologies JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    body TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_experience_current ON experience(current);
CREATE INDEX IF NOT EXISTS idx_experience_start_date ON experience(start_date);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON messages(sent_at);

-- Insert default profile data (will be replaced by SeedRunner in dev)
INSERT INTO profile (name, tagline, bio, email, location, tech_stack, socials)
VALUES (
    'V',
    'Night City Developer',
    'Full-stack engineer wiring chrome to silicon. Java on the back, React on the front, neon all over.',
    'v@nightcity.dev',
    'Night City, NC',
    '["Java", "Spring Boot", "TypeScript", "Next.js", "Postgres", "Docker"]'::jsonb,
    '{"github": "https://github.com/yourhandle", "linkedin": "https://linkedin.com/in/yourprofile"}'::jsonb
) ON CONFLICT DO NOTHING;