/**
 * Las etapas del recorrido que hace el café antes de llegar a tu molino. Son el
 * esqueleto de la sección: el índice se lee de arriba abajo como ese viaje, y cada
 * artículo declara en qué etapa ocurre lo que cuenta.
 *
 * Se ordena así, y no por el nivel de los artículos, por dos razones. La primera es
 * que el recorrido deja ver los huecos: si una etapa no tiene artículos, se nota
 * que falta contarla, mientras que una lista solo crece. La segunda es que /metodos
 * ya agrupa en capítulos numerados —allí, por cuánto castiga el error—; repetir aquí
 * el mismo recurso haría que las dos secciones se leyeran como la misma plantilla
 * rellenada dos veces.
 *
 * El número va escrito a mano en lugar de salir de la posición porque tiene que ser
 * estable: si algún día no hubiera ningún artículo de finca, el tostador sigue siendo
 * la etapa 03 y no se convierte en la 02.
 */
export const JOURNEY_STAGES = [
  {
    key: "planta",
    number: "01",
    title: "En la planta",
    note: "Qué es lo que se está cultivando: la especie, la variedad y por qué la misma semilla no da lo mismo en dos laderas distintas.",
  },
  {
    key: "finca",
    number: "02",
    title: "En la finca",
    note: "Lo que le pasa al grano entre que se recoge maduro y se mete en un saco. Aquí se decide buena parte de a qué va a saber.",
  },
  {
    key: "tostador",
    number: "03",
    title: "En el tostador",
    note: "El único paso donde el calor transforma el grano de verde a marrón. Es la parte del proceso que se suele resumir mal.",
  },
] as const;

/** La etapa del recorrido en la que ocurre lo que cuenta un artículo. */
export type JourneyStage = (typeof JOURNEY_STAGES)[number]["key"];

export type JourneyStageInfo = (typeof JOURNEY_STAGES)[number];
