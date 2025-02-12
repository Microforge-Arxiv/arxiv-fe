import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function generateSQLFromNaturalLanguage(
  naturalLanguageQuery: string,
  tableSchema: string
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Given this database schema:
${tableSchema}

Convert this natural language query into a SQL query:
"${naturalLanguageQuery}"

Return ONLY the SQL query, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const sql = result.response.text();
    console.log("sql", sql.trim().replace("```sql", "").replace("```", ""));
    return sql.trim().replace("```sql", "").replace("```", "");
  } catch (error) {
    console.error("Error generating SQL:", error);
    throw new Error("Failed to generate SQL query");
  }
} 