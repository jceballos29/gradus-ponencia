import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gradus — Homologación académica, automatizada",
  description:
    "Cómo se construyó Gradus: un ecosistema de cuatro servicios para automatizar la homologación de asignaturas en el Politécnico Internacional. Ponencia del Semillero Kepler-90.",
  authors: [{ name: "Juan Antonio Ceballos Usuga" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

// El tema se resuelve antes de pintar para que no haya destello blanco
// al abrir la presentación en una sala a oscuras.
const temaInicial = `(function(){try{var t=localStorage.getItem("ponencia-tema");if(t==="oscuro"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
