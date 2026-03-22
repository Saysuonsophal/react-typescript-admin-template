import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlus, X } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
const categories = [
  { id: "licenses", name: "Licenses", count: 2 },
  { id: "modules", name: "Modules", count: 5 },
  { id: "plans", name: "Plans", count: 2 },
  { id: "templates", name: "Templates", count: 6 },
];

export function PopoverBox() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="border-dashed p-0 flex items-center overflow-hidden"
          >
            <span className="flex items-center gap-2 px-2 py-2 text-sm">
              <CirclePlus className="text-gray-500 !w-4 !h-4" />
              Category
            </span>
            <div className="self-stretch flex items-center rounded-none px-2 border-l border-dashed ">
              <Badge
                variant="secondary"
                className="ml-1 rounded-sm px-1 py-0.5 bg-gray-100"
              >
                2
              </Badge>
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-56 p-0">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 border-b mb-1">
            <FiSearch className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Category"
              className="border-0 shadow-none focus-visible:ring-0 p-0 h-7 text-md"
            />
          </div>
          {/* List */}
          <div className="p-1 overflow-y-auto max-h-48">
            {categories.map((item) => (
              <label
                key={item.id}
                className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-xs text-gray-500">{item.count}</span>
              </label>
            ))}

            {/* Clear Filter */}
            <Button variant="ghost" className="w-full mt-2">
              {" "}
              Clear Filters
            </Button>
          </div>
          {/* <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader> */}
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="sm"
        //onClick={reset}
        className="flex items-center gap-1 text-sm"
      >
        Reset
        <X className="w-3 h-3" />
      </Button>
    </>
  );
}
