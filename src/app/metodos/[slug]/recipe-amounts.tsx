"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  amountVariables,
  computeAmounts,
  fillAmounts,
} from "@/content/metodos/amounts";
import type { Recipe } from "@/content/metodos/types";

/** Lo que se ofrece cuando el método no acota las tazas que hace bien. */
const DEFAULT_CUP_OPTIONS = [1, 2, 3, 4];

type RecipeAmountsValue = {
  cups: number;
  setCups: (cups: number) => void;
  options: number[];
  variables: Record<string, string>;
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

/**
 * Guarda cuántas tazas quiere el visitante y reparte las cantidades ya
 * calculadas por la página. Envuelve contenido del servidor: solo las piezas
 * que muestran cifras son de cliente.
 */
export function RecipeAmountsProvider({
  recipe,
  waterPerCoffeeGram,
  children,
}: {
  recipe: Recipe;
  waterPerCoffeeGram: number;
  children: React.ReactNode;
}) {
  const options = recipe.cupOptions ?? DEFAULT_CUP_OPTIONS;
  // Se arranca en la primera opción del método, que no siempre es una taza.
  const [cups, setCups] = useState(options[0]);

  const value = useMemo<RecipeAmountsValue>(() => {
    const amounts = computeAmounts(recipe, waterPerCoffeeGram, cups);

    return { cups, setCups, options, variables: amountVariables(amounts) };
  }, [recipe, waterPerCoffeeGram, cups, options]);

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

/** Selector de tazas. Los radios de verdad traen gratis el teclado y el lector de pantalla. */
export function CupsControl() {
  const { cups, setCups, options } = useRecipeAmounts();

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
