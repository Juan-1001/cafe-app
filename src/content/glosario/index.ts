import type { GlossaryEntry, GlossaryLink, GlossaryTerm } from "./types";
import { getArticle } from "../granos";
import { getBrewMethod } from "../metodos";
import { assertSourcesAreUsable } from "../sources";
import { americano } from "./americano";
import { arabica } from "./arabica";
import { beneficio } from "./beneficio";
import { bloom } from "./bloom";
import { cafeVerde } from "./cafe-verde";
import { canalizacion } from "./canalizacion";
import { capuchino } from "./capuchino";
import { carajillo } from "./carajillo";
import { cereza } from "./cereza";
import { cestaPresurizada } from "./cesta-presurizada";
import { coldBrew } from "./cold-brew";
import { cortado } from "./cortado";
import { crema } from "./crema";
import { descafeinado } from "./descafeinado";
import { espresso } from "./espresso";
import { extraccion } from "./extraccion";
import { finos } from "./finos";
import { floracion } from "./floracion";
import { honey } from "./honey";
import { lavado } from "./lavado";
import { lecho } from "./lecho";
import { micra } from "./micra";
import { moka } from "./moka";
import { molienda } from "./molienda";
import { mucilago } from "./mucilago";
import { natural } from "./natural";
import { notasDeCata } from "./notas-de-cata";
import { pergamino } from "./pergamino";
import { perico } from "./perico";
import { pesoDeBebida } from "./peso-de-bebida";
import { pintado } from "./pintado";
import { portafiltro } from "./portafiltro";
import { primerCrack } from "./primer-crack";
import { pulpa } from "./pulpa";
import { ratio } from "./ratio";
import { robusta } from "./robusta";
import { roya } from "./roya";
import { shot } from "./shot";
import { tamper } from "./tamper";
import { tinto } from "./tinto";
import { variedad } from "./variedad";

/**
 * Un archivo por término en esta carpeta; aquí se registran.
 *
 * A diferencia de los artículos, el orden de esta lista no significa nada: el glosario
 * se ordena por el alfabeto, y eso lo hace `glossaryEntries`. Aquí van como caigan.
 */
const entries: GlossaryEntry[] = [
  americano,
  arabica,
  beneficio,
  bloom,
  cafeVerde,
  canalizacion,
  capuchino,
  carajillo,
  cereza,
  cestaPresurizada,
  coldBrew,
  cortado,
  crema,
  descafeinado,
  espresso,
  extraccion,
  finos,
  floracion,
  honey,
  lavado,
  lecho,
  micra,
  moka,
  molienda,
  mucilago,
  natural,
  notasDeCata,
  pergamino,
  perico,
  pesoDeBebida,
  pintado,
  portafiltro,
  primerCrack,
  pulpa,
  ratio,
  robusta,
  roya,
  shot,
  tamper,
  tinto,
  variedad,
];

/** Si la página a la que remite un término existe de verdad. */
function linkExists(link: GlossaryLink): boolean {
  return link.kind === "articulo"
    ? getArticle(link.slug) !== undefined
    : getBrewMethod(link.slug) !== undefined;
}

/*
 * Las comprobaciones corren al importar el módulo, o sea al generar el sitio. Todas
 * protegen lo mismo: que el glosario no prometa algo que no hay —un enlace a una página
 * inexistente, una remisión a ninguna parte o una definición sin nada detrás—.
 */
const seen = new Set<string>();
for (const entry of entries) {
  if (seen.has(entry.slug)) {
    throw new Error(`El glosario tiene dos entradas con el slug "${entry.slug}".`);
  }
  seen.add(entry.slug);
}

for (const entry of entries) {
  if (entry.kind === "redirect") {
    const target = entries.find((other) => other.slug === entry.target);
    if (!target || target.kind !== "term") {
      throw new Error(
        `La entrada "${entry.slug}" del glosario remite a "${entry.target}", que no es ` +
          `un término del glosario. Una remisión tiene que llevar a una definición.`,
      );
    }
    continue;
  }

  if (new Set(entry.categories).size !== entry.categories.length) {
    throw new Error(`El término "${entry.slug}" repite una categoría.`);
  }

  if (entry.readMore && !linkExists(entry.readMore)) {
    throw new Error(
      `El término "${entry.slug}" enlaza a ${entry.readMore.kind} "${entry.readMore.slug}", ` +
        `que no existe.`,
    );
  }

  if (!entry.readMore && entry.sources.length === 0) {
    throw new Error(
      `El término "${entry.slug}" no enlaza a ninguna página del sitio ni cita ninguna ` +
        `fuente: su definición no tiene nada detrás.`,
    );
  }

  assertSourcesAreUsable(`glosario/${entry.slug}`, entry.sources);
}

/**
 * Las entradas en orden alfabético español: la «Á» de «Arábica» va con la A y la «ñ»
 * después de la n, que es lo que hace la comparación con el idioma puesto.
 */
export function glossaryEntries(): GlossaryEntry[] {
  return [...entries].sort((a, b) => a.term.localeCompare(b.term, "es"));
}

/**
 * La letra bajo la que se archiva una palabra: la primera, sin tilde, salvo la «Ñ»,
 * que en español es una letra propia y no una «N» con adorno. Quitar la tilde por
 * descomposición la convertiría en «N», y por eso se mira antes.
 */
function letterOf(term: string): string {
  const first = term.charAt(0).toUpperCase();
  if (first === "Ñ") return first;
  return first.normalize("NFD").charAt(0);
}

/**
 * Las entradas agrupadas por letra, en orden alfabético. Una letra sin palabras no
 * devuelve grupo, así que no se pinta un rótulo vacío ni un enlace del índice que no
 * lleva a nada.
 */
export function glossaryByLetter(): { letter: string; entries: GlossaryEntry[] }[] {
  const groups: { letter: string; entries: GlossaryEntry[] }[] = [];
  for (const entry of glossaryEntries()) {
    const letter = letterOf(entry.term);
    const last = groups.at(-1);
    if (last?.letter === letter) last.entries.push(entry);
    else groups.push({ letter, entries: [entry] });
  }
  return groups;
}

/** Cuántas definiciones hay, sin contar las remisiones, que solo mandan a otra. */
export function glossaryTermCount(): number {
  return entries.filter((entry) => entry.kind === "term").length;
}

/** El término al que lleva una entrada: ella misma, o su destino si es una remisión. */
export function resolveGlossaryEntry(entry: GlossaryEntry): GlossaryTerm {
  if (entry.kind === "term") return entry;
  return entries.find(
    (other): other is GlossaryTerm => other.kind === "term" && other.slug === entry.target,
  )!;
}

export type {
  GlossaryCategory,
  GlossaryEntry,
  GlossaryLink,
  GlossaryRedirect,
  GlossaryTerm,
} from "./types";
export { GLOSSARY_CATEGORY_LABELS } from "./types";
