'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  url: z.string().url().optional().or(z.literal('')),
  requirements: z.string().optional(),
  userId: z.string().uuid()
});

export async function createOrganization(formData: FormData) {
  const supabase = await createClient();
  
  const validatedFields = organizationSchema.parse({
    name: formData.get('name'),
    url: formData.get('url'),
    requirements: formData.get('requirements'),
    userId: formData.get('userId'),
  });

  try {
    // Start a transaction
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        name: validatedFields.name,
        url: validatedFields.url || null,
        requirements: validatedFields.requirements || null,
      })
      .select()
      .single();

    if (orgError) throw orgError;

    // Update user profile with org id
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ orgid: org.id })
      .eq('userid', validatedFields.userId);

    if (profileError) throw profileError;

    revalidatePath('/dashboard');
    redirect('/dashboard');
  } catch (error) {
    throw new Error('Failed to create organization');
  }
} 