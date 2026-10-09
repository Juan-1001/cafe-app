import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Next reescribe cada foto al formato más ligero que acepte el navegador que la
     * pide, en el tamaño que hace falta. El orden importa: se intenta AVIF primero,
     * que en fotografía pesa bastante menos que WebP; quien no lo entienda recibe
     * WebP, y quien tampoco, el JPEG que está en /public.
     *
     * Por eso los archivos del repositorio siguen siendo JPEG normales: son el
     * original del que salen los demás, no lo que se acaba descargando.
     */
    formats: ["image/avif", "image/webp"],
    /*
     * Las calidades que una imagen puede pedir (Next 16 obliga a enumerarlas). 75 es la
     * de siempre, para las fotos. 90 es para los recortes sin fondo y los mosaicos de
     * /recetas: a 75 el AVIF emborronaba sus bordes, que son lo que se mira en una
     * silueta, y se veían pixelados. A 90 el mosaico de móvil pesa 48 KB en vez de 18 y
     * ya no se distingue del de 100.
     */
    qualities: [75, 90],
  },
};

export default nextConfig;
