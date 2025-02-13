"use client"

import { SearchFilters } from "@/components/dashboard/search-filters";
import { SearchBar } from "@/components/dashboard/searchbar";
import { DataTable } from "@/components/dashboard/data-table";
import { useState } from "react";

export default async function DashboardPage() {
  const [data, setData] = useState(null);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ResearcherGPT</h1>
      </div>
      
      <div className="space-y-4">
        <SearchBar setData={setData} />
        {/* <SearchFilters /> */}
        {data && <DataTable data={data} />}
      </div>
    </div>
  );
} 