    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import { federation } from '@module-federation/vite'

    export default defineConfig({
      plugins: [
        react(),
        federation({
          name: 'shell',
          remotes: {
            todoApp: {
              type: 'module',
              name: 'todoApp',
              entry: 'http://localhost:3001/remoteEntry.js',
            },
            notesApp: {
              type: 'module',
              name: 'notesApp',
              entry: 'http://localhost:3002/remoteEntry.js',
            },
            weatherApp: {
              type: 'module',
              name: 'weatherApp',
              entry: 'http://localhost:3003/remoteEntry.js',
            },
          },
          shared: {
            react: { singleton: true, eager: true },
            'react-dom': { singleton: true, eager: true },
          },
        }),
      ],
      server: { port: 3000 },
      build: { target: 'esnext' },
    })