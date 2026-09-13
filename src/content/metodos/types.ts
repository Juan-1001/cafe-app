import type { ContentImage, Source } from "../types";
import type { EquipmentKey } from "../equipo";

/**
 * Cuánto castiga el método un error. Es el eje que ordena el índice y agrupa sus
 * capítulos, y el nivel crece con el castigo: 1 perdona un descuido, 3 no deja
 * rectificar una vez empezado.
 *
 * Mide solo eso. En la palabra «dificultad» que había aquí antes cabían tres cosas
 * distintas —cuántas decisiones tomas, cuánto te castiga equivocarte y cuánto equipo
 * necesitas— y estaban mezcladas: el nivel ordenaba por una y las notas de los
 * capítulos hablaban de otra. Se quedó el castigo por dos razones. Es la pregunta con
 * la que se llega al índice, «¿esto me va a salir bien la primera vez?». Y es la única
 * de las tres que reparte los métodos: por decisiones la moka sería de las fáciles
 * —el aparato fija la dosis, el agua y el final— y mandar ahí a alguien que empieza
 * sería un mal consejo, y por equipo casi todos caen en el mismo montón.
 *
 * Cuántas decisiones toma quien prepara no desaparece: describe mejor que ninguna otra
 * cosa lo que un método es, pero es un dato de la ficha y no un orden de entrada.
 *
 * Va como unión de pares y no como dos campos sueltos para que una etiqueta no pueda
 * acabar con el nivel de otra: `{ label: "Tolerante", level: 3 }` no compila.
 */
/*
 * El rótulo del nivel 3 se revisó al entrar la moka, porque «Implacable» suena a
 * difícil y la moka no lo es: son pocos pasos, sin báscula y sin cronómetro. Se
 * consideró cambiarlo por uno que nombrara la consecuencia y no la exigencia, y se
 * decidió dejarlo como está. El nivel en sí sí se comprobó, y cómo se comprobó está
 * escrito junto al `errorPenalty` de `moka.ts`: la prueba de los errores comunes sale
 * mezclada y el método entra en el nivel 3 por lo que cuestan los errores, no por su
 * clase.
 */
export type ErrorPenalty =
  | { label: "Tolerante"; level: 1 }
  | { label: "Preciso"; level: 2 }
  | { label: "Implacable"; level: 3 };

/** Dato de la ficha técnica: el valor va en Space Mono, la nota lo explica. */
export type Spec = {
  value: string;
  note?: string;
};

/**
 * La ficha técnica. Tres de sus casillas son opcionales, y no por comodidad: hay
 * métodos donde la respuesta no es «no la sabemos» sino «esa pregunta no existe
 * aquí», y una casilla que dijera «lo fija el aparato» parecería un dato sin serlo.
 *
 * La moka es el caso que las abrió. No tiene `ratio` porque quien prepara no elige
 * la proporción: el embudo y la válvula la fijan. No tiene `totalTime` porque su
 * fabricante da un suceso y no un tiempo —se retira cuando el recolector está
 * lleno—, y por eso es el único método del sitio sin cronómetro. Y no tiene
 * `output` porque lo que sale depende del tamaño de olla que haya en esa cocina,
 * que es justo lo que cuenta su bloque de `device`.
 *
 * Un método que declare `ratio` tiene que escribirlo con la forma «1:16»: si no,
 * la compilación falla en `index.ts`. Ese control existe porque el agua de la
 * calculadora se deduce leyendo este texto, y un ratio mal escrito la dejaba en
 * cero sin que nada avisara.
 */
export type BrewSpecs = {
  ratio?: Spec;
  grind: Spec;
  waterTemperature: Spec;
  totalTime?: Spec;
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
  errorPenalty: ErrorPenalty;
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
