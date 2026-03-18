import { CategoryForm } from "@/components/categories/category-form";
import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCategories, useDeleteCategory } from "@/hooks/useCategory";
import type { ICategory } from "@/components/types/category";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ConfirmDelete } from "@/components/categories/confirmModal";
import { toast } from "sonner";

// import { data } from "react-router-dom";

export const CategoryPage = () => {
  const { data, isLoading } = useCategories();
  console.log("Fetch Category", data); //log structure data provide from Backent

  const { mutate: deleteCategoryMutate } = useDeleteCategory();
  const [isOpen, setisOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [category, setCategory] = useState<ICategory | undefined>(undefined);

  // ACTION HANDLERS Edit/update
  const handleEdit = (category: ICategory) => {
    console.log("Edit list data:", category); // show get data of row when click onEdit
    setCategory(category);
    setisOpen(true);
  };

  const handleDelete = (category: ICategory) => {
    console.log("Delete list data:", category);
    setCategory(category);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!category?.id) return;
    deleteCategoryMutate(
      { id: category?.id },
      {
        onSuccess: () => {
          toast.success("Category deleted successfully", {
            position: "top-right",
          });
          setIsDeleteOpen(false);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to delete category");
        },
      },
    );
  };

  const handleClose = (open: boolean) => {
    setisOpen(open);
    setCategory(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-3">
        <Spinner className="text-red-500 w-8 h-8" />
      </div>
    );
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
            placeholder="Search Name..."
            //value={searchInput} // Show key input search
            //className="w-[200px]"
            //onChange={(e) => setsearchInput(e.target.value)}
          />
        </div>

        {/* <Button onClick={handlSearch}>Search</Button> */}
      </div>
      <DataTable
        columns={columns({
          onEditCategory: handleEdit,
          onDeleteCatgory: handleDelete,
        })}
        data={data?.data ?? []}
      />
      <div className="flex gap-2 ">
        <CategoryForm open={isOpen} setOpen={handleClose} category={category} />
      </div>
      <ConfirmDelete<ICategory>
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        item={category}
        title="Delete Category"
        getName={(item) => item?.name || ""}
        confirmDelete={confirmDelete}
      />
    </>
  );
};
