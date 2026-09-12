"use client";

import { useEffect, useRef, useState } from "react";
import { fillAmounts } from "@/content/metodos/amounts";
import {
  activeStepNumber,
  formatClock,
  remainingSeconds,
} from "@/content/metodos/timing";
import { useBrewSound } from "./brew-sound";
import { useAmountVariables } from "./recipe-amounts";
import type { TimedStep } from "@/content/metodos/timing";

/**
 * Cuántos segundos del cronómetro sigue encendido el destello del cambio de paso.
 * Como `elapsed` va de segundo en segundo, con 2 el destello dura dos tictacs.
 */
const FLASH_SECONDS = 2;

/**
 * El cronómetro y la lista de pasos viven en el mismo componente porque comparten
 * un único dato: los segundos transcurridos. Es la única parte interactiva de la
 * página; todo lo demás se sigue renderizando en el servidor.
 */
export function TimedSteps({ steps }: { steps: TimedStep[] }) {
  // `elapsed` son los segundos que lleva el cronómetro, y es lo que se ve en pantalla.
  // Las cantidades del texto dependen de las tazas que haya elegido el visitante.
  const variables = useAmountVariables();
  const { soundOn, toggleSound, prepare, playStepChange, playFinish } =
    useBrewSound();
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
    // Pulsar es el gesto que el navegador exige para dejar sonar algo después.
    prepare();
    // Al reanudar se descuenta lo ya corrido para no perderlo.
    setStartedAt(Date.now() - elapsed * 1000);
  }

  function handleToggleSound() {
    if (!soundOn) prepare();
    toggleSound();
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

  const lastStep = steps.length > 0 ? steps[steps.length - 1] : null;
  const lastNumber = lastStep?.number ?? null;

  /**
   * El final de la preparación es el final del último paso, que sale del tiempo
   * total de la ficha técnica. Si ese texto no se pudo leer, se vuelve a lo de
   * antes: se da por terminado en cuanto arranca el último paso.
   */
  const finishSeconds = lastStep?.endSeconds ?? null;
  const finished =
    used &&
    (finishSeconds !== null
      ? elapsed >= finishSeconds
      : activeNumber !== null && activeNumber === lastNumber);

  /** Lo que falta para que el paso actual ceda el turno. Null si no se sabe. */
  const remaining = activeStep ? remainingSeconds(activeStep, elapsed) : null;
  const countingDown = !finished && remaining !== null;

  /**
   * Qué mide el número grande. Mientras haya cuenta atrás es lo que falta, porque
   * es lo único que se quiere saber de lejos; al terminar pasa a ser el tiempo que
   * costó la preparación, y si no hay cuenta atrás, el cronómetro de siempre.
   */
  const primarySeconds = countingDown ? remaining : elapsed;
  const primaryLabel = finished
    ? "Café listo"
    : countingDown
      ? "Falta"
      : used
        ? "Transcurrido"
        : "Cronómetro";

  /**
   * El destello no necesita estado propio ni temporizador: se deduce de los segundos
   * que lleva el paso actual, que ya se recalculan cuatro veces por segundo. Así se
   * apaga solo, y con el cronómetro en pausa no se queda encendido para siempre.
   */
  const flashing =
    running &&
    !finished &&
    activeStep?.startSeconds != null &&
    elapsed - activeStep.startSeconds < FLASH_SECONDS;

  const alerting = flashing || finished;

  // Sobre el fondo lavender del aviso, los tonos claros de la paleta no llegan al
  // contraste mínimo; ink sí, así que el texto del panel se oscurece mientras avisa.
  const labelColor = alerting ? "text-ink" : "text-sage-deep";
  const bodyColor = alerting ? "text-ink" : "text-coffee";

  const previousActiveRef = useRef<number | null>(null);

  useEffect(() => {
    const previous = previousActiveRef.current;
    previousActiveRef.current = activeNumber;

    if (activeNumber === null || activeNumber === previous) return;
    // Al arrancar de cero no se avisa: el visitante acaba de pulsar y está mirando.
    // Retroceder solo pasa al reiniciar, y eso tampoco es un aviso.
    if (previous === null || activeNumber < previous) return;

    playStepChange();
  }, [activeNumber, playStepChange]);

  // El aviso de final ya no cuelga del último paso, sino del final de verdad.
  const previousFinishedRef = useRef(false);

  useEffect(() => {
    const previous = previousFinishedRef.current;
    previousFinishedRef.current = finished;

    if (finished && !previous) playFinish();
  }, [finished, playFinish]);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-10 border-t border-ink px-6 py-4 transition-colors duration-200 motion-reduce:transition-none md:inset-x-auto md:top-6 md:right-6 md:bottom-auto md:w-80 md:border md:p-5 ${
          alerting ? "bg-lavender" : "bg-paper"
        }`}
        role="timer"
        aria-label="Cronómetro de la preparación"
      >
        {/* El rótulo ya no es de adorno: dice qué mide el número grande, que no
            siempre es lo mismo. Por eso se ve también en móvil. */}
        <p
          className={`font-mono text-xs uppercase tracking-widest ${labelColor}`}
        >
          {primaryLabel}
        </p>

        {/* Lo que falta manda sobre el total: va en el número grande y el tiempo
            corrido lo acompaña en pequeño. En un reposo de cuatro minutos el dato
            que se busca de lejos es cuánto queda, no cuánto se lleva. */}
        <div className="mt-2 flex items-end justify-between gap-4">
          <p className="font-mono text-4xl leading-none text-ink md:text-5xl">
            {formatClock(primarySeconds)}
          </p>

          {countingDown ? (
            <p
              className={`font-mono text-xs uppercase tracking-widest ${labelColor}`}
            >
              Van {formatClock(elapsed)}
            </p>
          ) : null}
        </div>

        {/* El aviso vive aquí en texto, no solo en el color ni en el sonido: este
            párrafo se relee solo en los lectores de pantalla al cambiar. */}
        <p
          className={`mt-3 truncate text-sm ${bodyColor}`}
          aria-live="polite"
          data-testid="current-step"
        >
          {activeStep ? (
            <>
              <span
                className={`font-mono text-xs uppercase tracking-widest ${labelColor}`}
              >
                {finished
                  ? "Listo "
                  : `Paso ${String(activeStep.number).padStart(2, "0")} `}
              </span>
              {fillAmounts(activeStep.title, variables)}
            </>
          ) : (
            "Arranca el cronómetro al primer vertido."
          )}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
          <TimerButton onClick={handleStart} filled={!running}>
            Iniciar
          </TimerButton>
          <TimerButton onClick={handlePause} filled={running}>
            Pausar
          </TimerButton>
          <TimerButton onClick={handleReset} filled={false}>
            Reiniciar
          </TimerButton>

          <button
            type="button"
            onClick={handleToggleSound}
            aria-pressed={!soundOn}
            aria-label="Silenciar los avisos del cronómetro"
            title={soundOn ? "Silenciar los avisos" : "Activar los avisos"}
            className={`border border-ink px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-deep ${
              soundOn ? "bg-paper text-ink" : "bg-ink text-paper"
            }`}
          >
            <SpeakerIcon muted={!soundOn} />
          </button>
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
      className={`flex-1 border border-ink px-1 py-2 font-mono text-xs uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-deep ${
        filled ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/** Altavoz de trazo fino, con las ondas tachadas cuando está en silencio. */
function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M8.5 3 5 5.75H2.75v4.5H5L8.5 13z" />
      {muted ? (
        <>
          <path d="M11 6.25l3.25 3.5" />
          <path d="M14.25 6.25 11 9.75" />
        </>
      ) : (
        <>
          <path d="M10.75 6.25a2.5 2.5 0 0 1 0 3.5" />
          <path d="M12.75 4.75a5 5 0 0 1 0 6.5" />
        </>
      )}
    </svg>
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
