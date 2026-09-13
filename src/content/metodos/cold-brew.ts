import type { BrewMethod } from "./types";

/**
 * Sexto método del sitio, el más fácil de todos y el único donde el calor no participa:
 * lo que en los otros cinco hace la temperatura en tres minutos, aquí lo hace el tiempo
 * en catorce horas. Esa frase es el método entero y por eso está en el titular, en la
 * casilla de temperatura y en el paso de la espera.
 *
 * Rompe tres cosas que hasta ahora eran comunes a todas las fichas, y las tres están
 * resueltas a la vista y no en silencio:
 *
 * - **Su tiempo total son horas, no minutos.** Se escribe «14 – 18 h», que el sitio no
 *   puede leer como reloj, así que no se dibuja cronómetro. Era lo correcto aunque el
 *   cronómetro funcionara: uno que contara hacia adelante durante catorce horas no
 *   serviría para nada. Escribirlo «14:00 – 18:00» habría sido peor que un error: el
 *   sitio lo habría entendido como catorce minutos y habría pintado un cronómetro
 *   equivocado sin avisar. Por eso `index.ts` ahora comprueba las dos direcciones.
 * - **No hay temperatura de agua que elegir... salvo que sí la hay.** Se pensó en
 *   quitar la casilla, como se quitó el ratio de la moka, y se decidió que no: la moka
 *   no tiene ratio porque no hay respuesta, y aquí la respuesta existe y es la que
 *   define el método. «Del tiempo, o de la nevera» no es un «no aplica».
 * - **Es el primer método clasificado con el sistema nuevo desde cero**, sin una
 *   clasificación previa que confirmar. Sale 20,0 y es el más fácil del sitio. Ver la
 *   nota de `difficulty`.
 *
 * Y una cuarta que llegó después: **es el primer método cuya ficha técnica deja
 * elegir un dato en vez de enseñarlo**. Listo para beber o concentrado no son dos
 * recetas: son la misma agua entrando en un momento o en dos, así que la taza que sale
 * es la misma y el rendimiento no se mueve al cambiar de opción. Eso, que parece un
 * error de la página, es justo lo que el método tiene que enseñar, y por eso la
 * elección vive en la casilla del ratio —donde se ve el ratio cambiar, la barra
 * acortarse y el rendimiento quedarse quieto— y no en un paso del paso a paso. El paso
 * que antes decía «si lo quieres concentrado, parte el agua en dos» desapareció: era
 * una decisión disfrazada de instrucción, y se toma antes de empezar.
 *
 * Sobre las cifras, que en este método son casi todas repetidas y no medidas.
 *
 * La ficha se apoya en un estudio que no podía encajar mejor con este sitio: café
 * colombiano, variedad caturra de Huila y Nariño, micro-lotes de especialidad comprados
 * en Bogotá, medido por gente de la Universidad de La Sabana y la Universidad Nacional.
 * De ahí salen la molienda, las horas y el orden de magnitud del ratio, y de ahí sale
 * también el mejor hallazgo de la ficha: a 22 horas se extrae más y se cata peor.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **«El cold brew tiene un 67 % menos de acidez».** No se afirma, pero tampoco se
 *   calla: se cuenta en `grounding` por qué no significa lo que parece. Es la misma
 *   cifra sin dueño que el «quinto de la acidez» del AeroPress, y ahora hay una
 *   medición que oponerle. El artículo pendiente sobre la acidez lo contará con más
 *   sitio; aquí cabe lo justo para que nadie se vaya creyéndoselo.
 * - **«El cold brew tiene más cafeína»**, con las cifras de Fuller y Rao (2017): unos
 *   1.230 mg/L en frío contra unos 970 mg/L en caliente, molienda gruesa. No se
 *   escribe ninguna de las dos. No se pudo comprobar que el caliente se preparase con
 *   la misma proporción que el frío, y si los dos no se calculan sobre lo mismo la
 *   comparación no dice nada: es el error de los denominadores otra vez.
 * - **«Dura de 7 a 10 días en la nevera».** Circula en todas las guías y no hay nada
 *   detrás. Lo medido apunta justo al revés —el único estudio que lo siguió no
 *   encontró crecimiento bacteriano en semanas— pero lo hizo en laboratorio, con
 *   envase cerrado y con un café de cuatro horas, que no es el frasco que se abre cada
 *   mañana. Así que se escribe la dirección y ningún número: lo que se acaba antes es
 *   el sabor, no la seguridad.
 * - **«12 horas», «24 horas».** Son las cifras que repiten las guías y ninguna sale de
 *   una medición. Las que sí están medidas no coinciden entre sí: un estudio infusiona
 *   4 horas, otro encuentra que la cafeína deja de salir entre la sexta y la séptima,
 *   otro cata a 14 y a 22. Nuestro 14 – 18 h es elección del sitio, dicha como tal.
 * - **Cuánto cambia la nevera frente a la encimera.** La dirección está medida en
 *   varios sitios —más frío extrae más despacio—, pero las cifras concretas están en
 *   estudios que no se pudieron abrir. Se escribe la dirección sin números.
 *
 * Fuentes consultadas el 2026-09-13: Córdoba, N., Pataquiva, L., Osorio, C., Moreno,
 * F. L. y Ruiz, R. Y., «Effect of grinding, extraction time and type of coffee on the
 * physicochemical and flavour characteristics of cold brew coffee», Scientific Reports
 * 9:8440 (2019), texto completo abierto; Rao, N. Z. y Fuller, M., «Acidity and
 * Antioxidant Activity of Cold Brew Coffee», Scientific Reports 8:16030 (2018), del que
 * solo se pudo leer el resumen; Fuller, M. y Rao, N. Z., «The Effect of Time, Roasting
 * Temperature, and Grind Size on Caffeine and Chlorogenic Acid Concentrations in Cold
 * Brew Coffee», Scientific Reports 7:17979 (2017); Lopane, E. et al., «An investigation
 * of the shelf life of cold brew coffee...», Food Science & Nutrition (2024).
 */
export const coldBrew: BrewMethod = {
  slug: "cold-brew",
  name: "Cold brew",
  tagline:
    "Café hecho sin una sola gota de agua caliente. Lo que en los demás métodos hace el calor en tres minutos, aquí lo hace el tiempo en catorce horas: se deja el café en agua del tiempo, se olvida uno de él y al día siguiente está hecho.",
  image: {
    // Foto pendiente: la ruta ya está escrita y el archivo todavía no. Hasta que se
    // guarde, `resolveContentImage` deja el bloque de color en su sitio. El alt se
    // escribe ya: es lo que dice qué fotografía hay que ir a buscar.
    file: "/images/metodos/cold-brew.jpg",
    alt: "Un frasco de vidrio alto sobre una encimera clara, lleno hasta la mitad de agua que ya se ha vuelto marrón oscura, con el café molido grueso suspendido y una capa de posos flotando en la superficie. Al lado, un vaso con hielo en el que alguien está sirviendo café frío desde otro frasco, y la tapa metálica apoyada boca arriba.",
    credit: null,
  },

  /*
   * 20,0 sobre 100: nivel 1, y el método más fácil del sitio por diez puntos. Es el
   * primero que se clasifica con este sistema sin una clasificación previa que
   * confirmar, así que conviene dejar escrito qué se comprobó.
   *
   * El resultado depende de una sola nota: el 5 en margen para rectificar. Con un 4 el
   * score sube a 30,0 y el cold brew caería detrás de la prensa francesa. Si algún día
   * alguien discute esta clasificación, es ahí donde hay que mirar y no en los cortes.
   *
   * Sobre la observabilidad, que era el eje que este método tenía que poner a prueba:
   * es el menos observable del sitio y aun así el más fácil, que es lo correcto. Aporta
   * 7,5 de los 20 puntos —más de un tercio del score con un peso de 0,1— y aun así no
   * cambia nada: moviendo esa nota entre 1 y 5 el total va de 12,5 a 22,5 y el cold
   * brew sigue siendo el primero en todos los casos. O sea que el eje no se justifica
   * por reordenar, sino por no distorsionar.
   *
   * Lo que sí lo justifica apareció al medirlo, y no lo habíamos visto: la prensa
   * francesa y el colado en tela tienen las mismas tres notas en los ejes pesados
   * (2, 4, 2). La observabilidad, 3 y 4, es lo único que los separa. Sin ese eje esos
   * dos empatarían exactamente y el orden del índice lo decidiría el abecedario.
   */
  difficulty: {
    cost: {
      value: 2,
      why: "Ninguno de sus errores se lleva la taza: dos horas de más o de menos apenas se notan, y lo que sale flojo se arregla con menos agua al servir. Lo único que sí la cambia de verdad es moler demasiado fino, y eso es lo que le impide bajar a 1.",
    },
    recovery: {
      value: 5,
      /*
       * La única nota de 5 del sitio, y la que decide esta clasificación. Lo que la
       * sostiene no es la duración de la espera —eso sería medir el tiempo y no el
       * margen— sino que aquí hay dos correcciones posibles, y la segunda ocurre
       * cuando el café ya está hecho. Ningún otro método tiene eso.
       */
      why: "Durante el reposo puedes probarlo y colarlo cuando te guste, y una vez colado todavía decides la fuerza con el agua que le pongas al servir. Es el único método del sitio donde se corrige después de que el café está hecho.",
    },
    complexity: {
      value: 2,
      /*
       * La misma nota que la prensa francesa, y por la misma razón: es la misma
       * estructura de gestos. Que la espera dure catorce horas en vez de cuatro
       * minutos no entra aquí; este eje mide cuántas acciones hay que encadenar y con
       * cuánta coordinación, no cuánto dura la que no pide nada.
       */
      why: "Echar, esperar, colar y servir. La misma estructura que la prensa francesa: ningún vertido por tandas, ningún tiempo que cumplir, ningún gesto que coordinar con otro.",
    },
    observability: {
      value: 2,
      why: "El agua se oscurece en la primera hora y a partir de ahí no vuelve a decir nada: el color no distingue ocho horas de dieciséis. La única señal de verdad es probarlo, y hay que ir a buscarla abriendo el frasco.",
    },
  },

  recipe: {
    coffeeGramsPerCup: 15,
    /*
     * Los mismos 15 g por taza que los otros cuatro métodos que calculan. Esa es la
     * unidad que de verdad comparte el sitio: los mililitros ya no coinciden entre
     * fichas (210 en el V60, 195 en el AeroPress y en la tela, 180 en la prensa),
     * porque dependen del ratio y de lo que retiene cada método. Lo que permite
     * comparar es que dos tazas sean 30 g de café en cualquier método.
     *
     * Aquí salen 135 ml por taza, menos que en los demás, y no es un descuadre: es un
     * café más fuerte y es el único que se sirve sobre hielo, que es lo que acaba de
     * llenar el vaso.
     */
    waterRetainedPerGram: 2,
    /*
     * Los mismos 2 g por gramo de café que el V60, y por el mismo motivo: aquí la
     * única pérdida es el agua que se queda el molido. No hay fondo turbio que
     * descartar como en la prensa, porque el frasco se vierte entero por el colador.
     *
     * Esta cifra es la que hace que el concentrado cuadre, así que conviene entenderla
     * bien: lo que el café retiene depende del café, no del agua. Da igual cuándo
     * entre esa agua.
     */
    // Sin hitos de vertido sueltos: aquí el agua entra de una vez o en los dos
    // momentos que declara `waterSplit`, y esos dos se eligen.
    waterMarks: {},
    /*
     * Las dos formas de repartir la misma agua, en gramos por gramo de café. Las dos
     * suman 11, que es el ratio de la ficha, y esa suma no es una coincidencia
     * afortunada: es la razón por la que se eligió 1:5 para el concentrado y no 1:4,5,
     * que es donde también lo ponen las guías. Con 4,5 los números no sumaban limpio y
     * la página habría dicho «echa 70 y luego 100» cuando el ratio dice 165.
     *
     * El orden importa, porque la primera es la que se ofrece al entrar: se entra por
     * la sencilla. Quien no ha hecho nunca un cold brew no tiene por qué empezar
     * decidiendo si lo quiere concentrado.
     */
    waterSplit: {
      question: "Cómo entra el agua",
      options: [
        {
          key: "listo",
          label: "Listo para beber",
          jarPerGram: 11,
          atServingPerGram: 0,
          note: "Toda el agua entra al frasco desde el principio, y lo que sale de ahí ya es café: del frasco al vaso con hielo, sin añadir nada. Es la forma más sencilla y la que más sitio ocupa en la nevera.",
        },
        {
          key: "concentrado",
          label: "Concentrado",
          jarPerGram: 5,
          atServingPerGram: 6,
          note: "Al frasco entran solo {frasco} y los otros {alServir} los pones tú al servir, con agua o con leche. La taza que sale es la misma —{rendimiento}— porque el café retiene lo que retiene, unos {retenida}, entre cuando entre el agua: por el camino largo son {agua} menos esos {retenida}; por el corto, {frasco} menos los mismos {retenida}, y encima los {alServir} que añades limpios al final. Por eso la barra se acorta y el rendimiento no se mueve. Lo que ganas partiendo el agua es sitio: cuatro tazas ocupan poco más de medio litro listas para beber, y menos de un tercio de eso concentradas. Lo que pierdes es poder beberlo directo del frasco.",
        },
      ],
    },
    /*
     * Se mantiene el 2 aunque esperar catorce horas para dos vasos sea poco eficiente:
     * quien prueba el método por primera vez no va a llenar un frasco de ocho tazas
     * para ver si le gusta. Y el 8 está arriba porque es justo donde el método empieza
     * a compensar.
     */
    cupOptions: [2, 4, 6, 8],
  },

  specs: {
    ratio: {
      /*
       * ELECCIÓN DEL SITIO, NO DATO MEDIDO. Igual que el 1:15 del AeroPress. Las guías
       * sitúan el cold brew listo para beber entre 1:10 y 1:11, y ninguna dice de
       * dónde sale.
       *
       * Lo que sí está medido, y por eso se cita en la nota: el estudio colombiano
       * infusionó «60 g ground coffee per 700 g water», que es 1:11,7 —prácticamente
       * esta misma proporción—, aunque ellos tampoco la presentan como óptima: es la
       * que eligieron para su experimento. Nuestro 1:11 se elige redondo porque hace
       * que los dos momentos del agua sumen exacto.
       */
      value: "1:11",
      note: "Es la proporción que este sitio elige dentro de lo que usan las guías, no un óptimo medido: nadie ha publicado cuál es el mejor. El estudio colombiano en el que se apoya esta ficha infusionó con 1:11,7, que viene a ser esta misma. Lo que eliges arriba no cambia esa proporción: cambia si toda esa agua entra en un momento o en dos.",
    },
    grind: {
      /*
       * Fuente: Córdoba et al. (2019). Compararon molienda media (501–700 μm) con
       * gruesa (701–900 μm) y la gruesa dio más extracción y mejor cata. Las micras no
       * se escriben en la página: nadie tiene un molino con esa escala, y la casilla
       * del sitio es la que orienta.
       */
      value: "Gruesa",
      note: "Como la sal marina gruesa, igual que en la prensa francesa: se distinguen los trozos a simple vista. Aquí importa más que en ningún otro método, porque el café va a estar catorce horas en el agua y el polvo que deja un molino de cuchillas se sigue extrayendo todo ese rato. Es lo que pone el café turbio y áspero.",
    },
    waterTemperature: {
      /*
       * La casilla se conserva, y es lo contrario de un «no aplica»: aquí está la
       * respuesta que define el método entero. Se estuvo a punto de quitarla —como se
       * quitó el ratio de la moka— y habría sido un error: la moka no tiene ratio
       * porque quien prepara no lo elige; aquí sí hay una decisión que tomar, y tiene
       * consecuencias medidas.
       *
       * La dirección está medida en varios estudios: más frío extrae más despacio, así
       * que la nevera pide más horas que la encimera. Las cifras concretas no se
       * escriben porque están en trabajos que no se pudieron abrir.
       */
      value: "Del tiempo, o de la nevera",
      note: "Aquí no se calienta nada, y no es que el agua caliente esté prohibida: es que no hace falta. Lo que el calor consigue en tres minutos, el tiempo lo consigue solo. Puedes dejar el frasco en la encimera o en la nevera; en la nevera va más despacio, así que pídele un par de horas más. En Bogotá la diferencia es menor que en tierra caliente, porque aquí la encimera ya está fresca.",
    },
    totalTime: {
      /*
       * ELECCIÓN DEL SITIO dentro de lo medido, no una cifra copiada. Las guías dicen
       * «12 a 24 horas» sin fuente. Lo medido no coincide entre sí: Córdoba et al.
       * cataron 14 h y 22 h y el mejor fue el de 14; Fuller y Rao encontraron que la
       * cafeína y el ácido clorogénico dejan de salir entre la sexta y la séptima
       * hora; un tercer trabajo infusiona 4 h. Se elige 14 – 18 h porque el extremo
       * bajo es el único que alguien cató y le gustó, y porque 18 deja margen para la
       * nevera sin llegar a las 22 que se cataron peor.
       *
       * Escrito en horas a propósito: el sitio lee «m:ss» como cronómetro, así que
       * esta forma es la que dice que aquí el reloj no manda. Ver `index.ts`.
       */
      value: "14 – 18 h",
      note: "Desde que el café se moja hasta que se cuela. Es el rango que elige este sitio, no un óptimo: más horas extraen más, pero no saben mejor.",
    },
    output: {
      value: "{rendimiento}",
      note: "Lo que llega al vaso, y es el mismo en las dos opciones de arriba: el molido se queda con unos {retenida} de agua, y eso no depende de cuándo entre. Hecho concentrado, del frasco sale bastante menos líquido —el resto del agua lo pones tú al servir— y el vaso acaba igual de lleno.",
    },
    cupProfile: {
      value: "Dulce",
      note: "Es la taza más dulce y menos amarga del sitio, y la que menos se parece a lo que el mismo café da en caliente. Sin calor no salen los compuestos que pican y raspan, así que lo que queda es el azúcar del grano y una acidez suave. Lo que también se pierde es la nariz: el aroma que sube de una taza caliente aquí casi no está.",
    },
  },

  /*
   * Cuatro piezas, y tres ya estaban en el catálogo. La lista corta vuelve a ser el
   * dato: no hay hervidor porque no se calienta agua, y no hay cronómetro porque el
   * reloj de la cocina sobra cuando la espera dura una noche.
   */
  equipment: [
    {
      name: "Frasco de vidrio con tapa",
      note: "De boca ancha, para poder sacar los posos después. La tapa importa: el café va a pasar la noche en la nevera al lado de la comida.",
      piece: "frasco-con-tapa",
    },
    {
      name: "Molino de muelas",
      note: "El de cuchillas deja polvo, y aquí el polvo se está extrayendo catorce horas seguidas.",
      piece: "molino-de-muelas",
    },
    {
      name: "Colador de tela",
      note: "O un filtro de papel dentro de un colador normal. Sirve cualquier cosa que retenga el molido: aquí no tiene que aguantar ningún caudal.",
      piece: "colador-de-tela",
    },
    {
      name: "Báscula",
      note: "Sin temporizador ni precisión de 0,1 g: aquí se pesa una vez y no se cronometra nada.",
      piece: "bascula",
    },
  ],

  /*
   * Ninguno de estos tiempos tiene la forma «m:ss», así que el sitio no dibuja
   * cronómetro. Es lo correcto por partida doble: uno que contara hacia adelante
   * durante catorce horas no serviría de nada, y además el reloj aquí no marca ningún
   * gesto, porque no hay ninguno que hacer entre el principio y el final.
   */
  steps: [
    {
      time: "Previo",
      title: "Muele {cafe} de café, grueso",
      description:
        "Grueso de verdad, como la sal marina: los trozos se tienen que distinguir a simple vista. Si compras el café ya molido, pide el de prensa francesa.",
      why: "El molido va a estar catorce horas dentro del agua, así que no hay forma de pararlo cuando ya ha soltado bastante. Los trozos grandes sueltan despacio y llegan a la mañana siguiente en su punto; el polvo de un molino de cuchillas sigue soltando toda la noche, y eso es lo que pone el café turbio y áspero.",
    },
    {
      time: "Al empezar",
      title: "Échalo en el frasco y añade {frasco} de agua",
      description:
        "Agua del grifo, del tiempo, sin calentar. Échala encima del café de una vez y sin cuidado: aquí no hay vertido que controlar.",
      why: "Esta es la única diferencia real con los otros cinco métodos y es lo que conviene entender del cold brew: el agua fría disuelve las mismas cosas que la caliente, solo que mucho más despacio y no todas por igual. El calor no es imprescindible para hacer café; es un acelerador. Quitarlo y poner tiempo en su lugar da una taza distinta, no una taza mal hecha.",
    },
    {
      time: "Antes de tapar",
      title: "Remueve hasta que no quede café seco",
      description:
        "Dale vueltas con una cuchara larga hasta que no flote ningún grumo seco. Después tapa el frasco.",
      why: "El molido grueso flota y forma una costra en la superficie, y lo que queda por encima del agua no se está extrayendo: esa parte del café la has pagado y no la vas a beber. Es el único gesto de todo el método que hay que hacer bien.",
    },
    {
      time: "14 – 18 h",
      title: "Déjalo y vete",
      description:
        "En la encimera o en la nevera, las dos valen. En la nevera va más despacio, así que dale un par de horas más. No hay nada que vigilar ni nada que remover a mitad.",
      why: "Aquí es donde el tiempo hace el trabajo del calor, y también es lo que este método no te deja ver: el agua se oscurece en la primera hora y a partir de ahí el color ya no distingue ocho horas de dieciséis. La única forma de saber cómo va es probarlo, así que si te da curiosidad, pruébalo: no lo estropea y es la mejor manera de aprender a qué sabe cada hora.",
    },
    {
      time: "Al colar",
      title: "Cuélalo y tira los posos",
      description:
        "Vierte el frasco entero por el colador de tela o por un filtro de papel, sin exprimir lo que quede dentro. Si el café sale turbio, pásalo una segunda vez.",
      why: "Sin colar, el café sigue extrayéndose dentro del frasco y lo que hoy está en su punto mañana está amargo. Apretar los posos para sacar las últimas gotas trae justo las que no quieres: la parte más fina del molido, que es la que enturbia la taza.",
    },
    {
      time: "Al servir",
      title: "Sobre hielo, o con agua o leche si va concentrado",
      description:
        "Si lo hiciste listo para beber, va tal cual sobre hielo. Si lo hiciste concentrado, encima va el agua o la leche que guardaste, hasta llenar el vaso. Lo que sobre, tapado y a la nevera.",
      why: "Guardado en frío, lo primero que se va no es la seguridad sino el sabor: pierde aroma y se vuelve plano bastante antes de que haya ningún motivo para preocuparse. La respuesta honesta a cuántos días aguanta es que nadie lo ha medido en un frasco que se abre cada mañana; los «siete a diez días» que se leen por ahí no salen de ningún sitio. Pruébalo y tíralo cuando deje de gustarte.",
    },
  ],

  commonMistakes: [
    {
      problem: "Sabe flojo y aguado",
      cause:
        "Poco tiempo, o molienda demasiado gruesa, o agua de más. Casi siempre lo primero.",
      fix: "Es el error más fácil de arreglar del sitio, porque tienes dos oportunidades: si todavía no lo has colado, déjalo unas horas más; si ya lo colaste, ponle menos agua al servir. Para la próxima, sube a las 18 horas antes de tocar la molienda.",
    },
    {
      problem: "Sabe turbio y áspero, y deja poso en el vaso",
      cause:
        "Molienda demasiado fina. Un molino de cuchillas hace polvo y trozos a la vez, y el polvo se extrae durante toda la noche y además atraviesa el colador.",
      fix: "Molino de muelas y punto grueso, el de prensa francesa. Si ya está hecho, cuélalo otra vez con un filtro de papel y no exprimas lo que quede en el filtro.",
    },
    {
      problem: "Amarga, y no se parece a lo que salió la vez pasada",
      cause: "Se quedó en el frasco mucho más de la cuenta, con los posos dentro.",
      fix: "Lo que hay que colar a tiempo es el café, no el reloj: el reposo no se acaba solo. Si no vas a poder colarlo por la mañana, déjalo en la nevera, que va más despacio y te da margen.",
    },
    {
      problem: "Queda café seco flotando arriba",
      cause: "No se removió al principio, y el molido grueso hace costra.",
      fix: "Remover hasta que no quede ningún grumo seco. Es el único gesto del método que hay que hacer con cuidado, y si se te olvidó, remuévelo cuando lo veas: todavía estás a tiempo.",
    },
    {
      problem: "Esperaba un café frío parecido al de siempre y no se parece en nada",
      cause: "No es un defecto: es el método.",
      fix: "Sin calor no salen los mismos compuestos ni en la misma proporción, así que el mismo grano da una taza más dulce, menos amarga y con mucho menos aroma. Si lo que buscas es tu café de siempre pero frío, sale mejor preparar un V60 normal y enfriarlo sobre hielo.",
    },
  ],

  /*
   * Fuente: Fuller, M. y Rao, N. Z. (2017). Cita textual del artículo: «caffeine and
   * 3-CGA concentrations reached equilibrium according to first order kinetics between
   * 6 and 7 hours in all cold brew samples instead of 10 to 24 hours outlined in
   * typical cold brew methods».
   *
   * Se usa solo para lo que el estudio sostiene —que las horas que repiten las recetas
   * no salen de ninguna medición— y nunca para decir que a las siete horas el café
   * está hecho, que es lo que el artículo NO dice: midió dos compuestos, no el sabor.
   * El texto visible lleva esa aclaración dentro.
   */
  funFact: {
    text: "Hay un estudio que midió cuándo deja de salir cafeína del café en frío, y la respuesta fueron entre seis y siete horas, no las diez o veinticuatro que dicen las recetas. No significa que a las siete horas el café esté hecho: el sabor no es solo la cafeína, y eso el estudio no lo midió. Lo que sí significa es que las cifras redondas que se repiten por ahí no salieron de nadie midiendo.",
    source: "Fuller y Rao, Scientific Reports (2017)",
  },

  grounding: {
    body: [
      "Esta ficha se apoya en un estudio que no podía encajar mejor: café colombiano, variedad caturra de Huila y Nariño, micro-lotes de especialidad comprados en Bogotá, y lo midieron en la Universidad de La Sabana y la Universidad Nacional. Compararon molienda media con gruesa y 14 horas con 22, y de ahí salen la molienda de esta ficha y el rango de horas.",
      "Su mejor hallazgo es el que menos se repite por ahí: a 22 horas se extrae más café que a 14 —más sólidos disueltos, más rendimiento— y sin embargo el de 14 horas gustó más en la cata. Más extracción no es mejor taza. Es la misma idea que aparece en el resto del sitio con otro nombre: pasarse de extracción no da un café más fuerte, da uno más áspero.",
      "Y ahora las horas, que es lo que todo el mundo pregunta. Las guías dicen 12, o 24, o «toda la noche», y ninguna dice de dónde lo saca. Lo que está medido tampoco se pone de acuerdo: el estudio colombiano cató 14 y 22; otro trabajo encontró que la cafeína y el ácido clorogénico dejan de salir entre la sexta y la séptima hora; un tercero infusiona cuatro horas y se queda tan ancho. Con ese material no se puede afirmar un número, así que el 14 – 18 h de la ficha técnica es una elección de este sitio y no un dato: el extremo bajo es el único que alguien cató y le gustó, y el alto deja margen para la nevera sin llegar a las 22 horas que se cataron peor.",
      "El tercer asunto es la acidez, y aquí hay que desmontar algo. Se lee por todas partes que el cold brew tiene «un 67 % menos de acidez» que el café caliente. Esa cifra no viene de ningún estudio: es una frase de marketing que se fue copiando de etiqueta en etiqueta hasta que empezó a sonar a ciencia. Cuando alguien fue a medirlo de verdad —Rao y Fuller, en 2018, con cafés de seis orígenes— resultó que el pH del frío y el del caliente son parecidos, entre 4,85 y 5,13. De ese trabajo solo pudimos leer el resumen, así que no vimos su protocolo completo, y sus cafés eran todos de tueste claro: conviene saberlo antes de tomarlo como la última palabra.",
      "Lo que sí encontraron es más interesante que el 67 %, porque obliga a separar dos cosas que solemos llamar igual. Una es lo fuerte que es un ácido, que es lo que mide el pH, y en eso el frío y el caliente empatan. La otra es cuánto ácido hay, que se mide de otra manera, y ahí el caliente sí sale por encima: extrae más cantidad. O sea que el cold brew no es menos ácido en el sentido en que la etiqueta quiere hacerte creer, aunque lleve algo menos de ácido dentro. Que esa distinción se pueda contar en un párrafo es casualidad; da para un artículo entero, y lo tendrá.",
      "Queda la pregunta de cuánto dura. El único trabajo que lo siguió de cerca guardó cold brew refrigerado durante semanas y no encontró crecimiento bacteriano en ningún momento; su conclusión fue que lo que limita la vida de un café guardado en frío no es la seguridad sino el sabor, que se va apagando. Pero lo hizo en laboratorio, con envases cerrados que nadie abría y con un café infusionado en cuatro horas, que no es el frasco que tú vas a abrir cada mañana. Por eso aquí no vas a leer ningún número de días: los «siete a diez» que circulan no salen de ninguna medición, y el tuyo dura lo que tarde en dejar de gustarte.",
    ],
    references: [
      {
        publisher: "Scientific Reports",
        title:
          "Córdoba, N. et al., «Effect of grinding, extraction time and type of coffee on the physicochemical and flavour characteristics of cold brew coffee» (2019) — café colombiano; de aquí salen la molienda y el rango de horas",
        url: "https://www.nature.com/articles/s41598-019-44886-w",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Scientific Reports",
        title:
          "Rao, N. Z. y Fuller, M., «Acidity and Antioxidant Activity of Cold Brew Coffee» (2018) — solo se pudo leer el resumen",
        url: "https://www.nature.com/articles/s41598-018-34392-w",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Scientific Reports",
        title:
          "Fuller, M. y Rao, N. Z., «The Effect of Time, Roasting Temperature, and Grind Size on Caffeine and Chlorogenic Acid Concentrations in Cold Brew Coffee» (2017)",
        url: "https://www.nature.com/articles/s41598-017-18247-4",
        retrieved: "2026-09-13",
      },
      {
        publisher: "Food Science & Nutrition",
        title:
          "Lopane, E. et al., «An investigation of the shelf life of cold brew coffee and the influence of extraction temperature using chemical, microbial, and sensory analysis» (2024)",
        url: "https://onlinelibrary.wiley.com/doi/full/10.1002/fsn3.3812",
        retrieved: "2026-09-13",
      },
    ],
  },
};
