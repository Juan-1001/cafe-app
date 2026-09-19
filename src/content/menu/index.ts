import { getBrewMethod } from "../metodos";

/**
 * Las decisiones editoriales del menú de la cabecera.
 *
 * Vive en su propia carpeta y no suelto como `home.ts` porque necesita dos archivos: en
 * este solo hay datos, y por eso lo puede importar la cabecera, que es componente de
 * cliente. El que arma el menú de verdad —y resuelve las fotos mirando el disco— es
 * `model.ts`, que solo corre en el servidor.
 *
 * Lo único que se decide a mano aquí son los cuatro métodos que el menú enseña. Todo lo
 * demás sale solo: las secciones vienen del registro, los artículos de /granos son todos
 * los que hay y las cantidades se cuentan del contenido.
 */

/**
 * Los cuatro métodos que aparecen en el menú, en este orden.
 *
 * ## Por qué se eligen a mano
 *
 * Por lo mismo que el método de entrada de la portada: **es una decisión editorial y no
 * un dato del método**. El sitio sabe calcular cuánto castiga el error cada uno y de ahí
 * saca el nivel y el orden del índice; lo que no puede saber es cuáles cuatro cuentan
 * mejor de qué va la sección. Si esto se calculara del score, el menú enseñaría los
 * cuatro más fáciles, que son tres inmersiones y un filtrado: cuatro variaciones de dos
 * cosas.
 *
 * ## El criterio: cuatro puertas distintas, ninguna repetida
 *
 * Se eligió **cobertura** y un solo eje. La primera idea fue mezclar dos —«uno de cada
 * nivel más los que abren cada tipo de extracción»—, y se descartó porque una lista
 * hecha con dos criterios a la vez no se puede leer: nadie sabría decir por qué está el
 * V60 y no la Chemex, porque la respuesta cambia según cuál de los dos ejes mires. Es el
 * mismo defecto que ya se corrigió en `difficulty.ts` cuando cuatro ejes medían lo mismo.
 *
 * Cada uno abre una forma distinta de sacarle el café al grano:
 *
 * - **Prensa francesa** — inmersión. Es el aparato más común en una casa, y además es el
 *   método de entrada de la portada: que el menú y la home coincidan evita que el sitio
 *   señale dos puertas distintas.
 * - **V60** — goteo con vertido, y el método con más control de todo el sitio.
 * - **Moka** — vapor a presión. La olla de toda la vida, y la única cuyas cantidades las
 *   fija el propio aparato.
 * - **Cold brew** — infusión en frío. **Es el único método frío de los diez**, así que si
 *   sale de esta lista el menú entero afirma sin querer que el café es algo caliente.
 *
 * El nivel no se usó para elegir y aun así salen los tres: la prensa y el cold brew son
 * «Para empezar», el V60 «Con práctica» y la moka «Técnica».
 *
 * ## Qué queda fuera, y por qué no es un olvido
 *
 * La Chemex y el colado en tela repiten la puerta del V60, que los tres son goteo por
 * gravedad; el AeroPress repite la de la moka. El Tótem y el sifón abren puertas propias,
 * pero son los dos aparatos que menos gente tiene en casa. Y el **espresso** se queda
 * fuera siendo la palabra de café más conocida del mundo, porque necesita una máquina que
 * casi nadie tiene: se valoró meterlo, y habría sido a costa del cold brew, o sea a costa
 * de que el menú se quedara sin ningún método frío.
 *
 * ## Por qué cuatro y no hacen falta un «ver todos»
 *
 * El destacado de Métodos que va al lado ya dice cuántos hay en total y ya enlaza al
 * índice. Eso hace que la columna se lea sola como lo que es, una selección. Compárese
 * con la de Granos, donde la columna lista los cuatro artículos y el destacado dice «4
 * artículos»: ahí los números coinciden y se lee como la lista completa. Los dos casos se
 * explican con sus propias cifras, sin un rótulo que lo aclare.
 */
export const MENU_METHODS = [
  "prensa-francesa",
  "v60",
  "moka",
  "cold-brew",
] as const;

/**
 * Revienta la compilación si el menú nombra un método que no existe.
 *
 * Es la misma comprobación que protege al método de entrada de la portada, y por la
 * misma razón: renombrar un archivo de `src/content/metodos/` dejaría aquí un slug
 * huérfano, y sin esto el menú se quedaría con un hueco silencioso en vez de avisar.
 */
for (const slug of MENU_METHODS) {
  if (!getBrewMethod(slug)) {
    throw new Error(
      `El menú nombra el método "${slug}", que no existe en src/content/metodos/. ` +
        `Revisa MENU_METHODS en src/content/menu/index.ts.`,
    );
  }
}
