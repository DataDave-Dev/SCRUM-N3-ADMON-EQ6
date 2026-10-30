// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://datadave-dev.github.io',
  base: '/SCRUM-N3-ADMON-EQ6',
  vite: {
    plugins: [tailwindcss()],
  },
});
