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
 * Las dos fotos del banner de arriba del índice, que no son de ninguna receta y por eso
 * viven aquí. Son la misma foto de granos tostados dos veces, como en el diseño de
 * Figma: nítida en el recuadro del centro y estirada a lo ancho, como fondo, detrás del
 * velo. El fondo es adorno y no lleva texto alternativo propio (ver la página).
 */
export const recipesCover: DeclaredImage = {
  file: "/images/recetas/portada-granos.jpg",
  alt: "Granos de café tostado, de color marrón oscuro y brillantes, amontonados y llenando todo el encuadre.",
  // PENDIENTE: foto de Magnific o Pexels del diseño de Figma; falta el enlace para el
  // crédito.
  credit: null,
};

export const recipesCoverBackground: DeclaredImage = {
  file: "/images/recetas/portada-granos-fondo.jpg",
  alt: "",
  // PENDIENTE: es la misma foto que la portada, estirada; lleva su mismo crédito.
  credit: null,
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
