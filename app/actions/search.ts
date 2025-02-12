'use server';

import { createClient } from "@/utils/supabase/server";
import { generateSQLFromNaturalLanguage } from "@/utils/gemini";
import { executeSQLQuery } from "@/utils/database";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().min(1, "Query is required"),
  profileId: z.string().uuid()
});

export async function searchAction(formData: FormData) {
  const validatedFields = searchSchema.parse({
    query: formData.get('query'),
    profileId: formData.get('profileId')
  });

  try {
    // Generate SQL query
    const tableSchema = `
      -- Organizations Table
      CREATE TABLE organizations (
        id BIGINT PRIMARY KEY,
        name VARCHAR NOT NULL,
        url VARCHAR,
        requirements VARCHAR
      );

      -- Profiles Table
      CREATE TABLE profiles (
        id BIGINT PRIMARY KEY,
        userid UUID,
        orgid BIGINT
      );

      -- Searches Table
      CREATE TABLE searches (
        id BIGINT PRIMARY KEY,
        profileid BIGINT,
        query VARCHAR NOT NULL
      );
    `;

    const sqlQuery = await generateSQLFromNaturalLanguage(
      validatedFields.query, 
      tableSchema
    );

    // Execute the query
    const results = await executeSQLQuery(sqlQuery);

    // Save the search query
    const supabase = await createClient();
    await supabase.from('searches').insert({
      query: validatedFields.query,
      profileid: validatedFields.profileId
    });

    return { success: true, data: results };
  } catch (error) {
    console.error("Search error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An error occurred" 
    };
  }
} 