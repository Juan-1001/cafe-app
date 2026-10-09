import type { Recipe } from "./types";

/**
 * Cold brew con naranja.
 *
 * Lo de infusionar la cáscara desde el principio es elección del sitio: no apareció
 * ninguna fuente que describa esta variante.
 */
export const coldBrewConNaranja: Recipe = {
  slug: "cold-brew-con-naranja",
  name: "Cold brew con naranja",
  tagline:
    "La cáscara entra al frasco desde el principio y se infusiona con el café, no se echa al servir.",
  temperature: "fria",
  base: "Cold brew",
  method: "cold-brew",
  family: "filtrado",
  time: "14 h",
  ingredients: [
    {
      amount: "60 g",
      item: "de café molido grueso"
    },
    {
      amount: "660 g",
      item: "de agua fría"
    },
    {
      amount: "1",
      item: "naranja, solo la cáscara"
    }
  ],
  steps: [
    "Pela la naranja quitando solo la parte de color naranja de la cáscara.",
    "Mete en un frasco el café, el agua y la cáscara, todo desde el principio.",
    "Tápalo y déjalo 14 horas en la nevera.",
    "Cuela como en la ficha del cold brew y sirve con hielo."
  ],
  note: [
    "Las cantidades y el tiempo son de este sitio: nadie publica una receta medida de cold brew con naranja, así que partimos de la ficha del cold brew, con su proporción de 1 de café por 11 de agua y el resto lo fijamos nosotros, con números redondos.",
    "Las 14 horas son las de esa misma ficha: es el tiempo con el que salió la taza que más gustó en la cata de un estudio con café colombiano. Que la cáscara vaya al frasco desde el principio es una elección nuestra: no encontramos a nadie que describa esta variante."
  ],
  image: {
    file: "/images/recetas/cold-brew-con-naranja.png",
    alt: "Un vaso alto en dos capas, café oscuro arriba y zumo de naranja abajo, con media rodaja de naranja y una ramita de menta encima, sobre un posavasos de madera. Al lado, dos mitades de naranja y unos granos de café.",
    // PENDIENTE: recorte del diseño de Figma sobre una foto de Magnific o Pexels. El
    // enlace a la foto original lo pasa Juan; hasta entonces no se puede acreditar, y
    // esto no se publica así.
    credit: null,
  },
  sources: [
    {
      publisher: "Scientific Reports",
      title: "Córdoba, N. et al., «Effect of grinding, extraction time and type of coffee on the physicochemical and flavour characteristics of cold brew coffee» (2019) — las 14 h fueron la taza mejor valorada en la cata",
      url: "https://www.nature.com/articles/s41598-019-44886-w",
      retrieved: "2026-10-09"
    }
  ],
};
