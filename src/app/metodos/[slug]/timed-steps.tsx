"use client";

import { useEffect, useState } from "react";
import { activeStepNumber, formatClock } from "@/content/metodos/timing";
import type { TimedStep } from "@/content/metodos/timing";

/**
 * El cronómetro y la lista de pasos viven en el mismo componente porque comparten
 * un único dato: los segundos transcurridos. Es la única parte interactiva de la
 * página; todo lo demás se sigue renderizando en el servidor.
 */
export function TimedSteps({ steps }: { steps: TimedStep[] }) {
  // `elapsed` son los segundos que lleva el cronómetro, y es lo que se ve en pantalla.
  const [elapsed, setElapsed] = useState(0);
  // `startedAt` es el instante real en el que arrancó. Si es null, está detenido.
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const running = startedAt !== null;

  useEffect(() => {
    if (startedAt === null) return;

    // Se recalcula desde la hora del reloj del sistema, no sumando de a uno, para
    // que no se atrase si el navegador se salta algún aviso.
    const tick = () => setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    tick();
    const id = window.setInterval(tick, 250);

    return () => window.clearInterval(id);
  }, [startedAt]);

  function handleStart() {
    // Al reanudar se descuenta lo ya corrido para no perderlo.
    setStartedAt(Date.now() - elapsed * 1000);
  }

  function handlePause() {
    setStartedAt(null);
  }

  function handleReset() {
    setStartedAt(null);
    setElapsed(0);
  }

  // Antes de tocar nada no se marca ningún paso: marcar el primero sin haber
  // arrancado sería una señal falsa.
  const used = running || elapsed > 0;
  const activeNumber = used ? activeStepNumber(steps, elapsed) : null;
  const activeStep = steps.find((step) => step.number === activeNumber) ?? null;

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-10 border-t border-ink bg-paper px-6 py-4 md:inset-x-auto md:top-6 md:right-6 md:bottom-auto md:w-80 md:border md:p-5"
        role="timer"
        aria-label="Cronómetro de la preparación"
      >
        <p className="hidden font-mono text-xs uppercase tracking-widest text-sage-deep md:block">
          Cronómetro
        </p>

        {/* En móvil el reloj y el paso comparten fila; en escritorio se apilan. */}
        <div className="flex items-baseline justify-between gap-4 md:mt-3 md:block">
          <p className="font-mono text-4xl text-ink md:text-5xl">
            {formatClock(elapsed)}
          </p>

          <p
            className="min-w-0 flex-1 truncate text-right text-sm text-coffee md:mt-4 md:text-left"
            aria-live="polite"
            data-testid="current-step"
          >
            {activeStep ? (
              <>
                <span className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                  Paso {String(activeStep.number).padStart(2, "0")}{" "}
                </span>
                {activeStep.title}
              </>
            ) : (
              "Arranca el cronómetro al primer vertido."
            )}
          </p>
        </div>

        <div className="mt-3 flex gap-2 md:mt-4">
          <TimerButton onClick={handleStart} filled={!running}>
            Iniciar
          </TimerButton>
          <TimerButton onClick={handlePause} filled={running}>
            Pausar
          </TimerButton>
          <TimerButton onClick={handleReset} filled={false}>
            Reiniciar
          </TimerButton>
        </div>
      </div>

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
                <h3 className="font-display text-2xl md:text-3xl">{step.title}</h3>
                <p className="mt-3 text-base text-ink md:text-lg">
                  {step.description}
                </p>
                <p className="mt-4 text-base text-coffee">
                  <span className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                    Por qué{" "}
                  </span>
                  {step.why}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function TimerButton({
  onClick,
  filled,
  children,
}: {
  onClick: () => void;
  filled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 border border-ink px-2 py-2 font-mono text-xs uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-deep ${
        filled ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/** Mismo reloj de trazo fino de la ficha técnica. */
function ClockIcon() {
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
