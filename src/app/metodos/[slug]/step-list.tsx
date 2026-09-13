import { fillAmounts } from "@/content/metodos/amounts";
import type { TimedStep } from "@/content/metodos/timing";

/**
 * La lista de pasos, sin cronómetro dentro.
 *
 * Salió de `timed-steps.tsx` cuando llegó la moka, que es el primer método del sitio
 * que no corre contra un reloj: su fabricante no da minutos sino un suceso —se retira
 * cuando el recolector está lleno—, así que su ficha no tiene cronómetro que marcar.
 * Sin separarla habría hecho falta repetir este mismo marcado en otro sitio, y dos
 * listas de pasos que se copian se separan a la primera corrección.
 *
 * No lleva `"use client"` ni ningún hook a propósito: recibe por parámetro las dos
 * cosas que cambian —qué paso va marcado y las cantidades ya calculadas— en vez de
 * leerlas del contexto. Así la usan igual el cronómetro, que es de cliente, y la ficha
 * de la moka, que se pinta entera en el servidor.
 */
export function StepList({
  steps,
  activeNumber,
  variables,
}: {
  steps: TimedStep[];
  /** El paso en el que va quien prepara, o null si no hay cronómetro que lo diga. */
  activeNumber: number | null;
  /** Las "{cantidades}" que se sustituyen en los textos. Vacío si el método no calcula. */
  variables: Record<string, string>;
}) {
  return (
    <ol className="mt-12">
      {steps.map((step) => {
        const isActive = step.number === activeNumber;

        return (
          <li
            key={step.title}
            data-active={isActive ? "true" : undefined}
            className="border-t border-dust py-8 md:grid md:grid-cols-[9rem_1fr] md:gap-x-12 md:py-10"
          >
            <div className="flex items-baseline gap-4 md:block">
              <span
                className={
                  isActive
                    ? "bg-lavender-deep px-2 font-mono text-2xl text-paper"
                    : "font-mono text-2xl text-lavender-deep"
                }
              >
                {String(step.number).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-sage-deep md:mt-2">
                {/* El reloj solo acompaña a lo que de verdad es una hora del
                    cronómetro. En la moka ningún paso lo es —"Al gorgoteo" no es un
                    minuto— y la lista sale entera sin relojes, que es el dato. */}
                {step.startSeconds !== null ? <ClockIcon /> : null}
                {step.time}
              </span>
              {isActive ? (
                <span className="font-mono text-xs uppercase tracking-widest text-lavender-deep md:mt-2 md:block">
                  Vas aquí
                </span>
              ) : null}
            </div>

            <div className="mt-4 max-w-prose md:mt-0">
              <h3 className="font-display text-2xl md:text-3xl">
                {fillAmounts(step.title, variables)}
              </h3>
              <p className="mt-3 text-base text-ink md:text-lg">
                {fillAmounts(step.description, variables)}
              </p>
              <p className="mt-4 text-base text-coffee">
                <span className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                  Por qué{" "}
                </span>
                {fillAmounts(step.why, variables)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Mismo reloj de trazo fino de la ficha técnica. */
export function ClockIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.4 1.7" />
    </svg>
  );
}
