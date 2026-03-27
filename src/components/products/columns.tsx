"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "../users/action-tooltip";
import type { Product } from "@/data/product";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Product Name",

    cell: ({ row }) => {
      return <div className="w-[15rem]">{row.original.title}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const dec = row.original.description;
      return (
        <span className="truncate-3-lines max-w-[450px]" title={dec}>
          {dec.length > 50 ? dec.slice(0, 50) + "..." : dec}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category.name}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>${row.original.price}</span>,
  },

  {
    accessorKey: "images",
    header: "Images",
    size: 200,
    cell: ({ row }) => {
      const images = row.original.images;
      return (
        <div className="flex gap-1.5 max-w-[200px] overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="product"
              className="w-12 h-12 rounded object-cover"
            />
          ))}
        </div>
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
              alert(`Edite name: ${row.original.title}`);
            }}
            onView={() => {
              alert(`View name: ${row.original.title}`);
            }}
            onDelete={() => {
              alert(`Are you sure to Delete user ${row.original.title}?`);
            }}
          />
        </div>
      );
    },
  },
];
