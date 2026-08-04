/**
 * Genera los QR como un módulo TS en vez de archivos .svg sueltos.
 *
 * Motivo: un <img src="qr.svg"> no hereda currentColor, así que el QR se vería
 * negro sobre fondo oscuro. Emitiendo sólo el atributo `d` podemos dibujarlo
 * inline y que siga el tema de la página.
 *
 * Uso:  pnpm qr        (PONENCIA_URL=https://... pnpm qr  para incluir el propio sitio)
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import QRCode from "qrcode";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");

const destinos = {
  gradus: "https://gradus-development.up.railway.app",
  universitas: "https://universitas-development.up.railway.app",
  identity: "https://identity-development.up.railway.app",
  swagger: "https://gradus-api-development.up.railway.app/swagger",
  repositorio: "https://github.com/jceballos29/Gradus",
};

if (process.env.PONENCIA_URL) destinos.ponencia = process.env.PONENCIA_URL;

const entradas = await Promise.all(
  Object.entries(destinos).map(async ([clave, url]) => {
    const svg = await QRCode.toString(url, {
      type: "svg",
      margin: 0,
      errorCorrectionLevel: "M",
    });

    const lado = svg.match(/viewBox="0 0 (\d+) \d+"/)?.[1];
    const d = svg.match(/<path stroke="#000000" d="([^"]+)"/)?.[1];
    if (!lado || !d) throw new Error(`No se pudo extraer el QR de ${clave}`);

    return [clave, { lado: Number(lado), d }];
  }),
);

const salida = `// Generado por scripts/generar-qr.mjs — no editar a mano.
// Cada entrada es el trazo de los módulos oscuros; se pinta con currentColor.

export type Qr = { lado: number; d: string };

export const qr: Record<string, Qr> = ${JSON.stringify(
  Object.fromEntries(entradas),
  null,
  2,
)};
`;

writeFileSync(join(raiz, "content", "qr.ts"), salida);
console.log(`✓ ${entradas.length} QR generados en content/qr.ts`);
