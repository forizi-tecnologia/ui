/// <reference types="vitest" />
import { defineConfig, type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";

const plugins: PluginOption[] = [vue()];

// Aplica o auto-import do Vuetify apenas em modo de teste (vitest)
// No build da lib, Vuetify é peerDependency — não deve ser bundled
if (process.env.VITEST) {
  plugins.push(vuetify({ autoImport: true }));
}

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'jsdom',
    globals: true,
    css: true,
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
    setupFiles: ['./tests/setup.ts'],
  },
  plugins,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "components/index": resolve(__dirname, "src/components/index.ts"),
        "composables/index": resolve(__dirname, "src/composables/index.ts"),
        "utils/index": resolve(__dirname, "src/utils/index.ts"),
        "plugins/index": resolve(__dirname, "src/plugins/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "vuetify",
        "vuetify/components",
        "vuetify/directives",
        "pinia",
        "axios",
        "maska",
        "@mdi/font",
        /testutils/,
      ],
      output: {
        globals: {
          vue: "Vue",
          vuetify: "Vuetify",
          pinia: "Pinia",
          axios: "axios",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name || "";
        },
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        // Melhor code splitting: separa componentes em chunks individuais
        manualChunks: (id) => {
          // Cada componente Vue em seu próprio chunk
          if (id.includes('src/components/') && id.endsWith('.vue')) {
            const match = id.match(/src\/components\/(.+)\.vue$/);
            if (match) {
              return `components/${match[1].replace(/\//g, '-')}`;
            }
          }
          // Agrupa utilitários relacionados
          if (id.includes('src/utils/')) {
            const match = id.match(/src\/utils\/(.+)\.ts$/);
            if (match && !match[1].includes('index')) {
              return `utils/${match[1]}`;
            }
          }
          // Agrupa composables
          if (id.includes('src/composables/') && !id.includes('index')) {
            const match = id.match(/src\/composables\/(.+)\.ts$/);
            if (match && !match[1].includes('index')) {
              return `composables/${match[1]}`;
            }
          }
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
