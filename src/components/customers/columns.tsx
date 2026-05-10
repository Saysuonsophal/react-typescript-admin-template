"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "../users/action-tooltip";
import { format } from "date-fns";
import { CustomerAvatar } from "../profileAvatar";
import type { Customer } from "../types/customer";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
  // {
  //   accessorKey: "email",
  //   header: "Email",
  // },

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
    cell: ({ row }) => row.original.orders?.length ?? 0,
    // Or another way
    // {
    //   const order = row.original.orders || [];
    //   return <span>{order.length}</span>;
    // },
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
    cell: ({ row }) => {
      const orders = row.original.orders || [];
      let total = 0;
      for (const order of orders) {
        total += Number(order?.total || 0);
      }
      return <span>${total.toFixed(2)}</span>;
    },
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
