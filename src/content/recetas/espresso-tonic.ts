import type { Recipe } from "./types";

/**
 * Espresso tonic.
 */
export const espressoTonic: Recipe = {
  slug: "espresso-tonic",
  name: "Espresso tonic",
  tagline:
    "Tónica, mucho hielo y el shot vertido al final para que no se mezcle de golpe. El amargo del café contra el de la quina.",
  temperature: "fria",
  base: "Espresso",
  method: "espresso",
  family: "espresso",
  time: "4 min",
  ingredients: [
    {
      amount: "1",
      item: "espresso (18 g de café → 36 g de bebida)"
    },
    {
      amount: "150 ml",
      item: "de tónica muy fría"
    },
    {
      amount: "1 vaso",
      item: "alto, lleno de hielo"
    }
  ],
  steps: [
    "Llena un vaso alto de hielo hasta arriba.",
    "Vierte la tónica sobre el hielo.",
    "Saca el espresso como en su ficha.",
    "Viértelo despacio por encima, al final: así baja entre el hielo en vetas y no se mezcla de golpe con la tónica."
  ],
  note: [
    "Las cantidades y el tiempo son de este sitio: nadie publica una receta medida de espresso tonic, así que partimos de la ficha del espresso y el resto lo fijamos nosotros, con números redondos."
  ],
  image: {
    file: "/images/recetas/espresso-tonic.png",
    alt: "Un vaso alto de vidrio con el café oscuro arriba y la tónica con hielo abajo, separados en dos capas, y un trozo de cítrico asomando por el borde.",
    // PENDIENTE: recorte del diseño de Figma sobre una foto de Magnific o Pexels. El
    // enlace a la foto original lo pasa Juan; hasta entonces no se puede acreditar, y
    // esto no se publica así.
    credit: null,
  },
  sources: [],
};
