import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/app/eyebrow";
import { resolveEquipmentImage } from "@/content/equipo/photo";
import { brewMethods, getBrewMethod } from "@/content/metodos";
import { parseRatio } from "@/content/metodos/ratio";
import type { Ratio } from "@/content/metodos/ratio";
import { parseEndSeconds, toTimedSteps } from "@/content/metodos/timing";
import { ClockIcon, ErrorPenaltyMeter } from "../indicators";
import { Amounts, CupsControl, RecipeAmountsProvider } from "./recipe-amounts";
import { TimedSteps } from "./timed-steps";
import type { BrewMethod, ContentImage, Grounding } from "@/content/metodos";
import { formatDate } from "@/app/date";

export const dynamicParams = false;

export function generateStaticParams() {
  return brewMethods.map((method) => ({ slug: method.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/metodos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const method = getBrewMethod(slug);
  if (!method) return {};

  return {
    title: `${method.name} · Métodos de preparación`,
    description: method.tagline,
  };
}

const SPEC_FIELDS = [
  { key: "ratio", label: "Ratio café / agua", isTime: false, isRatio: true },
  { key: "grind", label: "Molienda", isTime: false, isRatio: false },
  { key: "waterTemperature", label: "Temperatura del agua", isTime: false, isRatio: false },
  { key: "totalTime", label: "Tiempo total", isTime: true, isRatio: false },
  { key: "output", label: "Rendimiento", isTime: false, isRatio: false },
  { key: "cupProfile", label: "Perfil de taza", isTime: false, isRatio: false },
] as const satisfies readonly {
  key: keyof BrewMethod["specs"];
  label: string;
  isTime: boolean;
  isRatio: boolean;
}[];

/**
 * Hace tangible el ratio: una casilla de café frente a las que pide de agua.
 * Se dibuja sobre la banda lavender de la ficha, así que el café va en `ink` y
 * el agua en `paper`; lavender sobre lavender no se vería.
 */
function RatioBar({ ratio }: { ratio: Ratio }) {
  // El gráfico cuenta casillas enteras; las cifras exactas quedan en el texto.
  const waterCells = Math.max(1, Math.round(ratio.water / ratio.coffee));
  const cells = waterCells + 1;
  const cellWidth = 10;
  const gap = 2;
  const height = 14;
  const width = cells * (cellWidth + gap) - gap;

  return (
    <div className="mt-4 max-w-prose">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="auto"
        role="img"
        aria-label={`${ratio.coffee} de café por cada ${ratio.water} de agua`}
        className="block"
      >
        {Array.from({ length: cells }, (_, index) => (
          <rect
            key={index}
            x={index * (cellWidth + gap)}
            y={0}
            width={cellWidth}
            height={height}
            fill={index === 0 ? "var(--color-ink)" : "var(--color-paper)"}
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between font-mono text-xs uppercase tracking-widest text-ink">
        <span>
          <Amounts text="{cafe}" /> café
        </span>
        <span>
          <Amounts text="{agua}" /> agua
        </span>
      </div>
    </div>
  );
}

/**
 * El título de los errores lleva el número escrito con letra, no en cifra, así que
 * no basta con interpolarlo: cada método trae los errores que tiene y aquí se busca
 * la palabra. Si algún día son más de ocho, el título se queda sin número y ya está.
 */
const NUMBER_WORDS = ["dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho"];

function mistakesHeading(count: number): string {
  const word = NUMBER_WORDS[count - 2];
  if (!word) return "Si algo salió mal, casi siempre es una de estas cosas";

  return `Si algo salió mal, casi siempre es una de estas ${word} cosas`;
}

/**
 * La foto de una pieza de equipo, cuadrada.
 *
 * Llega ya resuelta desde el catálogo: si el archivo todavía no está guardado, viene
 * con `src` en null y aquí se pinta el bloque de color. Para publicarla basta con
 * dejar el archivo en /public/images/equipo/ con el nombre que dice el catálogo; ni
 * este archivo ni el del contenido hay que tocarlos.
 */
function EquipmentImage({ image }: { image: ContentImage }) {
  if (!image.src) {
    return <div className="aspect-square w-full bg-dust" aria-hidden="true" />;
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-dust">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 30vw, 45vw"
        className="object-cover"
      />
    </div>
  );
}

export default async function BrewMethodPage({
  params,
}: PageProps<"/metodos/[slug]">) {
  const { slug } = await params;
  const method = getBrewMethod(slug);
  if (!method) notFound();

  const ratio = parseRatio(method.specs.ratio.value);

  return (
    <RecipeAmountsProvider
      recipe={method.recipe}
      waterPerCoffeeGram={ratio ? ratio.water / ratio.coffee : 0}
    >
      {/* En móvil el panel del cronómetro va fijo abajo y ahora ocupa unos 180 px:
          este hueco es el que evita que tape el final del artículo. */}
      <article className="pb-52 md:pb-32">
        <header>
          {/*
            La fotografía de cabecera. En escritorio ocupa el 80 % derecho en una
            banda ancha; el recuadro crema del título se le monta encima por abajo.
            Mientras un método no traiga foto, el mismo hueco se pinta en color.
          */}
          {method.image.src ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-dust md:ml-[20%] md:aspect-[21/9] md:w-[80%]">
              <Image
                src={method.image.src}
                alt={method.image.alt}
                fill
                priority
                sizes="(min-width: 768px) 80vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="aspect-[4/3] w-full bg-dust md:ml-[20%] md:aspect-[21/9] md:w-[80%]"
              aria-hidden="true"
            />
          )}

          <div className="px-6 md:px-16">
            <div className="relative -mt-12 max-w-[85%] bg-paper pt-6 pr-6 md:-mt-24 md:max-w-[60%] md:pt-10 md:pr-12">
              <Eyebrow>Método de preparación</Eyebrow>
              <h1 className="mt-4 font-display text-6xl leading-none md:text-8xl">
                {method.name}
              </h1>
            </div>

            <p className="mt-8 max-w-prose text-lg text-coffee md:mt-10 md:text-xl">
              {method.tagline}
            </p>

            <div className="mt-8">
              <ErrorPenaltyMeter penalty={method.errorPenalty} />
            </div>
          </div>
        </header>

        <section className="mt-16 bg-lavender px-6 py-10 md:mt-28 md:px-16 md:py-14">
          {/* Alineado a la izquierda: a la derecha vive el panel fijo del cronómetro. */}
          <div className="md:flex md:items-start md:gap-16">
            <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
              Ficha técnica
            </h2>

            <div className="mt-8 md:mt-0">
              <CupsControl />
            </div>
          </div>

          <dl className="mt-8 md:grid md:grid-cols-2 md:gap-x-20">
            {SPEC_FIELDS.map(({ key, label, isTime, isRatio }) => {
              const spec = method.specs[key];
              const specRatio = isRatio ? parseRatio(spec.value) : null;

              return (
                <div key={key} className="border-t border-ink py-5 md:py-6">
                  <dt className="text-sm text-ink md:text-base">{label}</dt>
                  <dd>
                    <p className="mt-2 flex items-center gap-2 font-mono text-2xl text-ink md:text-3xl">
                      {isTime ? <ClockIcon className="h-5 w-5" /> : null}
                      <Amounts text={spec.value} />
                    </p>
                    {specRatio ? <RatioBar ratio={specRatio} /> : null}
                    {spec.note ? (
                      <p className="mt-2 max-w-prose text-sm text-ink">
                        <Amounts text={spec.note} />
                      </p>
                    ) : null}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section className="mt-20 px-6 md:mt-28 md:px-16">
          <Eyebrow>Qué necesitas</Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-3xl md:text-5xl">
            El equipo mínimo para que salga igual cada vez
          </h2>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-3 md:gap-x-10 md:gap-y-14">
            {method.equipment.map((item) => (
              <li key={item.name}>
                <EquipmentImage image={resolveEquipmentImage(item.piece)} />
                <p className="mt-4 font-medium text-ink">{item.name}</p>
                {item.note ? (
                  <p className="mt-1 text-sm text-coffee">{item.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-24 px-6 md:mt-36 md:px-16">
          <Eyebrow>Paso a paso</Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-3xl md:text-5xl">
            {method.steps.length} pasos, de la jarra vacía a la taza servida
          </h2>

          {/* El final del último paso sale del tiempo total de la ficha técnica. */}
          <TimedSteps
            steps={toTimedSteps(
              method.steps,
              parseEndSeconds(method.specs.totalTime.value),
            )}
          />
        </section>

        <section className="mt-24 px-6 md:mt-36 md:ml-[20%] md:px-16">
          <Eyebrow>Errores comunes</Eyebrow>
          <h2 className="mt-4 max-w-prose font-display text-3xl md:text-5xl">
            {mistakesHeading(method.commonMistakes.length)}
          </h2>

          <ul className="mt-12">
            {method.commonMistakes.map((mistake) => (
              <li
                key={mistake.problem}
                className="max-w-prose border-t border-dust py-8"
              >
                <h3 className="font-display text-2xl md:text-3xl">
                  {mistake.problem}
                </h3>
                <p className="mt-4 text-base text-coffee">
                  <span className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                    Por qué pasa{" "}
                  </span>
                  {mistake.cause}
                </p>
                <p className="mt-3 text-base text-ink">
                  <span className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                    Cómo se corrige{" "}
                  </span>
                  {mistake.fix}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {method.funFact ? (
          <section className="mt-24 px-6 md:mt-36 md:ml-[20%] md:px-16">
            <div className="max-w-prose bg-lavender px-6 py-10 md:px-10 md:py-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
                Dato curioso
              </h2>
              <p className="mt-6 font-display text-2xl leading-snug text-ink md:text-3xl">
                {method.funFact.text}
              </p>
              {method.funFact.source ? (
                <p className="mt-6 text-sm text-ink">
                  Fuente: {method.funFact.source}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {method.grounding ? <GroundingBlock grounding={method.grounding} /> : null}
      </article>
    </RecipeAmountsProvider>
  );
}

/**
 * Sobre qué está construida la ficha, al final del todo.
 *
 * No es la lista de fuentes de un artículo de /granos, aunque se le parezca en la
 * forma: allí se dice de dónde sale cada dato y aquí se dice de qué está hecho el
 * método entero, que en el caso del colado en tela es la práctica de quien lo prepara
 * y ninguna medición. Por eso lleva párrafos y no solo una lista: sin el texto, tres
 * enlaces sueltos parecerían las fuentes de unas cifras que no existen.
 *
 * Va sin fondo ni recuadro, separado por un filete grueso, porque es una nota al pie
 * del sitio y no un bloque destacado más: si compitiera con el dato curioso, el lector
 * leería lo segundo primero.
 */
function GroundingBlock({ grounding }: { grounding: Grounding }) {
  return (
    <section className="mt-28 border-t-2 border-ink px-6 pt-6 md:mt-40 md:px-16">
      <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
        Sobre qué está escrita esta ficha
      </h2>

      <div className="mt-8 max-w-prose">
        {grounding.body.map((paragraph, index) => (
          <p
            key={index}
            className="mt-5 text-base text-coffee first:mt-0 md:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {grounding.references && grounding.references.length > 0 ? (
        <ul className="mt-12 md:grid md:grid-cols-2 md:gap-x-16">
          {grounding.references.map((reference) => (
            <li key={reference.url} className="border-t border-dust py-5">
              <p className="font-mono text-xs uppercase tracking-widest text-sage-deep">
                {reference.publisher}
              </p>

              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block max-w-[52ch] text-base text-lavender-deep underline underline-offset-4"
              >
                {reference.title}
              </a>

              <p className="mt-2 font-mono text-xs text-coffee">
                Consultado el {formatDate(reference.retrieved)}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
