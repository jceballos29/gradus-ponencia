"use client";

import { useEffect, useState } from "react";
import type { EstadoServicio } from "@/app/api/estado/route";

type Estado = Record<string, EstadoServicio | undefined>;

/**
 * Consulta el entorno real cada 30 s. Empieza en "sin consultar" y nunca
 * bloquea el render: si Railway está frío, la sección se ve igual de bien.
 */
export function EstadoServicios({ clave }: { clave: string }) {
  const [estado, setEstado] = useState<Estado>({});
  const [consultado, setConsultado] = useState(false);

  useEffect(() => {
    let vivo = true;

    async function consultar() {
      try {
        const res = await fetch("/api/estado", { cache: "no-store" });
        const datos = (await res.json()) as { servicios: EstadoServicio[] };
        if (!vivo) return;
        setEstado(Object.fromEntries(datos.servicios.map((s) => [s.clave, s])));
      } catch {
        /* sin red: se queda en el estado neutro */
      } finally {
        if (vivo) setConsultado(true);
      }
    }

    consultar();
    const id = setInterval(consultar, 30_000);
    return () => {
      vivo = false;
      clearInterval(id);
    };
  }, []);

  const s = estado[clave];
  const activo = s?.estado === "activo";

  return (
    <span className="mono inline-flex items-center gap-1.5 text-[11px] whitespace-nowrap">
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
          activo ? "bg-exito" : "bg-rule-strong"
        }`}
      />
      <span className={activo ? "text-exito" : "text-graphite"}>
        {!consultado ? "consultando" : activo ? `${s?.ms} ms` : "en reposo"}
      </span>
    </span>
  );
}
