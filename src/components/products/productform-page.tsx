import { useForm } from "@tanstack/react-form";

import { Button } from "../ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldContent,
} from "../ui/field";
import { Input } from "../ui/input";
// import {
//   createProductSchema,
//   productSchema,
//   updateProductSchema,
// } from "@/schemas/product.schema";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexColorPicker } from "react-colorful";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "@/components/ui/switch";
import type { ICategory } from "../types/category";
import { X } from "lucide-react";

import {
  DrawerFooter,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from "../ui/drawer";

import type { IProduct } from "../types/products";
import { useCategories } from "@/hooks/useCategory";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useCreateProduct";
import { toast } from "sonner";
//import { flattenBy } from "@tanstack/react-table";
//import { toast } from "sonner";
import { z } from "zod";
import { useEffect } from "react";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be 0 or more"),
  categoryId: z.number().min(1, "Please select a category"),
  qty: z.number().int().min(1, "Quantity must be 0 or more"),
  color: z
    .string()
    .min(1, "Please select a color")
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid HEX color"),
  description: z.string(),
  isActive: z.boolean(),
});
interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
  products?: IProduct;
  // categories: ICategory;
}
const presetColors = [
  "#ef4444", // red
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // yellow
  "#8b5cf6", // purple
];

export const ProductFormPage = ({ open, onClose, products }: Props) => {
  const { mutate: CreateProductMutation, isPending: isCreating } =
    useCreateProduct();
  const { mutate: UpdateProductMutation, isPending: isUpdating } =
    useUpdateProduct();
  const { data } = useCategories();
  const categories = data?.data ?? [];

  //console.log("category", categories);

  const isPanding = isUpdating || isCreating; // combined for the button

  const form = useForm({
    defaultValues: {
      name: products?.name ?? "",
      price: products?.price ? Number(products.price) : 0,
      qty: products?.qty ?? 0,
      categoryId: products?.categoryId ?? 0,
      description: products?.description ?? "",
      color: products?.color ?? "",
      isActive: products?.isActive ?? true,
    },
    validators: {
      onSubmit: productSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        //set logic to telling react
        if (products) {
          UpdateProductMutation(
            { id: products.id, request: value },
            {
              onSuccess: () => {
                toast.success("Update Product successfully");
                onClose(false);
                form.reset();
              },
            },
          );
        } else {
          // const payload = {
          //   ...value,
          //   price: Number(value.price),
          //   qty: Number(value.qty),
          // };
          CreateProductMutation(value, {
            onSuccess: () => {
              toast.success("Create product successfully");
              onClose(false);
              form.reset();
            },
            onError: (error) => {
              console.error("Create failed:", error);
              toast.error("Failed to create product. Check console.");
            },
          });
          console.log("create payload", value);
        }
      } catch (error) {
        console.error("Submit Crash:", error);
        toast.error("Unexpected error, check console");
      }
    },
  });
  //console.log("Form input", form);
  useEffect(() => {
    if (open) {
      form.reset(); // ← resets to defaultValues, no need to repeat fields
    }
  }, [open]);

  return (
    <Drawer direction="right" open={open} onOpenChange={onClose}>
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

        <form
          id="product-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="p-4"
        >
          <FieldGroup className="flex gap-3">
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || form.state.isSubmitted) &&
                  !field.state.meta.isValid;

                // this is No errors show → but Zod still blocks it internally → possible crash
                //field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Product Name"
                      autoComplete="off"
                    />

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-[12px]"
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <div className="flex items-center gap-4">
              {/* Price */}
              <form.Field name="price">
                {(field) => {
                  const isInvalid =
                    (field.state.meta.isTouched || form.state.isSubmitted) &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Price ($)</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        value={field.state.value === 0 ? "" : field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          const val = e.target.valueAsNumber;
                          field.handleChange(isNaN(val) ? 0 : val);
                        }}
                        aria-invalid={isInvalid}
                        placeholder="0.00"
                        // autoComplete="off"
                      />

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="text-[12px]"
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* QTY */}
              <form.Field name="qty">
                {(field) => {
                  const isInvalid =
                    (field.state.meta.isTouched || form.state.isSubmitted) &&
                    !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Qty</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value === 0 ? "" : field.state.value}
                        onBlur={field.handleBlur}
                        // onChange={(e) =>
                        //   field.handleChange(e.target.valueAsNumber)
                        // }
                        onChange={(e) => {
                          const val = e.target.valueAsNumber;
                          field.handleChange(isNaN(val) ? 0 : val);
                        }}
                        aria-invalid={isInvalid}
                        placeholder="0"
                      />

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="text-[12px]"
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            {/* Category */}
            <form.Field name="categoryId">
              {(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || form.state.isSubmitted) &&
                  !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel>Category</FieldLabel>
                    </FieldContent>
                    <Select
                      //solution 1 (Define to React to know SelectVlue pleaseholder)
                      // value={
                      //   field.state.value ? String(field.state.value) : undefined
                      // }

                      //pass value edit

                      value={
                        field.state.value
                          ? String(field.state.value)
                          : undefined
                      }
                      //solution 2

                      onValueChange={(val) => field.handleChange(Number(val))}
                      aria-invalid={isInvalid}
                    >
                      <SelectTrigger aria-invalid={isInvalid}>
                        <SelectValue
                          placeholder="Select category"
                          className="text-red-400"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category: ICategory) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-[12px]"
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* isActive */}
            <form.Field name="isActive">
              {(field) => {
                const isInvalid =
                  (field.state.meta.isTouched || form.state.isSubmitted) &&
                  !field.state.meta.isValid;
                return (
                  <Field
                    data-invalid={isInvalid}
                    orientation={"horizontal"}
                    className="mt-1"
                  >
                    <Switch
                      checked={!!field.state.value}
                      onCheckedChange={(val) => field.handleChange(val)}
                      className="bg-red-400"
                    />
                    <FieldLabel>Active Product</FieldLabel>
                    <FieldContent>
                      {/* <Switch
                    checked={!!field.state.value}
                    onCheckedChange={(val) => field.handleChange(val)}
                  /> */}
                    </FieldContent>
                  </Field>
                );
              }}
            </form.Field>

            {/* Color Picker */}
            <form.Field name="color">
              {(field) => {
                const isEmpty = !field.state.value || field.state.value === "";
                const isInvalid =
                  (field.state.meta.isTouched || form.state.isSubmitted) &&
                  !field.state.meta.isValid;
                const currentColor = field.state.value || "";
                return (
                  <Field className="flex flex-row">
                    <FieldLabel>Color</FieldLabel>
                    <FieldContent>
                      <div className="flex items-center gap-3">
                        {/* Popover Advanced Picker */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className={`h-8 w-8 rounded border-2 transition-all ${isEmpty && isInvalid ? "border-red-500 border-dashed" : isEmpty ? "border-gray-300 border-dashed" : "border-gray-300"}`}
                              style={{
                                backgroundColor: isEmpty
                                  ? "transparent"
                                  : currentColor,
                              }}
                            >
                              {/* Show a "+" icon when no color selected */}
                              {isEmpty && (
                                <span className="flex items-center justify-center text-gray-400 text-sm leading-none">
                                  +
                                </span>
                              )}
                            </button>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-3">
                            {/* Color Picker */}
                            <HexColorPicker
                              color={currentColor || "#000000"} // string HEX color
                              onChange={(color) => field.handleChange(color)}
                            />
                            <Input
                              className="w-full my-2"
                              value={currentColor}
                              placeholder="#000000"
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                            <p className="text-sm font-normal">Saved Colors</p>
                            <div className="flex gap-2 flex-wrap mt-1">
                              {presetColors.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => field.handleChange(color)}
                                  className={`h-7 w-7 rounded-full border-2 transition-all ${
                                    field.state.value === color
                                      ? "border-black scale-110"
                                      : "border-gray-200"
                                  }`}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>

                        {/* Optional Hex Input */}
                        <div className="flex flex-col gap-1">
                          <Input
                            className={`w-24 transition-colors ${
                              isEmpty && isInvalid
                                ? "border-red-500 focus-visible:ring-red-500"
                                : ""
                            }`}
                            placeholder="#000000"
                            value={currentColor}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                          />
                        </div>
                      </div>
                      {/* Validation message */}
                      {isInvalid && (
                        <p className="text-xs text-red-500">
                          {field.state.meta.errors[0]?.message}
                        </p>
                      )}
                    </FieldContent>
                  </Field>
                );
              }}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <FieldContent>
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Product Description"
                    />
                  </FieldContent>
                  {field.state.meta.errors.length > 0 && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>

        <DrawerFooter className="flex justify-end gap-2">
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onClose(false)}>
              Close
            </Button>
          </DrawerClose>
          <Button
            type="submit"
            form="product-form"
            disabled={isPanding}
            className="bg-black"
          >
            {isPanding
              ? "Saving.."
              : products
                ? "Save changes"
                : "Create Product"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
