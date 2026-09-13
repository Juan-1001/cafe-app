/**
 * El sistema de dificultad de los métodos. **Este es el único sitio donde vive la
 * fórmula, los ejes y los cortes**: ninguna ficha calcula nada por su cuenta y ningún
 * componente decide un nivel. Una ficha solo aporta cuatro notas del 1 al 5 y la razón
 * de cada una; el nivel, el rótulo y el orden salen de aquí.
 *
 * ## Por qué cuatro ejes y no siete
 *
 * El sistema que se estudió primero tenía siete dimensiones: control, precisión,
 * sensibilidad al error, complejidad, feedback, repetibilidad y tolerancia al error. Al
 * auditarlo antes de escribirlo aparecieron tres problemas que habrían viciado todas
 * las clasificaciones, y por eso el sistema es este y no aquel.
 *
 * 1. **Cuatro de las siete medían lo mismo.** Se demuestra con sus propios anclajes:
 *    «tolerancia 1 = los errores afectan mucho el resultado» es «sensibilidad 4»
 *    palabra por palabra, y «precisión 1 = las variaciones grandes apenas afectan la
 *    taza» es «sensibilidad 1» y «tolerancia 5» a la vez. Repetibilidad añadía una
 *    cuarta copia: su anclaje 4, el que de verdad discrimina, dice «las pequeñas
 *    diferencias en preparación generan diferencias perceptibles», que es la definición
 *    de precisión. Entre las cuatro sumaban el 60 % del peso para un solo concepto.
 *    Aquí ese concepto se puntúa una vez y se llama `cost`.
 *
 * 2. **Faltaba el eje que de verdad ordena este catálogo.** Ninguna de las siete medía
 *    si, al notar el error, todavía puedes hacer algo. Es `recovery`, y es lo único que
 *    separa la moka del V60: los dos castigan el error parecido, pero en el V60 se
 *    corrige en el vertido siguiente y en la moka no hay vertido siguiente. Sin este
 *    eje el sistema cruzaba los dos métodos y ponía el V60 por encima de la moka.
 *
 * 3. **«Control» sumaba dificultad.** Tener muchas palancas no es ser difícil —el V60
 *    tiene las máximas y es de los más aprendibles—, y aun así era el 15 % del score y
 *    con signo positivo: aportaba once de los veintiún puntos con los que el V60
 *    adelantaba a la moka. Está fuera del cálculo.
 *
 * ## Los cuatro ejes
 *
 * Se puntúan siempre del 1 al 5 con los anclajes de `DIFFICULTY_AXES`. Dos de ellos se
 * guardan como «cuánta hay» —recuperabilidad y observabilidad— y se invierten al
 * calcular, porque tener mucha hace el método más fácil, no más difícil.
 *
 * ## Los pesos, y por qué observabilidad entra aunque hoy no cambie nada
 *
 * Se comprobaron eje por eje sobre los cinco métodos reales antes de fijarlos. La
 * recuperabilidad manda porque decide sola el extremo difícil; el coste y la
 * complejidad ordenan el medio, y sin ellos el sistema afirmaba que el AeroPress es más
 * difícil que el V60. La observabilidad no reordena nada hoy y aun así entra con un
 * 0,1: el cold brew va a ser el caso que la ponga a prueba —tolerante al máximo y con
 * feedback cero durante doce horas—, y dejarla fuera ahora para volver a meterla
 * entonces sería ajustar el sistema al resultado que ya se conoce.
 */

export type AxisKey = "cost" | "recovery" | "complexity" | "observability";

/** Una nota del 1 al 5 en un eje, con la razón por la que es esa y no otra. */
export type AxisScore = {
  /** Del 1 al 5, según los anclajes del eje. Fuera de rango no compila. */
  value: 1 | 2 | 3 | 4 | 5;
  /**
   * Por qué este método saca esta nota en este eje. **Es obligatorio a propósito.**
   * Sin la razón escrita al lado del número, dentro de unos meses nadie puede discutir
   * una clasificación ni puntuar un método nuevo con el mismo criterio: solo quedaría
   * un dígito que nadie sabe de dónde salió.
   */
  why: string;
};

export type DifficultyScores = Record<AxisKey, AxisScore>;

export type AxisDefinition = {
  key: AxisKey;
  /** Cómo se nombra el eje a la vista. */
  name: string;
  /** Qué pregunta contesta, en una línea. */
  question: string;
  /**
   * Si el eje se guarda como «cuánta hay» y hay que darle la vuelta para la dificultad.
   * Vale para recuperabilidad y observabilidad: mucha de las dos hace el método fácil.
   */
  inverted: boolean;
  weight: number;
  /** Los cinco anclajes, del 1 al 5. Son el contrato: se puntúa contra este texto. */
  anchors: readonly [string, string, string, string, string];
};

export const DIFFICULTY_AXES = [
  {
    key: "cost",
    name: "Coste del error",
    question: "Si te desvías de la receta, ¿cuánto se estropea la taza?",
    inverted: false,
    weight: 0.3,
    anchors: [
      "Desviarse bastante apenas cambia la taza.",
      "Los errores cambian la taza sin arruinarla, y se arreglan a la vez siguiente.",
      "Un error se nota claro en el sabor.",
      "Un error importante deja una taza claramente defectuosa, o ninguna taza.",
      "Una desviación pequeña basta para echar a perder la preparación entera.",
    ],
  },
  {
    key: "recovery",
    name: "Margen para rectificar",
    question: "Cuando notas que algo va mal, ¿todavía puedes hacer algo?",
    inverted: true,
    weight: 0.4,
    anchors: [
      "Ninguno: cuando lo notas, la taza ya está hecha.",
      "Casi ninguno; queda un gesto y es el último.",
      "Hay una ventana para corregir, y se cierra pronto.",
      "Se puede rectificar durante buena parte de la preparación.",
      "Se puede corregir el rumbo casi hasta el final.",
    ],
  },
  {
    key: "complexity",
    name: "Complejidad del gesto",
    question: "¿Cuántas acciones hay que encadenar, y con cuánta coordinación?",
    inverted: false,
    weight: 0.2,
    anchors: [
      "Preparar, esperar y servir.",
      "Pocos pasos y ninguno pide coordinación.",
      "Varias acciones seguidas, en un orden que importa.",
      "Varios pasos con sus tiempos y un gesto que hay que sostener con la mano.",
      "Muchas acciones y ajustes que hay que coordinar mientras ocurren.",
    ],
  },
  {
    key: "observability",
    name: "Lo que deja ver",
    question: "¿Puedes ver lo que está pasando mientras pasa?",
    inverted: true,
    weight: 0.1,
    anchors: [
      "No se ve nada hasta que está hecho.",
      "Casi nada: lo poco que hay llega al final.",
      "Da señales, pero hay que saber leerlas o llegan tarde.",
      "Se ven varias cosas a la vez y sin nada que las tape.",
      "Se ve todo mientras pasa y da tiempo a reaccionar.",
    ],
  },
] as const satisfies readonly AxisDefinition[];

/**
 * Los cortes son los **tercios exactos** de la escala, no valores elegidos a ojo.
 *
 * Importa cómo se fijaron. Al calcular los cinco métodos, el AeroPress dio 45,0 y el
 * V60 47,5, y dejar el AeroPress donde había estado siempre —en el nivel de los
 * principiantes— pedía un corte en 46. Eso es dibujar la raya alrededor del resultado
 * que ya se quería. Se prefirió el corte en tercios y que el AeroPress subiera, que es
 * lo que dicen sus notas: de los cuatro métodos fáciles es el que menos deja ver y el
 * que menos deja rectificar.
 */
const LEVEL_CUTS = [100 / 3, 200 / 3] as const;

export type DifficultyLevel = 1 | 2 | 3;

/**
 * Los tres niveles, con sus cuatro vocabularios separados a propósito.
 *
 * - `label` es el nombre técnico del nivel. Hoy no se pinta en ninguna parte: es la
 *   palabra con la que hablamos del nivel entre nosotros, y existe para que el sistema
 *   se pueda nombrar sin tocar el lenguaje de la página.
 * - `chip` es la palabra del medidor de tres cuadros, la que se lee junto a cada
 *   método.
 * - `category` y `note` son el rótulo y la entradilla del capítulo en la página índice.
 *
 * Los tres vocabularios visibles se conservan tal cual estaban. No es conservadurismo:
 * al terminar la auditoría resultó que los rótulos de capítulo ya escritos mapean uno a
 * uno sobre los tres ejes que mandan —«perdonan casi todo» es el coste, «piden que
 * estés ahí» es la complejidad y «no dan segunda oportunidad» es literalmente la
 * recuperabilidad—, así que el sistema nuevo cabe debajo del lenguaje viejo sin
 * forzarlo. Y separarlos en campos distintos es lo que permite que mañana cambie el
 * copy sin tocar la fórmula, o al revés.
 */
export const DIFFICULTY_LEVELS = [
  {
    level: 1,
    number: "01",
    label: "Para empezar",
    chip: "Tolerante",
    category: "Perdonan casi todo",
    note: "Medio minuto de más o un molido desigual no arruinan la taza. Si te distraes a mitad, sigue saliendo café.",
  },
  {
    level: 2,
    number: "02",
    label: "Con práctica",
    chip: "Preciso",
    category: "Piden que estés ahí",
    note: "Hay un tramo corto donde lo que haces se nota entero: el vertido, el tiempo. El error se paga en el sabor, pero se corrige en la taza siguiente.",
  },
  {
    level: 3,
    number: "03",
    label: "Técnica",
    chip: "Implacable",
    category: "No dan segunda oportunidad",
    note: "Cuando notas que algo va mal, la taza ya está hecha: no hay forma de rectificar a mitad de camino.",
  },
] as const satisfies readonly {
  level: DifficultyLevel;
  number: string;
  label: string;
  chip: string;
  category: string;
  note: string;
}[];

export type DifficultyLevelInfo = (typeof DIFFICULTY_LEVELS)[number];

export type Difficulty = {
  /** De 0 a 100. Es el número del que sale todo lo demás. */
  score: number;
  level: DifficultyLevel;
  /** Los cuatro vocabularios del nivel, ya resueltos. */
  levelInfo: DifficultyLevelInfo;
};

/** Lleva una nota del 1 al 5 a un 0–1 donde 1 es siempre «más difícil». */
function normalize(axis: AxisDefinition, value: number): number {
  return axis.inverted ? (5 - value) / 4 : (value - 1) / 4;
}

/** Lo que aporta cada eje al score final, para poder explicar una clasificación. */
export function difficultyBreakdown(
  scores: DifficultyScores,
): { axis: AxisDefinition; value: number; points: number }[] {
  return DIFFICULTY_AXES.map((axis) => ({
    axis,
    value: scores[axis.key].value,
    points: normalize(axis, scores[axis.key].value) * axis.weight * 100,
  }));
}

export function computeDifficulty(scores: DifficultyScores): Difficulty {
  const score = difficultyBreakdown(scores).reduce(
    (total, part) => total + part.points,
    0,
  );

  const level: DifficultyLevel =
    score <= LEVEL_CUTS[0] ? 1 : score <= LEVEL_CUTS[1] ? 2 : 3;

  const levelInfo = DIFFICULTY_LEVELS.find((entry) => entry.level === level);
  // No puede pasar: el score está acotado en 0–100 y los cortes cubren el rango entero.
  // Se comprueba igual para que un cambio futuro en los cortes falle aquí y no en la
  // página, con un nivel sin rótulo.
  if (!levelInfo) {
    throw new Error(`No hay rótulos para el nivel de dificultad ${level}.`);
  }

  return { score, level, levelInfo };
}
