import type { Article } from "./types";

/**
 * Tercer artículo de la sección y primero de la etapa de la finca.
 *
 * El ángulo es que los tres procesos no son tres estilos ni tres recetas: son tres
 * respuestas a una sola pregunta, cuánto tiempo se deja la fruta encima del grano. De ahí
 * sale la línea del beneficio, que es la variante `process` del bloque `scale`: dibuja los
 * tres caminos a la vez porque aquí la comparación *es* el contenido.
 *
 * Sobre las cifras. Los días de secado que circulan por los blogs (lavado 5-7, honey 8-12,
 * natural 15-30) no tienen fuente y se contradicen entre sí, así que NO son los que usa el
 * artículo: los que aparecen están medidos en el estudio de Catimor de Alto Inambari y van
 * declarados como lo que son, los de una variedad, una región y una cosecha.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **El rendimiento del estudio (lavado 75,83 % frente a natural 44,45 %) se descartó
 *   después de leer el texto completo, y es importante que quede escrito por qué**: los
 *   denominadores no son el mismo. El propio artículo dice que «in the natural and
 *   anaerobic processing methods drying and storage is performed with the whole coffee
 *   fruit without the removal of the husk and mucilage, unlike the washed and honey
 *   methods», y que en el natural «the coffee cherry remains intact until the moment of
 *   processing to obtain green coffee, where husk, mucilage and parchment are discarded».
 *   O sea que el rendimiento del natural se calcula sobre cereza seca entera y el del
 *   lavado sobre pergamino. El natural no pierde más café: se pesa con más cosa que no es
 *   café. En su lugar se usa el balance de masa, que arranca los cinco tratamientos en
 *   «Harvesting 100 %» y por tanto sí es comparable.
 * - Los porcentajes de mucílago de los grados del honey (blanco 10 %, amarillo 25 %, rojo
 *   50 %, negro 75-100 %) se descartaron: solo salen de tiendas y blogs, y esas mismas
 *   fuentes reconocen que el nombre no se aplica igual según la región y que en muchos
 *   países el color no dice cuánto mucílago quedó sino cuánto se caramelizó al secarse.
 *   Del honey se dice que es un rango y que el nombre no está normalizado.
 * - La composición del mucílago (agua 84,2 %, azúcares 4,1 %; u otra tabla que dice
 *   6,2-7,4 % de azúcares) se descartó: fuentes secundarias que no concuerdan. Se describe
 *   sin cifra.
 * - El «se pasa del 60 % de humedad al 10-12 %» se descartó en favor del 57 % medido.
 * - Que el natural sea más arriesgado y más variable NO se escribe como dato: no se
 *   encontró ninguna medición. Entra atribuido a productores y tostadores, igual que los
 *   196 °C del primer crack en el artículo de tueste.
 * - Del consumo de agua se usa la comparación con y sin recirculación, pero no una cifra
 *   suelta: el estudio que la publica no dice si el kilo es de cereza, de pergamino o de
 *   café verde.
 */
export const procesosEnOrigen: Article = {
  slug: "procesos-en-origen",
  title: "Lavado, natural y honey",
  tagline:
    "Los tres nombres que más vas a ver en una bolsa no hablan de limpieza ni de recetas. Hablan de una sola cosa: cuánto tiempo se dejó la fruta puesta sobre el grano.",
  stage: "finca",
  level: "Introductorio",

  blocks: [
    {
      kind: "paragraph",
      text: "En la bolsa, debajo del nombre de la finca, hay una palabra: «lavado», «natural», «honey». Casi todo el mundo la lee como si fuera un detalle de higiene —uno se lava y el otro no— o como si «natural» quisiera decir que es más puro y «honey» que lleva miel.",
    },
    {
      kind: "paragraph",
      text: "No es ninguna de las tres cosas. Esa palabra es la respuesta a una sola pregunta, y es la pregunta que más decide a qué va a saber tu café después de la variedad y la altura: cuánto tiempo se dejó la fruta puesta encima del grano.",
    },
    {
      kind: "heading",
      text: "El café es la semilla de una fruta",
    },
    {
      // Las capas de la cereza. Certeza alta, es anatomía descrita en toda la
      // literatura de beneficio. Se explican aquí los dos términos que el artículo
      // necesita después, mucílago y pergamino, porque los artículos se leen sueltos.
      kind: "paragraph",
      text: "Lo que se recoge en la finca no es un grano: es una fruta del tamaño de un arándano grande, roja cuando está madura, y se le llama *cereza*. Si la abres, de fuera hacia dentro hay piel, una pulpa dulce, una capa pegajosa y azucarada que se llama *mucílago*, una cascarilla fina y seca que se llama *pergamino*, y dentro de todo eso, normalmente dos semillas enfrentadas. Las semillas son el café.",
    },
    {
      kind: "paragraph",
      text: "Todo lo demás hay que quitarlo. A ese trabajo se le llama *beneficio*, y es lo que ocurre en la finca en los días siguientes a la recogida. La pregunta del beneficio no es si se quita la fruta —se quita siempre— sino **cuándo**.",
    },
    {
      // Fuente: Coffee Science, vol. 18 (2023), artículo e182078, Antezana y
      // Luna-Mercado. Revisado por pares, certeza alta. Cita textual: «The mass balance
      // shows that on average, only 14.43% of the harvested coffee is roasted, 85.57%
      // are residues (husk, mucilage, grain husk, defects, among others)», y por método
      // «from harvest (coffee cherry), only 13.01% to 15.13% is used for roasting and
      // consumption».
      //
      // Este dato sí es comparable entre procesos porque la tabla del balance de masa
      // arranca los cinco tratamientos en «Harvesting 100 %». Es el que se usa en lugar
      // del rendimiento, que no lo era; el motivo está en la cabecera del archivo.
      kind: "stat",
      value: "14,4 %",
      label: "De la cereza recogida es lo que acaba tostándose",
      note: "Todo lo demás —piel, pulpa, mucílago, cascarilla y los granos defectuosos— se queda por el camino. Según el proceso, entre un 13,0 % y un 15,1 %. De cada saco de cereza que sale del cafetal, algo más de un séptimo llega a una taza.",
      source: "Coffee Science, 2023",
    },
    {
      kind: "paragraph",
      text: "Puesto de otra forma: recoger cien kilos de cereza a mano, uno por uno y solo los maduros, para acabar con catorce kilos de café. Eso explica bastantes cosas sobre el precio de una bolsa buena.",
    },
    {
      // Foto pendiente. `src` en null pinta el bloque de color con su proporción; la
      // ruta no se escribe hasta que el archivo exista. El alt se escribe igual desde
      // ahora: es lo que dice qué fotografía hay que ir a buscar.
      kind: "image",
      image: {
        src: null,
        alt: "Vista desde arriba de una cama de secado: una gran bandeja de malla elevada sobre patas de madera, cubierta de una capa fina de granos de café extendidos a mano. Se distinguen dos zonas, una de cerezas enteras arrugadas y oscuras y otra de granos pálidos con su cascarilla. Al fondo, más camas en fila bajo un techo de plástico translúcido.",
      },
      caption:
        "Camas de secado. Es donde se pasan los días que decide todo lo que viene después.",
      shape: "landscape",
    },
    {
      kind: "heading",
      text: "Por qué el «cuándo» lo cambia todo",
    },
    {
      // Fuente: PMC8219142, estudio brasileño de secado. Revisado por pares, certeza
      // alta. Cita: el café natural empieza el presecado con «57% (w.b.)» de humedad y
      // el despulpado con «50% (w.b.)»; el almacenamiento queda en «11.03%» y «10.56%»
      // respectivamente.
      //
      // El 57 frente al 50 es el eje del artículo convertido en número, y por eso está
      // aquí y no en una cifra suelta: la diferencia entre los dos ES la pulpa.
      kind: "paragraph",
      text: "Mientras la fruta sigue puesta, dos cosas pasan a la vez. La primera es que el grano está mojado, y no un poco: un café que se seca con la cereza entera empieza el proceso con un 57 % de su peso en agua, frente al 50 % de uno al que ya se le ha quitado la pulpa. Esos siete puntos de diferencia son la fruta. De ahí hay que bajar, en los dos casos, hasta un 11 % para que el grano aguante meses en un saco sin echarse a perder.",
    },
    {
      kind: "paragraph",
      text: "La segunda es que esa fruta azucarada, pegada al grano y a temperatura ambiente, fermenta. Las levaduras y las bacterias que viven en ella se comen los azúcares y dejan a cambio ácidos y compuestos aromáticos nuevos, y parte de eso acaba dentro de la semilla. Cuanto más tiempo estén en contacto, más de esa fermentación se queda en el grano.",
    },
    {
      kind: "paragraph",
      text: "Así que el «cuándo» no es logística: es cuánta fruta deja el productor que entre en la semilla. Los tres nombres de la bolsa son tres respuestas a eso, y se entienden mejor viéndolas juntas.",
    },
    {
      kind: "heading",
      text: "Los tres caminos",
    },
    {
      /*
       * La línea del beneficio. Es la variante `process` del bloque `scale`: sin
       * deslizador, porque entre el lavado y el honey no hay nada intermedio que
       * comprar, y sin las barras del intercambio, porque los procesos no son un
       * intercambio entre dos cosas opuestas —el coste del lavado es agua y el del
       * natural es tiempo y riesgo, y eso no son los dos extremos de un mismo eje.
       *
       * Los días son los del estudio de Coffee Science 2023 y están medidos: el lavado
       * fermentó 15 horas y secó 10 días; el honey (yellow honey) secó 15 días; el
       * natural, 23. Todos hasta la humedad de almacenamiento recomendada. Son los
       * únicos días de este artículo y NO son los de los blogs, que no coinciden ni
       * entre sí.
       *
       * El eje del dibujo no está escrito en ninguna parte: sale del `totalDays` más
       * largo de estos tres carriles. Si algún día entra el anaerobio, el eje se estira
       * solo.
       */
      kind: "scale",
      variant: "process",
      intro: "Elige un camino y mira cuántos días sigue la fruta encima",
      axes: ["Lo que pasa con la fruta", "Lo que se nota en la taza"],
      steps: [
        {
          name: "Lavado",
          alias: "Washed",
          figure: "15 horas con fruta",
          notes: [
            "Se despulpa el mismo día de la recogida y se deja unas horas fermentando para que el mucílago se despegue. Después se lava con agua, y lo que se pone a secar es ya grano limpio dentro de su pergamino.",
            "Acidez marcada y taza limpia. Es el proceso que menos se interpone: lo que llega a la taza viene sobre todo de la variedad y de la ladera, no del beneficio.",
          ],
          // 15 horas de fermentación con el mucílago puesto, y 10 días de secado ya
          // limpio: el total es la suma, el contacto solo las 15 horas.
          lane: {
            contactDays: 15 / 24,
            totalDays: 15 / 24 + 10,
            material: "mucilage",
            range: false,
          },
        },
        {
          name: "Honey",
          alias: "Honey",
          figure: "15 días con fruta",
          notes: [
            "Se le quita la piel y la pulpa, pero el mucílago se queda pegado y se seca con el grano. Cuánto se deja es una decisión, no un valor fijo, y de ahí salen los honey de distinto color; los nombres, eso sí, no significan lo mismo en todas las regiones.",
            "El término medio, y por eso es el más difícil de describir: parte del dulzor y del cuerpo del natural con parte de la acidez del lavado.",
          ],
          // El único con `range`: que se deje más o menos mucílago es la decisión que
          // define los grados de color, así que su barra se dibuja como banda.
          lane: {
            contactDays: 15,
            totalDays: 15,
            material: "mucilage",
            range: true,
          },
        },
        {
          name: "Natural",
          alias: "Natural",
          figure: "23 días con fruta",
          notes: [
            "No se le quita nada. La cereza entera se seca sobre el grano, y tarda más precisamente porque la fruta sigue ahí soltando agua. Solo cuando está seca se descascara todo de una vez.",
            "Más cuerpo y más dulzor, con una fruta que tira a fruta pasa o a vino antes que a fruta fresca. Es el proceso que más se nota, para bien y para mal.",
          ],
          lane: {
            contactDays: 23,
            totalDays: 23,
            material: "cherry",
            range: false,
          },
        },
      ],
      note: "Los tres empiezan el mismo día en la misma cereza. Lo único que cambia es cuándo se le quita la fruta al grano, y de ahí sale casi todo lo demás.",
      diagramNote:
        "Los días están medidos, pero en un estudio con una variedad, una región y una cosecha, y el secado depende del clima de esa semana: sirven para ver la proporción entre los tres, no como constantes del café. El alto de cada barra dice qué sigue puesto encima —la cereza entera o solo el mucílago—, y el rayado del honey es hasta dónde puede llegar, porque cuánto mucílago se deja es una decisión. Esas dos cosas son un diagrama y no una medición: no hay porcentajes de mucílago que se sostengan.",
    },
    {
      kind: "paragraph",
      text: "Mirado así se entiende de golpe lo que la palabra de la bolsa quiere decir. El lavado tiene la fruta puesta unas horas; el natural, más de tres semanas. Entre esos dos extremos no hay una diferencia de estilo: hay treinta y siete veces más tiempo de contacto.",
    },
    {
      kind: "heading",
      text: "¿Y se nota tanto como se dice?",
    },
    {
      kind: "paragraph",
      text: "Aquí es donde conviene bajar el volumen. Se habla de los procesos como si cambiaran el café de arriba abajo, y hay un estudio que lo midió con catadores certificados y las diez categorías que puntúa la SCA, el estándar internacional de cata.",
    },
    {
      // Fuente: Coffee Science 2023, mismo estudio. Cita textual: «of the sensory
      // attributes, only fragrance and body were significantly different». Las ocho que
      // NO salieron significativas son sabor, sabor residual, acidez, balance,
      // uniformidad, taza limpia, dulzor y puntuación del catador.
      //
      // Este es el contrapeso del artículo, el papel que en el de tueste hacía la
      // cafeína. Y el matiz lo pone el propio estudio: lo atribuye a haber trabajado con
      // una sola variedad, y eso va escrito en el párrafo de abajo en vez de callarse.
      kind: "stat",
      value: "2 de 10",
      label: "Las categorías de cata que el proceso movió de verdad",
      note: "Fragancia y cuerpo. Las otras ocho —sabor, acidez, dulzor, balance, taza limpia y las demás— no dieron diferencias estadísticamente significativas entre lavado, honey y natural.",
      source: "Coffee Science, 2023",
    },
    {
      kind: "paragraph",
      text: "Las puntuaciones totales quedaron cerca: 84,00 el lavado, 82,88 el honey y 85,75 el natural. Parece un orden, pero el estudio no lo respalda como tal: de las diez categorías solo dos se movieron de forma significativa. Y el matiz lo pone el propio trabajo, que atribuye esa falta de diferencias a haber hecho la prueba con una sola variedad de café.",
    },
    {
      kind: "paragraph",
      text: "Así que la conclusión razonable no es «el natural es mejor», ni «el lavado es más fino». Es que el proceso cambia sobre todo **a qué huele** y **cómo llena la boca**, y bastante menos el resto. Es más de lo que parece y menos de lo que se cuenta.",
    },
    {
      // Frase pendiente: la escribe Juan. Con `text` vacío el bloque no se pinta, así
      // que la página publicada no enseña el hueco esperándola.
      // Solo caben dos cosas aquí: un dicho popular sobre el café, que va sin
      // atribución, o una cita con fuente verificada, que la lleva en `attribution`.
      kind: "pullquote",
      text: "",
    },
    {
      kind: "heading",
      text: "Lo que dicen quienes lo hacen, y no está medido",
    },
    {
      // Atribuido, no afirmado. Que el natural sea más arriesgado se repite en decenas
      // de sitios y no se encontró ni una medición que lo respalde, así que el párrafo
      // dice quién lo dice. Es el mismo tratamiento que los 196 °C del primer crack en
      // el artículo de tueste.
      kind: "paragraph",
      text: "Hay una parte de esto que no se puede escribir como dato, y merece decirse en voz alta. Productores y tostadores coinciden en que el natural es el proceso más difícil de controlar: tres semanas de fruta húmeda al aire son tres semanas en las que puede aparecer moho o irse la fermentación de las manos, y basta con una semana de lluvia a destiempo. El lavado, dicen, perdona más y sale más parecido a sí mismo un año y el siguiente.",
    },
    {
      kind: "paragraph",
      text: "Es plausible, lo repite todo el mundo del café y encaja con el mecanismo. Pero no he encontrado una sola medición que lo cuantifique, así que queda así: es lo que dice el oficio, no una cifra. Si lo tienes en cuenta al comprar, tenlo en cuenta con ese peso.",
    },
    {
      kind: "heading",
      text: "Y por qué Colombia lava",
    },
    {
      // Consumo de agua: PMC11181887, cuenca del Gidabo, Etiopía. Revisado por pares.
      // Cita: «If the industry's water recirculation system is fully functional they only
      // consume about 22 l of water to completely wash a kilogram of coffee. However, due
      // to nonfunctional recycling systems, currently they are consuming on average 63 l».
      //
      // Certeza alta en el orden de magnitud y en la comparación con y sin recirculación;
      // BAJA en la cifra exacta, porque el propio artículo no dice si el kilo es de
      // cereza, de pergamino o de café verde. Por eso el texto no da un número suelto.
      kind: "paragraph",
      text: "Queda la pregunta que ninguna bolsa contesta: si los tres caminos salen de la misma cereza, ¿por qué cada país hace el suyo? Y la respuesta no es de gusto. El lavado necesita agua, y no un poco: se mide en decenas de litros por cada kilo de café. Un estudio de beneficiaderos en Etiopía encontró que con el sistema de recirculación funcionando se gastan unos 22 litros por kilo, y sin él, casi el triple.",
    },
    {
      // Fuente: Federación Nacional de Cafeteros. Certeza alta en lo que se afirma: que
      // el beneficio por vía húmeda es lo característico del café colombiano. No se
      // escribe ningún porcentaje de café lavado del país, que es el tipo de cifra que
      // circula sin respaldo.
      kind: "paragraph",
      text: "Colombia lava porque puede. El café colombiano se cultiva en ladera andina, donde el agua de montaña no es un problema sino el paisaje, y el beneficio por vía húmeda es lo que define al café del país desde hace un siglo. Etiopía, Yemen y buena parte de Brasil secan la cereza entera por lo contrario: porque allí el agua es lo que no hay, o porque el clima seco de la cosecha lo permite sin arriesgar la cosecha entera.",
    },
    {
      kind: "paragraph",
      text: "Igual que con la arábica y la robusta, lo que parece una decisión de estilo es en buena medida geografía. Un natural colombiano existe y cada vez hay más, pero es un experimento deliberado en un país construido para lavar; un natural etíope es, simplemente, lo que siempre se hizo allí.",
    },
    {
      // Segunda frase pendiente, mismas reglas. Cierra el artículo, así que pide algo
      // que se quede sonando y no un remate explicativo.
      kind: "pullquote",
      text: "",
    },
    {
      kind: "image",
      image: {
        src: null,
        alt: "Un puñado de café en pergamino sostenido en la palma de una mano abierta. Los granos son pálidos, de un beige amarillento, y están cubiertos por una cascarilla fina y papelosa que en algunos se ha resquebrajado y deja ver el grano verdoso de dentro. Al fondo, desenfocada, la malla de una cama de secado.",
      },
      caption:
        "Café en pergamino, seco y listo para guardar. La cascarilla se le quita justo antes de venderlo, no antes: es su último abrigo.",
      shape: "portrait",
    },
    {
      kind: "paragraph",
      text: "Con todo esto, la palabra de la bolsa ya dice algo. «Lavado» te anuncia una taza donde vas a oír la finca; «natural», una donde vas a oír el proceso; «honey», algo en medio que depende de cuánto mucílago decidió dejar alguien. Ninguna es mejor, y a estas alturas ya sabes que el «ninguna es mejor» no es diplomacia: es que solo dos de diez categorías se movieron.",
    },
  ],

  sources: [
    {
      publisher: "Coffee Science",
      title:
        "Effect of processing methods (washed, honey, natural, anaerobic) of catimor coffee on physical and sensory quality in Alto Inambari, Peru",
      url: "https://coffeescience.ufla.br/index.php/Coffeescience/article/view/2111",
      retrieved: "2026-09-12",
    },
    {
      publisher: "National Library of Medicine (PMC)",
      title:
        "Development and validation of a heated drying air diffusion system to optimize rotary dryers and final coffee quality",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8219142/",
      retrieved: "2026-09-12",
    },
    {
      publisher: "National Library of Medicine (PMC)",
      title:
        "Waste Water Management in Wet Coffee Processing Mills and their Impact on the Water quality status of Gidabo River and its Tributaries, Southern Ethiopia",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11181887/",
      retrieved: "2026-09-12",
    },
    {
      publisher: "Federación Nacional de Cafeteros",
      title: "Lavado (glosario del café)",
      url: "https://cauca.federaciondecafeteros.org/glosario/lavado/",
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
