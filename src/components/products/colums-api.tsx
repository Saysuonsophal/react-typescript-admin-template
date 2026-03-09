"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "../users/action-tooltip";
//import { Badge, CheckCircle, XCircle } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  qty: number;
  categoryId: number;
  isActive: boolean;
  category: {
    id: number;
    name: string;
  };
  //images: string[]; // 👈 Array of image URLs
};
export const products = [
  {
    id: 4,
    title: "Handmade Fresh Table",
    slug: "handmade-fresh-table",
    price: 687,
    description: "Andy shoes are designed to keeping in...",
    category: {
      id: 5,
      name: "Others",
      image: "https://placehold.co/600x400",
      slug: "others",
    },
    images: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
  },
];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  // Description
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
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>${row.original.price}</span>,
  },
  {
    accessorKey: "qty",
    header: "QTY",
    cell: ({ row }) => <span>{row.original.qty}</span>,
  },
  // IsActive
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return (
        //option 1
        //row.original.isActive ? "Yes" : "No"

        // Option 2: Display as an icon (recommended for better UX)
        row.original.isActive ? (
          <p style={{ color: "green", fontWeight: "700" }}>Active</p> // Replace with your icon component
        ) : (
          <span style={{ color: "red", fontWeight: "700" }}>InActive</span> // Replace with your icon component
        )
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const fild = row.original.category.name;
      return <span>{fild}</span>;
    },
  },

  //   {
  //     accessorKey: "images",
  //     header: "Image",
  //     cell: ({ row }) => {
  //       const images = row.original.images;
  //       return (
  //         <div className="flex gap-1.5 max-w-[180px] overflow-hidden">
  //           {images.map((image, index) => [
  //             <img
  //               key={index}
  //               src={image}
  //               alt="product"
  //               className="w-12 h-12 rounded object-cover"
  //             />,
  //           ])}
  //         </div>
  //       );
  //     },
  //   },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <ActionMenu
          onEdit={() => alert(`Edite field Name: ${row.original.name}`)}
          onView={() => alert(`View field Name: ${row.original.name}`)}
          onDelete={() => alert(`Delete field Name: ${row.original.name}`)}
        />
      );
    },
  },
];
