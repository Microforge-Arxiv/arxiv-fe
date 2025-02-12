-- Organizations Table
CREATE TABLE organizations (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
industry TEXT,
size INTEGER,
location TEXT,
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT NOW()
);

-- Searches Table
CREATE TABLE searches (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
job_requirements TEXT NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);

-- Candidates Table
CREATE TABLE candidates (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
email TEXT UNIQUE,
phone TEXT,
skills TEXT[], -- Array of skills
experience INTEGER, -- In years
location TEXT,
resume_url TEXT, -- URL to resume
created_at TIMESTAMP DEFAULT NOW()
);

-- Search Results Table (Links Searches to Candidates)
CREATE TABLE search_results (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
search_id UUID REFERENCES searches(id) ON DELETE CASCADE,
candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
match_score DECIMAL(5,2) CHECK (match_score BETWEEN 0 AND 100),
created_at TIMESTAMP DEFAULT NOW()
);
