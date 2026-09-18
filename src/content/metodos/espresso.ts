import type { BrewMethod } from "./types";

/**
 * Décimo método del sitio, el más exigente de todos y el primero cuya barrera no es la
 * técnica sino el aparato.
 *
 * ## Por qué está aquí sin pedirle a nadie que compre una máquina
 *
 * Por dos razones que no dependen de que el lector tenga una.
 *
 * La primera es que **el sitio lleva nueve fichas apoyándose en el espresso sin haberlo
 * explicado nunca**. La moka dice «no es un espresso, le falta muchísima presión»; su
 * casilla de molienda está acotada por «más gruesa que la de espresso»; el AeroPress y el
 * cold brew se comparan con él. Es el punto de referencia del catálogo y era el único sin
 * ficha.
 *
 * La segunda es que esta es la ficha que enseña a **leer** una extracción, y eso sirve
 * igual delante de una barra que delante de tu propia máquina. `/tiendas` está en el
 * alcance de la v1: saber si el chorro que te están sacando salió bien es exactamente lo
 * que hace útil esa sección.
 *
 * Y el antojo que trae aquí a la mayoría —café concentrado en casa— **ya tiene respuesta
 * en el sitio**, y la ficha manda ahí de forma explícita: la moka. El espresso no es la
 * moka mejorada; es otra bebida que necesita una bomba.
 *
 * ## Sobre las cifras
 *
 * Es la ficha mejor documentada del sitio, y por una vez el bloque de certeza alta es
 * grande de verdad. Dos documentos la sostienen: el folleto del Istituto Nazionale
 * Espresso Italiano, que es quien certifica el espresso italiano y publica sus valores
 * con tolerancia; y Cameron et al. (Matter, 2020), que modeló y **midió** la extracción en
 * una cafetería. De este último se leyó el manuscrito completo, no solo el resumen.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **La definición de la SCA.** Sus 25–35 ml, 7–9 g, 92–95 °C, 9–10 bar y 20–30 s
 *   aparecen en la ficha, pero **no se leyó el documento de la SCA**: su web no resolvió
 *   en dos intentos. Se conoce por la cita textual que hace el estudio de Matter, que
 *   además la llama «as historically defined». Por eso va con doble atribución en el texto
 *   visible y por eso la SCA **no está** en la lista de fuentes: ahí solo va lo que se
 *   leyó.
 *
 *   **Novedad del 2026-09-17, para quien retome este hueco**: al documentar el artículo
 *   de la molienda se comprobó que los PDF de la serie de estándares de la SCA **sí se
 *   descargan** desde sca.coffee —de ahí salió el `SCA Standard 102-2024`, el de la
 *   catación, que cita el artículo—. Eso no cierra esto: la definición de espresso es
 *   otro documento y sigue sin leerse. Lo que dice es por dónde intentarlo, y es
 *   distinto de lo que se intentó: buscar el estándar de esa serie que la contenga, en
 *   vez de volver a la página que no respondió.
 * - **Los 9 bar como óptimo.** Como convención certificada es certeza alta: el INEI los
 *   fija con tolerancia. Como *mejor presión posible* no lo sostiene nadie, y lo medido
 *   apunta al revés: el estudio encuentra «an increase in extraction yield with decrease
 *   in water pressure», y a 9 bar con molienda fina se le atascaba la máquina. Va contado
 *   en `grounding` en vez de omitido.
 * - **A cuántos bares llega de verdad una máquina doméstica.** Ninguna medición. Kalley
 *   publica «15 Bares» para su K-EX y no dice nada más; su manual no se pudo leer (Scribd
 *   solo devuelve la portada). Lo que sí es comprobable es qué *es* ese número: la ficha
 *   del componente de la bomba que llevan estas máquinas lo escribe como «Max pressure:
 *   15 bar». Es el techo de la pieza, no una medida de la taza.
 * - **La curva de caudal contra presión de la bomba.** Se conoce resumida por un
 *   distribuidor, no por la hoja del fabricante. No se escribe ninguna cifra suya: solo
 *   queda el mecanismo, que es que el máximo de una bomba es lo que alcanza cuando no sale
 *   nada.
 * - **La química de la crema.** De Illy y Navarini (Food Biophysics, 2011) solo se pudo
 *   leer el resumen: Springer pide autenticación. Así que **esta ficha no describe de qué
 *   está hecha la crema**. La usa como señal —el color, el momento en que aclara—, que es
 *   lo que se ve y no necesita fuente. La cifra de mililitros de CO₂ por taza que circula
 *   en los resúmenes de buscador no se leyó en el documento y no se escribe. Mismo criterio
 *   que con Gianino y Navarini en la moka.
 * - **Si los molinos manuales dan una molienda uniforme de espresso.** Nadie lo ha
 *   publicado. Lo más cercano son las 300 distribuciones de tamaño de partícula que midió
 *   Jonathan Gagné con un Camsizer X2, y **no incluyó ni un molino manual**; sobre el fondo
 *   escribe además «it is not clear at all whether this affects taste in a perceivable
 *   manner». Así que no se afirma ni que sirvan ni que no: se dice el hueco. Lo que sí se
 *   escribe es lo del fabricante, atribuido, y el mecanismo, que sí está medido.
 * - **El tamaño de partícula del espresso en micras.** La cifra que circula sale de una
 *   nota de aplicación de un fabricante de instrumentos que no se leyó directamente. La
 *   molienda se describe al tacto, como en el resto del sitio.
 * - **Los ahorros en dólares del estudio** (0,53 $ por 20 g, 0,13 $ por bebida). Son
 *   precios de 2018-19: caducan. Se queda el 25 % de reducción de masa, que no.
 *
 * Fuentes consultadas el 2026-09-13. Van completas en `grounding.references`.
 */
export const espresso: BrewMethod = {
  slug: "espresso",
  name: "Espresso",
  tagline:
    "Agua caliente empujada a nueve bares a través de un lecho de café muy fino, en menos de medio minuto. Es el método más exigente del sitio y el único donde lo que ves salir te dice qué corregir en la siguiente.",
  image: {
    /*
     * IMAGEN GENERADA CON IA, provisional, de la misma serie que las otras nueve
     * portadas: la misma cocina, la misma ventana y la misma planta.
     *
     * Tres cosas que **dibuja mal o de más**, y conviene tenerlas anotadas antes de que
     * alguien las tome por documentación:
     *
     * 1. **Es una máquina de palanca, y esta ficha está escrita para una de bomba.** El
     *    brazo largo que sale del grupo no es un adorno: en esas máquinas la presión la
     *    da un muelle y no una bomba. Nada de lo que dice la ficha se apoya en la imagen,
     *    pero es la primera candidata a sustituir.
     * 2. **El vaso lleva muchísimo más de lo que es un espresso.** Ahí hay bastante más
     *    de la bebida que la ficha manda cortar; en la taza de verdad no llega ni a la
     *    mitad de un vaso así.
     * 3. **La cuchara de madera del primer plano es justo lo que la ficha dice que no
     *    uses**, y no hay báscula por ninguna parte. Sale en el alt porque está en la
     *    imagen, no porque forme parte del método.
     *
     * El archivo llegó guardado como `expresso.png` y se renombró a `espresso.png`: el
     * nombre tiene que ser el slug, y «expresso» además no es como se llama el método.
     */
    file: "/images/metodos/espresso.png",
    alt: "Una máquina de espresso pequeña de acero brillante sobre una encimera de madera gastada, junto a una ventana con una planta. Del grupo sale un brazo largo de palanca con puño negro, y debajo, encajado, un portafiltro del que cae un chorro de café oscuro dentro de un vaso de vidrio recto, ya lleno hasta media altura de un líquido marrón con espuma clara encima. Por detrás sube un hilo de vapor. En primer plano, sobre la madera, una cuchara medidora de madera; a la derecha, dos tazas de cerámica color crema y la tapa metálica de un frasco.",
    credit: { source: "IA" },
  },

  /*
   * 77,5 sobre 100: nivel 3, y el método más exigente del sitio por delante de la moka
   * (72,5). No hizo falta tocar ni la fórmula ni los cortes, y merece la pena dejar escrito
   * por qué, porque es la mejor prueba de que el sistema funciona: **el espresso saca
   * menos que la moka en el eje que manda**. En recuperabilidad, que pesa 0,4, la moka
   * tiene un 1 y el espresso un 2, porque aquí sí queda un gesto —cortar— y sí se ve lo
   * que está pasando. Queda por encima igualmente, por el coste del error y por la
   * complejidad del gesto.
   *
   * Se estudió si esto pedía crear un cuarto nivel y la respuesta fue que no: los cortes
   * son los tercios exactos de la escala y 77,5 cae holgadamente dentro del tercero. Un
   * cuarto nivel serían cuartos, y eso recolocaría métodos que nadie ha discutido —el V60
   * y la prensa bajarían de capítulo— para dejar el nivel nuevo con un solo inquilino.
   *
   * Los rótulos del nivel 3 le encajan sin retocar nada: «No dan segunda oportunidad» y
   * «cuando notas que algo va mal, la taza ya está hecha». Que en el espresso se pueda
   * arreglar *la siguiente* no lo contradice: eso es otra taza.
   */
  difficulty: {
    cost: {
      value: 5,
      why: "Dos gramos de dosis o unas micras de molienda cambian la extracción entera: el tiempo del chorro es inversamente proporcional a la molienda, y pasado cierto punto el lecho se atasca y hay zonas por las que no pasa agua. Ningún otro método del sitio se estropea con una desviación tan pequeña.",
    },
    recovery: {
      value: 2,
      why: "Cuando la bomba arranca, la dosis, el reparto, el apisonado y la molienda ya están decididos: solo queda cortar el chorro, y es el último gesto que hay. Lo que el espresso deja rectificar es la extracción siguiente, no esta.",
    },
    complexity: {
      value: 4,
      why: "Pesar, moler, deshacer los grumos, repartir el lecho, apisonar plano, purgar, enganchar, arrancar, mirar el peso y cortar. Son varios pasos con sus tiempos y un gesto que se sostiene con la mano, pero encadenados uno detrás de otro y no coordinados a la vez como los del sifón.",
    },
    observability: {
      value: 4,
      why: "El chorro, su color, el peso y el reloj se ven a la vez y sin nada que los tape. No es un 5 porque lo que decide está tapado: el lecho va dentro de la cesta, así que la canalización se deduce del chorro y nunca se ve directamente. Ves la consecuencia, no la causa.",
    },
  },

  /*
   * Ni `recipe` ni `device`: la tercera forma. Aquí quien prepara no elige cuántas tazas
   * quiere —el espresso no se mide en tazas— ni se lo fija todo el aparato como en la moka.
   * Lo que trae el visitante es un hecho de su equipo, cuánto café le cabe en la cesta, y
   * lo que el sitio calcula es el peso de bebida.
   */
  shot: {
    question: "Cuánto café le cabe a tu cesta",
    /*
     * Las tres dosis salen del rango que el estudio documenta en cafeterías, no del gusto
     * de nadie. Textual: «Coffee shops routinely favor higher dry coffee mass (15–22 g),
     * resulting in larger volume beverages (30–60 g beverage mass)».
     */
    doses: [
      {
        grams: 15,
        note: "El extremo bajo del rango documentado, y lo que el estudio propone para ganar repetibilidad: menos café, molido más grueso, misma extracción.",
      },
      {
        grams: 18,
        note: "En el centro del rango que el estudio documenta en cafeterías, de 15 a 22 g. Si tu cesta no dice cuánto lleva, empieza por aquí.",
      },
      {
        grams: 20,
        note: "La dosis con la que se hicieron las medidas del estudio: 20 g de café molido para 40 g de bebida.",
      },
    ],
    /*
     * Se elige a mano y no es la primera de la lista, igual que el método de entrada de la
     * portada. La lista va de menos a más porque así se lee; entrar por 18 g es una decisión
     * editorial aparte, y es esta porque es la dosis que le sirve a quien todavía no sabe
     * qué cesta tiene. `index.ts` revienta si este valor no está entre las dosis.
     */
    entryGrams: 18,
    beveragePerGram: 2,
    note: [
      "La proporción es 1:2 —el doble de bebida que de café— y es una elección de este sitio dentro de lo que está documentado, igual que el 1:15 del AeroPress. El estudio llama «receta moderna representativa» a 20 g de café para 40 g de bebida, que es exactamente eso, y sitúa a las cafeterías entre 15 y 22 g de café y entre 30 y 60 g de bebida. La ventana es ancha: con la misma dosis, menos bebida es lo que se llama ristretto y más bebida, lungo.",
      "Ojo con la palabra «taza», que aquí significa tres cosas distintas y ninguna es la de este sitio. Una taza nuestra ronda los 195 ml. El espresso italiano certificado son 25 ml servidos en una taza de 50 a 100 ml de capacidad. Y una máquina doméstica que anuncia «10 tazas» está hablando del agua que le cabe al depósito. Por eso aquí no se cuenta en tazas: se cuenta en dosis y en peso de bebida, las dos en gramos, las dos en la báscula.",
      "Y no hay casilla de agua en la ficha técnica, que en los demás métodos es la cifra principal. No es un olvido: en el espresso el agua no se dosifica. La máquina empuja hasta que tú cortas, así que lo que se pesa es lo que cae en la taza. Eso, en una barra, lo vas a oír llamar «el shot»; aquí se le dice peso de bebida.",
    ],
    source: "Cameron et al., Matter (2020)",
  },

  specs: {
    /*
     * Sin `ratio`, y es obligatorio que no lo haya: `index.ts` revienta si un método con
     * `shot` lo declara. La casilla del ratio dice «café / agua» y de su texto se deduce el
     * agua de la calculadora; el 1:2 del espresso es café contra bebida que sale. Con las
     * dos cosas, la página llamaría agua a la bebida y restaría la retención de un número
     * que ya es el resultado.
     */
    grind: {
      /*
       * La molienda del espresso es la única del sitio que no es un valor sino un bucle:
       * se ajusta cada día según cómo corrió la anterior. Lo que se puede decir del punto
       * se dice al tacto, como en el resto de fichas, y el bucle vive en su propio bloque.
       *
       * Las micras que circulan para el espresso salen de una nota de aplicación de un
       * fabricante de instrumentos que no se leyó directamente. No se escriben.
       */
      value: "Fina",
      note: "Bastante más fina que la del resto del sitio: entre la sal de mesa y la harina, todavía arenosa entre los dedos pero ya casi polvo. Y aquí el punto exacto no se puede escribir en una ficha, porque cambia con tu café, tu cesta y tu máquina: es lo que vas a mover cada día. Lo que sí está medido es qué pasa al apretarla: al moler más fino no solo se encoge el grano, aumenta la proporción de finos, y son los finos los que taponan el lecho y hacen que el agua se busque un camino.",
    },
    /*
     * La única casilla de presión del sitio. La cifra es del INEI, que la publica con
     * tolerancia; lo que la nota se cuida de no decir es que sea la mejor presión posible,
     * porque eso no lo sostiene nadie. Ver `grounding`.
     */
    pressure: {
      value: "9 bar",
      note: "Es la presión que fija el estándar del espresso italiano certificado, 9 bar ± 1, y la que reconocerás en cualquier receta. Cuidado con el número grande de la caja: cuando una máquina anuncia 15 bares está publicando el tope de su bomba, no la presión a la que se prepara tu café. Ninguna de las dos definiciones que existen pide quince.",
    },
    waterTemperature: {
      /*
       * Tres documentos dan tres cifras y no miden el mismo punto, así que esto no es el
       * rango de una medición: es lo que dicen tres papeles distintos. La nota lo desglosa
       * en vez de elegir uno y presentarlo como «la» temperatura.
       */
      value: "88 – 95 °C",
      note: "Estas dos cifras no son los extremos de una medida, son documentos distintos midiendo sitios distintos. El estándar italiano pide 88 °C ± 2 a la salida del grupo. La definición que la SCA usó históricamente habla de agua calentada a 92–95 °C. Y el estudio que midió la extracción mantuvo 92 °C constantes. Si tu máquina no te deja elegirla, tampoco pasa nada: no es la palanca que decide tu café.",
    },
    totalTime: {
      /*
       * En unidad gruesa y no en «m:ss» a propósito, y aquí el motivo es más fuerte que en
       * la moka: no es solo que el reloj no mande, es que **el tiempo aquí es un síntoma**.
       * Escribirlo como reloj haría que la página dibujara un cronómetro de 30 segundos
       * para que alguien lo persiga, que es exactamente lo que la ficha desaconseja.
       * `index.ts` comprueba que ningún paso lleve «m:ss».
       */
      value: "25 – 30 s",
      note: "Es lo que tarda la extracción, no la preparación entera: antes hay que pesar, moler, repartir y apisonar. Y este tiempo no es un objetivo que perseguir, es el resultado de tu molienda. Aquí no hay cronómetro en la página porque el reloj que sirve es el de tu báscula, y porque perseguir los segundos es justo el error que cuenta el final de esta ficha.",
    },
    /*
     * Sin `output`. En los demás métodos el rendimiento es una consecuencia que la página
     * calcula: el agua menos lo que retiene el molido. Aquí el rendimiento es la cifra que
     * eliges tú y que ya está arriba, en el bloque de la dosis. Repetirla como si fuera un
     * resultado diría que sale sola, y lo que sale sola es una taza mal cortada.
     */
    cupProfile: {
      value: "Densa",
      note: "Es la bebida más concentrada del sitio, y no se parece a nada de lo demás: en unos 36 g cabe tanto café disuelto como en una taza entera de filtro. Se nota en la boca antes que en la lengua, espesa y con cuerpo, y encima lleva la crema, esa capa color avellana que se forma sola con la presión. Su estándar llega a fijar la viscosidad y la grasa mínimas, que dice bastante de lo poco que se parece a un café colado. La moka es lo más cerca que se puede estar de esto sin una máquina, y aun así no llega.",
    },
  },

  equipmentNote: {
    body: [
      "Esta es la única ficha del sitio donde lo difícil no es la técnica sino el equipo: una máquina y un molino capaces de hacer esto cuestan más que todo lo demás junto. Así que conviene decir en voz alta para quién es esta lista y para quién no.",
      "Si lo que quieres es café concentrado en tu cocina, la respuesta de este sitio no es esta página: es la moka. El espresso no es la moka mejorada, es otra bebida que necesita una bomba, y nadie tiene que gastarse eso para tomar buen café. Esta ficha sigue sirviéndote entera para otra cosa, que además es la mitad más interesante: entender lo que pasa dentro de la máquina y saber leer el chorro que te sacan en una barra.",
      "Y si ya tienes una máquina doméstica, lo que decide lo que puedes hacer con ella no es cuántos bares anuncie: es su cesta. Con una cesta normal tienes las cuatro palancas de esta ficha —dosis, molienda, reparto y cuándo cortas— y no te falta ninguna que importe. Con una cesta presurizada, la resistencia la pone un agujero y no tu café, así que la molienda deja de cambiar nada y el bucle de esta ficha no se puede aplicar. Eso no es una máquina estropeada: es una máquina contestando otra pregunta, la de sacar una taza decente y repetible de café premolido de supermercado. Lo que se paga por esa comodidad es exactamente esto, y conviene saber cuál de las dos tienes.",
    ],
    check: {
      title: "No te lo creas: dale la vuelta a la cesta",
      body: [
        "Saca la cesta del portafiltro y mírala por debajo. Si por fuera ves el mismo campo de agujeritos que ves por dentro, es una cesta normal. Si por fuera hay un suelo liso con un solo agujero pequeño, a veces con una pieza de plástico o un pin, es presurizada. Y eso significa lo que parece: si por dentro hay cien agujeros y por fuera hay uno, hay dos suelos con una cámara en medio, y quien frena el agua es ese agujero. Un agujero no cambia cuando tú cambias la molienda.",
        "Hay una segunda prueba que no exige reconocer ninguna pieza y que mide justo lo que importa: muele bastante más fino y saca otra. Si el tiempo no se mueve, la cesta está decidiendo por ti. Es la comprobación más útil de este sitio y es también la única que no tienes que creerle a nadie: la resuelves en tu cocina en cinco segundos.",
      ],
    },
  },

  equipment: [
    {
      name: "Máquina de espresso",
      note: "Lo que tiene que hacer es sostener unos 9 bar mientras cae el chorro. Los bares que anuncia la caja son el tope de su bomba, no lo que ve tu café.",
      piece: "maquina-de-espresso",
    },
    {
      name: "Cesta de filtro",
      note: "La pieza que decide si tienes método o no. Mírala por debajo antes que nada: un solo agujero es una cesta presurizada.",
      piece: "cesta-de-filtro",
    },
    {
      name: "Molino de muelas con paso fino",
      note: "Aquí no basta con que llegue a fino: tiene que moverse de poco en poco, porque el ajuste que buscas cabe entre dos clics. Hay manuales cuyo fabricante los da por capaces de espresso.",
      piece: "molino-de-muelas",
    },
    {
      name: "Báscula de 0,1 g",
      note: "Se pesan dos cosas, y las dos importan: la dosis que entra en la cesta y la bebida que cae en la taza.",
      piece: "bascula",
    },
    {
      name: "Herramienta WDT",
      note: "Varias agujas finísimas en un mango, para deshacer los grumos del molido antes de apisonar. Es el nombre con el que la vas a encontrar; una aguja de coser hace lo mismo, más despacio.",
      piece: "wdt",
    },
    {
      name: "Tamper",
      note: "Así se llama el apisonador en cualquier barra, y lo vas a oír así. Del diámetro exacto de tu cesta: está para dejar el lecho plano, no para apretarlo con fuerza.",
      piece: "tamper",
    },
  ],

  /*
   * Ningún paso lleva «m:ss», y no es una casilla a medio llenar: el reloj que sirve aquí
   * es el de la báscula, no el de la página. `index.ts` comprueba que esto concuerde con el
   * tiempo total escrito en unidad gruesa.
   */
  steps: [
    {
      time: "Previo",
      title: "Pesa {dosis} y muele justo antes",
      description:
        "Pesa el café en grano, no lo midas con la cuchara que venía en la caja, y muélelo en el momento. Si te pasas o te quedas corto de la dosis de tu cesta, ajústalo ahora: es la última vez que puedes.",
      why: "La cuchara mide volumen y el volumen del café molido cambia con el punto de molienda, así que dos cucharadas iguales pueden ser dos dosis distintas. Y la dosis es la mitad de la proporción: si no la conoces, el peso de bebida al que cortas no significa nada.",
    },
    {
      time: "Previo",
      title: "Deshaz los grumos y reparte el lecho",
      description:
        "El café recién molido cae apelmazado y en montoncitos. Remuévelo dentro de la cesta con una herramienta WDT, que son varias agujas finísimas en un mango, hasta que quede suelto y parejo, y nivélalo con un golpecito. Una aguja de coser sola hace lo mismo y tarda un poco más.",
      why: "Lo que se busca no es que esté bonito: es que el agua encuentre la misma resistencia en todas partes. Donde queda un grumo, el agua no entra; justo al lado, donde el lecho quedó flojo, entra toda de golpe. Eso es la canalización, y es el fallo más común de una extracción que se ve rara.",
    },
    {
      time: "Previo",
      title: "Apisona plano, y olvídate de la fuerza",
      description:
        "Apoya el tamper y baja recto, sin inclinarlo. Con que quede plano y compacto basta: no hace falta apretar como si estuvieras cerrando un tarro.",
      why: "Esto sorprende a casi todo el mundo. Cuando midieron la extracción probando distintas fuerzas de apisonado, no encontraron variación apreciable ni en el tiempo del chorro ni en cuánto café se extraía. Lo que el apisonado hace es nivelar. Sí notaron diferencias de sabor, pero no llegaron a medirlas. Lo que de verdad mueve el tiempo es la molienda.",
    },
    {
      time: "Previo",
      title: "Purga el grupo y engancha",
      description:
        "Deja correr un chorrito de agua antes de poner el portafiltro, limpia el borde de la cesta y engánchalo. No lo dejes puesto media hora antes: el café se cocina ahí dentro.",
      why: "El chorrito arrastra el café viejo del grupo y, sobre todo, lo pone a temperatura. Una máquina doméstica pequeña se enfría entre extracción y extracción, y la primera del día sale casi siempre distinta por eso y no por lo que hiciste.",
    },
    {
      time: "Al arrancar",
      title: "Pon la taza sobre la báscula y arranca",
      description:
        "Tara la báscula con la taza encima, arranca la máquina y pon en marcha el reloj a la vez.",
      why: "Lo que vas a leer después no son dos datos sueltos sino uno: cuánta bebida ha caído y en cuánto tiempo. Sin las dos cifras juntas no se puede corregir nada, porque un chorro rápido y uno lento pueden acabar en el mismo peso.",
    },
    {
      time: "Los primeros segundos",
      title: "Mira cómo aparece la primera gota",
      description:
        "No pasa nada durante unos segundos y de pronto empieza a caer. Fíjate en cuándo aparece y en cómo sale: debería ser un hilo único, oscuro y espeso, que cae recto.",
      why: "Esos primeros segundos son el lecho llenándose de agua y empezando a ofrecer resistencia. Si el café aparece casi de inmediato, el agua encontró el camino demasiado fácil. Si tarda muchísimo, hay demasiada resistencia. Es la lectura más temprana que vas a tener, y todavía te da tiempo a decidir si esta la tiras.",
    },
    {
      time: "Al cortar",
      title: "Corta en {bebida}",
      description:
        "Para la máquina cuando la báscula marque el peso de bebida, no cuando el reloj llegue a un número redondo.",
      why: "El peso es la mitad de la proporción que elegiste; el tiempo es solo el síntoma de tu molienda. Si cortas por reloj, cambias la receta cada vez sin querer. Si cortas por peso, la receta se queda quieta y el tiempo te informa.",
    },
    {
      time: "Después",
      title: "Pruébala y cambia una sola cosa",
      description:
        "Anota la dosis, el peso y el tiempo, prueba el café y decide un único cambio para la siguiente. Casi siempre es la molienda.",
      why: "Cambiar dos cosas a la vez es la forma más rápida de no aprender nada: si mejora, no sabes cuál de las dos fue. Este paso es el método entero, y por eso tiene su propio apartado más abajo.",
    },
  ],

  reading: {
    intro: [
      "Esta es la diferencia de fondo entre el espresso y los otros nueve métodos del sitio. En un V60 el error se paga en la taza y se corrige en la de mañana, con la receta puesta. Aquí no: la extracción que acabas de sacar es un informe. El tiempo que tardó, la forma del chorro y el color con el que terminó te dicen qué mover, y lo mueves para la siguiente, que puede ser dentro de un minuto.",
      "Dos reglas antes de la lista. La primera: se cambia una sola cosa cada vez, y la primera candidata es siempre la molienda, porque es la que más mueve el resultado. La segunda: el tiempo no es el objetivo. Un chorro que tarda 27 segundos no está bien por tardar 27 segundos; tarda eso porque tu molienda está donde está.",
      "Las dos últimas señales de la lista son de sabor, y van al final a propósito: así es como se leen en la práctica, pero no hay una medición publicada que fije que lo agrio sea siempre corto y lo amargo siempre largo. Las cinco primeras sí se apoyan en lo que el estudio midió.",
    ],
    signals: [
      {
        observation: "Cae enseguida y termina en 15 segundos",
        meaning:
          "El agua encontró poca resistencia y salió antes de haber disuelto gran cosa. Con esa velocidad, buena parte del lecho apenas se ha mojado por dentro.",
        change:
          "Aprieta la molienda un paso y vuelve a sacarla con la misma dosis y el mismo peso de bebida. Un solo paso: el ajuste que buscas suele caber entre dos clics.",
      },
      {
        observation: "Pasa medio minuto y apenas gotea",
        meaning:
          "Demasiada resistencia. O la molienda está muy fina —y hay tantos finos que el lecho se ha atascado por zonas— o hay más café del que esa cesta lleva bien.",
        change:
          "Abre la molienda un paso. Si ya la tienes muy abierta y sigue pasando, entonces sí baja la dosis: el estudio demuestra que con menos café y molienda más gruesa se llega a la misma extracción con mucha menos variación.",
      },
      {
        observation: "El chorro se abre en abanico o sale a chorritos por varios sitios",
        meaning:
          "Canalización. El agua encontró un camino fácil y se fue por ahí; en el resto del lecho hay zonas por las que directamente no pasa nada, y por tanto café que no se ha extraído.",
        change:
          "No toques la molienda: esto no lo causó ella. Repite cuidando el reparto —deshaz los grumos de verdad— y apisonando plano.",
      },
      {
        observation: "Empieza oscuro y espeso y de pronto se vuelve pálido y aguado",
        meaning:
          "Eso que aclara es el final: lo que sale a partir de ahí ya lleva muy poco café disuelto y sí bastante de lo que amarga. En una barra lo llaman «rubio».",
        change:
          "Corta ahí, aunque no hayas llegado al peso. Si te pasa muy pronto y a menudo, es que estás pidiéndole a esa dosis más bebida de la que puede dar: baja el peso de bebida o sube la dosis.",
      },
      {
        observation: "Dos extracciones iguales en tiempo y en peso, y saben distinto",
        meaning:
          "No es cosa tuya. El estudio llegó a la misma extracción del 22 % con dos moliendas distintas, y deja escrito que la composición química de la rápida no puede ser la misma que la de la lenta. Un número igual no es una taza igual.",
        change:
          "Nada, y eso es lo que enseña: los números sirven para repetir lo que ya te gusta, no para decidir por ti si está bueno. Esa parte se prueba.",
      },
      {
        observation: "Sabe agria y como vacía",
        meaning:
          "Es como se lee una extracción que se quedó corta: salió demasiado pronto y se llevó lo que se disuelve primero, sin lo que viene detrás.",
        change:
          "Aprieta la molienda un paso, o sube un poco el peso de bebida manteniendo la dosis.",
      },
      {
        observation: "Sabe amarga y deja la boca seca",
        meaning:
          "Es como se lee lo contrario: demasiada extracción, o un lecho atascado del que una parte se ha extraído muchísimo mientras otra no se tocaba.",
        change:
          "Abre la molienda un paso. Si el chorro además salía torcido o en abanico, arregla antes el reparto: puede que no sobre extracción, puede que sobre canalización.",
      },
    ],
  },

  commonMistakes: [
    {
      problem: "Dosificas con la cuchara que venía en la caja",
      cause:
        "La cuchara mide volumen, y el mismo volumen de café molido pesa distinto según el punto de molienda y el grano.",
      fix: "Pesa la dosis. Es el cambio más barato que existe en este método: una báscula de 0,1 g cuesta poco y es lo que convierte el resto de la ficha en algo que se puede repetir.",
    },
    {
      problem: "Usas café premolido de bolsa",
      cause:
        "Viene molido para goteo, mucho más grueso de lo que pide una cesta normal, y además lleva semanas molido.",
      fix: "Si tienes molino, muele en el momento. Si no lo tienes, ya sabes qué palanca te falta: sin poder mover la molienda no hay nada que calibrar, y lo honesto es decirlo en vez de venderte que se arregla apretando más el tamper.",
    },
    {
      problem: "Aprietas más fuerte para que tarde más",
      cause:
        "Parece razonable: si compactas más, el agua debería costarle más pasar.",
      fix: "No funciona, y está medido: probando distintas fuerzas de apisonado no apareció variación apreciable ni en el tiempo ni en la extracción. El tamper está para dejar el lecho plano. Lo que mueve el tiempo es la molienda.",
    },
    {
      problem: "Cambias dos cosas a la vez",
      cause:
        "La extracción salió mal, tocas la molienda y de paso la dosis, y la siguiente sale bien.",
      fix: "Y ahora no sabes cuál de las dos lo arregló, así que mañana empiezas de cero. Un cambio por extracción, siempre, y la molienda primero.",
    },
    {
      problem: "La primera del día siempre sale rara",
      cause: "La máquina está fría, y una máquina doméstica pequeña se enfría rápido.",
      fix: "Deja correr agua por el grupo con el portafiltro puesto un par de veces antes de la primera, para calentar el metal. Y no la juzgues: si vas a calibrar, calibra con la segunda.",
    },
    {
      problem: "Persigues los 25 segundos",
      cause:
        "Es la cifra que aparece en todas partes, así que parece el objetivo del ejercicio.",
      fix: "Es un síntoma, no una meta, y hay un motivo serio para desconfiar de ella: está contado al final de esta ficha. Corta por peso, mira el tiempo y usa el sabor para decidir hacia dónde mover la molienda.",
    },
  ],

  /*
   * Fuente: Cameron et al., Matter (2020), apartado de implementación. La cafetería es de
   * Eugene (Oregón) y el protocolo se implantó en 2017. Se deja fuera el ahorro en dólares
   * —precios de 2018-19— y se queda el 25 %, que no caduca.
   */
  funFact: {
    text: "El estudio que mejor ha medido el espresso termina recomendando usar menos café: bajando la dosis y moliendo más grueso se llega a la misma extracción con mucha menos variación. Una cafetería de Oregón lo aplicó y recortó un 25 % el café de cada bebida sin perder taza.",
    source: "Cameron et al., Matter (2020)",
  },

  grounding: {
    body: [
      "Esta ficha está construida sobre dos documentos y unas cuantas hojas de producto. El primero es el folleto del Istituto Nazionale Espresso Italiano, que es quien certifica el espresso italiano y publica sus valores con tolerancia: 7 g ± 0,5 de café, 88 °C ± 2 a la salida del grupo, 9 bar ± 1, 25 segundos ± 5 y 25 ml ± 2,5 en la taza, crema incluida. El segundo es un estudio de Cameron y sus colegas publicado en Matter en 2020, que modeló la extracción y además la midió en una cafetería de verdad; de él salen casi todas las afirmaciones sobre qué pasa dentro del lecho, y se leyó entero y no solo el resumen.",
      "Hay una tercera fuente que vas a ver citada y que nosotros no leímos: la definición de la SCA. Sus cifras —25 a 35 ml de bebida, 7 a 9 g de café, agua a 92-95 °C, 9 a 10 bar y 20 a 30 segundos— las conocemos porque el estudio de Matter las reproduce textualmente; su propia web no respondió cuando fuimos a buscarlas. Lo decimos porque no es lo mismo: cuando leas aquí «la SCA dice», entiéndelo como «el estudio cita que la SCA decía». El propio estudio la llama definición histórica, y añade que esos números están hoy muy despegados de lo que hacen las cafeterías.",
      "Y ahora los 25 segundos, que es lo mejor que tenemos para contar y también lo más incómodo. Es la cifra más repetida del espresso: el estándar italiano pide 25 ± 5 y la SCA pedía de 20 a 30. Aquí no hay ningún problema de fuente, las dos están escritas y son verificables. El problema es otro, y lo señala el propio estudio: obligarse a que la extracción dure eso empuja a moler más fino de la cuenta, y moler más fino aumenta la proporción de finos hasta que el lecho se atasca por zonas. Sus palabras, midiendo: «we speculate that this might be partially responsible for the prevailing empirical truth that most coffee is brewed using grind settings that cause partially clogged/inhomogeneous flow». Traducido a lo que te importa: es posible que el shot perfecto de 25 segundos que persigue medio mundo esté, casi siempre, del lado malo.",
      "Conviene ver por qué eso puede pasar sin que nadie se dé cuenta. Cuando midieron la extracción a distintas moliendas les salió una curva con una cima: al ir apretando la molienda la extracción sube, y a partir de cierto punto vuelve a bajar. Ese descenso no es que el café dé menos de sí; es que hay partes del lecho por las que ya no pasa agua. Desde fuera se ve un chorro razonable y un tiempo bonito, y por dentro hay café sin tocar al lado de café sobreextraído. La cifra redonda no miente sobre el reloj: miente sobre lo que ese reloj significa.",
      "Con los 9 bar pasa algo parecido y merece la pena separarlo bien. Como convención está perfectamente documentada: el instituto italiano la fija con tolerancia y es lo que reconoce cualquiera. Como *óptimo demostrado* no lo sostiene ningún documento que hayamos encontrado, y lo poco que hay medido apunta al revés: el estudio observa que la extracción sube cuando la presión baja, y cuenta que con la máquina puesta a 9 bar se les atascaba en las moliendas finas, así que tuvieron que bajarla a 6 para poder trabajar. O sea que todas las cifras de su curva son a 6 bar, no a 9. Nueve bares es la presión en la que la industria se puso de acuerdo, y eso ya es bastante: no hace falta convertirlo en el mejor número posible.",
      "Lo que nos lleva al número de la caja. Muchas máquinas domésticas anuncian 15 bares, y en Colombia lo verás en la ficha de una Kalley K-EX igual que en casi cualquier otra. Ese quince no es la presión a la que se prepara tu café: es la especificación de la bomba, escrita como máximo —«Max pressure: 15 bar» en la hoja del componente que llevan estas máquinas—. Y el máximo de una bomba es la presión que alcanza cuando no sale nada; un espresso solo existe mientras algo sale. Ninguna de las dos definiciones que existen pide quince bares, y nadie ha publicado a cuántos llega de verdad una máquina así en el lecho: el fabricante no lo dice y no hay medición. Así que del quince solo se puede afirmar lo que es, que es el techo de una pieza.",
      "Son ya tres números de este sitio con la misma avería: los 196 °C del primer crack, que miden la sonda del bombo y no el grano; los 9 bar, que son un acuerdo y no un óptimo; y estos 15, que miden un componente y se leen como una medida de la taza. Los tres suenan a mejor. Ninguno de los tres dice lo que parece.",
      "Sobre los molinos, y aquí hay un hueco que preferimos dejar visible. Que existen molinos manuales pensados para espresso es cierto y lo dice quien los fabrica: 1Zpresso publica que su J-Max mueve las muelas 8,8 micras por clic y lo describe como perfecto para espresso. Pero llegar al calibre y moler parejo no son lo mismo, y son cosas distintas incluso dentro del mismo molino: el estudio mide que el tamaño de los trozos grandes lo fija la separación entre las muelas, mientras que los finos se producen en el punto donde el grano se rompe. A nueve bares, esos finos son los que deciden si el agua se busca un camino. Lo que nadie ha publicado es una comparación de uniformidad entre molinos manuales y eléctricos de espresso. El trabajo más serio que hay —trescientas distribuciones de tamaño de partícula medidas con instrumento por Jonathan Gagné— no incluyó ni un molino manual, y su autor escribe que ni siquiera está claro que esas diferencias de uniformidad se noten en la taza. Así que no vas a leer aquí que un molino manual sirva o no sirva: no se sabe.",
      "Terminamos con la altura, que en este sitio suele cambiarlo todo y aquí no cambia casi nada. En los otros nueve métodos, estar en Bogotá se nota: el agua hierve cerca de los 91 °C y eso pone un techo a la temperatura. En la moka va más lejos y se mete dentro del aparato, porque una moka funciona por la diferencia entre la presión de dentro y la del aire de fuera. El espresso es el único método del sitio donde la altura se queda fuera: la presión la pone una bomba y no la atmósfera, y a nueve bares el agua ni se acerca a hervir. Hay un matiz honesto: los bares de una bomba se cuentan sobre la presión del aire de alrededor, así que en Bogotá la presión absoluta que atraviesa el lecho es un par de puntos porcentuales menor que al nivel del mar. Nadie ha medido si eso se percibe, y nosotros tampoco.",
      "Una cosa más que esta ficha no hace y que quizá esperabas: explicar de qué está hecha la crema. Existe el trabajo de referencia, de Illy y Navarini, pero solo pudimos leer su resumen, así que aquí la crema se usa como lo que se ve —una capa color avellana y el momento en que el chorro aclara— y no se describe su química. El día que se lea el texto completo, este es el sitio donde ampliarlo.",
    ],
    references: [
      {
        publisher: "Istituto Nazionale Espresso Italiano",
        title:
          "The Certified Italian Espresso and Cappuccino, folleto del instituto — de aquí salen los 9 bar, los 88 °C, los 25 segundos y los 25 ml",
        url: "https://olaszpresszo.hu/wp-content/uploads/2014/04/istituzionale_inei_hq_en.pdf",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Matter",
        title:
          "Cameron, M. I. et al., «Systematically Improving Espresso: Insights from Mathematical Modeling and Experiment» (2020) — el manuscrito completo se puede leer en OSTI",
        url: "https://www.osti.gov/pages/biblio/1973594",
        retrieved: "2026-09-13",
      },
      {
        publisher: "1Zpresso",
        title:
          "Serie J, especificaciones del fabricante — las 8,8 micras por clic del J-Max y su «perfect for espresso»",
        url: "https://1zpresso.coffee/j/",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Gaggia",
        title:
          "Pressurized Filter Basket Kit with 2-Way Pin, página de producto — para qué vende el fabricante una cesta presurizada",
        url: "https://www.gaggia-na.com/products/pressurized-filter-basket-kit-with-2-way-pin",
        retrieved: "2026-09-13",
      },
      {
        publisher: "HiBREW",
        title:
          "Dual Wall vs Single Wall Espresso Baskets — la descripción de las dos paredes y el agujero único, por un fabricante de máquinas",
        url: "https://www.hibrew.com/blogs/brew-guides/dual-wall-vs-single-wall-espresso-baskets",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Kalley",
        title:
          "Cafetera Expreso KALLEY K-EX, ficha de producto — los «15 Bares», las «10 tazas» del depósito y los dos filtros",
        url: "https://www.kalley.com.co/cafetera-expreso-kalley-k-ex-negra/p/7705946997089",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Espresso Parts",
        title:
          "Ulka EX5, ficha del distribuidor — el «Max pressure: 15 bar» de la bomba; la hoja del propio fabricante no fue accesible",
        url: "https://www.espressoparts.com/products/230v-ulka-ex5-vibratory-pump",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Coffee ad Astra",
        title:
          "Gagné, J., «What I learned from analyzing 300 particle size distributions for 24 espresso grinders» (2023) — autopublicado, y no incluye ningún molino manual",
        url: "https://coffeeadastra.com/2023/09/21/what-i-learned-from-analyzing-300-particle-size-distributions-for-24-espresso-grinders/",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Food Biophysics",
        title:
          "Illy, E. y Navarini, L., «Neglected Food Bubbles: The Espresso Coffee Foam» (2011) — solo se pudo leer el resumen, y por eso la ficha no describe la crema",
        url: "https://link.springer.com/article/10.1007/s11483-011-9220-5",
        retrieved: "2026-09-13",
      },
    ],
  },
};
