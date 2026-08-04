/**
 * Estado en vivo del entorno desplegado en Railway.
 *
 * Se consulta desde el servidor y no desde el navegador porque la política CORS
 * de gradus-api ("GradusFrontend") no incluye el origen de la ponencia: un fetch
 * directo desde el cliente fallaría por CORS, no por caída del servicio.
 */

const SERVICIOS = [
  { clave: "identity", url: "https://identity-development.up.railway.app/health" },
  { clave: "universitas", url: "https://universitas-development.up.railway.app/" },
  { clave: "gradus", url: "https://gradus-development.up.railway.app/" },
  { clave: "gradus-api", url: "https://gradus-api-development.up.railway.app/health" },
] as const;

const TIEMPO_LIMITE_MS = 3000;

export type EstadoServicio = {
  clave: string;
  estado: "activo" | "dormido";
  ms: number | null;
};

async function sondear(url: string): Promise<{ ok: boolean; ms: number | null }> {
  const inicio = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(TIEMPO_LIMITE_MS),
    });
    return { ok: res.ok, ms: Date.now() - inicio };
  } catch {
    // Timeout, DNS, TLS o servicio frío. Todo cae en "dormido": nunca se pinta
    // un rojo de alarma en medio de una charla por un arranque en frío.
    return { ok: false, ms: null };
  }
}

export async function GET() {
  const resultados = await Promise.all(
    SERVICIOS.map(async (s): Promise<EstadoServicio> => {
      const { ok, ms } = await sondear(s.url);
      return { clave: s.clave, estado: ok ? "activo" : "dormido", ms };
    }),
  );

  return Response.json(
    { servicios: resultados, consultadoEn: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
