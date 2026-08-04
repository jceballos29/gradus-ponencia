import { test, expect, type Page } from "@playwright/test";
import { capturas } from "../content/capturas";

/**
 * Capturas de respaldo para la sección "demo" de la ponencia.
 *
 * Corre contra el entorno desplegado en Railway, con los usuarios sembrados
 * (los mismos que documenta docs/MANUAL-PRUEBAS-DEV.md). Son datos ficticios de
 * un entorno de desarrollo, no hay dato personal real en las imágenes.
 *
 *   pnpm capturas
 *
 * Si el entorno está dormido, el primer login tarda; por eso los timeouts
 * generosos de scripts/playwright.config.ts.
 */

const GRADUS = "https://gradus-development.up.railway.app";
const UNIVERSITAS = "https://universitas-development.up.railway.app";
const IDENTITY = "https://identity-development.up.railway.app";

const CLAVE = "Gradus123*";
const ESTUDIANTE = "juan.ceballos@poli.dev";
const COORDINADORA = "laura.mendoza@poli.dev";

const destino = "public/capturas";

/** Los nombres de archivo son los que consume content/capturas.ts. */
const archivo = (clave: (typeof capturas)[number]["archivo"]) =>
  `${destino}/${clave}`;

async function entrar(page: Page, base: string, correo: string) {
  await page.goto(`${base}/api/auth/login`);
  await page.getByLabel("Correo", { exact: false }).fill(correo);
  await page.getByLabel("Contraseña", { exact: false }).fill(CLAVE);
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL(/\/(student|coordinator|admin)/, { timeout: 60_000 });
}

/** Espera a que no queden esqueletos ni spinners antes de disparar. */
async function asentar(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600);
}

test("identity — pantalla de login", async ({ page }) => {
  await page.goto(`${IDENTITY}/login`);
  await asentar(page);
  await page.screenshot({ path: archivo("identity-login.png") });
});

test("estudiante — solicitudes y nueva solicitud", async ({ page }) => {
  await entrar(page, GRADUS, ESTUDIANTE);
  await asentar(page);
  await page.screenshot({ path: archivo("estudiante-solicitudes.png") });

  await page.goto(`${GRADUS}/student/new`);
  await asentar(page);
  await page.screenshot({ path: archivo("estudiante-nueva.png") });
});

test("coordinador — pendientes y reglas", async ({ page }) => {
  await entrar(page, GRADUS, COORDINADORA);
  await asentar(page);
  await page.screenshot({ path: archivo("coordinador-pendientes.png") });

  await page.goto(`${GRADUS}/coordinator/rules`);
  await asentar(page);
  await page.screenshot({ path: archivo("coordinador-reglas.png") });
});

test("universitas — historial académico", async ({ page }) => {
  await entrar(page, UNIVERSITAS, ESTUDIANTE);
  await asentar(page);
  await page.screenshot({ path: archivo("universitas-historial.png") });
});

test("todas las capturas declaradas existen", async () => {
  const { existsSync } = await import("node:fs");
  const faltantes = capturas
    .map((c) => c.archivo)
    .filter((a) => !existsSync(`${destino}/${a}`));
  expect(faltantes, "capturas que content/capturas.ts declara pero no existen")
    .toEqual([]);
});
