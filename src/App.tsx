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
import { Product } from "./pages/Product";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Main Layout page (Header & Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/basic" element={<Basic />}></Route>
            <Route path="/users" element={<Users />}></Route>
          </Route>

          {/* Dashboard Layout  */}
          <Route element={<DashboardLayout />}>
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/products-api" element={<ProductAPI />}></Route>
            <Route path="/colors" element={<ColorPage />}></Route>
            <Route path="/categories" element={<CategoryPage />}></Route>
            <Route path="/customers" element={<CustomerPage />}></Route>
            <Route path="/product" element={<Product />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
