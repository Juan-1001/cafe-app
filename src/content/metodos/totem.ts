import type { BrewMethod } from "./types";

/**
 * Noveno método del sitio, y el que entró sabiendo que mecánicamente no aporta nada.
 *
 * ## Por qué está aquí, dicho sin adornos
 *
 * El Tótem **no es un V60 con otra forma: es una Kalita con otra forma**. El propio
 * fabricante lo dice en su página de producto —«El dripper utiliza un filtro Kalita
 * Wave #155»—, y un filtro Wave del 155 significa fondo plano y pared plisada, no cono.
 * O sea que el criterio por el que en su día se descartaron la Chemex y la Kalita se
 * aplica aquí de lleno. Se asumió a sabiendas.
 *
 * Lo único que enseña y que ninguna otra ficha puede enseñar no va de extracción, va de
 * lo que se ve: **es el primer método filtrado del sitio que es transparente por arriba
 * y ciego por abajo**. En el V60 se ve el lecho, el nivel, el caudal del goteo y el café
 * subiendo por el vidrio; en la Chemex ya se pierde el caudal; aquí el café cae dentro
 * de cerámica opaca y no se ve nada de la mitad de abajo. Eso enseña, por contraste, que
 * la mitad de lo que se aprende con un V60 no la enseña el cono sino la jarra, y es
 * exactamente lo único que separa la puntuación de los dos métodos: ver `difficulty`.
 *
 * El segundo hilo, más pequeño pero comprobable en fuente primaria: un dripper no define
 * su propia geometría, la define el filtro que admite. Lo mexicano aquí es la cerámica y
 * el sistema de cuatro piezas, no la forma de filtrar.
 *
 * ## Sobre las cifras
 *
 * **El fabricante no publica ninguna receta.** Su página del Método Tótem es un texto
 * sobre el ritual —«un tótem es símbolo, es fuerza, es algo sagrado»— y no tiene ni una
 * cifra: ni gramos, ni ratio, ni temperatura, ni tiempo, ni molienda, ni vertidos. Lo
 * que circula son dos recetas de terceros que **se contradicen entre sí**:
 *
 * - Shift Coffee, una tienda que lo revende: 20 g, 320 ml, 1:16, tres vertidos,
 *   molienda media-fina.
 * - Otra fuente secundaria: 15 g, 225 g, 1:15, 90 °C, molienda de 600 µm.
 *
 * Dos fuentes secundarias que se contradicen es certeza BAJA, así que la receta entera
 * de esta ficha es **una elección declarada de este sitio**, igual que la del colado en
 * tela, y así lo dice el bloque `grounding`, que se ve en la página. Los 15 g por taza
 * son la base común con el V60, la prensa, el AeroPress y el colado, para que la
 * calculadora compare métodos y no cucharadas.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **El año de fundación de Arta Cerámica.** Su propia página dice diciembre de 2005 y
 *   dos fundadoras; Designaholic, que visitó el taller, escribe «Arta comenzó en el 2004
 *   bajo la iniciativa de 3 diseñadores industriales; Marta Ruiz, Gloria Rubio y Diego
 *   San Vicente». Se contradicen en el año y en cuánta gente. No se escribe ninguno: la
 *   ficha dice quiénes son y de dónde salen, que es lo que las dos fuentes sostienen.
 *   Como rastro para quien vuelva a esto: la exposición del MUMEDI celebra «20 años» en
 *   diciembre de 2025, lo que encaja con el 2005 que declara Arta, pero un aniversario
 *   redondo no es un documento de fundación y no basta para cerrar la contradicción.
 * - **«El primer método 100 % mexicano».** Superlativo repetido por las tiendas y sin
 *   ningún documento detrás. No se afirma: se atribuye a Arta dentro del texto visible,
 *   que es donde el lector puede ver quién lo dice.
 * - **«Excelente retención térmica».** Es la frase publicitaria del fabricante y nadie ha
 *   publicado una curva de temperatura de esta cerámica. Fuera. Lo que sí se dice, en el
 *   primer paso, es lo mismo que ya dice el V60 de su cono: una pieza fría le roba calor
 *   al agua. Eso es mecanismo, no una afirmación sobre este material en concreto.
 * - **«El fondo plano extrae más parejo que un cono».** Se repite en todas las tiendas y
 *   no hay medición publicada. No se escribe como dato; se cuenta en `cupProfile` por qué
 *   no es fiable, que enseña más.
 *
 * Fuentes consultadas el 2026-09-13. **No se pudo abrir la página de Shift Coffee**: el
 * dominio no resolvió en dos intentos, así que su receta se conoce por buscador y no por
 * lectura directa. Como esa receta no se escribe en ninguna parte —es la que se declara
 * descartada— no contamina nada, pero conviene saberlo si algún día alguien la recupera.
 * Las cuatro fuentes que sí se leyeron van completas en `grounding.references`.
 */
export const totem: BrewMethod = {
  slug: "totem",
  name: "Tótem",
  tagline:
    "Cuatro piezas de cerámica artesanal que se apilan una dentro de otra: base, jarra, dripper y taza. Lo diseñó una ceramista en Ciudad de México, y es el único método del sitio donde ves perfectamente la mitad de arriba y absolutamente nada de la de abajo.",
  image: {
    /*
     * IMAGEN GENERADA CON IA, provisional, como el resto de portadas de método.
     *
     * Lo que la imagen NO deja comprobar, y aquí importa el doble por ser sintética: si
     * el dripper es de fondo plano. El filtro plisado lo tapa entero. Que lo es se sabe
     * por el fabricante, no por este dibujo. Tampoco hay que fiarse de la báscula, que
     * marca dos tiempos distintos a la vez: es de las cosas que la IA dibuja mal sin que
     * se note. Por eso el texto alternativo describe lo dibujado y no el objeto real.
     */
    file: "/images/metodos/totem.png",
    alt: "Sobre una encimera de madera gastada junto a una ventana, una mano vierte agua caliente desde un hervidor blanco de cuello de cisne sobre un filtro de papel plisado puesto en un dripper de cerámica color terracota. El dripper está apilado sobre una jarra de cerámica verde salvia y esta sobre una base gris claro, y el conjunto descansa en una báscula negra con pantalla. Dentro del filtro, el café molido mojado forma una costra con burbujas de la que sube vapor. A la derecha hay una taza de cerámica color crema; a la izquierda, en el alféizar, un jarrón verde con una planta.",
    credit: { source: "IA" },
  },

  /*
   * 52,5 sobre 100, nivel 2. Queda entre el V60 (47,5) y el sifón (62,5): el método más
   * exigente del sitio de los que se vierten a mano.
   *
   * Lo que lo pone ahí es una sola nota, la de observabilidad, y eso es a propósito:
   * tiene los mismos gestos que un V60 y se puntúa por encima porque se prepara a ciegas
   * de cintura para abajo. Si alguien discute esta clasificación dentro de un año, la
   * nota que hay que discutir es esa.
   *
   * Dos avisos que quedaron abiertos al puntuarlo y conviene no perder:
   *
   * 1. **La complejidad se apoya en una receta de certeza baja.** El 4 lo sostiene
   *    «floración y tres vertidos con sus tiempos», y los tres vertidos vienen de una
   *    tienda, no del fabricante. Desde que la receta es una elección declarada del
   *    sitio, la nota se apoya en nuestra propia receta: es coherente, pero no es lo
   *    mismo que apoyarse en un documento. Con un 3, el Tótem empataría con el V60 en
   *    47,5. Se eligió el 4 porque el anclaje del 4 dice literalmente «varios pasos con
   *    sus tiempos y un gesto que hay que sostener con la mano», que es esto.
   * 2. **El 3 de observabilidad se fijó contra la Chemex.** Si perder una señal —el
   *    caudal del goteo— vale un 4, perder las tres de abajo no puede valer más.
   */
  difficulty: {
    cost: {
      value: 4,
      why: "Los mismos errores que el V60 y la Chemex y al mismo precio: un vertido desde muy alto, un lecho desigual o medio minuto de más dan una taza amarga o aguada, y no hay forma de saberlo hasta probarla.",
    },
    recovery: {
      value: 4,
      why: "Se vierte por tandas y en tiempo real: un vertido flojo se corrige en el siguiente y siempre queda alguno por delante. La puerta se cierra cuando pasa la última agua.",
    },
    complexity: {
      value: 4,
      why: "Floración y tres vertidos con sus tiempos, sosteniendo el chorro con la mano. El fondo plano perdona mejor que un cono dónde cae el agua, pero eso no quita ningún paso de la lista.",
    },
    observability: {
      value: 3,
      why: "Ve el lecho, la floración y el nivel del agua igual que un V60, y a partir de ahí nada: el café cae dentro de cerámica opaca. No hay caudal que leer, ni líquido subiendo, ni forma de saber cuánto llevas hasta que levantas el dripper.",
    },
  },

  recipe: {
    coffeeGramsPerCup: 15,
    // La misma pérdida que el V60 y por lo mismo: lo que se quedan el molido y el papel.
    // El dripper se vacía entero en la jarra, así que no hay nada más que descontar.
    waterRetainedPerGram: 2,
    /*
     * Gramos de agua por gramo de café, acumulados: {vertido1} es el total que tiene que
     * marcar la báscula al terminar ese vertido, no lo que se echa en él.
     */
    waterMarks: { floracion: 3, vertido1: 9, vertido2: 12 },
    /*
     * Una sola taza, y el techo lo pone la jarra. No es una elección editorial: la jarra
     * del Tótem son 300 ml (fabricante), y dos tazas de esta receta serían 30 g de café y
     * 450 g de agua, que dejarían unos 390 ml en una jarra donde caben 300. Con una taza
     * el rendimiento son 195 ml y sobra sitio.
     *
     * Es el mismo caso que el AeroPress: el aparato manda y el selector enseña un solo
     * número porque solo hay uno que sea verdad.
     */
    cupOptions: [1],
  },

  specs: {
    ratio: {
      /*
       * ELECCIÓN DEL SITIO, NO DATO MEDIDO, igual que la del AeroPress y la del cold
       * brew. El fabricante no publica ratio y las dos recetas de terceros que circulan
       * no coinciden (1:16 y 1:15). Ver el comentario de cabecera.
       *
       * Se eligió el 1:15 y no el 1:16 por una razón que sí sale de un dato primario:
       * deja el rendimiento más lejos del techo de 300 ml de la jarra.
       */
      value: "1:15",
      note: "{cafe} de café por {agua} de agua. Es la proporción de este sitio y no la de nadie más: quien fabrica el Tótem no publica ninguna receta.",
    },
    grind: {
      value: "Media",
      note: "Un punto más gruesa que la del V60: se siente como arena de playa. El fondo plano reparte la misma cantidad de café en una capa más ancha y más baja que la de un cono, y con molienda fina esa capa se atasca antes.",
    },
    waterTemperature: {
      value: "92–94 °C",
      note: "En Bogotá el agua hierve cerca de los 91 °C, así que puedes usarla apenas la retiras del fuego y no hay forma de pasarse.",
    },
    totalTime: {
      // El final del rango es lo que el cronómetro usa para saber cuándo se acabó: el
      // último paso arranca en 2:30 y se lleva el minuto que queda.
      value: "3:00 – 3:30",
      note: "Desde que arranca la floración hasta que el dripper deja de gotear. El rango es una elección de este sitio: para este método no hay ningún tiempo publicado.",
    },
    output: {
      value: "{rendimiento}",
      note: "Lo que llega a la jarra: entre el molido y el papel se quedan unos {retenida}. La jarra del Tótem son 300 ml, así que esto es lo que cabe con holgura y por eso la receta es de una taza. Y ojo con la palabra «taza»: la del Tótem son 118 ml y la de este sitio ronda los 195, así que una de las nuestras llena casi dos de las suyas.",
    },
    cupProfile: {
      value: "Limpia",
      note: "El papel retiene los aceites y las partículas más finas, así que la bebida sale casi transparente y los sabores se distinguen uno a uno, como en el V60 y la Chemex. Lo que vas a leer en todas las tiendas —que un fondo plano extrae más parejo que un cono— no lo ha medido nadie que lo haya publicado, así que aquí no se afirma.",
    },
  },

  equipment: [
    {
      name: "Método Tótem",
      note: "Las cuatro piezas van juntas y se apilan una dentro de otra: base, jarra, dripper y taza. Se venden también por separado, para reponer la que se rompa.",
      piece: "totem",
    },
    {
      name: "Filtros Kalita Wave 155",
      note: "No los hace Arta: el dripper está pensado para un filtro japonés, de fondo plano y pared plisada. Es la pieza que hay que ir a comprar aparte y la que se acaba.",
      piece: "filtros-kalita-wave-155",
    },
    {
      name: "Hervidor de cuello de cisne",
      note: "Aquí sí hace falta el pico fino: son tres vertidos en los que hay que controlar dónde cae el agua y a qué velocidad.",
      piece: "hervidor-cuello-cisne",
    },
    {
      name: "Báscula con temporizador",
      note: "La que más falta hace de todo el sitio. Como la jarra es opaca, la báscula es lo único que te dice cuánta agua llevas echada.",
      piece: "bascula",
    },
    {
      name: "Molino de muelas",
      note: "Muele parejo, que es lo que aquí decide si el agua atraviesa toda la capa de café o se abre un camino y se salta la mitad.",
      piece: "molino-de-muelas",
    },
  ],

  steps: [
    {
      time: "Previo",
      title: "Monta la torre y enjuaga el filtro",
      description:
        "Pon la jarra sobre la base y el dripper sobre la jarra. Abre el filtro plisado, mételo en el dripper y vierte agua caliente hasta empaparlo entero. Bota esa agua antes de seguir.",
      why: "El papel sin enjuagar aporta un sabor a cartón. Y aquí hay cuatro piezas de cerámica frías esperando al agua: cada una le roba calor justo cuando más falta hace, así que el enjuague también las templa.",
    },
    {
      time: "Previo",
      title: "Añade el café y aplana el lecho",
      description:
        "Echa los {cafe} de café recién molido y dale un golpecito al dripper para que la superficie quede plana de lado a lado.",
      why: "El fondo plano ya reparte el café en una capa ancha y baja, así que un montón a un lado se nota más que en un cono: el agua busca donde hay menos café y se salta el resto.",
    },
    {
      time: "0:00 – 0:45",
      title: "Floración",
      description:
        "Arranca el cronómetro y vierte {floracion} de agua, el triple del peso del café, mojando todo el molido. Verás una espuma que sube y baja sola.",
      why: "El café recién tostado guarda CO₂, y ese gas empuja el agua hacia fuera. Dejarlo salir primero hace que el resto del agua entre pareja en vez de resbalar por encima.",
    },
    {
      time: "0:45 – 1:20",
      title: "Primer vertido, hasta {vertido1}",
      description:
        "Vierte en espiral, del centro hacia fuera, sin llegar a tocar la pared plisada del filtro.",
      why: "Los pliegues del papel dejan un hueco entre el filtro y la pared del dripper. Si mojas ahí, parte del agua baja por ese hueco y llega a la jarra sin haber pasado por el café: la taza sale aguada y no hay manera de ver por qué.",
    },
    {
      time: "1:20 – 1:55",
      title: "Segundo vertido, hasta {vertido2}",
      description:
        "Espera a que el nivel baje hasta dejar el lecho casi a la vista y vuelve a verter en espiral, más suave.",
      why: "Verter por tandas mantiene el café cubierto sin inundarlo. Y esperar a que baje el nivel es lo único que te dice a qué velocidad está pasando el agua, porque por debajo no vas a ver nada.",
    },
    {
      time: "1:55 – 2:30",
      title: "Tercer vertido, hasta {agua}",
      description:
        "Completa los {agua} y deja quieto el dripper. No lo levantes para mirar.",
      why: "Levantarlo interrumpe el goteo y desnivela el lecho, y lo que se gana es poco: la jarra es opaca, así que mirar dentro no te dice cuánta agua ha pasado. Eso lo dice la báscula.",
    },
    {
      time: "2:30 – 3:30",
      title: "Escurre, desmonta y sirve",
      description:
        "El goteo debe terminar entre 3:00 y 3:30. Retira el dripper, gira la jarra para mezclar y sirve en la taza.",
      why: "El tiempo total es aquí tu única señal, y por eso importa más que en otros métodos: si termina mucho antes, la molienda está gruesa; si se pasa, está demasiado fina. En un V60 eso se ve venir mirando el goteo; aquí solo lo sabes al final y con el reloj.",
    },
  ],

  commonMistakes: [
    {
      problem: "Compraste el Tótem y no puedes usarlo",
      cause:
        "El juego son cuatro piezas de cerámica y ningún filtro. El dripper está hecho para un filtro Kalita Wave del 155, que fabrica otra empresa y se vende aparte.",
      fix: "Consigue filtros Wave 155 antes del primer café. Es la única pieza del método que se acaba, así que conviene tenerla en cuenta también en lo que cuesta mantenerlo.",
    },
    {
      problem: "Se te rebosa la jarra",
      cause:
        "Estás preparando más de una taza. La jarra son 300 ml y no se ve por dentro, así que el agua de más no avisa: aparece por arriba.",
      fix: "Quédate en una taza de esta receta, que deja 195 ml. Si quieres dos cafés seguidos, prepara dos tandas con molido nuevo en lugar de estirar una.",
    },
    {
      problem: "Sale aguada aunque hayas pesado bien",
      cause:
        "El agua encontró el atajo de los pliegues: se escurrió entre el papel plisado y la pared del dripper sin pasar por el café.",
      fix: "Vierte siempre en espiral desde el centro y para antes de llegar al borde. Es el error más fácil de cometer aquí y el más difícil de detectar, porque la jarra tapada no deja ver que está entrando agua limpia.",
    },
    {
      problem: "Te enteras de que ibas mal cuando ya está servido",
      cause:
        "Estás intentando leer la preparación como un V60, y aquí la mitad de las señales no existen: no hay caudal, ni nivel en la jarra, ni color que mirar.",
      fix: "Fíate del reloj y de la báscula, que son las dos señales que sí tienes, y apunta el tiempo total de cada tanda. Con el molido ajustado dos o tres veces contra ese número, el método se vuelve muy repetible.",
    },
    {
      problem: "El primer café sale más frío de lo que esperabas",
      cause:
        "Cuatro piezas de cerámica a temperatura ambiente absorben calor, y la taza es la última de la fila.",
      fix: "Enjuaga con agua caliente el dripper y la jarra al montar la torre, y echa un chorro también en la taza mientras se prepara el café. Bótala justo antes de servir.",
    },
  ],

  funFact: {
    text: "En diciembre de 2025, el Museo Mexicano del Diseño montó una exposición por los veinte años de Arta Cerámica en la que veinticinco artistas y diseñadores reinterpretaron el Tótem, cada uno a su manera. Estuvo abierta hasta finales de febrero de 2026. Es un método de preparar café que acabó colgado en un museo de diseño.",
    source: "MUMEDI",
  },

  grounding: {
    body: [
      "Este método tiene autora y tiene fecha, que es algo que no se puede decir de casi ningún otro del sitio. Lo diseñó Gloria Rubio, diseñadora industrial formada en el CIDI de la UNAM, que fundó el taller Arta Cerámica junto a Marta Ruiz, también diseñadora industrial de la misma escuela. El MUMEDI lo cuenta así: «El Método Tótem nace de la inquietud de Gloria Rubio, quien en sus primeros experimentos creó tres tazas apilables». De ahí salió lo demás: «El proyecto evolucionó hasta convertirse en un método completo, funcional y portátil. Así nació Tótem: un sistema de cuatro piezas —base, jarra, dripper y taza— para acompañar el ritual del café desde cualquier lugar». Arta lo presenta como el primer método mexicano para preparar café de especialidad; eso lo dicen ellas y aquí se cuenta como lo que es, lo que afirma quien lo fabrica.",
      "Conviene decir también qué no es, porque las tiendas lo cuentan de otra manera. El dripper del Tótem usa un filtro Kalita Wave del 155 —lo declara el propio fabricante en su página de producto—, y eso significa fondo plano y pared plisada. Mecánicamente es la misma familia que una Kalita, no un invento aparte: lo mexicano aquí son la cerámica, el oficio y la idea de meter las cuatro piezas una dentro de otra, no la forma de filtrar. Que el aparato sea de un país y el consumible de otro no es un defecto; es lo que pasa cuando alguien diseña un objeto sobre un estándar que ya existe.",
      "Y ahora lo incómodo: la receta de esta página no es de nadie más que de este sitio. Aquí sí hay fabricante, tiene tienda, tiene página de producto y publica hasta los milímetros de cada pieza, y aun así **ha elegido no publicar cómo se usa**. Su página del método es un texto sobre el ritual y lo sagrado, sin una sola cifra: ni gramos, ni proporción, ni temperatura, ni tiempo, ni molienda. Eso se dice, no se disimula. Lo que circula por internet son recetas de tiendas que lo revenden y de vídeos de baristas, y ni siquiera coinciden entre ellas: una pide 20 g y 320 ml, otra 15 g y 225 g. Así que los números de esta ficha —los 15 gramos por taza, el 1:15, los tres vertidos, los tres minutos y medio— son una elección de este sitio, escogida para que se pueda comparar con el V60 y con los demás métodos, y no la recomendación de quien hizo el aparato.",
      "Las cifras que sí vienen de fuente primaria son las del objeto, y son las que mandan en la receta: la jarra son 300 ml y la taza 118 ml. De la primera sale que aquí solo se prepare una taza, porque dos no caben. De la segunda sale el aviso de la ficha técnica: cuando el Tótem dice «taza» y cuando lo dice este sitio no están hablando de lo mismo.",
      "Queda un detalle de método: la página de Shift Coffee, la tienda de cuya receta se habla arriba, no se pudo abrir en dos intentos —el dominio no resolvió—, así que lo que dice se conoce por buscador y no por lectura directa. Como esa receta es justamente la que no se escribe, no afecta a nada de lo que has leído, pero es mejor decirlo que dejarlo dicho a medias. Abajo están las cuatro fuentes que sí se leyeron enteras.",
    ],
    references: [
      {
        publisher: "Arta Cerámica",
        title: "Método Tótem, diseñado por Gloria Rubio",
        url: "https://artaceramica.com/pages/metodo-totem",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Arta Cerámica",
        title:
          "Método Tótem piezas: medidas, capacidades y filtro de cada pieza",
        url: "https://artaceramica.com/products/metodo-totem-piezas",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Arta Cerámica",
        title: "Nosotras: quiénes somos y cómo empezó el taller",
        url: "https://artaceramica.com/pages/nosotras",
        retrieved: "2026-09-13",
      },
      {
        publisher: "MUMEDI, Museo Mexicano del Diseño",
        title: "Arta Cerámica: 20 años de diseño y oficio",
        url: "https://mumedi.mx/arta-ceramica-20-anos-de-diseno-y-oficio/",
        retrieved: "2026-09-13",
      },
    ],
  },
};
