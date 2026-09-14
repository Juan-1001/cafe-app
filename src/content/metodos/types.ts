import type { ContentImage, DeclaredImage, Source } from "../types";
import type { EquipmentKey } from "../equipo";
import type { DifficultyScores } from "./difficulty";

/**
 * La dificultad ya no se escribe a mano en cada ficha: se calcula. Un método declara
 * cuatro notas del 1 al 5 —coste del error, margen para rectificar, complejidad del
 * gesto y lo que deja ver— cada una con su razón, y de ahí salen el score, el nivel y
 * los rótulos.
 *
 * La fórmula, los ejes, sus anclajes y los cortes viven en un solo sitio,
 * `difficulty.ts`, y ahí está explicado por qué son esos cuatro ejes y no los siete
 * que se estudiaron primero. Aquí no se decide nada de eso.
 *
 * Lo que antes era `errorPenalty` —un par etiqueta/nivel escrito a mano— desapareció
 * por el motivo de siempre en este proyecto: era un dato sin procedencia. Decía que la
 * moka era «Implacable» y no había forma de discutirlo ni de puntuar un método nuevo
 * con el mismo rasero. Ahora la etiqueta es consecuencia de las notas, así que no
 * puede contradecirlas.
 */

/** Dato de la ficha técnica: el valor va en Space Mono, la nota lo explica. */
export type Spec = {
  value: string;
  note?: string;
};

/**
 * La ficha técnica. Dos de sus casillas son opcionales, y no por comodidad: hay
 * métodos donde la respuesta no es «no la sabemos» sino «esa pregunta no existe
 * aquí», y una casilla que dijera «lo fija el aparato» parecería un dato sin serlo.
 *
 * La moka es el caso que las abrió. No tiene `ratio` porque quien prepara no elige
 * la proporción: el embudo y la válvula la fijan. Y no tiene `output` porque lo que
 * sale depende del tamaño de olla que haya en esa cocina, que es justo lo que
 * cuenta su bloque de `device`.
 *
 * Un método que declare `ratio` tiene que escribirlo con la forma «1:16»: si no,
 * la compilación falla en `index.ts`. Ese control existe porque el agua de la
 * calculadora se deduce leyendo este texto, y un ratio mal escrito la dejaba en
 * cero sin que nada avisara.
 *
 * ## El tiempo total es obligatorio, y su notación decide si hay cronómetro
 *
 * `totalTime` estuvo un tiempo siendo opcional, por la moka: su fabricante da un
 * suceso y no un tiempo, así que la ficha se quedó sin la casilla. El hueco resultó
 * peor que una estimación declarada —quien no ha usado una moka no sabe si eso son
 * dos minutos o veinte—, así que la moka pasó a declarar un rango dicho como
 * elección del sitio, y el campo volvió a ser obligatorio. Todo método dura algo.
 *
 * Lo que varía no es si hay tiempo, sino si el reloj es una instrucción o solo
 * orienta, y eso se dice **con la notación**:
 *
 * - **«3:00 – 3:30», en minutos y segundos**, es un método donde el reloj manda. Sus
 *   pasos llevan sus propios «m:ss» y la página dibuja el cronómetro.
 * - **«5 – 8 min» o «14 – 18 h»**, en unidad gruesa, es un método donde el tiempo
 *   solo orienta: la moka se retira cuando el recolector está lleno y el cold brew se
 *   cuela cuando te gusta. Ninguno de sus pasos lleva «m:ss» y no hay cronómetro.
 *
 * `index.ts` comprueba al compilar que las dos cosas concuerdan en los dos sentidos,
 * porque el fallo contrario es mudo: escribir «12:00» pensando en doce horas hace que
 * el sitio pinte un cronómetro de doce minutos sin que nada avise.
 */
export type BrewSpecs = {
  ratio?: Spec;
  grind: Spec;
  waterTemperature: Spec;
  /**
   * La presión a la que se empuja el agua. La trae **solo el espresso**, y es la única
   * casilla del sitio que existe porque un método tiene una cifra que los demás no
   * tienen en absoluto.
   *
   * Es opcional por la misma razón que `ratio` y `output`, y aquí la ausencia dice algo
   * muy concreto: la moka y el AeroPress también empujan el agua con presión, y los dos
   * decidieron a conciencia **no escribir ningún número** porque nadie ha publicado una
   * medición de ninguno de los dos. Que el campo sea opcional deja esa decisión a la
   * vista en vez de contradecirla: quien la declara es quien tiene un documento detrás.
   */
  pressure?: Spec;
  totalTime: Spec;
  output?: Spec;
  /** A qué sabe la taza que sale de aquí: es lo que hace elegir un método y no otro. */
  cupProfile: Spec;
};


/**
 * Una pieza de equipo dentro de la lista de un método.
 *
 * La foto no está aquí: se pide al catálogo compartido con `piece`, porque el mismo
 * molino sale en muchos métodos y guardar su foto en cada uno sería repetir el mismo
 * archivo y arriesgarse a que se desincronicen.
 *
 * Lo que sí se queda aquí es lo que cambia de un método a otro. `name` porque cada
 * receta afina lo suyo: el V60 pide «Báscula con temporizador» y a la prensa le basta
 * «Báscula». Y `note` porque es la razón de tener esa pieza *en este método*, que es
 * justo lo que no se puede compartir.
 */
export type EquipmentItem = {
  name: string;
  /** Una línea: para qué sirve o qué mirar al comprarlo, en este método. */
  note?: string;
  /** Clave del catálogo de equipo. Si no existe, no compila. */
  piece: EquipmentKey;
};

export type BrewStep = {
  /** Momento del cronómetro, p. ej. "0:45 – 1:15" o "Previo". */
  time: string;
  title: string;
  description: string;
  /** Por qué se hace así. Es la parte que enseña. */
  why: string;
};

export type CommonMistake = {
  problem: string;
  cause: string;
  fix: string;
};

/** Bloque destacado del final. Es opcional: si el método no lo trae, no se pinta. */
export type FunFact = {
  text: string;
  /** De dónde sale el dato. Se muestra debajo si está. */
  source?: string;
};

/**
 * Una forma de repartir la misma agua entre dos momentos: la que entra al recipiente
 * donde el café se infusiona y la que se añade al servir.
 *
 * La trae el cold brew, y es la primera vez que la ficha técnica deja **elegir** un
 * dato en vez de enseñarlo. Se puede porque hacerlo concentrado no es otra receta: es
 * la misma agua entrando en dos veces, así que la taza que sale es exactamente la
 * misma. Eso es lo que la ficha tiene que dejar ver, y por eso el agua del segundo
 * momento se declara aquí en vez de deducirse restando: `index.ts` comprueba al
 * compilar que los dos tramos suman el ratio de la casilla, y si alguien toca uno sin
 * tocar el otro, la compilación falla en vez de cambiar el rendimiento a escondidas.
 */
export type WaterSplitOption = {
  /** Clave estable: es la que la página recuerda mientras alguien lee. */
  key: string;
  /** El nombre de la opción, el que se lee en el control. */
  label: string;
  /** Gramos de agua por gramo de café que entran al recipiente. */
  jarPerGram: number;
  /** Los que se añaden al servir. Cero cuando el agua entra toda de una vez. */
  atServingPerGram: number;
  /**
   * Qué significa elegir esta. Solo se muestra la de la opción elegida, así que cada
   * nota tiene que sostenerse sola: no puede empezar por «en cambio» ni por «la otra».
   */
  note: string;
};

export type WaterSplit = {
  /**
   * Lo que el control pregunta. No se ve en pantalla —el rótulo de la casilla y los
   * nombres de las dos opciones ya lo dicen, y un rótulo más ahí arriba empezaría a
   * parecer un formulario—, pero es lo que anuncia el lector de pantalla al llegar al
   * grupo, y sin él serían dos botones sin pregunta.
   */
  question: string;
  options: WaterSplitOption[];
};

/**
 * Cantidades base del método, siempre para UNA taza. La calculadora las
 * multiplica por el número de tazas y el resto del texto las recibe ya hechas.
 */
export type Recipe = {
  /** Gramos de café molido para una taza. */
  coffeeGramsPerCup: number;
  /**
   * Gramos de agua que NO llegan a la taza, por gramo de café. Cuenta todo lo que
   * se queda por el camino, no solo lo que absorbe el molido; cada método explica
   * en su propio archivo qué pérdidas suma exactamente en esta cifra.
   */
  waterRetainedPerGram: number;
  /**
   * Hitos de agua con nombre, en gramos de agua por gramo de café. La clave es la
   * que se usa en los textos: { floracion: 3 } se escribe como "{floracion}".
   */
  waterMarks: Record<string, number>;
  /**
   * Las formas de repartir el agua entre el recipiente y el vaso, cuando el método
   * deja elegirlas. Sin esto el agua entra toda de una vez, que es lo que hacen los
   * demás métodos del sitio.
   */
  waterSplit?: WaterSplit;
  /**
   * Números de tazas que el aparato hace bien, en orden; el primero es el que se
   * ofrece al entrar. Si no está, se ofrecen 1 a 4 como hasta ahora. Hay métodos
   * con un mínimo (una prensa de litro necesita agua suficiente para cubrir la
   * malla) y otros con capacidad fija, como la moka.
   */
  cupOptions?: number[];
};

/** Un tamaño de aparato, tal y como se compra: el nombre de la caja y lo que cabe. */
export type DeviceSize = {
  /** Lo que dice la caja: "3 tazas". */
  label: string;
  /** Lo que de verdad cabe, medido: "Caldera de 130 ml". */
  capacity: string;
};

/** Algo que el aparato decide por ti y que en otros métodos se pesaría. */
export type FixedAmount = {
  label: string;
  value: string;
};

/**
 * Lo que ocupa el sitio de la calculadora en los métodos donde no se pesa nada.
 *
 * No es una calculadora con otros números: es lo contrario de una calculadora. En
 * el V60 o la prensa, quien prepara decide cuánto café quiere y el sitio le hace
 * las cuentas; en la moka el aparato fija la dosis, el agua y el final, y lo único
 * que el visitante aporta es qué olla tiene en la cocina. Por eso la página
 * pregunta «qué moka tienes» y no «cuántas tazas quieres»: lo primero es un hecho
 * y lo segundo un deseo que aquí no se puede cumplir.
 *
 * Tampoco es un control: con dos tamaños, enseñarlos a la vez gana a esconder uno
 * detrás de un clic, y un botón que solo cambia una cifra es el «botón que no
 * cambia nada» contra el que ya avisa `CupsControl`.
 *
 * `note` es obligatorio y lleva el aviso que no puede faltar: que las «tazas» de
 * estas cajas no son las tazas del resto del sitio, y que aquí no hay báscula ni
 * cronómetro a propósito.
 */
export type DeviceSizes = {
  /** El rótulo, en el hueco donde los demás métodos ponen «Cuántas tazas». */
  question: string;
  sizes: DeviceSize[];
  /** Lo que el aparato fija: el agua, el café. */
  fixed: FixedAmount[];
  /** Uno o más párrafos cortos. Aquí va lo que la ausencia significa. */
  note: string[];
  /** De dónde salen las capacidades, con el nombre corto del documento. */
  source?: string;
};

/** Una dosis de café molido, de las que caben en una cesta que se vende de verdad. */
export type DoseOption = {
  /** Gramos de café molido seco. */
  grams: number;
  /** Qué cesta es esa y de dónde sale esa cifra. Una línea. */
  note: string;
};

/**
 * La tercera forma de decir las cantidades, y la trae el espresso.
 *
 * No es `recipe` con otros números ni un `device` con menos cosas: es una pregunta
 * distinta. En el V60 quien prepara elige **cuánto café quiere** y el sitio calcula el
 * agua; en la moka el aparato lo fija todo y el visitante solo aporta qué olla tiene. En
 * el espresso lo que el visitante aporta es **cuánto café le cabe en la cesta**, que es
 * un hecho de su equipo, y lo que el sitio calcula es **el peso de bebida** que tiene
 * que caer en la taza.
 *
 * ## Por qué no se puede reutilizar `recipe`
 *
 * Por dos choques de vocabulario, y el segundo es de los que rompen en silencio.
 *
 * 1. **«Taza» ya significa otra cosa en este sitio**: unos 195 ml. Un espresso son unos
 *    36 g de bebida, y el estándar italiano llama «taza» a 25 ml servidos en una taza de
 *    50 a 100 ml de capacidad. Tres cosas distintas con la misma palabra. Aquí no se
 *    cuenta en tazas: se cuenta en dosis y en peso de bebida.
 * 2. **El `ratio` del sitio significa café : agua que entra**, y de ese texto se deduce
 *    el agua de la calculadora, a la que luego se le resta lo que retiene el molido. El
 *    1:2 del espresso es café : **bebida que sale**: su segundo número ya es el
 *    resultado. Escribirlo en la casilla del ratio habría hecho que la página calculara
 *    36 g de agua y después le restara la retención, enseñando un rendimiento de unos
 *    18 ml. Mal, y mal sin que nada avisara.
 *
 * Por eso un método con `shot` **no puede declarar `ratio`**, y lo comprueba `index.ts`.
 * La proporción vive aquí, que es el único sitio donde su segundo número se puede llamar
 * por su nombre.
 */
export type ShotRecipe = {
  /** El rótulo, en el hueco donde los demás métodos ponen «Cuántas tazas». */
  question: string;
  /** Las dosis que se ofrecen, de menos a más. */
  doses: DoseOption[];
  /**
   * La dosis que se enseña al entrar, en gramos. **Se elige a mano y no es la primera
   * de la lista**, igual que el método de entrada de la portada: la lista va ordenada de
   * menos a más porque así se lee, y cuál conviene ofrecer es una decisión editorial
   * aparte. Si no coincide con ninguna de las dosis, la compilación falla.
   */
  entryGrams: number;
  /** Gramos de bebida por gramo de café. Un 2 es el 1:2 de la práctica de hoy. */
  beveragePerGram: number;
  /** Uno o más párrafos cortos: de dónde sale la proporción y qué significa la palabra «taza». */
  note: string[];
  /** De dónde salen las dosis y la proporción, con el nombre corto del documento. */
  source?: string;
};

/**
 * Lo que hay que decir **antes** de la lista de equipo, en los métodos donde el equipo
 * es la decisión y no una lista de la compra.
 *
 * Lo trae el espresso, que es el primer método del sitio cuya barrera no es la técnica
 * sino el aparato. No va en `grounding` a propósito: ese bloque dice sobre qué está
 * construida la ficha, y mezclarle «para quién es esto» debilitaría el único sitio donde
 * el lector ve de dónde salen los datos.
 */
export type EquipmentNote = {
  body: string[];
  /**
   * Una comprobación que el lector puede hacer **él mismo**, destacada aparte del texto.
   *
   * Es la primera información de este sitio que no hay que creerle a nadie: se resuelve
   * en la propia cocina en cinco segundos. Por eso tiene su propio recuadro y no es un
   * párrafo más, y por eso el texto empieza pidiendo justamente que no te lo creas.
   */
  check?: {
    title: string;
    body: string[];
  };
};

/** Una señal de la extracción: lo que ves, qué está pasando y qué cambias. */
export type ShotSignal = {
  /** Lo que se ve o se prueba: «cae la primera gota enseguida y acaba en 15 s». */
  observation: string;
  /** Qué está pasando dentro del lecho para que se vea eso. */
  meaning: string;
  /** Qué se cambia en la siguiente. Una sola cosa, siempre. */
  change: string;
};

/**
 * Cómo se lee lo que sale, que es lo único que este método tiene y ningún otro.
 *
 * En los nueve métodos anteriores, lo que se aprende de una taza mal salida cabía en
 * `commonMistakes`: un problema, su causa y su arreglo. En el espresso no, y por una
 * razón que conviene dejar escrita: aquí **leer la extracción no es el remedio de un
 * error, es el método**. La molienda no se escribe en la ficha como un valor, se ajusta
 * cada día según cómo corrió la anterior, y eso no es una lista de fallos: es un bucle.
 *
 * Meterlo en `commonMistakes` habría dicho, con el peso de un titular, que calibrar es
 * equivocarse. De ahí que sea un bloque aparte y con otra forma visual: dos cosas que se
 * parecen afirman que dicen lo mismo.
 */
export type ShotReading = {
  /** Uno o más párrafos: la regla de cambiar una cosa a la vez y qué es el tiempo aquí. */
  intro: string[];
  signals: ShotSignal[];
};

/**
 * Sobre qué está construida la ficha.
 *
 * No es la lista de fuentes de `/granos`, que dice de dónde sale cada dato de un texto
 * lleno de datos. Esto dice otra cosa y por eso es un tipo aparte: de qué está hecho el
 * método entero. Hay métodos que se pueden escribir sobre las instrucciones de quien
 * fabricó el aparato, y hay al menos uno —el colado en tela— del que nadie ha publicado
 * nunca una medición, y cuya única fuente legítima es la gente que lo prepara. Eso el
 * lector tiene que verlo en la página, no deducirlo de que falten cifras.
 *
 * Es opcional: un método que no tenga nada que declarar no pinta el bloque. Lo que no
 * puede pasar es que una ficha se apoye en la práctica y no lo diga.
 */
export type Grounding = {
  /** Uno o más párrafos. Explican sobre qué se escribió y qué no se pudo comprobar. */
  body: string[];
  /**
   * Los documentos a los que remite el bloque: dónde se puede ver que la práctica
   * existe, y el estudio del que sale una cifra cuando lo hay. Van juntos porque son
   * lo mismo aquí —aquello sobre lo que se apoya la ficha— y el texto de `body` dice
   * cuál es cuál.
   */
  references?: Source[];
};

export type BrewMethod = {
  /** Sale del nombre del archivo y es el último tramo de la URL: /metodos/<slug>. */
  slug: string;
  name: string;
  /** Una línea que describe el método. */
  tagline: string;
  /**
   * La fotografía del método. Es la misma en el índice y en la cabecera de su ficha, a
   * propósito: es lo que permite reconocer que se ha llegado al método en el que se
   * hizo clic sin tener que leer el título.
   *
   * Se fotografía apaisado, con el gesto entero en la toma —la jarra, el cono y la
   * mano que sirve—, no en retrato estrecho.
   *
   * La ruta se escribe desde el primer día, aunque el archivo todavía no exista:
   * `resolveContentImage` comprueba en la compilación si está y, mientras no lo esté,
   * la página pinta el bloque de color. Guardar la foto en su sitio es lo único que
   * hace falta para publicarla.
   */
  image: DeclaredImage;
  /** Las cuatro notas de las que sale la dificultad. Ver . */
  difficulty: DifficultyScores;
  /**
   * Las cantidades que la página calcula. Un método trae esto **o** `device` **o**
   * `shot`, exactamente una de las tres: o quien prepara elige cuánto café quiere, o lo
   * fija el aparato, o lo fija la cesta y lo que se elige es el peso de bebida.
   * `index.ts` lo comprueba al compilar.
   */
  recipe?: Recipe;
  /** Lo que el aparato fija, en los métodos que no calculan nada. Ver `recipe`. */
  device?: DeviceSizes;
  /** La dosis de la cesta y el peso de bebida, en el espresso. Ver `ShotRecipe`. */
  shot?: ShotRecipe;
  specs: BrewSpecs;
  /** Lo que se dice antes de la lista de equipo, cuando el equipo es la decisión. */
  equipmentNote?: EquipmentNote;
  equipment: EquipmentItem[];
  steps: BrewStep[];
  /** Cómo se lee lo que sale. Solo lo trae el espresso. Ver `ShotReading`. */
  reading?: ShotReading;
  commonMistakes: CommonMistake[];
  funFact?: FunFact;
  grounding?: Grounding;
};

// Se define una sola vez para todo el contenido; aquí se reexporta para que los
// archivos de métodos la sigan importando desde su propio types.ts.
export type { ContentImage };
