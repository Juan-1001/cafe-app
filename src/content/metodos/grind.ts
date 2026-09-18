import type { BrewMethod } from "./types";
import { brewMethods } from ".";

/**
 * Los cinco puntos de molienda que usa el sitio, del más fino al más grueso.
 *
 * Esta lista existe porque el artículo de la molienda enseña la escala entera y tiene
 * que decir, en cada peldaño, **qué métodos del sitio lo piden**. Ese dato no se copia a
 * mano en el artículo: se lee de `brewMethods`. Si mañana entra el método once con su
 * casilla de molienda, el artículo se actualiza solo y nadie tiene que acordarse.
 *
 * El orden es el del recorrido del deslizador y no alfabético ni de registro: es lo que
 * hace que arrastrar el mando hacia la derecha signifique «más grueso» siempre.
 *
 * Y es el único sitio del proyecto donde estas cinco palabras están escritas juntas. La
 * casilla de cada ficha sigue siendo texto libre —`Spec.value`—, así que la comprobación
 * de abajo es la que ata las dos cosas: un método que escribiera «Media fina», sin
 * guion, no caería en ningún peldaño y su nombre desaparecería del artículo sin que nada
 * avisara. Eso revienta la compilación en vez de llegar a la página.
 */
export const GRIND_LEVELS = [
  "Fina",
  "Media-fina",
  "Media",
  "Media-gruesa",
  "Gruesa",
] as const;

/** Uno de los cinco puntos de la escala de molienda del sitio. */
export type GrindLevel = (typeof GRIND_LEVELS)[number];

function assertGrindValuesAreKnown(methods: BrewMethod[]): void {
  const known = new Set<string>(GRIND_LEVELS);

  for (const method of methods) {
    const { value } = method.specs.grind;

    if (!known.has(value)) {
      throw new Error(
        `El método "${method.slug}" declara una molienda que no está en la escala del ` +
          `sitio: "${value}". Los cinco puntos son ${GRIND_LEVELS.join(", ")}, y el ` +
          `artículo de la molienda cuenta los métodos de cada uno leyendo este campo: ` +
          `un valor fuera de la lista deja a este método sin contar y sin nombrar.`,
      );
    }
  }
}

assertGrindValuesAreKnown(brewMethods);

/** Los métodos que piden este punto de molienda, en el orden de registro. */
export function methodsWithGrind(level: GrindLevel): BrewMethod[] {
  return brewMethods.filter((method) => method.specs.grind.value === level);
}

/**
 * Cuántos métodos piden este punto, escrito como frase entera.
 *
 * La frase se escribe aquí y no en el componente porque `ScaleStep.figure` trae siempre
 * el texto completo: el bloque no pone ninguna palabra suya alrededor. Y se resuelve el
 * singular porque dos de los cinco peldaños tienen un solo método —el espresso en la
 * fina y la Chemex en la media-gruesa—, y «1 métodos la piden» es la clase de detalle
 * que delata que una página se escribió sola.
 */
export function grindDemandFigure(level: GrindLevel): string {
  const count = methodsWithGrind(level).length;

  if (count === 0) return "ningún método la pide";
  if (count === 1) return "1 método la pide";

  return `${count} métodos la piden`;
}

/**
 * Los nombres de esos métodos, enumerados en español: "V60, AeroPress y Moka".
 *
 * Se unen a mano y no con `Intl.ListFormat` para no depender de los datos de idioma que
 * traiga el Node que compile: son cuatro líneas y el resultado es el mismo en cualquier
 * máquina.
 */
export function grindDemandNames(level: GrindLevel): string {
  const names = methodsWithGrind(level).map((method) => method.name);

  if (names.length === 0) return "Ninguno, por ahora";
  if (names.length === 1) return names[0];

  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}
