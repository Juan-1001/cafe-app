import type { Recipe } from "./types";

/**
 * Perico.
 *
 * El texto del diseño seguía con «Mitad y mitad, en vaso de vidrio» y se quitó al
 * verificarlo: ninguna fuente dice mitad y mitad —el DLE llama al perico «cortado», con
 * muy poca leche, y el Diccionario de americanismos «café con leche pequeño», sin
 * proporción— y la prensa que lo describe habla de taza, no de vaso (Publimetro,
 * 2026-10-01). Aprobado el 2026-10-09.
 */
export const perico: Recipe = {
  slug: "perico",
  name: "Perico",
  tagline:
    "El café con leche pequeño que se pide en cualquier esquina de Bogotá, sin nombre italiano.",
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
      amount: "90 ml",
      item: "de leche caliente"
    }
  ],
  steps: [
    "Calienta la leche.",
    "Saca el espresso en una taza pequeña, como en su ficha.",
    "Añade la leche."
  ],
  note: [
    "Las cantidades y el tiempo son de este sitio: nadie publica una receta medida de perico, así que partimos de la ficha del espresso y el resto lo fijamos nosotros, con números redondos.",
    "Perico es, en el centro de Colombia, un «café con leche pequeño», según el Diccionario de americanismos, y en Bogotá se toma en taza. El Diccionario de la lengua española, en cambio, lo da como sinónimo de cortado, con muy poca leche. Los dos diccionarios no coinciden; aquí lo separamos del cortado por la cantidad de leche, y esa separación es nuestra."
  ],
  image: {
    file: "/images/recetas/perico.png",
    alt: "Un pocillo de peltre blanco con el borde y el asa negros, lleno de café con leche.",
    // PENDIENTE: recorte del diseño de Figma sobre una foto de Magnific o Pexels. El
    // enlace a la foto original lo pasa Juan; hasta entonces no se puede acreditar, y
    // esto no se publica así.
    credit: null,
  },
  sources: [
    {
      publisher: "Asociación de Academias de la Lengua Española",
      title: "Diccionario de americanismos, «perico»: «café con leche pequeño», en el centro de Colombia",
      url: "https://www.asale.org/damer/perico",
      retrieved: "2026-10-09"
    },
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «perico»: en Colombia, «cortado (café cortado)»",
      url: "https://dle.rae.es/perico",
      retrieved: "2026-10-09"
    },
    {
      publisher: "Publimetro Colombia",
      title: "«Tinto, perico o chaqueta: así cambia la forma de tomar café en Colombia» (2026) — el perico como una pequeña taza de café con leche en Bogotá",
      url: "https://www.publimetro.co/gourmetro/2026/10/01/tinto-perico-o-chaqueta-asi-cambia-la-forma-de-tomar-cafe-en-colombia/",
      retrieved: "2026-10-09"
    }
  ],
};
