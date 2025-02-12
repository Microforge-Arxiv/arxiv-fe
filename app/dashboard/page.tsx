import { SearchFilters } from "@/components/dashboard/search-filters";
import { SearchBar } from "@/components/dashboard/searchbar";
import { DataTable } from "@/components/dashboard/data-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">PeopleGPT</h1>
      </div>
      
      <div className="space-y-4">
        <SearchBar />
        <SearchFilters />
        <DataTable data={null} />
      </div>
    </div>
  );
} 