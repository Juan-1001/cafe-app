import type { BrewMethod } from "./types";
import { parseEndSeconds } from "./timing";
import { prensaFrancesa } from "./prensa-francesa";
import { v60 } from "./v60";

/** Un archivo por método en esta carpeta; aquí se registran para las rutas. */
export const brewMethods: BrewMethod[] = [v60, prensaFrancesa];

export function getBrewMethod(slug: string): BrewMethod | undefined {
  return brewMethods.find((method) => method.slug === slug);
}

/**
 * Los métodos ordenados del más accesible al más exigente, que es como los
 * presenta la página índice. El orden sale de los datos de cada método, no de una
 * lista escrita a mano: al registrar uno nuevo arriba, cae solo en su sitio.
 *
 * Los criterios, en orden y con su porqué:
 *
 * 1. La dificultad declarada. Es el criterio de fondo y el que agrupa la página.
 * 2. A igual dificultad, primero el más corto. El tiempo total es lo segundo que
 *    frena a alguien que está empezando: un método de tres minutos se prueba una
 *    mañana de entre semana y uno de diez, no.
 * 3. Después, el que pide menos equipo, por la misma razón: entrar cuesta menos.
 * 4. El nombre solo como último desempate, para que dos métodos idénticos en todo
 *    lo anterior no se intercambien de sitio entre una compilación y otra.
 */
export function brewMethodsByEffort(): BrewMethod[] {
  return [...brewMethods].sort((a, b) => {
    if (a.difficulty.level !== b.difficulty.level) {
      return a.difficulty.level - b.difficulty.level;
    }

    // Un método sin tiempo legible en la ficha se va al final de su grupo en vez
    // de colarse el primero, que es lo que pasaría tratándolo como cero.
    const timeA = parseEndSeconds(a.specs.totalTime.value) ?? Number.MAX_SAFE_INTEGER;
    const timeB = parseEndSeconds(b.specs.totalTime.value) ?? Number.MAX_SAFE_INTEGER;
    if (timeA !== timeB) return timeA - timeB;

    if (a.equipment.length !== b.equipment.length) {
      return a.equipment.length - b.equipment.length;
    }

    return a.name.localeCompare(b.name, "es");
  });
}

export type { BrewMethod, ContentImage } from "./types";
