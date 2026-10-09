import Image from "next/image";
import { resolveContentImage } from "@/content/image";
import { PhotoCreditLine } from "@/app/photo-credits";
import type { ArticleBlock, ComparisonRow } from "@/content/granos/types";
import { withEmphasis } from "@/app/emphasis";
import { Scale } from "./scale";

/**
 * Una fila de la comparación.
 *
 * En escritorio es una fila de tres columnas con el nombre a la izquierda. En móvil se
 * parte, y ahí cada valor repite encima el nombre de su columna: con las filas
 * apiladas, un lector que llega a la mitad del bloque ya no tiene a la vista la
 * cabecera y no sabría cuál de los dos está leyendo.
 */
function ComparisonRowItem({
  row,
  columns,
}: {
  row: ComparisonRow;
  columns: [string, string];
}) {
  return (
    <li className="border-t border-dust py-6 md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,5fr)] md:gap-8 md:py-7">
      <p className="font-mono text-xs uppercase tracking-widest text-sage-deep">
        {row.label}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-6 md:mt-0 md:contents">
        {row.values.map((value, index) => (
          <div key={columns[index]}>
            <p className="font-mono text-xs uppercase tracking-widest text-coffee md:hidden">
              {columns[index]}
            </p>
            <p className="mt-2 text-base text-ink md:mt-0 md:text-lg">
              {withEmphasis(value)}
            </p>
          </div>
        ))}
      </div>
    </li>
  );
}

function Comparison({
  block,
}: {
  block: Extract<ArticleBlock, { kind: "comparison" }>;
}) {
  return (
    <div className="mt-4">
      {/* La cabecera solo existe en escritorio; en móvil cada fila lleva la suya. */}
      <div className="hidden border-b-2 border-ink pb-3 md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,5fr)] md:gap-8">
        <span />
        {block.columns.map((column) => (
          <h3
            key={column}
            className="font-display text-3xl leading-none text-ink"
          >
            {column}
          </h3>
        ))}
      </div>

      {/* En móvil la cabecera de escritorio no está, así que los nombres de lo que se
          compara se anuncian aquí una vez antes de la primera fila. */}
      <h3 className="border-b-2 border-ink pb-3 font-display text-3xl leading-none md:hidden">
        {block.columns[0]} <span className="text-coffee">frente a</span>{" "}
        {block.columns[1]}
      </h3>

      <ul>
        {block.rows.map((row) => (
          <ComparisonRowItem
            key={row.label}
            row={row}
            columns={block.columns}
          />
        ))}
      </ul>

      {block.caption ? (
        <p className="mt-6 max-w-[58ch] border-t border-dust pt-5 text-sm text-coffee">
          {withEmphasis(block.caption)}
        </p>
      ) : null}
    </div>
  );
}

/**
 * La cifra suelta, en mono y en `ink`, como la dibuja el diseño: es un dato y no un
 * titular, y el sitio reserva Space Mono justo para eso.
 *
 * Se pinta en dos sitios según el ancho y por eso exporta su forma. En escritorio vive
 * en el margen, bajo el rótulo de su apartado (`placement="margin"`); en móvil, donde no
 * hay margen, se queda en el hilo del texto, en el sitio que ocupa en el contenido. Las
 * dos copias nunca se ven a la vez —una lleva `hidden` donde se ve la otra—, y como
 * `display: none` también la saca del árbol de accesibilidad, el lector de pantalla
 * solo encuentra una.
 *
 * En móvil baja a 44 px y en el margen sube a 56. La cifra más ancha de hoy es
 * «25 % → 40 %», de «Arábica y robusta», y medida en el navegador ocupa **395 px de
 * los 400 del margen**; la siguiente, «701 – 900 µm», 384. Caben, pero sin holgura: la
 * cifra no se parte, así que **una más larga se sale del margen y hay que medirla
 * antes de publicarla**. La salida, si llega, es bajar el cuerpo de todas las cifras
 * del margen, no ensanchar la columna, que es la retícula de toda la página.
 *
 * El texto pequeño va todo en `coffee`: en el diseño la etiqueta y la fuente son una
 * sola línea de pie. Aquí se conservan las tres partes del contenido —etiqueta, nota y
 * fuente— porque la nota es la letra pequeña del dato y no se puede perder.
 */
export function Stat({
  block,
  placement,
}: {
  block: Extract<ArticleBlock, { kind: "stat" }>;
  placement: "margin" | "inline";
}) {
  const margin = placement === "margin";

  return (
    <figure className={margin ? "" : "pt-2"}>
      {/* La cifra no se parte nunca: «701 – 900 µm» partida por sus espacios deja de
          leerse como un rango. Lo que se estrecha es el texto de debajo. */}
      <p
        className={`font-mono leading-none tracking-[-0.04em] whitespace-nowrap text-ink ${
          margin ? "text-[56px]" : "text-[44px]"
        }`}
      >
        {block.value}
      </p>

      <figcaption
        className={`mt-2 text-[13px] leading-normal text-coffee ${
          margin ? "w-60" : ""
        }`}
      >
        <p>{block.label}</p>

        {block.note ? <p className="mt-2">{withEmphasis(block.note)}</p> : null}

        {block.source ? (
          <p className="mt-2 font-mono text-[11px] tracking-[0.1em]">
            {block.source}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

/**
 * Cada orientación trae su marco y su sitio dentro de la columna de contenido.
 *
 * La apaisada ocupa la columna entera. La vertical es pequeña, como el recuadro de los
 * finos del diseño: 240 px en escritorio y 200 en móvil, donde además se arrima a la
 * derecha —la «imagen descentrada» del diseño— para que no quede una torre pegada al
 * margen izquierdo justo debajo del texto.
 *
 * La vertical va en 4:5 porque es la proporción que dibuja el diseño. Si la foto no la
 * tiene, `object-cover` recorta los bordes; por eso conviene que la vertical sea una
 * foto sin nada importante cerca del borde, como una textura.
 */
const IMAGE_SHAPES = {
  landscape: {
    figure: "",
    frame: "aspect-[3/2] w-full",
    sizes: "(min-width: 1280px) 60vw, 100vw",
  },
  portrait: {
    figure: "flex flex-col items-end xl:items-start",
    frame: "aspect-[4/5] w-50 xl:w-60",
    sizes: "240px",
  },
} as const;

/**
 * La fotografía del artículo, dentro de la columna de su apartado.
 *
 * El artículo declara la ruta de la foto aunque el archivo no exista todavía, y
 * `resolveContentImage` mira en la compilación si está: mientras no esté se pinta el
 * bloque de color con su proporción, así que la página nunca pide una imagen que no
 * hay. Para publicarla basta con guardar el archivo en /public/images/granos/ con el
 * nombre que dice el artículo; ni este archivo ni el del contenido hay que tocarlos.
 *
 * Esto obliga a que este módulo se quede en el servidor, que es donde se genera el
 * sitio: el único bloque que baja al navegador es `Scale`, y vive en su propio archivo.
 */
function ArticleImage({
  block,
}: {
  block: Extract<ArticleBlock, { kind: "image" }>;
}) {
  const shape = IMAGE_SHAPES[block.shape];
  const image = resolveContentImage(block.image);

  return (
    <figure className={`pt-2 ${shape.figure}`}>
      {image.src ? (
        <div className={`relative ${shape.frame} overflow-hidden bg-dust`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={shape.sizes}
            className="object-cover"
          />
        </div>
      ) : (
        <div className={`${shape.frame} bg-dust`} aria-hidden="true" />
      )}

      {/*
        Aquí el crédito va pegado a la foto y no agrupado al pie de la página, al revés
        que en /metodos. Es la regla del sitio: acompaña a la foto cuando la foto se
        mira —y esta se mira, es un respiro a media lectura y ya tiene pie—, y se agrupa
        abajo cuando la foto solo sirve para reconocer algo.

        Solo se acredita lo que se ve: si el archivo todavía no está, no se ha pedido
        nada a Pexels y no hay a quién acreditar.
      */}
      {block.caption || image.src ? (
        <figcaption className="mt-3 max-w-[46ch] text-[13px] leading-normal text-coffee">
          {block.caption ? withEmphasis(block.caption) : null}
          {image.src ? <PhotoCreditLine credit={image.credit} /> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Cuánto entra cada línea de la cita escalonada, en el orden del diseño. Se repite si
 * la frase tiene más de cuatro líneas.
 */
const QUOTE_STEPS = ["", "xl:pl-24", "xl:pl-10", "xl:pl-50"] as const;

/**
 * La frase suelta, como la cita escalonada del diseño: una franja propia con filete de
 * `dust`, la letra en `ink` a 88 px y cada línea entrando a una distancia distinta.
 *
 * Los cortes de línea los decide quien escribe la frase, con un salto de línea (`\n`)
 * en el texto: dónde se parte una frase es parte de lo que dice —«es un / reparto.»— y
 * no se puede dejar a lo que mida la pantalla. En móvil los saltos no se respetan y la
 * frase corre seguida a 40 px, como en el diseño de móvil, porque a 375 px una línea
 * escalonada de 88 px no cabe.
 *
 * Hoy las frases de todos los artículos están vacías —las escribe Juan— y una frase
 * vacía no se pinta: ver `splitIntoSections`.
 */
export function PullQuote({
  block,
}: {
  block: Extract<ArticleBlock, { kind: "pullquote" }>;
}) {
  if (!block.text.trim()) return null;

  const lines = block.text.split("\n");

  return (
    <figure className="border-t border-dust pt-8 pb-14 xl:pt-14 xl:pb-24 xl:pl-110">
      <blockquote className="font-display text-[40px] leading-[1.05] tracking-[-0.01em] text-ink xl:text-[88px] xl:leading-none xl:tracking-[-0.02em]">
        {lines.map((line, index) => (
          <span
            key={index}
            className={`xl:block ${QUOTE_STEPS[index % QUOTE_STEPS.length]}`}
          >
            {withEmphasis(line)}
            {index < lines.length - 1 ? " " : null}
          </span>
        ))}
      </blockquote>

      {block.attribution ? (
        <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-coffee">
          {block.attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Dibuja un bloque dentro de la columna de contenido de su apartado. El espacio entre
 * bloques lo pone la columna y no cada bloque, que es lo que hace el diseño: un hueco
 * fijo entre piezas y el cambio de ritmo de verdad entre apartados, en el filete.
 */
export function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="max-w-[620px] text-base leading-[1.7] text-ink md:text-lg">
          {withEmphasis(block.text)}
        </p>
      );

    // Los títulos no se pintan aquí: cada uno abre su apartado y va al margen como
    // rótulo numerado. Ver `splitIntoSections`.
    case "heading":
      return null;

    case "comparison":
      return <Comparison block={block} />;

    // En escritorio la cifra se va al margen; aquí queda la copia del hilo del texto,
    // que solo se ve en móvil.
    case "stat":
      return (
        <div className="xl:hidden">
          <Stat block={block} placement="inline" />
        </div>
      );

    case "image":
      return <ArticleImage block={block} />;

    // Una frase con texto va en su propia franja y no llega aquí; una vacía no se pinta.
    case "pullquote":
      return null;

    // El único bloque que se dibuja en el navegador. Todo lo demás de esta página
    // sigue siendo estático: aquí solo se entra a `"use client"` porque hay algo que
    // hay que poder mover o pulsar. El hueco de arriba lo pone la columna, así que se
    // le quita el suyo.
    case "scale":
      return (
        <div className="*:mt-0 *:md:mt-0">
          <Scale {...block} />
        </div>
      );
  }
}
