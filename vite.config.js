import { defineConfig } from "vite";

export default defineConfig({
  root: "src",                // корінь проєкту — папка src
  build: {
    outDir: "../dist",        // вихідна папка для білду (на рівні з src)
    emptyOutDir: true,        // очищати dist перед новим білдом
  },
  define: {
    global: "window",         // щоб уникнути проблем із глобальними змінними
  },
  base: "/goit-js-hw-12/",    // назва твого репозиторію для GitHub Pages
});
