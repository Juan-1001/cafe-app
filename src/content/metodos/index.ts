import type { BrewMethod } from "./types";
import { computeDifficulty } from "./difficulty";
import type { Difficulty } from "./difficulty";
import { parseRatio } from "./ratio";
import { parseEndSeconds, parseStartSeconds } from "./timing";
import { assertSourcesAreUsable } from "../sources";
import { aeropress } from "./aeropress";
import { chemex } from "./chemex";
import { coladoEnTela } from "./colado-en-tela";
import { coldBrew } from "./cold-brew";
import { moka } from "./moka";
import { prensaFrancesa } from "./prensa-francesa";
import { sifon } from "./sifon";
import { totem } from "./totem";
import { v60 } from "./v60";

/** Un archivo por método en esta carpeta; aquí se registran para las rutas. */
export const brewMethods: BrewMethod[] = [
  v60,
  prensaFrancesa,
  aeropress,
  coladoEnTela,
  moka,
  coldBrew,
  chemex,
  sifon,
  totem,
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

    assertWaterSplitAddsUp(method);
    assertTimeNotationMatchesTimer(method);
    assertSourcesAreUsable(method.slug, method.grounding?.references ?? []);
    assertDifficultyIsArguable(method);
  }
}

/**
 * Comprueba que las formas de repartir el agua lleven todas a la misma taza.
 *
 * Un método puede dejar elegir cuándo entra el agua —el cold brew se hace listo para
 * beber o concentrado— y eso solo es una elección honesta mientras las dos opciones
 * den exactamente el mismo vaso. Si una sumara menos agua que la otra, la página
 * enseñaría dos rendimientos distintos bajo el mismo ratio y elegir dejaría de ser
 * repartir el agua para pasar a ser otra receta, sin que nadie lo hubiera decidido.
 *
 * El rendimiento se calcula sobre el agua total, que sale del ratio de la ficha, así
 * que la suma de los dos tramos tiene que dar ese ratio. Se comprueba aquí porque el
 * fallo contrario es mudo: cambiar el 5 del frasco y olvidarse del 6 del servir no
 * rompe nada visible, solo mueve en silencio el agua que la ficha dice que lleva.
 */
function assertWaterSplitAddsUp(method: BrewMethod): void {
  const split = method.recipe?.waterSplit;
  if (!split) return;

  // Si el ratio no se pudiera leer ya habría reventado arriba, y sin recipe no hay split.
  const ratio = method.specs.ratio ? parseRatio(method.specs.ratio.value) : null;
  if (!ratio) return;

  const total = ratio.water / ratio.coffee;

  if (split.options.length < 2) {
    throw new Error(
      `El método "${method.slug}" declara una sola forma de repartir el agua, así que no hay ` +
        `nada que elegir: o son dos, o el agua entra de una vez y esto sobra.`,
    );
  }

  const keys = new Set(split.options.map((option) => option.key));
  if (keys.size !== split.options.length) {
    throw new Error(
      `El método "${method.slug}" repite la clave de alguna forma de repartir el agua: ` +
        `son la memoria de lo que elige quien lee, así que tienen que ser distintas.`,
    );
  }

  for (const option of split.options) {
    if (option.jarPerGram <= 0) {
      throw new Error(
        `La opción "${option.key}" del método "${method.slug}" no echa nada de agua al ` +
          `recipiente. Sin agua dentro no hay café que infusionar.`,
      );
    }

    const sum = option.jarPerGram + option.atServingPerGram;
    // Coma flotante: 5 + 6 da 11 exacto, pero un 4,5 + 6,5 podría no darlo.
    if (Math.abs(sum - total) > 0.0001) {
      throw new Error(
        `La opción "${option.key}" del método "${method.slug}" reparte ${sum} g de agua por ` +
          `gramo de café y el ratio de su ficha dice ${total}. Las dos opciones tienen que dar ` +
          `la misma taza: si no suman lo mismo, elegir cambiaría el rendimiento y eso ya no ` +
          `sería repartir el agua, sería otra receta.`,
      );
    }
  }
}

/**
 * Una razón por debajo de esto no es una razón: es la nota escrita con letras.
 * El valor sale de medir las que ya están escritas —la más corta ronda los 120
 * caracteres— y se deja holgura por debajo para no pelearse con una que sea buena y
 * breve.
 */
const MIN_WHY_LENGTH = 60;

/**
 * Comprueba que las cuatro notas de dificultad se puedan discutir dentro de un año.
 *
 * El sistema de `difficulty.ts` se sostiene sobre que cada nota traiga escrito por qué
 * es esa y no otra: sin eso nadie puede rebatir una clasificación ni puntuar el método
 * siguiente con el mismo rasero, y vuelve a haber un número que nadie sabe de dónde
 * salió, que es exactamente lo que se quitó de en medio. TypeScript ya obliga a que el
 * campo esté; lo que no puede es obligar a que diga algo.
 */
function assertDifficultyIsArguable(method: BrewMethod): void {
  for (const [axis, score] of Object.entries(method.difficulty)) {
    if (score.why.trim().length < MIN_WHY_LENGTH) {
      throw new Error(
        `El método "${method.slug}" puntúa "${axis}" con un ${score.value} y no explica por qué: ` +
          `"${score.why}". La razón es obligatoria y tiene que poder discutirse.`,
      );
    }
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
