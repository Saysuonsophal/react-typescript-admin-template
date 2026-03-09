import { FetchAPI } from "@/services/product.api";
import { DataTable } from "@/components/data-table";
import { AddProductDrawer } from "@/components/products/AddProductDrawer";
import { columns } from "@/components/products/colums-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

//import { useEffect, useState } from "react";

export const ProductAPI = () => {
  const [searchInput, setsearchInput] = useState("");
  const [searchTerm, setsearchTerm] = useState("");

  //New way Fetching data API with TanStack Query Hook

  // Queries (queryKey is catch, queryFn is fetch data API function)
  const query = useQuery({
    queryKey: ["products", searchTerm], // depends on searchTerm, not searchInput
    queryFn: () => FetchAPI(searchTerm),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!searchTerm || searchTerm === "", // allows empty search initially
  });

  // 🟡 Step 1: Show loading message
  if (query.isLoading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }
  // 🔴 Step 2: Show error if something went wrong
  if (query.isError) {
    return <div>Error: {(query.error as Error).message}</div>;
  }
  console.log("Query Fetch Data", query);
  //query.data.data ?? []; // For(data.data), because data will have parent Name(data) control our object

  const handlSearch = () => {
    console.log("Search Input:", searchInput);
    setsearchTerm(searchInput);
    console.log("Search Term:", searchTerm);
  };
  // 🟢 Step 3: Show data when ready
  return (
    <>
      <div className="flex flex-wrap justify-between gap-2 py-6">
        <div>
          <h1 className="text-2xl font-bold">Frontend + Backend</h1>
          <span className="text-sm text-muted-foreground">
            Fetch API from Backend, TanStack query, Form, Zod Validation, Drawer
          </span>
        </div>
        <div className="flex gap-2 ">
          <AddProductDrawer />
        </div>
      </div>

      <div className="flex items-center gap-2 p-0">
        <div className="relative">
          <Input
            placeholder="Search product Name..."
            value={searchInput} // Show key input search
            className="w-[200px]"
            onChange={(e) => setsearchInput(e.target.value)}
          />
        </div>

        <Button onClick={handlSearch}>Search</Button>
      </div>
      {query.isFetching && <div className="text-sm">Refreshing...</div>}
      <DataTable columns={columns} data={query.data?.data ?? []} />
    </>
  );
};
