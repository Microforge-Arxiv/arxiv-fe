"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
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
        // let dummyQueries = Array.from(Array(100).keys()).map(i => {
        //   return {
        //     id: i,
        //     created_at: "",
        //     query: "verryyyyy longgggggg assssssss quwerries longgggggg assssssss quwerries"
        //   }
        // });
        // setQueries(dummyQueries);
      }
    }

    fetchQueries();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Previous Searches</h2>
      </div>
      <div className="flex-1 w-full overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          {queries.map((query) => (
            <Button
              key={query.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                selectedQuery === query.id && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              onClick={() => setSelectedQuery(query.id)}
            >
              <div className="truncate">
                {query.query}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 