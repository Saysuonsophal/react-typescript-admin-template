import { CategoryForm } from "@/components/categories/category-form";
import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCategories } from "@/hooks/useCategory";
import { Plus } from "lucide-react";
import { useState } from "react";

// import { data } from "react-router-dom";

export const CategoryPage = () => {
  const { data, isLoading } = useCategories();
  console.log("Fetch Category", data); //log structure data provide from Backent

  const [isOpen, setisOpen] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex flex-wrap justify-between  gap-2 py-6">
        <div>
          <h1 className="text-2xl font-bold">Category Page</h1>
          <span className="text-sm text-muted-foreground">
            TanStack query & Form, , Zod Validation, Dialog
          </span>
        </div>
        <div className="flex gap-2 ">
          <Button onClick={() => setisOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-0">
        <div className="relative">
          <Input
            placeholder="Search product Name..."
            //value={searchInput} // Show key input search
            //className="w-[200px]"
            //onChange={(e) => setsearchInput(e.target.value)}
          />
        </div>

        {/* <Button onClick={handlSearch}>Search</Button> */}
      </div>
      <DataTable columns={columns} data={data?.data ?? []} />
      <div className="flex gap-2 ">
        <CategoryForm open={isOpen} setOpen={setisOpen} />
      </div>
    </>
  );
};
