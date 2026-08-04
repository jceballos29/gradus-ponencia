/** Orden e identidad de las secciones. Lo consume el índice, el riel y las notas. */
export const secciones = [
  { id: "portada", titulo: "Gradus", rotulo: "Portada" },
  { id: "problema", titulo: "El proceso actual", rotulo: "El problema" },
  { id: "decision", titulo: "No quedar bloqueado", rotulo: "La decisión" },
  { id: "ecosistema", titulo: "Cuatro servicios", rotulo: "El ecosistema" },
  { id: "algoritmo", titulo: "Cómo se evalúa", rotulo: "El algoritmo" },
  { id: "estados", titulo: "El ciclo de una solicitud", rotulo: "Los estados" },
  { id: "demo", titulo: "Verlo funcionando", rotulo: "La demo" },
  { id: "construccion", titulo: "Cómo se construyó", rotulo: "El método" },
  { id: "estadoReal", titulo: "Dónde estamos", rotulo: "Estado real" },
  { id: "cierre", titulo: "Gracias", rotulo: "Cierre" },
] as const;

export type SeccionId = (typeof secciones)[number]["id"];
