import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/react-typescript-admin-template/", // ⚠️ important for GitHub pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
