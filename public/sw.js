/*
 * El guion que deja el sitio con algo que enseñar cuando no hay señal.
 *
 * Un «service worker» es un archivo que el navegador guarda aparte y deja corriendo
 * por su cuenta, aunque la pestaña esté cerrada. Se pone delante de cada petición que
 * hace el navegador: cuando hay red deja pasar, y cuando no la hay saca de su cajón la
 * copia que guardó. Por eso lo que aquí se decide es qué entra en ese cajón.
 *
 * Y entran DOS COSAS Y NADA MÁS, que es la decisión importante de este archivo:
 *
 *   1. La página /sin-conexion.
 *   2. Los archivos de tipografía de /_next/static/media/.
 *
 * Ninguna ficha, ningún artículo, ninguna portada. El motivo está escrito desde hace
 * tiempo en src/app/manifest.ts: guardar páginas del sitio en el teléfono obliga a
 * decidir qué pasa cuando se corrige un dato y alguien tiene guardada la versión de
 * antes, y esa decisión no está tomada. Guardando solo estas dos cosas, no hace falta
 * tomarla: las tipografías llevan una huella en el nombre del archivo y por tanto no
 * pueden quedarse viejas —si cambian, cambia su nombre—, y la página sin conexión no
 * lleva ningún dato que no venga del contenido, además de refrescarse sola (abajo).
 *
 * Si algún día se quiere guardar de verdad el sitio para leerlo en el bus, ese es un
 * trabajo aparte y empieza por tomar aquella decisión, no por añadir rutas a esta lista.
 *
 * ───────────────────────────────────────────────────────────────────────────────────
 *  CÓMO SE COMPRUEBA ESTO, Y POR QUÉ LA FORMA OBVIA MIENTE
 * ───────────────────────────────────────────────────────────────────────────────────
 *
 * **Apagando el servidor.** Se levanta con `npm run build` y `npm start`, se abre una
 * página para que el guion se instale, se apaga el servidor y se pide cualquier
 * dirección del sitio: tiene que aparecer la página guardada.
 *
 * **Lo que NO vale es cortar la red desde las herramientas del navegador.** Marcar
 * «Offline» en la pestaña Network deja pasar las peticiones que salen de aquí, porque
 * un guion de estos no comparte el contexto de red de la pestaña. El resultado es un
 * falso verde de los peores: la navegación funciona, se ve la página normal del sitio y
 * parece que nada de esto sirve —o, peor, se da por buena una versión rota porque la
 * copia guardada no llegó a usarse nunca—. Pasó ya una vez y costó media hora.
 *
 * DevTools tiene su propio «Offline» para esto, en Application › Service Workers, que
 * es otra casilla distinta de la de Network. Apagar el servidor no se puede confundir.
 *
 * Y hay un segundo aviso, en `src/app/sin-conexion/page.tsx`: esa página se sirve en la
 * dirección que el visitante pidió, así que nada suyo puede depender de su propia URL.
 * Esa es justo la clase de fallo que el falso verde esconde.
 */

const CACHE = "presunto-sin-conexion-v1";
const OFFLINE_URL = "/sin-conexion";

/*
 * Cada cuánto se vuelve a pedir la copia de la página sin conexión, como mucho.
 *
 * Existe porque el navegador solo reinstala este guion cuando el archivo cambia, y
 * este archivo casi nunca cambia: sin esto, la copia guardada en un teléfono podría
 * quedarse ahí meses aunque la página se hubiera reescrito. Con esto, cualquier visita
 * con señal la pone al día si la de encima tiene más de una hora.
 *
 * La hora no es un valor fino: es lo bastante corto para que una corrección llegue el
 * mismo día y lo bastante largo para que navegar por el sitio no se convierta en una
 * petición extra por cada página que se abre.
 */
const MAX_AGE_MS = 60 * 60 * 1000;

/** La marca con la fecha de la última copia. No se sirve nunca; solo se lee aquí. */
const STAMP_URL = "/__sin-conexion-guardada";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await save(cache);
      // Sin esto, un guion nuevo se quedaría esperando a que se cierren todas las
      // pestañas abiertas del sitio para entrar en servicio.
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Los cajones de versiones anteriores de este guion, que ya no sirve nadie.
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => (name === CACHE ? null : caches.delete(name))),
      );
      // Toma el mando de las pestañas que ya estaban abiertas, sin esperar a que se
      // recarguen.
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Solo lecturas. Un envío de formulario no se guarda ni se reintenta desde aquí.
  if (request.method !== "GET") return;

  /*
   * Una navegación es pedir una página entera: escribir la dirección, recargar, pulsar
   * un enlace. Se intenta la red siempre y primero —el sitio se sirve tal cual está,
   * nunca desde el cajón—, y la copia guardada solo aparece si esa petición falla.
   *
   * «Falla» aquí significa que no hubo red. Un 404 o un 500 del servidor no entran por
   * aquí: son respuestas, y el sitio ya tiene su propia página para el 404.
   */
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          // Hay red: se aprovecha para poner al día la copia, si toca. Va en
          // `waitUntil` para que la página no espere por esto.
          event.waitUntil(refreshIfStale());
          return response;
        } catch {
          const cached = await caches.match(OFFLINE_URL, { cacheName: CACHE });
          // Si no hay copia —primera visita sin red—, se devuelve el mismo error de
          // siempre y el navegador enseña lo suyo. Mejor eso que una página en blanco.
          return cached ?? Response.error();
        }
      })(),
    );
    return;
  }

  /*
   * Las tipografías. El nombre de cada archivo lleva una huella de su contenido, así
   * que una copia guardada no puede estar desactualizada: si la tipografía cambiara,
   * el nombre cambiaría con ella y esta no se volvería a pedir nunca.
   *
   * Se guardan porque sin ellas la página sin conexión se vería en la tipografía por
   * defecto del sistema, que es la única cosa del sitio que se lee como un error.
   */
  const url = new URL(request.url);
  const isFont =
    url.origin === self.location.origin &&
    url.pathname.startsWith("/_next/static/media/");

  if (isFont) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;

        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      })(),
    );
  }
});

/** Pide la página sin conexión al servidor y la guarda, junto con la fecha. */
async function save(cache) {
  // `cache: "reload"` salta el almacén normal del navegador: se quiere la de verdad,
  // no la que el navegador tuviera por ahí de antes.
  const response = await fetch(OFFLINE_URL, { cache: "reload" });
  if (!response.ok) return;

  await cache.put(OFFLINE_URL, response);
  await cache.put(STAMP_URL, new Response(String(Date.now())));
}

/** Vuelve a guardar la página si la copia de encima ya tiene sus horas. */
async function refreshIfStale() {
  const cache = await caches.open(CACHE);
  const stamp = await cache.match(STAMP_URL);
  const savedAt = stamp ? Number(await stamp.text()) : 0;

  if (Date.now() - savedAt < MAX_AGE_MS) return;

  try {
    await save(cache);
  } catch {
    // Se intentará en la siguiente navegación. Que falle esto no puede romper nada:
    // la copia que ya había sigue en su sitio.
  }
}
