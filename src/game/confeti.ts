/** Confeti del prototipo sobre un canvas fijo que no bloquea clics. */

const COLORES = ['#ffd84d', '#ff7aa8', '#4aa3ff', '#5cc46a', '#ec4b3f'];
const GRAVEDAD = 0.35;
const GIRO = 0.2;
/** Altura relativa de la que sale el estallido. */
const ORIGEN_Y = 0.35;

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  lado: number;
  angulo: number;
}

let particulas: Particula[] = [];

const lienzo = () => document.getElementById('confeti') as HTMLCanvasElement;

/** Lanza `n` partículas; con movimiento reducido no hace nada. */
export function lanzar(n: number): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = lienzo();
  cv.width = innerWidth;
  cv.height = innerHeight;
  const enCurso = particulas.length > 0;
  const nuevas = Array.from({ length: n }, (_, i) => ({
    x: innerWidth / 2,
    y: innerHeight * ORIGEN_Y,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -13 - 3,
    color: COLORES[i % COLORES.length]!,
    lado: 5 + Math.random() * 7,
    angulo: Math.random() * 6,
  }));
  particulas = [...particulas, ...nuevas];
  if (!enCurso) requestAnimationFrame(cuadro);
}

/** Avanza y dibuja; se detiene solo cuando todas salen por abajo. */
function cuadro(): void {
  const cv = lienzo();
  const cx = cv.getContext('2d')!;
  cx.clearRect(0, 0, cv.width, cv.height);
  particulas = particulas
    .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + GRAVEDAD, angulo: p.angulo + GIRO }))
    .filter((p) => p.y < cv.height + 20);
  for (const p of particulas) {
    cx.save();
    cx.fillStyle = p.color;
    cx.translate(p.x, p.y);
    cx.rotate(p.angulo);
    cx.fillRect(-p.lado / 2, -p.lado / 2, p.lado, p.lado * 0.6);
    cx.restore();
  }
  if (particulas.length) requestAnimationFrame(cuadro);
}
