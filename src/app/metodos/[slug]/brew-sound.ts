"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

/**
 * Se recuerda solo mientras dure la sesión del navegador: si alguien silencia el
 * cronómetro mientras prepara un café, no queremos que siga mudo dentro de un mes
 * sin acordarse de por qué.
 */
const STORAGE_KEY = "cafe-app:sonido-cronometro";

/**
 * El sessionStorage es un dato que vive fuera de React, así que se lee con la API
 * que React trae para eso en vez de copiarlo a un estado. La ventaja práctica es
 * que el servidor dibuja siempre "con sonido" y el navegador corrige después, sin
 * que las dos versiones se peleen al cargar la página.
 */
let listeners: (() => void)[] = [];

function subscribe(listener: () => void): () => void {
  listeners = [...listeners, listener];

  return () => {
    listeners = listeners.filter((current) => current !== listener);
  };
}

/** Respaldo en memoria para cuando el almacenamiento está bloqueado. */
let fallbackSound = true;

function readStoredSound(): boolean {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored !== "off";
  } catch {
    // Navegación privada o almacenamiento bloqueado: se usa el respaldo de abajo,
    // así el botón sigue silenciando aunque no se pueda recordar la elección.
  }

  return fallbackSound;
}

/** En el servidor no hay sesión que consultar: se dibuja con el sonido activo. */
function readServerSound(): boolean {
  return true;
}

function writeStoredSound(soundOn: boolean) {
  fallbackSound = soundOn;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, soundOn ? "on" : "off");
  } catch {
    // Sin almacenamiento el botón sigue funcionando, solo que no se recuerda.
  }

  for (const listener of listeners) listener();
}

type ToneOptions = {
  frequency: number;
  /** Momento del reloj del audio en el que arranca la nota. */
  startAt: number;
  seconds: number;
  /** Volumen máximo, de 0 a 1. Aquí se queda muy por debajo de la mitad. */
  peak: number;
};

/**
 * Programa una nota. Es una onda sinusoidal, que es la forma de onda sin armónicos
 * y por eso la que menos raspa al oído: suena a diapasón, no a alarma.
 *
 * El volumen sube y baja en rampa en vez de arrancar de golpe porque un sonido que
 * empieza y termina en seco produce un chasquido audible.
 */
function scheduleTone(
  context: AudioContext,
  { frequency, startAt, seconds, peak }: ToneOptions,
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startAt);

  // La rampa exponencial no admite el cero, de ahí el valor diminuto de los extremos.
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(peak, startAt + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + seconds);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(startAt);
  oscillator.stop(startAt + seconds + 0.05);
}

/**
 * Los avisos sonoros del cronómetro. No carga ningún archivo: los dos sonidos se
 * generan en el momento con la Web Audio API, que es la parte del navegador que
 * sabe fabricar sonido a partir de una frecuencia.
 */
export function useBrewSound() {
  const soundOn = useSyncExternalStore(
    subscribe,
    readStoredSound,
    readServerSound,
  );
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      void contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  /**
   * Prepara el canal de audio. Los navegadores solo dejan sonar algo si el visitante
   * ha tocado la página antes, así que esto se llama desde un botón y nunca al cargar.
   */
  const prepare = useCallback((): AudioContext | null => {
    if (!contextRef.current) {
      const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
      if (!AudioContextClass) return null;

      contextRef.current = new AudioContextClass();
    }

    const context = contextRef.current;
    if (context.state === "suspended") void context.resume();

    return context;
  }, []);

  const toggleSound = useCallback(() => {
    writeStoredSound(!readStoredSound());
  }, []);

  /** Cambio de paso: una nota corta y sola, para levantar la vista y nada más. */
  const playStepChange = useCallback(() => {
    if (!soundOn) return;
    const context = prepare();
    if (!context) return;

    scheduleTone(context, {
      frequency: 660,
      startAt: context.currentTime,
      seconds: 0.18,
      peak: 0.12,
    });
  }, [soundOn, prepare]);

  /**
   * Final: do–mi–sol ascendente, tres notas que se solapan y cierran como un acorde.
   * Dura casi siete veces más que el aviso de paso, así que se distingue sin pensar
   * aunque estés de espaldas.
   */
  const playFinish = useCallback(() => {
    if (!soundOn) return;
    const context = prepare();
    if (!context) return;

    const now = context.currentTime;
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      scheduleTone(context, {
        frequency,
        startAt: now + index * 0.26,
        seconds: 0.5,
        peak: 0.09,
      });
    });
  }, [soundOn, prepare]);

  return { soundOn, toggleSound, prepare, playStepChange, playFinish };
}
