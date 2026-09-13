import type { BrewMethod } from "./types";

/**
 * Octavo método, y el que más lejos está de una cocina normal: hace falta un mechero de
 * alcohol, dos cuerpos de vidrio, un filtro de tela y un hervidor aparte. Está escrito
 * dando por hecho que la mayoría de quienes lo lean lo van a beber en una cafetería
 * antes que prepararlo, así que la ficha explica también qué están mirando cuando se lo
 * preparan delante.
 *
 * Lo que aporta al sitio y no aporta ningún otro método:
 *
 * - **Es el único que es inmersión y filtrado a la vez.** El café flota en agua como en
 *   una prensa francesa y después el líquido atraviesa una tela como en un colado. Los
 *   otros siete son una cosa o la otra.
 * - **Es el único donde no se elige la temperatura**, y no por lo mismo que la moka.
 *   Aquí el vaso de arriba está abierto al aire, así que el agua no puede pasar del
 *   punto de ebullición del sitio donde estés. En Bogotá eso son unos 91 °C.
 * - **Es el contrario exacto de la moka**, y las dos usan la presión del vapor. La moka
 *   trabaja en una caldera cerrada que se presuriza, y por eso no prepara a la
 *   temperatura de ebullición ni deja ver nada. El sifón sube el agua con el mismo
 *   empujón pero la suelta en un recipiente abierto, y ahí se ve todo. Ese contraste
 *   está contado en `grounding` y es lo mejor de la ficha.
 *
 * Sobre las cifras:
 *
 * - La receta sale del propio Hario, que para un aparato es la fuente primaria: 10 g de
 *   café por cada 120 ml de agua y unos 100 ml de café en la taza. De esos tres números
 *   sale además, por resta, que el molido retiene 2 g por gramo de café, que es
 *   exactamente la cifra que el sitio ya usaba para el V60.
 * - El tiempo de infusión, de 40 a 60 segundos, también es suyo.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **«El sifón prepara a una temperatura estable de 90–96 °C».** Circula en todas las
 *   guías y no encontramos ninguna medición publicada. Además la horquilla que citan no
 *   puede valer en todas partes, porque el techo depende de la altura a la que estés.
 *   La ficha explica el mecanismo —el vaso de arriba está abierto, así que hay un
 *   techo, y debajo sigue hirviendo, así que no se enfría— y no escribe ningún número
 *   propio salvo el punto de ebullición de Bogotá, que el sitio ya usa en otras cinco
 *   fichas.
 * - **La molienda.** Hario no la especifica en sus instrucciones. La ficha la sitúa en
 *   «media» como elección del sitio y por analogía con el colado en tela, que usa el
 *   mismo tipo de filtro abierto; no se presenta como dato del fabricante.
 * - **Quién lo inventó y por qué se llama japonés.** Las historias que circulan se
 *   contradicen entre sí —Berlín, Lyon, los años treinta del XIX— y no se pudo llegar a
 *   ningún documento. No se escribe nada de eso. Que en las cafeterías de aquí se le
 *   llame «sifón japonés» es una observación sobre cómo se le llama, no sobre su origen.
 *
 * Fuentes consultadas el 2026-09-13: instrucciones de Hario Europe para el sifón y
 * ficha del Coffee Syphon Technica en global.hario.com.
 */
export const sifon: BrewMethod = {
  slug: "sifon",
  name: "Sifón",
  tagline:
    "Dos bulbos de vidrio, un mechero de alcohol y el café subiendo solo por un tubo. Es el método más aparatoso que existe y el único donde se ve la extracción entera mientras ocurre: por eso te lo preparan delante en la barra y no en la cocina de tu casa.",
  image: {
    // Foto pendiente: la ruta ya está escrita y el archivo todavía no. Hasta que se
    // guarde, `resolveContentImage` deja el bloque de color en su sitio.
    file: "/images/metodos/sifon.jpg",
    alt: "Un sifón de café encendido sobre la barra de una cafetería: abajo la esfera de vidrio con la llama azul del mechero debajo, y arriba el vaso cilíndrico lleno de agua oscura con el café removiéndose en remolino. Una mano sostiene una varilla de bambú dentro del vaso de arriba. El vapor empaña el vidrio y al fondo se adivina la cafetería desenfocada.",
    credit: null,
  },

  /*
   * 62,5 sobre 100: nivel 2, y el más exigente de su nivel por bastante —el siguiente
   * es el V60 con 47,5—. Se queda a cuatro puntos del corte del nivel 3 y no se mueve
   * el corte, que son los tercios exactos de la escala.
   *
   * Conviene entender por qué no llega al nivel de la moka aunque sea muchísimo más
   * complicado de preparar: porque enseña todo lo que hace. Saca la complejidad más
   * alta del sitio, un 5 que ningún otro método tiene, y la compensa con la
   * observabilidad máxima. El nivel 3 es «no dan segunda oportunidad», y aquí las
   * oportunidades se ven venir: el agua que sube, el café que se hunde, la espuma.
   *
   * Es la mejor prueba que ha tenido el sistema de que los ejes miden cosas distintas.
   * Con un solo número habría habido que elegir entre «es el más difícil» y «es el que
   * más te acompaña», y las dos cosas son verdad a la vez.
   */
  difficulty: {
    cost: {
      value: 4,
      why: "Aquí se pierde la taza entera con facilidad: el filtro mal puesto deja pasar el poso, el tapón mal sellado impide que el agua suba y no hay café, y pasarse removiendo da una taza áspera que no se arregla. Y es el único método donde equivocarse puede además romper el vidrio.",
    },
    recovery: {
      value: 3,
      why: "Mientras el agua está arriba puedes remover, esperar o apartar el mechero, así que hay ventana de verdad. Pero dura un minuto escaso y se cierra de golpe: en cuanto quitas el fuego el café empieza a bajar y ya no hay nada que decidir.",
    },
    complexity: {
      value: 5,
      why: "Montar el filtro de tela y engancharlo, sellar el tapón, hervir el agua en otro sitio, encender el mechero, esperar a que suba, echar el café, removerlo con una técnica concreta, cronometrar, apartar el fuego y vigilar la bajada. Es el único método del sitio con fuego, con un segundo recipiente y con un gesto que hay que hacer mientras el agua ya está en contacto con el café.",
    },
    observability: {
      value: 5,
      why: "Es el método que más enseña de todos: ves el agua subir, el café empapándose, el remolino al remover, la espuma que se forma arriba y el café bajando por el tubo al final. Todo ocurre dentro de un vidrio transparente y a la altura de los ojos.",
    },
  },

  recipe: {
    /*
     * Los 15 g por taza del resto del sitio. Hario dosifica 10 g por taza suya de 100
     * ml, que es la misma proporción en una taza más pequeña: sus «tazas» no son las de
     * aquí, y eso va advertido en la casilla de rendimiento.
     */
    coffeeGramsPerCup: 15,
    /*
     * Los 2 g por gramo de café no son una estimación: salen de restar los números del
     * propio fabricante. Hario dosifica 120 ml de agua por cada 10 g de café y dice que
     * eso da una taza de 100 ml. Los 20 ml que faltan son los que se queda el molido, y
     * 20 entre 10 son 2. Coincide con la cifra que el sitio ya usaba para el V60, que
     * es lo que se espera cuando el fenómeno es el mismo.
     */
    waterRetainedPerGram: 2,
    // Sin hitos de vertido: el agua entra de una vez y en el bulbo de abajo.
    waterMarks: {},
    /*
     * Dos o tres, y el techo lo pone el aparato y no el gusto: los sifones domésticos
     * más comunes son de tres y de cinco tazas de las suyas, que son pequeñas. Con
     * cuatro tazas de las de este sitio no habría sifón doméstico donde meterlas.
     */
    cupOptions: [2, 3],
  },

  specs: {
    ratio: {
      /*
       * Fuente: Hario Europe, «An Introduction to Brewing with Siphons». Dosis por taza
       * de 100 ml: 10 g de café por 120 ml de agua. Eso es 1:12 exacto.
       *
       * Es de los pocos ratios del sitio que no hay que elegir: lo publica quien
       * fabrica el aparato, en gramos y mililitros, sin cucharadas de por medio.
       */
      value: "1:12",
      note: "{cafe} de café por {agua} de agua. Es el ratio del propio fabricante, no una elección de este sitio: Hario dosifica 10 g por cada 120 ml. Sale un café más concentrado que el de un V60, y no es casualidad: aquí el café pasa un minuto entero en remojo además de filtrarse.",
    },
    grind: {
      /*
       * ELECCIÓN DEL SITIO. Hario no especifica molienda en sus instrucciones. Se
       * sitúa en «media» por analogía con el colado en tela, que usa el mismo tipo de
       * filtro: tela abierta, que se tapona con el polvo y deja pasar los finos. No se
       * presenta como dato del fabricante.
       */
      value: "Media",
      note: "Como la arena de playa, la misma que el colado en tela. El fabricante no dice cuál usar, así que este sitio la sitúa donde la pide el filtro: la tela tiene los poros más abiertos que un papel, así que un molido muy fino se cuela en la taza y de paso tapona la tela, que es lo que hace que el café tarde una eternidad en bajar.",
    },
    waterTemperature: {
      /*
       * Esta casilla es el corazón de la ficha y por eso no lleva una horquilla en
       * grados. Las guías repiten «90–96 °C» sin ninguna medición detrás, y además esa
       * horquilla no puede valer en todas partes: el techo lo pone la altura.
       *
       * Lo que sí se puede afirmar es el mecanismo, y es comprobable razonando: el vaso
       * de arriba está abierto al aire, así que su agua está a presión atmosférica y no
       * puede pasar del punto de ebullición local. Los 91 °C de Bogotá son la cifra que
       * el sitio ya usa en otras cinco fichas.
       *
       * Ojo con confundir esto con la moka, que es el error que desmonta su ficha: allí
       * la caldera está CERRADA y se presuriza, así que no prepara en su punto de
       * ebullición. Aquí el recipiente donde se prepara está abierto. Son los dos
       * únicos métodos del sitio movidos por vapor y funcionan al revés.
       */
      value: "La del agua hirviendo",
      note: "No la eliges tú, y aquí eso es una ventaja. El vaso de arriba está destapado, así que el agua no puede pasar del punto en que hierve donde estés: en Bogotá, cerca de los 91 °C, que es justo la franja en la que quieres preparar café. Y como debajo se sigue hirviendo todo el rato, tampoco se enfría mientras extrae, que es lo que sí le pasa a un V60 desde el primer vertido.",
    },
    totalTime: {
      /*
       * El minuto de infusión es de Hario («brewing takes around 40-60 seconds»). Lo
       * que rodea a ese minuto —los segundos de remover al principio y lo que tarda en
       * bajar— es elección del sitio para cuadrar el cronómetro.
       *
       * Va en «m:ss» y con pasos cronometrados: aquí el reloj sí es una instrucción,
       * porque el minuto de infusión es corto y se pasa enseguida.
       */
      value: "1:45 – 2:00",
      note: "Desde que el café entra en el agua hasta que termina de bajar. La infusión en sí es la parte corta: de 40 a 60 segundos, que es lo que manda el fabricante. Todo lo anterior —montar, hervir, esperar a que suba— no entra en la cuenta.",
    },
    output: {
      value: "{rendimiento}",
      note: "Lo que baja al bulbo: el molido se queda con unos {retenida} de agua. Las tazas del catálogo de un sifón no son estas: las suyas son de unos 100 ml, así que uno de «5 tazas» no prepara cinco de las de aquí, sino tres.",
    },
    cupProfile: {
      value: "Redonda",
      note: "Es la mezcla de las dos familias del sitio, y se nota: tiene el cuerpo de una prensa francesa, porque el café ha estado en remojo, y la limpieza de un colado, porque al final atraviesa una tela. No deja poso como la prensa ni queda tan ligera como un V60. Es también la más caliente que vas a tomar, porque se sirve recién bajada de un vidrio que estaba al fuego.",
    },
  },

  /*
   * Seis piezas, la lista más larga del sitio. Eso es contenido y no un inconveniente:
   * es la respuesta a por qué este método vive en las barras y no en las casas. El
   * filtro de tela y el mechero vienen dentro de la caja del sifón, así que no hay que
   * comprarlos aparte, pero el mechero se rellena y la tela se cuida, y las dos cosas
   * están contadas en los errores comunes.
   */
  equipment: [
    {
      name: "Sifón",
      note: "Viene con su filtro de tela y su mechero dentro de la caja. Los de dos y tres tazas son los de casa; los de cinco, los de barra.",
      piece: "sifon",
    },
    {
      name: "Mechero de alcohol",
      note: "Se rellena con alcohol y la mecha se gasta. Da poco calor a propósito: no es para hervir el agua, sino para mantenerla arriba.",
      piece: "mechero-de-alcohol",
    },
    {
      name: "Varilla de bambú",
      note: "Para remover sin rayar el vidrio ni romper el lecho. Una cuchara de metal hace las dos cosas.",
      piece: "varilla-de-bambu",
    },
    {
      name: "Molino de muelas",
      note: "El polvo de un molino de cuchillas tapona la tela, y entonces el café no baja.",
      piece: "molino-de-muelas",
    },
    {
      name: "Báscula",
      note: "Se pesa una vez, antes de empezar: cuando el aparato está en marcha ya no hay tiempo.",
      piece: "bascula",
    },
    {
      name: "Hervidor de agua",
      note: "Sí, hace falta otro: el propio fabricante te dice que hiervas el agua aparte y la eches ya caliente en el bulbo.",
      piece: "hervidor",
    },
  ],

  steps: [
    {
      time: "Previo",
      title: "Monta el filtro de tela en el vaso de arriba",
      description:
        "Moja la tela con agua caliente, móntala en su plato metálico, métela en el vaso de arriba y engancha la cadenita al fondo del tubo, tirando hasta que el plato quede centrado en el agujero.",
      why: "Ese plato es lo único que separa el café molido de tu taza, y si queda torcido pasa el poso entero. La tela se moja antes por lo mismo que se enjuaga un filtro de papel: seca sabe a trapo y flota en vez de sellar.",
    },
    {
      time: "Previo",
      title: "Hierve {agua} de agua aparte y échala en el bulbo de abajo",
      description:
        "Hierve el agua en un hervidor normal y viértela ya caliente en la esfera de abajo. Seca el vidrio por fuera antes de ponerlo sobre el mechero.",
      why: "El mechero de alcohol da muy poco calor: calentar agua fría con él tardaría muchísimo, y lo dice el propio fabricante. Y el vidrio mojado por fuera puesto sobre una llama es la forma más fácil de que se raje.",
    },
    {
      time: "Previo",
      title: "Encaja el vaso de arriba y enciende el mechero",
      description:
        "Encaja el vaso de arriba con su tapón de goma, apretando hasta que selle, y pon el mechero encendido debajo. En un momento vas a ver el agua subir por el tubo hasta arriba.",
      why: "Esto es lo que hace el aparato entero y merece mirarlo: al hervir, el vapor ocupa sitio dentro del bulbo cerrado y empuja el agua líquida por el único camino que le queda, que es el tubo. El agua no sube porque tire nada desde arriba, sino porque la empujan desde abajo. Si el tapón no sella, el vapor se escapa por el lado y el agua no sube.",
    },
    {
      time: "0:00",
      title: "Echa {cafe} de café y remueve",
      description:
        "Con el agua ya arriba, echa el café molido de una vez y remueve con la varilla de bambú diez segundos, con cuidado, hasta que no quede café flotando seco.",
      why: "El café echado sobre el agua forma una costra que flota, y lo que está seco no se extrae. Removerlo es obligatorio aquí, no opcional. Con cuidado porque el vidrio está caliente y porque golpear la tela por abajo la descoloca.",
    },
    {
      time: "0:10 – 1:00",
      title: "Déjalo un minuto",
      description:
        "Deja que el café repose en el agua entre cuarenta segundos y un minuto, que es lo que manda el fabricante. Vas a ver la espuma formándose arriba.",
      why: "Esta es la parte en la que el sifón es una prensa francesa: el café está sumergido, no atravesado por un chorro. Por eso sale con más cuerpo que un goteo, y por eso un minuto basta: en inmersión el agua está en contacto con todo el café a la vez desde el primer segundo.",
    },
    {
      time: "1:00",
      title: "Aparta el mechero y remueve otra vez",
      description:
        "Quita el mechero de debajo y dale unas vueltas más con la varilla. El café va a empezar a bajar por el tubo casi enseguida.",
      why: "Aquí es donde el aparato se invierte, y también merece mirarlo: sin fuego, el vapor del bulbo de abajo se enfría y vuelve a ser agua, así que dentro queda menos cosa de la que había y la presión baja. Entonces el aire de fuera, que sigue pesando lo mismo, empuja el café hacia abajo a través de la tela. No es que el vacío tire: es que la atmósfera empuja.",
    },
    {
      time: "1:45",
      title: "Retira el vaso de arriba y sirve",
      description:
        "Cuando haya bajado todo, quita el vaso de arriba sujetándolo por su aro y sírvelo enseguida. El café que queda arriba, a la basura, y la tela a lavar.",
      why: "Si el café baja formando una cúpula limpia en el vidrio de arriba, la extracción fue pareja; si baja dejando un cráter en el centro, removiste de más o de menos. Es la única nota que te da el aparato y llega justo al final, pero sirve para la vez siguiente.",
    },
  ],

  commonMistakes: [
    {
      problem: "El agua no sube, o sube a medias",
      cause:
        "El tapón de goma no está sellando y el vapor se escapa por ahí en vez de empujar el agua.",
      fix: "Aprieta el vaso de arriba con un giro firme, sin forzar, y comprueba que la goma no esté reseca ni tenga posos pegados del café anterior. Si la goma está dura y agrietada, se cambia.",
    },
    {
      problem: "El café tarda muchísimo en bajar, o no baja",
      cause: "La tela está taponada: por molienda demasiado fina o por grasa vieja.",
      fix: "Abre un punto la molienda. Y lava la tela solo con agua muy caliente, sin jabón, guardándola sumergida en agua en la nevera o congelada; una tela que se seca al aire se llena de grasa rancia y deja de dejar pasar. Es el mismo cuidado que pide el colado en tela.",
    },
    {
      problem: "Queda poso en el fondo de la taza",
      cause: "El plato del filtro estaba descentrado y el café pasó por el borde.",
      fix: "Antes de empezar, tira de la cadenita hasta que el plato quede plano y centrado en el agujero del tubo. Se comprueba mirándolo desde arriba: tiene que estar horizontal, no apoyado en un lado.",
    },
    {
      problem: "Sabe áspera y amarga",
      cause:
        "Casi siempre, removiste de más o lo dejaste más de un minuto al fuego.",
      fix: "Dos removidas cortas: una al echar el café y otra al apartar el mechero. Entre medias no se toca. Y el minuto es un minuto: es el método del sitio donde treinta segundos de más se notan más rápido.",
    },
    {
      problem: "El vidrio se rajó",
      cause:
        "Cambio brusco de temperatura: vidrio mojado por fuera sobre la llama, o el bulbo caliente puesto sobre una superficie fría o bajo el grifo.",
      fix: "Seca siempre el bulbo por fuera antes de ponerlo al fuego y deja que se enfríe solo antes de lavarlo. Es el único método del sitio donde una distracción rompe el aparato y no solo la taza.",
    },
  ],

  /*
   * Fuente: Hario Europe, «An Introduction to Brewing with Siphons»: «Boil water in a
   * kettle (boiling the water ahead of time speeds things up considerably)».
   */
  funFact: {
    text: "El aparato más espectacular del café tiene una instrucción oficial que lo desinfla un poco: el propio fabricante te dice que hiervas el agua antes en otra olla y la eches ya caliente. El mechero de alcohol no está ahí para hervir nada, sino para mantener el agua arriba mientras extrae. Toda esa puesta en escena depende de un hervidor corriente fuera de cuadro.",
    source: "Hario Europe, instrucciones del sifón",
  },

  grounding: {
    body: [
      "La receta de esta ficha es del propio Hario, que para un aparato es la mejor fuente que hay: 10 g de café por cada 120 ml de agua, una taza de 100 ml y una infusión de cuarenta a sesenta segundos. De esos tres números sale además, restando, algo que no hace falta creerse: si entran 120 ml y salen 100, el café molido se queda con 20 por cada 10 g, o sea 2 g por gramo. Es exactamente la cifra que este sitio ya usaba para el V60, calculada por otro camino.",
      "Lo que no vas a encontrar aquí es la horquilla de temperatura que repiten todas las guías: «entre 90 y 96 grados, estable». No encontramos ninguna medición publicada detrás de esa cifra, y además no puede valer en todas partes, porque depende de dónde estés. Lo que sí se puede explicar, y se puede comprobar razonando, es por qué no hace falta el número.",
      "El vaso de arriba, donde el café se prepara, está destapado. Eso significa que el agua de dentro está a la presión del aire que te rodea, y un agua así no puede pasar del punto en el que hierve: si le das más calor, no se calienta más, se evapora. En Bogotá ese techo está cerca de los 91 °C. Y como debajo se sigue hirviendo mientras dure el mechero, tampoco se enfría. O sea que el sifón te deja el agua clavada justo debajo de su techo durante todo el rato que dura la extracción, y en esta ciudad ese techo cae dentro de la franja en la que quieres preparar café. No es que el aparato sea listo: es que la altura de Bogotá y el punto de ebullición se encargan por él.",
      "Merece la pena compararlo con la moka, porque son los dos únicos métodos del sitio movidos por vapor y funcionan justo al revés. En la moka el agua está en una caldera cerrada que se presuriza, y por eso su ficha desmonta la idea de que prepara a la temperatura de ebullición: un agua topada en su punto de ebullición no tendría con qué empujar. El sifón usa ese mismo empujón, pero lo gasta en subir el agua a un recipiente abierto, y una vez arriba el agua ya no está presurizada. Mismo principio, resultado contrario: la moka no deja ver nada y prepara a una temperatura que nadie ha medido; el sifón lo enseña todo y prepara a una temperatura que se puede deducir.",
      "Y la bajada, que es la parte que todo el mundo describe mal. No es que el vacío «chupe» el café. Al apartar el fuego, el vapor del bulbo de abajo se enfría y vuelve a ser agua líquida, que ocupa muchísimo menos sitio; entonces dentro del bulbo hay menos presión que fuera, y el aire de la habitación empuja el café hacia abajo a través de la tela. Lo que mueve el café en las dos direcciones es siempre una diferencia de presión, y la única bomba que hay en la mesa es la atmósfera.",
      "Sobre el nombre y la historia, poco: se le llama sifón japonés en las cafeterías de aquí, y eso es cierto como observación de cómo se le llama. Quién lo inventó es otra cosa; las historias que circulan se contradicen entre sí y no pudimos llegar a ningún documento que lo zanjara, así que esta ficha no cuenta ninguna.",
      "Lo último es por qué lo vas a beber en una barra y no en tu cocina, y la respuesta está en la lista de equipo: es la más larga del sitio, incluye fuego y un segundo hervidor, y el aparato se rompe si te distraes. En una cafetería eso no es un inconveniente sino la mitad del producto, porque el método se prepara delante de ti y se puede mirar entero. Si alguna vez te lo preparan, fíjate en el momento en que apartan el mechero: es cuando el aparato se invierte.",
    ],
    references: [
      {
        publisher: "Hario Europe",
        title:
          "An Introduction to Brewing with Siphons — dosis, tiempo de infusión y el aviso de hervir el agua aparte",
        url: "https://www.hario-europe.com/blogs/hario-community/an-introduction-to-brewing-with-siphons",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Hario",
        title:
          "Coffee Syphon Technica — ficha del producto y contenido de la caja (filtro de tela y mechero)",
        url: "https://global.hario.com/seihin/productdetail.php?product=TCA-2",
        retrieved: "2026-09-13",
      },
    ],
  },
};
