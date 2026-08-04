"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Moon,
  NotebookText,
  Sun,
  X,
} from "lucide-react";
import { secciones } from "@/content/secciones";
import { notas } from "@/content/ponencia";

type Overlay = "indice" | "notas" | null;

export function Chrome() {
  const [activa, setActiva] = useState(0);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  /* Un solo observador revela todo lo marcado con data-revelar. Las secciones
     siguen siendo componentes de servidor: no hay isla de cliente por bloque. */
  useEffect(() => {
    const objetivos = document.querySelectorAll<HTMLElement>("[data-revelar]");
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "true");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    objetivos.forEach((o) => obs.observe(o));
    return () => obs.disconnect();
  }, []);

  /* Sección activa: alimenta barra de progreso, riel, contador y notas. */
  useEffect(() => {
    const nodos = secciones
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);

    const obs = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = secciones.findIndex((s) => s.id === visible.target.id);
        if (i >= 0) setActiva(i);
      },
      { threshold: [0.3, 0.6] },
    );
    nodos.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const irA = useCallback((i: number) => {
    const destino = secciones[Math.max(0, Math.min(secciones.length - 1, i))];
    document.getElementById(destino.id)?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const enCampo =
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName);
      if (enCampo || e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          irA(activa + 1);
          break;
        case " ":
          if (overlay) return;
          e.preventDefault();
          irA(activa + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          irA(activa - 1);
          break;
        case "Home":
          e.preventDefault();
          irA(0);
          break;
        case "End":
          e.preventDefault();
          irA(secciones.length - 1);
          break;
        case "n":
        case "N":
          e.preventDefault();
          setOverlay((o) => (o === "notas" ? null : "notas"));
          break;
        case "Escape":
          e.preventDefault();
          setOverlay((o) => (o ? null : "indice"));
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activa, irA, overlay]);

  useEffect(() => {
    if (overlay) cerrarRef.current?.focus();
  }, [overlay]);

  /* El tema vive en la clase del <html>, no en estado de React: así no hay que
     sincronizar con lo que ya decidió el script previo al primer pintado.
     Qué icono se ve lo resuelve CSS con la variante dark. */
  function alternarTema() {
    const raiz = document.documentElement;
    const siguiente = !raiz.classList.contains("dark");
    raiz.classList.toggle("dark", siguiente);
    localStorage.setItem("ponencia-tema", siguiente ? "oscuro" : "claro");
  }

  const avance = ((activa + 1) / secciones.length) * 100;
  const seccionActiva = secciones[activa];

  return (
    <>
      <a
        href="#problema"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-indigo focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Saltar a la presentación
      </a>

      <div aria-hidden className="velo velo--arriba" />
      <div aria-hidden className="velo velo--abajo" />

      {/* Avance */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-rule/60">
        <div
          className="h-full bg-indigo transition-[width] duration-500 ease-out"
          style={{ width: `${avance}%` }}
        />
      </div>

      {/* Cabecera */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-4 pt-5 sm:px-6 lg:px-9">
        <a
          href="#portada"
          className="group flex items-center gap-2.5 rounded-lg py-1 pr-2"
        >
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-md bg-indigo text-[13px] font-bold text-paper"
          >
            G
          </span>
          <span className="display text-lg font-semibold">Gradus</span>
        </a>

        <div className="flex items-center gap-1.5">
          <BotonChrome
            onClick={() => setOverlay((o) => (o === "notas" ? null : "notas"))}
            activo={overlay === "notas"}
            etiqueta="Notas del guion (tecla N)"
          >
            <NotebookText size={17} strokeWidth={1.75} />
          </BotonChrome>
          <BotonChrome onClick={alternarTema} etiqueta="Alternar tema claro y oscuro">
            <Moon size={17} strokeWidth={1.75} className="dark:hidden" />
            <Sun size={17} strokeWidth={1.75} className="hidden dark:block" />
          </BotonChrome>
          <BotonChrome
            onClick={() => setOverlay((o) => (o === "indice" ? null : "indice"))}
            activo={overlay === "indice"}
            etiqueta="Índice de secciones (tecla Esc)"
          >
            <List size={17} strokeWidth={1.75} />
          </BotonChrome>
        </div>
      </header>

      {/* Riel lateral: sólo escritorio, decorativo, el índice es lo navegable */}
      <nav
        aria-label="Secciones"
        className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 flex-col gap-2.5 xl:flex"
      >
        {secciones.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-2.5"
            aria-current={i === activa ? "true" : undefined}
          >
            <span
              className={`h-px transition-all duration-300 ${
                i === activa
                  ? "w-6 bg-indigo"
                  : "w-3 bg-rule-strong group-hover:w-5 group-hover:bg-graphite"
              }`}
            />
            <span
              className={`mono text-[10px] tracking-wider whitespace-nowrap transition-opacity duration-300 ${
                i === activa
                  ? "text-indigo opacity-100"
                  : "text-graphite opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.rotulo}
            </span>
          </a>
        ))}
      </nav>

      {/* Navegación inferior */}
      <footer className="fixed inset-x-0 bottom-0 z-40 flex items-end justify-between gap-3 px-4 pb-5 sm:px-6 lg:px-9">
        <div className="hidden items-center gap-1.5 sm:flex">
          <BotonChrome
            onClick={() => irA(activa - 1)}
            deshabilitado={activa === 0}
            etiqueta="Sección anterior"
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </BotonChrome>
          <BotonChrome
            onClick={() => irA(activa + 1)}
            deshabilitado={activa === secciones.length - 1}
            etiqueta="Sección siguiente"
          >
            <ChevronRight size={18} strokeWidth={1.75} />
          </BotonChrome>
        </div>

        <p className="mono panel ml-auto px-3 py-1.5 text-[11px] tracking-widest tabular-nums">
          <span className="text-indigo">
            {String(activa + 1).padStart(2, "0")}
          </span>
          <span className="text-graphite"> / {secciones.length}</span>
        </p>
      </footer>

      {/* Superposiciones */}
      {overlay && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={overlay === "notas" ? "Notas del guion" : "Índice"}
        >
          <button
            className="absolute inset-0 cursor-default bg-ink/50 backdrop-blur-sm"
            onClick={() => setOverlay(null)}
            aria-label="Cerrar"
            tabIndex={-1}
          />
          <div className="panel desborde relative m-3 max-h-[80svh] w-full max-w-xl overflow-y-auto p-6 sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">
                  {overlay === "notas" ? "Notas del guion" : "Índice"}
                </p>
                <p className="display mt-1 text-2xl font-semibold">
                  {overlay === "notas" ? seccionActiva.rotulo : "Ir a una sección"}
                </p>
              </div>
              <button
                ref={cerrarRef}
                onClick={() => setOverlay(null)}
                className="rounded-lg border border-rule p-1.5 text-graphite transition-colors hover:bg-indigo-wash hover:text-indigo"
                aria-label="Cerrar"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            {overlay === "notas" ? (
              <>
                <p className="text-[17px] leading-relaxed text-balance">
                  {notas[seccionActiva.id]}
                </p>
                <p className="mt-6 border-t border-rule pt-4 text-[13px] text-graphite">
                  Al proyectar, esto se ve en pantalla. Para leerlo en privado,
                  abre la ponencia también en tu teléfono y pulsa{" "}
                  <kbd className="codigo">N</kbd> ahí.
                </p>
              </>
            ) : (
              <ol className="-mx-2">
                {secciones.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOverlay(null)}
                      className={`flex items-baseline gap-4 rounded-lg px-2 py-2.5 transition-colors hover:bg-indigo-wash ${
                        i === activa ? "text-indigo" : ""
                      }`}
                      aria-current={i === activa ? "true" : undefined}
                    >
                      <span className="mono w-6 shrink-0 text-[11px] text-graphite tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-medium">{s.rotulo}</span>
                      <span className="hidden text-[13px] text-graphite sm:block">
                        {s.titulo}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function BotonChrome({
  children,
  onClick,
  etiqueta,
  activo,
  deshabilitado,
}: {
  children: React.ReactNode;
  onClick: () => void;
  etiqueta: string;
  activo?: boolean;
  deshabilitado?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={deshabilitado}
      aria-label={etiqueta}
      title={etiqueta}
      className={`panel grid h-10 w-10 cursor-pointer place-items-center transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
        activo
          ? "border-indigo text-indigo"
          : "text-graphite hover:text-indigo enabled:hover:border-rule-strong"
      }`}
    >
      {children}
    </button>
  );
}
