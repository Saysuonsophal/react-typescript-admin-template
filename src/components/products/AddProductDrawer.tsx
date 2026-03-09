import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { ProductForm } from "@/components/products/product-form";

export function AddProductDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="cursor-pointer text-sm">
        <Button>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </DrawerTrigger>
      <DrawerContent className=" sm:max-w-md">
        {/* Close Icon */}
        <DrawerClose asChild>
          <button className="absolute right-4 top-4 rounded-sm opacity-30 transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-6 w-6 text-black cursor-pointer" />
          </button>
        </DrawerClose>
        <DrawerHeader>
          <DrawerTitle>Add New Product</DrawerTitle>
          <DrawerDescription>Enter your product information.</DrawerDescription>
        </DrawerHeader>

        {/* Product Form & onSuccess function will close Drawer when done*/}
        <ProductForm onSuccess={() => setOpen(false)} />

        <DrawerFooter className="flex justify-end gap-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <Button type="submit" form="product-form" className="bg-black">
            Save changes
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
