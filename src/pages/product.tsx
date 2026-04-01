import { ConfirmDelete } from "@/components/categories/confirmModal";
import { DataTable } from "@/components/data-table";

import { columns } from "@/components/products/columns-page";
import { ProductFormPage } from "@/components/products/productform-page";
import type { IProduct } from "@/components/types/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteProduct, useGetProduct } from "@/hooks/useCreateProduct";
import { ChevronDown, Download, Plus, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiSearch } from "react-icons/fi";
import { PopoverBox } from "@/components/popoverbox";
import { useDebounce } from "use-debounce";

// pagination import
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { getAccessToken } from "@/utils/tokenStorage";
import { useNavigate } from "react-router-dom";


export const Product = () => {
  const navigate = useNavigate();
  const { mutate: DeleteProductMutation } = useDeleteProduct();
  const [isOpenDrawer, setisOpenDrawer] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [seletedProduct, setseletedProduct] = useState<IProduct | undefined>(
    undefined,
  );

  //search Debounce
  const [searchInput, setSearchInput] = useState("");
  const [value] = useDebounce(searchInput, 500);
  //console.log("search value", value);

  //default pagination
  const [page, setPage] = useState(1);
  console.log("Curren Page:", page);
  const [limit, setLimit] = useState(10);
  console.log("limit:", limit);

  const { data, isLoading, isError } = useGetProduct(value, page, limit);

  // Data fetching
  const pagination = data?.pagination;
  console.log("Pagination", pagination);

  const startItem = (page - 1) * limit + 1;

  const { totalItems } = pagination ?? {};
  const currentPage = pagination?.currentPage ?? 1;
  const endItem = Math.min(currentPage * limit, totalItems);
  const totalPage = pagination?.totalPages ?? 1;

  //console.log("Total Page:", totalPage);
  //console.log("currentPage", currentPage);
  //console.log("Total Items:", totalItems);
  //console.log("startItem", startItem);
  //console.log("End item", endItem);

  //Validation token without sign in
  // const token = getAccessToken();
  // if (!token) {
  //   navigate("/sign-in");
  // }
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleNext = () => {
    if (pagination?.nextPage) {
      setPage(pagination.nextPage);
    }
  };

  const handleCencel = (open: boolean) => {
    setisOpenDrawer(open);
    if (!open) setseletedProduct(undefined);
  };
  const handlEdit = (product: IProduct) => {
    console.log("Edite product", product);
    setseletedProduct(product);
    setisOpenDrawer(true);
  };
  const handleDelete = (product: IProduct) => {
    console.log("Delete product", product);
    setseletedProduct(product);
    setisDelete(true);
  };

  const confirmDelete = () => {
    if (!seletedProduct) return;
    DeleteProductMutation(
      { id: seletedProduct.id },
      {
        onSuccess: () => {
          toast.success("Delete Product successfully");
          setisDelete(false);
          setseletedProduct(undefined);
        },
      },
    );
  };
  const handleCloseDeleteModal = (open: boolean) => {
    setisDelete(open);
    if (!open) setseletedProduct(undefined);
  };

  return (
    <>
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-3xl font-bold">Product</h1>
          <span className="text-md text-gray-500">
            Practice Building CRUD. Browse and manage your product catalog.
          </span>
        </div>
        <div>
          <Button onClick={() => setisOpenDrawer(true)}>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 flex-1">
          {/* Search Debounce */}
          <div className="relative max-w-sm flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search product"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1); // ✅ reset page immediately
              }}
              className="pl-9 "
            />
          </div>
          {/* Filter Category */}
          <PopoverBox />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="">
            <SlidersHorizontal className="w-4 h-4" />
            Columns
            <ChevronDown />
          </Button>
          <Button variant="outline" className="">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* ✅ ADD HERE */}
      {isLoading && <div className="mt-2 text-sm">Loading Product...</div>}
      {isError && (
        <div className="mt-2 text-sm text-red-500">Error loading products</div>
      )}

      {/* Table */}
      <DataTable
        columns={columns({
          onDelete: handleDelete,
          onEdit: handlEdit,
          rowStartIndex: startItem,
        })}
        data={data?.data ?? []}
      />

      <div className="flex justify-between w-full items-center">
        {/* Row per page */}
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">Rows</FieldLabel>
          <Select
            //defaultValue="10"
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
                <SelectItem value="75">75</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div className="flex items-center gap-2  sm:space-x-6 lg:space-x-8 ">
          {/* right side: results info (show/hide Logic) */}
          {pagination && (
            <div className="flex items-center whitespace-nowrap mr-4 text-sm text-muted-foreground ">
              Showing {startItem}-{endItem} of {totalItems} results
              {/* Showing 1-10 of {pagination?.totalItems} results */}
            </div>
          )}

          {/* Pagination Table */}
          <Pagination className="flex justify-end">
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem className="border rounded-md">
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    pagination?.prevPage && setPage(pagination?.prevPage)
                  }
                  className={
                    !pagination?.prevPage
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* Numbers pagination*/}
              <PaginationItem>
                {/* {[...Array(totalPage)].map((_, i) => {
                  const listPage = i + 1;
                  return (
                    <PaginationLink
                      key={i}
                      isActive={listPage == currentPage}
                      onClick={() => setPage(listPage)}
                      href="#"
                    >
                      {listPage}
                    </PaginationLink>
                  );
                })} */}

                {Array.from({ length: totalPage }).map((_, i) => {
                  const pageNum = i + 1;
                  console.log("Array From: ", pageNum);
                  return (
                    <PaginationLink
                      key={pageNum}
                      isActive={pageNum == currentPage}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  );
                })}
              </PaginationItem>

              {/* Next */}
              <PaginationItem className="border rounded-md">
                <PaginationNext
                  href="#"
                  aria-disabled={!pagination?.nextPage}
                  // onClick={() => {
                  //   if (pagination?.nextPage) setPage(pagination?.nextPage);
                  // }}
                  onClick={handleNext}
                  className={
                    !pagination?.nextPage
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Edit Drawer */}
      <ProductFormPage
        open={isOpenDrawer}
        onClose={handleCencel}
        products={seletedProduct}
      />

      {/* Delete Dialog */}
      <ConfirmDelete
        isOpen={isDelete}
        setIsOpen={handleCloseDeleteModal}
        item={seletedProduct}
        title="Delete Product"
        getName={(item) => item?.name || ""}
        confirmDelete={confirmDelete}
      />
    </>
  );
};
