import type { BrewMethod } from "@/content/metodos";

/**
 * Marcas que comparten la página índice y la ficha de cada método. Viven aquí para
 * que la escala de dificultad se dibuje igual en los dos sitios y no se separen.
 */

// El reloj lo usan también las etiquetas de /granos, así que vive con el resto de los
// iconos del sitio. Se reexporta desde aquí para que las páginas de métodos lo sigan
// pidiendo donde siempre.
export { ClockIcon } from "@/app/icons";

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
