"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { searchAction } from "@/app/actions/search";
import { useToast } from "@/hooks/use-toast"

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const formData = new FormData();
      formData.append('query', query.trim());
      formData.append('profileId', user.id);

      const result = await searchAction(formData);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // Emit the results to parent component
      // TODO: Implement results handling
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to execute search"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input 
        placeholder="Who are you looking for?"
        className="pl-9 h-12 text-lg"
      />
    </div>
  );
} 