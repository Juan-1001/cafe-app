import type { Recipe } from "./types";

/**
 * Affogato.
 */
export const affogato: Recipe = {
  slug: "affogato",
  name: "Affogato",
  tagline:
    "Una bola de helado de vainilla y un espresso hirviendo por encima. Se come con cuchara, no se bebe.",
  temperature: "fria",
  base: "Espresso",
  method: "espresso",
  family: "espresso",
  time: "2 min",
  ingredients: [
    {
      amount: "1 bola",
      item: "de helado de vainilla"
    },
    {
      amount: "1",
      item: "espresso (18 g de café → 36 g de bebida)"
    }
  ],
  steps: [
    "Pon la bola de helado en una taza pequeña o un vaso, que esté frío.",
    "Saca el espresso como en su ficha.",
    "Viértelo por encima recién hecho, en cuanto sale.",
    "Cómelo con cuchara."
  ],
  note: [
    "Las cantidades y el tiempo son de este sitio: nadie publica una receta medida de affogato, así que partimos de la ficha del espresso y el resto lo fijamos nosotros, con números redondos."
  ],
  image: {
    file: "/images/recetas/affogato.png",
    alt: "Un vaso bajo de vidrio sobre un plato gris, con una bola de helado de vainilla bañada en café que se escurre por los lados y se junta en el fondo.",
    // PENDIENTE: recorte del diseño de Figma sobre una foto de Magnific o Pexels. El
    // enlace a la foto original lo pasa Juan; hasta entonces no se puede acreditar, y
    // esto no se publica así.
    credit: null,
  },
  sources: [],
};
