import type { GlossaryTerm } from "./types";

/*
 * La definición de barra sale del folleto del Istituto Nazionale Espresso Italiano,
 * «The Certified Italian Espresso and Cappuccino» (suplemento de L'Assaggio n.º 16,
 * diciembre de 2006), el mismo documento que respalda la ficha del espresso. Se leyó
 * entero el 2026-10-09. Las dos frases que la sostienen:
 *
 * - p. 2: «With the addition of fresh milk, frothed by proper practices, this becomes
 *   the Certified Italian Cappuccino.»
 * - p. 8: «a high quality cappuccino that abides by tradition is made of 25 ml espresso
 *   and 100 ml steam-foamed milk.»
 *
 * Va atribuida al instituto y sin cantidades, como se decidió. Las cantidades
 * existen —25 ml de espresso, 100 ml de leche que al espumarse crece hasta unos
 * 125 ml, a unos 55 °C, en taza de 150-160 ml (p. 9)—, pero son la receta del
 * capuchino *certificado* de un instituto italiano, no la definición de la bebida:
 * en una barra de Bogotá un capuchino puede llevar otra proporción y seguir siéndolo.
 * El día que haya una receta de capuchino en /recetas, ese es su sitio.
 *
 * Lo que se sustituyó: la definición del DLE, que iba mientras el folleto no se había
 * leído. Dice «café cubierto con espuma de leche o nata»; es cierta como uso general,
 * pero no dice que la base es un espresso, y la nata confundía.
 */
export const capuchino: GlossaryTerm = {
  kind: "term",
  slug: "capuchino",
  term: "Capuchino",
  definition:
    "Un espresso con leche fresca espumada al vapor por encima. Así lo define el Istituto Nazionale Espresso Italiano, que certifica el capuchino tradicional.",
  categories: ["carta"],
  readMore: { kind: "metodo", slug: "espresso" },
  sources: [
    {
      publisher: "Istituto Nazionale Espresso Italiano",
      title: "The Certified Italian Espresso and Cappuccino",
      url: "https://olaszpresszo.hu/wp-content/uploads/2014/04/istituzionale_inei_hq_en.pdf",
      retrieved: "2026-10-09",
    },
  ],
};
