"use client";

import type { ShotRecipe } from "@/content/metodos/types";
import { useShot } from "./recipe-amounts";

/**
 * La calculadora del espresso, en el hueco donde los demás métodos preguntan cuántas
 * tazas quieres.
 *
 * Aquí la pregunta es otra y por eso el bloque es otro: no se elige cuánto café apetece
 * —el espresso no se mide en tazas— sino que se declara **cuánto café cabe en la cesta que
 * ya tienes**, que es un hecho de tu equipo, y de ahí sale lo único que hay que calcular:
 * el peso de bebida que tiene que caer en la taza.
 *
 * Un solo control, y a propósito. La proporción también se podría ofrecer para elegir
 * —ristretto, lungo—, pero serían dos controles seguidos y el bloque empezaría a parecer
 * un formulario; además no serían la misma bebida, así que no es lo mismo que las dos
 * formas de repartir el agua del cold brew, donde elegir no cambia la taza. La ventana se
 * explica en la nota y la proporción se queda quieta.
 *
 * Va dentro de la banda lavender, así que todo el texto es `ink`: los tonos claros de la
 * paleta no llegan al contraste mínimo sobre ese fondo.
 */
export function ShotAmounts({ shot }: { shot: ShotRecipe }) {
  const { doseGrams, setDoseGrams, beverageGrams } = useShot();

  // La nota de la dosis elegida es la única que se enseña, así que tiene que sostenerse
  // sola. Si la dosis guardada no estuviera en la lista se cae en la primera, que es lo
  // que también hace el reparto del agua del cold brew.
  const selected =
    shot.doses.find((dose) => dose.grams === doseGrams) ?? shot.doses[0];

  const ratio = `1:${String(shot.beveragePerGram).replace(".", ",")}`;

  return (
    <div className="mt-10 border-t-2 border-ink pt-6 md:mt-12">
      <div className="md:flex md:items-start md:gap-16">
        <div className="md:w-72 md:shrink-0">
          <fieldset>
            <legend className="font-mono text-xs uppercase tracking-widest text-ink">
              {shot.question}
            </legend>

            <div className="mt-4 flex flex-wrap gap-2">
              {shot.doses.map((dose) => (
                <label key={dose.grams} className="cursor-pointer">
                  <input
                    type="radio"
                    name="dose"
                    value={dose.grams}
                    checked={selected.grams === dose.grams}
                    onChange={() => setDoseGrams(dose.grams)}
                    className="peer sr-only"
                  />
                  <span className="block border border-ink px-4 py-2 font-mono text-sm text-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                    {dose.grams} g
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="mt-4 max-w-prose text-sm text-ink">{selected.note}</p>
        </div>

        {/* El resultado, que es la otra mitad de la misma frase: con esta dosis, esto es
            lo que tiene que caer en la taza. */}
        <div className="mt-8 md:mt-0">
          <p className="font-mono text-xs uppercase tracking-widest text-ink">
            Peso de bebida
          </p>
          <p className="mt-2 font-display text-5xl leading-none text-ink md:text-6xl">
            {beverageGrams} g
          </p>
          <p className="mt-3 font-mono text-sm text-ink">
            {ratio} · {doseGrams} g de café en la cesta
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-prose">
        {shot.note.map((paragraph, index) => (
          <p key={index} className="mt-4 text-sm text-ink first:mt-0">
            {paragraph}
          </p>
        ))}
      </div>

      {shot.source ? (
        <p className="mt-6 font-mono text-xs text-ink">Fuente: {shot.source}</p>
      ) : null}
    </div>
  );
}
