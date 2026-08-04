import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          rooms: path.resolve(__dirname, 'rooms.html'),
          roomDetails: path.resolve(__dirname, 'room-details.html'),
          dining: path.resolve(__dirname, 'dining.html'),
          spa: path.resolve(__dirname, 'spa.html'),
          experiences: path.resolve(__dirname, 'experiences.html'),
          offers: path.resolve(__dirname, 'offers.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          booking: path.resolve(__dirname, 'booking.html'),
          myBookings: path.resolve(__dirname, 'my-bookings.html'),
          admin: path.resolve(__dirname, 'admin.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
