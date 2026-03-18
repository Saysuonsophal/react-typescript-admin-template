import { FetchAPI } from "@/services/product.api";
import { DataTable } from "@/components/data-table";
import { AddProductDrawer } from "@/components/products/AddProductDrawer";
import { columns } from "@/components/products/colums-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { IProduct } from "@/components/types/products";
import { Plus } from "lucide-react";
import { ConfirmDelete } from "@/components/categories/confirmModal";
import { useDeleteProduct } from "@/hooks/useCreateProduct";
import { toast } from "sonner";

//import { useEffect, useState } from "react";

export const ProductAPI = () => {
  const [searchInput, setsearchInput] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [drawerOpen, setdrawerOpen] = useState(false);
  const { mutate: deleteProductMutate } = useDeleteProduct();
  const [isDelete, setisDelete] = useState(false);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

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
  const handleEdit = (products: IProduct) => {
    console.log("Row Edit Product:", products);
    setProduct(products);
    setdrawerOpen(true);
  };
  const handleAdd = () => {
    setdrawerOpen(true);
    setProduct(undefined); // no item, blank form
  };
  const handleClose = () => {
    setdrawerOpen(false);
    setProduct(undefined); // no item, blank form
  };

  const handlDelete = (products: IProduct) => {
    console.log("Row Delete Product", products);
    setProduct(products);
    setisDelete(true);
  };
  const productconfirm = () => {
    if (!product?.id) return;
    deleteProductMutate(
      { id: product.id },
      {
        onSuccess: () => {
          toast.success("Product deleted successfully", {
            position: "top-right",
          });
          setisDelete(false);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to delete Product");
        },
      },
    );
    console.log("payload Delete:", product);
  };

  // 🟢 Step 3: Show data when ready
  return (
    <>
      <div className="flex flex-wrap justify-between gap-2 py-6">
        <div>
          <h1 className="text-2xl font-bold">Frontend + Backend</h1>
          <span className="text-sm text-muted-foreground">
            Fetch API from Backend, TanStack query, Form, Zod Validation, Drawer{" "}
            <br />
          </span>
          <span className="text-sm text-muted-foreground">
            Page(parent) → DrawerForm(middle) → Form(child)
          </span>
        </div>
        <div className="flex gap-2 ">
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>

          <AddProductDrawer
            open={drawerOpen}
            setOpen={handleClose}
            products={product}
          />
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
      {/* {query.isFetching && <div className="text-sm">Refreshing...</div>} */}

      <DataTable
        columns={columns({ onEdit: handleEdit, onDelete: handlDelete })}
        data={query.data?.data ?? []}
      />
      <ConfirmDelete<IProduct>
        isOpen={isDelete}
        setIsOpen={setisDelete}
        item={product}
        title="Delete Product"
        getName={(item) => item?.name || ""}
        confirmDelete={productconfirm}
      />
    </>
  );
};
