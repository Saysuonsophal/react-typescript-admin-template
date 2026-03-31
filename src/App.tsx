import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/users";
import Basic from "./pages/Basic";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProductsPage from "./pages/product-page";
import { ProductAPI } from "./pages/product-api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColorPage } from "./pages/colorpage";
import { CategoryPage } from "./pages/category-page";

import { CustomerPage } from "./pages/customers";
import { SignIn } from "./pages/sign-in";
import { ForgotPassword } from "./pages/forgot-password";
import { SignUp } from "./pages/sign-up";
import { Product } from "./pages/product";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";
import { Loader, Check, X } from "lucide-react";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Toaster
        icons={{
          loading: <Loader className="w-4 h-4 animate-spin" />,
          success: (
            <div className="rounded-full w-4 h-4 bg-black flex items-center justify-center">
              <Check className="w-3.5 h-3.5 rounded-full border-none text-white" />
            </div>
          ),
          error: <X className="text-red-500" />,
        }}
        position="top-right"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Main Layout page (Header & Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/basic" element={<Basic />}></Route>
            <Route path="/users" element={<Users />}></Route>
          </Route>

          {/* Dashboard Layout  */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/products" element={<ProductsPage />}></Route>
            <Route path="/admin/products-api" element={<ProductAPI />}></Route>
            <Route path="/colors" element={<ColorPage />}></Route>
            <Route path="/admin/categories" element={<CategoryPage />}></Route>
            <Route path="/admin/customers" element={<CustomerPage />}></Route>
            <Route path="/admin/product" element={<Product />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
