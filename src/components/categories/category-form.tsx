"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner"; // toast is notifications
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  //FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategory";
import type { ICategory } from "../types/category";
import { useEffect } from "react";

// Validation Zod
const formSchema = z.object({
  name: z.string().min(1, "Category name is required."),
  isActive: z.boolean(),
});

// define type of
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void; //function close
  category?: ICategory; // using data
}

export function CategoryForm({ open, setOpen, category }: Props) {
  console.log("passed data category from page to form:", category);
  const { mutate: CreateCategoryMutate } = useCreateCategory();
  const { mutate: UpdateCategoryMutate } = useUpdateCategory();

  const form = useForm({
    defaultValues: {
      //name: category ? category.name : "",
      //or way:
      name: category?.name || "",
      isActive: true,
    },
    // Calling validation zod
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Payload submit field value:", value);

      if (category) {
        UpdateCategoryMutate(
          { id: category.id, request: value },
          {
            onSuccess: () => {
              toast.success("Category Updated successfully", {
                position: "top-right",
              });
              setOpen(false);
              form.reset();
              //resetForm(); // reset to default
            },
          },
        );
      } else {
        CreateCategoryMutate(value, {
          onSuccess: () => {
            toast.success("Category Createed successfully", {
              position: "top-right",
            });

            setOpen(false);
            form.reset();
            //resetForm(); // reset to default
          },
        });
      }

      // notification toast
      //   toast("You submitted the following values:", {
      //     description: (
      //       <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
      //         <code>{JSON.stringify(value, null, 2)}</code>
      //       </pre>
      //     ),
      //     position: "bottom-right",
      //     classNames: {
      //       content: "flex flex-col gap-2",
      //     },
      //     style: {
      //       "--border-radius": "calc(var(--radius)  + 4px)",
      //     } as React.CSSProperties,
      //   });
    },
  });
  // Helper to reset form to defaults
  // const resetForm = () => {
  //   form.reset({
  //     name: "",
  //     isActive: true,
  //   });
  // };
  // Reset form whenever modal opens or category changes
  // useEffect(() => {
  //   if (open) {
  //     form.reset({
  //       name: category?.name || "",
  //       isActive: category?.isActive ?? true,
  //     });
  //   }
  // }, [category, open]);

  //Usage: When switching Edit → Create, clear the form.

  // useEffect(() => {
  //   if (!category) {
  //     form.reset();
  //   }
  // }, [category]);

  useEffect(() => {
    if (open) {
      form.reset({
        name: category?.name || "",
        isActive: true,
      });
    }
  }, [open, category]);

  // console.log("Form open", open);
  // console.log("Form setOpen", setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Update your category details below and click save changes."
              : "Add a new category here. Click save changes when you’re done."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      //move cursor to end by default the browser automatically focuses
                      onFocus={(e) => {
                        const len = e.target.value.length;
                        console.log("focuse length", len);
                        setTimeout(
                          () => e.target.setSelectionRange(len, len),
                          0,
                        );
                      }}
                      aria-invalid={isInvalid}
                      placeholder="Enter Category Name"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="category-form">
            {category ? "Save changes" : "Create Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
