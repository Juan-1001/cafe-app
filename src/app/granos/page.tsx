import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/app/eyebrow";
import { articles, articlesByJourney } from "@/content/granos";
import type { Article, JourneyStageInfo } from "@/content/granos";
import { readingMinutes, readingTimesVary } from "@/content/granos/reading-time";
import { MetaPills } from "./meta";

export const metadata: Metadata = {
  title: "Granos",
  description:
    "Artículos sobre lo que le pasa al café antes de prepararlo: la planta, el proceso en la finca y el tueste.",
};

/**
 * Una entrada del índice. El título del artículo es lo más grande de la página, por
 * encima del rótulo de su etapa: lo que el lector viene a elegir es el artículo, y la
 * etapa solo le dice dónde encaja.
 *
 * No lleva imagen. Los artículos todavía no tienen fotografía propia, y resolver esto
 * con un bloque de color por entrada daría una lista de rectángulos grises; la
 * composición se sostiene en la tipografía y en el hueco de la izquierda.
 */
function ArticleEntry({
  article,
  showReadingTime,
}: {
  article: Article;
  showReadingTime: boolean;
}) {
  return (
    <li className="border-t border-dust first:border-t-0">
      <Link href={`/granos/${article.slug}`} className="group block py-10 md:py-12">
        <h3 className="font-display text-4xl leading-none group-hover:text-lavender-deep md:text-6xl">
          {article.title}
        </h3>

        <p className="mt-5 max-w-[58ch] text-base text-coffee md:text-lg">
          {article.tagline}
        </p>

        {/*
          Sin la etapa: en esta página ya la dice el rótulo de la columna de al lado, y
          repetirla en cada entrada sería decir tres veces lo mismo en la misma franja
          de pantalla.
        */}
        <div className="mt-6">
          <MetaPills
            level={article.level}
            minutes={showReadingTime ? readingMinutes(article) : undefined}
          />
        </div>
      </Link>
    </li>
  );
}

/**
 * El rótulo de la etapa vive en una columna propia a la izquierda, no encima de los
 * artículos. Así el recorrido se lee como un margen que acompaña la lista, y el hueco
 * que queda bajo el rótulo cuando la etapa tiene un solo artículo es espacio en blanco
 * a propósito, no una fila a medio llenar.
 */
function StageLabel({ stage }: { stage: JourneyStageInfo }) {
  return (
    <div className="border-t-2 border-lavender pt-4 md:self-start">
      <span className="font-mono text-xs tracking-widest text-lavender-deep">
        {stage.number}
      </span>

      <h2 className="mt-3 font-mono text-xs uppercase tracking-widest text-ink">
        {stage.title}
      </h2>

      <p className="mt-4 max-w-[42ch] text-sm text-coffee">{stage.note}</p>
    </div>
  );
}

export default function GranosPage() {
  const groups = articlesByJourney();
  const showReadingTime = readingTimesVary(articles);

  return (
    <div className="px-6 pb-24 md:px-16 md:pb-36">
      {/*
        El filete de abajo es lo que cierra la entradilla: sin él, la cabecera y el
        primer artículo se leen de corrido como un solo bloque.
        Va fino y en `dust`, no grueso y en lavanda, para que no se confunda con los
        filetes de etapa: aquí hay dos jerarquías distintas conviviendo, «esto ya no es
        la entradilla» y «empieza una etapa del recorrido», y si las dos se dibujan
        igual la página deja de tener orden. Es también lo que evita copiar el recurso
        de /metodos, donde un mismo filete lavanda hace los dos trabajos.
      */}
      <header className="border-b border-dust pt-16 pb-16 md:pt-24 md:pb-24">
        <Eyebrow>Granos</Eyebrow>

        <div className="mt-6 md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-16">
          <h1 className="font-display text-6xl leading-none md:text-8xl">
            Antes de que el agua toque el grano
          </h1>

          <div className="mt-10 md:mt-0">
            <p className="max-w-prose text-lg text-coffee">
              Cuando abres una bolsa de café, casi todo lo que va a decidir a qué sabe
              ya ocurrió: en qué planta creció, qué le hicieron al recogerlo y cuánto
              lo tostaron. Preparar bien es la última parte, no la primera.
            </p>

            <p className="mt-5 max-w-prose text-base text-coffee">
              Estos artículos siguen ese camino en orden, desde la planta hasta el
              tostador. Puedes leerlos sueltos y en el orden que quieras: cada uno se
              entiende por su cuenta.
            </p>
          </div>
        </div>
      </header>

      {groups.map(({ stage, articles: stageArticles }) => (
        <section
          key={stage.key}
          className="mt-16 md:mt-24 md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16"
        >
          <StageLabel stage={stage} />

          <ul className="mt-8 md:mt-0">
            {stageArticles.map((article) => (
              <ArticleEntry
                key={article.slug}
                article={article}
                showReadingTime={showReadingTime}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
