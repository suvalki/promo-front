import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router"],
          mantine: [
            "@mantine/core",
            "@mantine/hooks",
            "@mantine/form",
            "@mantine/dates",
            "@mantine/modals",
            "@mantine/notifications",
          ],
          icons: ["@tabler/icons-react"],
          table: ["@tanstack/react-table"],
          query: ["@tanstack/react-query"],
        },
      },
    },
  },
});
