import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { brewMethods, getBrewMethod } from "@/content/metodos";
import { toTimedSteps } from "@/content/metodos/timing";
import { TimedSteps } from "./timed-steps";
import type { BrewMethod, ContentImage } from "@/content/metodos";

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
  { key: "ratio", label: "Ratio café / agua", isTime: false },
  { key: "grind", label: "Molienda", isTime: false },
  { key: "waterTemperature", label: "Temperatura del agua", isTime: false },
  { key: "totalTime", label: "Tiempo total", isTime: true },
  { key: "output", label: "Rendimiento", isTime: false },
] as const satisfies readonly {
  key: keyof BrewMethod["specs"];
  label: string;
  isTime: boolean;
}[];

/** Reloj de trazo fino. Marca un dato de tiempo, no decora. */
function ClockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${className} shrink-0`}
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.4 1.7" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-sage-deep">
      {children}
    </p>
  );
}

function DifficultyMeter({ difficulty }: { difficulty: BrewMethod["difficulty"] }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex gap-1"
        role="img"
        aria-label={`Dificultad ${difficulty.level} de 3`}
      >
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={
              step <= difficulty.level
                ? "h-3 w-3 bg-lavender-deep"
                : "h-3 w-3 border border-dust"
            }
          />
        ))}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-coffee">
        {difficulty.label}
      </span>
    </div>
  );
}

/**
 * Sin foto todavía: bloque sólido de la paleta, cuadrado.
 * Para publicar la real, guarda el archivo en /public/images/metodos/ y pon su
 * ruta en `image.src` dentro del contenido; aquí no hay nada más que tocar.
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

  return (
    <article className="pb-40 md:pb-32">
      <header>
        {/* Marcador de la fotografía de cabecera: bloque sólido hasta que exista la imagen real. */}
        <div
          className="aspect-[4/3] w-full bg-dust md:ml-[20%] md:aspect-[21/9] md:w-[80%]"
          aria-hidden="true"
        />

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
            <DifficultyMeter difficulty={method.difficulty} />
          </div>
        </div>
      </header>

      <section className="mt-16 bg-lavender px-6 py-10 md:mt-28 md:px-16 md:py-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          Ficha técnica
        </h2>

        <dl className="mt-8 md:grid md:grid-cols-2 md:gap-x-20">
          {SPEC_FIELDS.map(({ key, label, isTime }) => {
            const spec = method.specs[key];
            return (
              <div key={key} className="border-t border-ink py-5 md:py-6">
                <dt className="text-sm text-ink md:text-base">{label}</dt>
                <dd>
                  <p className="mt-2 flex items-center gap-2 font-mono text-2xl text-ink md:text-3xl">
                    {isTime ? <ClockIcon className="h-5 w-5" /> : null}
                    {spec.value}
                  </p>
                  {spec.note ? (
                    <p className="mt-2 max-w-prose text-sm text-ink">{spec.note}</p>
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
              <EquipmentImage image={item.image} />
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

        <TimedSteps steps={toTimedSteps(method.steps)} />
      </section>

      <section className="mt-24 px-6 md:mt-36 md:ml-[20%] md:px-16">
        <Eyebrow>Errores comunes</Eyebrow>
        <h2 className="mt-4 max-w-prose font-display text-3xl md:text-5xl">
          Si algo salió mal, casi siempre es una de estas cuatro cosas
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
    </article>
  );
}
