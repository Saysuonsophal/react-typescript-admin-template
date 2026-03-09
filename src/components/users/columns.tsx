import type { User } from "@/data/user";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Eye, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { ActionMenu } from "./action-tooltip";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  //Name
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span style={{ color: "blue" }}>{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  // ---- Simple row action buttons ----
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        // This is action icon
        <div className="flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => alert(`Edit User Id: ${user.id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => alert(`View: ${user.email}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => alert(`Delete: ${user.name}`)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
          {/* <Button onClick={() => alert(row.original.name)}>View</Button> */}
        </div>
      );
    },
    size: 10,
  },

  // ---- Action Menu (tooltip / dropdown) ----
  {
    id: "action-pro",
    header: "Actions Tooltip",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          <ActionMenu
            onEdit={() => {
              alert(`Edit User Name: ${user.name}`);
            }}
            onDelete={() => {
              alert(`Are you sure to Delete user ${user.name}?`);
            }}
            onView={() => {
              alert(`View User Name:  ${row.original.name}?`);
            }}
          />
        </>
      );
    },
    // Key fix: force column width
    size: 10, // small size in TanStack Table
    meta: {
      className: "w-[40px] min-w-[40px]", // force width
    },
  },
];
