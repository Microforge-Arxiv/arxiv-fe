import { z } from 'zod'
import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getAllCategories, getAllResearchInterests } from '@/utils/data';

// Input validation schema
const inputSchema = z.object({
  query: z.string().min(1, "Query is required").max(500),
  // profileId: z.string().uuid()
})

export async function POST(req: Request) {
  try {
    // Validate request body
    const body = await req.json()
    const result = inputSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 }) 
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Add database schema context to the prompt
    const tableSchema = `
      CREATE TABLE public.researcher_test (
        id INTEGER PRIMARY KEY,
        researcher_slug TEXT UNIQUE,
        name TEXT NOT NULL,
        current_affiliation TEXT,
        email_domains TEXT,
        website TEXT,
        research_interests TEXT,
        citations_all INTEGER DEFAULT 0,
        citations_2020 INTEGER DEFAULT 0,
        h_index_all INTEGER DEFAULT 0,
        h_index_2020 INTEGER DEFAULT 0,
        i10_index_all INTEGER DEFAULT 0,
        i10_index_2020 INTEGER DEFAULT 0,
        num_papers INTEGER DEFAULT 0,
        med_contributor_ranking FLOAT DEFAULT 0.0,
        citations_2020_score FLOAT DEFAULT 0.0,
        h_index_2020_score FLOAT DEFAULT 0.0,
        i10_index_2020_score FLOAT DEFAULT 0.0,
        num_papers_score FLOAT DEFAULT 0.0,
        rank_score FLOAT DEFAULT 0.0,
        final_score FLOAT DEFAULT 0.0,
        country TEXT,
        university TEXT,
        category TEXT
      );
    `

    const allCategories = getAllCategories();
    const allReseachInterests = getAllResearchInterests();

    const prompt = `Given this database schema:
    ${tableSchema}

    The column research_interests can take any combination of these values ${allReseachInterests}.
    The column category can take any combination of these values ${allCategories}.

    Convert this natural language query into a SQL query:
    "${result.data.query}"

    Return ONLY the SQL query, nothing else. Don't forget to append the public schema before the table name`;

    const response = await model.generateContent(prompt)
    const sqlQuery = response.response.text()
      .trim()
      .replace(/```sql/g, '')
      .replace(/```/g, '');

    // Validate generated SQL
    if (!sqlQuery.toLowerCase().trim().startsWith('select')) {
      return NextResponse.json(
        { error: 'Invalid SQL generated' }, 
        { status: 400 }
      )
    }

    return NextResponse.json({ sql: sqlQuery.toLowerCase().trim() })

  } catch (error) {
    console.error('Error generating SQL:', error)
    return NextResponse.json(
      { error: 'Failed to generate SQL' },
      { status: 500 }
    )
  }
} 