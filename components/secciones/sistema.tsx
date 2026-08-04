import {
  Aparece,
  Cable,
  Codigo,
  Entradilla,
  Rotulo,
  Seccion,
  Titulo,
} from "@/components/base";
import { Externo } from "@/components/secciones/apertura";
import { EstadoServicios } from "@/components/estado-servicios";
import {
  acta,
  algoritmo,
  estados,
  historial,
  servicios,
} from "@/content/ponencia";

/* ── 04 · El ecosistema ──────────────────────────────────────────────── */

export function Ecosistema() {
  return (
    <Seccion id="ecosistema">
      <Rotulo>El ecosistema</Rotulo>
      <Titulo>Cuatro servicios, desplegados y hablándose</Titulo>
      <Entradilla>
        Cada uno se puede levantar, probar y desplegar solo. El punto de la
        separación no es la elegancia: es que ninguno bloquee a otro.
      </Entradilla>

      <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
        {servicios.map((s, i) => (
          <Aparece
            key={s.clave}
            retraso={180 + i * 90}
            as="article"
            className="panel flex flex-col p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="mono text-[14.5px] font-semibold text-indigo">
                {s.nombre}
              </h3>
              <EstadoServicios clave={s.clave} />
            </div>

            <p className="mt-1 text-[14.5px] font-medium">{s.rol}</p>

            <ul className="mt-3 flex-1 space-y-2">
              {s.hechos.map((h) => (
                <li
                  key={h}
                  className="flex gap-2.5 text-[13px] leading-snug text-graphite"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-px w-2.5 shrink-0 bg-rule-strong"
                  />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-rule pt-3.5">
              {s.stack.map((t) => (
                <Codigo key={t}>{t}</Codigo>
              ))}
              <Externo
                href={s.url}
                className="mono ml-auto text-[11px] text-graphite"
              >
                :{s.puerto}
              </Externo>
            </div>
          </Aparece>
        ))}
      </div>
    </Seccion>
  );
}

/* ── 05 · El algoritmo ───────────────────────────────────────────────── */

const veredictoEstilo = {
  homologa: { cable: "pasa" as const, color: "text-exito", texto: "homologa" },
  rechaza: { cable: "corta" as const, color: "text-falla", texto: "no homologa" },
  "no-evalua": { cable: "nulo" as const, color: "text-graphite", texto: "no aplica" },
};

export function Algoritmo() {
  const { ejemplo } = algoritmo;
  const homologadas = historial.filter((f) => f.veredicto === "homologa");
  const creditos = homologadas.reduce((a, f) => a + f.creditos, 0);

  return (
    <Seccion id="algoritmo">
      <Rotulo>El algoritmo</Rotulo>
      <Titulo>Lo que antes era cruzar dos hojas a mano</Titulo>
      <Entradilla className="max-w-xl">
        Un solo handler de {algoritmo.lineas} líneas hace el trabajo. Estas son
        sus tres compuertas, corriendo sobre la regla y el historial que hay
        ahora mismo en el entorno desplegado.
      </Entradilla>

      <div className="mt-7 grid gap-7 lg:grid-cols-[0.62fr_1.38fr] lg:gap-10">
        <Aparece retraso={180} className="flex flex-col justify-between gap-5">
          <ol className="space-y-3">
            {algoritmo.compuertas.map((c) => (
              <li key={c.n} className="panel p-3.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="mono text-[11px] text-indigo tabular-nums">
                    {c.n}
                  </span>
                  <p className="text-[14.5px] font-medium">{c.nombre}</p>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-snug text-graphite">
                  {c.detalle}
                </p>
                <p className="mono mt-2 text-[10.5px] text-falla">
                  → {c.motivo}
                </p>
              </li>
            ))}
          </ol>

          <p className="mono text-[10.5px] leading-relaxed text-graphite">
            {algoritmo.tope}
          </p>
        </Aparece>

        <Aparece retraso={300} className="min-w-0">
          <div className="panel">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule px-4 py-3.5 sm:px-5">
              <p className="mono text-[11px]">
                <span className="text-indigo">{ejemplo.origen.codigo}</span>
                <span className="text-graphite"> → </span>
                <span className="text-indigo">{ejemplo.destino.codigo}</span>
                <span className="text-graphite">
                  {" "}
                  · {ejemplo.equivalencias} equivalencias
                </span>
              </p>
              <p className="mono text-[11px] text-graphite">
                nota mínima {ejemplo.notaMinima.toFixed(1)} · tope{" "}
                {ejemplo.topePorcentaje} % · misma área sí
              </p>
            </div>

            <ul className="divide-y divide-rule">
              {historial.map((f, i) => {
                const v = veredictoEstilo[f.veredicto];
                return (
                  <li key={`${f.codigo}-${i}`} className="px-4 py-2 sm:px-5">
                    <div className="desborde">
                      <div className="flex min-w-max items-center gap-3">
                        <span className="w-[3.2rem] shrink-0">
                          <Codigo tono={f.veredicto === "homologa" ? "indigo" : "apagado"}>
                            {f.codigo}
                          </Codigo>
                        </span>
                        <span className="w-52 shrink-0 truncate text-[13.5px]">
                          {f.nombre}
                        </span>
                        <span className="mono w-11 shrink-0 text-right text-[12px] tabular-nums">
                          {f.nota === null ? (
                            <span className="text-graphite">—</span>
                          ) : (
                            <span
                              className={
                                f.veredicto === "rechaza" && f.motivo === "GradeTooLow"
                                  ? "text-falla"
                                  : "text-graphite"
                              }
                            >
                              {f.nota.toFixed(2)}
                            </span>
                          )}
                        </span>
                        <Cable estado={v.cable} retraso={500 + i * 110} />
                        <span className="w-[8.5rem] shrink-0">
                          {f.destino ? (
                            <Codigo tono="indigo">{f.destino.codigo}</Codigo>
                          ) : (
                            <span className={`mono text-[11px] ${v.color}`}>
                              {v.texto}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    {f.nota_al_pie && (
                      <p className="pl-[4.2rem] text-[11.5px] leading-snug text-graphite">
                        {f.nota_al_pie}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="border-t border-rule px-4 py-2.5 text-[12.5px] text-graphite sm:px-5">
              <span className="text-ink">
                {homologadas.length} homologables · {creditos} créditos
              </span>{" "}
              · {historial.length} filas. Nada se cae: las{" "}
              {ejemplo.equivalencias} equivalencias están definidas.
            </p>
          </div>
        </Aparece>
      </div>
    </Seccion>
  );
}

/* ── 06 · La máquina de estados ──────────────────────────────────────── */

const tonoEstado = {
  neutro: "text-graphite border-rule-strong",
  espera: "text-espera border-espera",
  activo: "text-indigo border-indigo",
  exito: "text-exito border-exito",
  falla: "text-falla border-falla",
};

export function Estados() {
  return (
    <Seccion id="estados">
      <Rotulo>Los estados</Rotulo>
      <Titulo>Siete estados y ninguna transición suelta</Titulo>
      <Entradilla>{acta.invariante}</Entradilla>

      <div className="desborde mt-8">
        <ol className="flex min-w-max gap-3">
          {estados.map((e, i) => (
            <Aparece
              key={e.clave}
              retraso={200 + i * 80}
              as="li"
              className="panel w-52 shrink-0 p-4"
            >
              <span
                className={`mono inline-block rounded-md border px-2 py-0.5 text-[10.5px] ${tonoEstado[e.tono]}`}
              >
                {e.clave}
              </span>
              <p className="mt-3 text-[15px] font-medium">{e.etiqueta}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-graphite">
                {e.nota}
              </p>
            </Aparece>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-12">
        <Aparece retraso={700}>
          <p className="eyebrow">El acta</p>
          <p className="display mt-2 text-2xl font-semibold">
            {acta.formato}
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-graphite">
            {acta.detalle}
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-graphite">
            {acta.almacenamiento}
          </p>
        </Aparece>

        <Aparece retraso={800} className="border-l-2 border-indigo pl-5">
          <p className="text-[15px] leading-relaxed">{acta.numeracion}</p>
          <p className="mt-4 text-[15px] leading-relaxed">
            Si la generación del PDF falla, la solicitud se queda aprobada en vez
            de perder la decisión. El acta se regenera después, con el mismo
            número.
          </p>
          <p className="mono mt-4 text-[11px] text-graphite">{acta.motor}</p>
        </Aparece>
      </div>
    </Seccion>
  );
}
