import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { OrganizationForm } from "./organization-form";

export default async function OrganizationSetup() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/sign-in');
  }

  // Check if user already has org
  const { data: profile } = await supabase
    .from('profiles')
    .select('orgid')
    .eq('userid', user.id)
    .single();

  if (profile?.orgid) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Organization Setup</h1>
          <p className="text-muted-foreground">
            Please provide your organization details to continue
          </p>
        </div>
        <OrganizationForm userId={user.id} />
      </div>
    </div>
  );
}