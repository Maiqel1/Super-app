import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        todoApp: {
          type: "module",
          name: "todoApp",
          entry: "https://super-app-chi-eosin.vercel.app/remoteEntry.js",
        },
        notesApp: {
          type: "module",
          name: "notesApp",
          entry: "https://super-app-notes.vercel.app/remoteEntry.js",
        },
        weatherApp: {
          type: "module",
          name: "weatherApp",
          entry: "https://super-app-weather.vercel.app/remoteEntry.js",
        },
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
  ],
  server: { port: 3000 },
  build: { target: "esnext" },
});
