import type { ReactNode } from "react";

/** Sección a pantalla completa. Se revela sola: el observador de Chrome
 *  marca data-visible cuando entra en viewport. */
export function Seccion({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} data-revelar className={`seccion ${className}`}>
      <div className="marco">{children}</div>
    </section>
  );
}

export function Rotulo({ children }: { children: ReactNode }) {
  return <p className="eyebrow aparecer">{children}</p>;
}

export function Titulo({
  children,
  retraso = 60,
  className = "",
}: {
  children: ReactNode;
  retraso?: number;
  className?: string;
}) {
  return (
    <h2
      className={`display aparecer mt-2.5 text-[clamp(1.875rem,4vw,3.125rem)] font-semibold ${className}`}
      style={{ "--retraso": `${retraso}ms` } as React.CSSProperties}
    >
      {children}
    </h2>
  );
}

export function Entradilla({
  children,
  retraso = 120,
  className = "",
}: {
  children: ReactNode;
  retraso?: number;
  className?: string;
}) {
  return (
    <p
      className={`aparecer mt-4 max-w-2xl text-[clamp(0.9375rem,1.4vw,1.0625rem)] leading-relaxed text-graphite ${className}`}
      style={{ "--retraso": `${retraso}ms` } as React.CSSProperties}
    >
      {children}
    </p>
  );
}

/** Envoltorio de aparición para cualquier bloque, con retraso escalonado. */
export function Aparece({
  children,
  retraso = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  retraso?: number;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
}) {
  return (
    <Tag
      className={`aparecer ${className}`}
      style={{ "--retraso": `${retraso}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * El cable: el conector origen → destino. Es el elemento firma de la
 * ponencia, así que existe en un solo sitio y se reusa en todas las secciones.
 *
 * `estado`:
 *   - "pasa"  → llega al otro lado y remata en un nodo lleno
 *   - "corta" → se interrumpe a mitad de camino (no hay equivalencia, o se cayó)
 *   - "nulo"  → punteado tenue: no llegó a evaluarse
 */
export function Cable({
  estado = "pasa",
  retraso = 0,
  className = "",
}: {
  estado?: "pasa" | "corta" | "nulo";
  retraso?: number;
  className?: string;
}) {
  const color =
    estado === "pasa"
      ? "var(--indigo)"
      : estado === "corta"
        ? "var(--falla)"
        : "var(--rule-strong)";

  return (
    <svg
      viewBox="0 0 72 24"
      className={`h-6 w-16 shrink-0 overflow-visible ${className}`}
      style={{ "--retraso": `${retraso}ms` } as React.CSSProperties}
      aria-hidden
      focusable="false"
    >
      <circle cx="3" cy="12" r="2.5" fill={color} opacity={0.9} />
      <path
        className="trazo"
        pathLength={1}
        d={estado === "pasa" ? "M6 12 H 66" : "M6 12 H 34"}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray={estado === "nulo" ? "3 4" : undefined}
        fill="none"
      />
      {estado === "pasa" && (
        <path
          className="trazo"
          pathLength={1}
          d="M62 8 L 68 12 L 62 16"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ "--retraso": `${retraso + 500}ms` } as React.CSSProperties}
        />
      )}
      {/* La cruz marca un rechazo. "nulo" no se rechazó: nunca llegó a
          evaluarse, así que el trazo simplemente se apaga. */}
      {estado === "corta" && (
        <path
          className="trazo"
          pathLength={1}
          d="M38 8 L 44 14 M44 8 L 38 14"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
          style={{ "--retraso": `${retraso + 400}ms` } as React.CSSProperties}
        />
      )}
    </svg>
  );
}

/** Código de asignatura, programa o endpoint. Contenido, no decoración. */
export function Codigo({
  children,
  tono,
}: {
  children: ReactNode;
  tono?: "indigo" | "apagado";
}) {
  const extra =
    tono === "indigo"
      ? "border-indigo/35 text-indigo"
      : tono === "apagado"
        ? "text-graphite"
        : "";
  return <span className={`codigo ${extra}`}>{children}</span>;
}
