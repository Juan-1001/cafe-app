"use client";

import { useEffect } from "react";

/**
 * Lo único que hace falta escribir en la página para que exista la copia sin conexión:
 * decirle al navegador que instale `public/sw.js`.
 *
 * No pinta nada. Va montado una sola vez en el layout raíz, así que el guion se
 * instala en la primera página que alguien abra del sitio, sea cual sea, y a partir de
 * ahí trabaja solo aunque la pestaña se cierre.
 *
 * **Solo en producción, y eso es a propósito.** Un guion de estos se queda instalado en
 * el navegador hasta que otro lo reemplaza, así que uno instalado en `localhost`
 * seguiría ahí después, poniéndose delante de las peticiones del servidor de
 * desarrollo y sirviendo páginas de antes. La propia documentación de Next dice que el
 * modo de desarrollo no vale como referencia para esto: se comprueba con
 * `npm run build` y `npm start`.
 *
 * `updateViaCache: "none"` obliga al navegador a preguntar por `sw.js` al servidor en
 * vez de confiar en la copia que tenga guardada. Sin eso, una corrección del guion
 * podría tardar en llegar tanto como el almacén del navegador quisiera, y el guion es
 * justo la pieza que no se puede arreglar con solo desplegar.
 */
export function OfflineCache() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    /*
     * Si el registro falla se traga el error, y no es un descuido: esto es una mejora
     * sobre lo que el sitio ya hace. Un navegador que no lo admita, o una configuración
     * que lo bloquee, se queda sin la página guardada y con el sitio entero funcionando
     * igual que antes. No hay nada que contarle a nadie, y sin el `catch` lo que se
     * vería es un error suelto en la consola que parecería que algo se rompió.
     */
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch(() => {});
  }, []);

  return null;
}
