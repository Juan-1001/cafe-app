import Image from "next/image";
import type { ArticleBlock, ComparisonRow } from "@/content/granos/types";
import { RoastScale } from "./roast-scale";

/**
 * Convierte los tramos entre asteriscos en itálica. Es el único marcado que admite el
 * texto de un artículo y está aquí por una necesidad concreta: los nombres
 * científicos y las variedades van en itálica por convención tipográfica, y eso no
 * merece un bloque propio pero tampoco se puede perder.
 *
 * Un asterisco suelto, sin pareja, se queda tal cual en el texto en vez de romper el
 * párrafo o comerse el resto de la frase.
 */
function withEmphasis(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, index) => {
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}

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
    <div className="mt-16 md:mt-24">
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
 * La cifra suelta. Se sale a la derecha de la columna de lectura a propósito: es el
 * bloque que rompe la retícula y el que hace que la página no se lea como un texto
 * corrido de principio a fin.
 *
 * El número va en `lavender` y eso solo vale porque es enorme; la etiqueta y la nota,
 * que son pequeñas, tienen que quedarse en `ink` y `coffee`.
 */
function Stat({ block }: { block: Extract<ArticleBlock, { kind: "stat" }> }) {
  return (
    <figure className="mt-16 border-t-2 border-lavender pt-6 md:mt-24 md:ml-[32%] md:max-w-[34ch]">
      {/* En móvil baja a 48 px: a 60 px, un valor como "25 % → 40 %" se sale de los
          375 px de ancho. Sigue muy por encima de los 24 px que exige el lavender. */}
      <p className="font-display text-5xl leading-none text-lavender md:text-7xl">
        {block.value}
      </p>

      <figcaption className="mt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-ink">
          {block.label}
        </p>

        {block.note ? (
          <p className="mt-3 text-sm text-coffee">{withEmphasis(block.note)}</p>
        ) : null}

        {block.source ? (
          <p className="mt-3 font-mono text-xs text-coffee">{block.source}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

/**
 * La fotografía del artículo. Se apoya en la mitad derecha y llega hasta el margen,
 * así que el texto que viene después vuelve a empezar a la izquierda y el salto se
 * nota: es lo que hace de respiro.
 *
 * Sin foto todavía se pinta el bloque de color con su proporción. Nunca se apunta a la
 * ruta de un archivo que no existe: la página se vería rota sin que el código lo diga.
 * Para publicarla, se guarda el archivo en /public/images/granos/ y se pone su ruta en
 * `image.src` dentro del artículo; aquí no hay nada que tocar.
 */
/**
 * Cada orientación trae su marco y su sitio. La proporción es la de la foto, así que
 * `object-cover` no llega a recortar nada; y la vertical arranca más a la derecha
 * porque si ocupara el mismo ancho que una apaisada saldría una torre de imagen.
 */
const IMAGE_SHAPES = {
  landscape: {
    frame: "aspect-[3/2]",
    offset: "md:ml-[38%]",
    sizes: "(min-width: 768px) 60vw, 100vw",
  },
  portrait: {
    frame: "aspect-[2/3]",
    offset: "md:ml-[52%]",
    sizes: "(min-width: 768px) 45vw, 100vw",
  },
} as const;

function ArticleImage({
  block,
}: {
  block: Extract<ArticleBlock, { kind: "image" }>;
}) {
  const shape = IMAGE_SHAPES[block.shape];

  return (
    <figure className={`mt-16 md:mt-24 ${shape.offset}`}>
      {block.image.src ? (
        <div
          className={`relative ${shape.frame} w-full overflow-hidden bg-dust`}
        >
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes={shape.sizes}
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={`${shape.frame} w-full bg-dust`}
          aria-hidden="true"
        />
      )}

      {block.caption ? (
        <figcaption className="mt-4 max-w-[46ch] text-sm text-coffee">
          {withEmphasis(block.caption)}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * La frase suelta. Es el único bloque que se queda pegado al margen izquierdo y en
 * cuerpo grande: entre una cifra volada a la derecha y una foto también a la derecha,
 * lo que rompe el ritmo de verdad es algo que vuelva al principio de la línea.
 *
 * Va en `sage`, el segundo acento, y no en el lavanda de las cifras, para que no se
 * lean como el mismo tipo de cosa. A 36 px cumple de sobra el contraste que pide el
 * texto grande; en pequeño, `sage` no valdría.
 */
function PullQuote({
  block,
}: {
  block: Extract<ArticleBlock, { kind: "pullquote" }>;
}) {
  // Frase todavía sin escribir: mejor que no exista a que deje un hueco en la página.
  if (!block.text.trim()) return null;

  return (
    <figure className="mt-20 max-w-[20ch] md:mt-28 md:max-w-[24ch]">
      <blockquote className="font-display text-4xl leading-tight text-sage md:text-6xl">
        {withEmphasis(block.text)}
      </blockquote>

      {block.attribution ? (
        <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-sage-deep">
          {block.attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Dibuja un bloque del cuerpo. Cada tipo trae su propio ancho y su propio espacio por
 * encima: así el artículo no cae en el ritmo vertical uniforme ni en la columna única
 * centrada, que son los dos antipatrones que más rápido delatan una página generada.
 */
export function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-coffee">
          {withEmphasis(block.text)}
        </p>
      );

    case "heading":
      return (
        <h2 className="mt-20 max-w-[22ch] font-display text-3xl leading-tight text-ink md:mt-28 md:text-5xl">
          {withEmphasis(block.text)}
        </h2>
      );

    case "comparison":
      return <Comparison block={block} />;

    case "stat":
      return <Stat block={block} />;

    case "image":
      return <ArticleImage block={block} />;

    case "pullquote":
      return <PullQuote block={block} />;

    // El único bloque que se dibuja en el navegador. Todo lo demás de esta página
    // sigue siendo estático: aquí solo se entra a `"use client"` porque hay un
    // deslizador que hay que poder mover.
    case "roastScale":
      return <RoastScale {...block} />;
  }
}
