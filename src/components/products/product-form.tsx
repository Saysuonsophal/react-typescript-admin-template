//Main Form Component
//1.

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { productSchema } from "@/schemas/product.schema";
import { useForm } from "@tanstack/react-form";

import { Input } from "@/components/ui/input";

// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useCategories } from "@/hooks/useCategory";
import type { ICategory } from "@/services/categoryService";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexColorPicker } from "react-colorful";

// import type {
//   ZodObject,
//   ZodString,
//   ZodNumber,
//   ZodDefault,
//   ZodOptional,
//   ZodBoolean,
//   ZodTypeAny,
// } from "node_modules/zod/v3/types.d.cts";
//import { ColorPickerField } from "../colorPicker";

interface ProductFormProps {
  onSuccess?: () => void;
}
const presetColors = [
  "#ef4444", // red
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // yellow
  "#8b5cf6", // purple
];

export function ProductForm({ onSuccess }: ProductFormProps) {
  //Create product
  const mutation = useCreateProduct();
  const { data } = useCategories();
  console.log("fetch Data category:", data);
  const categories = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      qty: 0,
      categoryId: 0,
      description: "",
      color: "", // default blue
      isActive: true,
    },

    validators: {
      onSubmit: productSchema,
    },

    //Payload
    onSubmit: async ({ value }) => {
      console.log("Submitting Payload:", value);
      console.log("isActive boolean:", value.isActive);
      await mutation.mutateAsync(value);
      form.reset(); //reset form after success
      onSuccess?.(); // close drawer after success
    },
  });

  return (
    <form
      id="product-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4 p-4"
    >
      <FieldGroup className="gap-2">
        {/* Name */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Enter a title "
                  />
                </FieldContent>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="flex gap-3 flex-row">
          {/* Price */}
          <form.Field name="price">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                  <FieldContent>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value === 0 ? "" : field.state.value}
                      onBlur={field.handleBlur}
                      // onChange={(e) => {
                      //   field.handleChange(e.target.valueAsNumber);
                      // }}
                      onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        field.handleChange(Number.isNaN(value) ? 0 : value);
                      }}
                      aria-invalid={isInvalid}
                      placeholder="Enter Price"
                    />
                  </FieldContent>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Qty */}
          <form.Field name="qty">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Qty</FieldLabel>
                  <FieldContent>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value === 0 ? "" : field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.valueAsNumber)
                      }
                      aria-invalid={isInvalid}
                      placeholder="Enter Qty"
                    />
                  </FieldContent>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        {/* Category */}
        <form.Field name="categoryId">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldContent>
                  <FieldLabel>Category</FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
                <Select
                  //solution 1 (Define to React to know SelectVlue pleaseholder)
                  // value={
                  //   field.state.value ? String(field.state.value) : undefined
                  // }

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
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        </form.Field>

        {/* isActive */}
        <form.Field name="isActive">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field
                data-invalid={isInvalid}
                orientation={"horizontal"}
                className="mt-1"
              >
                <Switch
                  checked={!!field.state.value}
                  onCheckedChange={(val) => field.handleChange(val)}
                />
                <FieldLabel>Active Product</FieldLabel>
                {/* <FieldContent>
                  <Switch
                    checked={!!field.state.value}
                    onCheckedChange={(val) => field.handleChange(val)}
                  />
                </FieldContent> */}
              </Field>
            );
          }}
        </form.Field>

        {/* Color Picker */}
        <form.Field name="color">
          {(field) => {
            return (
              <Field className="flex flex-row">
                <FieldLabel>Color</FieldLabel>
                <FieldContent>
                  <div className="flex items-center gap-3">
                    {/* Preset color buttons */}
                    {/* {presetColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => field.handleChange(color)}
                        className={`h-8 w-8 rounded-full border-2 ${
                          field.state.value === color
                            ? "border-black"
                            : "border-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))} */}

                    {/* Popover Advanced Picker */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="h-8 w-8 rounded border"
                          style={{
                            backgroundColor: field.state.value,
                          }}
                        />
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-3">
                        <HexColorPicker
                          color={field.state.value} // string HEX color
                          onChange={(color) => field.handleChange(color)}
                        />
                        <Input
                          className="w-50 my-2"
                          value={field.state.value || "#000000"}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <p className="text-sm font-normal">Saved Colors</p>
                        <div className="flex gap-2 flex-wrap mt-1">
                          {presetColors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => field.handleChange(color)}
                              className={`h-7 w-7 rounded-full border-2 ${
                                field.state.value === color
                                  ? "border-black"
                                  : "border-gray-200"
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Optional Hex Input */}
                    <Input
                      className="w-24"
                      value={field.state.value || "#000000"}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  {/* New Advanceed Custom color picker */}

                  {/* <ColorPickerField
                      value={field.state.value}
                      onChange={field.handleChange}
                      presets={["#ef4444", "#3b82f6", "#10b981"]}
                      showInput={true}
                    /> */}
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
  );
}
