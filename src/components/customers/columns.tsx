"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "../users/action-tooltip";
import { format } from "date-fns";
import { CustomerAvatar } from "../profileAvatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Customer = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  createdAt: string;
  email: string;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    id: "fullname",
    // accessorKey: "fullname",
    header: "Customer",
    cell: ({ row }) => <CustomerAvatar customer={row.original} />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt), "MMM dd, yyyy HH ");
    },
  },
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <ActionMenu
          onEdit={() => alert(`Edit Customer Name ${row.original.username}`)}
          onView={() => alert(`View Customer Name ${row.original.username}`)}
          onDelete={() =>
            alert(`Delete Customer Name ${row.original.username}`)
          }
        />
      );
    },
  },
];
