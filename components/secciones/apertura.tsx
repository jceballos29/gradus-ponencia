import { ArrowUpRight } from "lucide-react";
import { Aparece, Cable, Codigo, Entradilla, Rotulo, Seccion, Titulo } from "@/components/base";
import { decision, identidad, problema } from "@/content/ponencia";

/* ── 01 · Portada ────────────────────────────────────────────────────── */

/* Historial real de juan.ceballos@poli.dev evaluado contra la regla 351C → 372V
   que está configurada en el entorno. Inglés III aparece dos veces a propósito:
   es el paso de deduplicación, y es lo que decide si se homologa o no. */
const muestra = [
  { de: "0547", nota: "4.55", a: "1507", estado: "pasa" as const },
  { de: "0793", nota: "2.61", a: null, estado: "nulo" as const },
  { de: "0793", nota: "3.86", a: "1461", estado: "pasa" as const },
];

export function Portada() {
  return (
    <Seccion id="portada">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Rotulo>{identidad.institucion}</Rotulo>
          <h1
            className="display aparecer mt-4 text-[clamp(3.5rem,13vw,8rem)] font-extrabold"
            style={{ "--retraso": "60ms" } as React.CSSProperties}
          >
            Gradus
          </h1>
          <p
            className="aparecer mt-4 max-w-md text-[clamp(1.125rem,2.4vw,1.5rem)] leading-snug text-graphite"
            style={{ "--retraso": "140ms" } as React.CSSProperties}
          >
            {identidad.descriptor}
          </p>

          <Aparece retraso={260} className="mt-10 border-t border-rule pt-6">
            <p className="text-lg font-medium">{identidad.autor}</p>
            <p className="mt-1 text-[15px] text-graphite">
              {identidad.semillero} · {identidad.escuela}
            </p>
            <p className="mt-3 text-[13px] text-graphite">
              Coordinador: {identidad.coordinador}
            </p>
          </Aparece>
        </div>

        {/* La firma: la equivalencia dibujándose sola */}
        <Aparece retraso={200} as="figure" className="panel p-6 sm:p-8">
          <figcaption className="eyebrow flex items-baseline justify-between gap-4">
            <span>351C</span>
            <span>372V</span>
          </figcaption>

          <ul className="mt-6 space-y-5">
            {muestra.map((m, i) => (
              <li
                key={`${m.de}-${m.nota}`}
                className="grid grid-cols-[3.2rem_2.5rem_1fr_3.5rem] items-center gap-2"
              >
                <Codigo tono={m.estado === "pasa" ? "indigo" : "apagado"}>
                  {m.de}
                </Codigo>
                <span
                  className={`mono text-[11.5px] tabular-nums ${
                    m.estado === "pasa" ? "text-graphite" : "text-graphite/60"
                  }`}
                >
                  {m.nota}
                </span>
                <span className="flex justify-center">
                  <Cable estado={m.estado} retraso={500 + i * 220} />
                </span>
                <span className="text-right">
                  {m.a ? (
                    <Codigo tono="indigo">{m.a}</Codigo>
                  ) : (
                    <span className="mono text-[11px] text-graphite/60">—</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-rule pt-4 text-[13px] leading-relaxed text-graphite">
            Inglés III, dos veces: perdida y después aprobada. El sistema se
            queda con el mejor intento antes de decidir. Historial real del
            entorno desplegado.
          </p>
        </Aparece>
      </div>
    </Seccion>
  );
}

/* ── 02 · El problema ────────────────────────────────────────────────── */

export function Problema() {
  const lados = [
    { ...problema.origen, lado: "origen" as const },
    { ...problema.destino, lado: "destino" as const },
  ];

  return (
    <Seccion id="problema">
      <Rotulo>El proceso actual</Rotulo>
      <Titulo>Dos personas frente al mismo escritorio</Titulo>
      <Entradilla>{problema.entradilla}</Entradilla>

      <div className="divisor mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
        {lados.map((l, i) => (
          <Aparece key={l.rol} retraso={200 + i * 120}>
            <p
              className={`mono text-[11px] tracking-widest uppercase ${
                l.lado === "destino" ? "text-indigo" : "text-graphite"
              }`}
            >
              {l.rol}
            </p>
            <p className="display mt-2 text-2xl font-semibold">{l.resumen}</p>
            <ul className="mt-6 space-y-4">
              {l.dolores.map((d) => (
                <li key={d} className="flex gap-3.5 text-[15px] leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-2.5 h-px w-4 shrink-0 bg-rule-strong"
                  />
                  <span className="text-graphite">{d}</span>
                </li>
              ))}
            </ul>
          </Aparece>
        ))}
      </div>

      <Aparece retraso={480} className="mt-12 max-w-3xl border-t border-rule pt-6">
        <p className="text-[17px] leading-relaxed">{problema.cierre}</p>
        <p className="eyebrow mt-4">{problema.fuente}</p>
      </Aparece>
    </Seccion>
  );
}

/* ── 03 · La decisión de arquitectura ────────────────────────────────── */

export function Decision() {
  return (
    <Seccion id="decision">
      <Rotulo>La decisión</Rotulo>
      <Titulo>Tres cosas que no dependían de mí</Titulo>
      <Entradilla>
        Empezar por la integración real habría significado esperar. La
        arquitectura se diseñó para que esperar no costara tiempo de desarrollo.
      </Entradilla>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Aparece retraso={180} className="flex flex-col justify-between gap-8">
          <ol className="space-y-5">
            {decision.bloqueo.map((b) => (
              <li key={b.titulo} className="border-l-2 border-rule-strong pl-4">
                <p className="font-medium">{b.titulo}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-graphite">
                  {b.detalle}
                </p>
              </li>
            ))}
          </ol>

          <blockquote className="border-l-2 border-indigo pl-4">
            <p className="display text-xl leading-snug font-medium text-balance">
              «{decision.cita}»
            </p>
            <cite className="eyebrow mt-2.5 block not-italic">
              {decision.citaFuente}
            </cite>
          </blockquote>
        </Aparece>

        <Aparece retraso={300} className="panel min-w-0 p-5 sm:p-6">
          <p className="eyebrow">La jugada</p>
          <p className="display mt-2 text-3xl font-semibold text-indigo">
            {decision.jugada.titulo}
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-graphite">
            {decision.jugada.cuerpo}
          </p>

          <div className="desborde mt-5 rounded-lg border border-rule bg-paper p-3.5">
            <div className="mono flex min-w-max items-center gap-3 text-[12px]">
              <span className="text-graphite">Domain</span>
              <Cable retraso={700} className="w-10" />
              <span className="text-indigo">IUniversitasClient</span>
              <Cable retraso={900} className="w-10" />
              <span className="text-graphite">UxxiClient</span>
            </div>
            <p className="mono mt-3 text-[11px] text-graphite">
              {decision.jugada.flag}
            </p>
          </div>

          <p className="mt-4 text-[14.5px] leading-relaxed">
            {decision.jugada.consecuencia}
          </p>

          <ul className="mt-5 grid gap-x-6 gap-y-2.5 border-t border-rule pt-4 sm:grid-cols-2">
            {decision.costuras.map((c) => (
              <li key={c.nombre} className="text-[13px] leading-relaxed">
                <span className="mono text-[11px] text-indigo">{c.nombre}</span>
                <span className="mt-0.5 block text-graphite">{c.que}</span>
              </li>
            ))}
          </ul>
        </Aparece>
      </div>
    </Seccion>
  );
}

/* Enlace externo reutilizado por varias secciones. */
export function Externo({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-1.5 transition-colors hover:text-indigo ${className}`}
    >
      {children}
      <ArrowUpRight
        size={14}
        strokeWidth={2}
        className="shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
      />
    </a>
  );
}
