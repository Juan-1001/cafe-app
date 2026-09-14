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
     * Foto cambiada. La anterior era la escena entera de un V60 en marcha con otras
     * CUATRO piezas de este catálogo dentro —filtro, jarra, báscula y hervidor— y estaba
     * anotada para sustituir. Esta mejora eso a medias y conviene dejar dicho hasta
     * dónde: el cono manda en el encuadre y se reconoce de un vistazo, pero siguen
     * saliendo otras dos piezas de la lista, el filtro de papel y la jarra.
     *
     * Lo que esta foto NO enseña, y la anterior sí: las paredes acanaladas en espiral,
     * porque este cono es de cerámica opaca y las acanaladuras van por dentro. Como esas
     * acanaladuras son justo lo que distingue a un V60 de cualquier otro cono, sigue
     * mereciendo la pena cambiarla el día que aparezca un cono aislado y de vidrio.
     *
     * Se puede compartir aunque sea una escena de método porque esta pieza es del V60 y
     * de ningún otro: no hay ninguna otra receta a la que pudiera desentonar.
     */
    photo: "/images/equipo/cono-v60.jpg",
    alt: "Un cono de filtrado de cerámica roja brillante, con asa, apoyado sobre una jarra de vidrio que ya tiene café hecho. Dentro del cono hay un filtro de papel de color crudo con el café molido usado en el fondo. El conjunto está sobre una peana blanca en el suelo de cemento, a pleno sol, y proyecta una sombra dura y recortada.",
    credit: {
      photographer: "Q. Hưng Phạm",
      photoUrl: "https://www.pexels.com/photo/coffee-brewing-in-a-ceramic-dripper-6775603/",
      source: "Pexels",
    },
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
     * Se buscó el AeroPress desmontado y en Pexels no existe: de 33 fotos con el
     * aparato, ninguna lo enseña por piezas. Esta es el aparato montado y en marcha.
     *
     * Hay un desajuste que conviene tener presente y que no se puede arreglar con
     * palabras: **el émbolo no sale en la foto**, solo la cámara encajada en su tapa
     * sobre una jarra. Justo al lado, en la ficha del AeroPress, la nota de esta pieza
     * dice «Cilindro, émbolo y tapa». La nota sigue siendo cierta y la foto no la
     * desmiente, pero enseña dos de las tres cosas que nombra. Es la razón principal
     * para sustituirla si alguna vez hay una del aparato por piezas.
     *
     * Lo que sí se ve, y era la mitad del encargo, son los números del costado.
     */
    photo: "/images/equipo/aeropress.jpg",
    alt: "Un AeroPress montado y con el café ya hecho: un cilindro de plástico translúcido, con los números del 1 al 4 marcados en azul en un costado, encajado en su tapa negra sobre una jarrita de vidrio que recoge el café. Está sobre un libro, en un estante de madera clara, y al lado hay una planta de hojas verdes en una maceta blanca.",
    credit: {
      photographer: "Marta Dzedyshko",
      photoUrl: "https://www.pexels.com/photo/aeropress-coffee-maker-placed-on-wooden-shelf-7451858/",
      source: "Pexels",
    },
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
     * La válvula tenía que verse. Es la pieza que marca hasta dónde llega el agua y
     * sale nombrada en los pasos, en los errores comunes y en el bloque de cantidades.
     *
     * **En esta foto no se ve**, y se aceptó a sabiendas: se revisaron una a una las
     * candidatas que Pexels tiene de una moka desmontada y en ninguna aparece, porque
     * en todas la caldera está de cara a su boca y la válvula queda en el costado
     * oculto. Tampoco sale el embudo. Así que el alt describe lo que hay y no lo que se
     * quería, y la válvula sigue explicándose solo con palabras en la ficha. Si algún
     * día se fotografía la moka a propósito, es lo primero que hay que encuadrar.
     */
    photo: "/images/equipo/moka.jpg",
    alt: "Una cafetera moka de aluminio desmontada sobre una tela blanca: a la izquierda el recolector octogonal con la tapa abierta, a la derecha la caldera vista desde su boca, y entre las dos, de pie, la placa redonda del filtro con sus perforaciones. Delante hay granos de café tostado esparcidos.",
    credit: {
      photographer: "Ilona Jurtschenko-Roelofs",
      photoUrl: "https://www.pexels.com/photo/coffee-beans-on-the-table-7825922/",
      source: "Pexels",
    },
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
     * Es una escena de colado y no el objeto aislado, que es lo que se había pedido; se
     * aceptó porque en Pexels no existe el colador solo y porque aquí el colador ocupa
     * el centro, enfocado y a tamaño grande, con la olla y la taza claramente de reparto.
     *
     * Tres cosas que esta foto corrigió del alt que se había escrito a ciegas, y que
     * conviene no volver a escribir mal: la tela **no** es clara —está teñida de marrón
     * oscuro, casi negro en el borde—, el cono es **hondo** y no poco profundo, y no hay
     * mango de alambre: el aro se apoya en un soporte de tres patas que lo deja colgando
     * sobre la taza. Ese último punto importa porque los dos métodos que usan esta pieza
     * la describen sostenida por su aro; el soporte es otra forma del mismo aparato y no
     * los contradice, pero si algún día se escribe un paso que diga «sujeta el mango»,
     * esta foto no lo respalda.
     */
    photo: "/images/equipo/colador-de-tela.jpg",
    alt: "Un colador de café de tela colgado de un soporte de alambre sobre una taza: una bolsa de tela en forma de cono hondo, teñida de un marrón muy oscuro por el uso y cosida al borde de un aro metálico. Dentro tiene el café molido mojado, cubierto de espuma, y recibe un chorro de agua caliente desde una olla roja. Por la punta cae un hilo de café a una taza de peltre verde puesta en su plato negro, sobre una mesa de madera anaranjada.",
    credit: {
      photographer: "Magali Guimarães",
      photoUrl: "https://www.pexels.com/photo/pouring-coffee-through-paper-filter-6307235/",
      source: "Pexels",
    },
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
    // El alt se reescribió contra la foto. Lo que cambió respecto a lo que se buscaba:
    // el pico vertedor no se le ve desde este ángulo, así que no se nombra.
    alt: "Una jarra de vidrio de una sola pieza con forma de reloj de arena, vacía y vista desde arriba en escorzo: el cuerpo inferior se ensancha como un matraz de laboratorio y la boca superior se abre en embudo. A la altura del cuello lleva un collar de dos anillos de madera clara ceñido por una tira de cuero. Está sobre una mesa redonda cubierta con un mantel blanco que cruza en diagonal una banda de tela granate. Al fondo, desenfocadas, las patas de un taburete de madera y una vela encendida.",
    credit: {
      photographer: "Amirho3in tavkoli",
      photoUrl: "https://www.pexels.com/photo/chemex-coffee-maker-10794851/",
      source: "Pexels",
    },
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
    /*
     * El alt se reescribió contra la foto. Es una barra de cafetería y no el objeto
     * sobre fondo liso, pero el sifón es el protagonista sin discusión: ocupa el centro,
     * está enfocado y es lo único nítido. Se deja constancia de que detrás asoman otras
     * dos piezas de este mismo catálogo —un cono de goteo blanco y su jarra— porque es
     * el mismo defecto que tiene anotado `cono-v60`, aunque aquí en mucha menor medida.
     */
    alt: "Un aparato de vidrio de dos cuerpos montado sobre un soporte metálico, vacío: abajo una esfera de vidrio, y encajado encima un vaso cilíndrico también de vidrio del que baja un tubo largo hasta el fondo de la esfera. Entre los dos hay un tapón de goma negro. Dentro del vaso de arriba cuelga el filtro, un disco con su tela y una cadenita. Bajo la esfera, un quemador dorado con la tapa perforada. Está en la barra de una cafetería: al fondo desenfocado se distinguen un cono de goteo blanco con su jarra, un cuenco con granos de café y unos frascos.",
    credit: {
      photographer: "Omar Rodriguez",
      photoUrl: "https://www.pexels.com/photo/clear-glass-bong-1436310/",
      source: "Pexels",
    },
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
    // El alt se reescribió contra la foto: no es un frasco sino cuatro, y son anchos y
    // panzudos en vez de altos. Lo que importaba de la pieza —boca ancha, vacío y con
    // tapa metálica de rosca— se ve en todos.
    alt: "Cuatro frascos grandes de vidrio transparente, panzudos y de boca ancha, vacíos y cerrados con tapas metálicas de rosca de distintos colores: amarilla el de delante, verde oscuro y roja los de detrás. Están alineados sobre un tablero de madera clara contra una pared pálida y descascarillada. El vidrio está algo empañado.",
    credit: {
      photographer: "Yana Bulgak",
      photoUrl: "https://www.pexels.com/photo/glass-bottles-with-lid-on-table-8970996/",
      source: "Pexels",
    },
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
