import { SearchBar } from "@/components/dashboard/searchbar";
import { DataTable } from "@/components/dashboard/data-table";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Search your data using natural language queries
        </p>
      </div>
      <SearchBar />
      <DataTable data={null} />
    </div>
  );
} 