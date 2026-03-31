import { CategoryForm } from "@/components/categories/category-form";
import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCategories, useDeleteCategory } from "@/hooks/useCategory";
import type { ICategory } from "@/components/types/category";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ConfirmDelete } from "@/components/categories/confirmModal";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "@/utils/tokenStorage";
//import { set } from "date-fns";

// import { data } from "react-router-dom";

export const CategoryPage = () => {
  const navigate = useNavigate();
  const { mutate: deleteCategoryMutate } = useDeleteCategory();
  const [isOpen, setisOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [category, setCategory] = useState<ICategory | undefined>(undefined);

  //search Category Name
  const [searchName, setSeaerchName] = useState("");
  const [value] = useDebounce(searchName, 500);
  //console.log("search Name:", value);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeaerchName(e.target.value);
    setPage(1); // ✅ reset page immediately
  };

  // pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isLoading } = useCategories(value, page, limit);
  //console.log("Fetch Category", data); //log structure data provide from Backent
  const pagination = data?.pagination;

  console.log("pagination", pagination);

  const {
    nextPage = null,
    prevPage = null,
    totalPage = 0,
    currentPage,
    totalItem,
  } = pagination ?? {};
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItem);

  //console.log("Totla Page", totalPage);

  //validation token without sign in
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      navigate("/sign-in");
    }
  }, [navigator]);

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
          setCategory(undefined);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to delete category");
        },
      },
    );
  };

  const handleCencel = (open: boolean) => {
    setisOpen(open);
    if (!open) setCategory(undefined);
  };

  const handleCloseDeleteModal = (open: boolean) => {
    setIsDeleteOpen(open);
    if (!open) setCategory(undefined);
  };

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

      {/* Search Name */}
      <div className="flex items-center gap-2 p-0">
        <div className="relative">
          <Input
            placeholder="Search Name..."
            value={searchName} // Show key input search
            className="w-[200px]"
            onChange={(e) => {
              setSeaerchName(e.target.value);
              setPage(1);// ✅ reset page immediately
            }}
            
          />
        </div>

        {/* <Button onClick={handlSearch}>Search</Button> */}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center p-3">
          <Spinner className="text-red-500 w-8 h-8" />
        </div>
      )}
      <DataTable
        columns={columns({
          onEditCategory: handleEdit,
          onDeleteCatgory: handleDelete,
          rowStartIndex: startItem,
        })}
        data={data?.data ?? []}
      />

      <div className="flex items-center justify-between">
        {/* Rows per page */}
        <Field orientation="horizontal" className="w-fit whitespace-nowrap">
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-20" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div className="flex items-center ">
          {/* Pagination result */}
          {pagination && (
            <div className="flex items-center whitespace-nowrap mr-4 text-sm text-muted-foreground ">
              Showing {startItem}-{endItem} of {totalItem} results
              {/* Showing 1-10 of {pagination?.totalItems} results */}
            </div>
          )}

          {/* Pagination */}
          <Pagination className="flex items-end justify-end w-full">
            <PaginationContent>
              <PaginationItem className="border rounded-md">
                <PaginationPrevious
                  href="#"
                  onClick={() => prevPage && setPage(prevPage)}
                  className={
                    !prevPage
                      ? "pointer-events-none cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                {Array.from({ length: totalPage }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationLink
                      key={pageNum}
                      isActive={pageNum === currentPage}
                      onClick={() =>
                        pageNum !== currentPage && setPage(pageNum)
                      }
                      className={
                        pageNum === currentPage
                          ? "bg-black text-white hover:bg-black hover:text-white "
                          : "cursor-pointer"
                      }
                    >
                      {pageNum}
                    </PaginationLink>
                  );
                })}
              </PaginationItem>

              <PaginationItem className="border rounded-md">
                <PaginationNext
                  href="#"
                  onClick={() => nextPage && setPage(nextPage)}
                  className={
                    !nextPage
                      ? "pointer-events-none cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div className="flex gap-2 ">
        <CategoryForm
          open={isOpen}
          setOpen={handleCencel}
          category={category}
        />
      </div>

      <ConfirmDelete<ICategory>
        isOpen={isDeleteOpen}
        setIsOpen={handleCloseDeleteModal}
        item={category}
        title="Delete Category"
        getName={(item) => item?.name || ""}
        confirmDelete={confirmDelete}
      />
    </>
  );
};
