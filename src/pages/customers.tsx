import { columns } from "@/components/customers/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { useCustomer } from "@/hooks/useCustomer";

export const CustomerPage = () => {
  const { data, isLoading } = useCustomer();
  console.log("customer fetch Data:", data);

  if (isLoading) {
    return <div className="p-4 text-center">Loading customers...</div>;
  }
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-2 py-6">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <span className="text-sm text-muted-foreground">
            View and manage your customer base.
          </span>
        </div>
        <div className="flex gap-2 ">
          <Button>Export</Button>
        </div>
      </div>
      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  );
};
