"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchQuery {
  id: number;
  query: string;
  created_at: string;
}

export function Sidebar() {
  const [queries, setQueries] = useState<SearchQuery[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchQueries() {
      const { data: profile } = await supabase.auth.getUser();
      if (!profile.user) return;

      const { data: queries } = await supabase
        .from('searches')
        .select('id, query, created_at')
        .order('created_at', { ascending: false });

      if (queries) {
        setQueries(queries);
      }
    }

    fetchQueries();
  }, []);

  return (
    <div className="h-full border-r bg-sidebar">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Previous Searches</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-2">
          {queries.map((query) => (
            <Button
              key={query.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal my-1",
                selectedQuery === query.id && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              onClick={() => setSelectedQuery(query.id)}
            >
              <span className="truncate">{query.query}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 