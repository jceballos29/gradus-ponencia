/**
 * Datos de la ponencia. Todo lo que aparece aquí está verificado contra el
 * repositorio: código, migraciones, seeds, docs e historial de git.
 * Si un dato no se puede sustentar, no entra.
 */

export const identidad = {
  producto: "Gradus",
  descriptor: "Homologación académica, automatizada",
  autor: "Juan Antonio Ceballos Usuga",
  semillero: "Semillero de Investigación Kepler-90",
  escuela: "Facultad de Ingenierías",
  coordinador: "Luis Alberto García González",
  institucion: "Politécnico Internacional",
  repositorio: "github.com/jceballos29/Gradus",
  repositorioUrl: "https://github.com/jceballos29/Gradus",
} as const;

/* ── Sección 2 · El problema ─────────────────────────────────────────── */

export const problema = {
  entradilla:
    "Homologar asignaturas entre programas es hoy un trámite de papel. El costo no lo paga una sola persona: lo pagan las dos que están a lado y lado del escritorio.",
  origen: {
    rol: "El estudiante",
    resumen: "Entrega los papeles en persona y espera a ciegas.",
    dolores: [
      "Lleva los documentos en persona a la oficina del coordinador.",
      "No hay estado consultable: para saber en qué va, vuelve o escribe.",
      "Descubre qué se le homologa cuando el proceso ya terminó.",
    ],
  },
  destino: {
    rol: "El coordinador",
    resumen: "Cruza a mano dos pensums y transcribe el resultado.",
    dolores: [
      "Abre la base de datos y busca código por código las asignaturas.",
      "Verifica nota y créditos de cada una contra el plan destino.",
      "Diligencia el acta a mano, con formato institucional.",
    ],
  },
  cierre:
    "El costo crece con cada solicitud. No es un problema de esfuerzo: es un problema de proceso.",
  fuente: "docs/fundacion/brief.md",
} as const;

/* ── Sección 3 · La decisión de arquitectura ─────────────────────────── */

export const decision = {
  bloqueo: [
    {
      titulo: "Credenciales de Universitas XXI",
      detalle:
        "OAuth client_id/secret y cinco roles de servicio, pendientes de un tercero.",
    },
    {
      titulo: "Registros de aplicación en Azure AD",
      detalle:
        "El tenant y las app registrations dependen del área de TI de la institución.",
    },
    {
      titulo: "Tabla de mapeo de códigos PI ↔ UXXI",
      detalle: "Aún no existe un documento oficial que traduzca los programas.",
    },
  ],
  jugada: {
    titulo: "Capa anticorrupción (ACL)",
    cuerpo:
      "El dominio nunca habla con UXXI. Habla con IUniversitasClient, una interfaz que vive en Gradus.Domain y no sabe que UXXI existe. Detrás hay un único implementador, UxxiClient, y un flag de configuración que decide contra qué se conecta.",
    contrato: "Gradus.Domain/Interfaces/IUniversitasClient.cs",
    implementador:
      "Gradus.Infrastructure/ExternalServices/Uxxi/UxxiClient.cs · 17 archivos · 1 695 líneas",
    flag: 'Uxxi:Mode = "simulator" | "real"',
    consecuencia:
      "Pasar del simulador a la API real no toca una línea de código: cambia la configuración.",
  },
  costuras: [
    {
      nombre: "IUxxiGradeNormalizer",
      que: "Reescala la nota si UXXI no usa 0–5.",
    },
    {
      nombre: "IUxxiAreaMapper",
      que: "Traduce la tipología de asignatura a BASIC / SPECIFIC / COMPLEMENTARY.",
    },
    {
      nombre: "IUxxiStatusMapper",
      que: "Decide qué cuenta como aprobada, en curso o retirada.",
    },
    {
      nombre: "IProgramCodeMapper",
      que: "Traduce los códigos de programa del Politécnico a los de UXXI.",
    },
  ],
  cita:
    "No hay que rehacer la aplicación, sino reemplazar una capa específica de conexión.",
  citaFuente: "docs/integracion-uxxi/informe-gradus-estado.md",
} as const;

/* ── Sección 4 · El ecosistema ───────────────────────────────────────── */

export type Servicio = {
  clave: "identity" | "universitas" | "gradus" | "gradus-api";
  nombre: string;
  rol: string;
  puerto: number;
  url: string;
  stack: string[];
  hechos: string[];
};

export const servicios: Servicio[] = [
  {
    clave: "identity",
    nombre: "identity",
    rol: "Proveedor OIDC de desarrollo",
    puerto: 3005,
    url: "https://identity-development.up.railway.app",
    stack: ["Next.js 16", "Prisma 7", "PostgreSQL", "jose"],
    hechos: [
      "Authorization Code + PKCE S256, firma RS256 con JWKS publicado.",
      "Refresh con rotación: el token viejo queda revocado al emitir el nuevo.",
      "Emite los mismos tokens que Azure AD, para que migrar sea configuración.",
    ],
  },
  {
    clave: "universitas",
    nombre: "universitas",
    rol: "Portal académico y simulador de UXXI",
    puerto: 3003,
    url: "https://universitas-development.up.railway.app",
    stack: ["Next.js 16", "Prisma 7", "PostgreSQL"],
    hechos: [
      "10 modelos de datos: institución → facultad → programa → pensum → asignatura.",
      "10 rutas espejo de UXXI construidas desde su especificación OpenAPI.",
      "Es la fuente de verdad del historial académico que consume Gradus.",
    ],
  },
  {
    clave: "gradus",
    nombre: "gradus",
    rol: "Frontend de estudiante y coordinador",
    puerto: 3004,
    url: "https://gradus-development.up.railway.app",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "SignalR"],
    hechos: [
      "Cliente de API tipado con 31 métodos y timeout propio de 10 s.",
      "Notificaciones en vivo por WebSocket con reconexión automática.",
      "El coordinador envía sólo las diferencias contra la evaluación automática.",
    ],
  },
  {
    clave: "gradus-api",
    nombre: "gradus-api",
    rol: "Núcleo de homologación",
    puerto: 5002,
    url: "https://gradus-api-development.up.railway.app",
    stack: [".NET 10", "Clean Architecture", "MediatR", "EF Core 10", "QuestPDF"],
    hechos: [
      "4 capas, dependencias hacia adentro: Domain no referencia ningún paquete.",
      "25 mensajes CQRS (14 comandos, 11 consultas) y 27 endpoints REST.",
      "Advertencias tratadas como errores en los 4 proyectos de producción.",
    ],
  },
];

/* ── Sección 5 · El algoritmo de evaluación ──────────────────────────── */

export const algoritmo = {
  archivo:
    "Gradus.Application/Commands/PreviewHomologation/PreviewHomologationHandler.cs",
  lineas: 426,
  ejemplo: {
    estudiante: "juan.ceballos@poli.dev",
    origen: {
      programa: "Tecnología en Desarrollo de Software y Aplicativos Móviles",
      codigo: "351C",
      pensum: "35-1",
    },
    destino: {
      programa: "Tecnología en Desarrollo de Software y Aplicativos Móviles",
      codigo: "372V",
      pensum: "37-1",
    },
    notaMinima: 3.0,
    topePorcentaje: 70,
    equivalencias: 28,
    mismaArea: true,
  },
  pasos: [
    {
      n: 1,
      titulo: "Traer el historial",
      cuerpo:
        "El handler pide perfil e historial a IUniversitasClient. No sabe si responde el simulador o UXXI.",
    },
    {
      n: 2,
      titulo: "Quedarse con el mejor intento",
      cuerpo:
        "Agrupa por código de asignatura y conserva uno solo: primero por estado (aprobada gana), luego por nota más alta.",
    },
    {
      n: 3,
      titulo: "Evaluar sólo lo aprobado",
      cuerpo:
        "Las asignaturas en curso o perdidas no entran a la evaluación. No se rechazan: no aplican.",
    },
    {
      n: 4,
      titulo: "Tres compuertas en cadena",
      cuerpo:
        "Cada asignatura pasa por equivalencia, nota mínima y área. La primera que falla decide el motivo del rechazo.",
    },
    {
      n: 5,
      titulo: "Tope de créditos",
      cuerpo:
        "Si lo homologable excede el porcentaje máximo de la regla, se ordena por nota descendente y se acepta mientras quepa.",
    },
  ],
  compuertas: [
    {
      n: 1,
      nombre: "¿Existe equivalencia?",
      detalle:
        "Búsqueda por código de origen, sin distinguir mayúsculas. Si el coordinador no la definió, no hay nada que homologar.",
      motivo: "NoEquivalenceDefined",
    },
    {
      n: 2,
      nombre: "¿Alcanza la nota mínima?",
      detalle:
        "La nota mínima de la equivalencia gana sobre la de la regla. Permite excepciones por asignatura sin tocar la regla completa.",
      motivo: "GradeTooLow",
    },
    {
      n: 3,
      nombre: "¿Coincide el área de formación?",
      detalle:
        "Sólo se aplica si la regla lo exige y el área destino está registrada. Es deliberadamente permisivo con datos heredados.",
      motivo: "DifferentArea",
    },
  ],
  motivos: [
    { codigo: "NoEquivalenceDefined", texto: "No hay equivalencia definida" },
    { codigo: "GradeTooLow", texto: "La nota no alcanza el mínimo" },
    { codigo: "DifferentArea", texto: "El área de formación no coincide" },
    {
      codigo: "ExceedsMaxCreditsPercentage",
      texto: "Supera el tope de créditos homologables",
    },
    { codigo: "CoordinatorOverride", texto: "Excluida por el coordinador" },
  ],
  tope:
    "maxCreditos = floor(porcentajeMáximo / 100 × créditos totales del plan destino)",
} as const;

/** Historial real sembrado para juan.ceballos@poli.dev, evaluado contra 372V. */
export type Fila = {
  codigo: string;
  nombre: string;
  creditos: number;
  nota: number | null;
  estado: "PASSED" | "FAILED" | "IN_PROGRESS";
  destino?: { codigo: string; nombre: string };
  veredicto: "homologa" | "rechaza" | "no-evalua";
  motivo?: string;
  nota_al_pie?: string;
};

export const historial: Fila[] = [
  {
    codigo: "1306",
    nombre: "Competencias Comunicativas",
    creditos: 1,
    nota: 4.03,
    estado: "PASSED",
    destino: { codigo: "1426", nombre: "Competencias Comunicativas" },
    veredicto: "homologa",
  },
  {
    codigo: "0940",
    nombre: "Matemática Básica",
    creditos: 2,
    nota: 3.55,
    estado: "PASSED",
    destino: { codigo: "1427", nombre: "Matemática Básica" },
    veredicto: "homologa",
  },
  {
    codigo: "0547",
    nombre: "Programación Web",
    creditos: 3,
    nota: 4.55,
    estado: "PASSED",
    destino: { codigo: "1507", nombre: "Programación Web" },
    veredicto: "homologa",
  },
  {
    codigo: "0546",
    nombre: "Diseño de Algoritmos",
    creditos: 2,
    nota: 3.8,
    estado: "PASSED",
    destino: { codigo: "1508", nombre: "Diseño de Algoritmos" },
    veredicto: "homologa",
  },
  {
    codigo: "0560",
    nombre: "Bases de Datos I",
    creditos: 2,
    nota: 4.58,
    estado: "PASSED",
    destino: { codigo: "1512", nombre: "Bases de Datos I" },
    veredicto: "homologa",
  },
  {
    codigo: "0552",
    nombre: "Álgebra Lineal",
    creditos: 2,
    nota: 3.18,
    estado: "PASSED",
    destino: { codigo: "1510", nombre: "Álgebra Lineal" },
    veredicto: "homologa",
    nota_al_pie: "Pasa por poco: la compuerta de nota exige 3.0.",
  },
  {
    codigo: "0793",
    nombre: "Inglés III",
    creditos: 2,
    nota: 2.61,
    estado: "FAILED",
    veredicto: "no-evalua",
    nota_al_pie: "Primer intento, perdido en 2022-3T. Se descarta.",
  },
  {
    codigo: "0793",
    nombre: "Inglés III",
    creditos: 2,
    nota: 3.86,
    estado: "PASSED",
    destino: { codigo: "1461", nombre: "Inglés III" },
    veredicto: "homologa",
    nota_al_pie:
      "Segundo intento. Sin deduplicar, la nota que llegaría a la compuerta sería 2.61 y la asignatura se caería.",
  },
  {
    codigo: "1338",
    nombre: "Aplicaciones I",
    creditos: 4,
    nota: null,
    estado: "IN_PROGRESS",
    veredicto: "no-evalua",
    nota_al_pie: "En curso: todavía no hay nota que evaluar.",
  },
];

/* ── Sección 6 · La máquina de estados ───────────────────────────────── */

export type Estado = {
  clave: string;
  etiqueta: string;
  tono: "neutro" | "espera" | "activo" | "exito" | "falla";
  nota: string;
};

export const estados: Estado[] = [
  {
    clave: "Draft",
    etiqueta: "Borrador",
    tono: "neutro",
    nota: "La vista previa ya está calculada y guardada. El estudiante puede retomarla después.",
  },
  {
    clave: "Pending",
    etiqueta: "Pendiente",
    tono: "espera",
    nota: "Enviada. No se puede enviar una solicitud sin asignaturas evaluadas.",
  },
  {
    clave: "Reviewing",
    etiqueta: "En revisión",
    tono: "activo",
    nota: "El coordinador la abrió. La transición es automática al primer contacto.",
  },
  {
    clave: "Approved",
    etiqueta: "Aprobada",
    tono: "exito",
    nota: "Decisión tomada. Se recalculan las métricas y se reserva el número de acta.",
  },
  {
    clave: "Rejected",
    etiqueta: "Rechazada",
    tono: "falla",
    nota: "Con observaciones del coordinador. Estado terminal.",
  },
  {
    clave: "DocumentReady",
    etiqueta: "Acta lista",
    tono: "exito",
    nota: "El PDF existe y está descargable. Si falla su generación, la aprobación no se pierde.",
  },
  {
    clave: "Cancelled",
    etiqueta: "Cancelada",
    tono: "neutro",
    nota: "Sólo desde borrador o pendiente. Después ya no le pertenece al estudiante.",
  },
];

export const acta = {
  motor: "QuestPDF 2026.2.4",
  formato: "PI-GA-FT-050 · versión 03",
  detalle:
    "El acta se arma en código, no con una plantilla HTML ni un navegador headless. Carta, márgenes de 2 cm, logo institucional embebido.",
  numeracion:
    "El número de acta se asigna una sola vez y es idempotente: regenerar el PDF no lo cambia.",
  almacenamiento:
    "Bucket S3 en Railway. Antes vivía en disco efímero y se perdía en cada despliegue.",
  invariante:
    "Las transiciones se validan dentro de la entidad, no en el handler. Un estado imposible lanza excepción antes de tocar la base de datos.",
} as const;

/* ── Sección 7 · La demo ─────────────────────────────────────────────── */

export const demo = {
  nota: "Entorno de desarrollo real desplegado en Railway. Primer acceso: 5 a 15 segundos mientras el servicio despierta.",
  enlaces: [
    {
      clave: "gradus",
      titulo: "Gradus",
      descripcion: "El producto: estudiante y coordinador",
      url: "https://gradus-development.up.railway.app",
    },
    {
      clave: "universitas",
      titulo: "Universitas",
      descripcion: "Portal académico y fuente del historial",
      url: "https://universitas-development.up.railway.app",
    },
    {
      clave: "identity",
      titulo: "Identity",
      descripcion: "Inicio de sesión único",
      url: "https://identity-development.up.railway.app",
    },
    {
      clave: "swagger",
      titulo: "API",
      descripcion: "Swagger de gradus-api",
      url: "https://gradus-api-development.up.railway.app/swagger",
    },
  ],
  usuarios: [
    { correo: "juan.ceballos@poli.dev", rol: "Estudiante" },
    { correo: "laura.mendoza@poli.dev", rol: "Coordinadora" },
  ],
  clave: "Gradus123*",
  recorrido: [
    { minutos: "1:00", paso: "Identity y Universitas: un inicio de sesión, dos aplicaciones." },
    { minutos: "1:30", paso: "Estudiante: elegir programa, ver la vista previa, enviar." },
    { minutos: "2:00", paso: "Coordinador: revisar la matriz, forzar una excepción, aprobar, descargar el acta." },
  ],
} as const;

/* ── Sección 8 · Cómo se construyó ───────────────────────────────────── */

export const construccion = {
  cifras: [
    { valor: "183", etiqueta: "commits", pie: "29 abr → 2 jul de 2026" },
    { valor: "1", etiqueta: "desarrollador", pie: "3 horas al día" },
    { valor: "33/33", etiqueta: "jornadas del núcleo", pie: "workstreams WS1–WS4" },
    { valor: "169", etiqueta: "pruebas automatizadas", pie: "128 en .NET · 41 en gradus" },
  ],
  metodologia: {
    titulo: "Desarrollo asistido por IA",
    tesis:
      "No como autocompletador de código, sino como habilitador arquitectónico.",
    usos: [
      {
        titulo: "Ingeniería inversa de la especificación",
        cuerpo:
          "Catorce especificaciones OpenAPI de UXXI, más de 40 000 líneas de YAML, convertidas en el esquema de datos del simulador.",
      },
      {
        titulo: "Mesa de validación arquitectónica",
        cuerpo:
          "Discutir el ACL, las costuras configurables y el modelo de ámbitos antes de escribirlos.",
      },
      {
        titulo: "Auditoría adversarial",
        cuerpo:
          "Cuatro agentes independientes, uno por aplicación, verificando cada hallazgo contra el código antes de reportarlo.",
      },
    ],
  },
  auditoria: {
    fecha: "1 de julio de 2026",
    total: "6.8 / 10",
    hallazgos: 20,
    desglose: [
      { nivel: "Crítico", n: 1 },
      { nivel: "Alto", n: 2 },
      { nivel: "Medio", n: 7 },
      { nivel: "Bajo", n: 8 },
      { nivel: "Mejora", n: 2 },
    ],
    critico: {
      titulo: "Autorización rota entre programas",
      cuerpo:
        "9 de 12 handlers de reglas y homologaciones no aplicaban el resolutor de ámbitos. Un coordinador autenticado podía leer y modificar solicitudes de programas que no le correspondían.",
      cierre: "Remediado en la rama de trabajo del 1 y 2 de julio.",
    },
    leccion:
      "La auditoría no fue una formalidad al final. Encontró un fallo de seguridad real que la suite de pruebas no cubría, porque probaba que la función hiciera su trabajo, no que se negara a hacerlo.",
  },
  plan: {
    titulo: "El plan también se homologa",
    cuerpo:
      "El plan de abril tenía siete fases en cascada y 192 tareas. Quince quedaron marcadas. En junio lo reemplazó un modelo de workstreams medidos en jornadas de desarrollo, con bitácora fechada. Ese sí se completó: 33 de 33.",
  },
} as const;

/* ── Sección 9 · Estado real ─────────────────────────────────────────── */

export const estado = {
  hecho: [
    "Capa anticorrupción de UXXI, con reintentos, tiempo límite y token cacheado.",
    "Evaluación automática, excepciones manuales del coordinador y trazabilidad completa.",
    "Acta en PDF con el formato institucional, almacenada de forma persistente.",
    "Inicio de sesión único propio, intercambiable por Entra ID sin tocar código.",
    "Ámbito por coordinador: sin ámbitos ve todo, con ámbitos ve lo suyo.",
    "Las cuatro aplicaciones desplegadas y funcionando en un entorno de verificación.",
  ],
  pendiente: [
    {
      titulo: "Credenciales OAuth de Universitas XXI",
      quien: "Servicios Gestionados UXXI",
      detalle: "client_id, client_secret y cinco roles de servicio.",
    },
    {
      titulo: "Tabla de mapeo de códigos PI ↔ UXXI",
      quien: "Área de TI de la institución",
      detalle: "Junto con la escala de notas y la taxonomía oficial de áreas.",
    },
    {
      titulo: "Decisión estratégica sobre reconocimiento de créditos",
      quien: "Institución",
      detalle:
        "UXXI ya tiene su propio módulo. Falta decidir si Gradus lee, escribe o ambas.",
    },
    {
      titulo: "Migración a Microsoft Entra ID",
      quien: "Equipo de desarrollo, cuando exista el tenant",
      detalle: "Es configuración: authority, audiencia y emisor.",
    },
    {
      titulo: "Aplicación móvil",
      quien: "Equipo de desarrollo",
      detalle: "Workstream 5, estimado en 15–20 jornadas. No iniciado.",
    },
  ],
  privacidad: {
    titulo: "Un hallazgo que no es técnico",
    cuerpo:
      "El entorno de pruebas de UXXI contiene datos reales clonados de producción. Conectarnos implica tratar datos personales de estudiantes bajo la Ley 1581. Antes de pedir las credenciales hay que pedir anonimización o un acuerdo de tratamiento.",
  },
} as const;

/* El guion del presentador vive en docs/guion-presentador.md (gitignored),
   no aquí: este archivo se envía al navegador de cualquier visitante. */
