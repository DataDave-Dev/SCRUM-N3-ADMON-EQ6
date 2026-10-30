/// <reference types="vitest/config" />
// Reutiliza la config de Vite de Astro para que Vitest resuelva el alias `@/` de tsconfig.
import { getViteConfig } from 'astro/config';

export default getViteConfig({});
