"use client";

import { useState } from "react";
import { ArrowUpRight, Eye, EyeOff, Images } from "lucide-react";
import { Aparece, Entradilla, Rotulo, Seccion, Titulo } from "@/components/base";
import { EstadoServicios } from "@/components/estado-servicios";
import { Qr } from "@/components/qr";
import { demo } from "@/content/ponencia";
import { capturas } from "@/content/capturas";

export function Demo() {
  const [verClave, setVerClave] = useState(false);
  const [verCapturas, setVerCapturas] = useState(false);

  return (
    <Seccion id="demo">
      <Rotulo>La demo</Rotulo>
      <Titulo>Está corriendo ahora mismo</Titulo>
      <Entradilla>
        Escanea y entra desde tu teléfono mientras se recorre en vivo. {demo.nota}
      </Entradilla>

      <div className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {demo.enlaces.map((e, i) => (
          <Aparece key={e.clave} retraso={180 + i * 90}>
            <a
              href={e.url}
              target="_blank"
              rel="noreferrer"
              className="panel group flex h-full cursor-pointer flex-col p-4 transition-colors hover:border-indigo"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[14.5px] font-semibold">{e.titulo}</h3>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-graphite">
                    {e.descripcion}
                  </p>
                </div>
                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-graphite transition-colors group-hover:text-indigo"
                />
              </div>

              <Qr
                clave={e.clave}
                etiqueta={e.titulo}
                className="my-4 size-28 self-center text-ink"
              />

              <div className="mt-auto border-t border-rule pt-2.5">
                {/* El Swagger lo sirve la propia gradus-api: su latencia es la
                    del servicio, no la de un cuarto despliegue. */}
                <EstadoServicios
                  clave={e.clave === "swagger" ? "gradus-api" : e.clave}
                />
              </div>
            </a>
          </Aparece>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <Aparece retraso={560}>
          <p className="eyebrow">Usuarios de prueba</p>
          <ul className="mt-3 space-y-2">
            {demo.usuarios.map((u) => (
              <li key={u.correo} className="flex items-baseline gap-3">
                <span className="mono text-[13px]">{u.correo}</span>
                <span className="text-[12px] text-graphite">{u.rol}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center gap-3">
            <span className="mono text-[13px]">
              {verClave ? demo.clave : "••••••••••"}
            </span>
            <button
              type="button"
              onClick={() => setVerClave((v) => !v)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-rule px-2 py-1 text-[11px] text-graphite transition-colors hover:border-rule-strong hover:text-indigo"
              aria-pressed={verClave}
            >
              {verClave ? <EyeOff size={13} /> : <Eye size={13} />}
              {verClave ? "Ocultar" : "Ver contraseña"}
            </button>
          </div>
          <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-graphite">
            Datos sembrados, ficticios. Aun así la contraseña arranca oculta:
            esta página puede quedar publicada después de la charla.
          </p>
        </Aparece>

        <Aparece retraso={640}>
          <p className="eyebrow">Recorrido</p>
          <ol className="mt-3 space-y-3">
            {demo.recorrido.map((r) => (
              <li key={r.minutos} className="flex gap-4">
                <span className="mono w-9 shrink-0 text-[12px] text-indigo tabular-nums">
                  {r.minutos}
                </span>
                <span className="text-[14px] leading-relaxed">{r.paso}</span>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={() => setVerCapturas((v) => !v)}
            aria-expanded={verCapturas}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-rule px-3 py-1.5 text-[12.5px] text-graphite transition-colors hover:border-rule-strong hover:text-indigo"
          >
            <Images size={14} strokeWidth={1.75} />
            {verCapturas ? "Ocultar capturas" : "Capturas de respaldo"}
          </button>
        </Aparece>
      </div>

      {verCapturas && (
        <div className="desborde mt-6">
          <ul className="flex min-w-max gap-4">
            {capturas.map((c) => (
              <li key={c.archivo} className="w-72 shrink-0">
                <figure className="panel overflow-hidden">
                  {/* <img> y no next/image: son capturas propias, de tamaño
                      conocido, ocultas tras un botón (nunca son el LCP) y así
                      el despliegue no depende de sharp. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/capturas/${c.archivo}`}
                    alt={c.alt}
                    width={1280}
                    height={800}
                    loading="lazy"
                    className="w-full border-b border-rule bg-paper"
                  />
                  <figcaption className="px-3 py-2.5 text-[12.5px] leading-snug text-graphite">
                    {c.titulo}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Seccion>
  );
}
