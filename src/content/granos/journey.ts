/**
 * Las etapas del recorrido que hace el café mientras sigue siendo grano. Son el
 * esqueleto de la sección: el índice se lee de arriba abajo como ese viaje, y cada
 * artículo declara en qué etapa ocurre lo que cuenta.
 *
 * Esa frontera estuvo antes en otro sitio. Decía «antes de llegar a tu molino», y se
 * movió al escribir el artículo de la molienda por dos razones. La primera es que la
 * molienda es una fase que cuatro fichas de método dan por sabida —los finos que
 * taponan, el molino de cuchillas— y que el sitio no contaba en ninguna parte. La
 * segunda es que aquella línea dejaba sin dueño el café premolido: si moler es «cosa
 * tuya», quien muele el premolido es el tostador y ese caso quedaba fuera del mapa.
 * La línea nueva, en una frase: /granos es todo lo que se le hace al grano, y /metodos
 * empieza cuando el agua lo toca.
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
  /*
   * La cuarta es la única que no se llama «En + un lugar», y la excepción está pensada.
   * Las tres primeras son sitios donde alguien trabaja el café: la planta, la finca, el
   * tostador. Aquí no hay un «alguien» fijo —puede molerlo el tostador si compras
   * premolido, puedes ser tú, o puede no molerlo nadie mientras la bolsa espera—, así
   * que la etapa se nombra por la condición del grano y no por el lugar.
   *
   * Y no se llama «En el molino», que era la primera idea, porque la etapa no es solo la
   * molienda: la frescura y el almacenamiento pasan en la bolsa y también caben aquí. Un
   * rótulo con el nombre de uno de los tres inquilinos afirmaría algo que los otros dos
   * no cumplen.
   */
  {
    key: "grano",
    number: "04",
    title: "Mientras sigue siendo grano",
    note: "Lo que le pasa al café desde que sale del tostador hasta que deja de ser grano: la espera en la bolsa, la frescura y la molienda.",
  },
] as const;

/** La etapa del recorrido en la que ocurre lo que cuenta un artículo. */
export type JourneyStage = (typeof JOURNEY_STAGES)[number]["key"];

export type JourneyStageInfo = (typeof JOURNEY_STAGES)[number];
