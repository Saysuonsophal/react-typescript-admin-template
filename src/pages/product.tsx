import { ConfirmDelete } from "@/components/categories/confirmModal";
import { DataTable } from "@/components/data-table";

import { columns } from "@/components/products/columns-page";
import { ProductFormPage } from "@/components/products/productform-page";
import type { IProduct } from "@/components/types/products";
import { Button } from "@/components/ui/button";
//import { Input } from "@/components/ui/input";
import { useDeleteProduct, useGetProduct } from "@/hooks/useCreateProduct";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
//import { FiSearch } from "react-icons/fi";
//import { PopoverBox } from "@/components/popoverbox";

export const Product = () => {
  const { mutate: DeleteProductMutation } = useDeleteProduct();
  const [isOpenDrawer, setisOpenDrawer] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [seletedProduct, setseletedProduct] = useState<IProduct | undefined>(
    undefined,
  );
  const { data, isLoading, isError } = useGetProduct();
  //const [inputsearch, setinputsearch] = useState("");

  if (isLoading) {
    return <div> loading Product...</div>;
  }
  if (isError) {
    return <div>Error loading products</div>;
  }

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

      {/* <div>
        <div className="flex items-center">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search product"
              value={inputsearch}
              onChange={(e) => setinputsearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <PopoverBox />
        </div>
        <div>a</div>
      </div> */}

      <DataTable
        columns={columns({ onDelete: handleDelete, onEdit: handlEdit })}
        data={data?.data ?? []}
      />
      <ProductFormPage
        open={isOpenDrawer}
        onClose={handleCencel}
        products={seletedProduct}
      />
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
