import { Check, Circle } from "lucide-react";
import { Aparece, Entradilla, Rotulo, Seccion, Titulo } from "@/components/base";
import { Externo } from "@/components/secciones/apertura";
import { Qr } from "@/components/qr";
import { construccion, estado, identidad } from "@/content/ponencia";

/* ── 08 · Cómo se construyó ──────────────────────────────────────────── */

export function Construccion() {
  const { metodologia, auditoria } = construccion;

  return (
    <Seccion id="construccion">
      <Rotulo>El método</Rotulo>
      <Titulo>Un desarrollador, tres horas al día</Titulo>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-rule py-6 sm:grid-cols-4">
        {construccion.cifras.map((c, i) => (
          <Aparece key={c.etiqueta} retraso={140 + i * 80}>
            <p className="display text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold text-indigo tabular-nums">
              {c.valor}
            </p>
            <p className="mt-1 text-[14px] font-medium">{c.etiqueta}</p>
            <p className="mt-0.5 text-[12px] text-graphite">{c.pie}</p>
          </Aparece>
        ))}
      </div>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <Aparece retraso={420}>
          <p className="display text-2xl font-semibold">{metodologia.titulo}</p>
          <p className="mt-2 text-[16px] leading-relaxed text-indigo">
            {metodologia.tesis}
          </p>
          <ul className="mt-5 space-y-4">
            {metodologia.usos.map((u) => (
              <li key={u.titulo} className="border-l-2 border-rule-strong pl-4">
                <p className="text-[15px] font-medium">{u.titulo}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-graphite">
                  {u.cuerpo}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-rule pt-4">
            <p className="text-[15px] font-medium">{construccion.plan.titulo}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-graphite">
              {construccion.plan.cuerpo}
            </p>
          </div>
        </Aparece>

        <Aparece retraso={520} className="panel p-6">
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow">Auditoría · {auditoria.fecha}</p>
            <p className="mono text-[13px] text-espera">{auditoria.total}</p>
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {auditoria.desglose.map((d) => (
              <li key={d.nivel} className="text-[12.5px]">
                <span className="mono text-indigo tabular-nums">{d.n}</span>{" "}
                <span className="text-graphite">{d.nivel}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-rule pt-5">
            <p className="mono text-[10.5px] tracking-widest text-falla uppercase">
              Hallazgo crítico
            </p>
            <p className="mt-2 text-[15px] font-medium">
              {auditoria.critico.titulo}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-graphite">
              {auditoria.critico.cuerpo}
            </p>
            <p className="mt-2 text-[13px] text-exito">
              {auditoria.critico.cierre}
            </p>
          </div>

          <p className="mt-6 border-t border-rule pt-5 text-[14px] leading-relaxed">
            {auditoria.leccion}
          </p>
        </Aparece>
      </div>
    </Seccion>
  );
}

/* ── 09 · Estado real ────────────────────────────────────────────────── */

export function EstadoReal() {
  return (
    <Seccion id="estadoReal">
      <Rotulo>Estado real</Rotulo>
      <Titulo>Lo que está hecho y lo que no</Titulo>
      <Entradilla>
        Gradus es un producto incompleto con una base terminada. La diferencia
        importa, y casi todo lo que falta no depende de escribir más código.
      </Entradilla>

      <div className="divisor mt-8 grid gap-8 md:grid-cols-2 md:gap-16">
        <Aparece retraso={180}>
          <p className="mono text-[11px] tracking-widest text-exito uppercase">
            Funcionando
          </p>
          <ul className="mt-4 space-y-3">
            {estado.hecho.map((h) => (
              <li key={h} className="flex gap-3 text-[14.5px] leading-relaxed">
                <Check
                  size={15}
                  strokeWidth={2.25}
                  aria-hidden
                  className="mt-1 shrink-0 text-exito"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Aparece>

        <Aparece retraso={280}>
          <p className="mono text-[11px] tracking-widest text-espera uppercase">
            Pendiente
          </p>
          <ul className="mt-4 space-y-3">
            {estado.pendiente.map((p) => (
              <li key={p.titulo} className="flex gap-3">
                <Circle
                  size={15}
                  strokeWidth={2}
                  aria-hidden
                  className="mt-1 shrink-0 text-espera"
                />
                <div>
                  <p className="text-[14.5px] leading-snug font-medium">
                    {p.titulo}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-graphite">
                    {p.detalle}{" "}
                    <span className="text-graphite/80">— {p.quien}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Aparece>
      </div>

      <Aparece
        retraso={520}
        className="mt-8 max-w-3xl border-l-2 border-espera pl-5"
      >
        <p className="text-[15px] font-medium">{estado.privacidad.titulo}</p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-graphite">
          {estado.privacidad.cuerpo}
        </p>
      </Aparece>
    </Seccion>
  );
}

/* ── 10 · Cierre ─────────────────────────────────────────────────────── */

export function Cierre() {
  return (
    <Seccion id="cierre">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="display aparecer text-[clamp(3rem,10vw,6.5rem)] font-extrabold">
            Gracias
          </h2>
          <Aparece retraso={140} className="mt-8 border-t border-rule pt-6">
            <p className="text-lg font-medium">{identidad.autor}</p>
            <p className="mt-1 text-[15px] text-graphite">
              {identidad.semillero}
            </p>
            <p className="mt-1 text-[15px] text-graphite">
              {identidad.institucion}
            </p>
          </Aparece>

          <Aparece retraso={240} className="mt-7">
            <Externo
              href={identidad.repositorioUrl}
              className="mono text-[14px]"
            >
              {identidad.repositorio}
            </Externo>
          </Aparece>
        </div>

        <Aparece retraso={320} className="panel p-6 sm:p-7">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col items-center">
              <Qr
                clave="repositorio"
                etiqueta="Repositorio de Gradus en GitHub"
                className="h-auto w-full max-w-[8rem] text-ink"
              />
              <p className="mt-3 text-center text-[11.5px] text-graphite">
                Repositorio
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Qr
                clave="ponencia"
                etiqueta="Esta ponencia"
                className="h-auto w-full max-w-[8rem] text-ink"
              />
              <p className="mt-3 text-center text-[11.5px] text-graphite">
                Esta ponencia
              </p>
            </div>
          </div>
          <p className="mt-5 text-center text-[13px] leading-relaxed text-graphite">
            El código de las cuatro aplicaciones y esta misma presentación,
            para volver a verla.
          </p>
        </Aparece>
      </div>
    </Seccion>
  );
}
