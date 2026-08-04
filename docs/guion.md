# Guión exposición GRADUS

Imaginen por un momento el proceso actual de homologación entre carreras: es un trámite completamente manual y engorroso.

Por un lado, tenemos al estudiante, que debe desplazarse físicamente hasta la oficina del coordinador solo para solicitarlo. A partir de ahí, queda en la total incertidumbre, teniendo que presentarse en la oficina o enviar correos constantemente solo para saber el estado de su solicitud.

Pero por otro lado, la carga para los coordinadores es aún mayor. Para dar respuesta, deben cruzar la información de manera manual: ingresar a la base de datos, buscar los códigos de las materias, verificar las notas y confirmar si los créditos son los exactos para la homologación. Finalmente, deben diligenciar los formatos a mano. >
Este es un proceso dispendioso que crece exponencialmente; mientras más estudiantes piden homologación, más tiempo valioso se pierde... tiempo que debería dedicarse a verdaderas gestiones administrativas y académicas.

Para solucionar este problema y modernizar el proceso sin dejarnos bloquear por trámites administrativos, no construimos simplemente una página web, sino un ecosistema completo de tres piezas.

Primero, implementamos un inicio de sesión centralizado. En esta etapa de desarrollo utilizamos un sistema propio, pero su arquitectura está diseñada para ser reemplazada en el futuro por el SSO de Microsoft que ya utiliza el Politécnico.

Segundo, desarrollamos el portal de notas. Para asegurar que la futura migración sea orgánica y sin fricciones, construimos este portal basándonos estrictamente en la documentación oficial de Universitas XXI.

Y tercero, el corazón de nuestro proyecto: Gradus, el gestor de homologaciones.

Diseñar la arquitectura de esta manera nos dio control total. Nos permitió desarrollar, hacer pruebas y validar el sistema hoy mismo, de forma independiente, mientras avanzan las solicitudes formales para conectarnos a las aplicaciones reales de la institución.

Con esta arquitectura clara, ahora les mostraré el resultado de este proceso funcionando en nuestro entorno de desarrollo en vivo.

Espacio para mostrar la demostración:
  - Identity y Universitas: El SSO y la fuente de verdad (1 minuto)
  - Gradus: La magia de la homologación - Vista del Estudiante (1.5 minutos)
  - Gradus: El control administrativo - Vista del Coordinador (2 minutos)


Como acabamos de ver, Gradus transforma por completo la experiencia académica. El beneficio institucional es directo: logramos un ahorro masivo de horas administrativas, trazabilidad total de las solicitudes y devolvemos la autonomía al estudiante.

Ahora bien, para poder construir un ecosistema de este calibre, como único desarrollador y cumpliendo los tiempos del semillero, apliqué una Metodología de Desarrollo Asistido por IA. Es fundamental aclarar que no utilicé la Inteligencia Artificial como un simple autocompletador de código, sino como un habilitador arquitectónico. >
Por ejemplo, utilicé modelos de lenguaje para analizar la documentación oficial de Universitas XXI y, mediante ingeniería inversa, generar el esquema de bases de datos de nuestro simulador. También me sirvió como una mesa de validación para discutir y estructurar la arquitectura de estas tres aplicaciones interconectadas.

Este rigor técnico nos prepara para el futuro. Nuestros siguientes pasos en el proyecto son reemplazar nuestro sistema de identidad actual por Microsoft Entra ID y realizar la integración real con la API de Universitas XXI , garantizando la seguridad de nuestro desarrollo mediante la Capa Anticorrupción (ACL) que ya diseñamos.

Muchas gracias por su atención.