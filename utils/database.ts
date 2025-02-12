import { createClient } from "@/utils/supabase/server";

export async function executeSQLQuery(sqlQuery: string) {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase.rpc('execute_query', {
      query_text: sqlQuery
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error executing SQL:", error);
    throw new Error("Failed to execute SQL query");
  }
} 