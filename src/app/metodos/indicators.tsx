import type { DifficultyLevel } from "@/content/metodos";

/**
 * Marcas que comparten la página índice y la ficha de cada método. Viven aquí para
 * que la escala se dibuje igual en los dos sitios y no se separen.
 */

// El reloj lo usan también las etiquetas de /granos, así que vive con el resto de los
// iconos del sitio. Se reexporta desde aquí para que las páginas de métodos lo sigan
// pidiendo donde siempre.
export { ClockIcon } from "@/app/icons";

/**
 * Lo que oye quien no ve el medidor.
 *
 * Dice la cosa y no el número. «Dificultad 3 de 3», que es lo que decía antes, obliga
 * a adivinar de qué escala se habla y hacia dónde crece; y la palabra suelta del
 * rótulo —«Implacable»— tampoco dice implacable con qué.
 *
 * Vive aquí y no en `difficulty.ts` a propósito: es texto de interfaz, de la misma
 * clase que un `aria-label`, y no una de las cuatro palabras con las que el sistema
 * nombra sus niveles.
 */
const LEVEL_DESCRIPTION: Record<DifficultyLevel, string> = {
  1: "Tolerante con el error",
  2: "Exigente con el error",
  3: "Implacable con el error",
};

/**
 * Cuánto exige el método: tres cuadros que se llenan según el nivel.
 *
 * Recibe el nivel ya calculado y no las cuatro notas, porque el cálculo no es asunto
 * de un componente: vive entero en `difficulty.ts` y aquí solo se pinta lo que salga.
 *
 * El grupo entero es una sola imagen para el lector de pantalla. Si se etiquetaran los
 * cuadros por su lado y se dejara el rótulo suelto por el suyo, se oiría dos veces lo
 * mismo seguido.
 */
export function DifficultyMeter({
  level,
  label,
}: {
  level: DifficultyLevel;
  /** La palabra del nivel, tal como la sirve `DIFFICULTY_LEVELS`. */
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-3"
      role="img"
      aria-label={LEVEL_DESCRIPTION[level]}
    >
      <span className="flex gap-1">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={
              step <= level
                ? "h-3 w-3 bg-lavender-deep"
                : "h-3 w-3 border border-dust"
            }
          />
        ))}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-coffee">
        {label}
      </span>
    </div>
  );
}
