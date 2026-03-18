"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ActionMenu } from "../users/action-tooltip";
import { Badge } from "../ui/badge";
import type { IProduct } from "../types/products";

//import { Badge, CheckCircle, XCircle } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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

export interface Props {
  onEdit: (products: IProduct) => void;
  onDelete: (products: IProduct) => void;
}

export const columns = ({ onEdit, onDelete }: Props): ColumnDef<IProduct>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  //Name
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
  //price
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>${row.original.price}</span>,
  },
  // QTY
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
          </Badge> // Replace with your icon component
        )
      );
    },
  },
  //category
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

  //Action
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <ActionMenu
          onEdit={() => onEdit(row.original)}
          onView={() => alert(`View field Name: ${row.original.name}`)}
          onDelete={() => onDelete(row.original)}
        />
      );
    },
  },
];
