import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        build: {
            rollupOptions: {
                input: resolve('src/app/main/index.ts'),
            },
        },
        resolve: {
            alias: {
                '#': resolve('src/main'),
                'shared': resolve('src/shared'),
            },
        },
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        build: {
            rollupOptions: {
                input: resolve('src/app/preload/index.ts'),
            },
        },
        resolve: {
            alias: {
                'shared': resolve('src/shared'),
            },
        },
    },
    renderer: {
        root: 'src/app/renderer',
        build: {
            rollupOptions: {
                input: 'src/app/renderer/index.html',
            },
        },
        resolve: {
            alias: {
                '@': resolve('src/renderer'),
                'shared': resolve('src/shared'),
            },
        },
        plugins: [react()],
    },
});
