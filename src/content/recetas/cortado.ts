import type { Recipe } from "./types";

/**
 * Cortado.
 */
export const cortado: Recipe = {
  slug: "cortado",
  name: "Cortado",
  tagline:
    "Un espresso cortado con muy poca leche caliente. La proporción es la receta entera.",
  temperature: "caliente",
  base: "Espresso",
  method: "espresso",
  family: "espresso",
  time: "3 min",
  ingredients: [
    {
      amount: "1",
      item: "espresso (18 g de café → 36 g de bebida)"
    },
    {
      amount: "30 ml",
      item: "de leche caliente"
    }
  ],
  steps: [
    "Calienta la leche.",
    "Saca el espresso en un vaso pequeño, como en su ficha.",
    "Añade la leche por encima."
  ],
  note: [
    "Las cantidades y el tiempo son de este sitio: nadie publica una receta medida de cortado, así que partimos de la ficha del espresso y el resto lo fijamos nosotros, con números redondos.",
    "Cortado es, según el Diccionario de la lengua española, «café con muy poca leche». Cuánta es muy poca no lo fija nadie: los 30 ml son nuestros."
  ],
  image: {
    file: "/images/recetas/cortado.png",
    alt: "Una taza de vidrio con asa, con leche abajo, café en medio y una capa de espuma arriba.",
    // PENDIENTE: recorte del diseño de Figma sobre una foto de Magnific o Pexels. El
    // enlace a la foto original lo pasa Juan; hasta entonces no se puede acreditar, y
    // esto no se publica así.
    credit: null,
  },
  sources: [
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «café», en «café cortado»: «café con muy poca leche»",
      url: "https://dle.rae.es/café",
      retrieved: "2026-10-09"
    }
  ],
};
