"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable, // this libray is providing types and the rendering implementation of header/cell/footer templates.
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn?: string; // optional column to filter
  filterPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setcolumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setcolumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const filterValue =
    filterColumn && columnFilters.find((f) => f.id === filterColumn)?.value;

  return (
    <>
      <div>
        {filterColumn && (
          <input
            type="text"
            placeholder={filterPlaceholder || "Filter..."}
            value={String(filterValue ?? "")}
            onChange={(e) =>
              setcolumnFilters([{ id: filterColumn, value: e.target.value }])
            }
            className="w-2xs border px-2 py-1 mb-2 rounded"
          />
        )}
      </div>
      <div className="overflow-hidden rounded-md border">
        {/* {filterColumn && (
      <input
        type="text"
        placeholder={filterPlaceholder || "Filter..."}
        value={String(filterValue ?? "")}
        onChange={(e) =>
          setcolumnFilters([{ id: filterColumn, value: e.target.value }])
        }
        className="border px-2 py-1 mb-2 rounded"
      />
    )} */}
        <Table className="table-fix w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
