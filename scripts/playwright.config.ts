import { defineConfig } from "@playwright/test";

/**
 * Config exclusiva del script de capturas de respaldo. No hay tests en esta app:
 * lo único que corre aquí es `capturas.spec.ts`, contra el entorno desplegado.
 */
export default defineConfig({
  testDir: ".",
  timeout: 120_000,
  workers: 1,
  reporter: "list",
  use: {
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    locale: "es-CO",
    // El entorno de Railway duerme: el primer acceso puede tardar 15 s.
    navigationTimeout: 60_000,
    actionTimeout: 30_000,
  },
});
