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
  "cuchara-de-madera": {
    name: "Cuchara larga de madera",
    photo: "/images/equipo/cuchara-de-madera.webp",
    alt: "Cuchara de madera vista desde arriba sobre un fondo liso y claro. Tiene el mango largo y recto y la pala redonda y poco honda.",
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
