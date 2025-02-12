'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createOrganization } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface OrganizationFormProps {
  userId: string;
}

export function OrganizationForm({ userId }: OrganizationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(undefined);

    const formData = new FormData(event.currentTarget);
    try {
      await createOrganization(formData);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="userId" value={userId} />
      
      <div className="space-y-2">
        <Label htmlFor="name">Organization Name</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Enter organization name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Organization URL</Label>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          name="requirements"
          placeholder="Enter any specific requirements"
          className="min-h-[100px]"
        />
      </div>

      {error && (
        <div className="text-sm text-destructive">{error}</div>
      )}

      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Setting up...' : 'Complete Setup'}
      </Button>
    </form>
  );
}