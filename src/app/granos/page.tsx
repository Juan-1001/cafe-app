import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/app/eyebrow";
import { articles, articlesByJourney } from "@/content/granos";
import type { Article, JourneyStageInfo } from "@/content/granos";
import { readingMinutes, readingTimesVary } from "@/content/granos/reading-time";
import { articleCover } from "./cover";
import { PhotoCredits } from "@/app/photo-credits";
import { MetaPills } from "./meta";

export const metadata: Metadata = {
  title: "Granos",
  description:
    "Artículos sobre lo que le pasa al café antes de prepararlo: la planta, el proceso en la finca y el tueste.",
};

/**
 * El número enorme de la etapa y su nombre. Es lo que hace de esta lista un recorrido y
 * no una lista: cada fila empieza diciendo en qué punto del viaje está.
 *
 * En escritorio es una columna estrecha a la izquierda de la fila; en móvil, una línea
 * que abre la entrada con la flecha al final. Son dos composiciones del mismo dato y
 * solo se ve una: la otra está fuera con `hidden`.
 */
function StageMark({ stage }: { stage: JourneyStageInfo }) {
  return (
    <>
      <div className="flex items-center gap-3 lg:hidden">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-coffee">
          Etapa
        </p>
        <p className="font-mono text-[40px] leading-none tracking-[-0.04em] text-ink">
          {stage.number}
        </p>
        <p className="min-w-0 flex-1 font-mono text-[11px] leading-normal uppercase tracking-[0.1em] text-coffee">
          {stage.title}
        </p>
        <Arrow className="text-[28px]" />
      </div>

      <div className="hidden w-33 shrink-0 flex-col gap-2 font-mono lg:flex">
        <p className="text-[11px] uppercase tracking-[0.1em] text-coffee">Etapa</p>
        <p className="text-[64px] leading-none tracking-[-0.04em] text-ink">
          {stage.number}
        </p>
        <p className="text-[11px] leading-normal uppercase tracking-[0.1em] text-coffee">
          {stage.title}
        </p>
      </div>
    </>
  );
}

/** La flecha de «esto se abre». Es un adorno: lo que se anuncia es el título. */
function Arrow({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`shrink-0 leading-none text-lavender-deep ${className}`}>
      ↗
    </span>
  );
}

/**
 * Una entrada del índice: la etapa, la foto, el artículo y la flecha, en una fila en
 * escritorio y apiladas en móvil. La fila entera es el enlace.
 *
 * La foto es la del propio artículo (ver `articleCover`). Mientras su archivo no esté
 * en /public se pinta el bloque de color con la misma proporción, así que la fila no
 * cambia de forma el día que llega la foto.
 *
 * Desde `lg` y no antes: la fila necesita 132 px de etapa, 300 de foto y los huecos, y
 * por debajo de 1024 px al texto le quedarían menos de 300.
 */
function ArticleEntry({
  article,
  stage,
  showReadingTime,
}: {
  article: Article;
  stage: JourneyStageInfo;
  showReadingTime: boolean;
}) {
  const cover = articleCover(article);

  return (
    <li className="border-b border-dust">
      <Link
        href={`/granos/${article.slug}`}
        className="group flex flex-col gap-4 py-7 lg:flex-row lg:items-start lg:gap-10 lg:py-9"
      >
        <StageMark stage={stage} />

        <div className="relative aspect-[335/220] w-full shrink-0 overflow-hidden bg-dust lg:aspect-[3/2] lg:w-75">
          {cover?.src ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 300px, 100vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-4">
          <h3 className="font-display text-[32px] leading-[1.1] tracking-[-0.01em] text-ink group-hover:text-lavender-deep lg:text-[44px] lg:leading-[1.05]">
            {article.title}
          </h3>

          <p className="max-w-[62ch] text-base leading-[1.6] text-coffee lg:text-[17px]">
            {article.tagline}
          </p>

          <div className="lg:pt-2">
            <MetaPills
              level={article.level}
              minutes={showReadingTime ? readingMinutes(article) : undefined}
            />
          </div>
        </div>

        <Arrow className="hidden text-4xl lg:block" />
      </Link>
    </li>
  );
}

export default function GranosPage() {
  // El orden del recorrido, aplanado: cada fila ya dice su etapa, así que no hace falta
  // un rótulo por grupo. Dentro de una etapa manda el orden editorial de `articles`.
  const entries = articlesByJourney().flatMap(({ stage, articles: group }) =>
    group.map((article) => ({ article, stage })),
  );
  const showReadingTime = readingTimesVary(articles);

  return (
    <div className="px-6 pb-24 md:px-16 md:pb-30">
      <header className="pt-16 pb-8 md:pt-24 lg:flex lg:items-end lg:gap-12 lg:pb-14">
        <div className="min-w-0 flex-1">
          <Eyebrow tone="lavender">Granos · {articles.length} artículos</Eyebrow>

          {/*
            Sin ancho máximo: la línea la corta la columna. A 1440 px corta donde el
            diseño, «Todo lo que le pasa / al grano», porque la primera mitad mide
            807 px y la columna 869; más estrecho, se parte antes y está bien.
          */}
          <h1 className="mt-4 font-display text-5xl leading-none tracking-[-0.015em] text-ink lg:text-8xl lg:leading-[0.96] lg:tracking-[-0.025em]">
            Todo lo que le pasa al grano
          </h1>
        </div>

        <p className="mt-4 text-base leading-[1.6] text-coffee lg:mt-0 lg:w-95 lg:shrink-0 lg:text-lg lg:leading-[1.65]">
          Antes de que el agua lo toque, el café ya recorrió cuatro etapas. Léalas en
          orden o salte a la que le interese.
        </p>
      </header>

      {/*
        La pestaña del diseño. Hoy es la única y no se puede pulsar: no hay otra vista
        a la que cambiar, y un botón que no hace nada es peor que un rótulo. Por eso es
        el título de la lista que viene debajo, dibujado como pestaña.
      */}
      <div className="border-b-2 border-ink">
        <h2 className="inline-block bg-ink px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-paper lg:px-5 lg:py-4 lg:text-xs">
          El recorrido completo
        </h2>
      </div>

      <ul>
        {entries.map(({ article, stage }) => (
          <ArticleEntry
            key={article.slug}
            article={article}
            stage={stage}
            showReadingTime={showReadingTime}
          />
        ))}
      </ul>

      {/* Las fotos de las filas solo sirven para reconocer cada artículo, así que su
          crédito va agrupado al pie y no bajo cada una: es la regla del sitio. */}
      <PhotoCredits
        images={entries.flatMap(({ article }) => articleCover(article) ?? [])}
      />
    </div>
  );
}
