import type { MetadataRoute } from "next";

/**
 * La ficha que lee el móvil cuando alguien guarda el sitio en su pantalla de inicio.
 *
 * Next convierte este archivo en `/manifest.webmanifest` al compilar y lo enlaza solo
 * desde el `<head>`; no hay que escribir la etiqueta en ninguna parte.
 *
 * Existe porque una receta o un método se consultan con el teléfono en la mano
 * mientras se hace el café, y ese es justo el gesto de quien guarda un sitio en la
 * pantalla de inicio. Sin este archivo, el icono y el nombre del acceso directo los
 * inventa el navegador.
 *
 * Lo que NO hay aquí es nada para leer sin conexión. Eso pide un guion que guarde las
 * páginas en el teléfono y que decida cuándo se consideran viejas, y esa decisión —qué
 * pasa cuando corrijo un dato y alguien tiene la versión de antes guardada— no está
 * tomada. Mientras no lo esté, el sitio se comporta como lo que es: páginas normales.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Presunto Café",

    /*
     * El nombre corto es el que cabe debajo del icono en la pantalla de inicio, donde
     * hay sitio para unos doce caracteres. «Presunto Café» son trece y el teléfono lo
     * cortaría por donde le parezca, así que se corta aquí a propósito y por la mitad
     * que identifica: «Presunto» es la palabra rara del nombre, la que no se confunde
     * con ningún otro icono; «Café» sola valdría para cualquier cosa.
     */
    short_name: "Presunto",

    description:
      "Café de especialidad explicado desde cero: de dónde viene el grano y cómo prepararlo en casa.",

    start_url: "/",

    /*
     * `standalone` significa que al abrirlo desde la pantalla de inicio no se ve la
     * barra de direcciones. Es lo que hace que parezca una aplicación, y aquí viene
     * bien por la razón de siempre: una pantalla de móvil sobre la encimera tiene poco
     * alto, y esa barra son cincuenta y tantos píxeles de paso a paso que no se leen.
     */
    display: "standalone",

    /*
     * Los únicos dos colores del proyecto escritos a mano en hexadecimal, y no se puede
     * evitar: este archivo lo lee el sistema operativo, no el navegador, así que no
     * entiende las variables de la paleta. Son `paper` y `ink`, copiados de
     * src/app/globals.css; si allí cambian, aquí hay que cambiarlos también.
     *
     * `background_color` es el color de la pantalla mientras la aplicación arranca,
     * antes de que haya nada pintado: va en crema para que ese instante se vea como el
     * sitio y no como un destello blanco. `theme_color` tiñe la barra del sistema, y va
     * en `ink` porque ahí encima se pintan iconos claros.
     */
    background_color: "#f1ede5",
    theme_color: "#171719",

    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
