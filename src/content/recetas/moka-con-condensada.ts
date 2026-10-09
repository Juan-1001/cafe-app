import type { Recipe } from "./types";

/**
 * Moka.
 *
 * El diseño decía «sin revolver. Se bebe por capas», y las descripciones del café
 * bombón, que es la bebida de referencia, dicen que las capas se miran y se remueven
 * antes de beber. Se reescribió así, aprobado el 2026-10-09. El nombre visible se queda
 * en «Moka», como en el diseño, aunque coincida con el del método.
 */
export const mokaConCondensada: Recipe = {
  slug: "moka-con-condensada",
  name: "Moka",
  tagline:
    "La leche condensada va en el fondo de la taza y el café encima. Se sirve sin revolver, para ver las capas, y se remueve antes de beberla.",
  temperature: "caliente",
  base: "Moka",
  method: "moka",
  family: "filtrado",
  time: "6 min",
  ingredients: [
    {
      amount: "30 ml",
      item: "de leche condensada"
    },
    {
      amount: "60 ml",
      item: "de café de una moka de 3 tazas"
    }
  ],
  steps: [
    "Pon la leche condensada en el fondo de una taza de vidrio, para que se vean las capas.",
    "Prepara el café en la moka como en su ficha.",
    "Viértelo despacio sobre el dorso de una cuchara apoyada en el vaso, para que quede encima de la condensada sin mezclarse.",
    "Sírvelo así, en capas, y remuévelo antes de beberlo."
  ],
  note: [
    "Las cantidades y el tiempo son de este sitio: nadie publica una receta medida de esta bebida, así que partimos de la ficha de la moka y el resto lo fijamos nosotros, con números redondos.",
    "Es pariente del café bombón, que se hace con espresso y que también se sirve en capas y se remueve antes de beber. Hacerlo con moka es adaptación nuestra, y la proporción, una parte de condensada por dos de café, también."
  ],
  image: {
    file: "/images/recetas/moka-con-condensada.png",
    alt: "Una copa de vidrio con pie y asa, con capas de leche y café y espuma arriba.",
    // PENDIENTE: recorte del diseño de Figma sobre una foto de Magnific o Pexels. El
    // enlace a la foto original lo pasa Juan; hasta entonces no se puede acreditar, y
    // esto no se publica así.
    credit: null,
  },
  sources: [
    {
      publisher: "Wikipedia",
      title: "«Café bombón» — espresso con leche condensada en capas, que se suelen remover antes de beber",
      url: "https://en.wikipedia.org/wiki/Caf%C3%A9_bomb%C3%B3n",
      retrieved: "2026-10-09"
    }
  ],
};
