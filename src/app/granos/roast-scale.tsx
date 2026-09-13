"use client";

import { useId, useState } from "react";
import {
  ROAST_WEIGHT_MAX,
  type ArticleBlock,
  type RoastBean,
  type RoastLevel,
} from "@/content/granos/types";

type RoastScaleBlock = Extract<ArticleBlock, { kind: "roastScale" }>;

/**
 * El color de cada barra, en el orden de `axes`. El lado del grano va en el lavanda
 * protagonista y el del tueste en el marrón del café: son elementos gráficos y no
 * texto, así que los dos tonos valen aquí aunque el lavanda no valdría para una letra
 * pequeña.
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

/**
 * Un grano de café visto desde arriba: el cuerpo, el surco del centro y, si el tueste
 * ha llegado lejos, el brillo del aceite en la superficie.
 *
 * El contorno va con `currentColor`, que aquí es el token `ink` heredado del svg. Esa es
 * la parte del dibujo que pertenece al sitio; el relleno y el surco son los colores
 * reales del café y vienen del contenido, porque en este dibujo el color es el dato.
 *
 * Los colores se ponen con `style` y no con atributos `fill` porque un atributo no
 * transiciona: solo una propiedad de CSS se puede animar. De ahí `transition-colors`,
 * que en Tailwind v4 incluye `fill` y `stroke`.
 *
 * El brillo va en blanco, que tampoco es de la paleta y tampoco debería serlo: un
 * reflejo es blanco por lo que es, independientemente de lo tostado que esté el grano.
 */
function Bean({
  bean,
  position,
}: {
  bean: RoastBean;
  position: (typeof BEAN_POSITIONS)[number];
}) {
  const [sheenA, sheenB] = SHEEN_OPACITY[bean.sheen];
  const fade =
    "transition-opacity duration-500 ease-out motion-reduce:transition-none";
  const tint =
    "transition-colors duration-500 ease-out motion-reduce:transition-none";

  return (
    <g
      transform={`translate(${position.x} ${position.y}) rotate(${position.rotate})`}
    >
      <ellipse
        rx="22"
        ry="29"
        stroke="currentColor"
        strokeWidth="1.5"
        className={tint}
        style={{ fill: bean.body }}
      />

      {/* El surco no es simétrico: baja haciendo una ese, que es como cae de verdad. */}
      <path
        d="M 0 -25 C -5 -15, 5 -7, 0 1 C -5 9, 4 17, 0 25"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={tint}
        style={{ stroke: bean.crease }}
      />

      <ellipse
        cx="-8"
        cy="-13"
        rx="5.5"
        ry="8"
        fill="#FFFFFF"
        className={fade}
        style={{ opacity: sheenA }}
      />
      <ellipse
        cx="7"
        cy="10"
        rx="3.5"
        ry="5"
        fill="#FFFFFF"
        className={fade}
        style={{ opacity: sheenB }}
      />
    </g>
  );
}

/**
 * Los tres granos del nivel elegido.
 *
 * Se esconde de los lectores de pantalla porque no cuenta nada que no esté ya escrito:
 * el nombre del nivel está justo encima, y el brillo del aceite lo explica el pie del
 * dibujo y lo repite la nota del propio nivel en la columna de al lado. Un dibujo que
 * repite lo que dice el texto de al lado se describe dos veces o no se describe.
 */
function Beans({ bean }: { bean: RoastBean }) {
  return (
    <svg
      viewBox="0 0 168 80"
      aria-hidden="true"
      focusable="false"
      /*
        En móvil los granos van al lado del nombre, con ancho fijo, porque el panel tiene
        que caber en una franja estrecha; en escritorio pasan a ocupar la columna debajo
        del nombre. `shrink-0` evita que el nombre largo los estruje.
      */
      className="h-auto w-32 shrink-0 text-ink lg:mt-8 lg:w-full lg:max-w-[264px]"
    >
      {BEAN_POSITIONS.map((position) => (
        <Bean key={position.x} bean={bean} position={position} />
      ))}
    </svg>
  );
}

/**
 * Una de las dos barras del intercambio.
 *
 * Se esconde entera de los lectores de pantalla, rótulo incluido, y no es un descuido:
 * una barra sin números no dice nada leída en voz alta, y el rótulo por su cuenta
 * anunciaría un dato que luego no llega. Lo que la barra dibuja está escrito con
 * palabras en los cinco peldaños de al lado, donde además el que está elegido queda
 * marcado con `aria-pressed`. La información no se pierde: cambia de sitio.
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

        Se arregló cambiando el carril y no el acento a propósito: el lavanda es el color
        que el sistema de diseño reserva para los gráficos, así que el que tenía que
        ceder era el fondo. Y un borde fino encaja mejor con el resto del sitio que un
        bloque relleno.
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
 * Un peldaño de la escala, y también un mando: pulsarlo lleva el deslizador a esa
 * posición.
 *
 * Es un `<button>` de verdad y no un div que escucha clics, así que entra en el orden de
 * tabulación por su cuenta, responde a Intro y a la barra espaciadora sin código que lo
 * haga, y se anuncia como lo que es. `aria-pressed` dice si este es el peldaño elegido.
 *
 * Dentro del botón solo hay `span`: una lista de definiciones sería más expresiva para
 * los pares rótulo/nota, pero el contenido de un botón no admite listas, y un botón que
 * envuelve HTML inválido es peor negocio que perder el `<dl>`. El rótulo sigue delante
 * de cada nota, así que se entiende igual.
 *
 * Que un peldaño esté elegido se dice de cinco maneras, y cuatro se perciben sin
 * distinguir un solo color:
 *
 * 1. El cuadradito pasa de hueco y de 8 px a relleno y de 12 px. Forma y tamaño.
 * 2. Aparece el filete de la izquierda, de 2 px. Presencia frente a ausencia.
 * 3. El relleno pasa de `paper` a `dust` al 40 %, que son 6,2 puntos de claridad (L*)
 *    de diferencia: se percibe en escala de grises, pero de refuerzo. Con el relleno
 *    macizo eran 15,7 y esta era la señal más fuerte de las tres; al diluirlo, el peso
 *    pasa a las dos de arriba, que no dependen de ningún color.
 * 4. `aria-pressed` lo declara para quien no ve nada de todo esto.
 * 5. Y además el título cambia de color, que es la única señal que sí es de color —y
 *    aun así lleva 20,6 puntos de claridad detrás.
 *
 * El tamaño del cuadradito cambia dentro de una caja fija, así que el texto no se mueve
 * al elegir otro peldaño.
 *
 * Sobre los colores del estado activo, que están medidos y no elegidos a ojo: el acento
 * es `lavender-deep` y no `lavender` porque debajo hay relleno, y el lavanda no llega al
 * mínimo de 3:1 sobre ninguna de sus diluciones —2,05:1 sobre `dust` macizo, 2,67:1 al
 * 40 %, y ni siquiera 3 al 30 %—. No es cuestión del tamaño del título: a 24 px el
 * lavanda sí valdría sobre `paper` (3,15:1), lo que no aguanta es el fondo. Con el
 * relleno al 40 %, `lavender-deep` da 4,15:1, y sirve igual para el título, para el
 * cuadradito y para el filete, que tiene relleno a un lado y papel al otro (4,89:1).
 *
 * En la tarjeta activa el texto en mono se queda en `coffee` en vez de volver a
 * `sage-deep`, y esto merece explicación porque al 40 % `sage-deep` ya pasaría. Pasaría
 * por 4,506:1 contra un mínimo de 4,5: seis milésimas de margen, menos que el error de
 * redondeo de componer una capa traslúcida, porque `bg-dust/40` no es un color fijo sino
 * un `color-mix` que el navegador mezcla y vuelve a convertir. Un valor que depende de
 * que nadie toque nunca esa opacidad no es un valor que pase: es uno que todavía no ha
 * fallado. `coffee` da 8,749:1 y además refuerza el estado activo justo ahora que el
 * relleno ha perdido fuerza como señal.
 */
function LevelButton({
  level,
  axes,
  selected,
  onSelect,
}: {
  level: RoastLevel;
  axes: [string, string];
  selected: boolean;
  onSelect: () => void;
}) {
  // El mono de la tarjeta activa va en `coffee` y el de las demás en `sage-deep`, por
  // margen de contraste sobre el relleno: 8,749:1 frente a 4,506:1 contra un mínimo de
  // 4,5. El razonamiento completo está arriba.
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
            entero a la línea siguiente y en pantalla ancha vuelve a su sitio, alineado
            a la derecha. */}
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

          {/* 24 px justos (`text-2xl`), que es el corte a partir del cual la paleta
              admite los acentos claros. Aun así va en `lavender-deep` y no en
              `lavender`, porque lo que manda aquí es el relleno `dust` de debajo. */}
          <span
            className={`font-display text-2xl leading-none ${
              selected ? "text-lavender-deep" : "text-coffee"
            }`}
          >
            {level.name}
          </span>

          {/* La pérdida de peso es el único número medido del peldaño, y va en mono como
              el resto de los datos técnicos del sitio. El nombre inglés lo acompaña
              porque es el que se ve en las tostadurías y en el estudio que se cita. */}
          <span
            className={`font-mono text-xs uppercase tracking-widest lg:ml-auto ${labelColor}`}
          >
            {level.alias ? `${level.alias} · ` : ""}pierde {level.weightLoss}
          </span>
        </span>

        {/* Las dos notas se ponen en paralelo a partir de `lg`, y esa es la razón por la
            que los cinco peldaños caben enteros en una pantalla sin compactar ninguno.
            Por debajo de ese ancho se apilan, que es lo legible cuando la columna es
            estrecha. */}
        <span className="mt-4 block lg:grid lg:grid-cols-2 lg:gap-8">
          {level.notes.map((note, side) => (
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

/**
 * El deslizador de tueste.
 *
 * Es la única parte de un artículo que corre en el navegador, y lo único que recuerda es
 * un número: en qué peldaño de la escala estamos. Eso es «el estado» de un componente,
 * un dato que el componente guarda entre un gesto y el siguiente y que al cambiar hace
 * que se vuelva a dibujar lo que dependa de él. Aquí de ese número salen cinco cosas: el
 * nombre grande, el color de los granos, el brillo del aceite, el ancho de las dos
 * barras y cuál de los cinco peldaños queda marcado.
 *
 * Los dos mandos —el deslizador y los cinco botones— están sincronizados en los dos
 * sentidos sin ningún código que los sincronice, y eso no es casualidad: no hay dos
 * estados que haya que mantener de acuerdo, hay uno solo que los dos leen y los dos
 * escriben. Dos estados separados con código para igualarlos es justo la forma de que
 * algún día se separen.
 *
 * El deslizador es un `<input type="range">` de los de siempre y no un invento hecho con
 * divs. Así el teclado funciona sin escribir una línea para ello —flechas, Inicio y
 * Fin—, el foco se ve, y un lector de pantalla ya sabe qué es. `aria-valuetext` es lo
 * único que hay que añadir: sin él anunciaría «2 de 5», que no significa nada, y con él
 * dice el nombre del tueste.
 *
 * Si el JavaScript no llega, los dos mandos se quedan quietos en el primer peldaño y no
 * pasa gran cosa: los cinco peldaños están en el HTML con su nombre, su pérdida de peso
 * y sus dos notas completas. Nada de lo que el bloque cuenta está escondido detrás de un
 * clic, y por eso no hace falta ni colapsar los peldaños ni duplicar el contenido en un
 * bloque de reserva.
 */
export function RoastScale({
  intro,
  axes,
  levels,
  note,
  beanNote,
}: RoastScaleBlock) {
  const [index, setIndex] = useState(0);
  const stepsLabelId = useId();

  // Un artículo podría registrar la escala sin peldaños. Entonces no hay nada que
  // pintar, y el bloque desaparece en vez de dejar un carril vacío en la página.
  if (levels.length === 0) return null;

  const selected = levels[Math.min(index, levels.length - 1)];

  return (
    <figure className="mt-16 border-t-2 border-lavender pt-6 md:mt-24">
      {/*
        Dos columnas: a la izquierda lo que se toca y lo que cambia al tocarlo, a la
        derecha la escala entera. Así el mando, los granos, las barras y los cinco
        peldaños se ven a la vez, sin bajar por el bloque.

        El corte está en `lg` y no en `md`, que es el que usa el resto del sitio, y es a
        propósito: a 768 px las dos columnas salen a unos 340 px cada una, y ahí las notas
        de los peldaños se parten en cinco líneas y el bloque crece más que apilado. Este
        bloque necesita más ancho que un párrafo, así que espera a tenerlo.
      */}
      {/*
        La rejilla tiene cuatro hijos y no dos, y el motivo es el panel pegajoso de
        móvil. Para que un elemento `sticky` siga anclado mientras pasan las cinco
        tarjetas, su bloque contenedor tiene que abarcar también las tarjetas: si el
        panel viviera dentro de una «columna izquierda» se despegaría justo donde acaba
        esa columna, o sea justo donde empieza lo que hay que recorrer.

        Así que los tres trozos de la izquierda son hijos sueltos de la rejilla y en
        escritorio se recolocan con `col-start` y `row-start`. Las tarjetas ocupan la
        segunda columna y las tres filas.
      */}
      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-12 xl:gap-x-16">
        <p className="max-w-[34ch] font-mono text-xs uppercase tracking-widest text-ink lg:col-start-1 lg:row-start-1">
          {intro}
        </p>

        {/*
          El panel del mando. En móvil se queda pegado arriba mientras se recorre el
          bloque y se despega solo al salir de él, por arriba o por abajo, porque `sticky`
          está acotado por su bloque contenedor: no hay que observar el scroll ni calcular
          dónde empieza y acaba el bloque, y no puede quedarse colgado en una pantalla en
          la que no toca.

          Es `sticky` y no `fixed`, y la diferencia importa: un elemento fijo se sale del
          flujo, hay que reservarle sitio y hay que calcular su desplazamiento a partir del
          alto de lo que tenga encima. Aquí no hay ninguna medida que mantener al día: el
          navegador la resuelve solo.

          Llega hasta `md` y no más: desde ahí la cabecera del sitio ya es `sticky top-0`
          con `z-20`, y dos cosas peleando por el borde de arriba acabarían tapándose.
          Por eso también el `z-10`, que es el mismo que usa el panel del cronómetro: por
          encima de lo que pasa por debajo, por debajo de la cabecera.

          Los márgenes negativos sacan el fondo hasta los bordes de la pantalla y el
          relleno vuelve a meter el contenido en su sitio: si no, al quedarse pegado se
          vería pasar el texto por los lados del panel.
        */}
        <div className="sticky top-0 z-10 -mx-6 mt-6 border-b border-dust bg-paper px-6 py-3 md:static md:z-auto md:mx-0 md:border-b-0 md:px-0 md:py-0 lg:col-start-1 lg:row-start-2">
          {/* En móvil el nombre y los granos van uno al lado del otro, y en escritorio
              apilados. Es lo que hace que el panel quepa en una franja de unos 150 px en
              vez de los 526 que ocuparía la versión de escritorio. */}
          <div className="flex items-center gap-4 lg:block">
            {/* El nombre del peldaño elegido. Es el único sitio del bloque donde el
                lavanda se usa para texto, y puede ser por el cuerpo: 24 px en móvil da
                3,15:1, que es lo que se le pide a un texto de 24 px o más, y en
                escritorio sube a 36. No pasa de 36 porque la columna se estrecha ahí y
                «Medio-oscuro» a 48 px no cabría. */}
            <p className="min-w-0 flex-1 font-display text-2xl leading-none text-lavender lg:text-4xl">
              {selected.name}
            </p>

            <Beans bean={selected.bean} />
          </div>

          <input
            type="range"
            min={0}
            max={levels.length - 1}
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
              carril de 8: sale de la geometría —(24 − 8) / 2—, no de ajustarlo a ojo
              hasta que quedara bien.

              `accent-lavender-deep` se queda además de todo lo anterior porque Firefox
              pinta con ese color el tramo ya recorrido del carril, que es una pieza que
              no se puede alcanzar desde aquí.
            */
            className="mt-4 h-6 w-full appearance-none bg-transparent accent-lavender-deep lg:mt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-deep [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-lavender-deep [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-dust [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-dust [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-lavender-deep"
          />

          {/*
            Los dos extremos dicen hacia dónde va el deslizador. Se esconden de los
            lectores de pantalla porque el propio control ya anuncia su valor y su
            recorrido: repetirlo aquí solo sería ruido.
          */}
          <div
            aria-hidden="true"
            className="mt-2 flex justify-between font-mono text-xs uppercase tracking-widest text-coffee"
          >
            <span>Más claro</span>
            <span>Más oscuro</span>
          </div>
        </div>

        {/*
          El pie del dibujo y las barras se quedan en el flujo, no en el panel pegajoso.
          Es la prioridad que se acordó: el deslizador y los granos son el mando y su
          respuesta, y tienen que seguir a la vista; las barras son secundarias, y lo que
          dibujan está escrito con palabras en las cinco tarjetas, que es justo lo que se
          está leyendo cuando el panel está pegado.
        */}
        <div className="mt-8 lg:col-start-1 lg:row-start-3">
          <p className="max-w-[46ch] text-sm text-coffee">{beanNote}</p>

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
          <p
            id={stepsLabelId}
            className="font-mono text-xs uppercase tracking-widest text-ink"
          >
            Los cinco peldaños
          </p>

          {/* Lista ordenada porque el orden es el contenido: de más claro a más oscuro. */}
          <ol className="mt-4" aria-labelledby={stepsLabelId}>
            {levels.map((level, position) => (
              <LevelButton
                key={level.name}
                level={level}
                axes={axes}
                selected={position === index}
                onSelect={() => setIndex(position)}
              />
            ))}
          </ol>
        </div>
      </div>

      <figcaption className="mt-10 max-w-[58ch] border-t border-dust pt-5 text-sm text-coffee">
        {note}
      </figcaption>
    </figure>
  );
}
