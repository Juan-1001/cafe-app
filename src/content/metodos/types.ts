/** Nivel de dificultad de un método, con su posición en la escala de 3. */
export type Difficulty = {
  label: "Principiante" | "Intermedio" | "Avanzado";
  level: 1 | 2 | 3;
};

/** Dato de la ficha técnica: el valor va en Space Mono, la nota lo explica. */
export type Spec = {
  value: string;
  note?: string;
};

export type BrewSpecs = {
  ratio: Spec;
  grind: Spec;
  waterTemperature: Spec;
  totalTime: Spec;
  output: Spec;
  /** A qué sabe la taza que sale de aquí: es lo que hace elegir un método y no otro. */
  cupProfile: Spec;
};

/**
 * Imagen de contenido. Mientras `src` sea null se pinta un bloque de color de la
 * paleta con la proporción correcta; para publicar la foto real basta con guardar
 * el archivo en /public/images/metodos/ y poner aquí su ruta.
 */
export type ContentImage = {
  src: string | null;
  alt: string;
};

export type EquipmentItem = {
  name: string;
  /** Una línea: para qué sirve o qué mirar al comprarlo. */
  note?: string;
  image: ContentImage;
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

export type BrewMethod = {
  /** Sale del nombre del archivo y es el último tramo de la URL: /metodos/<slug>. */
  slug: string;
  name: string;
  /** Una línea que describe el método. */
  tagline: string;
  difficulty: Difficulty;
  recipe: Recipe;
  specs: BrewSpecs;
  equipment: EquipmentItem[];
  steps: BrewStep[];
  commonMistakes: CommonMistake[];
  funFact?: FunFact;
};
