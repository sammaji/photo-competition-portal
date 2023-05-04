import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";

export default defineConfig({
    // root: path.resolve(__dirname, "./"),
    // publicDir: 'public',
    // assetsInclude: ["assets/**/*", "index.html"],
    plugins: [react()],
});
