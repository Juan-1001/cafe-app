"use client";

import { useId, useState } from "react";
import {
  ROAST_WEIGHT_MAX,
  type ArticleBlock,
  type Lane,
  type ProcessStep,
  type RoastBean,
  type ScaleStep,
} from "@/content/granos/types";

type ScaleBlock = Extract<ArticleBlock, { kind: "scale" }>;
type RoastBlock = Extract<ScaleBlock, { variant: "roast" }>;
type ProcessBlock = Extract<ScaleBlock, { variant: "process" }>;

/* ------------------------------------------------------------------ granos */

/**
 * El color de cada barra del intercambio, en el orden de `axes`. El lado del grano va en
 * el lavanda protagonista y el del tueste en el marrón del café: son elementos gráficos
 * y no texto, así que los dos tonos valen aquí aunque el lavanda no valdría para una
 * letra pequeña.
 */
const BAR_COLORS = ["bg-lavender", "bg-coffee"] as const;

/**
 * Dónde se coloca cada uno de los tres granos dentro del dibujo, y cuánto se gira.
 *
 * Los giros y los desniveles están puestos a mano y son distintos entre sí a propósito:
 * tres granos idénticos alineados a la misma altura se leen como un icono generado, y el
 * sitio evita precisamente eso. Así parecen tres granos caídos sobre la mesa.
 */
const BEAN_POSITIONS = [
  { x: 30, y: 41, rotate: -9 },
  { x: 84, y: 36, rotate: 6 },
  { x: 138, y: 42, rotate: -3 },
] as const;

/**
 * La opacidad de los dos brillos de aceite según el nivel de `sheen`.
 *
 * Los dos brillos están siempre dibujados y lo que cambia es su opacidad. Es lo que
 * permite que aparezcan y desaparezcan con una transición en vez de saltar de golpe, y
 * que la transición se pueda apagar para quien pide menos movimiento.
 *
 * El segundo brillo solo entra en el nivel más oscuro: el aceite no aparece de golpe en
 * un punto del tueste, va asomando, y el italiano es más graso que el francés.
 *
 * Las opacidades no están puestas a ojo, están calculadas. Un brillo tiene que
 * distinguirse del grano sobre el que está, y el mínimo para un elemento gráfico son
 * 3:1: por debajo del 36 % de blanco no se llega en ninguno de los dos cuerpos oscuros
 * —al 24 % se quedaba en 2,14:1—, así que el suelo es ese. Al 38 % y al 50 % quedan en
 * 3,28:1 y 5,17:1 contra su propio grano.
 */
const SHEEN_OPACITY: Record<RoastBean["sheen"], [number, number]> = {
  0: [0, 0],
  1: [0.38, 0],
  2: [0.5, 0.38],
};

const TINT =
  "transition-colors duration-500 ease-out motion-reduce:transition-none";
const FADE =
  "transition-opacity duration-500 ease-out motion-reduce:transition-none";

/**
 * Un grano de café visto desde arriba: el cuerpo, el surco del centro y, si el tueste ha
 * llegado lejos, el brillo del aceite en la superficie.
 *
 * El contorno va con `currentColor`, que aquí es el token `ink` heredado del svg. Esa es
 * la parte del dibujo que pertenece al sitio; el relleno y el surco son los colores
 * reales del café y vienen del contenido, porque en este dibujo el color es el dato.
 *
 * Los colores se ponen con `style` y no con atributos `fill` porque un atributo no
 * transiciona: solo una propiedad de CSS se puede animar. De ahí `transition-colors`,
 * que en Tailwind v4 incluye `fill` y `stroke`.
 *
 * El brillo va en blanco, que tampoco es de la paleta y tampoco debería serlo: un reflejo
 * es blanco por lo que es, independientemente de lo tostado que esté el grano.
 */
function Bean({
  bean,
  position,
}: {
  bean: RoastBean;
  position: (typeof BEAN_POSITIONS)[number];
}) {
  const [sheenA, sheenB] = SHEEN_OPACITY[bean.sheen];

  return (
    <g
      transform={`translate(${position.x} ${position.y}) rotate(${position.rotate})`}
    >
      <ellipse
        rx="22"
        ry="29"
        stroke="currentColor"
        strokeWidth="1.5"
        className={TINT}
        style={{ fill: bean.body }}
      />

      {/* El surco no es simétrico: baja haciendo una ese, que es como cae de verdad. */}
      <path
        d="M 0 -25 C -5 -15, 5 -7, 0 1 C -5 9, 4 17, 0 25"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={TINT}
        style={{ stroke: bean.crease }}
      />

      <ellipse
        cx="-8"
        cy="-13"
        rx="5.5"
        ry="8"
        fill="#FFFFFF"
        className={FADE}
        style={{ opacity: sheenA }}
      />
      <ellipse
        cx="7"
        cy="10"
        rx="3.5"
        ry="5"
        fill="#FFFFFF"
        className={FADE}
        style={{ opacity: sheenB }}
      />
    </g>
  );
}

/**
 * Los tres granos del nivel elegido.
 *
 * Se esconde de los lectores de pantalla porque no cuenta nada que no esté ya escrito: el
 * nombre del nivel está justo encima, y el brillo del aceite lo explica el pie del dibujo
 * y lo repite la nota del propio nivel en la columna de al lado.
 */
function Beans({ bean }: { bean: RoastBean }) {
  return (
    <svg
      viewBox="0 0 168 80"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-32 shrink-0 text-ink lg:mt-8 lg:w-full lg:max-w-[264px]"
    >
      {BEAN_POSITIONS.map((position) => (
        <Bean key={position.x} bean={bean} position={position} />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------- carriles */

/**
 * El sistema de coordenadas de un carril. El ancho es el del viewBox, así que el día 0
 * cae en el borde izquierdo y el proceso más largo llega justo al derecho: los rótulos
 * del eje son HTML y se colocan en porcentajes que salen de estos mismos números.
 */
const LANE_W = 350;
const LANE_H = 30;
/**
 * La línea de duración del proceso, abajo del carril.
 *
 * Va en `ink` y no en `dust`, y es un arreglo y no una preferencia: en `dust` se queda en
 * 1,54:1 y no se veía, así que el lavado parecía un proceso corto cuando dura casi lo
 * mismo que el honey. Es información —cuántos días dura esto— y por tanto le toca el
 * mínimo de 3:1 de un elemento gráfico; `ink` da 15,33:1.
 *
 * Va por debajo de la base de las barras, en su propio carril, para que no la tape el
 * relleno de la fruta: así los dos canales del dibujo —cuánto dura y hasta cuándo hay
 * fruta— se ven siempre los dos.
 */
const DURATION_Y = 27;
const DURATION_H = 3;
/** La base sobre la que se apoyan las barras de fruta. */
const BASE_Y = 26;
/** Alto de la barra según lo que siga encima. La cereza entera casi llena el carril. */
const MATERIAL_H: Record<Lane["material"], number> = {
  cherry: 24,
  mucilage: 12,
};
/** El color de cada material. Los dos son gráficos, así que el lavanda vale. */
const MATERIAL_FILL: Record<Lane["material"], string> = {
  cherry: "#4A3028",
  mucilage: "#807EC5",
};
/** Dónde empieza y acaba la franja del rango, por encima de la barra de mucílago. */
const RANGE_TOP = 4;

/**
 * Un carril de la línea del beneficio.
 *
 * Se lee de una vez: el hilo fino de abajo es lo que dura el proceso entero, y el bloque
 * de color es el tramo en el que la fruta sigue puesta sobre el grano. En el lavado ese
 * bloque es una astilla de 9 px al lado de un hilo largo; en el natural ocupa el carril
 * completo. Eso es todo lo que el dibujo tiene que decir.
 *
 * El alto viene del material y no del carril, y los dos carriles de mucílago miden lo
 * mismo a propósito: entre el lavado y el honey lo que cambia es **cuánto tiempo**, que
 * es el eje horizontal, no cuánto mucílago. Hacer el del lavado más bajo insinuaría una
 * diferencia de cantidad que nadie ha medido.
 *
 * El techo de trazos del honey es su rango: sube casi hasta el alto de la cereza entera
 * para decir que se puede dejar desde muy poco mucílago hasta casi todo. Es la forma de
 * contar los honey de distinto color sin escribir porcentajes que no se sostienen.
 */
function LaneBar({
  lane,
  maxDays,
  active,
  hatchId,
}: {
  lane: Lane;
  maxDays: number;
  active: boolean;
  hatchId: string;
}) {
  const x = (days: number) => (days / maxDays) * LANE_W;
  const height = MATERIAL_H[lane.material];
  const fill = MATERIAL_FILL[lane.material];
  const contact = x(lane.contactDays);

  return (
    <svg
      viewBox={`0 0 ${LANE_W} ${LANE_H}`}
      aria-hidden="true"
      focusable="false"
      className="block h-auto w-full"
    >
      {/* Cuánto dura el proceso entero, de la recogida al grano seco. La misma línea y
          el mismo peso en los tres carriles, elegido o no: que los tres duren días es
          precisamente lo que hay que poder comparar. */}
      <rect
        x="0"
        y={DURATION_Y}
        width={x(lane.totalDays)}
        height={DURATION_H}
        fill="#171719"
      />

      {/*
        El rango: cuánto mucílago se deja es una decisión y no un valor, así que por
        encima de la barra hay una franja rayada que llega casi al alto de la cereza
        entera. El rayado en diagonal es la convención del dibujo técnico para una zona
        indeterminada, y es deliberado que no sea un contorno de trazos: un rectángulo
        punteado se lee como «seleccionado» o «editable», que es lenguaje de interfaz y
        aquí no hay nada que seleccionar.

        No cambia entre elegido y no elegido, porque el rango es una propiedad del
        proceso y no un estado de la pantalla.
      */}
      {lane.range ? (
        <rect
          x="0"
          y={RANGE_TOP}
          width={contact}
          height={BASE_Y - height - RANGE_TOP}
          fill={`url(#${hatchId})`}
        />
      ) : null}

      {/*
        El tramo con la fruta encima se dibuja en dos piezas, y no es un capricho: es lo
        que permite que el cambio de estado se pueda animar.

        La primera es el contorno, que está SIEMPRE y en los tres carriles. Es lo que
        mantiene visible la extensión de cada barra cuando no está elegida, así que
        ninguno pierde su forma ni su tamaño y la comparación sigue viva.

        La segunda es el relleno, que aparece y desaparece con la **opacidad**. Antes esto
        era un solo rectángulo que cambiaba `fill` de un color a `none` y `stroke` al
        revés, y la transición no hacía nada: `none` no es un color, así que el navegador
        no puede interpolar hasta él y el cambio salía de golpe. Además el contorno se
        metía media unidad para dentro, así que la barra daba un salto de 1,5 unidades al
        elegirla.

        Se anima la opacidad y no el ancho a propósito: si la barra creciera desde cero
        cada vez, se leería como que el proceso está transcurriendo, y lo que el diagrama
        compara son tres duraciones fijas.

        Atenuar los otros dos bajándoles la opacidad se descartó: el lavanda sobre crema
        ya está en 3,15:1, justo en el mínimo de un elemento gráfico, y cualquier
        transparencia lo habría dejado por debajo. El contorno conserva el color entero.
      */}
      <rect
        x="0.75"
        y={BASE_Y - height}
        width={Math.max(contact - 1.5, 0)}
        height={height}
        fill="none"
        stroke={fill}
        strokeWidth="1.5"
      />
      <rect
        x="0"
        y={BASE_Y - height}
        width={contact}
        height={height}
        fill={fill}
        className="transition-opacity duration-300 ease-out motion-reduce:transition-none"
        style={{ opacity: active ? 1 : 0 }}
      />
    </svg>
  );
}

/**
 * El eje de días, compartido por los tres carriles.
 *
 * Las marcas son los finales de cada proceso y no intervalos redondos de cinco en cinco:
 * así cada número del eje nombra un día que el dibujo alcanza de verdad, en vez de
 * decorar con una regla. Salen ordenadas y sin repetir de los propios carriles, que es
 * lo que evita que haya que mantener una lista aparte.
 *
 * La posición va en porcentaje sobre el mismo máximo que usa el SVG, así que las marcas
 * caen exactamente donde acaban las barras. El primero se ancla a la izquierda y el
 * último a la derecha; si se centraran, se saldrían del dibujo por los extremos.
 */
function LaneAxis({ days, maxDays }: { days: number[]; maxDays: number }) {
  return (
    /*
      El `pb-6` reserva el sitio de los rótulos. Van en posición absoluta, así que están
      fuera del flujo y no cuentan para el alto de nada: sin esta reserva la regla mide un
      píxel y los números se salen por abajo, encima de lo que venga después.
    */
    <div className="relative mt-3 h-px bg-dust pb-6" role="presentation">
      {days.map((day, index) => {
        // La marca se coloca con el día exacto y solo se redondea el rótulo. Al revés
        // —colocar por el número redondeado— la marca del lavado caía unos 5 px a la
        // derecha del final de su barra, porque sus 10,625 días se redondean a 11.
        const left = (day / maxDays) * 100;
        const isLast = index === days.length - 1;

        return (
          <span key={day}>
            <span
              aria-hidden="true"
              className="absolute top-0 h-[5px] w-px bg-dust"
              style={isLast ? { right: 0 } : { left: `${left}%` }}
            />
            <span
              className="absolute top-[7px] font-mono text-[11px] tracking-wide text-sage-deep tabular-nums"
              style={
                isLast
                  ? { right: 0 }
                  : index === 0
                    ? { left: 0 }
                    : { left: `${left}%`, transform: "translateX(-50%)" }
              }
            >
              {isLast ? `${Math.round(day)} días` : Math.round(day)}
            </span>
          </span>
        );
      })}
    </div>
  );
}

/** Una pieza de la leyenda: la muestra de color y qué significa. */
function LegendItem({
  swatch,
  children,
}: {
  swatch: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-coffee">
      {swatch}
      {children}
    </li>
  );
}

/**
 * La leyenda del dibujo: qué significa cada relleno.
 *
 * A diferencia de los granos del tueste, este dibujo enseña **los tres peldaños a la
 * vez** y no solo el elegido, y eso no es un descuido del paralelismo: aquí la
 * comparación *es* el contenido. Que el natural recorra veintitrés días con la fruta
 * encima donde el lavado recorre quince horas solo se entiende viendo los dos juntos.
 * Elegir un proceso destaca su carril; no lo hace aparecer.
 */
function LaneLegend({ hatchId }: { hatchId: string }) {
  return (
    <>
      {/*
        La leyenda va ANTES del gráfico y no después. Estaba al final y para entenderla
        había que haberse leído ya las tres barras, o sea que llegaba tarde.

        Se descartó etiquetar los tramos sobre la primera barra, que sería lo ideal: la
        primera es la del lavado y su tramo de fruta mide 7 px, donde no cabe ni una
        palabra.

        Y se queda fuera del panel pegajoso de móvil, que es la razón por la que es una
        pieza aparte: el gráfico tiene que caber en una franja y la leyenda son otros
        58 px. No se pierde nada, porque para cuando el gráfico se queda pegado arriba ya
        se ha pasado por la leyenda de camino.
      */}
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        <LegendItem
          swatch={
            <span className="h-3 w-4 shrink-0 bg-coffee" aria-hidden="true" />
          }
        >
          Cereza entera
        </LegendItem>
        <LegendItem
          swatch={
            <span className="h-3 w-4 shrink-0 bg-lavender" aria-hidden="true" />
          }
        >
          Mucílago
        </LegendItem>
        <LegendItem
          swatch={
            <svg
              viewBox="0 0 16 12"
              aria-hidden="true"
              focusable="false"
              className="h-3 w-4 shrink-0"
            >
              <rect
                width="16"
                height="12"
                fill={`url(#${hatchId})`}
                stroke="#807EC5"
                strokeWidth="1"
              />
            </svg>
          }
        >
          Cuánto se deja: un rango
        </LegendItem>
        <LegendItem
          swatch={
            <span className="h-[3px] w-4 shrink-0 bg-ink" aria-hidden="true" />
          }
        >
          Duración del proceso
        </LegendItem>
      </ul>
    </>
  );
}

/** Los días de fin de cada proceso, exactos, de menor a mayor y sin repetir. */
function laneTicks(steps: ProcessStep[]): number[] {
  // Sin redondear, porque son los que colocan las marcas: el redondeo es solo del
  // rótulo. Los 10,625 días del lavado se rotulan «11» pero se colocan en su sitio.
  return [
    0,
    ...[...new Set(steps.map((step) => step.lane.totalDays))].sort(
      (a, b) => a - b,
    ),
  ];
}

/**
 * El gráfico completo: los tres carriles con su eje de días.
 *
 * El rótulo va **encima** de la barra, que era la decisión original y a la que se vuelve.
 * Estuvo un rato en una columna a la izquierda para que el gráfico cupiera en la franja
 * anclada de móvil, y fue un error por dos motivos. El primero es que estimé el ancho de
 * esa columna a mano, con cuentas de caracteres, y sale bastante más ancha de lo
 * calculado: apretaba la barra y con ella el eje, hasta que los rótulos del 11 y del 15
 * casi se tocaban. El segundo es más de fondo: no hay que encoger el gráfico bueno para
 * que quepa en un sitio donde hace otro trabajo. Para eso está `LaneStrip`.
 *
 * Con el rótulo encima, la barra vuelve a los 327 px enteros a 375 px de ancho y el tramo
 * del lavado recupera sus 8,9 px, que era el detalle más frágil del dibujo.
 *
 * Este gráfico se enseña de `md` en adelante. Por debajo va la franja.
 */
function LaneChart({
  steps,
  selected,
  hatchId,
}: {
  steps: ProcessStep[];
  selected: number;
  hatchId: string;
}) {
  const maxDays = Math.max(...steps.map((step) => step.lane.totalDays));

  return (
    <div className="hidden md:block">
      <ol className="flex flex-col gap-5">
        {steps.map((step, index) => (
          <li key={step.name} className="flex flex-col gap-2">
            {/* El rótulo lleva los días que DURA el proceso, no los de contacto: es lo
                que mide la línea de abajo. El tiempo de contacto va en su tarjeta. */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p
                className={`font-display text-xl leading-none transition-colors duration-300 motion-reduce:transition-none ${
                  index === selected ? "text-ink" : "text-coffee"
                }`}
              >
                {step.name}
              </p>
              <p className="font-mono text-[11px] leading-4 uppercase tracking-wider text-sage-deep tabular-nums">
                {Math.round(step.lane.totalDays)} días en total
              </p>
            </div>

            <LaneBar
              lane={step.lane}
              maxDays={maxDays}
              active={index === selected}
              hatchId={hatchId}
            />
          </li>
        ))}
      </ol>

      <LaneAxis days={laneTicks(steps)} maxDays={maxDays} />
    </div>
  );
}

/**
 * La franja compacta: la versión del gráfico que se queda pegada arriba en móvil.
 *
 * No es el gráfico completo encogido, es otra pieza, porque hace otro trabajo. Quien la
 * mira ya se ha leído el gráfico con su eje y su leyenda unos centímetros más arriba, y
 * ahora está recorriendo las tarjetas: lo único que necesita de un vistazo es **cuál de
 * los tres está mirando y cómo se compara con los otros dos**. Así que de aquí se cae lo
 * que era para aprender y se queda lo que es para orientarse:
 *
 * - El nombre baja de la tipografía de titular a la de datos, que ocupa un tercio.
 * - El nombre y los días comparten línea, en vez de dos líneas.
 * - **El eje se va entero.** Es lo que arregla de raíz que los rótulos del 11 y del 15
 *   se apelotonaran, y el dato que hacía falta de él —cuántos días— lo lleva cada carril
 *   escrito al lado de su nombre.
 *
 * Y sobre todo: **el rótulo no va en una columna al lado de la barra.** Una columna
 * lateral le quita ancho a la barra, y cuánto le quita depende de lo que mida un texto
 * con una tipografía cargada, que es justo lo que no se puede saber sin medirlo en el
 * navegador. Encima de la barra, el ancho de los nombres no afecta a nada.
 *
 * Sale en 185 px a 375 px de ancho: el 28 % de una pantalla de 375 × 667, por debajo del
 * tercio, y deja 482 px para leer.
 */
function LaneStrip({
  steps,
  selected,
  hatchId,
}: {
  steps: ProcessStep[];
  selected: number;
  hatchId: string;
}) {
  const maxDays = Math.max(...steps.map((step) => step.lane.totalDays));

  return (
    <ol className="flex flex-col gap-2 md:hidden">
      {steps.map((step, index) => (
        <li key={step.name} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-x-3 font-mono text-[11px] leading-4 uppercase tracking-wider">
            <p
              className={`transition-colors duration-300 motion-reduce:transition-none ${
                index === selected ? "text-ink" : "text-coffee"
              }`}
            >
              {step.name}
            </p>
            <p className="text-sage-deep tabular-nums">
              {Math.round(step.lane.totalDays)} días
            </p>
          </div>

          <LaneBar
            lane={step.lane}
            maxDays={maxDays}
            active={index === selected}
            hatchId={hatchId}
          />
        </li>
      ))}
    </ol>
  );
}

/**
 * El patrón del rayado del rango, declarado una vez para todo el bloque.
 *
 * El `svg` que lo contiene no ocupa sitio: solo está para que las barras y la muestra de
 * la leyenda puedan apuntar al patrón. El id se genera, porque uno escrito a mano se
 * repetiría si algún día hubiera dos de estos bloques en la misma página y el segundo
 * acabaría usando el patrón del primero.
 */
function HatchPattern({ id }: { id: string }) {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke="#807EC5" strokeWidth="2" />
        </pattern>
      </defs>
    </svg>
  );
}

/* -------------------------------------------------------------- compartido */

/**
 * Una de las dos barras del intercambio. Solo la lleva la variante del tueste.
 *
 * Se esconde entera de los lectores de pantalla, rótulo incluido, y no es un descuido:
 * una barra sin números no dice nada leída en voz alta, y el rótulo por su cuenta
 * anunciaría un dato que luego no llega. Lo que la barra dibuja está escrito con palabras
 * en los peldaños de al lado, donde además el que está elegido queda marcado con
 * `aria-pressed`. La información no se pierde: cambia de sitio.
 */
function Bar({
  label,
  weight,
  color,
}: {
  label: string;
  weight: number;
  color: string;
}) {
  return (
    <div aria-hidden="true">
      <p className="font-mono text-xs uppercase tracking-widest text-coffee">
        {label}
      </p>

      {/*
        El carril es un recuadro con borde fino y el fondo del papel, y no un bloque
        macizo de `dust`, por una razón medida: sobre `dust`, el lavanda de la barra se
        queda en 2,05:1, y entonces la barra —que es la que lleva el significado— no se
        distinguiría de su propio carril. Sobre `paper` sube a 3,15:1, que es el mínimo
        que se le pide a un elemento gráfico. El marrón de la otra barra llega a 10,3:1.
      */}
      <div className="mt-2 h-3 w-full border border-dust bg-paper">
        {/*
          El ancho sale de un dato, así que no puede ser una clase de Tailwind escrita de
          antemano: va en un estilo en línea. La transición es de `width` y no de `all`
          para no animar de paso el color, y se apaga sola para quien tiene pedido menos
          movimiento en su sistema.
        */}
        <div
          className={`h-full transition-[width] duration-300 ease-out motion-reduce:transition-none ${color}`}
          style={{ width: `${(weight / ROAST_WEIGHT_MAX) * 100}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Un peldaño de la escala, y también un mando: pulsarlo lleva la selección ahí.
 *
 * Es un `<button>` de verdad y no un div que escucha clics, así que entra en el orden de
 * tabulación por su cuenta, responde a Intro y a la barra espaciadora sin código que lo
 * haga, y se anuncia como lo que es. `aria-pressed` dice si este es el peldaño elegido.
 *
 * Dentro del botón solo hay `span`: una lista de definiciones sería más expresiva para
 * los pares rótulo/nota, pero el contenido de un botón no admite listas, y un botón que
 * envuelve HTML inválido es peor negocio que perder el `<dl>`. El rótulo sigue delante de
 * cada nota, así que se entiende igual.
 *
 * Que un peldaño esté elegido se dice de cinco maneras, y cuatro se perciben sin
 * distinguir un solo color:
 *
 * 1. El relleno pasa de `paper` a `dust` al 40 %, que son 6,2 puntos de claridad (L*) de
 *    diferencia: se percibe en escala de grises, aunque de refuerzo.
 * 2. El cuadradito pasa de hueco y de 8 px a relleno y de 12 px. Forma y tamaño.
 * 3. Aparece el filete de la izquierda, de 2 px. Presencia frente a ausencia.
 * 4. `aria-pressed` lo declara para quien no ve nada de todo esto.
 * 5. Y además el título cambia de color, que es la única señal que sí es de color —y aun
 *    así lleva 20,6 puntos de claridad detrás.
 *
 * El tamaño del cuadradito cambia dentro de una caja fija, así que el texto no se mueve
 * al elegir otro peldaño.
 *
 * Sobre los colores del estado activo, que están medidos y no elegidos a ojo: el acento
 * es `lavender-deep` y no `lavender` porque debajo hay relleno, y el lavanda no llega al
 * mínimo de 3:1 sobre ninguna de sus diluciones —2,05:1 sobre `dust` macizo, 2,67:1 al
 * 40 %, y ni siquiera 3 al 30 %—. No es cuestión del tamaño del título: a 24 px el
 * lavanda sí valdría sobre `paper` (3,15:1), lo que no aguanta es el fondo. Con el relleno
 * al 40 %, `lavender-deep` da 4,15:1.
 *
 * En la tarjeta activa el texto en mono se queda en `coffee` en vez de volver a
 * `sage-deep`, y esto merece explicación porque al 40 % `sage-deep` ya pasaría. Pasaría
 * por 4,506:1 contra un mínimo de 4,5: seis milésimas de margen, menos que el error de
 * redondeo de componer una capa traslúcida, porque `bg-dust/40` no es un color fijo sino
 * un `color-mix` que el navegador mezcla y vuelve a convertir. Un valor que depende de que
 * nadie toque nunca esa opacidad no es un valor que pase: es uno que todavía no ha
 * fallado. `coffee` da 8,749:1.
 */
function StepButton({
  step,
  axes,
  selected,
  onSelect,
}: {
  step: ScaleStep;
  axes: [string, string];
  selected: boolean;
  onSelect: () => void;
}) {
  const labelColor = selected ? "text-coffee" : "text-sage-deep";

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`block w-full cursor-pointer border-t border-t-dust border-l-2 py-5 pr-4 pl-4 text-left transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-deep ${
          selected
            ? "border-l-lavender-deep bg-dust/40"
            : "border-l-transparent hover:border-l-dust"
        }`}
      >
        {/* La línea se parte porque a 375 px no caben juntos: «Medio-oscuro» a 24 px y
            «City · pierde 21,5 %» en mono suman unos 348 px y solo hay 305. Sin
            `flex-wrap` los dos se estrujarían partiéndose por dentro; así el dato baja
            entero a la línea siguiente y en pantalla ancha vuelve a su sitio. */}
        <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* Caja de tamaño fijo: dentro crece el cuadradito, fuera nada se mueve. */}
          <span className="flex size-3 shrink-0 items-center justify-center">
            <span
              className={
                selected
                  ? "size-3 bg-lavender-deep"
                  : "size-2 border border-ink"
              }
            />
          </span>

          <span
            className={`font-display text-2xl leading-none ${
              selected ? "text-lavender-deep" : "text-coffee"
            }`}
          >
            {step.name}
          </span>

          {/* `figure` trae la frase entera desde el contenido —"pierde 12,6 %", "23 días
              con fruta"— y el componente no le añade ninguna palabra. */}
          <span
            className={`font-mono text-xs uppercase tracking-widest lg:ml-auto ${labelColor}`}
          >
            {step.alias ? `${step.alias} · ` : ""}
            {step.figure}
          </span>
        </span>

        {/* Las dos notas se ponen en paralelo a partir de `lg`, y esa es la razón por la
            que los peldaños caben enteros en una pantalla sin compactar ninguno. Por
            debajo de ese ancho se apilan, que es lo legible cuando la columna es
            estrecha. */}
        <span className="mt-4 block lg:grid lg:grid-cols-2 lg:gap-8">
          {step.notes.map((note, side) => (
            <span
              key={axes[side]}
              className={`block ${side === 0 ? "" : "mt-4 lg:mt-0"}`}
            >
              <span
                className={`block font-mono text-xs uppercase tracking-widest ${labelColor}`}
              >
                {axes[side]}
              </span>
              <span className="mt-1 block max-w-[52ch] text-sm text-coffee">
                {note}
              </span>
            </span>
          ))}
        </span>
      </button>
    </li>
  );
}

/** La lista de peldaños, con su rótulo. La comparten las dos variantes. */
function StepList({
  steps,
  axes,
  selected,
  onSelect,
  label,
}: {
  steps: ScaleStep[];
  axes: [string, string];
  selected: number;
  onSelect: (index: number) => void;
  label: string;
}) {
  const labelId = useId();

  return (
    <>
      <p
        id={labelId}
        className="font-mono text-xs uppercase tracking-widest text-ink"
      >
        {label}
      </p>

      {/* Lista ordenada porque el orden es el contenido. */}
      <ol className="mt-4" aria-labelledby={labelId}>
        {steps.map((step, index) => (
          <StepButton
            key={step.name}
            step={step}
            axes={axes}
            selected={index === selected}
            onSelect={() => onSelect(index)}
          />
        ))}
      </ol>
    </>
  );
}

/* -------------------------------------------------------- las dos variantes */

/**
 * La escala de tueste, con deslizador.
 *
 * Lo único que recuerda es un número: en qué peldaño estamos. Eso es «el estado» de un
 * componente, un dato que guarda entre un gesto y el siguiente y que al cambiar hace que
 * se vuelva a dibujar lo que dependa de él. Aquí de ese número salen cinco cosas: el
 * nombre grande, el color de los granos, el brillo del aceite, el ancho de las dos barras
 * y cuál de los peldaños queda marcado.
 *
 * Los dos mandos —el deslizador y los botones— están sincronizados en los dos sentidos
 * sin ningún código que los sincronice, y eso no es casualidad: no hay dos estados que
 * haya que mantener de acuerdo, hay uno solo que los dos leen y los dos escriben.
 *
 * El deslizador es un `<input type="range">` de los de siempre y no un invento hecho con
 * divs. Así el teclado funciona sin escribir una línea para ello —flechas, Inicio y
 * Fin—, el foco se ve, y un lector de pantalla ya sabe qué es. `aria-valuetext` es lo
 * único que hay que añadir: sin él anunciaría «2 de 5», que no significa nada.
 */
function RoastScale({ intro, axes, steps, note, diagramNote }: RoastBlock) {
  const [index, setIndex] = useState(0);
  if (steps.length === 0) return null;

  const selected = steps[Math.min(index, steps.length - 1)];

  return (
    <figure className="mt-16 border-t-2 border-lavender pt-6 md:mt-24">
      {/*
        La rejilla tiene cuatro hijos y no dos, y el motivo es el panel pegajoso de móvil.
        Para que un elemento `sticky` siga anclado mientras pasan las tarjetas, su bloque
        contenedor tiene que abarcarlas también: si el panel viviera dentro de una
        «columna izquierda» se despegaría justo donde acaba esa columna, o sea justo donde
        empieza lo que hay que recorrer.
      */}
      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-12 xl:gap-x-16">
        <p className="max-w-[34ch] font-mono text-xs uppercase tracking-widest text-ink lg:col-start-1 lg:row-start-1">
          {intro}
        </p>

        {/*
          El panel del mando. En móvil se queda pegado arriba mientras se recorre el
          bloque y se despega solo al salir de él, porque `sticky` está acotado por su
          bloque contenedor: no hay que observar el scroll ni calcular dónde empieza y
          acaba el bloque, y no puede quedarse colgado en una pantalla en la que no toca.

          Es `sticky` y no `fixed`, y la diferencia importa: un elemento fijo se sale del
          flujo, hay que reservarle sitio y hay que calcular su desplazamiento a partir
          del alto de lo que tenga encima. Aquí no hay ninguna medida que mantener al día.

          Llega hasta `md` y no más: desde ahí la cabecera del sitio ya es `sticky top-0`
          con `z-20`, y dos cosas peleando por el borde de arriba acabarían tapándose.

          Los márgenes negativos sacan el fondo hasta los bordes de la pantalla y el
          relleno vuelve a meter el contenido en su sitio: si no, al quedarse pegado se
          vería pasar el texto por los lados del panel.
        */}
        <div className="sticky top-0 z-10 -mx-6 mt-6 border-b border-dust bg-paper px-6 py-3 md:static md:z-auto md:mx-0 md:border-b-0 md:px-0 md:py-0 lg:col-start-1 lg:row-start-2">
          {/* En móvil el nombre y los granos van uno al lado del otro, y en escritorio
              apilados. Es lo que hace que el panel quepa en una franja de unos 150 px en
              vez de los 570 que ocuparía la versión de escritorio. */}
          <div className="flex items-center gap-4 lg:block">
            {/* 24 px en móvil dan 3,15:1, que es lo que se le pide a un texto de 24 px o
                más, y en escritorio sube a 36. No pasa de 36 porque la columna se
                estrecha ahí y «Medio-oscuro» a 48 px no cabría. */}
            <p className="min-w-0 flex-1 font-display text-2xl leading-none text-lavender lg:text-4xl">
              {selected.name}
            </p>

            <Beans bean={selected.bean} />
          </div>

          <input
            type="range"
            min={0}
            max={steps.length - 1}
            step={1}
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
            aria-label="Nivel de tueste"
            aria-valuetext={selected.name}
            /*
              El carril y el tirador se pintan a mano con los tokens del sitio. Sin esto,
              un `range` trae el gris de la interfaz del navegador, que está fuera de la
              paleta y sobre el crema se ve prestado. Hay que escribirlo dos veces porque
              cada motor expone sus propias piezas con otro nombre.

              El tirador mide 24 px, que es el mínimo razonable para un dedo, y es
              cuadrado como el resto del sitio. El margen negativo de 8 px lo centra en el
              carril de 8: sale de la geometría —(24 − 8) / 2—, no de ajustarlo a ojo.
            */
            className="mt-4 h-6 w-full appearance-none bg-transparent accent-lavender-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-deep lg:mt-8 [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-lavender-deep [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-dust [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-dust [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-lavender-deep"
          />

          {/* Los dos extremos dicen hacia dónde va el deslizador. Se esconden de los
              lectores de pantalla porque el propio control ya anuncia su valor y su
              recorrido: repetirlo aquí solo sería ruido. */}
          <div
            aria-hidden="true"
            className="mt-2 flex justify-between font-mono text-xs uppercase tracking-widest text-coffee"
          >
            <span>Más claro</span>
            <span>Más oscuro</span>
          </div>
        </div>

        {/* El pie del dibujo y las barras se quedan en el flujo, no en el panel pegajoso:
            el deslizador y los granos son el mando y su respuesta y tienen que seguir a
            la vista, y lo que las barras dibujan está escrito con palabras en las
            tarjetas, que es justo lo que se lee cuando el panel está pegado. */}
        <div className="mt-8 lg:col-start-1 lg:row-start-3">
          <p className="max-w-[46ch] text-sm text-coffee">{diagramNote}</p>

          <div className="mt-8 space-y-5">
            {axes.map((axis, side) => (
              <Bar
                key={axis}
                label={axis}
                weight={selected.weights[side]}
                color={BAR_COLORS[side]}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <StepList
            steps={steps}
            axes={axes}
            selected={index}
            onSelect={setIndex}
            label="Los cinco peldaños"
          />
        </div>
      </div>

      <figcaption className="mt-10 max-w-[58ch] border-t border-dust pt-5 text-sm text-coffee">
        {note}
      </figcaption>
    </figure>
  );
}

/**
 * La línea del beneficio, sin deslizador.
 *
 * Aquí no hay panel pegajoso en móvil, y es una decisión y no un olvido: son tres
 * peldaños y no cinco, el bloque entero cabe en poco más de una pantalla, y el sitio
 * prefiere una página que respire a una con una franja anclada comiéndose el alto.
 *
 * Tampoco hay barras de intercambio. Los procesos no son un intercambio entre dos cosas
 * opuestas: el coste del lavado es agua y el del natural es tiempo y riesgo, y eso no son
 * los dos extremos de un mismo eje. Dibujarlas habría sido inventarse el eje.
 */
function ProcessScale({ intro, axes, steps, note, diagramNote }: ProcessBlock) {
  const [index, setIndex] = useState(0);
  const hatchId = useId();
  if (steps.length === 0) return null;

  return (
    <figure className="mt-16 border-t-2 border-lavender pt-6 md:mt-24">
      <HatchPattern id={hatchId} />

      {/*
        Cuatro hijos en la rejilla y no dos, por lo mismo que en la variante del tueste:
        para que el gráfico siga anclado mientras pasan las tres tarjetas, su bloque
        contenedor tiene que abarcarlas. Dentro de una «columna izquierda» se despegaría
        justo donde empieza lo que hay que recorrer.
      */}
      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="max-w-[34ch] font-mono text-xs uppercase tracking-widest text-ink">
            {intro}
          </p>

          <div className="mt-6">
            <LaneLegend hatchId={hatchId} />
          </div>
        </div>

        {/*
          El gráfico se queda pegado arriba en móvil mientras se recorren los tres
          procesos, y se despega solo al salir del bloque por arriba o por abajo, porque
          `sticky` está acotado por su bloque contenedor.

          Se decidió no ponerlo en su día porque eran tres tarjetas y no cinco, pero cada
          tarjeta de proceso lleva dos columnas de texto y el scroll acaba siendo
          comparable al del tueste, así que entra.

          Llega hasta `md` y no más: desde ahí la cabecera del sitio ya es `sticky top-0`
          con `z-20`, y dos cosas peleando por el borde de arriba se taparían. El `z-10`
          es el mismo que usa el panel del cronómetro.
        */}
        {/*
          Debajo de `md` se pinta la franja y se ancla; de `md` en adelante se pinta el
          gráfico completo y no se ancla. Cada ancho enseña uno solo de los dos, así que
          no hay dos dibujos a la vez en ninguna pantalla: la franja *es* el diagrama en
          móvil, y lo que hace al quedarse pegada es seguir estando.
        */}
        <div className="sticky top-0 z-10 -mx-6 mt-6 border-b border-dust bg-paper px-6 py-3 md:static md:z-auto md:mx-0 md:border-b-0 md:px-0 md:py-0 lg:col-start-1 lg:row-start-2">
          <LaneStrip steps={steps} selected={index} hatchId={hatchId} />
          <LaneChart steps={steps} selected={index} hatchId={hatchId} />
        </div>

        <p className="mt-8 max-w-[46ch] text-sm text-coffee lg:col-start-1 lg:row-start-3">
          {diagramNote}
        </p>

        <div className="mt-12 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <StepList
            steps={steps}
            axes={axes}
            selected={index}
            onSelect={setIndex}
            label="Los tres caminos"
          />
        </div>
      </div>

      <figcaption className="mt-10 max-w-[58ch] border-t border-dust pt-5 text-sm text-coffee">
        {note}
      </figcaption>
    </figure>
  );
}

/**
 * El bloque `scale`. Reparte según la variante y no comparte estado entre las dos: cada
 * una es un componente con su propio peldaño elegido.
 */
export function Scale(block: ScaleBlock) {
  return block.variant === "roast" ? (
    <RoastScale {...block} />
  ) : (
    <ProcessScale {...block} />
  );
}
