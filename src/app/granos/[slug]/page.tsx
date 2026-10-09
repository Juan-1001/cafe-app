import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticle, JOURNEY_STAGES } from "@/content/granos";
import type { Article, Source } from "@/content/granos";
import { readingMinutes } from "@/content/granos/reading-time";
import { resolveContentImage } from "@/content/image";
import { formatDate } from "@/app/date";
import { Block, PullQuote, Stat } from "../blocks";
import { splitIntoSections, type ArticleSection } from "../sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/granos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} · Granos`,
    description: article.tagline,
  };
}

/**
 * La retícula del artículo en escritorio: un margen fijo de 400 px a la izquierda para
 * los rótulos y las cifras, y el contenido en el resto.
 *
 * Empieza en `xl` (1280 px) y no antes por la cifra más ancha del margen: «25 % → 40 %»
 * a 56 px mide 395 px y necesita los 400 enteros (ver `Stat`). Con el margen fijo, a
 * 1280 px el contenido se queda en unos 710, y todavía caben los 620 del párrafo; por
 * debajo, el párrafo se estrecharía antes que el margen. Entre 768 y 1280 la página es
 * la de móvil con la letra del tamaño de escritorio.
 */
const GRID = "xl:grid xl:grid-cols-[400px_minmax(0,1fr)] xl:gap-x-10";

/**
 * El rótulo de mono que abre cada franja. Es el mismo en la portada, en los apartados y
 * en las fuentes: en el diseño, cualquier cosa que vaya en el margen habla con esta voz.
 */
const LABEL =
  "font-mono text-[10px] uppercase tracking-[0.1em] text-ink xl:text-[11px] xl:leading-[1.6]";

/**
 * Cada franja abre con un filete de `ink` de un píxel. Es el corte entre apartados: el
 * diseño no separa con espacio en blanco más grande, separa con esta línea.
 */
const BAND = "border-t border-ink pt-4 pb-14 xl:pt-5 xl:pb-24";

/**
 * El rastro de navegación. El diseño lo pinta entero en `lavender-deep`, también la
 * página actual, que no es enlace: `aria-current` dice que es esta y el separador se
 * esconde de los lectores de pantalla porque leído en voz alta solo estorba.
 */
function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Ruta">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em] text-lavender-deep">
        <li>
          <Link href="/granos" className="hover:text-ink">
            Granos
          </Link>
        </li>

        <li aria-hidden="true">/</li>

        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}

/**
 * La ficha del artículo: en qué etapa ocurre, el nivel y cuánto se tarda en leerlo.
 *
 * Tiene dos formas porque el diseño la compone distinto en cada ancho. En escritorio son
 * tres líneas al pie del margen, con el nombre de la etapa en letra de texto; en móvil,
 * dos líneas de mono bajo la entradilla. Solo se ve una a la vez, y la otra está fuera
 * del árbol de accesibilidad con `hidden`.
 */
function Ficha({
  stage,
  level,
  minutes,
}: {
  stage?: (typeof JOURNEY_STAGES)[number];
  level: string;
  minutes: number;
}) {
  const meta = `${level} · ${minutes} min de lectura`;

  return (
    <>
      <div className="flex flex-col gap-1 pt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-coffee xl:hidden">
        {stage ? (
          <p>
            Etapa {stage.number} · {stage.title}
          </p>
        ) : null}
        <p>{meta}</p>
      </div>

      <div className="hidden flex-col gap-1.5 xl:flex">
        {stage ? (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-coffee">
              Etapa {stage.number}
            </p>
            <p className="text-sm text-ink">{stage.title}</p>
          </>
        ) : null}
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-coffee">
          {meta}
        </p>
      </div>
    </>
  );
}

/**
 * La portada: el titular enorme a la derecha y, en el margen, el rastro arriba y la
 * ficha abajo. El margen se estira hasta el alto del titular para que la ficha caiga
 * al pie, que es donde el diseño la deja.
 *
 * El titular baja de 168 a 64 px en móvil. En Fraunces el sitio mide más que en Figma
 * (ver «Pendientes conocidos» en CLAUDE.md), así que los títulos largos se parten en
 * más líneas que en el diseño; se deja que se partan antes que achicar la letra.
 */
function Cover({ article }: { article: Article }) {
  const stage = JOURNEY_STAGES.find((item) => item.key === article.stage);

  return (
    <header className={`${BAND} ${GRID}`}>
      <div className="flex flex-col gap-5 xl:justify-between">
        <Breadcrumb title={article.title} />

        <div className="hidden xl:block">
          <Ficha
            stage={stage}
            level={article.level}
            minutes={readingMinutes(article)}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5 xl:mt-0 xl:gap-7">
        <h1 className="font-display text-[64px] leading-[0.95] tracking-[-0.02em] text-ink md:text-8xl xl:text-[168px] xl:leading-[0.92] xl:tracking-[-0.04em]">
          {article.title}
        </h1>

        <p className="max-w-[740px] font-display text-[21px] leading-[1.35] text-ink md:text-[30px] md:leading-[1.3]">
          {article.tagline}
        </p>

        <div className="xl:hidden">
          <Ficha
            stage={stage}
            level={article.level}
            minutes={readingMinutes(article)}
          />
        </div>
      </div>
    </header>
  );
}

/**
 * Un apartado del artículo. El título es un `h2` de verdad aunque se vea como un rótulo
 * pequeño: el esquema de la página tiene que seguir diciendo dónde empieza cada parte,
 * y eso no lo decide el tamaño de la letra.
 *
 * En escritorio el rótulo y las cifras van en el margen y el contenido a la derecha. En
 * móvil todo cae en una columna, en el orden del contenido.
 */
function Section({
  section,
}: {
  section: Extract<ArticleSection, { kind: "section" }>;
}) {
  return (
    <section className={`${BAND} ${GRID}`}>
      <div className="flex flex-col gap-8">
        {section.heading ? (
          <h2 className={`${LABEL} xl:max-w-[24ch]`}>
            {section.number} · {section.heading}
          </h2>
        ) : null}

        {section.stats.length > 0 ? (
          <div className="hidden flex-col gap-12 pt-30 xl:flex">
            {section.stats.map((stat, index) => (
              <Stat key={index} block={stat} placement="margin" />
            ))}
          </div>
        ) : null}
      </div>

      <div
        className={`flex min-w-0 flex-col gap-5 md:gap-6 ${
          section.heading ? "mt-5 xl:mt-0" : ""
        }`}
      >
        {section.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>
    </section>
  );
}

/**
 * Las fuentes, con su rótulo en el margen como un apartado más. Cada una lleva la fecha
 * en la que se consultó, porque los enlaces se rompen y las cifras se actualizan: sin
 * fecha no se puede saber si lo que dice el artículo sigue siendo lo que dice la fuente.
 * El diseño enseña solo el enlace; la fecha y quién la publica se quedan debajo, en
 * pequeño, porque son parte del dato y no adorno.
 */
function Sources({ sources }: { sources: Source[] }) {
  return (
    <section className={`border-t border-ink pt-4 pb-6 xl:pt-5 xl:pb-10 ${GRID}`}>
      <h2 className={LABEL}>De dónde salen los datos</h2>

      <ul className="mt-5 flex max-w-[620px] flex-col gap-5 xl:mt-0 xl:gap-6">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm leading-normal text-lavender-deep underline underline-offset-4 hover:text-ink"
            >
              {source.title}
            </a>

            <p className="mt-1 font-mono text-[11px] tracking-[0.05em] text-coffee">
              {source.publisher} · consultado el {formatDate(source.retrieved)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * El tamaño de cada tarjeta de «Sigue leyendo», por posición. Son los cuatro del
 * diseño, y no es una rejilla de tarjetas iguales a propósito: cada una mide distinto
 * y todas se alinean arriba, así que el pie de cada una cae a una altura diferente.
 *
 * `grow` es el ancho de escritorio y reparte la fila: con tres tarjetas en vez de
 * cuatro, la fila se sigue llenando entera con las mismas proporciones. `desktop` y
 * `mobile` son la proporción de la foto en cada ancho.
 */
const CARD_SHAPES = [
  { grow: "grow-[330]", desktop: "md:aspect-[330/300]", mobile: "aspect-[160/200]" },
  { grow: "grow-[280]", desktop: "md:aspect-[280/200]", mobile: "aspect-[160/150]" },
  { grow: "grow-[400]", desktop: "md:aspect-[400/360]", mobile: "aspect-[160/170]" },
  { grow: "grow-[274]", desktop: "md:aspect-[274/220]", mobile: "aspect-[160/220]" },
] as const;

/**
 * La foto de la tarjeta es la primera fotografía del propio artículo. No hay un campo de
 * portada: los artículos no lo tienen, y la primera foto es la que el artículo ya
 * eligió para enseñarse. Si no hay ninguna, o su archivo todavía no está, la tarjeta
 * pinta el bloque de color, como cualquier otra foto pendiente.
 */
function coverOf(article: Article) {
  const first = article.blocks.find((block) => block.kind === "image");
  return first?.kind === "image" ? resolveContentImage(first.image) : null;
}

function ReadNextCard({ article, index }: { article: Article; index: number }) {
  const shape = CARD_SHAPES[index % CARD_SHAPES.length];
  const stage = JOURNEY_STAGES.find((item) => item.key === article.stage);
  const cover = coverOf(article);

  return (
    <li className={`md:basis-0 ${shape.grow}`}>
      <Link href={`/granos/${article.slug}`} className="group flex flex-col gap-3.5">
        <div
          className={`relative w-full overflow-hidden bg-dust ${shape.mobile} ${shape.desktop}`}
        >
          {cover?.src ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1280px) 30vw, 50vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="flex items-start gap-2.5">
          {stage ? (
            <p
              aria-hidden="true"
              className="font-display text-[36px] leading-[0.9] tracking-[-0.02em] text-ink xl:text-[60px]"
            >
              {stage.number}.
            </p>
          ) : null}

          <div className="flex min-w-0 flex-col gap-0.5 pt-1">
            <p className="text-[13px] leading-[1.3] text-ink group-hover:text-lavender-deep xl:text-[15px]">
              {article.title}
            </p>
            {stage ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-coffee">
                {stage.title}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}

/**
 * Dónde está este artículo en el recorrido: la primera etapa, un filete y el punto en
 * la etapa de este artículo. El dibujo es un adorno para quien lo ve, así que el lector
 * de pantalla recibe la misma información dicha en una frase.
 */
function JourneyProgress({ stageKey }: { stageKey: Article["stage"] }) {
  const position = JOURNEY_STAGES.findIndex((stage) => stage.key === stageKey);
  const stage = JOURNEY_STAGES[position];
  const first = JOURNEY_STAGES[0];
  const last = JOURNEY_STAGES[JOURNEY_STAGES.length - 1];
  const isFirst = position === 0;
  const isLast = position === JOURNEY_STAGES.length - 1;

  return (
    <>
      <p className="sr-only">
        Este artículo es de la etapa {stage.number} de {last.number} del recorrido.
      </p>

      <div
        aria-hidden="true"
        className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.08em] xl:gap-3.5 xl:text-[11px]"
      >
        {isFirst ? null : (
          <>
            <span className="text-coffee">{first.number}</span>
            <span className="h-px flex-1 bg-coffee" />
          </>
        )}

        <span className="size-2 shrink-0 rounded-full bg-lavender-deep xl:size-2.5" />
        <span className="shrink-0 text-lavender-deep">
          {stage.number} · <span className="xl:hidden">Aquí</span>
          <span className="hidden xl:inline">Estás aquí</span>
        </span>

        {isLast ? null : (
          <>
            <span className="h-px flex-1 bg-coffee" />
            <span className="text-coffee">{last.number}</span>
          </>
        )}
      </div>
    </>
  );
}

/**
 * El cierre del artículo: los demás artículos de la sección, en el orden del recorrido.
 *
 * En móvil las tarjetas van en dos columnas y la segunda baja 48 px, como en el diseño;
 * desde 768 px, en una sola fila. La fila empieza antes que la retícula del margen
 * porque no depende de él, y a 1024 px las dos columnas de móvil daban tarjetas de
 * 440 × 550: más foto que cualquier otra de la página.
 *
 * El titular va antes de las tarjetas en el HTML —es el título de esta parte— y en
 * escritorio se coloca abajo a la derecha con la retícula, que es donde lo dibuja el
 * diseño.
 */
function ReadNext({ current }: { current: Article }) {
  const others = articles.filter((article) => article.slug !== current.slug);
  if (others.length === 0) return null;

  const columns = [
    others.filter((_, index) => index % 2 === 0),
    others.filter((_, index) => index % 2 === 1),
  ];

  return (
    <section className="flex flex-col gap-5 border-t border-ink pt-4 xl:grid xl:grid-cols-[auto_minmax(0,1fr)] xl:gap-x-10 xl:gap-y-7 xl:pt-5">
      <div className="xl:col-span-2">
        <JourneyProgress stageKey={current.stage} />
      </div>

      <h2 className="font-display text-[60px] leading-[0.95] tracking-[-0.02em] text-ink italic xl:col-start-2 xl:row-start-3 xl:justify-self-end xl:pt-6 xl:text-[150px] xl:tracking-[-0.04em]">
        Sigue leyendo
      </h2>

      {/* Móvil: dos columnas, la segunda más baja. */}
      <div className="flex gap-3.5 md:hidden">
        {columns.map((column, columnIndex) => (
          <ul
            key={columnIndex}
            className={`flex min-w-0 flex-1 flex-col gap-5.5 ${
              columnIndex === 1 ? "pt-12" : ""
            }`}
          >
            {column.map((article) => (
              <ReadNextCard
                key={article.slug}
                article={article}
                index={others.indexOf(article)}
              />
            ))}
          </ul>
        ))}
      </div>

      {/* Escritorio: una fila, cada tarjeta con su tamaño. */}
      <ul className="hidden items-start gap-5 md:flex xl:col-span-2 xl:row-start-2">
        {others.map((article, index) => (
          <ReadNextCard key={article.slug} article={article} index={index} />
        ))}
      </ul>

      <nav
        aria-label="Más de Granos"
        className="flex flex-col gap-3 pt-2 font-mono text-[11px] uppercase tracking-[0.1em] xl:col-start-1 xl:row-start-3 xl:flex-row xl:items-end xl:gap-7 xl:pt-0 xl:pb-6"
      >
        <Link href="/granos" className="text-ink underline underline-offset-4 hover:text-lavender-deep">
          Todo el recorrido
        </Link>
        <Link href="/granos" className="text-coffee hover:text-ink">
          Volver a Granos
        </Link>
      </nav>
    </section>
  );
}

export default async function ArticlePage({
  params,
}: PageProps<"/granos/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="px-6 pb-18 md:px-16 xl:pb-30">
      <Cover article={article} />

      {splitIntoSections(article.blocks).map((section, index) =>
        section.kind === "quote" ? (
          <PullQuote key={index} block={section.block} />
        ) : (
          <Section key={index} section={section} />
        ),
      )}

      {article.sources.length > 0 ? (
        <Sources sources={article.sources} />
      ) : null}

      <ReadNext current={article} />
    </article>
  );
}
