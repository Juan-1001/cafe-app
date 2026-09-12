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

/** Añade a cada paso su número y su arranque en segundos, sin tocar el contenido. */
export function toTimedSteps(steps: BrewStep[]): TimedStep[] {
  return steps.map((step, index) => ({
    ...step,
    number: index + 1,
    startSeconds: parseStartSeconds(step.time),
  }));
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
