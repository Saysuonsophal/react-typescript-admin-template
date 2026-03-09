// components/ActionMenu.tsx
// import { MoreHorizontal } from "lucide-react";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

export function ActionMenu({ onEdit, onDelete, onView }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md hover:bg-muted">
          {/* <MoreHorizontal className="w-5 h-5" /> */}
          <MoreVertical className="w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-600" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-10 ">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onView}>
          <Eye className="h-4 w-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
