import type { Article } from "./types";
import { JOURNEY_STAGES, type JourneyStageInfo } from "./journey";
import { arabicaVsRobusta } from "./arabica-vs-robusta";
import { nivelesDeTueste } from "./niveles-de-tueste";

/**
 * Un archivo por artículo en esta carpeta; aquí se registran para las rutas.
 *
 * El orden de esta lista es el orden dentro de cada etapa del recorrido, así que es
 * editorial: si dos artículos de una misma etapa se leen mejor en un orden concreto,
 * se ponen en ese orden aquí.
 */
export const articles: Article[] = [arabicaVsRobusta, nivelesDeTueste];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Los artículos agrupados por etapa, en el orden del recorrido del café. Una etapa sin
 * artículos no devuelve grupo, así que no se pinta un rótulo vacío.
 *
 * Dentro de una etapa el orden es el de registro en `articles`, que es el editorial:
 * si dos artículos de finca se leen mejor en un orden concreto, se ponen en ese orden
 * arriba y aquí no hay nada que tocar.
 */
export function articlesByJourney(): {
  stage: JourneyStageInfo;
  articles: Article[];
}[] {
  return JOURNEY_STAGES.map((stage) => ({
    stage,
    articles: articles.filter((article) => article.stage === stage.key),
  })).filter((group) => group.articles.length > 0);
}

export type {
  Article,
  ArticleBlock,
  ArticleLevel,
  RoastLevel,
  Source,
} from "./types";
export { JOURNEY_STAGES } from "./journey";
export type { JourneyStage, JourneyStageInfo } from "./journey";
