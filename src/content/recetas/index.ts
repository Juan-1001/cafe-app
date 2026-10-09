import { getBrewMethod } from "../metodos";
import { assertSourcesAreUsable } from "../sources";
import type { DeclaredImage } from "../types";
import type { Recipe } from "./types";
import { affogato } from "./affogato";
import { coldBrewConNaranja } from "./cold-brew-con-naranja";
import { cortado } from "./cortado";
import { espressoTonic } from "./espresso-tonic";
import { mokaConCondensada } from "./moka-con-condensada";
import { perico } from "./perico";
import { tintoDePanela } from "./tinto-de-panela";

/**
 * Un archivo por receta en esta carpeta; aquí se registran.
 *
 * El orden es editorial y es el de la rejilla del diseño: la primera receta ocupa la
 * casilla alta de la izquierda, las cuatro siguientes las del bloque de la derecha y
 * las dos últimas la fila de abajo. Cambiar el orden cambia qué receta cae en cada
 * casilla.
 */
export const recipes: Recipe[] = [
  espressoTonic,
  affogato,
  coldBrewConNaranja,
  tintoDePanela,
  cortado,
  perico,
  mokaConCondensada,
];

/**
 * El banner de arriba del índice: el mosaico de cafeteras moka del diseño de Figma,
 * cada silueta rellena con una foto de café. No es de ninguna receta, así que vive aquí.
 *
 * Son dos archivos porque el diseño dibuja dos mosaicos distintos y no el mismo
 * recortado: diez columnas por tres filas en escritorio y seis por cinco en móvil.
 * Mientras no estén guardados, la página pinta el bloque de color en su proporción.
 */
export const recipesCover: DeclaredImage = {
  file: "/images/recetas/portada-mokas-escritorio.png",
  alt: "Treinta siluetas de cafetera moka en tres filas, cada una rellena con una foto de café: granos verdes y tostados, cerezas, café molido, tazas, vasos y un filtro de goteo.",
  // Composición de Juan: la declara como fotografía propia.
  credit: { source: "Propia" },
};

export const recipesCoverMobile: DeclaredImage = {
  file: "/images/recetas/portada-mokas-movil.png",
  alt: "Treinta siluetas de cafetera moka en cinco filas, cada una rellena con una foto de café: granos verdes y tostados, cerezas, café molido, tazas y vasos.",
  credit: { source: "Propia" },
};

/*
 * Dos comprobaciones al generar el sitio, que rompen la compilación en vez de dejar
 * llegar un fallo a la página: que las fuentes estén completas (la misma que pasan
 * artículos y métodos) y que el método de base de cada receta exista, porque la ficha
 * enlaza a él y un slug mal escrito sería un enlace a un 404.
 */
for (const recipe of recipes) {
  assertSourcesAreUsable(recipe.slug, recipe.sources);

  if (!getBrewMethod(recipe.method)) {
    throw new Error(
      `La receta "${recipe.slug}" parte del método "${recipe.method}", que no existe ` +
        `en src/content/metodos/. Revisa su campo \`method\`.`,
    );
  }
}

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

export type { Ingredient, Recipe, RecipeFamily, RecipeTemperature } from "./types";
