import type { ErrorPenalty } from "@/content/metodos";

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
 */
const PENALTY_DESCRIPTION: Record<ErrorPenalty["level"], string> = {
  1: "Tolerante con el error",
  2: "Exigente con el error",
  3: "Implacable con el error",
};

/**
 * Cuánto castiga el método un error: tres cuadros que se llenan según el nivel.
 *
 * El grupo entero es una sola imagen para el lector de pantalla. Si se etiquetaran los
 * cuadros por su lado y se dejara el rótulo suelto por el suyo, se oiría dos veces lo
 * mismo seguido.
 */
export function ErrorPenaltyMeter({ penalty }: { penalty: ErrorPenalty }) {
  return (
    <div
      className="flex items-center gap-3"
      role="img"
      aria-label={PENALTY_DESCRIPTION[penalty.level]}
    >
      <span className="flex gap-1">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={
              step <= penalty.level
                ? "h-3 w-3 bg-lavender-deep"
                : "h-3 w-3 border border-dust"
            }
          />
        ))}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-coffee">
        {penalty.label}
      </span>
    </div>
  );
}
