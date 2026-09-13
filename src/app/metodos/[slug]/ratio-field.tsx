"use client";

import { splitRatioLabel } from "@/content/metodos/amounts";
import type { Ratio } from "@/content/metodos/ratio";
import type { Spec, WaterSplit, WaterSplitOption } from "@/content/metodos/types";
import { Amounts, useWaterSplit } from "./recipe-amounts";

/** Los dos tramos de la barra cuando el agua entra en dos momentos. */
type BarSplit = {
  jarCells: number;
  servingCells: number;
};

/**
 * Hace tangible el ratio: una casilla de café frente a las que pide de agua.
 * Se dibuja sobre la banda lavender de la ficha, así que el café va en `ink` y
 * el agua en `paper`; lavender sobre lavender no se vería.
 *
 * Cuando el método deja elegir cómo entra el agua, la barra **no pierde casillas**:
 * lo que se acorta es el tramo macizo, y el resto se queda dibujado solo con el
 * contorno. Es la forma de que el gráfico diga lo que de verdad pasa —la misma agua,
 * en dos veces— y de que el rendimiento quieto se lea como información y no como un
 * descuadre: si la barra se quedara corta de verdad, un vaso igual de lleno con menos
 * barra parecería un error de la página.
 */
function RatioBar({ ratio, split }: { ratio: Ratio; split?: BarSplit }) {
  // El gráfico cuenta casillas enteras; las cifras exactas quedan en el texto.
  const waterCells = Math.max(1, Math.round(ratio.water / ratio.coffee));
  const jarCells = split
    ? Math.min(waterCells, Math.max(1, split.jarCells))
    : waterCells;
  const servingCells = waterCells - jarCells;

  const cells = waterCells + 1;
  const cellWidth = 10;
  const gap = 2;
  const height = 14;
  const width = cells * (cellWidth + gap) - gap;

  const label =
    split && servingCells > 0
      ? `${ratio.coffee} de café por ${jarCells} de agua al frasco y ${servingCells} más al servir`
      : `${ratio.coffee} de café por cada ${ratio.water} de agua`;

  return (
    <div className="mt-4 max-w-prose">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="auto"
        role="img"
        aria-label={label}
        className="block"
      >
        {Array.from({ length: cells }, (_, index) => {
          // Lo que todavía no está en el frasco se dibuja hueco. El medio píxel de
          // margen es para que el trazo quepa dentro de la casilla y no se recorte.
          if (index > jarCells) {
            return (
              <rect
                key={index}
                x={index * (cellWidth + gap) + 0.5}
                y={0.5}
                width={cellWidth - 1}
                height={height - 1}
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth={1}
              />
            );
          }

          return (
            <rect
              key={index}
              x={index * (cellWidth + gap)}
              y={0}
              width={cellWidth}
              height={height}
              fill={index === 0 ? "var(--color-ink)" : "var(--color-paper)"}
            />
          );
        })}
      </svg>

      {/* Con `flex-wrap`, si los tres rótulos no caben en el ancho de un móvil bajan
          de línea en vez de apretarse unos contra otros. */}
      <div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-widest text-ink">
        <span>
          <Amounts text="{cafe}" /> café
        </span>

        {split ? (
          <>
            <span>
              <Amounts text="{frasco}" /> al frasco
            </span>
            {servingCells > 0 ? (
              <span>
                <Amounts text="{alServir}" /> al servir
              </span>
            ) : null}
          </>
        ) : (
          <span>
            <Amounts text="{agua}" /> agua
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Las formas de repartir el agua, para elegir una.
 *
 * Va donde iba el valor del ratio y no en una fila propia: el dato que se elige es
 * justo ese, así que la casilla entera pasa a ser la elección en vez de ganarse un
 * control aparte debajo del de las tazas. Dos controles seguidos empiezan a parecer
 * un formulario, y esta página no lo es.
 *
 * Son radios de verdad, como el selector de tazas, y por lo mismo: traen gratis el
 * teclado —flechas para moverse dentro del grupo— y el anuncio del lector de pantalla.
 * Lo elegido no se dice solo con el color: lleva su cuadradito macizo frente al hueco
 * de la otra opción, que es lo que queda cuando el color no llega.
 */
function WaterSplitControl({
  split,
  selected,
  onSelect,
}: {
  split: WaterSplit;
  selected: WaterSplitOption;
  onSelect: (key: string) => void;
}) {
  return (
    <fieldset className="mt-3">
      {/* La pregunta no se ve —el rótulo de la casilla y los dos nombres ya la
          dicen— pero sin ella el grupo llegaría mudo al lector de pantalla. */}
      <legend className="sr-only">{split.question}</legend>

      <div className="flex flex-col gap-2">
        {split.options.map((option) => {
          const isSelected = option.key === selected.key;

          return (
            <label key={option.key} className="block cursor-pointer">
              <input
                type="radio"
                name="water-split"
                value={option.key}
                checked={isSelected}
                onChange={() => onSelect(option.key)}
                className="peer sr-only"
              />
              <span
                className={`flex items-baseline gap-3 border border-ink px-4 py-3 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
                  isSelected ? "bg-ink text-paper" : "text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`relative top-0.5 h-3 w-3 shrink-0 border ${
                    isSelected ? "border-paper bg-paper" : "border-ink"
                  }`}
                />
                <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest">
                    {option.label}
                  </span>
                  <span className="font-mono text-xl md:text-2xl">
                    {splitRatioLabel(option)}
                  </span>
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * La casilla del ratio entera: el valor, la barra y lo que haya que explicar debajo.
 *
 * Es la única casilla de la ficha técnica que no se pinta en el servidor, y solo
 * porque puede haber algo que elegir dentro. Donde no lo hay —que son todos los
 * métodos menos el cold brew— se comporta exactamente como antes: el valor escrito
 * en el contenido, su barra y su nota.
 */
export function RatioField({ spec, ratio }: { spec: Spec; ratio: Ratio | null }) {
  const { split, selected, setSplitKey } = useWaterSplit();

  return (
    <>
      {split && selected ? (
        <WaterSplitControl
          split={split}
          selected={selected}
          onSelect={setSplitKey}
        />
      ) : (
        <p className="mt-2 font-mono text-2xl text-ink md:text-3xl">
          <Amounts text={spec.value} />
        </p>
      )}

      {ratio ? (
        <RatioBar
          ratio={ratio}
          split={
            selected
              ? {
                  jarCells: Math.round(selected.jarPerGram),
                  servingCells: Math.round(selected.atServingPerGram),
                }
              : undefined
          }
        />
      ) : null}

      {/* Primero lo que significa la opción elegida, que es lo que acaba de cambiar,
          y después de dónde sale la proporción, que no cambia al elegir. */}
      {selected ? (
        <p className="mt-4 max-w-prose text-sm text-ink">
          <Amounts text={selected.note} />
        </p>
      ) : null}

      {spec.note ? (
        <p
          className={`${selected ? "mt-4" : "mt-2"} max-w-prose text-sm text-ink`}
        >
          <Amounts text={spec.note} />
        </p>
      ) : null}
    </>
  );
}
