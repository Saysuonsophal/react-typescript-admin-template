import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";

import { ProductForm, type FormRef } from "@/components/products/product-form";
import type { IProduct } from "../types/products";
import { useRef } from "react";

interface Props {
  open: boolean;
  setOpen: () => void;
  products?: IProduct;
}

export function AddProductDrawer({ open, setOpen, products }: Props) {
  const formRef = useRef<FormRef>(null);

  // Cancel button
  const handleCencel = () => {
    formRef.current?.resetForm();
    setOpen();
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={handleCencel}>
      <DrawerContent key={products?.id ?? "new"} className=" sm:max-w-md">
        {/* Close Icon */}
        <DrawerClose asChild>
          <button className="absolute right-4 top-4 rounded-sm opacity-30 transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </DrawerClose>
        <DrawerHeader>
          <DrawerTitle>
            {products ? "Edit Product" : "Add New Product"}
          </DrawerTitle>
          <DrawerDescription>
            {products
              ? "Update your product information"
              : "Enter your product information"}
          </DrawerDescription>
        </DrawerHeader>

        {/* Product Form & onSuccess function will close Drawer when done*/}
        <ProductForm
          open={open}
          // onSuccess={() => setOpen()}
          products={products}
          ref={formRef}
          onSuccess={setOpen}
        />

        <DrawerFooter className="flex justify-end gap-2">
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleCencel}>
              Close
            </Button>
          </DrawerClose>
          <Button type="submit" form="product-form" className="bg-black">
            {products ? "Save changes" : "Create Product"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
