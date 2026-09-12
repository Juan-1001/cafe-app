/** Las dos partes de un ratio escrito como "1:16" en la ficha técnica. */
export type Ratio = {
  coffee: number;
  water: number;
};

/**
 * Lee el ratio tal como está escrito en el contenido ("1:16", "1:16,7").
 * Devuelve null si el texto no tiene esa forma, para que la página pueda
 * mostrar el dato sin gráfico en vez de inventarse una proporción.
 */
export function parseRatio(value: string): Ratio | null {
  const match = value.match(/^\s*(\d+(?:[.,]\d+)?)\s*:\s*(\d+(?:[.,]\d+)?)\s*$/);
  if (!match) return null;

  const coffee = Number(match[1].replace(",", "."));
  const water = Number(match[2].replace(",", "."));
  if (!coffee || !water) return null;

  return { coffee, water };
}
