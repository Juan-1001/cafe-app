import type { BrewMethod } from "./types";

/**
 * Tercer método del sitio y segundo del capítulo de los principiantes.
 *
 * Sobre las cifras. Casi todo lo que se afirma aquí sale de las instrucciones del propio
 * fabricante, que para un aparato es la fuente primaria: quien lo diseñó dice cómo se usa.
 * Lo que no sale de ahí está marcado abajo, porque en este método hay dos huecos que
 * conviene tener presentes.
 *
 * - **El fabricante se contradice consigo mismo en la dosis.** Sus instrucciones de
 *   producto dicen «1 heaping Scoop or 16-18 grams»; su centro de ayuda dice que el cacito
 *   colmado son «14-15 grams» (y el raso, 11,5 g). Son dos páginas oficiales y no cuadran.
 *   La ficha usa 15 g por taza, que es la base común con el V60 y la prensa francesa: así
 *   el calculador de cantidades compara métodos y no cacitos.
 * - **No hay ratio oficial, y no es un descuido: el fabricante mide el agua con una raya.**
 *   Da los gramos de café y dice «llena hasta el 4», pero nunca ha publicado cuántos
 *   mililitros hay en cada número del cilindro. El 1:15 de la ficha es una elección del
 *   sitio que cae dentro de lo que dan sus propias instrucciones, no un dato suyo.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **La afirmación de acidez del fabricante** —«about one-fifth the acidity of drip
 *   brewed coffee and one-ninth the acidity of French press brewed coffee»— NO se escribe.
 *   No cita ningún estudio, y su página de «cómo funciona» repite que la presión «reduce
 *   la acidez» también sin fuente. Y aunque hubiera medición detrás, mediría pH, que no es
 *   la acidez que se prueba en una taza: son dos cosas distintas con el mismo nombre. Eso
 *   es material para un artículo de /granos sobre la acidez, donde hay sitio para
 *   explicarlo; en una ficha de método solo cabría afirmarlo.
 * - **La presión en bares** (circulan «0,35-0,75 bar» y «1 bar») se descartó: se leyó la
 *   patente completa y no da ninguna cifra de presión, ni de tiempo ni de temperatura. El
 *   fabricante tampoco publica ninguna. El texto dice que la presión es suave y que esto no
 *   es un espresso, que es lo que el lector necesita saber.
 * - **El método invertido** no entra como recomendación ni como dato: no hay ninguna
 *   medición de que salga mejor. Entra atribuido, en los errores comunes, como lo que hace
 *   parte de la gente y por qué, con el matiz de que el fabricante lo menciona sin
 *   recomendarlo.
 *
 * Fuentes: instrucciones oficiales (https://aeropress.com/pages/how-to-use), centro de
 * ayuda (https://help.aeropress.com/en-US/articles/brewing-33631) y patente US 7.849.784
 * (https://patents.google.com/patent/US7849784B2/en). Consultadas el 2026-09-13.
 */
export const aeropress: BrewMethod = {
  slug: "aeropress",
  name: "AeroPress",
  tagline:
    "Dos cilindros de plástico, un filtro de papel del tamaño de una moneda y un empujón. Es el método más rápido del sitio y el que menos margen de error deja abierto.",
  image: {
    // Foto pendiente: la ruta ya está escrita y el archivo todavía no. Hasta que se
    // guarde, `resolveContentImage` deja el bloque de color en su sitio. El alt se
    // escribe igual desde ahora: es lo que dice qué fotografía hay que ir a buscar.
    file: "/images/metodos/aeropress.jpg",
    alt: "Un AeroPress montado sobre una taza blanca, en una mesa de madera: el cilindro de plástico translúcido lleno de café y agua, y dos manos empujando el émbolo hacia abajo con calma. Al lado, la bolsa de café abierta y una báscula pequeña.",
    credit: null,
  },

  /*
   * 45,0 sobre 100: nivel 2. **Sube de nivel respecto a como estaba clasificado antes**,
   * y conviene saber por qué, porque es el único método al que el sistema le cambió el
   * sitio.
   *
   * Sus errores siguen siendo baratos —eso no ha cambiado y es su nota de coste—, pero
   * el coste del error no es lo único que hace difícil un método. De los cuatro que
   * estaban en el nivel de entrada, este es el que menos deja ver (un cilindro opaco con
   * el café sumergido) y el que antes cierra la puerta (metido el émbolo, solo queda
   * prensar). Entre esas dos notas y algo más de gesto que los demás, cruza el corte.
   *
   * Se comprobó que no fuera un artefacto del corte: dejarlo en el nivel 1 pedía poner
   * la raya en 46, entre su 45,0 y el 47,5 del V60. Eso habría sido dibujar la raya
   * alrededor del resultado que ya se quería, así que sube.
   */
  difficulty: {
    cost: {
      value: 2,
      why: "Sus cuatro errores comunes son estorbos del gesto y no sabores —gotea antes de prensar, cuesta bajar el émbolo, queda café pegado arriba—, y entre el papel y el remojo la taza sale limpia igual.",
    },
    recovery: {
      value: 3,
      why: "Hay una ventana para remover o dejarlo medio minuto más, pero se cierra al meter el émbolo: a partir de ahí lo único que queda por decidir es a qué velocidad prensas.",
    },
    complexity: {
      value: 3,
      why: "Montar, enjuagar el papel, dosificar, verter, remover, tapar, esperar y prensar, en ese orden y sin pausas largas. Es el que más pasos encadena de los métodos cortos.",
    },
    observability: {
      value: 2,
      why: "El cilindro es opaco por dentro y el café está sumergido: no ves la extracción. Lo único que se puede leer es la resistencia del émbolo, y eso ya es el final.",
    },
  },

  recipe: {
    coffeeGramsPerCup: 15,
    /*
     * Dos gramos de agua por gramo de café, y es una aproximación declarada: no existe
     * ninguna medición publicada de cuánta agua se queda el molido en este aparato.
     *
     * Se usa la misma cifra que el V60 porque la pérdida es la misma —lo que absorbe el
     * café— y no la de la prensa francesa, que son 3 porque allí además se deja a
     * propósito el fondo turbio en la jarra. Aquí no se deja nada: el émbolo lo empuja
     * todo. Si acaso, prensar saca algo más de agua que un goteo, así que 2 es el
     * extremo prudente.
     */
    waterRetainedPerGram: 2,
    // Sin hitos de vertido: el agua entra de una sola vez, no en tandas.
    waterMarks: {},
    /*
     * Una sola taza. No es una limitación del contenido sino del aparato: el cilindro
     * del AeroPress original tiene una capacidad total de unos 296 ml (10 oz según la
     * ficha de producto), y dos tazas de esta receta serían 30 g de café y 450 g de
     * agua, que no caben.
     */
    cupOptions: [1],
  },

  specs: {
    ratio: {
      value: "1:15",
      note: "{cafe} de café por {agua} de agua. El fabricante no publica ningún ratio —da los gramos y una raya en el cilindro—, así que esta proporción es una elección del sitio.",
    },
    grind: {
      value: "Media-fina",
      // Fuente: instrucciones oficiales, «medium-fine grind size», que ellos sitúan
      // entre la molienda de goteo y la de espresso.
      note: "Entre la del goteo y la del espresso: se siente como arena fina, todavía granulada entre los dedos.",
    },
    waterTemperature: {
      value: "85 °C",
      /*
       * Fuente: instrucciones oficiales, «185°F (85°C)» para todos los modelos, y el
       * centro de ayuda, que afina «175°F (80°C) water for dark roasts and 185°F (85°C)
       * for medium and light roasts».
       *
       * Lo de Bogotá es el mismo apunte que en el V60: a 2.600 m el agua hierve cerca de
       * los 91 °C, así que aquí sí hay que esperar un poco, al revés que en los métodos
       * que piden el agua casi hirviendo.
       */
      note: "Más fría que en el resto de métodos, y es a propósito. Para tuestes oscuros, 80 °C. En Bogotá el agua hierve cerca de los 91 °C, así que espera un par de minutos después de apartarla del fuego.",
    },
    totalTime: {
      value: "1:30 – 2:00",
      // El fabricante lo resume como «Less than 2 Minutes». El final de este rango es lo
      // que el cronómetro usa para saber cuándo se acabó: el prensado arranca en 1:00 y
      // puede llevarse el medio minuto largo.
      note: "Desde que entra el agua hasta que terminas de prensar.",
    },
    output: {
      value: "{rendimiento}",
      note: "Lo que llega a la taza: el molido se queda con unos {retenida} de agua. El cilindro no da para más de una taza.",
    },
    cupProfile: {
      value: "Suave",
      note: "El papel retiene los aceites, como en el V60, pero aquí el café está en remojo y el prensado corta la extracción de golpe en vez de dejarla terminar sola. Sale una taza limpia, con algo más de cuerpo que la de un goteo y sin las puntas amargas que aparecen cuando el agua se queda demasiado tiempo con el café.",
    },
  },

  equipment: [
    {
      name: "AeroPress",
      note: "Cilindro, émbolo y tapa. El filtro va en la tapa, que se enrosca.",
      piece: "aeropress",
    },
    {
      name: "Filtros de papel redondos",
      note: "Vienen por cientos en una cajita. Se usa uno por taza.",
      piece: "filtros-papel-aeropress",
    },
    {
      name: "Molino de muelas",
      note: "El de cuchillas parte el grano en trozos desiguales.",
      piece: "molino-de-muelas",
    },
    {
      name: "Báscula",
      note: "Sin temporizador: aquí los tiempos son tan cortos que se cuentan con el cronómetro de la página.",
      piece: "bascula",
    },
    {
      name: "Hervidor de agua",
      note: "Cualquiera sirve: el agua entra de una vez y no hace falta pico fino.",
      piece: "hervidor",
    },
    {
      name: "Cuchara larga",
      note: "Para remover dentro del cilindro sin rayarlo.",
      piece: "cuchara-de-madera",
    },
  ],

  steps: [
    {
      time: "Previo",
      title: "Monta el aparato y enjuaga el filtro",
      description:
        "Pon un filtro de papel en la tapa, enrosca la tapa en el cilindro y apoya el conjunto sobre la taza. Vierte un chorro de agua caliente para empapar el papel y calentar la taza, y bota esa agua.",
      why: "El papel sin enjuagar aporta sabor a cartón. Y la taza fría le roba calor a una bebida que ya entra más templada que en otros métodos.",
    },
    {
      time: "Previo",
      title: "Añade el café y nivélalo",
      description:
        "Echa los {cafe} de café recién molido dentro del cilindro y dale un golpecito para aplanar la superficie.",
      why: "Un lecho plano hace que el agua moje todo el café a la vez. Aquí importa más que en otros métodos porque el agua entra de golpe y no tiene tiempo de repartirse sola.",
    },
    {
      time: "0:00 – 0:15",
      title: "Echa el agua hasta {agua}",
      description:
        "Arranca el cronómetro y vierte los {agua} de agua de una sola vez, sin prisa pero sin pararte, mojando todo el café.",
      why: "En este método no hay floración ni vertidos por tandas: el café va a estar en remojo, así que lo único que importa es que se moje entero desde el principio.",
    },
    {
      time: "0:15 – 0:30",
      title: "Remueve y tapa",
      description:
        "Remueve suavemente unos tres segundos, mete el émbolo en la boca del cilindro y empújalo apenas un centímetro, sin llegar al agua.",
      why: "Removiendo hundes el café que flota. El émbolo puesto sella el cilindro y hace el vacío que impide que el agua empiece a colarse sola por el filtro mientras esperas.",
    },
    {
      time: "0:30 – 1:00",
      title: "Espera medio minuto",
      description:
        "Deja el café en remojo treinta segundos, sin tocar nada.",
      why: "Es todo el tiempo de extracción que tiene este método. Con el café en remojo, cada partícula está rodeada de agua desde el primer segundo, así que hace falta mucho menos tiempo que en un goteo.",
    },
    {
      time: "1:00",
      title: "Prensa despacio",
      description:
        "Empuja el émbolo hacia abajo con una presión suave y constante, unos veinte o treinta segundos. Para cuando oigas el siseo del aire: lo que queda debajo es espuma y poso.",
      why: "La presión aquí es suave, nada que ver con un espresso: solo empuja el agua a través del papel. Si prensas a lo bruto sacas los finos que el filtro estaba reteniendo, y si sigues después del siseo, arrastras a la taza el poso del fondo.",
    },
  ],

  commonMistakes: [
    {
      problem: "El café empieza a gotear en la taza antes de prensar",
      cause:
        "El papel mojado deja pasar agua por su propio peso, sobre todo si tardas en tapar con el émbolo.",
      fix: "Ten la taza, el café y el agua listos antes de empezar, y mete el émbolo en cuanto termines de remover: el vacío detiene el goteo. Hay quien va más lejos y monta el aparato al revés, boca arriba, para que el agua no toque el filtro hasta el final; es el llamado método invertido, y el propio fabricante lo menciona como algo que hace parte de la gente, sin recomendarlo. Tiene su riesgo: se le da la vuelta a un cilindro lleno de agua caliente.",
    },
    {
      problem: "Cuesta un esfuerzo enorme bajar el émbolo",
      cause: "La molienda está demasiado fina y el papel se tapó.",
      fix: "Muele un punto más grueso. No fuerces: empujando fuerte solo consigues que el agua se abra camino por un lado y que salten los finos al café.",
    },
    {
      problem: "La taza sabe aguada o a cartón mojado",
      cause:
        "El agua entró demasiado fría, o el filtro no se enjuagó, o las dos cosas.",
      fix: "Enjuaga siempre el papel y usa el agua a 85 °C. Si aun así queda corta, muele un punto más fino antes que alargar el remojo: este método está pensado para ser breve.",
    },
    {
      problem: "Queda café pegado en la pared del cilindro, por encima del agua",
      cause: "El chorro fue demasiado estrecho o cayó siempre en el mismo sitio.",
      fix: "Vierte moviendo la mano para cubrir toda la superficie, y usa la cuchara para bajar lo que se quedó arriba al remover.",
    },
  ],

  // Fuente: https://help.aeropress.com/en-US/why-are-there-numbers-(1-5)-on-the-chamber-of-aeropress-steel-if-you-can%E2%80%99t-see-the-coffee-inside-4841857
  // Cita textual: «The number markings are a recognizable part of the AeroPress design
  // and, by including them on Steel, we're protecting our trademark». Sin línea de fuente
  // visible en la página, igual que el dato curioso del V60.
  funFact: {
    text: "Todo el mundo da por hecho que los números del cilindro son mililitros. El fabricante no ha publicado nunca cuántos hay en cada raya, y cuando le preguntaron por qué los mantiene en el modelo de acero, donde no se ve el interior, contestó que son una parte reconocible del diseño y que así protege su marca.",
  },
};
