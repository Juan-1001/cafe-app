/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  ANTES DE TOCAR ESTE ARCHIVO: nada de aquí puede depender de su propia URL.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Esta página casi nunca se lee en `/sin-conexion`. El guion de `public/sw.js` la saca
 * del cajón **en la dirección que el visitante pidió**, así que quien intenta abrir
 * /metodos/prensa-francesa sin señal ve esta página con esa otra URL en la barra.
 *
 * Por tanto: ni `usePathname`, ni `useParams`, ni `useSearchParams`, ni nada que
 * pregunte dónde está. Cualquiera de esas cosas devuelve la ruta que falló, no esta, y
 * el fallo no se ve al abrir /sin-conexion a mano —que es como se mira mientras se
 * trabaja—, sino solo estando de verdad sin red.
 *
 * Ya pasó una vez: la cabecera se ocultaba preguntando por la ruta, y al hidratarse
 * reaparecía con sus dos enlaces muertos justo en la página que existe para decir que no
 * hay red. Se arregló poniendo la condición dentro del HTML (`data-bare-page`, abajo).
 *
 * Y para comprobarlo: **apaga el servidor**. Cortar la red desde las herramientas del
 * navegador da un falso verde, y el porqué está escrito en `public/sw.js`.
 */
import type { Metadata } from "next";
import { amountVariables, computeAmounts } from "@/content/metodos/amounts";
import { getBrewMethod } from "@/content/metodos";
import { parseRatio } from "@/content/metodos/ratio";
import { Eyebrow } from "@/app/eyebrow";

/**
 * El método que el teléfono se queda guardado.
 *
 * Se fija a mano y no se calcula, por la misma razón que el método de entrada de la
 * home: es una decisión editorial. Aquí además tiene un requisito propio que ningún
 * dato del método declara —que se pueda preparar sin comprar nada y sin enchufar
 * nada—, así que no hay forma de deducirlo del contenido aunque se quisiera.
 *
 * Hoy es el colado en tela porque es el único método del sitio que no pide comprar
 * nada: quien se queda sin señal no se queda a la vez con una prensa francesa en la
 * mano. Si algún día entra un método más elemental, se cambia este slug y ya.
 */
const SAVED_METHOD = "colado-en-tela";

/**
 * El título de la pestaña. Casi nadie lo va a ver —esta página aparece cuando no hay
 * red, y entonces el navegador ya está enseñando lo suyo—, pero el mismo archivo se
 * sirve estando en línea mientras el guion lo guarda, y ahí sí se lee.
 *
 * `robots: noindex` porque una página que dice «no hay internet» no tiene ningún
 * sentido como resultado de búsqueda: quien la encontrara ahí la leería con conexión
 * y pensando que el sitio está roto. No enlaza a ella nadie, pero un buscador no
 * necesita enlaces para llegar: le basta con que la dirección exista.
 */
export const metadata: Metadata = {
  title: "Sin conexión",
  robots: { index: false, follow: false },
};

/**
 * La receta, resuelta al compilar y no en la página.
 *
 * Todo lo que enseña la tarjeta sale del archivo del método: el nombre, la molienda,
 * la temperatura y el tiempo tal como están escritos allí, y el café y el agua
 * calculados con `computeAmounts`, que es exactamente la misma función que mueve la
 * calculadora de tazas de la ficha. Así la tarjeta no puede desmentir a la ficha: el
 * día que se corrija un dato del método, este cambia detrás sin que nadie se acuerde
 * de esta página.
 *
 * Es también lo que impide que la tarjeta se quede con cifras huérfanas. Si el método
 * dejara de calcular cantidades —como ya le pasa a la moka, que las fija el aparato—,
 * esto revienta la compilación con el motivo escrito en vez de enseñar una tarjeta a
 * medias o un «0 g».
 */
function readSavedRecipe() {
  const method = getBrewMethod(SAVED_METHOD);

  if (!method) {
    throw new Error(
      `La página sin conexión guarda el método "${SAVED_METHOD}" y ese método no existe en ` +
        `src/content/metodos/. Revisa SAVED_METHOD en src/app/sin-conexion/page.tsx.`,
    );
  }

  const ratioSpec = method.specs.ratio;
  const ratio = ratioSpec ? parseRatio(ratioSpec.value) : null;

  if (!method.recipe || !ratioSpec || !ratio) {
    throw new Error(
      `La página sin conexión enseña las cantidades de "${SAVED_METHOD}", y ese método ha ` +
        `dejado de calcularlas: sin "recipe" y sin un "ratio" legible no hay ni café ni agua ` +
        `que enseñar. Si el método cambió a propósito, la tarjeta tiene que apuntar a otro.`,
    );
  }

  // Una taza: la tarjeta no es una calculadora, es la receta mínima de quien se quedó
  // sin señal. Quien quiera dos ya tendrá la ficha delante cuando vuelva la conexión.
  const amounts = computeAmounts(method.recipe, ratio.water / ratio.coffee, 1);
  const { cafe, agua } = amountVariables(amounts);

  return {
    name: method.name,
    /*
     * El café y la molienda en una sola línea, como en el diseño. La molienda va en
     * minúscula porque aquí es parte de una frase y no un rótulo: el archivo la
     * escribe «Media» porque allí encabeza su propia casilla.
     */
    coffee: `${cafe}, molienda ${method.specs.grind.value.toLowerCase()}`,
    water: agua,
    ratio: ratioSpec.value,
    time: method.specs.totalTime.value,
    temperature: method.specs.waterTemperature.value,
  };
}

const RECIPE = readSavedRecipe();

/** Las cinco casillas de la tarjeta, en el orden del diseño. */
const FIELDS = [
  { label: "Café", value: RECIPE.coffee },
  { label: "Agua", value: RECIPE.water },
  { label: "Ratio", value: RECIPE.ratio },
  { label: "Tiempo", value: RECIPE.time },
  { label: "Temperatura", value: RECIPE.temperature },
] as const;

/**
 * La página que aparece cuando el teléfono se queda sin señal.
 *
 * No se llega a ella navegando: es la única ruta del sitio a la que no enlaza nada, ni
 * la cabecera ni ninguna página. La sirve el guion de `public/sw.js` desde la copia que
 * guardó en el teléfono, en el momento en que una navegación falla por falta de red.
 * Existe como ruta de verdad porque ese guion necesita poder pedirla para guardarla.
 *
 * **Va sobre fondo oscuro, que el resto del sitio tiene prohibido**, y está declarado
 * como excepción en el CLAUDE.md. El fondo aquí no es un estilo: es el mensaje. La
 * pantalla apagada se entiende antes de leer una palabra, y el crema diría «aquí no
 * pasa nada» justo cuando sí pasa.
 *
 * Va sin cabecera y sin pie, y lo pide con el `data-bare-page` de su `<main>`: la regla
 * que los quita está en `globals.css` y allí se explica por qué la marca va dentro del
 * HTML en vez de deducirse de la ruta. El motivo de quitarlos es la honestidad: los
 * enlaces de la cabecera llevan a /granos y a /metodos, y sin señal no llevan a ninguna
 * parte. Una página que viene a decir «no hay red» no puede ofrecer dos puertas que no
 * se abren.
 *
 * Y lo que está escrito arriba del todo, que es lo que más fácil se rompe: **nada de
 * esta página puede depender de su propia dirección**.
 */
export default function SinConexion() {
  return (
    /*
      `flex-1` con el body en columna hace que el negro llegue al borde de abajo de la
      pantalla aunque el contenido no dé para tanto; sin él quedaría asomando una franja
      crema del body por debajo. Y con `justify-center` el bloque se queda a media
      altura, que es donde cae en el diseño.
    */
    <main
      data-bare-page
      className="flex flex-1 flex-col justify-center bg-ink px-6 py-16 md:px-20 md:py-24"
    >
      {/*
        Una sola columna hasta 1280 px, y las dos del diseño a partir de ahí. El diseño
        viene dibujado solo a 1440 y sus dos piezas miden 507 y 520 px: juntas son 1027,
        que con los márgenes laterales no caben por debajo de 1280. Forzarlas antes
        estrecharía la tarjeta por debajo de su ancho dibujado o partiría el titular.
      */}
      <div className="xl:flex xl:items-center xl:justify-between xl:gap-16">
        <div className="xl:w-[507px] xl:shrink-0">
          {/*
            El rótulo va en `lavender` y no en el `lavender-deep` del resto del sitio
            porque aquí el fondo es negro: sobre `ink` el lavanda claro da 4,9:1 y el
            profundo se queda muy por debajo, que es justo al revés de lo que pasa
            sobre crema.
          */}
          <Eyebrow tone="lavenderOnInk">Ey, se nos fue el internet.</Eyebrow>

          {/*
            El salto de línea está escrito porque las dos mitades no son
            intercambiables: «Pero el café» arriba y «sigue en pie.» abajo es el remate.

            El tamaño sube por tramos para que «sigue en pie.» quepa siempre en una
            línea, que es lo que sostiene el remate. Arriba se queda en **88 px y no en
            los 92 del diseño**, y es la discrepancia de la Fraunces contada en el
            CLAUDE.md: medido en el navegador, esa frase pide 518 px a 96 y 496 a 92,
            contra los 507 que mide la columna dibujada. A 92 cabría por once píxeles,
            que es una casualidad y no una medida. A 88 pide 475 y **la holgura son 32
            px elegidos**: aguantan que la tipografía tarde en cargar o que el
            interletrado se toque, sin que la frase se parta en tres líneas.
          */}
          <h1 className="mt-6 font-display text-5xl leading-none tracking-tight text-paper sm:text-6xl md:mt-8 lg:text-7xl xl:text-[88px]">
            Pero el <em>café</em>
            <br />
            sigue en pie.
          </h1>

          {/*
            El párrafo va en `dust`, que el CLAUDE.md prohíbe para texto. Es la segunda
            excepción declarada de esta página y está escrita allí con su medida: la
            regla se escribió contra `dust` sobre crema, que da 1,5:1 y es ilegible;
            sobre negro da 9,97:1, muy por encima del 4,5 que pide AA.
          */}
          <p className="mt-10 max-w-prose text-lg leading-relaxed text-dust md:mt-12">
            Mientras vuelve la conexión, haga lo que toca:{" "}
            <strong className="font-semibold">un café.</strong>
            <br />
            Le dejamos una receta que no necesita señal, solo tiempo y un poquito de
            maña.
          </p>
        </div>

        {/*
          La tarjeta. Es el único trozo de crema de la página, y esa inversión es lo que
          la separa de todo lo demás: lo que se apagó es el sitio, no la receta.

          Los 520 px del diseño son su ancho máximo en todos los anchos de pantalla y no
          solo en la columna doble. Sin ese tope, en la pantalla de un portátil la
          tarjeta se estiraba a los 864 px de la página y dejaba cada dato con medio
          palmo de crema vacía a la derecha: dejaba de leerse como una tarjeta y pasaba a
          ser una franja. Por debajo de eso sí ocupa lo que haya.

          El alto, en cambio, no se fija nunca: los 650 px dibujados son la consecuencia
          de lo que hay dentro, y clavarlos dejaría la tarjeta corta o con un hueco en
          cuanto un dato crezca una línea.
        */}
        <aside className="mt-16 max-w-[520px] rounded-xs bg-paper p-8 md:p-12 xl:mt-0 xl:w-[520px] xl:shrink-0">
          <Eyebrow tone="lavender">Guardado en tu teléfono</Eyebrow>

          {/*
            El nombre del método a 52 px y no a los 58 del diseño: con «Tinto de olla»
            dibujado y «Colado en tela» escrito, la frase pasó de trece caracteres a
            catorce y la palabra más larga de cinco letras a seis. A 58 px ya no cabe en
            la línea de 424 px que deja la tarjeta.
          */}
          <p className="mt-4 font-display text-4xl tracking-tight text-ink md:mt-6 md:text-5xl xl:text-[52px]">
            {RECIPE.name}
          </p>

          {/*
            Las cinco casillas. Los rótulos son los mismos que los del 404 —mono, 12 px,
            mayúsculas, `coffee`—, que es la forma que el sitio ya tiene para decir
            «esto es el rótulo de un dato»; el diseño los dibuja a 11 px y esa
            diferencia no se ve.
          */}
          <dl className="mt-8 space-y-6 border-t border-dust pt-8 md:mt-10 md:pt-10">
            {FIELDS.map(({ label, value }) => (
              <div key={label}>
                <dt className="font-mono text-xs uppercase tracking-widest text-coffee">
                  {label}
                </dt>
                <dd className="mt-2 text-xl text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          {/*
            El remate. Va en `lavender-deep` y no en `lavender` porque aquí el fondo
            vuelve a ser crema y el texto mide 22 px, por debajo de los 24 a partir de
            los cuales el lavanda claro vale sobre crema.
          */}
          <p className="mt-10 font-display text-[22px] leading-snug text-lavender-deep italic md:mt-12">
            Olla, como manda la vieja escuela.
          </p>
        </aside>
      </div>
    </main>
  );
}
