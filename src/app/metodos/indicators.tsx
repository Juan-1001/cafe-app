import type { BrewMethod } from "@/content/metodos";

/**
 * Marcas que comparten la página índice y la ficha de cada método. Viven aquí para
 * que la escala de dificultad se dibuje igual en los dos sitios y no se separen.
 */

/** Reloj de trazo fino. Marca un dato de tiempo, no decora. */
export function ClockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${className} shrink-0`}
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.4 1.7" />
    </svg>
  );
}

export function DifficultyMeter({
  difficulty,
}: {
  difficulty: BrewMethod["difficulty"];
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex gap-1"
        role="img"
        aria-label={`Dificultad ${difficulty.level} de 3`}
      >
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={
              step <= difficulty.level
                ? "h-3 w-3 bg-lavender-deep"
                : "h-3 w-3 border border-dust"
            }
          />
        ))}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-coffee">
        {difficulty.label}
      </span>
    </div>
  );
}
