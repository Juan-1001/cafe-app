import type { BrewMethod } from "./types";

/**
 * Quinto método del sitio y el primero del capítulo de los implacables, que hasta hoy
 * no se pintaba porque ningún método llegaba a ese nivel.
 *
 * También es el primero que rompe tres cosas que hasta ahora eran comunes a todos:
 * no calcula cantidades, no lleva cronómetro y no pide báscula. Las tres ausencias son
 * el mismo hecho contado tres veces —aquí el aparato decide y quien prepara no— y por
 * eso están dichas en la página, en el bloque `device`, en vez de quedar como huecos.
 *
 * Sobre las cifras. La receta sale del manual oficial de Bialetti, que para un aparato
 * es la fuente primaria: quien lo fabricó dice cómo se usa. El mecanismo se apoya en dos
 * trabajos de física. De los dos solo se pudo leer el resumen: los textos completos
 * están tras pago y las copias libres son escaneos ilegibles. Eso importa y por eso se
 * dice aquí y en `grounding`: de esos trabajos se usa lo que afirman en su resumen, que
 * es cualitativo, y **ninguna de sus cifras**.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **La presión en bares.** «1 a 2 bar» circula por todas partes, Wikipedia incluida,
 *   y siempre sin documento detrás. Gianino y Navarini midieron una moka de verdad,
 *   pero no se pudo llegar a sus cifras (ver arriba), así que no hay ninguna medición
 *   que citar. No se escribe ningún número. La ficha dice lo que el lector necesita:
 *   que el empujón es suave y que esto no es un espresso. Mismo criterio que la presión
 *   del AeroPress.
 * - **La temperatura a la que sale el café.** No hay fuente. Y el manual trae algo
 *   mejor en su lugar: en sus preguntas frecuentes, «el café sale frío o demasiado
 *   caliente» se contesta revisando el nivel del agua. Eso es oficial y además se puede
 *   hacer. Por eso la casilla de temperatura no lleva grados.
 * - **Los «4 a 6 minutos» al fuego.** No hay cifra oficial de tiempo. El manual da un
 *   suceso: «retire la cafetera cuando el recolector esté lleno». De ahí sale que esta
 *   sea la única ficha del sitio sin tiempo total y sin cronómetro.
 * - **Arrancar con agua caliente.** El manual dice agua fría, explícito. La práctica de
 *   arrancar con agua ya caliente está muy extendida y tiene un mecanismo plausible
 *   —menos rato al fuego, menos se tuesta el café de arriba—, pero nadie la ha medido.
 *   Entra atribuida en los errores comunes, nunca como recomendación de este sitio.
 * - **Dónde cae la molienda dentro de su casilla.** Se repite mucho que la moka pide un
 *   punto más fino que un goteo, y nadie lo ha medido. La ficha la sitúa en «media-fina»
 *   porque es el hueco que dejan las dos prohibiciones del fabricante, y ahí comparte
 *   casilla con el V60 y el AeroPress sin fingir que se puede afinar más.
 * - **«En altura la moka hace mejor café, porque el agua hierve a 88-95 °C, que es la
 *   temperatura ideal».** No se escribe, y no por falta de respaldo: el razonamiento
 *   está mal. Da por hecho que la moka prepara a la temperatura de ebullición del
 *   sitio, y la moka no prepara ahí. Va explicado en `grounding`, que es el mejor
 *   contenido de esta ficha.
 *
 * Fuentes consultadas el 2026-09-13: manual oficial Bialetti Moka Express (ed. 01/2021),
 * https://www.bialetti.com/media/manual/caffettiere/Moka_Express_ed_01_2021_0103102.pdf ;
 * fichas de producto de bialetti.com para las capacidades; Gianino, C., «Experimental
 * analysis of the Italian coffee pot "moka"», American Journal of Physics 75(1) (2007);
 * Navarini, L. et al., «Experimental investigation of steam pressure coffee extraction
 * in a stove-top coffee maker», Applied Thermal Engineering 29 (2009).
 */
export const moka: BrewMethod = {
  slug: "moka",
  name: "Moka",
  tagline:
    "La cafetera italiana de toda la vida: aluminio, fuego y un gorgoteo que avisa. Es el único método del sitio donde tú no decides casi nada, y el único que no perdona haberte distraído.",
  image: {
    // Foto pendiente. Mientras `src` sea null se pinta el bloque de color en su sitio;
    // la ruta no se escribe hasta que el archivo exista de verdad. El alt se escribe
    // igual desde ahora: es lo que dice qué fotografía hay que ir a buscar.
    src: null,
    alt: "Una cafetera moka de aluminio sobre la hornilla encendida de una estufa de gas, con la llama baja y recogida bajo la base. La tapa está abierta y por el tubo central asoma el café, oscuro y espeso, que empieza a llenar el recolector. Al lado, sobre la encimera, dos tacitas blancas esperan.",
  },

  /*
   * Implacable. Es el primer método del sitio en este nivel y lo que lo pone aquí no es
   * que sea difícil: es que no hay forma de rectificar. En el V60 un vertido flojo se
   * arregla en el siguiente y en la prensa siempre puedes esperar medio minuto más.
   * Aquí, entre que cierras la cafetera y la pones al fuego, todas las decisiones ya
   * están tomadas: no puedes probar, no puedes corregir la molienda ni el agua, y no
   * ves lo que pasa dentro. Cuando notas que algo va mal —el olor a quemado, la válvula
   * soltando vapor— la taza ya está hecha.
   *
   * Que tome pocas decisiones no es lo mismo que perdonar. Es justo lo que explica el
   * comentario de `ErrorPenalty` en types.ts: por número de decisiones la moka sería de
   * las fáciles, y mandar ahí a alguien que empieza sería un mal consejo.
   *
   * Sobre cómo se comprobó, porque el criterio de las otras fichas aquí da un resultado
   * mezclado y conviene dejarlo escrito. La prueba del AeroPress —mirar si los errores
   * comunes son sabores o estorbos del gesto— sale 2 y 2: quemado y frío son la taza,
   * pero la válvula soltando vapor y «no sale nada» son estorbos. Lo que pasa es que
   * esa prueba trae un supuesto escondido que solo valía allí: en el AeroPress los
   * estorbos no costaban nada, «entre el papel y el remojo la taza sale limpia igual».
   * Aquí sí cuestan: «no sale nada» es quedarte sin café. Contados por lo que cuestan y
   * no por su clase, cuatro de los cinco se llevan la taza entera, y ninguno se puede
   * arreglar mientras pasa. Por ahí es por donde entra en el nivel 3, no por la prueba
   * literal.
   */
  errorPenalty: { label: "Implacable", level: 3 },

  /*
   * Sin `recipe`: esta ficha no calcula nada. Lo que iría aquí lo fija el aparato y se
   * cuenta abajo.
   */
  device: {
    question: "Qué moka tienes",
    /*
     * Capacidades declaradas por Bialetti para la Moka Express. Se eligen estos dos
     * tamaños y no los siete que fabrica porque son los que se encuentran en una casa;
     * añadir del 1 al 12 convertiría el bloque en una tabla de catálogo.
     *
     * El fabricante las publica con su propio matiz, que conviene tener presente antes
     * de tomarlas por exactas: «valore indicativo: può variare in funzione della
     * quantità di acqua caricata, quantità caffè, miscela e macinatura dello stesso».
     * Es capacidad de la caldera, es decir agua que entra, no café que sale.
     */
    sizes: [
      { label: "3 tazas", capacity: "Caldera de 130 ml" },
      { label: "6 tazas", capacity: "Caldera de 270 ml" },
    ],
    fixed: [
      {
        label: "Agua",
        // Manual, apartado «Preparación del café»: «Llene la caldera (2) con agua
        // fría (...) hasta el borde inferior de la válvula de seguridad».
        value:
          "Fría, y hasta el borde inferior de la válvula de seguridad. Ni un dedo por encima.",
      },
      {
        label: "Café",
        // Manual: «Llene el filtro cónico» y, entre los consejos, «No presione nunca
        // el café dentro del embudo».
        value: "El embudo lleno y enrasado, sin apretarlo nunca.",
      },
    ],
    note: [
      "Los números de la caja no son las tazas del resto de este sitio. Aquí una «taza» son unos 45 ml —lo que cabe en una tacita de las pequeñas—, así que una moka de 6 no hace seis tazas de café: hace un poco más de un cuarto de litro de café muy concentrado, para repartir entre varias personas o para alargar con agua o con leche.",
      "Tampoco vas a ver aquí báscula ni cronómetro, y no es un olvido: es que no hacen falta. El embudo mide el café y la válvula mide el agua, siempre igual, sin que tú peses nada. Y el momento de apagar el fuego no lo marca un reloj sino un ruido, que es lo que el propio fabricante dice.",
    ],
    source: "Bialetti, fichas de producto de la Moka Express",
  },

  specs: {
    /*
     * Sin `ratio`. No es que no se sepa: es que quien prepara no lo elige. El embudo
     * fija el café y la válvula fija el agua, así que la proporción es la que salga de
     * esos dos topes. Escribir aquí «lo fija el aparato» habría parecido un dato sin
     * serlo, y además habría dejado en cero, y en silencio, las cantidades de agua que
     * la página deduce leyendo este campo.
     */
    grind: {
      /*
       * «Media-fina» y no «Para moka», que era lo que decía antes y no orienta a nadie:
       * quien tiene un molino con dial necesita la casilla de la escala del sitio, no
       * el nombre del paquete.
       *
       * De dónde sale la casilla. El manual no describe la molienda: da una categoría
       * —«Use ground coffee for Moka, that is with a suitable grinding»— y dos
       * prohibiciones, que en las advertencias van en mayúsculas: «CAFFÈ PER FILTRI
       * PERCOLATORI O MACCHINE ESPRESSO». Esas dos prohibiciones son el dato. Dejan la
       * molienda acotada por los dos lados —más fina que la de filtro, más gruesa que
       * la de espresso— y en la escala de este sitio ese hueco es exactamente
       * «media-fina». No es una equivalencia inventada: es el espacio que queda cuando
       * el fabricante descarta lo de arriba y lo de abajo.
       *
       * Lo que NO se pudo comprobar, y por eso no se escribe: dónde cae la moka dentro
       * de esa casilla respecto del V60 y del AeroPress. Se repite mucho que la moka
       * pide un punto más fino que un goteo, y puede que sea cierto, pero no hay ningún
       * documento que lo mida. Así que los tres comparten casilla y comparación táctil,
       * que es lo único que el material sostiene. Si algún día aparece la medición, aquí
       * es donde hay que afinarlo.
       */
      value: "Media-fina",
      note: "El mismo punto que el V60 y el AeroPress: como el azúcar de mesa, granulada entre los dedos y no polvo. En el paquete la vas a ver como «para moka». Y más que el punto exacto importa que todos los trozos midan lo mismo: un molino de cuchillas hace polvo y grumos a la vez, y es el polvo el que tapona el filtro de metal y manda la presión a la válvula. Por eso aquí se pide molino de muelas.",
    },
    waterTemperature: {
      value: "La fija el aparato",
      /*
       * Aquí no hay grados y es a propósito. En los otros cuatro métodos quien prepara
       * elige la temperatura del agua; en este, no: el agua entra fría y la caldera
       * cerrada decide a qué temperatura empuja. No hay ninguna medición publicada de a
       * cuánto sale el café de una moka, y menos a la altura de Bogotá.
       *
       * Lo que sí es oficial es qué hacer cuando sale mal. Manual, preguntas
       * frecuentes: «El café sale frío o demasiado caliente: controle el correcto nivel
       * de agua, que debe estar a nivel del borde inferior de la válvula».
       */
      note: "No la eliges tú. El agua entra fría y la caldera, ya cerrada, decide a qué temperatura empuja: es la única cosa de todo el sitio que se cocina a puerta cerrada. Si el café te sale frío o demasiado caliente, el fabricante manda revisar una sola cosa, y no es el fuego: el nivel del agua.",
    },
    /*
     * Sin `totalTime`, y de ahí que esta sea la única ficha sin cronómetro. El manual
     * no da minutos: da un suceso. «Cuando el recolector (6) esté lleno de café, retire
     * la cafetera de la fuente de calor».
     */
    /*
     * Sin `output`: lo que sale depende de la olla que haya en esa cocina, y eso ya se
     * cuenta arriba, en el bloque de cantidades. Repetirlo aquí con una cifra sola
     * obligaría a elegir uno de los dos tamaños y a callar el otro.
     */
    cupProfile: {
      value: "Concentrada",
      note: "Es la taza más fuerte del sitio, y no se parece a ninguna de las otras cuatro. El filtro es de metal y no de papel, así que pasan los aceites y los posos finos: el café sale espeso, oscuro y con un amargor de fondo que no se va. No es un espresso —le falta muchísima presión para eso— pero se bebe como él: en tacita, corto, o alargado con agua o con leche caliente.",
    },
  },

  /*
   * Dos piezas. Es el método que menos equipo pide de los cinco, junto con el colado en
   * tela, y la lista corta es el dato: no hay báscula porque no se pesa, no hay hervidor
   * porque el agua entra fría, y no hay filtros de papel porque el filtro es de metal y
   * viene puesto.
   */
  equipment: [
    {
      name: "Cafetera moka",
      note: "Caldera abajo, embudo en medio, recolector arriba. Elige el tamaño por las tazas que sueles servir: llenarla a medias no funciona.",
      piece: "moka",
    },
    {
      name: "Molino de muelas",
      note: "El de cuchillas deja trozos desiguales, y los finos son los que taponan el filtro.",
      piece: "molino-de-muelas",
    },
  ],

  /*
   * Los tiempos no son tiempos: son sucesos. Ninguno tiene la forma «m:ss», así que
   * `parseStartSeconds` devuelve null en todos y la página no dibuja ningún reloj.
   * Es deliberado y no una casilla a medio llenar.
   */
  steps: [
    {
      time: "Previo",
      title: "Muele el café justo antes",
      description:
        "Muele media-fina, el mismo punto que pide el V60. Si compras el café ya molido, busca el que dice «para moka»: el de máquina de espresso es más fino y aquí no sirve.",
      why: "Una molienda demasiado fina tapona el filtro, y cuando el agua no encuentra por dónde salir, la presión se va por la válvula de seguridad. Una demasiado gruesa deja pasar el agua tan rápido que el café sale aguado.",
    },
    {
      time: "Previo",
      title: "Llena la caldera con agua fría",
      description:
        "Llena la parte de abajo con agua fría hasta el borde inferior de la válvula de seguridad, ese botoncito que sobresale en un costado. No la tapes.",
      why: "La válvula es el tope, no un adorno: es por donde escapa la presión si algo se atasca, y tapada con agua deja de poder hacerlo. Es además la única medida de agua que tiene este aparato.",
    },
    {
      time: "Previo",
      title: "Llena el embudo y enrásalo",
      description:
        "Encaja el embudo en la caldera y échale café hasta arriba. Pásale el dedo o el canto de una cuchara para dejarlo plano. No lo aprietes.",
      why: "El embudo es la báscula de este método: lleno y enrasado es siempre la misma cantidad. Apretarlo es el error más común y no da un café más fuerte: da un tapón, y el agua se abre camino por un lado o se va por la válvula.",
    },
    {
      time: "Previo",
      title: "Cierra con fuerza y limpia el borde",
      description:
        "Quita el café que haya quedado en el borde de la caldera y enrosca el recolector con fuerza, pero sin pasarte y sin hacer palanca con el mango.",
      why: "Un grano de café en el borde impide que la goma selle, y por ahí se escapa el vapor que tenía que empujar el agua. Haciendo palanca con el mango se dobla la pieza que lo sujeta.",
    },
    {
      time: "Al fuego",
      title: "Fuego bajo, y la tapa cerrada",
      description:
        "Pon la cafetera al fuego con la llama baja, que no sobresalga de la base. En placa eléctrica o vitrocerámica, potencia media y nunca la máxima. Cierra la tapa.",
      why: "La llama que lame los costados quema el asa y calienta el café que ya subió, que es de donde sale el sabor a quemado. La tapa cerrada, además de ser lo que manda el fabricante, evita que te salpique el chorro cuando empiece a salir.",
    },
    {
      time: "Cuando sube",
      title: "Quédate cerca y escucha",
      description:
        "No te vayas. En unos minutos el café empieza a salir por el tubo central, primero oscuro y en hilo, y va llenando el recolector.",
      why: "Este es el único método del sitio sin cronómetro, porque el fabricante no da un tiempo sino una señal. Y es el único donde irse a hacer otra cosa arruina la taza sin remedio: cuando vuelvas ya estará hecha.",
    },
    {
      time: "Al gorgoteo",
      title: "Apaga en cuanto suene",
      description:
        "Cuando el recolector está lleno, el chorro se vuelve claro y espumoso y suena un gorgoteo inconfundible. Ahí se retira del fuego, sin esperar a que termine.",
      why: "Ese ruido es el vapor pasando por donde antes pasaba agua. Todo lo que salga a partir de ahí es vapor arrastrando lo que queda del café ya agotado, y es amargo: cada segundo de más se nota en la taza.",
    },
    {
      time: "Antes de servir",
      title: "Remueve y sirve",
      description:
        "Remueve el café del recolector con una cucharita antes de repartirlo en las tazas.",
      why: "Lo primero que sale es mucho más concentrado que lo último, y se quedan en capas. Sin remover, la primera taza y la última no saben igual. Lo dice el propio manual.",
    },
  ],

  commonMistakes: [
    {
      problem: "El café sabe a quemado",
      cause:
        "La llama era demasiado alta, o la cafetera se quedó al fuego después del gorgoteo.",
      fix: "Llama baja que no sobresalga de la base, y retirarla en cuanto suene. Hay quien va más lejos y arranca con agua ya caliente de otro hervidor, para que la cafetera pase menos rato al fuego; es una práctica muy extendida entre aficionados y el razonamiento se sostiene, pero nadie la ha medido y el fabricante dice agua fría. Si la pruebas, ten cuidado: vas a enroscar una caldera llena de agua hirviendo.",
    },
    {
      problem: "La válvula suelta vapor por un lado",
      cause:
        "El agua no encuentra por dónde subir y busca la única salida que le queda.",
      fix: "El manual manda revisar tres cosas, en este orden: que el café sea molido para moka y no de espresso, que no lo hayas apretado en el embudo, y que no haya demasiada agua en la caldera. Si pasa aun así, no la uses: puede ser una avería.",
    },
    {
      problem: "Sale muy poco café, o no sale nada",
      cause: "La cafetera no está bien cerrada, o pierde por algún lado.",
      fix: "Comprueba que esté enroscada con fuerza y que no se escape vapor por la unión. Si se escapa, mira la goma: se reseca con el uso y el fabricante recomienda cambiarla al menos una vez al año.",
    },
    {
      problem: "El café sale frío",
      cause:
        "Casi siempre, el nivel del agua. Es lo único que el fabricante manda revisar.",
      fix: "El agua tiene que llegar justo al borde inferior de la válvula: ni más ni menos. Y calienta las tazas antes con un poco de agua caliente, porque aquí sale poca cantidad y una tacita fría se la enfría entera.",
    },
    {
      problem: "La primera taza sabe rarísima y la cafetera es nueva",
      cause: "Es normal, y está previsto.",
      fix: "El fabricante dice que los tres primeros cafés de una moka recién comprada se tiran sin beberlos. Después, lávala solo con agua tibia y sin detergente, y no la metas al lavavajillas.",
    },
  ],

  /*
   * Fuente: manual oficial, apartado de consejos. Cita textual de la versión inglesa:
   * «Make at least 3 cups of coffee, discarding them (do not drink them), following the
   * instructions below». Va sin línea de fuente visible, igual que el dato curioso del
   * V60 y el del AeroPress: el propio texto ya dice quién lo manda.
   */
  funFact: {
    text: "El fabricante te pide que tires los tres primeros cafés de una moka recién comprada, sin beberlos. No es una precaución exagerada de la letra pequeña: es el paso uno de sus instrucciones, y casi nadie lo hace.",
  },

  grounding: {
    body: [
      "Esta ficha está escrita sobre el manual de Bialetti, que para un aparato es la mejor fuente que hay: quien lo diseñó diciendo cómo se usa. De ahí salen el agua fría hasta la válvula, el embudo sin apretar, la llama que no sobresale de la base y el momento de apagar. Lo que no sale de ahí está señalado abajo, porque en este método hay bastante que señalar.",
      "Empecemos por lo que no vas a leer: cuántos bares de presión hace una moka. La cifra que circula —«entre 1 y 2 bar»— está en todas partes y no tiene ningún documento detrás. Sí hay dos trabajos de física que midieron una moka de verdad, el de Gianino en el American Journal of Physics y el de Navarini y sus colegas en Applied Thermal Engineering, pero los dos están tras pago y solo pudimos leer sus resúmenes. Así que de ellos se usa lo que afirman en palabras y ninguna de sus cifras. Lo que sí necesitas saber cabe en una línea: el empujón es suave, y esto no es un espresso ni se le acerca.",
      "Y ahora la altura, que es la razón por la que esta ficha es distinta de las otras cuatro. En el V60, la prensa, el AeroPress y la tela, estar en Bogotá te protege: el agua hierve cerca de los 91 °C y no hay forma de pasarse. La moka es el único método del sitio donde la altura se mete dentro del aparato, y el motivo está en cómo funciona. Una moka no empuja el agua porque hierva: la empuja porque la presión que se acumula dentro de la caldera cerrada supera a la del aire de fuera. Lo que mueve el agua es esa diferencia. Y en Bogotá, a 2.600 metros, el aire de fuera pesa menos que al nivel del mar. Así que la moka empuja antes y con el agua más fría que la misma cafetera en Cartagena.",
      "Hasta ahí el mecanismo, que es física de manual. Lo que viene después es un hueco, y preferimos decirlo a rellenarlo: cuánto más fría, exactamente, nadie lo ha medido. No existe ninguna medición publicada de una moka a esta altura, ni de cuánto habría que cambiar la molienda para compensarlo. Lo que circula por internet sobre el tema son blogs copiándose unos a otros. Si alguna vez la hacemos nosotros, lo contamos aquí.",
      "Con una excepción, porque hay una afirmación sobre esto que conviene desmontar en vez de ignorar. Se lee mucho que en altura la moka hace mejor café, y el argumento es bonito: como el agua hierve a 88-95 °C según lo alto que estés, y esa es justo la franja ideal para el café, resulta que la montaña te regala la temperatura perfecta. El problema no es que le falte fuente. Es que el razonamiento está mal. Da por hecho que la moka prepara a la temperatura a la que hierve el agua en tu cocina, y una moka no prepara ahí: su caldera está cerrada y se presuriza, que es justamente el principio en el que se basa el aparato entero. Un agua topada en su punto de ebullición no tendría con qué subir por el tubo. El argumento se apoya en olvidarse de lo único que hace funcionar la cafetera.",
      "Por si hiciera falta rematarlo, el trabajo de Navarini encontró midiendo que la extracción arranca a temperaturas bastante bajas y que depende de cuánto aire seco quedó atrapado en la caldera al cerrarla. O sea que ni siquiera dentro de una misma cocina hay una temperatura única a la que «prepare» una moka. La próxima vez que leas una cifra redonda sobre este aparato, vale la pena preguntarse quién la midió.",
    ],
    references: [
      {
        publisher: "Bialetti",
        title:
          "Moka Express, instrucciones de uso (ed. 01/2021) — de aquí sale la receta entera",
        url: "https://www.bialetti.com/media/manual/caffettiere/Moka_Express_ed_01_2021_0103102.pdf",
        retrieved: "2026-09-13",
      },
      {
        publisher: "American Journal of Physics",
        title:
          "Gianino, C., «Experimental analysis of the Italian coffee pot “moka”» (2007) — solo se pudo leer el resumen",
        url: "https://pubs.aip.org/aapt/ajp/article-abstract/75/1/43/1056287",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Applied Thermal Engineering",
        title:
          "Navarini, L. et al., «Experimental investigation of steam pressure coffee extraction in a stove-top coffee maker» (2009) — solo se pudo leer el resumen",
        url: "https://www.sciencedirect.com/science/article/abs/pii/S1359431108002299",
        retrieved: "2026-09-13",
      },
    ],
  },
};
