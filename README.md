# ponencia

Sitio de la ponencia sobre Gradus para el encuentro de investigación del
Semillero Kepler-90. Sustituye a la presentación en diapositivas: se maneja como
un deck al proyectar y se lee como una página al abrirlo en el teléfono.

> Puerto `3006` (los otros cuatro servicios usan 3003–3005 y 5002).

```bash
pnpm install
pnpm dev          # http://localhost:3006
pnpm typecheck    # tsc --noEmit
pnpm lint
pnpm build
```

## Cómo se maneja

| Tecla | Acción |
| --- | --- |
| `→` · `espacio` · `AvPág` | Sección siguiente |
| `←` · `RePág` | Sección anterior |
| `Inicio` · `Fin` | Primera / última sección |
| `Esc` | Índice de secciones |

En escritorio las secciones ocupan el viewport y se ajustan con `scroll-snap`.
En móvil el snap se desactiva y el scroll es continuo. Cada sección tiene su
propio `#hash`, así que se puede enlazar a una en concreto.

## Guion del presentador

Vive fuera del sitio, en `docs/guion-presentador.md` — esa carpeta está en
`.gitignore` a propósito: el sitio es público y cualquiera con la URL puede
abrir el código fuente, así que el guion nunca se envía al navegador. Cópiala
a mano en cada máquina donde vayas a presentar.

## Contenido

Todo el texto con datos vive en `content/ponencia.ts`, verificado contra el
repositorio (código, seeds, docs e historial de git). `content/secciones.ts`
define el orden. Los componentes no llevan datos dentro.

## Estado en vivo

`app/api/estado/route.ts` sondea los cuatro servicios desplegados en Railway
desde el servidor —no desde el navegador, porque la política CORS de
`gradus-api` no incluye el origen de la ponencia—. Si un servicio está frío o no
responde en 3 s se muestra «en reposo» en gris; nunca un estado de alarma.

## Capturas de respaldo

Por si la demo en vivo falla, la sección de demo esconde capturas reales del
entorno desplegado detrás de un botón. Para regenerarlas:

```bash
pnpm capturas     # loguea en Railway con los usuarios sembrados y guarda en public/capturas
```

Los archivos que espera están declarados en `content/capturas.ts`; el propio
script falla si falta alguno.

## QR

```bash
pnpm qr                                   # QR de las 4 apps + el repositorio
PONENCIA_URL=https://… pnpm qr            # añade el QR de esta misma página
```

Genera `content/qr.ts` (sólo el trazo del código, no un `.svg`) para poder
dibujarlo inline con `currentColor` y que siga el tema claro/oscuro.
