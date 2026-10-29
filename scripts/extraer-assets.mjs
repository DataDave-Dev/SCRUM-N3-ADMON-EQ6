// Extrae las imágenes base64 del prototipo a public/img/<clave>.<ext>.
// Uso: node scripts/extraer-assets.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const prototipo = join(raiz, 'prototype', 'sprint1-prototipo.html');
const destino = join(raiz, 'public', 'img');
const EXT = { jpeg: 'jpg', webp: 'webp', png: 'png' };

const html = readFileSync(prototipo, 'utf8');
const re = /"(\w+)":\s*"data:image\/(\w+);base64,([A-Za-z0-9+/=]+)"/g;
mkdirSync(destino, { recursive: true });

let escritos = 0;
let iguales = 0;
for (const [, clave, mime, b64] of html.matchAll(re)) {
  const ext = EXT[mime];
  if (!ext) throw new Error(`Tipo de imagen desconocido: ${mime} (${clave})`);
  const ruta = join(destino, `${clave}.${ext}`);
  const bytes = Buffer.from(b64, 'base64');
  if (existsSync(ruta) && readFileSync(ruta).equals(bytes)) {
    iguales++;
    continue;
  }
  writeFileSync(ruta, bytes);
  escritos++;
}
console.log(`${escritos} escritos, ${iguales} sin cambios -> ${destino}`);
