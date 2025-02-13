"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SearchBar({ setData }: { setData: (data: any) => void;}) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Call the server-side API route
      const response = await fetch('/api/generate-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate SQL');
      }

      const data = await response.json();

      const response1 = await fetch('/api/run-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: data.sql.trim() })
      });

      if (!response1.ok) {
        const error = await response1.json();
        throw new Error(error.error || 'Failed to fetch data');
      }

      const data1 = await response1.json();
      setData(data1.data);
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
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Who are you looking for?"
        className="pl-9 h-12 text-lg"
        disabled={isLoading}
      />
      <Button 
        type="submit"
        disabled={isLoading || !query.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
} 