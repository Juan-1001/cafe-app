import type { EquipmentPiece } from "./types";

/**
 * El catálogo de equipo. Una entrada por objeto, compartida por todos los métodos que
 * lo usen: la foto del molino se guarda una vez y la piden los dos métodos que hoy lo
 * llevan, y los que vengan.
 *
 * Es un objeto y no una lista para que la clave sea el identificador y TypeScript pueda
 * cerrar el tipo: `EquipmentKey` sale de aquí, así que una clave mal escrita en un
 * método no compila. Con una lista y claves sueltas en texto, el error se vería en la
 * página, y tarde.
 *
 * No tiene página propia ni ruta. Es contenido compartido, no una sección del sitio:
 * las secciones son las cinco del CLAUDE.md. Si algún día un molino de muelas merece
 * explicación de verdad, eso es un artículo, no una ficha de catálogo.
 *
 * Los dos hervidores son dos piezas y no una. El de cuello de cisne y el corriente son
 * objetos distintos, y la diferencia es justamente contenido: el V60 necesita el pico
 * fino para controlar el caudal y la prensa francesa dice explícitamente que no hace
 * falta. Fundirlos en un «hervidor» borraría eso.
 *
 * Los nombres de archivo no coinciden siempre con la clave, y no pasa nada: la clave es
 * lo que usan los métodos y la ruta es lo que hay guardado. Este archivo es el único
 * sitio donde se juntan las dos cosas.
 */
export const EQUIPMENT = {
  "cono-v60": {
    name: "Cono V60",
    /*
     * Esta foto es la escena entera de un V60 en marcha, no el cono solo, y además
     * salen dentro otras cuatro piezas de esta misma lista: el filtro, la jarra, la
     * báscula y el hervidor. Como miniatura junto a «Cono V60» cumple, pero es la única
     * del catálogo que no señala una pieza concreta, así que conviene cambiarla por un
     * cono aislado en cuanto haya uno. El texto alternativo dice lo que de verdad se
     * ve, no lo que nos gustaría que se viera.
     *
     * Se puede compartir aunque sea una escena de método porque esta pieza es del V60 y
     * de ningún otro: no hay ninguna otra receta a la que pudiera desentonar.
     */
    photo: "/images/equipo/filtro-v60.webp",
    alt: "Un cono de filtrado V60, de vidrio y con las paredes acanaladas en espiral, lleva dentro un filtro de papel con café y recibe un chorro de agua desde un hervidor de cuello de cisne. El cono se apoya sobre una jarra de vidrio que ya tiene café, y esta sobre una báscula negra, en una mesa de madera. Al fondo, en penumbra, dos tazas y una cafetera moka.",
  },
  "filtros-papel-v60": {
    name: "Filtros de papel cónicos",
    photo: "/images/equipo/filtro-v60.jpg",
    alt: "Una mano sostiene un filtro de papel de color crudo, todavía sin abrir, con forma de abanico y un borde cosido en uno de sus lados. Debajo espera un cono de filtrado de vidrio apoyado en una mesa clara.",
  },
  aeropress: {
    name: "AeroPress",
    /*
     * Foto pendiente. La ruta se declara desde ahora porque `resolveEquipmentImage`
     * comprueba en la compilación si el archivo está: mientras no exista se pinta el
     * bloque de color, y el día que se guarde aparece sola sin tocar nada.
     *
     * El alt describe el objeto tal y como es, que es lo que dice qué fotografía hay
     * que ir a buscar. Cuando la foto esté, hay que comprobar que lo que se ve es
     * esto y corregirlo si no.
     */
    photo: "/images/equipo/aeropress.jpg",
    alt: "Un AeroPress desmontado: un cilindro de plástico translúcido con números marcados en un costado, un émbolo rematado en un disco de goma gris oscuro y una tapa redonda y perforada que se enrosca en la base del cilindro.",
  },
  "filtros-papel-aeropress": {
    name: "Filtros de papel redondos",
    // Foto pendiente, igual que la pieza de arriba.
    photo: "/images/equipo/filtros-papel-aeropress.jpg",
    alt: "Un montón de filtros de papel redondos, blancos y del tamaño de una moneda grande, apilados uno sobre otro fuera de su caja.",
  },
  moka: {
    name: "Cafetera moka",
    /*
     * Foto pendiente. La ruta se declara desde ahora porque `resolveEquipmentImage`
     * comprueba en la compilación si el archivo está: mientras no exista se pinta el
     * bloque de color, y el día que se guarde aparece sola.
     *
     * Lo que hay que ir a buscar es la cafetera sola y **desmontada**, no puesta al
     * fuego: sus tres piezas separadas son lo que explica el método de un vistazo
     * —abajo el agua, en medio el café, arriba lo que sale— y eso no se ve en una
     * moka cerrada sobre la hornilla, que además sería la foto del método y no la
     * del objeto.
     *
     * La válvula tiene que verse. Es la pieza que marca hasta dónde llega el agua y
     * sale nombrada en los pasos, en los errores comunes y en el bloque de
     * cantidades; una foto donde quede de espaldas obliga a explicar con palabras lo
     * que la foto tenía que enseñar.
     */
    photo: "/images/equipo/moka.jpg",
    alt: "Una cafetera moka de aluminio desmontada en sus tres piezas sobre una mesa clara: abajo la caldera octogonal con su asa negra y, en un costado, el botoncito redondo de la válvula de seguridad; en medio el embudo con su filtro; arriba el recolector con la tapa abierta y el tubo por el que sube el café.",
  },
  "molino-de-muelas": {
    name: "Molino de muelas",
    photo: "/images/equipo/molino-manual.jpg",
    alt: "Dos manos sujetan un molino de café manual, un cilindro alto y estrecho de acero, mientras giran la manivela plegable que sale de su tapa. Detrás, la camiseta verde de quien lo está usando.",
  },
  bascula: {
    name: "Báscula de cocina",
    photo: "/images/equipo/bascula.jpg",
    alt: "Báscula digital negra y plana sobre una encimera clara. En su frente se iluminan dos cifras: un cronómetro a cero y un peso de 28 gramos. Encima tiene un vaso metálico al que van cayendo granos de café desde un dosificador de cobre que alguien inclina.",
  },
  "hervidor-cuello-cisne": {
    name: "Hervidor de cuello de cisne",
    photo: "/images/equipo/Hervidor-de-cuello-de-cisne.jpg",
    alt: "Hervidor de agua negro y mate, de cuerpo ancho y escalonado, con un termómetro redondo encajado en la tapa. De la parte alta sale un pico largo, muy estrecho y curvado, que desciende hasta casi la altura de la base. Está apoyado sobre un salvamanteles trenzado.",
  },
  hervidor: {
    name: "Hervidor de agua",
    photo: "/images/equipo/olla.jpg",
    alt: "Jarra de acero alta, con asa cuadrada y pico ancho, puesta sobre la llama de una cocina de gas. Del agua sale una columna espesa de vapor.",
  },
  "prensa-francesa": {
    name: "Prensa francesa",
    photo: "/images/equipo/prensa-francesa.jpg",
    alt: "Prensa francesa vacía sobre una encimera de mármol: una jarra cilíndrica de vidrio transparente sujeta por un armazón negro con asa, y una tapa de la que sale un vástago rematado en un pomo. En el fondo del vidrio se ve el disco de malla metálica.",
  },
  "colador-de-tela": {
    name: "Colador de tela",
    /*
     * Foto pendiente. La ruta se declara desde ahora porque `resolveEquipmentImage`
     * comprueba en la compilación si el archivo está: mientras no exista se pinta el
     * bloque de color.
     *
     * Lo que hay que ir a buscar es el colador solo, no una escena de alguien colando:
     * el aro con la tela y el mango, apoyado o sostenido, con la tela bien visible.
     * Una foto del colador sobre la olla en pleno vertido sería la foto del método.
     */
    photo: "/images/equipo/colador-de-tela.jpg",
    alt: "Un colador de café de tela: una bolsa de tela clara, con forma de cono poco profundo, cosida al borde de un aro de metal del que sale un mango largo y recto de alambre. La tela está teñida de marrón por el uso.",
  },
  "cuchara-de-madera": {
    name: "Cuchara larga de madera",
    photo: "/images/equipo/cuchara-de-madera.webp",
    alt: "Cuchara de madera vista desde arriba sobre un fondo liso y claro. Tiene el mango largo y recto y la pala redonda y poco honda.",
  },
  /*
   * Un frasco con tapa no es la «jarra de vidrio» de aquí abajo, por la misma razón por
   * la que hay dos hervidores. La jarra está abierta y sirve para servir; este cierra, y
   * cierra porque su café pasa catorce horas dentro de la nevera, junto a la comida.
   * Fundirlos en «un recipiente de vidrio» borraría justo lo que hace falta saber para
   * comprar el correcto.
   */
  "frasco-con-tapa": {
    name: "Frasco de vidrio con tapa",
    photo: "/images/equipo/frasco-con-tapa.jpg",
    alt: "Un frasco de vidrio transparente, alto y de boca ancha, vacío y cerrado con una tapa metálica de rosca. Está de pie sobre una superficie clara y lisa.",
  },
  "jarra-de-vidrio": {
    name: "Jarra de vidrio",
    // Hay una segunda foto de jarra sin usar, `jarra-para-servir.webp`. Se eligió esta
    // porque la jarra llena el encuadre y se reconoce de un vistazo, que es lo que hace
    // falta en una miniatura cuadrada pequeña; en la otra la jarra queda lejos y en
    // penumbra.
    photo: "/images/equipo/parra-para-servir.jpg",
    alt: "Una mano sostiene por el asa una jarra de vidrio transparente, ancha y de poca altura, llena de café hasta la mitad y con un pico vertedor en un costado. Al fondo, una pared de tablones pintados de blanco.",
  },
} as const satisfies Record<string, EquipmentPiece>;

/**
 * Las claves válidas del catálogo. Los métodos declaran su equipo con este tipo, así
 * que referirse a una pieza que no existe es un error de compilación y no un hueco que
 * aparece en la página.
 */
export type EquipmentKey = keyof typeof EQUIPMENT;

export function getEquipmentPiece(key: EquipmentKey): EquipmentPiece {
  return EQUIPMENT[key];
}

export type { EquipmentPiece } from "./types";
