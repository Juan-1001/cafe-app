import type { Recipe } from "./types";

/**
 * Tinto de panela.
 *
 * Que la panela va en el agua antes que el café es práctica declarada: así lo cuenta la
 * receta de bebidas típicas de Noticias Caracol, que da el orden y no los tiempos.
 */
export const tintoDePanela: Recipe = {
  slug: "tinto-de-panela",
  name: "Tinto de panela",
  tagline:
    "La panela se disuelve en el agua antes de que entre el café. No es endulzar al final: es otra bebida.",
  temperature: "caliente",
  base: "Colado",
  method: "colado-en-tela",
  family: "filtrado",
  time: "8 min",
  ingredients: [
    {
      amount: "15 g",
      item: "de café molido medio"
    },
    {
      amount: "225 g",
      item: "de agua"
    },
    {
      amount: "20 g",
      item: "de panela rallada"
    }
  ],
  steps: [
    "Pon el agua al fuego con la panela y remueve hasta que se disuelva.",
    "Cuando hierva, retírala del fuego y echa el café.",
    "Espera 4 minutos.",
    "Cuela por la tela como en la ficha del colado en tela."
  ],
  note: [
    "Las cantidades y el tiempo son de este sitio: nadie publica una receta medida de tinto de panela, así que partimos de la ficha del colado en tela, con su proporción de 1 de café por 15 de agua y el resto lo fijamos nosotros, con números redondos.",
    "Tinto es como se llama en Colombia al café negro, y panela, al azúcar de caña sin refinar que se vende en bloques. Que la panela vaya en el agua antes que el café no lo inventamos nosotros: es el orden de la receta de bebidas típicas que publica Noticias Caracol. Los 20 g de panela salen de escalar los 8 g por cada 100 ml de esa receta."
  ],
  image: {
    file: "/images/recetas/tinto-de-panela.png",
    alt: "Una taza blanca de café negro sobre su plato blanco, vista desde arriba y de lado.",
    // PENDIENTE: recorte del diseño de Figma sobre una foto de Magnific o Pexels. El
    // enlace a la foto original lo pasa Juan; hasta entonces no se puede acreditar, y
    // esto no se publica así.
    credit: null,
  },
  sources: [
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «tinto»: «Infusión de café negro», en Colombia y Ecuador",
      url: "https://dle.rae.es/tinto",
      retrieved: "2026-10-09"
    },
    {
      publisher: "Real Academia Española",
      title: "Diccionario de la lengua española, «panela»: azúcar mascabado en panes, en Colombia, El Salvador y Honduras",
      url: "https://dle.rae.es/panela",
      retrieved: "2026-10-09"
    },
    {
      publisher: "Noticias Caracol",
      title: "Bebidas típicas de Colombia — la receta del tinto de panela: el agua con la panela al fuego y el café cuando hierve",
      url: "https://www.noticiascaracol.com/colombia/bebidas-tipicas-de-colombia-so35",
      retrieved: "2026-10-09"
    }
  ],
};
