import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/app/eyebrow";
import { formatDate } from "@/app/date";
import { withEmphasis } from "@/app/emphasis";
import { getArticle } from "@/content/granos";
import { getBrewMethod } from "@/content/metodos";
import {
  GLOSSARY_CATEGORY_LABELS,
  glossaryByLetter,
  glossaryEntries,
  glossaryTermCount,
  resolveGlossaryEntry,
} from "@/content/glosario";
import type {
  GlossaryCategory,
  GlossaryEntry,
  GlossaryLink,
  GlossaryTerm,
} from "@/content/glosario";
import type { Source } from "@/content/types";

export const metadata: Metadata = {
  title: "Glosario",
  description:
    "Las palabras del café: lo que dice la bolsa, lo que se oye en la barra, lo que pone la carta y lo que piden las recetas, cada una en una frase.",
};

/*
 * El filtro funciona sin JavaScript.
 *
 * Son botones de opción de verdad (`<input type="radio">`) escondidos detrás de sus
 * etiquetas, y lo que se ve u oculta lo decide el CSS preguntando cuál está marcado:
 * `group-has-[#filtro-barra:checked]/glosario:hidden` quiere decir «escóndete si dentro
 * del glosario está marcado Barra». Así la página sigue siendo estática como el resto
 * del sitio, el filtro responde aunque el JavaScript no haya llegado y el teclado y el
 * lector de pantalla lo manejan como lo que es, un grupo de opciones.
 *
 * Las clases van escritas enteras, una por categoría, y no armadas con plantillas,
 * porque Tailwind las busca en el código tal como están escritas: una clase compuesta
 * al vuelo no llegaría a existir en el CSS.
 */
const HIDE_WHEN: Record<GlossaryCategory, string> = {
  bolsa: "group-has-[#filtro-bolsa:checked]/glosario:hidden",
  barra: "group-has-[#filtro-barra:checked]/glosario:hidden",
  carta: "group-has-[#filtro-carta:checked]/glosario:hidden",
  receta: "group-has-[#filtro-receta:checked]/glosario:hidden",
};

const SHOW_WHEN: Record<GlossaryCategory, string> = {
  bolsa: "hidden group-has-[#filtro-bolsa:checked]/glosario:inline",
  barra: "hidden group-has-[#filtro-barra:checked]/glosario:inline",
  carta: "hidden group-has-[#filtro-carta:checked]/glosario:inline",
  receta: "hidden group-has-[#filtro-receta:checked]/glosario:inline",
};

const CATEGORIES = Object.keys(GLOSSARY_CATEGORY_LABELS) as GlossaryCategory[];

/**
 * Las clases que esconden algo cuando el filtro marcado no es ninguna de sus
 * categorías. Un término sin categoría se esconde con cualquiera de las cuatro, que es
 * lo que se decidió: solo sale con «Todas».
 */
function hiddenUnless(categories: GlossaryCategory[]): string {
  return CATEGORIES.filter((category) => !categories.includes(category))
    .map((category) => HIDE_WHEN[category])
    .join(" ");
}

/** Las categorías que se ven en una entrada: las suyas o, si remite, las de su destino. */
function categoriesOf(entry: GlossaryEntry): GlossaryCategory[] {
  return resolveGlossaryEntry(entry).categories;
}

/** A dónde lleva «Se cuenta en» y cómo se llama esa página. */
function resolveLink(link: GlossaryLink): { href: string; label: string } {
  if (link.kind === "articulo") {
    // index.ts revienta al compilar si el artículo no existe.
    return { href: `/granos/${link.slug}`, label: getArticle(link.slug)!.title };
  }
  return { href: `/metodos/${link.slug}`, label: getBrewMethod(link.slug)!.name };
}

const MONO_LABEL = "font-mono text-[11px] uppercase tracking-[0.1em]";

/*
 * Las anclas tienen que quedar por debajo de la cabecera, que en escritorio va
 * pegada arriba. En móvil la cabecera no es pegajosa y basta con un respiro.
 */
const ANCHOR_OFFSET = "scroll-mt-6 md:scroll-mt-32";

/**
 * Una definición. En escritorio son tres columnas —la palabra, la frase y, a la
 * derecha, dónde se la encuentra y dónde se cuenta entera—; en móvil, todo apilado.
 */
function TermEntry({ entry }: { entry: GlossaryTerm }) {
  const link = entry.readMore ? resolveLink(entry.readMore) : null;

  return (
    <article
      id={entry.slug}
      className={`group/entrada flex flex-col gap-3 border-b border-dust py-6 lg:grid lg:grid-cols-[340px_minmax(0,1fr)_240px] lg:gap-12 lg:py-7 ${ANCHOR_OFFSET} ${hiddenUnless(entry.categories)}`}
    >
      <div>
        <h3 className="font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-ink group-target/entrada:text-lavender-deep lg:text-[40px]">
          {entry.term}
        </h3>
        {entry.note ? (
          <p className={`mt-1.5 ${MONO_LABEL} text-coffee`}>{withEmphasis(entry.note)}</p>
        ) : null}
      </div>

      <p className="max-w-[62ch] text-base leading-[1.6] text-coffee lg:text-lg lg:leading-[1.65]">
        {withEmphasis(entry.definition)}
      </p>

      {/*
        Puede quedarse vacía —un término sin categoría y sin página que lo cuente no
        existe, pero uno sin categoría sí—, y se deja vacía en vez de rellenarla: la
        columna existe para que las definiciones de todas las filas empiecen en el
        mismo sitio.
      */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:flex-col lg:items-start lg:gap-4">
        {entry.categories.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Dónde la vas a ver">
            {entry.categories.map((category) => (
              <li
                key={category}
                className={`border border-dust px-2 py-0.5 ${MONO_LABEL} text-sage-deep`}
              >
                {GLOSSARY_CATEGORY_LABELS[category]}
              </li>
            ))}
          </ul>
        ) : null}

        {link ? (
          <p className="flex flex-col gap-0.5">
            <span className={`${MONO_LABEL} text-coffee`}>Se cuenta en</span>
            <Link
              href={link.href}
              className="text-sm text-lavender-deep underline underline-offset-4 hover:text-ink"
            >
              {link.label} ↗
            </Link>
          </p>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Una remisión: la palabra que se oye, que manda a la que usa el sitio. Ocupa una fila
 * como cualquier otra, para que quien la busque por su letra la encuentre donde la
 * busca, pero no repite la definición: la deja donde vive.
 */
function RedirectEntry({ entry }: { entry: GlossaryEntry & { kind: "redirect" } }) {
  const target = resolveGlossaryEntry(entry);

  return (
    <article
      id={entry.slug}
      className={`group/entrada flex flex-col gap-3 border-b border-dust py-6 lg:grid lg:grid-cols-[340px_minmax(0,1fr)_240px] lg:gap-12 lg:py-7 ${ANCHOR_OFFSET} ${hiddenUnless(target.categories)}`}
    >
      <h3 className="font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-ink group-target/entrada:text-lavender-deep lg:text-[40px]">
        {entry.term}
      </h3>

      <div>
        <p className="max-w-[62ch] text-base leading-[1.6] text-coffee lg:text-lg lg:leading-[1.65]">
          {withEmphasis(entry.note)}
        </p>
        <a
          href={`#${target.slug}`}
          className="mt-2 inline-block text-base text-lavender-deep underline underline-offset-4 hover:text-ink"
        >
          Ver «{target.term}» ↓
        </a>
      </div>
    </article>
  );
}

/**
 * Las fuentes de fuera, juntas al final: los diccionarios y el folleto del instituto
 * italiano del espresso. Las definiciones que
 * resumen una página del sitio no listan nada aquí porque su respaldo es esa página,
 * que ya lleva sus fuentes.
 */
function Sources({ sources }: { sources: Source[] }) {
  return (
    <section className="mt-24 grid gap-5 border-t border-ink pt-4 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-12">
      <h2 className={`${MONO_LABEL} text-ink`}>De dónde salen las definiciones</h2>

      <div className="flex flex-col gap-5">
        <p className="max-w-[62ch] text-base leading-[1.6] text-coffee">
          Las que resumen un artículo o una ficha del sitio llevan sus fuentes en esa
          página. Las demás salen de estos documentos:
        </p>

        <ul className="flex max-w-[620px] flex-col gap-5">
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
      </div>
    </section>
  );
}

/**
 * Una franja que se desliza de lado en móvil y en tableta, y que en escritorio se
 * queda quieta. Se sale por el margen derecho hasta el borde de la pantalla a
 * propósito: el último elemento llega cortado, y eso es lo que avisa de que hay más.
 * Si terminara limpio antes del borde, parecería que no hay nada que deslizar.
 */
const STRIP =
  "-mr-6 flex items-center gap-2 overflow-x-auto pr-6 [scrollbar-width:none] md:-mr-16 md:pr-16 lg:mr-0 lg:flex-wrap lg:overflow-visible lg:pr-0";

export default function GlosarioPage() {
  const groups = glossaryByLetter();
  const total = glossaryTermCount();

  const terms = glossaryEntries().filter(
    (entry): entry is GlossaryTerm => entry.kind === "term",
  );
  const countIn = (category: GlossaryCategory) =>
    terms.filter((term) => term.categories.includes(category)).length;

  const sources = [
    ...new Map(terms.flatMap((term) => term.sources).map((s) => [s.url, s])).values(),
  ].sort((a, b) => a.title.localeCompare(b.title, "es"));

  return (
    <main className="group/glosario px-6 pb-24 md:px-16 md:pb-30">
      <header className="flex flex-col gap-4 pt-16 pb-8 md:pt-24 lg:flex-row lg:items-end lg:gap-12 lg:pb-14">
        <div className="min-w-0 flex-1">
          <Eyebrow tone="lavender">Glosario · {total} términos</Eyebrow>
          {/*
            Equilibrado y no cortado a mano: a 1440 px la frase entera mide unos 920 px
            y la columna 884, así que sin equilibrar se partía en «Las palabras del /
            café», con la palabra que importa sola abajo. Equilibrada corta en «Las
            palabras / del café» en los dos anchos.
          */}
          <h1 className="mt-4 font-display text-5xl leading-none tracking-[-0.015em] text-balance text-ink lg:text-8xl lg:leading-[0.96] lg:tracking-[-0.025em]">
            Las palabras del café
          </h1>
        </div>

        <p className="text-base leading-[1.6] text-coffee lg:w-95 lg:shrink-0 lg:text-lg lg:leading-[1.65]">
          Lo que dice la bolsa, lo que se oye en la barra, lo que pone la carta y lo que
          piden las recetas. Cada palabra en una frase, y dónde se cuenta entera.
        </p>
      </header>

      <div className="flex flex-col gap-4 border-t-2 border-ink pt-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
        <nav aria-label="Índice alfabético" className={STRIP}>
          {groups.map(({ letter, entries }) => (
            <a
              key={letter}
              href={`#letra-${letter.toLowerCase()}`}
              className={`shrink-0 px-1.5 py-1.5 font-mono text-base text-lavender-deep hover:underline ${hiddenUnless(
                [...new Set(entries.flatMap(categoriesOf))],
              )}`}
            >
              {letter}
            </a>
          ))}
        </nav>

        <div role="radiogroup" aria-labelledby="filtro-rotulo" className={STRIP}>
          <p id="filtro-rotulo" className={`mr-1 shrink-0 ${MONO_LABEL} text-coffee`}>
            Dónde la viste
          </p>

          {[
            { id: "filtro-todas", label: "Todas" },
            ...CATEGORIES.map((category) => ({
              id: `filtro-${category}`,
              label: GLOSSARY_CATEGORY_LABELS[category],
            })),
          ].map(({ id, label }) => (
            /*
              `relative` no es decorativo. El botón de opción va escondido con
              `sr-only`, que lo posiciona en absoluto; sin un contenedor posicionado se
              coloca respecto a la página entera, y los de los filtros que quedan
              fuera de la franja, a la derecha, ensanchaban la página en móvil hasta
              478 px aunque nada se viera desbordar.
            */
            <div key={id} className="relative shrink-0">
              <input
                type="radio"
                name="filtro"
                id={id}
                defaultChecked={id === "filtro-todas"}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={`block cursor-pointer border border-ink px-3 py-2 ${MONO_LABEL} text-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lavender-deep`}
              >
                {label}
              </label>
            </div>
          ))}
        </div>

        {/*
          Cuántos quedan con el filtro puesto. Son cinco frases escritas de antemano y
          se ve la que corresponde; con «Todas» sale la cuenta entera.
        */}
        <p className={`${MONO_LABEL} text-coffee lg:basis-full`} aria-live="polite">
          <span
            className={CATEGORIES.map((category) => HIDE_WHEN[category]).join(" ")}
          >
            {total} términos
          </span>
          {CATEGORIES.map((category) => (
            <span key={category} className={SHOW_WHEN[category]}>
              {countIn(category)} de {total} términos · {GLOSSARY_CATEGORY_LABELS[category]}
            </span>
          ))}
        </p>
      </div>

      {groups.map(({ letter, entries }) => (
        <section
          key={letter}
          id={`letra-${letter.toLowerCase()}`}
          aria-labelledby={`letra-${letter.toLowerCase()}-rotulo`}
          className={`mt-12 ${ANCHOR_OFFSET} ${hiddenUnless(
            [...new Set(entries.flatMap(categoriesOf))],
          )}`}
        >
          {/*
            La letra va pequeña y en mono, como los rótulos del resto del sitio: lo
            primero que tiene que saltar a la vista es la palabra, no la letra con la
            que empieza.
          */}
          <h2
            id={`letra-${letter.toLowerCase()}-rotulo`}
            className={`w-40 border-b border-ink pb-2 ${MONO_LABEL} text-coffee`}
          >
            {letter}
          </h2>

          {entries.map((entry) =>
            entry.kind === "term" ? (
              <TermEntry key={entry.slug} entry={entry} />
            ) : (
              <RedirectEntry key={entry.slug} entry={entry} />
            ),
          )}
        </section>
      ))}

      <Sources sources={sources} />
    </main>
  );
}
