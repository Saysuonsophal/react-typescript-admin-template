"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner"; // toast is notifications
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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

import { useCreateCategory } from "@/hooks/useCategory";

// Validation Zod
const formSchema = z.object({
  name: z.string().min(1, "Category name is required."),
  isActive: z.boolean(),
});

// define type of
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void; //function close
}

export function CategoryForm({ open, setOpen }: Props) {
  const { mutate: CreateCategoryMutate } = useCreateCategory();

  const form = useForm({
    defaultValues: {
      name: "",
      isActive: true,
    },
    // Calling validation zod
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Payload submit field value:", value);
      CreateCategoryMutate(value, {
        onSuccess: () => {
          toast.success("Category Createed successfully", {
            position: "top-left",
          });
          form.reset();
          setOpen(false);
        },
      });

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

  console.log("Form open", open);
  console.log("Form setOpen", setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
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
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="category-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
