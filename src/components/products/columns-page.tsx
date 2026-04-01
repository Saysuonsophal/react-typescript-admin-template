"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { IProduct } from "../types/products";
import { Badge } from "../ui/badge";
import { ActionMenu } from "../users/action-tooltip";
//import { Checkbox } from "../ui/checkbox";
//import { CloudSnow } from "lucide-react";
import { format } from "date-fns";
//import { Slice } from "lucide-react";
import boxImage from "@/assets/box.png";

export interface Props {
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
  rowStartIndex: number;
}

export const columns = ({
  onEdit,
  onDelete,
  rowStartIndex,
}: Props): ColumnDef<IProduct>[] => [
  // ✅ KEEP — checkbox
  // {
  //   id: "select",
  //   header: ({ table }) => <Checkbox />,
  //   cell: ({ row }) => <Checkbox />>
  // },
  {
    header: "No",
    cell: ({ row }) => <div>{rowStartIndex + row.index}</div>,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  // product name + description + image
  {
    accessorKey: "name",
    //header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    header: "Name",
    cell: ({ row }) => (
      <div className="w-[28rem] flex gap-2 items-center ">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-muted">
          {row.original.productImages?.[0]?.imageURL ? (
            <img
              src={row.original.productImages?.[0]?.imageURL}
              className="w-12 h-12 rounded"
            />
          ) : (
            <img src={boxImage} className="w-5 h-5 rounded" />
          )}
        </div>

        <div className="min-w-0">
          <p className="font-medium">{row.original.name}</p>
          <p className="text-sm text-muted-foreground truncate whitespace-nowrap">
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
    header: "Stock",
    cell: ({ row }) => (
      <div className="w-[4vw] flex justify-center">{row.original.qty}</div>
    ),
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
