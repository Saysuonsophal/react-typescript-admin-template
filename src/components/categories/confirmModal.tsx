import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// import type { ICategory } from "../types/category";
import { X } from "lucide-react";


interface Props<T> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item?: T;
  //category?: ICategory;
  title: string;
  confirmDelete: () => void;
  getName: (item: T | undefined) => string;
}

export function ConfirmDelete<T>({
  isOpen,
  setIsOpen,
  item,
  title,
  getName,
  confirmDelete,
}: Props<T>) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-30 transition-opacity hover:opacity-100 focus:outline-none"
          >
            <X className="h-6 w-6 text-black cursor-pointer" />
          </button>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {/* Are you sure you want to delete "{category?.name}"? This action
            cannot be undone. */}
            Are you sure you want to delete "{getName(item)}"? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={() => confirmDelete()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
