import type { BrewStep } from "./types";

/** Un paso tal como lo necesita el temporizador: el contenido más su arranque en segundos. */
export type TimedStep = BrewStep & {
  /** Número visible del paso, empezando en 1. */
  number: number;
  /**
   * Segundo del cronómetro en el que arranca el paso, o null si no ocurre en el
   * cronómetro (los pasos "Previo", que se hacen antes de arrancarlo).
   */
  startSeconds: number | null;
  /**
   * Segundo en el que el paso cede el turno: es el arranque del paso siguiente, y
   * en el último, el final de la preparación entera. Null si no se puede deducir.
   */
  endSeconds: number | null;
};

/**
 * Saca el primer "m:ss" que aparezca en el texto del tiempo del paso.
 * Sirve para "0:45 – 1:15" (arranca en 0:45), "1:45" y "≈ 3:00"; "Previo" da null.
 */
export function parseStartSeconds(time: string): number | null {
  const match = time.match(/(\d+):([0-5]\d)/);
  if (!match) return null;

  return Number(match[1]) * 60 + Number(match[2]);
}

/**
 * Saca el último "m:ss" del texto. En un rango como "3:00 – 3:30" es el final, y en
 * "≈ 5:00", el único que hay. Se usa sobre el tiempo total de la ficha técnica para
 * saber cuándo se da por terminada la preparación, sin añadir campos al contenido.
 */
export function parseEndSeconds(time: string): number | null {
  const matches = time.match(/\d+:[0-5]\d/g);
  if (!matches) return null;

  const [minutes, seconds] = matches[matches.length - 1].split(":");

  return Number(minutes) * 60 + Number(seconds);
}

/**
 * Añade a cada paso su número y sus dos extremos en segundos, sin tocar el contenido.
 * El final de un paso no está escrito en ninguna parte: es el arranque del siguiente.
 * El último no tiene siguiente, así que recibe el final de la preparación entera.
 */
export function toTimedSteps(
  steps: BrewStep[],
  finishSeconds: number | null = null,
): TimedStep[] {
  const starts = steps.map((step) => parseStartSeconds(step.time));

  return steps.map((step, index) => {
    const startSeconds = starts[index];
    // Se busca el siguiente que ocurra en el cronómetro: los pasos "Previo" no cuentan.
    const nextStart =
      starts.slice(index + 1).find((value) => value !== null) ?? null;

    return {
      ...step,
      number: index + 1,
      startSeconds,
      endSeconds: startSeconds === null ? null : (nextStart ?? finishSeconds),
    };
  });
}

/**
 * Segundos que faltan para que el paso ceda el turno, o null si no se sabe. Un final
 * que no sea posterior al arranque significa que el contenido no cuadra; en ese caso
 * se prefiere no mostrar cuenta atrás antes que mostrar uno negativo.
 */
export function remainingSeconds(
  step: TimedStep,
  elapsedSeconds: number,
): number | null {
  if (step.startSeconds === null || step.endSeconds === null) return null;
  if (step.endSeconds <= step.startSeconds) return null;

  return Math.max(0, step.endSeconds - elapsedSeconds);
}

/**
 * Paso en el que debería ir alguien que lleva `elapsedSeconds` de cronómetro:
 * el último que ya arrancó. Devuelve null si todavía no arrancó ninguno.
 */
export function activeStepNumber(
  steps: TimedStep[],
  elapsedSeconds: number,
): number | null {
  let active: number | null = null;

  for (const step of steps) {
    if (step.startSeconds !== null && step.startSeconds <= elapsedSeconds) {
      active = step.number;
    }
  }

  return active;
}

/** Segundos a "mm:ss", que es como se leen los tiempos de una preparación. */
export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
