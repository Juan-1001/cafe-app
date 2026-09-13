import type { Article } from "./types";

/**
 * Primer artículo de la sección. El ángulo es deshacer el sello de «100 % arábica»:
 * casi todo el mundo lo lee como un sello de calidad sin saber qué es lo otro.
 *
 * Todas las cifras de este archivo están comprobadas en fuente y la referencia
 * completa está abajo, en `sources`. Junto a cada dato queda anotado de cuál sale y
 * qué se decidió no escribir, para que dentro de un año se pueda revisar sin volver a
 * buscarlo todo.
 */
export const arabicaVsRobusta: Article = {
  slug: "arabica-vs-robusta",
  title: "Arábica y robusta",
  tagline:
    "Casi todo el café del mundo sale de dos especies, y la etiqueta de tu bolsa solo te habla de una. Qué significa de verdad ese «100 % arábica».",
  stage: "planta",
  level: "Introductorio",

  blocks: [
    {
      kind: "paragraph",
      text: "Si miras la bolsa de café que tienes en la cocina, hay muchas posibilidades de que ponga «100 % arábica» en alguna parte. Se ha convertido en un sello de calidad, y casi nadie que lo lee sabría decir qué es lo otro, eso que la bolsa presume de no llevar.",
    },
    {
      kind: "paragraph",
      text: "Lo otro es la robusta. Y la historia es bastante más interesante que «una buena y otra mala».",
    },
    {
      kind: "heading",
      text: "No son dos calidades: son dos plantas distintas",
    },
    {
      kind: "paragraph",
      text: "Arábica y robusta no son dos formas de tostar ni dos maneras de preparar. Son dos *especies* distintas del género *Coffea*, dos plantas que se parecen como se parecen un lobo y un perro. La arábica es *Coffea arabica*; la robusta es *Coffea canephora*.",
    },
    {
      kind: "paragraph",
      text: "Cuando oigas hablar de Caturra, Castillo o Geisha, eso es otra cosa: son *variedades* de arábica, subdivisiones dentro de una misma especie. Aquí estamos un escalón más arriba.",
    },
    {
      kind: "paragraph",
      text: "Y hay un detalle que cambia cómo se mira todo lo demás: la robusta no es una prima lejana de la arábica. Es su abuela. La arábica nació hace miles de años del cruce espontáneo de dos plantas silvestres, y una de las dos era precisamente la *Coffea canephora*. Por eso la arábica lleva dentro dos juegos completos de cromosomas, uno de cada progenitora, mientras que la robusta lleva uno solo.",
    },
    {
      // Fuente: estudio del metabolismo de la cafeína en las dos especies (PMC4282694).
      // Cita textual: la arábica es «allotetraploid (2n = 4x = 44 chromosomes) which
      // result from the natural hybridization of two diploid species: C. canephora
      // (Robusta) and C. eugenioides». Revisado por pares, certeza alta.
      kind: "stat",
      value: "44",
      label: "Cromosomas tiene la arábica",
      note: "El doble que la robusta, que tiene 22. No es una curiosidad de laboratorio: ese segundo juego de cromosomas se lo dio la propia robusta al cruzarse con otra especie silvestre, la *Coffea eugenioides*.",
    },
    {
      // La especie la nombró el botánico Louis Pierre en 1895; «robusta» lo lanzó como
      // nombre comercial el horticultor belga Linden en 1900, aprovechando que la roya
      // arrasaba los cafetales de arábica en Asia. Certeza: alta en el fondo (la especie
      // es canephora y «robusta» es un nombre comercial), media en la atribución
      // concreta a Linden y en el año, porque la fuente que lo detalla no está revisada
      // por pares. Por eso el texto no escribe ni el nombre ni la fecha: dice solo lo
      // que está firme.
      kind: "paragraph",
      text: "El nombre tampoco es lo que parece. «Robusta» no es el nombre científico de nada: fue un nombre comercial, inventado para vender la planta a comienzos del siglo XX. Por entonces la *roya* —un hongo que ataca las hojas del cafeto y lo deja sin poder alimentarse— estaba arrasando las plantaciones de arábica en Asia, y esta otra especie africana la aguantaba mucho mejor. Se vendió por lo que sabía hacer: resistir. El nombre se le quedó pegado, y *canephora* quedó para los botánicos.",
    },
    {
      kind: "image",
      image: {
        file: "/images/granos/arabica-vs-robusta-cerezas-en-la-rama.jpg",
        alt: "Primer plano de una rama de cafeto cargada de frutos redondos y apretados unos contra otros. La mayoría están maduros, de un rojo intenso que tira a morado, y entre ellos quedan varios todavía verdes. Todos están cubiertos de gotas de agua. Detrás, las hojas del cafetal quedan desenfocadas en verde claro.",
        credit: null,
      },
      caption:
        "El café es la semilla de una fruta. A esa fruta se le llama cereza, y en la misma rama conviven en distintos puntos de maduración.",
      shape: "landscape",
    },
    {
      kind: "heading",
      text: "Cada una quiere vivir en un sitio",
    },
    {
      kind: "paragraph",
      text: "La diferencia que de verdad manda es dónde aguanta cada planta. La arábica es delicada con el calor: está cómoda entre 18 y 21 °C de media y empieza a sufrir por encima de los 24. Eso la empuja montaña arriba, a laderas altas y frescas, donde el grano madura despacio. La robusta aguanta entre 24 y 30 °C y vive en tierras bajas y cálidas, donde la arábica no llegaría a dar cosecha.",
    },
    {
      // Temperaturas: NOAA Climate.gov, «Climate & Coffee». Certeza alta.
      // Altitud: deliberadamente sin horquilla numérica para la robusta. Las fuentes se
      // contradicen (unas dicen «por debajo de 600 m», otras «entre 800 y 1.500 m»), así
      // que la fila dice «tierras bajas y cálidas», que es lo que todas sostienen.
      // La altitud de la arábica que sí aparece es la de Colombia, no una global: sale
      // de la Federación Nacional de Cafeteros, y por eso la fila lo dice explícitamente
      // en vez de darla por universal.
      kind: "comparison",
      columns: ["Arábica", "Robusta"],
      rows: [
        {
          label: "Especie",
          values: ["*Coffea arabica*", "*Coffea canephora*"],
        },
        {
          label: "Temperatura cómoda",
          values: ["18 – 21 °C", "24 – 30 °C"],
        },
        {
          label: "Dónde crece",
          values: [
            "Montaña fresca. En Colombia, entre 1.200 y 2.200 m.",
            "Tierras bajas y cálidas.",
          ],
        },
        {
          label: "Cromosomas",
          values: ["44", "22"],
        },
        {
          label: "Cafeína en el grano maduro",
          values: ["La referencia", "Un 50 % más"],
        },
        {
          label: "Frente a la roya",
          values: ["Vulnerable", "Resistente"],
        },
      ],
      caption:
        "La cafeína no es solo un asunto de a cuánto te espabila: en la planta funciona como insecticida natural, y es parte de por qué la robusta se defiende mejor.",
    },
    {
      // Frase pendiente: la escribe Juan. Hasta que `text` tenga algo, este bloque no
      // se pinta, así que la página no enseña el hueco.
      // Solo caben dos cosas aquí: un dicho popular sobre el café, que va sin
      // atribución, o una cita con fuente verificada, que la lleva en `attribution`.
      // Nunca una letra de canción ni una frase inventada en boca de alguien.
      kind: "pullquote",
      text: "",
    },
    {
      kind: "heading",
      text: "Lo de la cafeína, con el número delante",
    },
    {
      kind: "paragraph",
      text: "Vas a leer en todas partes que la robusta tiene el doble de cafeína que la arábica. Es una exageración cómoda, de esas que se repiten porque suenan redondas.",
    },
    {
      // Fuente: PMC4282694. Cita textual: «In the mature bean (RG stage), the caffeine
      // content is 50 % higher in Robusta than in Arabica». Revisado por pares.
      // Se descartaron a propósito las horquillas que circulan por internet (arábica
      // 0,8–1,9 % del peso seco, canephora 1,2–2,4 %): aparecen en resúmenes de terceros
      // y no se pudo llegar al estudio original, así que no se escriben. El 50 % sí está
      // medido y es el que sostiene el párrafo de arriba.
      kind: "stat",
      value: "50 %",
      label: "Más cafeína en la robusta",
      note: "Medido en el grano maduro, comparado con la arábica. Más, sí; el doble, no.",
      source: "Estudio del metabolismo de la cafeína en las dos especies",
    },
    {
      kind: "paragraph",
      text: "Sigue siendo una diferencia grande, y se nota en la taza: la cafeína es amarga, así que un café con mucha robusta tiende a un amargor más plano. La arábica, madurando despacio en altura, desarrolla más azúcares y más ácidos, que es de donde salen esos sabores a fruta o a flores por los que alguien paga el triple por una bolsa.",
    },
    {
      kind: "heading",
      text: "Por qué la robusta ya no es la hermana pequeña",
    },
    {
      kind: "paragraph",
      text: "Aquí es donde el sello de «100 % arábica» empieza a envejecer. Durante décadas la robusta fue el relleno barato del café instantáneo y de las mezclas de supermercado. Ya no es solo eso, y la razón está en las dos temperaturas de más arriba.",
    },
    {
      // Fuente: Frontiers in Plant Science, 2026. Cita textual: «The global production of
      // robusta now accounts for 40% of all coffee production, up from 25% in the early
      // 1990s». Revisado por pares, certeza alta.
      // Se usa la tendencia y no el reparto actual a propósito: las fuentes que dan el
      // porcentaje de arábica van del 57 % al 75 % según qué midan y cómo, así que
      // cualquier cifra fija fingiría una precisión que no existe. La tendencia la
      // sostiene una sola fuente revisada y además dice mucho más.
      kind: "stat",
      value: "25 % → 40 %",
      label: "Lo que pesa la robusta en la producción mundial",
      note: "De aproximadamente una cuarta parte a comienzos de los noventa a unos cuatro de cada diez granos hoy.",
      source: "Frontiers in Plant Science, 2026",
    },
    {
      kind: "paragraph",
      text: "El mundo se está calentando y la arábica es la que no aguanta el calor. Las laderas que hoy le sirven van dejando de servirle, y la robusta, que vive cómoda justo en el rango de temperatura al que vamos, ocupa ese sitio. Que la robusta suba no es una decisión de la industria: es el termómetro.",
    },
    {
      kind: "heading",
      text: "Y desde Colombia, ¿esto cómo se ve?",
    },
    {
      // Fuente: Federación Nacional de Cafeteros (Caldas), balance del año cafetero
      // 2023-2024. Certeza alta en las dos afirmaciones: que Colombia produce
      // prácticamente solo arábica y que es el segundo productor mundial de esa especie.
      // No se escribe la cifra de sacos: es de un año concreto, envejece en meses y el
      // artículo no la necesita para lo que está contando.
      kind: "paragraph",
      text: "Colombia juega entera a la arábica: prácticamente todo el café del país es de esa especie, y es el segundo productor de arábica del mundo. No es una postura, es geografía. El café colombiano se cultiva en ladera andina, muy por encima de donde la robusta estaría a gusto, así que el país se especializó en lo único que esas alturas dan bien.",
    },
    {
      // Segunda frase pendiente, mismas reglas que la de arriba. Esta cierra el
      // artículo, así que pide algo que se quede sonando, no un remate explicativo.
      kind: "pullquote",
      text: "",
    },
    {
      // Cierra el artículo enseñando el final del recorrido: el mismo fruto de la
      // primera foto, ya seco y tostado, que es la única forma en la que el lector se
      // lo ha encontrado hasta ahora.
      kind: "image",
      image: {
        file: "/images/granos/arabica-vs-robusta-granos-tostados.jpg",
        alt: "Dos manos sostienen en horizontal un frasco de vidrio lleno hasta la mitad de granos de café ya tostados, de color marrón oscuro y brillante. Una cuchara metálica de mango largo saca una porción del frasco. Detrás, desenfocado, el delantal oscuro de quien lo sostiene.",
        credit: null,
      },
      caption:
        "El final del recorrido: la semilla de aquella fruta, ya seca y tostada. Entre la rama y el frasco pasan todos los pasos que deciden a qué va a saber.",
      shape: "portrait",
    },
    {
      kind: "paragraph",
      text: "Por eso, si compras café tostado en Bogotá, el «100 % arábica» de la bolsa no te está diciendo gran cosa: aquí es casi lo único que hay. Lo que sí te dice algo es de qué finca viene, a qué altura creció, qué le hicieron al recogerlo y cuándo se tostó. De eso van los siguientes artículos.",
    },
  ],

  sources: [
    {
      publisher: "Frontiers in Plant Science",
      title:
        "Genetic improvement of robusta coffee (Coffea canephora) in the 20th and 21st centuries",
      url: "https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2025.1719980/full",
      retrieved: "2026-09-12",
    },
    {
      publisher: "National Library of Medicine (PMC)",
      title:
        "Differential regulation of caffeine metabolism in Coffea arabica and Coffea canephora",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4282694/",
      retrieved: "2026-09-12",
    },
    {
      publisher: "NOAA Climate.gov",
      title: "Climate & Coffee",
      url: "https://www.climate.gov/news-features/climate-and/climate-coffee",
      retrieved: "2026-09-12",
    },
    {
      publisher: "Federación Nacional de Cafeteros",
      title:
        "Colombia se consolida como el 2° productor de café arábica en el mundo",
      url: "https://caldas.federaciondecafeteros.org/listado-noticias/al-finalizar-el-ano-cafetero-2023-2024-colombia-se-consolida-como-el-2-productor-de-cafe-arabica-en-el-mundo/",
      retrieved: "2026-09-12",
    },
  ],
};
