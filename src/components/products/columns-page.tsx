"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { IProduct } from "../types/products";
import { Badge } from "../ui/badge";
import { ActionMenu } from "../users/action-tooltip";
//import { Checkbox } from "../ui/checkbox";
//import { CloudSnow } from "lucide-react";
import { format } from "date-fns";
import { Slice } from "lucide-react";

export interface Props {
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}

export const columns = ({ onEdit, onDelete }: Props): ColumnDef<IProduct>[] => [
  // ✅ KEEP — checkbox
  // {
  //   id: "select",
  //   header: ({ table }) => <Checkbox />,
  //   cell: ({ row }) => <Checkbox />>
  // },
  {
    header: "No",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  // ✅ KEEP — product name + description + image
  {
    accessorKey: "name",
    //header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    header: "Name",
    cell: ({ row }) => (
      // return (
      //   <div className="flex items-center flex-row max-w-12">
      //     <div className="bg-red-200">image</div>
      //     <div className="bg-green-400">constent</div>
      //   </div>
      // );

      <div className="w-[30rem]">
        {/* <image src={row.original.image} className="w-8 h-8 rounded" /> */}
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-sm text-muted-foreground truncate">
            {row.original.description}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "categoryId",
    header: "Category",

    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.category.name}</Badge>;
    },
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="font-bold">${row.original.price}</div>,
  },
  {
    accessorKey: "qty",
    header: "Qty",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge
          style={{
            color: "white",
            background: "green",
            fontWeight: "400",
            borderRadius: "5px",
          }}
        >
          Active
        </Badge> // Replace with your icon component
      ) : (
        <Badge
          style={{
            color: "black",
            background: "oklch(96% .005 230)",
            fontWeight: "400",
            borderRadius: "5px",
          }}
        >
          Inactive
        </Badge>
      ),
  },

  // ✅ KEEP — created date
  {
    accessorKey: "createdAt",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="Created" />
    // ),
    header: "Created",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    // accessorKey: "action",
    id: "actions",
    cell: ({ row }) => (
      <ActionMenu
        onEdit={() => onEdit(row.original)}
        onDelete={() => onDelete(row.original)}
      />
    ),
  },
];
