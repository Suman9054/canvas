import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";



// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // In your vite.config.js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom'],
        
      }
    }
  }
}
});
