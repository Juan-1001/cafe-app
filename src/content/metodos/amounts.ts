import type { Recipe } from "./types";

/** Cantidades ya calculadas para un número concreto de tazas. */
export type Amounts = {
  cups: number;
  coffeeGrams: number;
  waterGrams: number;
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
