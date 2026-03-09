"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "../users/action-tooltip";
import type { ICategory } from "@/services/categoryService";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const columns: ColumnDef<ICategory>[] = [
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
  {
    id: "action",
    header: "Actions",
    size: 50,
    cell: ({ row }) => {
      return (
        <div className=" items-center justify-center max-w-[50px]">
          <ActionMenu
            onEdit={() => {
              alert(`Edite name: ${row.original.name}`);
            }}
            onView={() => {
              alert(`View name: ${row.original.name}`);
            }}
            onDelete={() => {
              alert(`Are you sure to Delete user ${row.original.name}?`);
            }}
          />
        </div>
      );
    },
  },
];
