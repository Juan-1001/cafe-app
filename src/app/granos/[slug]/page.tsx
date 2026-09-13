import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticle, JOURNEY_STAGES } from "@/content/granos";
import type { Source } from "@/content/granos";
import { readingMinutes } from "@/content/granos/reading-time";
import { formatDate } from "@/app/date";
import { Block } from "../blocks";
import { MetaPills } from "../meta";

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
 * El rastro de navegación. Ocupa el sitio donde antes iba el rótulo de la etapa: dos
 * líneas en mono apiladas diciendo cosas parecidas competían entre sí, y el rastro
 * además repetía el titular palabra por palabra justo encima del titular. La etapa no
 * se pierde, baja a la línea de datos de la portada.
 *
 * El último nivel no es enlace porque es la página en la que ya estás. `aria-current`
 * lo dice de verdad, y el separador se esconde de los lectores de pantalla: es un
 * adorno visual y leído en voz alta solo estorba.
 */
function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Ruta">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest">
        <li>
          <Link href="/granos" className="text-lavender-deep hover:text-ink">
            Granos
          </Link>
        </li>

        <li aria-hidden="true" className="text-coffee">
          ›
        </li>

        <li aria-current="page" className="text-coffee">
          {title}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Las fuentes, al final y sin adornos. Se muestran con la fecha en la que se
 * consultaron porque los enlaces se rompen y las cifras se actualizan: sin fecha no
 * se puede saber si lo que dice el artículo sigue siendo lo que dice la fuente.
 */
function Sources({ sources }: { sources: Source[] }) {
  return (
    <section className="mt-28 border-t-2 border-ink px-6 pt-6 md:mt-40 md:px-16">
      <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
        De dónde salen los datos
      </h2>

      <ul className="mt-8 md:grid md:grid-cols-2 md:gap-x-16">
        {sources.map((source) => (
          <li key={source.url} className="border-t border-dust py-5">
            <p className="font-mono text-xs uppercase tracking-widest text-sage-deep">
              {source.publisher}
            </p>

            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block max-w-[52ch] text-base text-lavender-deep underline underline-offset-4"
            >
              {source.title}
            </a>

            <p className="mt-2 font-mono text-xs text-coffee">
              Consultado el {formatDate(source.retrieved)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ArticlePage({
  params,
}: PageProps<"/granos/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const stage = JOURNEY_STAGES.find((item) => item.key === article.stage);

  return (
    <article className="pb-24 md:pb-36">
      {/*
        La cabecera ocupa el ancho entero y el cuerpo no: el artículo empieza siendo
        una portada y se estrecha al entrar en el texto. Es lo que marca dónde
        empieza la lectura, sin necesidad de una línea que lo diga.
      */}
      {/*
        El filete grueso va abajo del todo y cierra la portada entera. Antes había uno
        fino a media cabecera, colgando de la línea de datos, y hacía el trabajo
        contrario: partía la portada en dos en vez de separarla del cuerpo.
        Es el mismo filete de `ink` que abre las fuentes al final, y esa es la idea: en
        un artículo, dos píxeles de `ink` significan siempre «aquí cambia el registro
        de lectura». Hace el papel que en la ficha de método hace la banda lavanda a
        sangre, que aquí se descartó.
      */}
      <header className="border-b-2 border-ink px-6 pt-16 pb-12 md:px-16 md:pt-24 md:pb-16">
        <Breadcrumb title={article.title} />

        <h1 className="mt-8 max-w-[16ch] font-display text-6xl leading-none md:mt-10 md:text-8xl">
          {article.title}
        </h1>

        <p className="mt-8 max-w-[52ch] text-lg text-coffee md:mt-10 md:text-xl">
          {article.tagline}
        </p>

        <div className="mt-10 md:mt-12">
          <MetaPills
            stage={stage?.title}
            level={article.level}
            minutes={readingMinutes(article)}
          />
        </div>
      </header>

      <div className="mt-16 px-6 md:mt-24 md:px-16">
        {article.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>

      {article.sources.length > 0 ? (
        <Sources sources={article.sources} />
      ) : null}

      <div className="mt-20 px-6 md:mt-28 md:px-16">
        <Link
          href="/granos"
          className="font-mono text-xs uppercase tracking-widest text-lavender-deep hover:text-ink"
        >
          ← Todos los artículos
        </Link>
      </div>
    </article>
  );
}
