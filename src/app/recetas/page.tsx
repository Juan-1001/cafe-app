import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/app/eyebrow";
import { PhotoCredits } from "@/app/photo-credits";
import { resolveContentImage } from "@/content/image";
import type { ContentImage } from "@/content/types";
import { recipes, recipesCover, recipesCoverMobile } from "@/content/recetas";
import { CUTOUT_QUALITY } from "./quality";
import { RecipeIndex, type RecipeCard } from "./recipe-index";

export const metadata: Metadata = {
  title: "Recetas",
  description:
    "Preparaciones concretas con café: espressos, filtrados, bebidas con leche y combinados fríos, con sus proporciones y sus pasos.",
};

const TEMPERATURE_LABEL = { caliente: "Caliente", fria: "Fría" } as const;

/**
 * El índice de recetas, del diseño «Recetas — bento» de Figma, en sus dos versiones:
 * escritorio y móvil.
 */
export default function RecipesPage() {
  const cover = resolveContentImage(recipesCover);
  const coverMobile = resolveContentImage(recipesCoverMobile);

  const cards: RecipeCard[] = recipes.map((recipe) => {
    const image = resolveContentImage(recipe.image);
    return {
      slug: recipe.slug,
      name: recipe.name,
      tagline: recipe.tagline,
      temperature: recipe.temperature,
      family: recipe.family,
      meta: `${TEMPERATURE_LABEL[recipe.temperature]} · ${recipe.base} · ${recipe.time}`,
      image: { src: image.src, alt: image.alt },
    };
  });

  return (
    <div className="px-6 pt-8 pb-24 md:px-16 md:pt-12 md:pb-30">
      {/*
        El banner: el mosaico de cafeteras, uno por ancho (ver `recipesCover`). Las
        proporciones son las de los dos marcos del diseño, 1344 × 434 y 371 × 319, y
        sostienen el bloque de color mientras el archivo no esté. Los dos cargan sin
        esperar porque son lo primero que se ve; `hidden` saca de la página el que no
        toca, así que el texto alternativo se lee una sola vez.
      */}
      <Banner image={coverMobile} className="aspect-[371/319] md:hidden" sizes="100vw" />
      <Banner
        image={cover}
        className="hidden aspect-[1344/434] md:block"
        sizes="(min-width: 768px) 100vw, 0px"
      />

      {/*
        El titular va en dos líneas, como en el diseño, y para eso cede el cuerpo y no
        la caja (el criterio de «Pendientes conocidos» en CLAUDE.md): con la Fraunces
        del sitio «Ya sabes prepararlo.» mide 9 veces su cuerpo, y a los 96 px del
        diseño son 864 px en una columna de 797. El cuerpo sale del ancho de esa
        columna —la pantalla menos los márgenes (128), la entradilla (452) y el hueco
        (48)— dividido entre 9,5 y no entre 9, para dejar un 5 % de holgura elegida:
        84 px a 1440 de pantalla y 67 a 1280. Por debajo de 1280 el titular va encima
        de la entradilla y la cuenta es la misma con el ancho entero —la pantalla menos
        los márgenes—, con el mismo tope de 84: así «Ya sabes prepararlo.» cabe en una
        línea también en móvil, como en el diseño, a 34 px en 375 de pantalla.
      */}
      <header className="mt-12 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between xl:gap-12">
        <div className="min-w-0">
          <Eyebrow tone="lavender">Recetas</Eyebrow>
          <h1 className="mt-3 font-display text-[calc((100vw-48px)/9.5)] leading-[0.96] tracking-[-0.025em] text-ink md:text-[min(84px,calc((100vw-128px)/9.5))] xl:text-[min(84px,calc((100vw-628px)/9.5))]">
            Ya sabes prepararlo.{" "}
            <span className="block text-lavender-deep">Ahora juega</span>
          </h1>
        </div>

        {/* En móvil la frase en cursiva va a la derecha, como en el diseño. */}
        <div className="flex flex-col gap-4 md:max-w-113 xl:w-113 xl:shrink-0">
          <p className="text-[15px] leading-[1.65] text-coffee md:text-[17px]">
            Desde los clásicos espressos y cafés de preparación lenta hasta bebidas con
            leche de textura sedosa y refrescantes combinados cítricos.
          </p>
          <p className="ml-auto max-w-68 text-right font-display text-[17px] leading-normal text-lavender-deep italic md:ml-0 md:max-w-none md:text-left md:text-[19px]">
            Elige según tu gusto y prepáralos con las proporciones adecuadas y pasos
            claros.
          </p>
        </div>
      </header>

      <div className="mt-12">
        <RecipeIndex recipes={cards} />
      </div>

      <PhotoCredits
        images={[cover, ...recipes.map((recipe) => resolveContentImage(recipe.image))]}
      />
    </div>
  );
}

/** Un mosaico del banner, o el bloque de color en su proporción si aún no está. */
function Banner({
  image,
  className,
  sizes,
}: {
  image: ContentImage;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[2px] bg-dust ${className}`}>
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="eager"
          sizes={sizes}
          quality={CUTOUT_QUALITY}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
