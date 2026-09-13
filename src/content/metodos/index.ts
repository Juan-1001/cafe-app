import type { BrewMethod } from "./types";
import { computeDifficulty } from "./difficulty";
import type { Difficulty } from "./difficulty";
import { parseRatio } from "./ratio";
import { parseEndSeconds, parseStartSeconds } from "./timing";
import { aeropress } from "./aeropress";
import { coladoEnTela } from "./colado-en-tela";
import { coldBrew } from "./cold-brew";
import { moka } from "./moka";
import { prensaFrancesa } from "./prensa-francesa";
import { v60 } from "./v60";

/** Un archivo por método en esta carpeta; aquí se registran para las rutas. */
export const brewMethods: BrewMethod[] = [
  v60,
  prensaFrancesa,
  aeropress,
  coladoEnTela,
  moka,
  coldBrew,
];

/**
 * Comprueba el contenido al compilar, y revienta si no cuadra.
 *
 * Existe por un fallo silencioso concreto. El agua de la calculadora no se escribe en
 * ninguna parte: se deduce leyendo el campo `ratio`, que es texto libre. Si alguien
 * escribiera «1-16» en vez de «1:16», `parseRatio` devolvería null, el agua por gramo
 * de café pasaría a ser cero y **todas las cantidades de esa ficha se mostrarían en
 * 0 g** sin que nada avisara. Se vería en la página y tarde, o no se vería.
 *
 * Desde que la moka existe, `ratio` puede faltar legítimamente, así que distinguir
 * «no hay ratio porque el método no tiene» de «hay ratio y está mal escrito» dejó de
 * ser opcional. Esto corre al importar el módulo, que es al generar el sitio: el error
 * aparece en `npm run build` con el nombre del método y el valor que lo rompió.
 *
 * También ata las dos formas de decir las cantidades. Un método calcula (`recipe` y su
 * `ratio`) o las fija el aparato (`device`), nunca las dos ni ninguna: con las dos, la
 * página enseñaría una calculadora y una tabla que se contradicen; sin ninguna, se
 * quedaría muda sobre cuánto café echar.
 */
function assertBrewMethodsAreConsistent(methods: BrewMethod[]): void {
  for (const method of methods) {
    const { ratio } = method.specs;

    if (ratio && !parseRatio(ratio.value)) {
      throw new Error(
        `El método "${method.slug}" declara un ratio que no se puede leer: "${ratio.value}". ` +
          `Tiene que tener la forma "1:16" o "1:16,7", porque de ahí sale el agua de la calculadora.`,
      );
    }

    if (method.recipe && !ratio) {
      throw new Error(
        `El método "${method.slug}" calcula cantidades pero no declara ratio: el agua saldría en cero.`,
      );
    }

    if (method.recipe && method.device) {
      throw new Error(
        `El método "${method.slug}" declara "recipe" y "device" a la vez. Son las dos formas de decir ` +
          `las cantidades y se contradicen: o las calcula quien prepara, o las fija el aparato.`,
      );
    }

    if (!method.recipe && !method.device) {
      throw new Error(
        `El método "${method.slug}" no dice sus cantidades por ningún lado: le falta "recipe" o "device".`,
      );
    }

    assertTimeNotationMatchesTimer(method);
  }
}

/** Una hora en segundos: el reloj de una preparación nunca llega aquí. */
const ONE_HOUR_IN_SECONDS = 60 * 60;

/**
 * Comprueba que la notación del tiempo y la existencia de cronómetro digan lo mismo.
 *
 * Existe por un fallo mudo que apareció al escribir el cold brew. El sitio lee los
 * tiempos buscando la forma «m:ss», así que **«12:00» escrito pensando en doce horas se
 * entiende como doce minutos**, y la página pinta un cronómetro de doce minutos sin que
 * nada avise. Es el mismo tipo de fallo que el del ratio mal escrito: se ve en la
 * página, tarde, o no se ve.
 *
 * La regla que se comprueba está explicada en `types.ts`: el tiempo total en «m:ss» es
 * un método donde el reloj manda y por tanto tiene pasos cronometrados; en unidad
 * gruesa —«5 – 8 min», «14 – 18 h»— es un método donde el tiempo solo orienta y ningún
 * paso lleva reloj. Se comprueban los dos sentidos porque cada uno pilla una mitad del
 * error: escribir el total en horas y los pasos en minutos, o al revés.
 *
 * Lo que esto **no** puede pillar, y conviene saberlo: un método escrito entero en
 * «m:ss» pensando en horas, con el total y los pasos de acuerdo entre sí. Ahí no queda
 * ninguna huella sintáctica de la intención. Contra eso está el segundo control, el de
 * la hora: nadie escribe una preparación de más de sesenta minutos en minutos y
 * segundos, así que llegar ahí significa que se estaban escribiendo horas.
 */
function assertTimeNotationMatchesTimer(method: BrewMethod): void {
  const totalTime = method.specs.totalTime.value;
  const totalIsClock = parseEndSeconds(totalTime) !== null;
  const clockSteps = method.steps.filter(
    (step) => parseStartSeconds(step.time) !== null,
  );

  if (totalIsClock && clockSteps.length === 0) {
    throw new Error(
      `El método "${method.slug}" declara su tiempo total en minutos y segundos ("${totalTime}") ` +
        `pero ninguno de sus pasos lleva reloj, así que la página no dibujaría cronómetro. ` +
        `O los pasos llevan sus "m:ss", o el tiempo total va en unidad gruesa ("14 – 18 h").`,
    );
  }

  if (!totalIsClock && clockSteps.length > 0) {
    throw new Error(
      `El método "${method.slug}" tiene pasos con reloj (${clockSteps
        .map((step) => `"${step.time}"`)
        .join(", ")}) pero su tiempo total no se puede leer como reloj ("${totalTime}"): ` +
        `el cronómetro se quedaría sin saber cuándo se acaba la preparación.`,
    );
  }

  for (const time of [totalTime, ...method.steps.map((step) => step.time)]) {
    const seconds = parseEndSeconds(time);
    if (seconds !== null && seconds >= ONE_HOUR_IN_SECONDS) {
      throw new Error(
        `El método "${method.slug}" tiene un tiempo de una hora o más escrito como reloj ("${time}"). ` +
          `Ninguna preparación de este sitio dura eso: casi seguro son horas escritas en la casilla ` +
          `de los minutos, y el sitio las leería como minutos. Escríbelo "14 – 18 h".`,
      );
    }
  }
}

assertBrewMethodsAreConsistent(brewMethods);

export function getBrewMethod(slug: string): BrewMethod | undefined {
  return brewMethods.find((method) => method.slug === slug);
}

/** La dificultad ya calculada de un método. Se pide aquí y no se recalcula por ahí. */
export function methodDifficulty(method: BrewMethod): Difficulty {
  return computeDifficulty(method.difficulty);
}

/**
 * Los métodos ordenados del más fácil al más exigente, que es como los presenta la
 * página índice. El orden sale del score de cada método, así que al registrar uno nuevo
 * arriba cae solo en su sitio y nadie tiene que decidir dónde va.
 *
 * Antes esto ordenaba por el nivel escrito a mano y desempataba por tiempo total y por
 * número de piezas de equipo. Esos dos desempates ya no hacen falta y además decían algo
 * que no era verdad: que un método más corto o con menos cacharros es más fácil. El
 * score no empata casi nunca —son cuatro notas combinadas con pesos distintos—, y cuando
 * empate, el nombre decide, solo para que dos compilaciones seguidas no intercambien las
 * fichas de sitio.
 */
export function brewMethodsByDifficulty(): BrewMethod[] {
  return [...brewMethods].sort((a, b) => {
    const scoreA = methodDifficulty(a).score;
    const scoreB = methodDifficulty(b).score;
    if (scoreA !== scoreB) return scoreA - scoreB;

    return a.name.localeCompare(b.name, "es");
  });
}

export type {
  AxisKey,
  AxisScore,
  Difficulty,
  DifficultyLevel,
  DifficultyScores,
} from "./difficulty";
export {
  DIFFICULTY_AXES,
  DIFFICULTY_LEVELS,
  computeDifficulty,
  difficultyBreakdown,
} from "./difficulty";

export type {
  BrewMethod,
  ContentImage,
  DeviceSizes,
  Grounding,
} from "./types";
