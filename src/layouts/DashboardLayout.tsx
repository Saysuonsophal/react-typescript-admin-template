import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Modeclick from "@/components/mode-click";
import { Toaster } from "sonner";
import { Command, Search } from "lucide-react";

const DashboardLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0 flex flex-col ">
          <header className="flex h-15 shrink-0 backdrop-blur-lg sticky top-0 z-50 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-15">
            {/* LEFT SIDE oklch(92.9% .013 255.508)*/}
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />

              {/* Global serach */}
              <div className="flex items-center w-[250px] bg-[#fbfbfb] border border-border rounded-md  px-2 py-1.5">
                <div className="flex items-center justify-start gap-2 max-w-sm flex-1 ">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    Search anything....
                  </span>
                </div>
                <kbd className="flex items-center gap-1 text-[10px] bg-gray-100 text-muted-foreground border border-border rounded px-1.5 py-0.5 cursor-pointer">
                  <Command className="w-3 h-3" />
                  <span className="text-md">K</span>
                </kbd>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex gap-2 mr-5">
              <ModeToggle />
              <Modeclick />
            </div>
          </header>

          <div className="flex flex-1 min-w-0 flex-col gap-2 p-4 pt-0 overflow-hidden">
            {/* <p className="text-center font-bold text-3xl ">
              Dashboard Layout page
            </p> */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Outlet />
            <Toaster position="top-right" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
};
export default DashboardLayout;
