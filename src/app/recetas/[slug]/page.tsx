import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/app/date";
import { PhotoCreditLine } from "@/app/photo-credits";
import { resolveContentImage } from "@/content/image";
import { getBrewMethod } from "@/content/metodos";
import { getRecipe, recipes } from "@/content/recetas";

export const dynamicParams = false;

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/recetas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};

  return { title: `${recipe.name} · Recetas`, description: recipe.tagline };
}

const TEMPERATURE_LABEL = { caliente: "Caliente", fria: "Fría" } as const;

/** El rótulo de mono que abre cada bloque de la ficha. */
const LABEL = "font-mono text-[11px] uppercase tracking-[0.1em] text-ink";

/**
 * La ficha de una receta. No hay diseño de Figma para ella: sigue la retícula de las
 * fichas del sitio —foto a un lado, lo que hay que hacer al otro— y lleva lo que una
 * receta necesita y nada más. Sin calculadora ni cronómetro: son bebidas de una sola
 * taza que parten de un método que ya tiene los suyos en su ficha, y la ficha enlaza
 * a él.
 *
 * La foto aquí se mira, así que el crédito va pegado a ella y no al pie (la regla del
 * sitio). Es un recorte sin fondo, el mismo del índice, así que va entero sobre `dust`
 * y no recortado a la proporción del recuadro.
 */
export default async function RecipePage({
  params,
}: PageProps<"/recetas/[slug]">) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const image = resolveContentImage(recipe.image);
  // No puede faltar: `src/content/recetas/index.ts` revienta al compilar si no existe.
  const method = getBrewMethod(recipe.method)!;

  return (
    <article className="px-6 pt-16 pb-24 md:px-16 md:pt-24 md:pb-30">
      <nav aria-label="Ruta">
        <ol className="flex flex-wrap items-center gap-x-3 font-mono text-[11px] uppercase tracking-[0.1em] text-lavender-deep">
          <li>
            <Link href="/recetas" className="hover:text-ink">
              Recetas
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{recipe.name}</li>
        </ol>
      </nav>

      <div className="mt-8 flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16">
        <figure className="lg:sticky lg:top-24">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-dust">
            {image.src ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain p-8 md:p-12"
              />
            ) : null}
          </div>
          {image.src ? (
            <figcaption className="mt-3 text-[13px] leading-normal text-coffee">
              <PhotoCreditLine credit={image.credit} />
            </figcaption>
          ) : null}
        </figure>

        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-coffee">
            {TEMPERATURE_LABEL[recipe.temperature]} · {recipe.base} · {recipe.time}
          </p>

          <h1 className="mt-3 font-display text-6xl leading-[0.96] tracking-[-0.025em] text-ink md:text-8xl">
            {recipe.name}
          </h1>

          <p className="mt-6 max-w-[48ch] text-lg leading-[1.6] text-coffee md:text-xl">
            {recipe.tagline}
          </p>

          <section className="mt-12">
            <h2 className={LABEL}>Para una bebida</h2>
            <ul className="mt-4 border-b border-dust">
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient.item}
                  className="flex items-baseline gap-4 border-t border-dust py-3"
                >
                  <span className="w-20 shrink-0 font-mono text-base text-ink">
                    {ingredient.amount}
                  </span>
                  <span className="text-lg text-ink">{ingredient.item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className={LABEL}>Cómo se hace</h2>
            <ol className="mt-4 flex flex-col gap-5">
              {recipe.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="w-8 shrink-0 pt-1 font-mono text-sm text-lavender-deep"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[56ch] text-lg leading-[1.6] text-ink">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <p className="mt-10 border-t border-dust pt-5 text-base text-coffee">
            La base sale de la ficha{" "}
            <Link
              href={`/metodos/${method.slug}`}
              className="text-lavender-deep underline underline-offset-4 hover:text-ink"
            >
              «{method.name}»
            </Link>
            , con sus cantidades, su molienda y su paso a paso.
          </p>

          <section className="mt-12">
            <h2 className={LABEL}>De dónde sale esta receta</h2>
            <div className="mt-4 flex max-w-[62ch] flex-col gap-4">
              {recipe.note.map((paragraph) => (
                <p key={paragraph} className="text-base leading-[1.7] text-coffee">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {recipe.sources.length > 0 ? (
            <section className="mt-12">
              <h2 className={LABEL}>Fuentes</h2>
              <ul className="mt-4 flex max-w-[62ch] flex-col gap-4">
                {recipe.sources.map((source) => (
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
          ) : null}

          <Link
            href="/recetas"
            className="mt-16 inline-block font-mono text-[11px] uppercase tracking-[0.1em] text-lavender-deep hover:text-ink"
          >
            ← Todas las recetas
          </Link>
        </div>
      </div>
    </article>
  );
}
