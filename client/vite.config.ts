import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    /** Чтобы второй игрок зашёл по Wi‑Fi: http://ВАШ_IP:5173 */
    host: true,
  },
});
