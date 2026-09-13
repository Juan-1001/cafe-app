import { getBrewMethod, type BrewMethod } from "./metodos";

/**
 * Los textos propios de la home.
 *
 * Vive en un archivo suelto y no en una carpeta `src/content/home/` porque la home no
 * es una sección con elementos: no tiene índice ni fichas, es una página única. La
 * regla de «un archivo por elemento» se aplica a granos, métodos, recetas y tiendas,
 * donde los archivos se cuentan; aquí el elemento es la página entera.
 *
 * Y está en `src/content/` y no dentro del componente por la misma razón que el resto:
 * el texto visible se puede reescribir sin tocar la composición, y quien venga a
 * cambiar una frase no tiene que leer JSX para encontrarla.
 */
export const home = {
  /**
   * El titular de la portada. Se pinta en lavanda, y eso condiciona la composición:
   * el lavanda sobre crema solo llega al contraste mínimo a partir de 24 px, así que
   * este texto no puede encogerse por debajo de ese tamaño en ningún ancho de
   * pantalla. Es corto a propósito: tiene que caber grande.
   */
  title: "El café bueno no es cuestión de suerte",

  /**
   * La entradilla. El primer párrafo explica qué es el café de especialidad, que es el
   * término que da sentido a todo lo demás y la primera vez que aparece en el sitio.
   *
   * El segundo dice qué se lleva el lector, y hoy nombra dos cosas porque hoy hay dos
   * secciones. Cuando existan /recetas y /tiendas hay que reescribirlo: es la frase de
   * la home que caduca al crecer el sitio, y está aquí sola para que se vea.
   */
  intro: [
    "Se llama café de especialidad al que se puede seguir hasta la finca donde creció y se tuesta buscando lo que ese grano concreto sabe hacer, en vez de que todos los lotes del año sepan igual. No es un sello ni una marca: es una forma de trabajar que empieza en la planta y acaba en tu cocina.",
    "Aquí se cuentan dos cosas. Cómo preparar en casa el café que ya tienes para que sepa mejor esta misma mañana, y qué le pasó al grano antes de llegar a tu bolsa, que es lo que explica casi todo lo demás.",
  ],

  /**
   * El método por el que entra alguien que llega sin saber por dónde empezar.
   *
   * Se fija a mano y no se calcula del castigo del error porque es una decisión
   * editorial: el día que haya ocho métodos puede convenir entrar por la moka aunque
   * la prensa francesa siga siendo la que más perdona. Lo que castiga un método es un
   * dato suyo; por dónde se entra al sitio, no.
   *
   * `note` habla de este método en concreto, así que vive pegada al slug: quien cambie
   * uno tiene el otro delante y no se olvida de reescribirlo. Lo que la nota NO dice es
   * lo que ya dice el propio método en su `tagline` —que es el que más perdona—, para
   * no escribir dos veces lo mismo una debajo de la otra.
   */
  entry: {
    method: "prensa-francesa",
    label: "Por dónde empezar",
    note: "No hace falta comprar nada raro ni acertar al segundo. Si solo vas a probar un método, empieza por este.",
  },

  /** Los demás métodos, después del de entrada. */
  moreMethods: {
    label: "Cuando ese te salga solo",
    note: "Cambiar de método cambia lo que la taza te da: más claridad, más cuerpo, más aroma. Cada uno con su paso a paso y sus cantidades.",
    link: "Todos los métodos",
  },

  /** El recorrido del grano, que es la sección /granos vista desde la portada. */
  journey: {
    label: "Por qué sabe a lo que sabe",
    note: "Cuando destapas la bolsa, buena parte de a qué va a saber está decidida desde hace meses. Estas son las paradas donde se decidió.",
    link: "Todos los artículos",
  },
};

/**
 * El método de entrada, ya resuelto.
 *
 * Si el slug de `home.entry.method` no existe, esto revienta la compilación con el
 * nombre del archivo delante, en vez de dejar la portada sin su bloque principal y que
 * se descubra mirando la página.
 *
 * No es una clave tipada como las del catálogo de equipo, y la razón es concreta: los
 * slugs de los métodos no son literales para TypeScript, porque cada método se declara
 * anotado (`const v60: BrewMethod`) y eso convierte su `slug` en `string`. Para que un
 * slug inventado no compilara habría que cambiar los archivos de los métodos y el
 * orden del índice; mientras no se haga, esta comprobación da la misma garantía en el
 * único momento que importa, que es al construir el sitio.
 */
export function getEntryMethod(): BrewMethod {
  const method = getBrewMethod(home.entry.method);

  if (!method) {
    throw new Error(
      `El método de entrada de la home ("${home.entry.method}") no existe en src/content/metodos/. Revisa home.entry.method en src/content/home.ts.`,
    );
  }

  return method;
}
