/**
 * Comprueba que los enlaces de las fuentes del sitio sigan llevando a alguna parte.
 *
 * Es la mitad del procedimiento de datos que no cabe en la compilación. `src/content/
 * sources.ts` comprueba al compilar lo que se puede mirar sin salir del repositorio
 * —que haya editor, título, enlace https y fecha de consulta válida—, y eso basta para
 * que un descuido no llegue a la página. Pero la parte que de verdad se pudre es otra:
 * los enlaces se mueren, los estudios cambian de dirección y las páginas de fabricante
 * se reorganizan. Eso solo se sabe preguntando, y preguntar necesita red.
 *
 * Por eso esto no corre en `npm run build`: una compilación no puede depender de que
 * haya internet ni de que el servidor de una revista esté de buen humor. Se lanza a
 * mano, con `npm run verificar-fuentes`, y lo suyo es hacerlo al tocar una ficha que
 * cite documentos.
 *
 * Lee los archivos de contenido como texto y saca los pares `url` / `retrieved` con
 * una expresión regular, en vez de importar los módulos. Es a propósito: así no hay que
 * compilar TypeScript ni resolver los alias de rutas para lanzar una comprobación de
 * red, y el script sigue funcionando aunque el contenido cambie de forma.
 *
 * Qué significa cada resultado:
 *
 * Qué significa cada resultado:
 *
 * - **OK** — el servidor contesta. No dice que el documento siga diciendo lo mismo:
 *   eso hay que ir a leerlo, y para eso está la fecha de consulta.
 * - **AVISA** — no se pudo comprobar desde aquí. Puede ser una editorial bloqueando
 *   robots (403, 429), un servidor lento, o un certificado que este script no sabe
 *   validar. Hay que abrirlo a mano, y casi siempre está vivo.
 * - **ROTO** — el servidor dice explícitamente que el documento ya no está (404, 410).
 *   Ahí sí hay trabajo: buscar dónde se mudó y actualizar la referencia y su fecha.
 *
 * La primera versión de este script marcaba como ROTO todo lo que no contestara, y su
 * primera ejecución acusó de muerto a un artículo de Coffee Science que estaba
 * perfectamente vivo: el fallo era de conexión, no del documento. Un validador que
 * miente se deja de mirar a la tercera vez, así que ahora solo llama muerto a lo que
 * el propio servidor declara muerto, y todo lo demás pide una mirada humana.
 *
 * Sale con código 1 si hay algún ROTO, para que sirva en un gancho o en CI el día que
 * los haya.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const TIMEOUT_MS = 15000;

/** Saca los `url: "..."` del contenido, con la fecha de consulta que los acompaña. */
const SOURCE_ENTRY =
  /url:\s*"(https:\/\/[^"]+)"\s*,\s*retrieved:\s*"(\d{4}-\d{2}-\d{2})"/g;

async function contentFiles(dir) {
  const found = [];

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await contentFiles(full)));
    else if (entry.name.endsWith(".ts")) found.push(full);
  }

  return found;
}

async function collectSources() {
  const sources = [];

  for (const file of await contentFiles(CONTENT_DIR)) {
    const text = await readFile(file, "utf8");
    for (const [, url, retrieved] of text.matchAll(SOURCE_ENTRY)) {
      sources.push({ url, retrieved, file: path.relative(process.cwd(), file) });
    }
  }

  return sources;
}

/**
 * Pregunta por el documento. Se intenta HEAD primero porque no descarga el cuerpo, y
 * se reintenta con GET porque hay servidores que no admiten HEAD y contestan 405.
 */
async function check(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (response.ok) return { state: "OK", detail: String(response.status) };
      if (method === "GET" || response.status !== 405) {
        /*
         * Solo el servidor puede declarar muerto un documento, y lo hace con 404 o
         * 410. Un 403 o un 429 es una editorial cerrando la puerta a los robots, y el
         * documento sigue ahí para quien lo abra con un navegador.
         */
        const gone = response.status === 404 || response.status === 410;
        return { state: gone ? "ROTO" : "AVISA", detail: String(response.status) };
      }
    } catch {
      // Ni DNS, ni certificado, ni tiempo de espera prueban que el documento no esté.
      if (method === "GET") return { state: "AVISA", detail: "sin conexión" };
    }
  }

  return { state: "AVISA", detail: "sin respuesta" };
}

const sources = await collectSources();
console.log(`Comprobando ${sources.length} fuentes del contenido...\n`);

const results = await Promise.all(
  sources.map(async (source) => ({ ...source, ...(await check(source.url)) })),
);

for (const result of results.sort((a, b) => a.state.localeCompare(b.state))) {
  console.log(
    `${result.state.padEnd(6)} ${result.detail.padEnd(4)} ${result.retrieved}  ${result.url}`,
  );
  if (result.state !== "OK") console.log(`${" ".repeat(13)}↳ ${result.file}`);
}

const broken = results.filter((result) => result.state === "ROTO");
const warned = results.filter((result) => result.state === "AVISA");

console.log(
  `\n${results.length - broken.length - warned.length} bien · ${warned.length} para mirar a mano · ${broken.length} rotas`,
);

if (broken.length > 0) process.exit(1);
