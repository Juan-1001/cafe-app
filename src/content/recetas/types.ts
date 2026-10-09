import type { DeclaredImage, Source } from "../types";

/** Lo que filtra el primer grupo de botones del índice. */
export type RecipeTemperature = "caliente" | "fria";

/**
 * Lo que filtra el segundo grupo: «A base de espresso» y «A base de filtrados», que
 * son las dos casillas del diseño.
 *
 * «Filtrado» es aquí la casilla del diseño y no una clase de extracción: entran el
 * tinto de panela (colado), el cold brew (se cuela al final) y la moka, que no se filtra
 * pero tampoco es espresso. Lo decidió Juan el 2026-10-09 para que ninguna receta se
 * quede fuera de los dos botones.
 */
export type RecipeFamily = "espresso" | "filtrado";

/**
 * Un ingrediente con su cantidad. La cantidad va aparte porque la página la pinta en
 * mono, como todas las cifras del sitio, y porque así no se pierde dentro de una frase.
 */
export type Ingredient = {
  /** «150 ml», «1 bola», «36 g». */
  amount: string;
  item: string;
};

export type Recipe = {
  /** Sale del nombre del archivo y es el último tramo de la URL: /recetas/<slug>. */
  slug: string;
  name: string;
  /** La línea de la tarjeta y la entradilla de la ficha. Es el texto del diseño de Figma. */
  tagline: string;
  temperature: RecipeTemperature;
  /**
   * El método del que parte la receta, como lo nombra la tarjeta («Espresso»,
   * «Colado», «Cold brew», «Moka»).
   */
  base: string;
  /**
   * La ficha de ese método, para quien todavía no sabe sacar un espresso o colar. Es
   * un slug de /metodos y la ficha enlaza a él.
   */
  method: string;
  family: RecipeFamily;
  /**
   * Cuánto se tarda, como lo escribe la tarjeta. **Ninguno tiene fuente: son elección
   * declarada del sitio**, aprobada así el 2026-10-09. Ninguna de las siete recetas
   * tiene un documento primario con tiempos; el de cold brew y el de la moka cuadran
   * con lo que ya dicen sus fichas de método.
   */
  time: string;
  /**
   * Para una bebida. **Las cantidades son elección declarada del sitio**, aprobadas el
   * 2026-10-09: parten de la ficha del método de base (el espresso de 18 g → 36 g, la
   * proporción 1:11 del cold brew, la 1:15 del colado) y el resto lo fija el sitio con
   * números redondos, porque ninguna receta tiene un documento primario con cantidades.
   */
  ingredients: Ingredient[];
  steps: string[];
  /**
   * Lo que el lector tiene que saber de dónde sale la receta, en la página: que las
   * cantidades son del sitio y, si la receta tiene algo más, lo que dicen las fuentes.
   * Es la misma regla que el colado en tela: si una ficha no se apoya en nadie, lo dice.
   */
  note: string[];
  image: DeclaredImage;
  /** Igual que en los artículos: `[]` significa «aquí no se afirma nada comprobable». */
  sources: Source[];
};
