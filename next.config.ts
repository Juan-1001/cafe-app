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
  },
};

export default nextConfig;
