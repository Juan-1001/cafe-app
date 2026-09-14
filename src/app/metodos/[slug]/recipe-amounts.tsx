"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  amountVariables,
  computeAmounts,
  computeShot,
  fillAmounts,
  shotVariables,
} from "@/content/metodos/amounts";
import type {
  Recipe,
  ShotRecipe,
  WaterSplit,
  WaterSplitOption,
} from "@/content/metodos/types";
import type { TimedStep } from "@/content/metodos/timing";
import { StepList } from "./step-list";

/** Lo que se ofrece cuando el método no acota las tazas que hace bien. */
const DEFAULT_CUP_OPTIONS = [1, 2, 3, 4];

type RecipeAmountsValue = {
  cups: number;
  setCups: (cups: number) => void;
  options: number[];
  variables: Record<string, string>;
  /** Las formas de repartir el agua, o null si en este método entra de una vez. */
  split: WaterSplit | null;
  /** La elegida. Null cuando no hay nada que elegir. */
  selected: WaterSplitOption | null;
  setSplitKey: (key: string) => void;
  /** La dosis elegida en los métodos que se miden por cesta. Cero en los demás. */
  doseGrams: number;
  setDoseGrams: (grams: number) => void;
  /** Lo que tiene que caer en la taza con esa dosis. Cero en los demás. */
  beverageGrams: number;
};

const RecipeAmountsContext = createContext<RecipeAmountsValue | null>(null);

function useRecipeAmounts(): RecipeAmountsValue {
  const value = useContext(RecipeAmountsContext);
  if (!value) {
    throw new Error("Falta envolver la página en <RecipeAmountsProvider>.");
  }

  return value;
}

/** Las cantidades ya calculadas, para componentes que arman su propio texto. */
export function useAmountVariables(): Record<string, string> {
  return useRecipeAmounts().variables;
}

/** La dosis elegida y lo que hay que cortar con ella. Lo usa el bloque del espresso. */
export function useShot(): Pick<
  RecipeAmountsValue,
  "doseGrams" | "setDoseGrams" | "beverageGrams"
> {
  const { doseGrams, setDoseGrams, beverageGrams } = useRecipeAmounts();

  return { doseGrams, setDoseGrams, beverageGrams };
}

/** Cómo entra el agua y quién lo decide. Lo usa la casilla del ratio. */
export function useWaterSplit(): Pick<
  RecipeAmountsValue,
  "split" | "selected" | "setSplitKey"
> {
  const { split, selected, setSplitKey } = useRecipeAmounts();

  return { split, selected, setSplitKey };
}

/**
 * Guarda cuántas tazas quiere el visitante y reparte las cantidades ya
 * calculadas por la página. Envuelve contenido del servidor: solo las piezas
 * que muestran cifras son de cliente.
 */
export function RecipeAmountsProvider({
  recipe,
  shot,
  waterPerCoffeeGram,
  children,
}: {
  /**
   * Falta en los métodos que no calculan nada porque las cantidades las fija el
   * aparato, como la moka. El envoltorio se pone igual: los textos de la ficha
   * siguen pasando por `<Amounts>`, que sin receta los deja tal cual.
   */
  recipe?: Recipe;
  /**
   * La otra forma de calcular, la del espresso: en vez de tazas se elige la dosis que
   * cabe en la cesta y de ahí sale el peso de bebida. Vive en el mismo proveedor y no
   * en uno aparte a propósito, porque produce lo mismo que la receta —las cantidades
   * que los textos de la ficha piden entre llaves— y dos contextos distintos para eso
   * habrían obligado a cada componente a saber cuál de los dos mirar.
   */
  shot?: ShotRecipe;
  waterPerCoffeeGram: number;
  children: React.ReactNode;
}) {
  /*
   * En memoria porque sin receta la lista es un array nuevo en cada pintada, y eso
   * bastaría para recalcular las cantidades a cada rato sin que nada haya cambiado.
   */
  const options = useMemo(
    () => (recipe ? (recipe.cupOptions ?? DEFAULT_CUP_OPTIONS) : []),
    [recipe],
  );
  // Se arranca en la primera opción del método, que no siempre es una taza.
  const [cups, setCups] = useState(options[0] ?? 0);

  /*
   * Cómo entra el agua: de una vez, o partida en dos momentos. Casi ningún método lo
   * deja elegir, así que aquí normalmente no hay nada. Se guarda la clave y no la
   * opción entera para que el estado siga siendo un dato simple y la opción se busque
   * siempre en el contenido, que es donde vive.
   */
  const split = recipe?.waterSplit ?? null;
  const [splitKey, setSplitKey] = useState(split?.options[0]?.key ?? "");
  // Si la clave guardada no existe se cae en la primera, que es la que se ofrece.
  const selected =
    split?.options.find((option) => option.key === splitKey) ??
    split?.options[0] ??
    null;

  /*
   * La dosis del espresso. Arranca en la que la ficha marca como dosis de entrada, que se
   * elige a mano y no tiene por qué ser la primera de la lista; `index.ts` ya comprobó al
   * compilar que ese valor está entre las que se ofrecen.
   */
  const [doseGrams, setDoseGrams] = useState(shot?.entryGrams ?? 0);

  const value = useMemo<RecipeAmountsValue>(() => {
    const choice = { split, selected, setSplitKey };
    const shotAmounts = shot ? computeShot(shot, doseGrams) : null;
    const dose = {
      doseGrams: shotAmounts?.doseGrams ?? 0,
      beverageGrams: shotAmounts?.beverageGrams ?? 0,
      setDoseGrams,
    };

    if (!recipe) {
      return {
        cups,
        setCups,
        options,
        // Sin receta, las cantidades que haya son las del espresso; y si tampoco las hay
        // —la moka—, no hay ninguna y los textos se quedan tal cual.
        variables: shotAmounts ? shotVariables(shotAmounts) : {},
        ...choice,
        ...dose,
      };
    }

    const amounts = computeAmounts(
      recipe,
      waterPerCoffeeGram,
      cups,
      selected ?? undefined,
    );

    return {
      cups,
      setCups,
      options,
      variables: amountVariables(amounts),
      ...choice,
      ...dose,
    };
  }, [recipe, shot, doseGrams, waterPerCoffeeGram, cups, options, split, selected]);

  return (
    <RecipeAmountsContext.Provider value={value}>
      {children}
    </RecipeAmountsContext.Provider>
  );
}

/** Texto del contenido con sus "{cantidades}" ya reemplazadas. */
export function Amounts({ text }: { text: string }) {
  const variables = useAmountVariables();

  return <>{fillAmounts(text, variables)}</>;
}

/**
 * La lista de pasos de los métodos sin cronómetro, con sus cantidades sustituidas.
 *
 * Existe por una combinación que no se había dado nunca: un método que calcula
 * cantidades y además no lleva cronómetro. La moka, la única sin cronómetro hasta que
 * llegó el cold brew, tampoco tenía receta, así que la página le pasaba a `StepList`
 * unas variables vacías y eso era correcto. Con el cold brew dejó de serlo: sus pasos
 * enseñaban «{frasco}» escrito tal cual en pantalla.
 *
 * Se vio porque `fillAmounts` deja el nombre a la vista cuando no encuentra la
 * cantidad, en vez de poner un cero. Un hueco raro en pantalla se nota; un «0 g» no.
 *
 * Es un componente de cliente y solo por esto: las cantidades dependen de las tazas
 * que elija quien lee, que es estado del navegador. `StepList` se queda sin hooks y
 * sin `"use client"`, que es lo que permite que la use también el cronómetro.
 */
export function PlainSteps({ steps }: { steps: TimedStep[] }) {
  const variables = useAmountVariables();

  return <StepList steps={steps} activeNumber={null} variables={variables} />;
}

/** Selector de tazas. Los radios de verdad traen gratis el teclado y el lector de pantalla. */
export function CupsControl() {
  const { cups, setCups, options } = useRecipeAmounts();

  /*
   * Hay métodos de capacidad fija —el AeroPress hace una taza y no caben dos— y ahí no
   * hay nada que elegir. Se enseña la cifra igual, porque dice para cuántas tazas son
   * las cantidades de la ficha, pero no como un control: un botón que no cambia nada
   * invita a pulsarlo y no responde. Por qué es fija lo cuenta el propio método en la
   * nota de su rendimiento, que es donde vive el contenido.
   */
  /*
   * Sin opciones no hay nada que decir aquí: es un método que no calcula cantidades
   * y que en este mismo sitio de la página enseña, en su lugar, lo que el aparato
   * fija. Ver `<DeviceAmounts>` en la página de la ficha.
   */
  if (options.length === 0) return null;

  if (options.length < 2) {
    return (
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink">
          Cuántas tazas
        </p>
        <p className="mt-3 font-mono text-sm text-ink">{options[0]}</p>
      </div>
    );
  }

  return (
    <fieldset>
      <legend className="font-mono text-xs uppercase tracking-widest text-ink">
        Cuántas tazas
      </legend>

      <div className="mt-3 flex gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name="cups"
              value={option}
              checked={cups === option}
              onChange={() => setCups(option)}
              className="peer sr-only"
            />
            <span className="block border border-ink px-4 py-2 font-mono text-sm text-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
