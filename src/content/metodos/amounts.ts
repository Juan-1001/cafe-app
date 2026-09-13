import type { Recipe, WaterSplitOption } from "./types";

/** Cantidades ya calculadas para un número concreto de tazas. */
export type Amounts = {
  cups: number;
  coffeeGrams: number;
  /** Toda el agua del método, llegue cuando llegue. */
  waterGrams: number;
  /** La que entra al recipiente donde se infusiona: toda, salvo que se parta en dos. */
  jarGrams: number;
  /** La que se añade al servir. Cero salvo en la opción concentrada del cold brew. */
  atServingGrams: number;
  /** Si el método deja elegir cómo se reparte el agua. Ver `waterSplit` en types.ts. */
  splitsWater: boolean;
  /** Lo que llega de verdad a la taza: el agua menos la que retiene el molido. */
  outputMilliliters: number;
  retainedGrams: number;
  /** Hitos de agua con nombre, ya en gramos. */
  marks: Record<string, number>;
};

/** Nadie pesa 23,4 g: el café se redondea al medio gramo y el agua a cinco. */
const COFFEE_STEP = 0.5;
const WATER_STEP = 5;

function roundTo(value: number, step: number): number {
  // El toFixed evita los 22.500000000000004 que salen de dividir en coma flotante.
  return Number((Math.round(value / step) * step).toFixed(2));
}

/** Número en español: sin decimales si es entero, con coma si no. */
function formatNumber(value: number): string {
  return Number.isInteger(value) ? String(value) : String(value).replace(".", ",");
}

export function computeAmounts(
  recipe: Recipe,
  waterPerCoffeeGram: number,
  cups: number,
  /** La forma de repartir el agua que se eligió, en los métodos que la dejan elegir. */
  split?: WaterSplitOption,
): Amounts {
  const coffeeGrams = roundTo(recipe.coffeeGramsPerCup * cups, COFFEE_STEP);
  const waterGrams = roundTo(coffeeGrams * waterPerCoffeeGram, WATER_STEP);
  const retainedGrams = roundTo(
    coffeeGrams * recipe.waterRetainedPerGram,
    WATER_STEP,
  );

  const marks: Record<string, number> = {};
  for (const [name, perGram] of Object.entries(recipe.waterMarks)) {
    marks[name] = roundTo(coffeeGrams * perGram, WATER_STEP);
  }

  return {
    cups,
    coffeeGrams,
    waterGrams,
    jarGrams: split ? roundTo(coffeeGrams * split.jarPerGram, WATER_STEP) : waterGrams,
    atServingGrams: split
      ? roundTo(coffeeGrams * split.atServingPerGram, WATER_STEP)
      : 0,
    splitsWater: split !== undefined,
    /*
     * El rendimiento se calcula sobre TODA el agua y nunca sobre la que entra al
     * recipiente, y eso no es un atajo: es el mecanismo. El café retiene lo que
     * retiene entre cuando entre el agua, así que partirla en dos momentos no cambia
     * lo que llega al vaso. Si aquí se restara solo el agua del frasco, elegir
     * «concentrado» en el cold brew enseñaría 45 ml en vez de 135 y parecería un
     * error de la página cuando el error estaría aquí.
     */
    outputMilliliters: roundTo(waterGrams - retainedGrams, WATER_STEP),
    retainedGrams,
    marks,
  };
}

/** Los nombres que se pueden usar entre llaves en los textos del contenido. */
export function amountVariables(amounts: Amounts): Record<string, string> {
  const variables: Record<string, string> = {
    cafe: `${formatNumber(amounts.coffeeGrams)} g`,
    agua: `${formatNumber(amounts.waterGrams)} g`,
    rendimiento: `${formatNumber(amounts.outputMilliliters)} ml`,
    retenida: `${formatNumber(amounts.retainedGrams)} g`,
  };

  /*
   * Los dos momentos del agua solo existen donde se pueden elegir. En los demás
   * métodos no se definen a propósito: valdrían toda el agua y "0 g", y un "0 g"
   * metido en una frase se lee como un dato cuando lo que significa es que esa
   * casilla ahí no va.
   */
  if (amounts.splitsWater) {
    variables.frasco = `${formatNumber(amounts.jarGrams)} g`;
    variables.alServir = `${formatNumber(amounts.atServingGrams)} g`;
  }

  for (const [name, grams] of Object.entries(amounts.marks)) {
    variables[name] = `${formatNumber(grams)} g`;
  }

  return variables;
}

/**
 * Cambia "{cafe}" por la cantidad que toque. Si un nombre no existe se deja tal
 * cual en pantalla: es preferible ver el hueco que mostrar un número falso.
 */
export function fillAmounts(
  text: string,
  variables: Record<string, string>,
): string {
  return text.replace(/\{(\w+)\}/g, (original, name: string) => {
    return variables[name] ?? original;
  });
}

/**
 * El ratio de una opción tal como se lee en la casilla: «1:11» cuando el agua entra de
 * una vez y «1:5 + 6 al servir» cuando se parte en dos.
 *
 * La segunda cifra va escrita y no se calla. Sin ella la casilla diría «1:5» mientras
 * el rendimiento sigue siendo el de 1:11, y la misma palabra —ratio— estaría contando
 * el café contra dos denominadores distintos según la opción elegida. Con el resto a
 * la vista se lee lo que es: la proporción del frasco, y dónde está el agua que falta.
 */
export function splitRatioLabel(option: WaterSplitOption): string {
  const jar = formatNumber(option.jarPerGram);
  if (option.atServingPerGram === 0) return `1:${jar}`;

  return `1:${jar} + ${formatNumber(option.atServingPerGram)} al servir`;
}
