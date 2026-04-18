"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "../users/action-tooltip";
import type { ICategory } from "@/components/types/category";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Props = {
  onEditCategory: (category: ICategory) => void;
  onDeleteCatgory: (category: ICategory) => void;
  rowStartIndex: number;
};

export const columns = ({
  onEditCategory,
  onDeleteCatgory,
  rowStartIndex,
}: Props): ColumnDef<ICategory>[] => [
  {
    header: "No",
    cell: ({ row }) => <div>{rowStartIndex + row.index}</div>,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell: ({ row }) => {
      return (
        <span>
          {format(new Date(row.original.createdAt), "dd-MM-yyyy HH:mm ")}
        </span>
      );
    },
  },
  // Popup actions
  
  // {
  //   id: "action",
  //   header: "Actions",
  //   size: 50,
  //   cell: ({ row }) => {
  //     return (
  //       <div className=" items-center justify-center max-w-[50px]">
  //         <ActionMenu
  //           onEdit={() => {
  //             onEditCategory(row.original);
  //           }}
  //           onDelete={() => {
  //             onDeleteCatgory(row.original);
  //           }}
  //         />
  //       </div>
  //     );
  //   },
  // },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditCategory(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteCatgory(row.original)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      );
    },
  },
];
