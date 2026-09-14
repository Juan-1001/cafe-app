import type { BrewMethod } from "./types";

/**
 * Séptimo método, y el primero que entra al sitio sabiendo de antemano que **no aporta
 * un mecanismo nuevo**. Eso no es un defecto de la ficha: es su contenido.
 *
 * La pregunta con la que se encargó era si el papel grueso de la Chemex tiene
 * consecuencias medibles. Se buscó, y la respuesta honesta es que no las tiene
 * publicadas:
 *
 * - **No hay ningún estudio revisado por pares que mida el efecto del gramaje del
 *   papel** sobre la extracción, el caudal o el sabor. Los hay comparando papel contra
 *   metal, y comparando V60 contra AeroPress contra prensa, pero la Chemex ni siquiera
 *   aparece en ellos.
 * - **La cifra que circula —«un 30 % más grueso»— no está ni en la web de Chemex.** Se
 *   revisaron sus instrucciones oficiales y sus preguntas frecuentes: el fabricante no
 *   publica gramaje, ni porcentaje, ni comparación con nadie. Las cifras concretas que
 *   se leen por ahí (100–125 g/m² contra 60–80, «entre un 15 % y un 25 % más lento»)
 *   salen del blog de una empresa que vende filtros, y nadie las ha medido.
 * - **Lo único documentado es una diferencia de instrucciones, no de resultado**: la
 *   Chemex manda moler «medium coarse» y Hario manda para el V60 un punto más fino.
 *   Son dos fabricantes diciendo cosas distintas sobre sus propios aparatos, que es un
 *   hecho comprobable; lo que no hay es nadie que haya medido en qué se traduce.
 *
 * Así que esta ficha no afirma que la Chemex dé una taza más limpia que el V60. Declara
 * el mismo perfil de taza que el V60 a propósito, y explica por qué. El mecanismo es el
 * mismo, el gesto es el mismo, y lo que de verdad cambia es el objeto: la escala a la
 * que prepara y que la jarra en la que se cuela es la misma en la que se sirve. Por eso
 * se la encuentras en una cafetería y no en una cocina, y por eso esta ficha está
 * escrita para quien va a beberla allí.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **«Los filtros son un 30 % más gruesos» y «filtran entre un 15 % y un 25 % más
 *   despacio».** Ver arriba. No se escribe ninguna de las dos, y en `grounding` se
 *   cuenta por qué, que es más útil que la cifra.
 * - **«Retiene más aceites, así que la taza es más limpia».** El mecanismo es
 *   plausible —más celulosa, más superficie donde quedarse— pero nadie lo ha medido en
 *   este papel. Se queda fuera, y de ahí que `cupProfile` diga lo mismo que el V60.
 * - **Un tiempo total oficial.** Chemex no publica ninguno. El «4 a 6 minutos» que se
 *   repite no tiene dueño, así que el rango de la ficha es elección del sitio, dicha
 *   como tal, igual que el 1:15 del AeroPress.
 *
 * Fuentes consultadas el 2026-09-13: instrucciones oficiales y preguntas frecuentes de
 * chemexcoffeemaker.com; ficha de la Chemex en la colección del MoMA (objeto 1847).
 */
export const chemex: BrewMethod = {
  slug: "chemex",
  name: "Chemex",
  tagline:
    "La jarra de vidrio con collar de madera que has visto en media Bogotá. Por dentro es el mismo método que el V60 —agua caliente cayendo sobre papel— pero hace café para tres y se sirve en la misma jarra en la que se cuela, y por eso es la que te llevan a la mesa.",
  image: {
    /*
     * IMAGEN GENERADA CON IA, provisional, de la misma serie que el resto de portadas.
     * El aparato está bien dibujado, que en esta ficha importa más que en otras: se ve
     * la jarra de una sola pieza en reloj de arena, el collar de madera con su correa de
     * cuero anudada y el filtro grueso abierto, que es de lo que habla el texto.
     *
     * Difiere de lo que se había escrito a ciegas en que nadie está vertiendo: el café
     * ya está colando solo. Y hay un vaso con hielo al lado que la ficha no menciona,
     * porque esta ficha es de café caliente; no estorba, pero si algún día se regenera,
     * sobra.
     */
    file: "/images/metodos/chemex.png",
    alt: "Una Chemex sobre una mesa de madera gastada: una jarra de vidrio de una sola pieza con forma de reloj de arena, con el collar de madera clara ceñido por una correa de cuero anudada con una cuenta. Arriba lleva puesto el filtro de papel blanco y grueso con el café molido dentro, y por el cuello cae un hilo de café al cuerpo de abajo, que ya tiene una capa hecha. Al lado, un vaso con hielo y café, dos tazas claras y la tapa metálica de un frasco. A la izquierda, la ventana de la cocina con una planta.",
    credit: { source: "IA" },
  },

  /*
   * 45,0 sobre 100: nivel 2, y empata exactamente con el AeroPress. El empate es
   * legítimo y conviene dejarlo escrito, porque a primera vista parece un error: son
   * dos métodos que no se parecen en nada y llegan al mismo número por caminos
   * opuestos. El AeroPress suma por lo poco que deja ver y lo poco que deja rectificar;
   * la Chemex suma por lo caro que sale equivocarse en un vertido. Eso es justo lo que
   * un sistema de cuatro ejes permite decir, y lo que un número a mano no podía.
   *
   * El orden del índice entre los dos lo decide el nombre, que es el desempate que
   * `brewMethodsByDifficulty` ya tenía previsto.
   *
   * Queda 2,5 puntos por debajo del V60, y esa diferencia está entera en un eje: lo que
   * deja ver. No se ha inventado nada para separarlos; si la Chemex hubiera sacado las
   * mismas cuatro notas que el V60, habría empatado con él y también habría estado bien.
   */
  difficulty: {
    cost: {
      value: 4,
      why: "Los mismos errores que el V60 y al mismo precio: un vertido desde muy alto, un lecho desigual o medio minuto de más dan una taza amarga o aguada, y no hay forma de saberlo hasta probarla. Aquí además se estropean tres tazas de una vez.",
    },
    recovery: {
      value: 4,
      why: "Se vierte en tiempo real y durante varios minutos: si el agua baja demasiado deprisa o se queda parada, cambias el chorro a mitad de camino y el café todavía no está decidido. La puerta se cierra cuando pasa la última agua.",
    },
    complexity: {
      value: 3,
      why: "Un paso menos que el V60: sus instrucciones oficiales piden floración y después un solo vertido largo, sin tandas con sus tiempos. A cambio hay un gesto que el V60 no tiene, doblar el filtro y poner el lado de tres capas sobre el pico.",
    },
    observability: {
      value: 4,
      why: "Se ve el lecho desde arriba y el café subiendo por el vidrio de abajo, pero el fondo del cono queda escondido dentro del cuello de la jarra: es lo único que el V60 enseña y esta no, la velocidad a la que gotea.",
    },
  },

  recipe: {
    coffeeGramsPerCup: 15,
    /*
     * Los mismos 15 g por taza que el resto de métodos que calculan, que es la unidad
     * que de verdad comparte el sitio.
     *
     * Ojo con esto al leer la ficha: las «tazas» que trae escritas una Chemex de
     * fábrica NO son estas. El fabricante dosifica «for every 5 oz. cup», o sea tazas
     * de unos 150 ml, más pequeñas que las de aquí. Una Chemex de 6 tazas de catálogo
     * no hace seis de estas. Va advertido en la casilla de rendimiento, que es donde
     * alguien se lo puede creer.
     */
    waterRetainedPerGram: 2,
    // La misma pérdida que el V60 y por lo mismo: el agua que se quedan el molido y el
    // papel. La jarra se sirve entera, así que no hay nada más que descontar.
    waterMarks: { floracion: 3 },
    /*
     * Desde dos tazas, no desde una: el cono de una Chemex es ancho y con el café de
     * una sola taza el lecho queda tan fino que el agua lo atraviesa sin mojarlo
     * entero. Es el mismo motivo por el que la prensa francesa tiene mínimo.
     */
    cupOptions: [2, 3, 4],
  },

  specs: {
    ratio: {
      /*
       * ELECCIÓN DEL SITIO, y elegida a propósito igual que la del V60.
       *
       * Chemex sí publica una dosis, pero es volumétrica y no se puede convertir en
       * gramos sin inventarse algo: «Put one rounded tablespoon of ground coffee for
       * every 5 oz. cup». Una cucharada colmada no es una medida, y de ahí no sale un
       * ratio.
       *
       * Se podría haber elegido un 1:15 para insinuar que la Chemex pide más café que
       * el V60. No hay ni un documento que lo sostenga, así que habría sido fabricar
       * una diferencia. Comparten ratio porque comparten mecanismo, y que el lector lo
       * vea es parte de lo que esta ficha enseña.
       */
      value: "1:16",
      note: "{cafe} de café por {agua} de agua: exactamente el mismo ratio que el V60, y no por pereza. Chemex no publica ninguna proporción en gramos —su instrucción oficial es «una cucharada colmada por cada taza de 5 onzas», que no se puede pesar—, y no hay ningún estudio que diga que este cono pida otra cosa. Así que el sitio elige la misma que el V60 en vez de inventarse una diferencia.",
    },
    grind: {
      /*
       * Fuente: instrucciones oficiales de Chemex, «Grind your favorite whole bean
       * coffee to a medium coarse ground».
       *
       * Esto abre un escalón nuevo en la escala de molienda del sitio, que hasta ahora
       * iba media-fina · media · gruesa. Se abre porque lo pide un fabricante por
       * escrito, no porque quedara bonito tener más escalones: la Chemex es el único
       * método del sitio cuyo fabricante manda un punto concreto entre la media y la
       * gruesa.
       *
       * Lo que NO se escribe, porque no está medido: que el punto más grueso sea
       * *consecuencia* del papel más grueso. Encaja con el mecanismo —más resistencia,
       * más lento, molienda más abierta para compensar— y es lo que todo el mundo
       * repite, pero nadie lo ha comprobado.
       */
      value: "Media-gruesa",
      note: "Entre la del V60 y la de la prensa francesa: más abierta que el azúcar de mesa y sin llegar a la sal marina. Es el punto que manda el propio fabricante, y es el único sitio donde sus instrucciones se separan de las de Hario para el V60, que pide un punto más fino.",
    },
    waterTemperature: {
      value: "92–94 °C",
      note: "La misma que el V60, porque es el mismo mecanismo. En Bogotá el agua hierve cerca de los 91 °C, así que puedes usarla apenas la retiras del fuego y no hay forma de pasarse.",
    },
    totalTime: {
      /*
       * ELECCIÓN DEL SITIO. Chemex no publica ningún tiempo, ni en sus instrucciones ni
       * en sus preguntas frecuentes. El «4 a 6 minutos» que se repite no tiene dueño.
       *
       * El rango de aquí sale de encajar sus propias instrucciones —floración de 30 s y
       * después un vertido continuo— con la cantidad de agua de dos o tres tazas de
       * este sitio. Va en «m:ss» y con pasos cronometrados porque aquí el reloj sí es
       * una instrucción: es un vertido en tiempo real.
       */
      value: "4:00 – 4:30",
      note: "Desde la floración hasta que el cono deja de gotear, para dos o tres tazas. Es un rango elegido por este sitio: el fabricante no publica ninguno.",
    },
    output: {
      value: "{rendimiento}",
      note: "Lo que llega a la jarra: el molido y el papel se quedan con unos {retenida} de agua. Cuidado con las tazas que trae escritas la Chemex de fábrica, porque no son estas: las suyas son de unas 5 onzas, así que una de 6 tazas de catálogo no hace seis de las de este sitio, sino menos de la mitad.",
    },
    cupProfile: {
      /*
       * El mismo valor que el V60, y es la decisión más importante de la ficha.
       *
       * Lo esperable habría sido escribir «Muy limpia» y dejar caer que el papel grueso
       * retiene más. Nadie lo ha medido. Escribir aquí un superlativo habría sido
       * afirmar con una palabra lo que no se puede afirmar con un número, y el sitio ya
       * tiene una regla para esto: dos cosas que se presentan igual afirman que dicen
       * lo mismo. Aquí dicen lo mismo de verdad.
       */
      value: "Limpia",
      note: "La misma que el V60, y está escrito así a propósito. Vas a leer en todas partes que la Chemex da una taza más limpia porque su papel es más grueso; puede que sea cierto, pero nadie lo ha medido y aquí no se afirma lo que no se puede comprobar. Lo que sí puedes notar tú mismo si las pruebas al lado es cuánto se parecen.",
    },
  },

  /*
   * Cinco piezas, y tres son las mismas del V60. La lista es otra manera de decir lo
   * que dice la ficha entera: lo que cambia entre los dos métodos es la jarra y el
   * papel, y nada más.
   */
  equipment: [
    {
      name: "Chemex",
      note: "De 6 tazas si vas a preparar para más de una persona. Es de una pieza: no hay cono que comprar aparte ni jarra debajo.",
      piece: "chemex",
    },
    {
      name: "Filtros Chemex",
      note: "Los suyos y no otros: son cuadrados y se doblan en un cono con tres capas de un lado. Un filtro de V60 no encaja aquí.",
      piece: "filtros-chemex",
    },
    {
      name: "Molino de muelas",
      note: "Un punto más grueso que para el V60, que es lo que manda el fabricante.",
      piece: "molino-de-muelas",
    },
    {
      name: "Báscula",
      note: "Sin báscula te quedas con «una cucharada colmada», que es justamente la instrucción que no se puede repetir dos veces igual.",
      piece: "bascula",
    },
    {
      name: "Hervidor de cuello de cisne",
      note: "El cono es ancho y el chorro hay que llevarlo en círculos hasta el borde: aquí el pico fino se nota más que en el V60.",
      piece: "hervidor-cuello-cisne",
    },
  ],

  steps: [
    {
      time: "Previo",
      title: "Dobla el filtro y ponlo con las tres capas sobre el pico",
      description:
        "El filtro viene cuadrado y doblado en cuatro. Ábrelo en cono de manera que un lado quede con tres capas de papel y el otro con una sola, y coloca el lado grueso tapando el pico vertedor de la jarra.",
      why: "Es el único gesto que este método tiene y el V60 no, y no es decorativo: el canal que queda entre el papel y el vidrio, del lado de una sola capa, es por donde sale el aire mientras entra el agua. Con el filtro puesto al revés, el aire no encuentra salida y el agua se queda arriba. Lo dice el propio fabricante en su primera instrucción.",
    },
    {
      time: "Previo",
      title: "Enjuágalo con agua caliente y tira esa agua",
      description:
        "Moja el papel entero con agua del hervidor, deja que escurra a la jarra y después tírala antes de echar el café.",
      why: "El papel recién sacado de la caja sabe a papel, y este tiene tres capas de él justo encima del pico. Enjuagarlo además pega el filtro al vidrio y calienta la jarra, que es de una sola pieza y entra fría en contacto con el café.",
    },
    {
      time: "Previo",
      title: "Muele {cafe} de café, media-gruesa",
      description:
        "Un punto más abierto que para el V60: más que azúcar de mesa y menos que sal marina. Échalo en el filtro y sacude la jarra para que el lecho quede plano.",
      why: "Un lecho torcido hace que el agua busque el lado bajo y se salte el resto del café, y en un cono tan ancho como este eso se nota más que en el V60. Es el error más común de cualquier método de goteo y se arregla antes de empezar.",
    },
    {
      time: "0:00",
      title: "Floración: {floracion} de agua y espera",
      description:
        "Echa {floracion} de agua en círculos, lo justo para mojar todo el café, y espera unos treinta segundos. Vas a ver el lecho hincharse y soltar burbujas.",
      why: "El café recién molido tiene gas atrapado del tueste, y ese gas empuja el agua para afuera. Si no lo dejas salir primero, el agua del vertido grande resbala por encima en vez de atravesar el café. Los treinta segundos son los que manda el fabricante.",
    },
    {
      time: "0:45 – 2:30",
      title: "El vertido largo, hasta {agua}",
      description:
        "Sigue echando agua despacio, en círculos o de lado a lado, hasta llegar a {agua} en total. Mantén el nivel más o menos constante y no dejes que el lecho se seque del todo entre vueltas.",
      why: "Aquí está la diferencia de gesto con el V60: allí son tandas con sus tiempos, y aquí el fabricante pide un solo vertido continuo. Mojar por igual es todo el trabajo, porque el agua siempre va a buscar el camino más fácil y el tuyo es impedírselo.",
    },
    {
      time: "2:30 – 4:00",
      title: "Deja que termine",
      description:
        "Cuando hayas echado toda el agua, no toques nada. El cono va a seguir goteando un rato largo, bastante más que un V60.",
      why: "Aquí es donde se nota el papel, aunque no de la forma que cuentan las tiendas: tarda más, y eso sí lo ves. Lo que nadie ha medido es en qué se traduce esa lentitud dentro de la taza.",
    },
    {
      time: "4:00",
      title: "Saca el filtro y sirve",
      description:
        "Retira el filtro con el café dentro, tíralo y remueve la jarra antes de servir. Se sirve de la misma jarra.",
      why: "Lo primero que cae es mucho más concentrado que lo último y se queda en capas, así que sin remover la primera taza y la última no saben igual. Y no dejes el filtro escurriendo dentro: lo que suelta al final es lo más amargo.",
    },
  ],

  commonMistakes: [
    {
      problem: "El agua se queda arriba y no baja",
      cause:
        "Casi siempre el filtro está mal puesto, con el lado de tres capas fuera del pico, y el aire no tiene por dónde salir.",
      fix: "Levanta el filtro un dedo para que entre aire, y la próxima vez colócalo con el lado grueso tapando el pico. Si el filtro está bien puesto, entonces el café está molido demasiado fino.",
    },
    {
      problem: "Sabe aguada aunque usé el café de siempre",
      cause: "El agua encontró un camino y se lo quedó, o el lecho estaba torcido.",
      fix: "Sacude la jarra para aplanar el café antes de empezar y vierte en círculos hasta cerca del borde, sin quedarte siempre en el centro. En un cono tan ancho, verter solo en el medio deja el café de fuera casi sin usar.",
    },
    {
      problem: "Sabe amarga",
      cause:
        "Molienda demasiado fina para este cono, o el filtro se quedó escurriendo hasta la última gota.",
      fix: "Abre un punto la molienda, hacia la sal marina. Y retira el filtro cuando deje de caer chorro, sin esperar a las últimas gotas.",
    },
    {
      problem: "El café se enfría enseguida",
      cause: "La jarra es de vidrio, de una pieza y sin nada que la aísle.",
      fix: "Enjuaga el papel con agua caliente antes de empezar, que de paso calienta la jarra, y calienta también las tazas. Es el precio de servir en el mismo recipiente en el que se cuela.",
    },
    {
      problem: "Compré filtros de V60 y no encajan",
      cause: "No son compatibles, y no es un capricho de marca.",
      fix: "Los de Chemex son cuadrados y se doblan en un cono con un lado de tres capas, que es lo que forma el canal de aire contra el vidrio. Un filtro cónico normal no lo forma.",
    },
  ],

  /*
   * Fuente: ficha del objeto en la colección del MoMA (objeto 1847), que da el autor y
   * el año, y la ficha de autor del mismo museo, que dice que Schlumbohm era químico y
   * que la forma viene del material de laboratorio, el matraz Erlenmeyer entre otros.
   *
   * MATIZ SOBRE CÓMO SE LEYÓ: moma.org devuelve 403 a cualquier consulta automática,
   * así que sus dos páginas se leyeron a través del índice de un buscador y no
   * abriéndolas directamente. Lo que se cita es lo que esas páginas dicen de sí mismas
   * —el título del objeto es «Peter Schlumbohm. Chemex Coffee Maker. 1941»— y no una
   * interpretación. Quien quiera confirmarlo tiene que abrirlas en un navegador; el
   * script `verificar-fuentes` va a marcar ese enlace como «para mirar a mano» siempre,
   * y eso es correcto, no un fallo.
   *
   * Lo que NO se escribe: desde cuándo está en la colección. La ficha dice que fue una
   * donación pero no vimos el año de ingreso, así que el texto dice que está, no desde
   * cuándo. Es la diferencia entre citar y rellenar.
   *
   * Va sin línea de fuente visible, igual que el del V60 y el del AeroPress: el texto
   * ya dice quién lo sostiene.
   */
  funFact: {
    text: "La Chemex no la diseñó nadie del mundo del café: la inventó en 1941 un químico, Peter Schlumbohm, copiando la forma del material de su laboratorio —un matraz Erlenmeyer con un embudo encima—. Está en la colección del MoMA, así que probablemente sea el único objeto de tu cocina que también es una pieza de museo.",
  },

  grounding: {
    body: [
      "Esta ficha está escrita sobre las instrucciones oficiales de Chemex —doblar el filtro con las tres capas sobre el pico, moler medium coarse, florear treinta segundos y después verter despacio— y sobre la ficha del V60 de este mismo sitio, porque por dentro son el mismo método. Conviene decirlo así de claro desde el principio, porque no es lo que vas a leer en otros lados.",
      "La pregunta con la que se escribió esta ficha era si el papel grueso de la Chemex cambia algo que se pueda medir. La respuesta, después de buscarlo, es que no lo sabemos, y que nadie lo sabe. No hay ningún estudio revisado por pares que mida qué le hace el gramaje de un filtro a la extracción, al caudal o al sabor. Los hay comparando papel contra metal, y comparando unos métodos con otros, pero la Chemex no aparece en ellos.",
      "Lo más llamativo es dónde no está la cifra famosa. El «30 % más grueso» que se repite en cada tienda y cada blog no aparece en la web de Chemex: se revisaron sus instrucciones y sus preguntas frecuentes y el fabricante no publica gramaje, ni porcentaje, ni comparación con nadie. Los números más concretos que encontramos —tantos gramos por metro cuadrado, «entre un 15 % y un 25 % más lento»— salen del blog de una empresa que vende filtros. Eso no es una medición: es una tienda describiendo su producto.",
      "Lo que sí está documentado es más modesto y más útil: dos fabricantes que mandan cosas distintas. Chemex dice medium coarse y Hario pide para el V60 un punto más fino. Eso es un hecho comprobable, está en sus dos páginas, y es la razón por la que esta ficha manda moler un punto más abierto. Lo que no se puede decir es que esa diferencia de instrucciones sea consecuencia del papel, ni en qué se traduce dentro de la taza. Encaja con el mecanismo —más capas de celulosa, más resistencia, agua más lenta— y sigue sin estar medido.",
      "Por eso encontrarás en la ficha técnica el mismo ratio y el mismo perfil de taza que en el V60. No es pereza: es lo único que se puede sostener. Si hubiéramos escrito «muy limpia» aquí y «limpia» allá, habríamos afirmado con un adjetivo justo lo que no podemos afirmar con un número. Si algún día alguien lo mide, este es el párrafo que hay que reescribir.",
      "Entonces, ¿para qué sirve conocerla? Para dos cosas muy concretas. La primera es que, si ya sabes usar un V60, ya sabes usar una Chemex: cambia el tamaño del cono, la forma del papel y poco más, y ahorrarte el aprendizaje entero es un dato útil. La segunda es la que explica por qué la ves en las cafeterías de Bogotá y no en las cocinas: es la única jarra del sitio donde se cuela y se sirve en el mismo recipiente, y prepara para tres o cuatro de un tirón. Un barista puede colarla delante de ti y llevarla entera a la mesa. Esa es su ventaja real, y no tiene nada que ver con el papel.",
    ],
    references: [
      {
        publisher: "Chemex",
        title:
          "How to brew with CHEMEX — instrucciones oficiales: molienda, doblado del filtro y floración",
        url: "https://chemexcoffeemaker.com/pages/how-to-brew-with-chemex",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Chemex",
        title:
          "Preguntas frecuentes de Chemex — consultadas para comprobar que no publican ningún dato del filtro",
        url: "https://chemexcoffeemaker.com/pages/faq",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Museum of Modern Art",
        title:
          "Peter Schlumbohm, Chemex Coffee Maker, 1941 — ficha del objeto en la colección",
        url: "https://www.moma.org/collection/works/1847",
        retrieved: "2026-09-13",
      },
    ],
  },
};
