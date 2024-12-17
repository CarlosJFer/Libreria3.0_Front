import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  root: "", // Indica a Vite dónde buscar el index.html
  build: {
    outDir: "../dist", // Define la salida relativa al nuevo root
    emptyOutDir: true, // Limpia el directorio de salida antes de construir
  },
  server: {
    open: true, // Abre automáticamente el navegador
  },
  define: {
    'process.env': process.env
  }
});