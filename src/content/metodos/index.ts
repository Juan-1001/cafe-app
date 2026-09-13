import type { BrewMethod } from "./types";
import { parseEndSeconds } from "./timing";
import { parseRatio } from "./ratio";
import { aeropress } from "./aeropress";
import { coladoEnTela } from "./colado-en-tela";
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
  }
}

assertBrewMethodsAreConsistent(brewMethods);

export function getBrewMethod(slug: string): BrewMethod | undefined {
  return brewMethods.find((method) => method.slug === slug);
}

/**
 * Los métodos ordenados del que más perdona al que menos, que es como los presenta
 * la página índice. El orden sale de los datos de cada método, no de una lista
 * escrita a mano: al registrar uno nuevo arriba, cae solo en su sitio.
 *
 * Los criterios, en orden y con su porqué:
 *
 * 1. El castigo del error declarado. Es el criterio de fondo y el que agrupa la
 *    página en capítulos.
 * 2. A igual castigo, primero el más corto. El tiempo total es lo segundo que
 *    frena a alguien que está empezando: un método de tres minutos se prueba una
 *    mañana de entre semana y uno de diez, no.
 * 3. Después, el que pide menos equipo, por la misma razón: entrar cuesta menos.
 * 4. El nombre solo como último desempate, para que dos métodos idénticos en todo
 *    lo anterior no se intercambien de sitio entre una compilación y otra.
 */
export function brewMethodsByPenalty(): BrewMethod[] {
  return [...brewMethods].sort((a, b) => {
    if (a.errorPenalty.level !== b.errorPenalty.level) {
      return a.errorPenalty.level - b.errorPenalty.level;
    }

    // Un método sin tiempo legible en la ficha —o sin tiempo ninguno, como la moka,
    // que se rige por un suceso y no por un reloj— se va al final de su grupo en vez
    // de colarse el primero, que es lo que pasaría tratándolo como cero.
    const timeA =
      (a.specs.totalTime && parseEndSeconds(a.specs.totalTime.value)) ??
      Number.MAX_SAFE_INTEGER;
    const timeB =
      (b.specs.totalTime && parseEndSeconds(b.specs.totalTime.value)) ??
      Number.MAX_SAFE_INTEGER;
    if (timeA !== timeB) return timeA - timeB;

    if (a.equipment.length !== b.equipment.length) {
      return a.equipment.length - b.equipment.length;
    }

    return a.name.localeCompare(b.name, "es");
  });
}

export type {
  BrewMethod,
  ContentImage,
  DeviceSizes,
  ErrorPenalty,
  Grounding,
} from "./types";
