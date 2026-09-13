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
 * **El archivo se llama como la clave**, con la extensión que tenga la foto. Antes no era
 * así y se dejó escrito que no pasaba nada; sí pasaba, por dos motivos. El menor es que
 * obligaba a abrir este archivo cada vez solo para averiguar cómo se llamaba una foto. El
 * mayor es que un nombre afirma algo: la pieza `hervidor` estaba guardada en `olla.jpg`, y
 * una olla y un hervidor son objetos distintos, igual que aquí mismo lo son el hervidor de
 * cuello de cisne y el corriente. Un nombre que designa otra cosa es un dato falso, no un
 * descuido de orden.
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
     *
     * OJO: que el archivo ya se llame como la clave no arregla nada de lo de arriba. Lo
     * que sigue pendiente es **la foto**, no su nombre. Cuando aparezca un cono aislado,
     * se sustituye el archivo y se reescribe el `alt` con lo que se vea entonces.
     */
    photo: "/images/equipo/cono-v60.webp",
    alt: "Un cono de filtrado V60, de vidrio y con las paredes acanaladas en espiral, lleva dentro un filtro de papel con café y recibe un chorro de agua desde un hervidor de cuello de cisne. El cono se apoya sobre una jarra de vidrio que ya tiene café, y esta sobre una báscula negra, en una mesa de madera. Al fondo, en penumbra, dos tazas y una cafetera moka.",
    credit: null,
  },
  "filtros-papel-v60": {
    name: "Filtros de papel cónicos",
    photo: "/images/equipo/filtros-papel-v60.jpg",
    alt: "Una mano sostiene un filtro de papel de color crudo, todavía sin abrir, con forma de abanico y un borde cosido en uno de sus lados. Debajo espera un cono de filtrado de vidrio apoyado en una mesa clara.",
    credit: null,
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
    credit: null,
  },
  "filtros-papel-aeropress": {
    name: "Filtros de papel redondos",
    // Foto pendiente, igual que la pieza de arriba.
    photo: "/images/equipo/filtros-papel-aeropress.jpg",
    alt: "Un montón de filtros de papel redondos, blancos y del tamaño de una moneda grande, apilados uno sobre otro fuera de su caja.",
    credit: null,
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
    credit: null,
  },
  "molino-de-muelas": {
    name: "Molino de muelas",
    photo: "/images/equipo/molino-de-muelas.jpg",
    alt: "Dos manos sujetan un molino de café manual, un cilindro alto y estrecho de acero, mientras giran la manivela plegable que sale de su tapa. Detrás, la camiseta verde de quien lo está usando.",
    credit: null,
  },
  bascula: {
    name: "Báscula de cocina",
    photo: "/images/equipo/bascula.jpg",
    alt: "Báscula digital negra y plana sobre una encimera clara. En su frente se iluminan dos cifras: un cronómetro a cero y un peso de 28 gramos. Encima tiene un vaso metálico al que van cayendo granos de café desde un dosificador de cobre que alguien inclina.",
    credit: null,
  },
  "hervidor-cuello-cisne": {
    name: "Hervidor de cuello de cisne",
    photo: "/images/equipo/hervidor-cuello-cisne.jpg",
    alt: "Hervidor de agua negro y mate, de cuerpo ancho y escalonado, con un termómetro redondo encajado en la tapa. De la parte alta sale un pico largo, muy estrecho y curvado, que desciende hasta casi la altura de la base. Está apoyado sobre un salvamanteles trenzado.",
    credit: null,
  },
  hervidor: {
    name: "Hervidor de agua",
    photo: "/images/equipo/hervidor.jpg",
    alt: "Jarra de acero alta, con asa cuadrada y pico ancho, puesta sobre la llama de una cocina de gas. Del agua sale una columna espesa de vapor.",
    credit: null,
  },
  "prensa-francesa": {
    name: "Prensa francesa",
    photo: "/images/equipo/prensa-francesa.jpg",
    alt: "Prensa francesa vacía sobre una encimera de mármol: una jarra cilíndrica de vidrio transparente sujeta por un armazón negro con asa, y una tapa de la que sale un vástago rematado en un pomo. En el fondo del vidrio se ve el disco de malla metálica.",
    credit: null,
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
    credit: null,
  },
  "cuchara-de-madera": {
    name: "Cuchara larga de madera",
    photo: "/images/equipo/cuchara-de-madera.webp",
    alt: "Cuchara de madera vista desde arriba sobre un fondo liso y claro. Tiene el mango largo y recto y la pala redonda y poco honda.",
    credit: null,
  },
  chemex: {
    name: "Chemex",
    photo: "/images/equipo/chemex.jpg",
    alt: "Una jarra de vidrio de una sola pieza con forma de reloj de arena: el cuerpo inferior se ensancha como un matraz de laboratorio y la boca superior se abre en embudo. A la altura del cuello lleva un collar de madera clara sujeto con una tira de cuero atada en lazo, y en el vidrio, justo debajo, sobresale un pico vertedor. Está vacía sobre una superficie lisa.",
    credit: null,
  },
  /*
   * Los filtros de la Chemex son pieza aparte y no un detalle de la jarra, igual que
   * los del V60: se compran por separado, se acaban, y son lo único que distingue de
   * verdad a este método del V60 —aunque, como cuenta la ficha, esa distinción esté
   * mucho menos medida de lo que las tiendas dan a entender.
   */
  "filtros-chemex": {
    name: "Filtros Chemex",
    photo: "/images/equipo/filtros-chemex.jpg",
    alt: "Un filtro de papel grueso de color crudo, cuadrado y doblado en cuatro, apoyado junto a otro ya abierto en forma de cono. En el abierto se ve que uno de sus lados tiene tres capas de papel superpuestas y el otro una sola.",
    credit: null,
  },
  sifon: {
    name: "Sifón de café",
    photo: "/images/equipo/sifon.jpg",
    alt: "Un aparato de vidrio de dos cuerpos montado sobre un soporte metálico: abajo una esfera de vidrio con un cuello estrecho, y encajado encima un vaso cilíndrico también de vidrio del que baja un tubo largo hasta el fondo de la esfera. Entre los dos hay un tapón de goma. Dentro del vaso de arriba se ve un disco metálico con una tela sujeta y una cadenita colgando.",
    credit: null,
  },
  "mechero-de-alcohol": {
    name: "Mechero de alcohol",
    photo: "/images/equipo/mechero-de-alcohol.jpg",
    alt: "Un mechero pequeño de metal, redondo y bajo, con una mecha blanca de algodón asomando por el centro de la tapa y una tapita suelta al lado para apagarlo.",
    credit: null,
  },
  "varilla-de-bambu": {
    name: "Varilla de bambú",
    photo: "/images/equipo/varilla-de-bambu.jpg",
    alt: "Una paleta de bambú fina y plana, de mango recto y punta redondeada, apoyada sobre una superficie clara.",
    credit: null,
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
    credit: null,
  },
  "jarra-de-vidrio": {
    name: "Jarra de vidrio",
    // Hay una segunda foto de jarra sin usar, `jarra-para-servir.webp`. Se eligió esta
    // porque la jarra llena el encuadre y se reconoce de un vistazo, que es lo que hace
    // falta en una miniatura cuadrada pequeña; en la otra la jarra queda lejos y en
    // penumbra. Esta se llamaba `parra-para-servir.jpg`, con la errata a la vista; se
    // renombró con el nombre de la clave en vez de `jarra-para-servir.jpg` para que no
    // se confunda con la descartada, de la que solo la separaría la extensión.
    photo: "/images/equipo/jarra-de-vidrio.jpg",
    alt: "Una mano sostiene por el asa una jarra de vidrio transparente, ancha y de poca altura, llena de café hasta la mitad y con un pico vertedor en un costado. Al fondo, una pared de tablones pintados de blanco.",
    credit: null,
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
