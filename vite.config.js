import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.jsx',
                'resources/js/Pages/Appointments/Index.jsx',
                'resources/js/Pages/Appointments/Create.jsx',
                'resources/js/Pages/Appointments/Show.jsx',
                'resources/js/Pages/Appointments/Video.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});
