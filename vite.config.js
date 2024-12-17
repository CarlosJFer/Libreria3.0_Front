import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Puedes usar "dist" sin el ../ para mantenerlo en la raíz del proyecto
    emptyOutDir: true, // Limpia el directorio de salida antes de construir
  },
  server: {
    open: true, // Abre automáticamente el navegador
  },
  define: {
    'process.env': process.env
  }
});