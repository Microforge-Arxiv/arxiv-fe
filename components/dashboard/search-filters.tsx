import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Binary, Settings } from "lucide-react";

export function SearchFilters() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="gap-2">
        <FileText className="h-4 w-4" />
        Job Description
      </Button>
      <Button variant="outline" size="sm" className="gap-2">
        <Binary className="h-4 w-4" />
        Boolean
      </Button>
      <Button variant="outline" size="sm" className="gap-2">
        <Settings className="h-4 w-4" />
        Select Manually
      </Button>
    </div>
  );
} 