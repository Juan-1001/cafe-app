/**
 * Los recortes sin fondo y los mosaicos de /recetas se sirven a calidad 90 y no a la 75
 * de las fotos: a 75 la compresión emborrona el borde de la silueta, que es justo lo que
 * se mira, y se veían pixelados. Ver next.config.ts.
 *
 * Vive en su propio archivo porque lo usan a la vez el índice, que es componente de
 * cliente, y las páginas, que son de servidor: un valor exportado desde un archivo de
 * cliente no llega a una página de servidor como número.
 */
export const CUTOUT_QUALITY = 90;
