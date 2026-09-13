import type { ContentImage, Source } from "../types";
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
   */
  image: ContentImage;
  /** Las cuatro notas de las que sale la dificultad. Ver . */
  difficulty: DifficultyScores;
  /**
   * Las cantidades que la página calcula. Un método trae esto **o** `device`, nunca
   * los dos ni ninguno: o quien prepara elige cuánto café quiere, o lo elige el
   * aparato. `index.ts` lo comprueba al compilar.
   */
  recipe?: Recipe;
  /** Lo que el aparato fija, en los métodos que no calculan nada. Ver `recipe`. */
  device?: DeviceSizes;
  specs: BrewSpecs;
  equipment: EquipmentItem[];
  steps: BrewStep[];
  commonMistakes: CommonMistake[];
  funFact?: FunFact;
  grounding?: Grounding;
};

// Se define una sola vez para todo el contenido; aquí se reexporta para que los
// archivos de métodos la sigan importando desde su propio types.ts.
export type { ContentImage };
