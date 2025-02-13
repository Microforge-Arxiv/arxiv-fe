import { z } from 'zod'
import { NextResponse } from 'next/server'

// Input validation schema
const inputSchema = z.object({
  query: z.string().min(1, "Query is required"),
})

export async function POST(req: Request) {
  try {
      // Validate request body
    const body = await req.json()
    const result = inputSchema.safeParse(body)
    if (!result.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    // 1. Authenticate and get a session token
    const sessionUrl = `${process.env.METABASE_URL}/api/session`;
    const creds = { username: process.env.METABASE_USERNAME, password: process.env.METABASE_PASSWORD };

    const sessionResponse = await fetch(sessionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds)
    });

    if (!sessionResponse.ok) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 404 }) 
    }
      
    const sessionData = await sessionResponse.json();
    const sessionToken = sessionData.id;

    const headers = {
        "Content-Type": "application/json",
        "X-Metabase-Session": sessionToken
    };
      
      console.log("Request data", body);
      
    // 2. Define SQL query payload for research interests
    let payload = {
        database: 2,
        native: {
            query: body.query,
        },
        type: "native"
    };
      
    const datasetUrl = `${process.env.METABASE_URL}/api/dataset`;
      
    const response1 = await fetch(datasetUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    });
      
    if (!response1.ok) {
        throw new Error("Failed to fetch data");
    }
      
    const data1 = await response1.json();
      const rows = data1.data.rows;
      const cols = data1.data.cols.map((col: { display_name: any }) => col.display_name);

      const results = rows.map((row: { [x: string]: any }) => Object.fromEntries(cols.map((key: any, index: string | number) =>
        [key, row[index]])))

      
    return NextResponse.json({ data: results });
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
} 