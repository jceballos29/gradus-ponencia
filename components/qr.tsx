import { qr } from "@/content/qr";

/** QR dibujado inline para que siga el tema de la página. */
export function Qr({
  clave,
  etiqueta,
  className = "",
}: {
  clave: string;
  etiqueta: string;
  className?: string;
}) {
  const codigo = qr[clave];
  if (!codigo) return null;

  return (
    <svg
      viewBox={`-1 -1 ${codigo.lado + 2} ${codigo.lado + 2}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`Código QR: ${etiqueta}`}
      className={className}
    >
      <path
        d={codigo.d}
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
      />
    </svg>
  );
}
