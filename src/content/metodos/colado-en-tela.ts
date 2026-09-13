import type { BrewMethod } from "./types";

/**
 * Cuarto método del sitio, y el primero que no se pudo escribir sobre ninguna medición.
 *
 * Sobre las cifras. **No existe fuente primaria de nada de este método.** No hay
 * instrucciones de fabricante —un colador de tela no lo fabrica nadie en particular—,
 * no hay estudio, no hay documento técnico. Se buscó en Cenicafé y en la Federación
 * Nacional de Cafeteros y no hay publicación sobre la preparación en tela. Lo que hay
 * en internet son blogs de tiendas que se copian unos a otros.
 *
 * Por eso la receta entera —15 g por taza, 1:15, molienda media, 3:00–4:00— es una
 * elección declarada de este sitio y así lo dice el bloque `grounding`, que se ve en la
 * página. Los 15 g son la base común con el V60, la prensa y el AeroPress, para que el
 * calculador de cantidades compare métodos y no cucharadas.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **«El agua no debe pasar de 92 °C».** Es el dato que más circula sobre este método.
 *   Ninguna de las páginas que lo repiten dice de dónde sale. No se escribe. En su
 *   lugar, la ficha usa lo que ya usan los otros métodos y sí es comprobable: en Bogotá
 *   el agua hierve cerca de los 91 °C, así que aquí no hay forma de pasarse.
 * - **El reparto por método de preparación en los hogares colombianos.** El estudio que
 *   la prensa cita de fondo, el CUAS 2024, es privado y no lo publica. No se afirma que
 *   este sea el método más usado del país; se cuenta por qué no se puede afirmar, que es
 *   más útil. Está en `grounding`.
 * - **La comparación numérica entre tela y papel.** El estudio de 2025 da 28 mg/L de
 *   cafestol para el filtro de tela y una mediana de 12 (4–24, n=5) para el papel de
 *   casa. Se decidió NO escribir «más del doble que el papel»: el 28 es un valor suelto,
 *   sin rango ni número de muestras, y viene de colar café hervido, no de un colado. Los
 *   denominadores no son el mismo. La ficha dice la dirección —la tela deja pasar algo
 *   más que el papel y mucho menos que la malla— y no la cifra.
 *
 * Fuentes consultadas el 2026-09-12: Orrje E. et al., «Cafestol and kahweol
 * concentrations in workplace machine coffee compared with conventional brewing
 * methods», Nutrition, Metabolism and Cardiovascular Diseases (2025),
 * https://pubmed.ncbi.nlm.nih.gov/40089392/ ; Portafolio, «Consumo interno de café»
 * (25 de junio de 2026); Semana, sobre el campeonato de Salento; Comité de Cafeteros
 * de Caldas, sobre el Festival Anserma Sabe a Café. Las tres últimas van completas en
 * `grounding.references`, porque en esta ficha son contenido y no solo respaldo.
 */
export const coladoEnTela: BrewMethod = {
  slug: "colado-en-tela",
  name: "Colado en tela",
  tagline:
    "Una olla, un colador de tela y la mano. Es el café de las casas de este país, el único método del sitio que no te pide comprar nada y el que más gente prepara sin que nadie le haya explicado nunca cómo.",
  image: {
    // Foto pendiente. Mientras `src` sea null se pinta el bloque de color en su sitio;
    // la ruta no se escribe hasta que el archivo exista de verdad. El alt se escribe
    // igual desde ahora: es lo que dice qué fotografía hay que ir a buscar.
    src: null,
    alt: "Unas manos vierten agua caliente desde una olla de aluminio sobre un colador de tela sujeto por su aro, apoyado en la boca de una jarra de vidrio. La tela, teñida de marrón por el uso, está llena de café molido mojado. Alrededor, una mesa de cocina con una taza y una bolsa de café abierta.",
  },

  /*
   * 25,0 sobre 100, el más bajo de los cinco: nivel 1. No gana por ser simple —la
   * prensa lo es igual— sino porque es el único que no esconde nada y no cierra ninguna
   * puerta: el agua pasa cuando pasa, no hay émbolo que empujar ni ventana que cerrar.
   */
  difficulty: {
    cost: {
      value: 2,
      why: "Sus errores comunes son de mantenimiento —la tela guardada húmeda, el colador viejo— y no del gesto. Si te distraes, lo que cambia es la fuerza de la taza, no si hay taza.",
    },
    recovery: {
      value: 4,
      why: "Se vierte en tiempo real: si el agua baja demasiado deprisa o se queda parada, puedes cambiar el chorro a mitad de camino y el café todavía no está decidido.",
    },
    complexity: {
      value: 2,
      why: "Un remojo y después verter. No hay tiempos que cumplir ni dos manos que coordinar.",
    },
    observability: {
      value: 4,
      why: "Es el método más abierto del sitio: el lecho, el nivel del agua y la velocidad a la que pasa están a la vista todos a la vez, sin nada que los tape.",
    },
  },

  recipe: {
    coffeeGramsPerCup: 15,
    /*
     * Dos gramos de agua por gramo de café, y es una aproximación declarada: nadie ha
     * medido cuánta agua se queda una tela.
     *
     * Se usa la misma cifra que el V60 porque la pérdida es de la misma clase —lo que
     * absorbe el molido, más lo que moja el filtro— y no la de la prensa francesa, que
     * son 3 porque allí además se deja a propósito el fondo turbio en la jarra. Aquí no
     * se deja nada: la jarra se sirve entera. Si acaso, una tela empapada se queda con
     * algo más que un papel, así que 2 puede quedarse corto medio gramo.
     */
    waterRetainedPerGram: 2,
    // Un solo hito: el agua con la que se moja el café antes de empezar a colar.
    waterMarks: { remojo: 3 },
  },

  specs: {
    ratio: {
      value: "1:15",
      note: "{cafe} de café por {agua} de agua. Es la proporción de este sitio, no la regla de nadie: en muchas casas se usa bastante menos café y la taza sale más suave.",
    },
    grind: {
      value: "Media",
      note: "Como la arena de playa: más gruesa que la del V60, porque los poros de la tela son más abiertos que los de un papel y el agua pasa antes.",
    },
    waterTemperature: {
      value: "90–94 °C",
      note: "En Bogotá el agua hierve cerca de los 91 °C, así que puedes usarla apenas la retiras del fuego y no hay forma de pasarse.",
    },
    totalTime: {
      // El final del rango es lo que el cronómetro usa para saber cuándo se acabó: el
      // último paso, servir, arranca en 3:30 y se lleva el medio minuto.
      value: "3:00 – 4:00",
      note: "Desde que mojas el café hasta que el colador deja de gotear.",
    },
    output: {
      value: "{rendimiento}",
      note: "Lo que llega a la taza: entre el molido y la tela se quedan unos {retenida} de agua.",
    },
    /*
     * Las cifras salen del mismo estudio de 2025 que ya se cita en la prensa francesa
     * (Nutrition, Metabolism and Cardiovascular Diseases, https://pubmed.ncbi.nlm.nih.gov/40089392/).
     * Cita literal del resumen: «Boiled coffee had high concentrations of cafestol and
     * kahweol, 939 mg/L and 678 mg/L, but having it poured through a fabric filter
     * reduced the concentrations to 28 and 21 mg/L». En el mismo estudio, el filtrado en
     * papel de casa da una mediana de 12 mg/L (rango 4–24, n=5) y la prensa y el
     * percolador rondan los 90.
     *
     * En el texto visible no va ninguna de esas cifras, y el matiz de qué colaron sí:
     * lo que pasaron por la tela fue café hervido al estilo escandinavo. Ver el
     * comentario de cabecera.
     */
    cupProfile: {
      value: "Redonda",
      note: "La tela es un filtro de verdad: retiene el poso y buena parte de los aceites, así que la taza sale limpia, con algo más de grasa que la del papel y mucha menos que la de la prensa. El único estudio que ha medido las tres coló café hervido al estilo escandinavo, no un colado colombiano, así que orienta pero no describe tu taza.",
    },
  },

  equipment: [
    {
      name: "Colador de tela",
      note: "El de toda la vida. Cuando la tela ya no vuelve a su color después de lavarla, se cambia.",
      piece: "colador-de-tela",
    },
    {
      name: "Olla o jarra para el agua",
      note: "Aquí no hace falta pico fino: basta con poder verter despacio y sin salpicar.",
      piece: "hervidor",
    },
    {
      name: "Jarra o taza grande",
      note: "Tiene que aguantar el aro del colador apoyado en la boca sin volcarse.",
      piece: "jarra-de-vidrio",
    },
    {
      name: "Molino de muelas",
      note: "La única pieza de la lista que se puede aplazar: si tu café ya viene molido, el método funciona igual.",
      piece: "molino-de-muelas",
    },
    {
      name: "Báscula",
      note: "Una vez que sepas cómo se ve tu dosis en la tela, puedes dejar de pesar.",
      piece: "bascula",
    },
  ],

  steps: [
    {
      time: "Previo",
      title: "Enjuaga el colador con agua caliente",
      description:
        "Pasa un chorro de agua caliente por la tela, sobre la misma jarra donde vas a colar. Bota esa agua antes de empezar.",
      why: "Hace dos cosas a la vez: calienta la jarra, que si está fría se lleva parte del calor justo cuando más falta hace, y se lleva el polvo y el olor que la tela guardada coge entre un día y otro.",
    },
    {
      time: "Previo",
      title: "Muele medio y échalo en la tela",
      description:
        "Muele los {cafe} justo antes de usarlos y repártelos por el fondo de la tela con un golpecito, para que queden parejos y no en un montón.",
      why: "Si el café queda amontonado a un lado, el agua busca el camino más corto y pasa por donde hay menos: una parte del molido se extrae de más y la otra se queda sin tocar.",
    },
    {
      time: "0:00 – 0:30",
      title: "Moja el café y espera",
      description:
        "Arranca el cronómetro y echa solo {remojo}, en círculos, hasta que no quede nada seco. Vas a ver la superficie hincharse y soltar burbujas.",
      why: "El café recién tostado guarda gas, y ese gas empuja el agua hacia fuera. Dejarlo salir medio minuto antes de seguir hace que el resto del agua entre pareja en vez de resbalar por encima. A esta pausa se le llama floración.",
    },
    {
      time: "0:30 – 2:00",
      title: "Vierte el resto en dos o tres tandas",
      description:
        "Sigue en círculos desde el centro hacia fuera, sin llegar al borde de la tela, y espera a que baje el nivel antes de la siguiente tanda. Al final tienes que haber echado {agua} en total.",
      why: "Verter por tandas mantiene el café siempre cubierto de agua sin inundarlo. Y no mojar el borde evita que parte del agua se escurra por la tela sin pasar por el café, que es la forma más fácil de que la taza salga aguada sin que se note por qué.",
    },
    {
      time: "2:00 – 3:30",
      title: "Deja que termine de gotear. No exprimas la tela",
      description:
        "Levanta el colador solo cuando el goteo se vuelva lento y espaciado. Por muchas ganas que den, no lo aprietes ni lo retuerzas.",
      why: "Al exprimir sale más líquido, sí, pero es el que está atrapado entre los trozos más finos y el más amargo de todos. Media cucharada de eso le cambia el sabor a la jarra entera.",
    },
    {
      time: "3:30 – 4:00",
      title: "Sirve, y lava el colador ahora",
      description:
        "Sirve la jarra entera. Enjuaga la tela con agua bien caliente, sin jabón, hasta que el agua salga clara, y déjala colgada al aire o guárdala en un frasco con agua en la nevera.",
      why: "La tela se queda con los aceites del café, y los aceites se ponen rancios. Eso es lo que hace que un colador viejo sepa a trapo, y por eso quienes cuelan a diario lo lavan apenas terminan. El jabón se queda en la fibra y también se prueba, así que solo agua.",
    },
  ],

  commonMistakes: [
    {
      problem: "El café sabe a trapo o a rancio",
      cause:
        "La tela guardó los aceites de los días anteriores, o se dejó secar doblada dentro de un cajón.",
      fix: "Enjuágala con agua muy caliente apenas termines, nunca con jabón, y déjala al aire o en agua dentro de la nevera. Si ya no vuelve a su color después de lavarla, cámbiala.",
    },
    {
      problem: "Sale aguada aunque hayas usado bastante café",
      cause:
        "El agua encontró un atajo: se escurrió por el borde de la tela, o pasó de golpe porque el molido está muy grueso.",
      fix: "Vierte en círculos sin acercarte al borde, muele un punto más fino y reparte el agua en dos o tres tandas en lugar de echarla toda de una.",
    },
    {
      problem: "Queda poso en el fondo de la taza",
      cause:
        "La tela está gastada y ya no retiene los finos, o la exprimiste al final.",
      fix: "No aprietes nunca el colador. Si aun así aparece poso con la tela limpia, es que llegó al final de su vida: la trama se abre con el uso.",
    },
    {
      problem: "Amarga cuando vuelves a colar el mismo café",
      cause:
        "Repasar el molido con más agua para que rinda. La segunda pasada ya no saca dulzor, porque eso salió en la primera; saca lo que quedaba, que es amargo y áspero.",
      fix: "Si necesitas más café, cuela otra tanda con molido nuevo. Sale más barato de lo que parece: la primera pasada usa una fracción de lo que el grano puede dar.",
    },
  ],

  grounding: {
    body: [
      "Todas las fichas de este sitio se apoyan en algo: las instrucciones de quien fabricó el aparato, un estudio, una medición. Esta no. Nadie ha publicado cuánta agua se queda una tela, a qué temperatura conviene colar ni cuánto debería tardar en pasar el agua, y un colador de tela no lo fabrica nadie en particular que pueda decir cómo se usa. Los números que circulan salen de blogs de tiendas que se copian unos a otros. Así que la receta de esta ficha es la de este sitio —los mismos 15 gramos por taza que los demás métodos, para que se puedan comparar entre ellos— y no la recomendación de nadie más.",
      "La única cifra prestada es la de los aceites, y viene con su matiz: el estudio que se cita en el perfil de taza pasó por una tela café hervido al estilo escandinavo, no un colado colombiano. Sirve para saber que una tela filtra de verdad; no describe tu taza.",
      "Queda una afirmación que se repite mucho y que aquí no vas a leer: que este es el método más usado en los hogares colombianos. Probablemente sea cierto, y aun así no hay forma de saberlo. Los periódicos lo dan por hecho —«la preparación tradicional con olla, colador y café molido sigue predominando en los hogares colombianos», escribió Portafolio en junio de 2026— sin citar ningún estudio ni dar ninguna cifra, y el estudio de consumo que suele estar detrás es privado y no publica el reparto por método de preparación. Es justo el tipo de dato del que conviene desconfiar, y escuece un poco más porque va sobre nosotros.",
      "Lo que sí se puede decir con nombres es quién lo prepara en serio. Abajo están los dos, y el estudio del que sale lo de los aceites.",
    ],
    references: [
      {
        publisher: "Semana",
        title:
          "Premio al mejor café con colador de tela: así será el original campeonato de este fin de semana en el Quindío",
        url: "https://www.semana.com/mejor-colombia/articulo/premio-al-mejor-cafe-con-colador-de-tela-asi-sera-el-original-campeonato-de-este-fin-de-semana-en-el-quindio/202416/",
        retrieved: "2026-09-12",
      },
      {
        publisher: "Comité de Cafeteros de Caldas",
        title:
          "Cafés de 86 puntos y tradición en la preparación con colador de tela sobresalieron en el 2.º Festival Anserma Sabe a Café",
        url: "https://caldas.federaciondecafeteros.org/listado-noticias/calidad-cafes-de-86-puntos-y-tradicion-en-la-preparacion-con-colador-de-tela-sobresalieron-en-el-2-festival-anserma-sabe-a-cafe/",
        retrieved: "2026-09-12",
      },
      {
        publisher: "Nutrition, Metabolism and Cardiovascular Diseases",
        title:
          "Cafestol and kahweol concentrations in workplace machine coffee compared with conventional brewing methods (2025)",
        url: "https://pubmed.ncbi.nlm.nih.gov/40089392/",
        retrieved: "2026-09-12",
      },
    ],
  },
};
