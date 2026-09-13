import type { Article } from "./types";

/**
 * Segundo artículo de la sección y primero de la etapa del tostador.
 *
 * El ángulo es el intercambio: el tueste no mejora ni empeora un café, cambia una cosa
 * por otra. De ahí sale el deslizador, que es el primer bloque interactivo de un
 * artículo y existe porque esa relación —una cosa que se retira mientras otra avanza—
 * es justo la que no se deja explicar en un párrafo.
 *
 * Sobre las cifras: el tueste es la zona del café donde más números circulan sin
 * respaldo, así que aquí se separó lo medido de lo repetido antes de escribir una línea.
 * Lo que quedó fuera está anotado abajo, junto al dato con el que se confunde, para que
 * dentro de un año no haya que volver a buscarlo todo:
 *
 * - Las temperaturas de crack (196 °C el primero, 224–230 °C el segundo) NO se escriben
 *   como dato. Solo aparecen en blogs de tostadores, y el problema de fondo es que son
 *   lecturas de sonda y no la temperatura dentro del grano, así que no se pueden
 *   comparar entre máquinas. En vez de darlas se cuenta el mecanismo y se explica por
 *   qué esa cifra no significa lo que parece: es el apartado «Y ahora, lo de los 196 °C».
 * - Los rangos de temperatura por nivel de tueste («claro 180–205, medio 210–220…») se
 *   descartaron: se contradicen entre fuentes y ni siquiera miden lo mismo. Los 230–250 °C
 *   del estudio que sí se cita son temperatura del AIRE de la tostadora, que es otra cosa.
 * - Los cortes de la escala Agtron por nivel (canela 85–75, americano ~65…) se
 *   descartaron: vienen de tiendas y fabricantes, no de un documento de la SCA al que se
 *   haya podido llegar, y no coinciden entre sí. Del Agtron se dice que existe y que va
 *   al revés, que es lo único firme.
 * - El reparto «el 87 % de lo que se pierde es agua y el 13 % gases» se descartó: la
 *   única fuente era el blog de una tienda.
 * - Lo de que el grano oscuro es menos denso y por eso una cuchara colmada lleva menos
 *   café se quedó fuera por no encontrar una medición que lo respalde, aunque explicaría
 *   parte del mito de la cafeína.
 */
export const nivelesDeTueste: Article = {
  slug: "niveles-de-tueste",
  title: "Niveles de tueste",
  tagline:
    "Qué le hace el calor al grano, por qué suena al tostarse y cuál es el intercambio detrás de cada nivel: cuanto más oscuro, menos se nota de dónde viene el café.",
  stage: "tostador",
  level: "Introductorio",

  blocks: [
    {
      kind: "paragraph",
      text: "En la bolsa pone «tueste medio». A veces «tueste alto», o «francés», y en algunas solo un dibujito de tres granos de los que dos están rellenos. Lo que ninguna explica es qué cambia de uno a otro, y resulta que es casi todo.",
    },
    {
      kind: "paragraph",
      text: "El tueste es el único paso del recorrido del café en el que el grano se transforma con fuego, y es también el más corto: se mide en minutos, no en meses. Todo lo que la planta tardó años en construir y la finca meses en preservar se juega ahí.",
    },
    {
      kind: "heading",
      text: "Lo primero que pasa es que se seca",
    },
    {
      // Humedad del café verde. Certeza media-alta: el rango 10–12 % lo dan
      // comerciantes y tostadores, no un documento de la SCA al que se haya podido
      // llegar; lo que sí está firme es el método normalizado (ISO 6673, pérdida de
      // masa a 105 °C) y que el comercio internacional trabaja con un máximo en torno
      // al 12,5 %. Por eso el texto dice «alrededor de» y no da una cifra exacta: el
      // artículo solo necesita el dato para explicar que la primera mitad del tueste es
      // secar, y ahí la precisión no aporta nada.
      kind: "paragraph",
      text: "El café verde no huele a café. Huele a hierba, a heno, a bodega, y si lo muerdes es duro como una piedrecita. Lleva agua dentro: alrededor de un 10 o un 12 % de su peso. Esa humedad se mide con un método normalizado —se seca una muestra a 105 °C y se pesa lo que falta— porque de ella depende que el grano aguante meses en un saco sin echarse a perder.",
    },
    {
      kind: "paragraph",
      text: "La primera mitad del tueste se va casi entera en quitar esa agua. El grano pasa de verde a amarillo y luego a canela, y en ese tramo todavía no huele a café: huele a pan, a tostada, a cereal caliente.",
    },
    {
      // Foto pendiente. `src` en null pinta el bloque de color con su proporción; la
      // ruta no se escribe hasta que el archivo exista de verdad. El alt se escribe
      // igual desde ahora: es lo que dice qué fotografía hay que ir a buscar.
      kind: "image",
      image: {
        src: null,
        alt: "Un montón de granos de café verde sin tostar, vistos de cerca y desde arriba. No son marrones sino de un gris verdoso apagado y mate, y cada grano tiene una hendidura que lo recorre a lo largo por el centro. Entre ellos quedan restos de la película fina y translúcida que los envuelve.",
      },
      caption:
        "Café verde, tal y como llega al tostador después de meses de finca. Todavía no huele a café.",
      shape: "landscape",
    },
    {
      kind: "heading",
      text: "El chasquido",
    },
    {
      // Mecanismo del primer crack. Certeza alta y esta sí es literatura revisada: las
      // paredes celulares pasan de estado vítreo a elástico entre 100 y 160 °C, y la
      // presión interna de vapor y CO₂ acaba venciendo la estructura, con expansión de
      // volumen detrás. Lo que la literatura NO da es una temperatura universal del
      // crack, y de eso va el apartado siguiente.
      kind: "paragraph",
      text: "Hacia la mitad del proceso ocurre algo mecánico, y es la parte que de verdad merece entenderse. Las paredes de las células del grano —la estructura rígida que lo sostiene, hecha de azúcares encadenados— se ablandan con el calor y pasan de quebradizas a elásticas, como el plástico de una botella cuando se le acerca una llama. Dentro, mientras tanto, la presión sube: el agua que queda se ha convertido en vapor y el propio tueste está fabricando dióxido de carbono, y ninguno de los dos sale tan rápido como se genera.",
    },
    {
      kind: "paragraph",
      text: "Llega un punto en el que la estructura no aguanta y cede. Y se oye: un chasquido seco, y detrás decenas, como las primeras palomitas de un microondas. Es lo que se llama el *primer crack*. El grano se abre por dentro, se hincha, y a partir de ahí empieza a ser café.",
    },
    {
      kind: "paragraph",
      text: "Desde ese momento el tostador ya no está secando: está decidiendo. Cada segundo que el grano siga dentro lo vuelve un poco más oscuro, y eso es lo que se llama nivel de tueste. Sacarlo pronto o tarde es toda la diferencia entre los cinco peldaños que vienen más abajo.",
    },
    {
      kind: "heading",
      text: "Y ahora, lo de los 196 °C",
    },
    {
      kind: "paragraph",
      text: "Si buscas «primer crack» vas a encontrar en todas partes la misma cifra: 196 °C. Repetida con aplomo, a veces con decimales, y casi nunca con una fuente detrás. Vale la pena saber por qué no significa lo que parece.",
    },
    {
      // Esta es la parte que el artículo tiene que dejar clara, y el motivo por el que
      // la cifra no se escribe como dato en ningún otro sitio del archivo. La
      // imposibilidad de medir el interior del grano con sonda está en la propia
      // literatura de tueste; lo demás se deduce de ahí.
      kind: "paragraph",
      text: "Esa cifra no es la temperatura del grano. Es lo que marca la sonda de una tostadora, y una sonda es un termómetro metido en el bombo, donde le llega a la vez el calor del aire, el de la chapa y el de los granos que la van rozando al girar. Lo que pasa dentro del grano, que es exactamente donde se rompe algo, no hay manera de medirlo con una sonda.",
    },
    {
      kind: "paragraph",
      text: "La consecuencia práctica es que el número no se puede comparar entre máquinas. El mismo café, tostado hasta el mismo punto en dos tostadoras distintas, cracka con dos cifras distintas en la pantalla, y las dos son correctas para su máquina. Un tostador usa ese número como referencia de su propio equipo, igual que tú sabes que tu horno «va fuerte»: te sirve a ti, no a quien tiene otro horno.",
    },
    {
      kind: "paragraph",
      text: "Así que del primer crack quédate con el mecanismo y no con el número. Y la próxima vez que leas una temperatura exacta sobre café, la pregunta que lo aclara todo es dónde estaba puesto el termómetro.",
    },
    {
      // Frase pendiente: la escribe Juan. Con `text` vacío el bloque no se pinta, así
      // que la página publicada no enseña el hueco esperándola.
      // Solo caben dos cosas aquí: un dicho popular sobre el café, que va sin
      // atribución, o una cita con fuente verificada, que la lleva en `attribution`.
      // Nunca una letra de canción ni una frase inventada en boca de alguien.
      kind: "pullquote",
      text: "",
    },
    {
      kind: "heading",
      text: "El segundo crack, y por qué el grano brilla",
    },
    {
      // Igual que arriba: se cuenta lo que se observa y el mecanismo, sin temperatura.
      // Los 224–230 °C que circulan solo tienen fuentes de blog.
      kind: "paragraph",
      text: "Si el grano sigue dentro, la estructura —ya reseca y frágil— se vuelve a romper, más bajito y más seguido. Es el segundo crack. Esta vez no es vapor empujando: es la propia armazón del grano cediendo, y por los huecos que se abren empiezan a salir a la superficie los aceites que estaban encerrados.",
    },
    {
      kind: "paragraph",
      text: "Por eso los granos muy oscuros se ven brillantes y dejan la mano grasienta, y los claros están mates y secos. El brillo de una bolsa de café no es señal de frescura, como suele creerse: es nivel de tueste. Es lo que se ve aparecer en los dos peldaños más oscuros del deslizador que viene un poco más abajo.",
    },
    {
      kind: "image",
      image: {
        src: null,
        alt: "Primer plano de granos de café tostados muy oscuros, casi negros, apilados unos sobre otros. La superficie de cada grano devuelve la luz en puntos brillantes: están cubiertos de una capa fina de aceite salida de dentro. La hendidura del centro se ve abierta y más clara que el resto del grano.",
      },
      caption:
        "El brillo no es frescura. Son los aceites del propio grano, que asoman cuando el tueste llega lejos.",
      shape: "portrait",
    },
    {
      kind: "heading",
      text: "Lo que se pierde por el camino",
    },
    {
      // Fuente: International Journal of Food Science and Technology, vol. 60 (2025),
      // artículo vvaf189. Revisado por pares, certeza alta. Cita textual: los ácidos
      // clorogénicos totales bajan «from 77.58 ± 1.55 mg/g in unroasted beans to
      // 4.92 ± 0.03 mg/g in Italian roast»; el isómero 5-CQA, de 48,27 a 0,99 mg/g.
      // El 94 % es la división de esas dos cifras, no un número de la fuente, y por eso
      // la nota escribe las dos para que se pueda comprobar.
      kind: "stat",
      value: "94 %",
      label: "De los ácidos clorogénicos se va en un tueste muy oscuro",
      note: "De 77,6 miligramos por gramo en el grano verde a 4,9 en el tueste más oscuro del estudio. Es la mejor medida que hay de cuánto ha pasado un grano por el fuego.",
      source:
        "International Journal of Food Science and Technology, 2025",
    },
    {
      // Deliberadamente NO se escribe «la acidez que percibes sale de los ácidos
      // clorogénicos». La acidez percibida viene de varios ácidos a la vez (cítrico,
      // málico, quínico…) y los clorogénicos aportan también amargor y astringencia, así
      // que colgarles toda la acidez sería más limpio de leer y falso. Lo que sí se
      // afirma es que son una de las piezas y que su desaparición mide el tueste.
      kind: "paragraph",
      text: "Los ácidos clorogénicos son un grupo de compuestos que el café verde trae de fábrica y que el calor destruye. Son una de las piezas de lo que en una taza llamamos «acidez», esa chispa que hace que un café sepa a fruta y no a agua marrón, y su desaparición es tan ordenada que sirve para saber cuánto tueste lleva un grano.",
    },
    {
      // Dirección del cambio sensorial: Food Chemistry 2020 y trabajos con lengua
      // electrónica coinciden. Certeza alta en la DIRECCIÓN, ninguna en las cantidades,
      // y el párrafo lo dice en voz alta en vez de dar una cifra inventada.
      kind: "paragraph",
      text: "Y no van solos. Medido con paneles de catadores entrenados y también con instrumentos, la dirección sale siempre la misma: a más tueste, menos acidez, menos fruta y menos dulzor, y más amargor. No hay una cifra que diga cuánta fruta queda, porque eso es percepción y no una magnitud con unidades; pero el sentido del cambio está medido una y otra vez.",
    },
    {
      // Mismo estudio de 2025. Las cinco pérdidas de peso van en el deslizador, aquí
      // solo los extremos. El detalle del solape es una lectura de los márgenes de
      // error del propio estudio (francés 25,07 ± 1,35; italiano 25,56 ± 1,00: se
      // superponen de sobra), no una afirmación de la fuente, y por eso el texto lo
      // presenta como lo que es.
      kind: "paragraph",
      text: "Lo que sí se puede pesar es el grano. Un mismo café pierde alrededor del 13 % de su peso en un tueste claro y cerca del 25 % en uno muy oscuro: casi todo es el agua que se fue, y el resto, gases y aromas que se escapan. Hay un detalle bonito en esos números: entre los dos niveles más oscuros la diferencia cabe dentro del propio margen de error de la medición. Al final de la escala ya no queda casi nada que perder, y lo único que sigue cambiando es el sabor.",
    },
    {
      kind: "heading",
      text: "El intercambio",
    },
    {
      kind: "paragraph",
      text: "Aquí está la idea central, y es la que en texto cuesta explicar porque son dos cosas moviéndose a la vez. El tueste no mejora ni empeora un café: cambia una cosa por otra. A medida que avanza, lo que el grano traía de su origen se va retirando y lo que el fuego pone va ocupando su sitio.",
    },
    {
      /*
       * El deslizador. Los cinco peldaños son los cinco niveles del estudio de 2025, y
       * eso no es casualidad: así cada uno puede llevar su pérdida de peso realmente
       * medida en lugar de una cifra puesta a ojo.
       *
       * Los `weights` de las barras son otra cosa y no se deben confundir: son un
       * diagrama. No existe una magnitud llamada «cuánta fruta le queda a un tueste
       * medio», así que ese número no se enseña nunca en pantalla y `note` avisa de lo
       * que las barras son y de lo que no. Lo que está medido es la dirección del
       * intercambio, y es lo único que las barras dibujan.
       *
       * Ningún peldaño llega a 0 a propósito, y menos el último: el estudio de Foods de
       * 2023 encontró que el origen sigue siendo detectable incluso en tueste oscuro. Una
       * barra vacía afirmaría que no queda nada, y eso sería pasarse de lo que se sabe.
       */
      kind: "scale",
      variant: "roast",
      intro: "Mueve el deslizador y mira qué se cambia por qué",
      axes: ["Lo que viene del grano", "Lo que pone el tueste"],
      steps: [
        {
          name: "Claro",
          alias: "Light",
          figure: "pierde 12,6 %",
          notes: [
            "La acidez está entera, y con ella lo que distingue a este café de cualquier otro: fruta, flores, la ladera donde creció.",
            "Apenas un fondo de cereal y de pan tostado. El fuego todavía no ha puesto sabor propio.",
          ],
          weights: [6, 1],
          /*
           * Los colores del grano son los del café tostado de verdad, no de la paleta
           * del sitio, porque aquí el color es el dato. Están medidos: cada salto entre
           * peldaños contiguos da un ΔE00 de entre 8 y 12, y el umbral en el que un ojo
           * normal empieza a notar una diferencia está en 2,3. Ninguno hay que exagerar.
           * El surco pasa de 3:1 contra su propio cuerpo en los cinco peldaños.
           *
           * Canela claro. Superficie mate y seca: aquí todavía no ha salido nada de
           * dentro del grano, así que no lleva brillo.
           */
          bean: { body: "#A9703F", crease: "#F0DCC4", sheen: 0 },
        },
        {
          name: "Medio",
          alias: "Medium",
          figure: "pierde 16,3 %",
          notes: [
            "Se sigue reconociendo de dónde viene, pero la acidez ha bajado y la fruta se lee más como fruta madura que como fruta fresca.",
            "Aparecen el caramelo y el chocolate con leche. Eso no estaba en el grano: lo ha puesto el calor.",
          ],
          weights: [5, 2],
          // Marrón medio, todavía mate.
          bean: { body: "#8A5330", crease: "#E2C4A4", sheen: 0 },
        },
        {
          name: "Medio-oscuro",
          alias: "City",
          figure: "pierde 21,5 %",
          notes: [
            "Queda el cuerpo y una insinuación del origen. Los aromas más delicados, los florales, ya no están.",
            "Manda el tueste: chocolate oscuro, frutos secos, y un amargor que antes no estaba ahí.",
          ],
          weights: [3, 4],
          // Marrón oscuro. Sigue seco: el segundo crack no ha llegado.
          bean: { body: "#663721", crease: "#CBA77F", sheen: 0 },
        },
        {
          name: "Oscuro",
          alias: "French",
          figure: "pierde 25,1 %",
          notes: [
            "Muy poco llega a la taza por encima del tueste. A ciegas, acertar de dónde viene deja de ser realista.",
            "Ahumado, amargo, espeso. Es el sabor del fuego, y se parece bastante venga el café de donde venga.",
          ],
          weights: [2, 5],
          // Ya asoma el primer brillo: la estructura se ha roto por segunda vez y el
          // aceite empieza a salir a la superficie.
          bean: { body: "#452414", crease: "#AB855C", sheen: 1 },
        },
        {
          name: "Muy oscuro",
          alias: "Italian",
          figure: "pierde 25,6 %",
          notes: [
            "Lo que traía el grano queda debajo de todo lo demás. Sigue estando, y los instrumentos lo detectan, pero bebiendo no se encuentra.",
            "Carbón y ceniza, y el aceite ya asomando en la superficie del grano.",
          ],
          weights: [1, 6],
          // Casi negro y francamente graso. Es el grano que deja la mano brillante.
          bean: { body: "#2A150E", crease: "#8A6547", sheen: 2 },
        },
      ],
      diagramNote:
        "Los granos son un dibujo, pero su color no: es el del café tostado a cada nivel. El brillo de los dos últimos es el de los aceites que salen a la superficie después del segundo crack.",
      note: "Las barras son un diagrama, no una medición: no existe una escala de «cuánta fruta» que se pueda pesar en miligramos. Lo que está medido, y por eso se dibuja, es la dirección del intercambio. La pérdida de peso de cada peldaño sí es un dato, pero sale de un estudio con una tostadora y un café: sirve para ver el orden de magnitud, no como una constante del café.",
    },
    {
      // Fuente: Foods, 2023 (PMC9914344). 46 cafés de especialidad de 18 países en
      // tueste claro, medio y oscuro. Revisado por pares, certeza alta.
      // Las dos citas textuales que sostienen el párrafo, y hacen falta las dos:
      // «the lighter the roast, the more preserved the acidic and volatile profile
      // deriving from the fermentation/drying phases», y
      // «independently of the roasting level, coffee kept a certain degree of unicity
      // deriving from its area of origin».
      // El matiz no es un adorno: es lo que impide que el titular del artículo se lea
      // como «el tueste oscuro borra el origen», que es más cómodo de decir y más de lo
      // que la fuente sostiene.
      kind: "paragraph",
      text: "Conviene no exagerar el titular, y esto es lo que lo matiza. Un estudio de 2023 analizó 46 cafés de especialidad de 18 países en tueste claro, medio y oscuro, y encontró dos cosas a la vez. La primera, que cuanto más claro es el tueste, mejor se conserva el perfil que el café traía de su finca. La segunda, que pasara lo que pasara con el tueste, cada café seguía guardando algo reconocible de su zona de origen.",
    },
    {
      kind: "paragraph",
      text: "O sea que el tueste oscuro no borra: tapa. La diferencia sigue estando ahí, y el aparato de medida la encuentra. Lo que se pierde es tu capacidad de notarla.",
    },
    {
      // Segunda frase pendiente, mismas reglas que la de arriba. Esta cae justo después
      // del matiz del origen, así que pide algo que se quede sonando y no un remate
      // explicativo.
      kind: "pullquote",
      text: "",
    },
    {
      kind: "heading",
      text: "Lo que el tueste casi no cambia",
    },
    {
      // Mismo estudio de 2025. Cita: la cafeína muestra «only slight variations with
      // different roasting conditions», entre 13,08 y 13,57 mg/g en los cinco niveles.
      // Revisado por pares, certeza alta. El valor va con el rango entero y no con una
      // media porque la media escondería justo lo que el dato demuestra: que apenas se
      // mueve.
      kind: "stat",
      value: "13,1 – 13,6",
      label: "Miligramos de cafeína por gramo, del tueste más claro al más oscuro",
      note: "La cafeína aguanta el calor casi sin enterarse. No se quema con el tueste ni se concentra.",
      source:
        "International Journal of Food Science and Technology, 2025",
    },
    {
      // Se dice «por gramo de café» porque es como está medido y porque es la puerta por
      // la que entra el mito: mucha gente compara cucharadas, no gramos. Lo que NO se
      // escribe es la explicación de la densidad del grano oscuro, que suena razonable
      // pero no se encontró medida en ninguna fuente.
      kind: "paragraph",
      text: "Vas a oír las dos versiones del mito, y se contradicen entre sí: que el tueste oscuro tiene más cafeína porque es «más fuerte», y que tiene menos porque el calor la quema. Medida en el mismo estudio que las pérdidas de peso, la cafeína se queda prácticamente igual en los cinco niveles, gramo de café a gramo de café. Lo que sí cambia con el tueste es el amargor, y «fuerte» en una taza casi siempre quiere decir amargo, no cafeinado.",
    },
    {
      kind: "heading",
      text: "¿Y cómo sé qué tueste estoy comprando?",
    },
    {
      // La escala Agtron: que existe y que va al revés, certeza alta. Los cortes por
      // nivel NO se dan, y el párrafo siguiente explica por qué en vez de callárselo.
      kind: "paragraph",
      text: "Hay una forma de medir el nivel de tueste sin depender de adjetivos: se ilumina el café con luz infrarroja y se mide cuánta devuelve, porque un grano más tostado es más oscuro y refleja menos. De ahí sale un número, la escala Agtron, y tiene una trampa de lectura: va al revés de lo que uno esperaría. Número alto, tueste claro. Número bajo, tueste oscuro.",
    },
    {
      kind: "paragraph",
      text: "No te voy a dar los cortes —de tal número a tal número es «medio»— porque los que circulan por ahí vienen de tiendas y de fabricantes, no coinciden entre sí, y no he podido llegar al documento que los fije. Y de todas formas casi ninguna bolsa trae el Agtron impreso.",
    },
    {
      kind: "paragraph",
      text: "Lo que sí trae una bolsa bien hecha es la fecha de tueste y las *notas de cata*: la lista de sabores que el tostador encontró al probarlo. Y ahí está el atajo. Si alguien se ha molestado en escribir «mandarina» y «panela», está diciéndote que el tueste es claro, porque en un tueste oscuro esas notas no sobreviven. Si pone «chocolate intenso» y «nuez», está diciendo lo contrario. Las notas de cata terminan siendo el mejor indicador de nivel de tueste que vas a encontrar en una etiqueta.",
    },
    {
      kind: "paragraph",
      text: "El tueste es el último paso antes de que el café llegue a tu molino, y también el último en el que alguien decide por ti. De ahí en adelante —la molienda, el agua, el tiempo— ya es cosa tuya, y de eso van los métodos de preparación.",
    },
  ],

  sources: [
    {
      publisher: "International Journal of Food Science and Technology",
      title:
        "Modulating bioactive compounds and antioxidant potential in coffee beans: impact of roasting on amino acids, phenolics, proteins, and caffeine",
      url: "https://academic.oup.com/ijfst/article/60/2/vvaf189/8262800",
      retrieved: "2026-09-12",
    },
    {
      publisher: "Foods (National Library of Medicine, PMC)",
      title:
        "Volatile Compounds in Green and Roasted Arabica Specialty Coffee: Discrimination of Origins, Post-Harvesting Processes, and Roasting Level",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9914344/",
      retrieved: "2026-09-12",
    },
    {
      publisher: "Journal of Food Engineering",
      title:
        "Development of coffee bean porosity and thermophysical properties during roasting",
      url: "https://www.sciencedirect.com/science/article/pii/S0260877424001626",
      retrieved: "2026-09-12",
    },
    {
      publisher: "Food Chemistry",
      title:
        "Effect of roasting degree of coffee beans on sensory evaluation: Research from the perspective of major chemical ingredients",
      url: "https://pubmed.ncbi.nlm.nih.gov/32559595/",
      retrieved: "2026-09-12",
    },
    {
      publisher: "Organización Internacional de Normalización (ISO)",
      title:
        "ISO 6673:2025 — Green coffee: determination of loss in mass at 105 °C",
      url: "https://www.iso.org/standard/87697.html",
      retrieved: "2026-09-12",
    },
  ],
};
