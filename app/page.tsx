import { Chrome } from "@/components/chrome";
import { Decision, Portada, Problema } from "@/components/secciones/apertura";
import { Algoritmo, Ecosistema, Estados } from "@/components/secciones/sistema";
import { Demo } from "@/components/secciones/demo";
import { Cierre, Construccion, EstadoReal } from "@/components/secciones/cierre";

export default function Ponencia() {
  return (
    <>
      <Chrome />
      <main className="deck">
        <Portada />
        <Problema />
        <Decision />
        <Ecosistema />
        <Algoritmo />
        <Estados />
        <Demo />
        <Construccion />
        <EstadoReal />
        <Cierre />
      </main>
    </>
  );
}
