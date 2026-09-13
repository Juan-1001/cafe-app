import type { BrewMethod } from "./types";

export const prensaFrancesa: BrewMethod = {
  slug: "prensa-francesa",
  name: "Prensa francesa",
  tagline:
    "Un cilindro de vidrio, una malla de metal y cuatro minutos de espera. Es el método que más perdona y el que más cuerpo le deja a la taza.",
  image: {
    src: "/images/metodos/prensa-francesa.jpg",
    alt: "Una prensa francesa de vidrio y metal, con el café ya hecho y el émbolo bajado, sobre una mesa de madera clara. Delante, una taza blanca servida de café negro descansa en su plato, rodeada de granos de café sueltos. Una franja de luz de sol cruza la mesa en diagonal y el resto de la escena queda en penumbra.",
  },

  // 27,5 sobre 100: nivel 1. El método más fácil del sitio junto con el colado en tela,
  // y lo que lo pone ahí es que no cierra ninguna puerta hasta el final.
  difficulty: {
    cost: {
      value: 2,
      why: "Ninguno de sus errores echa a perder la taza: el peor deja un dedo de poso en el fondo o una segunda taza amarga, y los dos se arreglan a la mañana siguiente.",
    },
    recovery: {
      value: 4,
      why: "Mientras el café está en remojo todavía puedes alargarlo, remover o apartar la jarra. La única puerta que se cierra es el émbolo, y se baja al final.",
    },
    complexity: {
      value: 2,
      why: "Echar, esperar, prensar y servir. No hay vertidos por tandas ni ningún gesto que coordinar con otro.",
    },
    observability: {
      value: 3,
      why: "El vidrio deja ver el nivel y la costra de espuma, pero el café está sumergido: no hay caudal que leer ni un color que cambie para avisarte.",
    },
  },

  recipe: {
    coffeeGramsPerCup: 15,
    /**
     * Tres gramos de agua por gramo de café, y son dos pérdidas distintas sumadas:
     * unos 2 g que el molido absorbe y se queda, más un gramo largo del fondo
     * turbio que no se sirve a propósito porque ahí está el poso. En el V60 esta
     * misma cifra es 2 porque allí solo existe la primera pérdida.
     *
     * Es una aproximación: lo que dejas en la jarra no crece exactamente en
     * proporción al café, pero entre 2 y 4 tazas el número cuadra.
     */
    waterRetainedPerGram: 3,
    // Sin hitos de vertido: aquí el agua entra de una sola vez, no en tandas.
    waterMarks: {},
    /**
     * Desde dos tazas. Con una sola, el agua no llega a cubrir bien la malla en una
     * prensa de litro, que es la medida corriente, y el émbolo trabaja a medias.
     */
    cupOptions: [2, 3, 4],
  },

  specs: {
    ratio: {
      value: "1:15",
      note: "{cafe} de café por {agua} de agua. Baja a 1:17 si la quieres menos intensa.",
    },
    grind: {
      value: "Gruesa",
      note: "Como la sal marina gruesa: se distinguen los trozos a simple vista.",
    },
    waterTemperature: {
      value: "93–96 °C",
      note: "En Bogotá el agua hierve cerca de los 91 °C, así que aquí no hay forma de pasarse: úsala apenas deje de burbujear.",
    },
    totalTime: {
      // El final de este rango es lo que el cronómetro usa para saber cuándo se
      // acabó: el último paso, servir, arranca en 5:00 y se lleva el medio minuto.
      value: "5:00 – 5:30",
      note: "Desde que echas el agua hasta que la jarra queda vacía.",
    },
    output: {
      value: "{rendimiento}",
      note: "Lo que llega a la taza: entre lo que absorbe el molido y el fondo turbio que no se sirve, se quedan unos {retenida} de agua.",
    },
    /*
     * Las cifras de los aceites salen de un estudio de 2025 en Nutrition, Metabolism
     * and Cardiovascular Diseases, que midió cafestol en el café de prensa (~90 mg/L)
     * frente al filtrado en papel (~12 mg/L): https://pubmed.ncbi.nlm.nih.gov/40089392/
     */
    cupProfile: {
      value: "Con cuerpo",
      note: "La malla de metal deja pasar los aceites del café —uno de prensa lleva unas siete veces más que uno filtrado en papel— y son ellos los que dan esa sensación densa y redonda en la boca. También pasan partículas finas, así que el último sorbo trae poso.",
    },
  },

  equipment: [
    {
      name: "Prensa francesa de 1 litro",
      note: "La medida corriente, la que se vende como «de 8 tazas».",
      piece: "prensa-francesa",
    },
    {
      name: "Molino de muelas",
      note: "Aquí importa más que en ningún otro método: lo desigual acaba en tu taza.",
      piece: "molino-de-muelas",
    },
    {
      name: "Báscula",
      note: "Pesar el café y el agua es lo único que hace repetible la receta.",
      piece: "bascula",
    },
    {
      name: "Hervidor u olla",
      note: "No hace falta cuello de cisne: el agua entra de golpe, no en espiral.",
      piece: "hervidor",
    },
    {
      name: "Cuchara larga de madera",
      note: "Para romper la costra sin golpear el vidrio caliente.",
      piece: "cuchara-de-madera",
    },
    {
      name: "Jarra o termo para servir",
      note: "El café que se queda dentro de la prensa sigue extrayéndose y amarga.",
      piece: "jarra-de-vidrio",
    },
  ],

  steps: [
    {
      time: "Previo",
      title: "Precalienta la prensa",
      description:
        "Llénala de agua caliente y déjala así mientras pesas y mueles el café. Bótala justo antes de empezar.",
      why: "Aquí no hay papel que enjuagar, pero el vidrio es grueso y frío: se lleva parte del calor del agua justo en los primeros segundos, que es cuando más falta hace.",
    },
    {
      time: "Previo",
      title: "Muele grueso y échalo dentro",
      description:
        "Muele los {cafe} justo antes de usarlos, viértelos en la prensa vacía y sacúdela un poco para aplanar la superficie.",
      why: "La malla de metal tiene agujeros enormes comparada con un papel. Todo lo que salga más fino que la sal gruesa se cuela y termina en el fondo de la taza.",
    },
    {
      time: "0:00 – 0:30",
      title: "Vierte toda el agua de una vez",
      description:
        "Arranca el cronómetro y echa los {agua} sin pausas, apuntando al centro para que el chorro revuelva el molido. No debe quedar café seco flotando.",
      why: "Esto es inmersión, no goteo: en vez de que el agua atraviese el café, todo el café se queda dentro de toda el agua al mismo tiempo. Por eso no hay vertidos por tandas ni floración que cuidar.",
    },
    {
      time: "0:30 – 4:00",
      title: "Tapa y no toques nada",
      description:
        "Pon la tapa con el émbolo arriba del todo, sin bajarlo, y deja la prensa quieta. Se va a formar una costra de café flotando en la superficie.",
      why: "La tapa conserva el calor y la quietud deja que la extracción —el paso de los sabores del grano al agua— avance parejo. Si revuelves ahora, los trozos más finos se sueltan y se van al fondo hechos barro.",
    },
    {
      time: "4:00 – 4:30",
      title: "Rompe la costra y retira la espuma",
      description:
        "Con la cuchara larga, empuja la costra hacia abajo con dos o tres movimientos suaves: la mayor parte del café se hunde solo. Retira después la espuma y los granos que sigan arriba.",
      why: "Esa costra es café que pasó cuatro minutos tocando más aire que agua. Sacarla le quita a la taza un amargor áspero que no aporta nada.",
    },
    {
      time: "4:30",
      title: "Baja el émbolo despacio",
      description:
        "Apóyalo en la superficie y empújalo con presión constante, sin prisa, hasta el fondo. Si se atasca, súbelo un poco y vuelve a bajar.",
      why: "El émbolo no filtra: solo aparta el café hacia abajo. Bajarlo de golpe levanta una nube de partículas del fondo y te las reparte por toda la bebida.",
    },
    {
      time: "≈ 5:00",
      title: "Sirve la jarra entera",
      description:
        "Pasa el café a las tazas o a una jarra aparte de inmediato, y frena cuando el chorro empiece a verse turbio: ese último dedo de líquido se queda en la prensa.",
      why: "Lo que dejes dentro sigue en contacto con el molido y en pocos minutos amarga, así que la prensa se vacía siempre entera. Y si quieres una taza aún más limpia, hay una variante: en vez de bajar el émbolo, rompe la costra, retira la espuma y espera cinco minutos más a que los finos se asienten solos; después sirve con cuidado, sin usar el émbolo.",
    },
  ],

  commonMistakes: [
    {
      problem: "Queda un dedo de poso en el fondo de la taza",
      cause:
        "La molienda traía demasiados trozos finos, casi siempre por usar un molino de cuchillas, o bajaste el émbolo de golpe.",
      fix: "Muele más grueso, baja el émbolo en unos veinte segundos y no sirvas el último chorro turbio.",
    },
    {
      problem: "La segunda taza sabe mucho más amarga que la primera",
      cause:
        "El café se quedó dentro de la prensa y siguió extrayéndose mientras te tomabas la primera.",
      fix: "Decanta toda la jarra a un termo o a otra jarra apenas terminas, aunque no te la vayas a tomar de una.",
    },
    {
      problem: "Sale aguada y sin cuerpo",
      cause:
        "Poco café para tanta agua, o el agua entró tibia y la extracción se quedó corta.",
      fix: "Pesa en vez de calcular a ojo, usa el agua apenas deja de hervir y respeta los cuatro minutos completos.",
    },
    {
      problem: "El émbolo no baja, o el café se sale por arriba",
      cause: "La molienda está tan fina que taponó la malla y el agua no la atraviesa.",
      fix: "Muele bastante más grueso y no fuerces el émbolo: sube un poco y vuelve a bajar con calma.",
    },
  ],

  // Fuente: https://en.wikipedia.org/wiki/French_press (sección «Design»). La patente
  // de Calimani y Moneta se registró en Estados Unidos en 1929, sobre un diseño de 1928.
  funFact: {
    text: "Se llama prensa francesa, pero el aparato que tienes en la cocina lo patentaron dos milaneses: Attilio Calimani y Giulio Moneta registraron en 1929 el resorte que sella la malla contra el vidrio.",
  },
};
