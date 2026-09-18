import type { Article } from "./types";
import { grindDemandFigure, grindDemandNames } from "../metodos/grind";

/**
 * Cuarto artículo de la sección y primero de la etapa 04, la que se abrió para él.
 *
 * El ángulo: cada ficha de método dice «media» o «gruesa» y el lector se tiene que fiar
 * de una comparación con la sal. Aquí esa palabra deja de ser una metáfora, y la tesis es
 * la que sostiene todo lo demás: **una molienda no es un tamaño, es un reparto**. De ahí
 * sale la variante `grind` del bloque `scale`, que dibuja ese reparto —trozos desiguales
 * con su polvo— en vez de puntos uniformes que encogen.
 *
 * Por qué el artículo está en /granos y no en /metodos está contado en `journey.ts`, que
 * es donde se movió la frontera de la sección.
 *
 * Lo que este artículo trae de otras partes del sitio, porque se afirmaba suelto y sin
 * explicar en ninguna: qué es un fino y por qué tapona (lo dicen cuatro fichas —moka,
 * V60, prensa francesa y sifón— cada una a su manera); por qué un molino de cuchillas
 * hace polvo y grumos a la vez; el hallazgo de Cameron et al. sobre dónde nace cada trozo,
 * que vivía enterrado en el `grounding` del espresso siendo un hecho general del moler; y
 * las micras de Córdoba et al., que hasta hoy solo estaban en un comentario de código del
 * cold brew con la decisión escrita de no enseñarlas «porque nadie tiene un molino con esa
 * escala». Esa decisión era buena para una casilla y deja de valer aquí, que es donde se
 * puede explicar qué es una micra antes de usarla.
 *
 * Lo que se queda en las fichas: el valor de cada casilla, los arreglos («abre un punto
 * la molienda») y el bucle del espresso. Una ficha tiene que servir con el café en la mano
 * y sin irse a leer un artículo.
 *
 * ## Sobre las cifras
 *
 * Fuentes consultadas el 2026-09-17, salvo las dos que ya estaban verificadas en el
 * repositorio desde el 2026-09-13 (1Zpresso y Gagné). El estándar de la SCA se descargó
 * de sca.coffee y el protocolo de 2015 de una copia archivada del PDF de scaa.org, que es
 * un dominio muerto. El texto completo de Córdoba et al. se releyó en PMC; la referencia
 * apunta al DOI de Scientific Reports, que es el mismo documento.
 *
 * La equivalencia malla 20 = 850 µm la escribe la propia SCA en el estándar de 2024, así
 * que no hace falta una fuente aparte; se corroboró de todas formas en las tablas de
 * ASTM E11 que publican dos fabricantes de tamices (Gilson y Endecotts), y no se citan
 * porque el artículo no se apoya en ellas.
 *
 * Lo que quedó fuera, anotado junto al dato con el que se confunde:
 *
 * - **Las tablas de micras por método no se descartan en silencio: son contenido.** Es el
 *   apartado que abre el artículo. Ninguna tiene documento detrás, se contradicen entre
 *   ellas y una se contradice dentro de la misma página; lo que las hace publicables es
 *   que algunas lo confiesan por escrito («we've set the range»). Mismo trato que los
 *   196 °C del primer crack y los 15 bares de la caja.
 * - **Los dos montones que publica Uman et al. (27,4 y 256,9 µm) no se escriben como «las
 *   micras» de ninguna molienda.** Son del estimado de superficie, no del recuento, y
 *   salen de un molino de laboratorio con muelas turcas y la apertura fija en un solo
 *   punto. De ese estudio se escribe el 99 % de partículas por debajo de 70 µm, con el
 *   matiz al lado.
 * - **Moler el grano frío se queda para el artículo de la frescura**, que es de esta misma
 *   etapa. El dato es de Uman et al. y es real, pero está mal citado por todas partes y
 *   conviene contarlo entero donde se hable de guardar el café: el reparto se estrecha al
 *   enfriar el grano y el mayor salto ocurre entre la temperatura ambiente y los −19 °C de
 *   un congelador, pero el 31 % de reducción del modo que se repite por ahí es enfriando a
 *   −196 °C con nitrógeno líquido, y el corte de finos a temperatura de congelador (73 ±
 *   3 µm) no mejora el de temperatura ambiente (70 ± 3 µm). Aquí abriría el
 *   almacenamiento, que no es la molienda, y gastaría dos veces el mismo material.
 * - **NTC 2441 no se ha leído y no se puede usar como clasificación.** ICONTEC la vende y
 *   de ella solo se conoce el título: «Café tostado y molido. Método para la determinación
 *   del tamaño promedio de partícula por distribución granulométrica». Es un **método de
 *   medición, no una tabla de niveles**, así que en ninguna parte se escribe que Colombia
 *   tenga una norma que defina qué es «molienda media»: los 501–700 y 701–900 µm son los
 *   dos puntos del estudio, medidos con ese método. Era el hallazgo más tentador de toda
 *   la búsqueda y habría sido falso.
 * - **Las micras del espresso siguen fuera**, igual que en su ficha: la cifra que circula
 *   sale de una nota de aplicación de un fabricante de instrumentos que no se leyó.
 * - **Nadie ha publicado una comparación de uniformidad entre molinos manuales y
 *   eléctricos.** Sin novedad desde la ficha del espresso.
 * - **El molino de cuchillas se cuenta como mecanismo y sin ninguna cifra**: no se
 *   encontró ninguna medición de lo que produce.
 */
export const laMolienda: Article = {
  slug: "la-molienda",
  title: "La molienda",
  tagline:
    "«Media», «gruesa», «media-fina». Son las palabras que más repite este sitio y las que peor se explican por ahí, porque lo que sale de un molino no tiene un tamaño: tiene muchos a la vez.",
  stage: "grano",
  level: "Intermedio",

  blocks: [
    {
      kind: "paragraph",
      text: "Todas las fichas de método de este sitio tienen una casilla que dice «Molienda» y, debajo, una palabra: «media», «gruesa», «media-fina». Y al lado una comparación para que te la puedas imaginar: como el azúcar de mesa, como la arena de playa, como la sal marina gruesa. Esas comparaciones son lo mejor que cabe en una casilla, pero son eso: una manera de señalar algo sin nombrarlo. Este es el artículo donde dejan de ser una metáfora.",
    },
    {
      kind: "paragraph",
      text: "Y hay un motivo para que la palabra sea tan escurridiza. Lo que sale de un molino no tiene *un* tamaño: tiene muchos a la vez, siempre. Cuando mueves la rosca no estás encogiendo los trozos de café uno por uno, estás cambiando cuántos hay de cada tamaño. Casi todo lo que se cuenta mal sobre la molienda —empezando por las tablas de micras que vas a encontrar en cuanto busques— sale de haber olvidado eso.",
    },
    {
      kind: "paragraph",
      text: "Antes de seguir, una unidad, porque va a aparecer en todo el artículo. Una **micra** es la milésima parte de un milímetro; en inglés la verás escrita como *micron* y con el símbolo µm. Mil micras son un milímetro, así que las 850 micras de un tamiz son ocho décimas de milímetro: eso todavía se ve. Cien micras, en cambio, son una décima de milímetro, y ahí ya estamos hablando de algo que a simple vista no es un trozo, es polvo.",
    },
    {
      kind: "heading",
      text: "Las tablas de micras se lo inventan, y lo dicen",
    },
    {
      kind: "paragraph",
      text: "Busca «grind size chart» y te salen decenas de tablas que dan un rango de micras para cada método: el espresso de 200 a 400, la prensa francesa de 800 a 1.200, el cold brew de 1.200 a 1.500. Tienen toda la pinta de una especificación. Lo llamativo es que no hace falta ir a buscar la fuente que les falta, porque algunas lo confiesan por escrito: una de las tablas más completas que circulan repite, cada vez que da un rango, «*we've set the range*» —«hemos fijado el rango»— y «*we've set the chart to*». Los números los puso la página. No hay estudio, no hay norma, no hay nadie midiendo: hay una redacción decidiendo.",
    },
    {
      kind: "paragraph",
      text: "Se nota en que no se ponen de acuerdo entre ellas, y en que a veces no se ponen de acuerdo ni consigo mismas. Una de las dos de aquí abajo da la prensa francesa entre 800 y 1.200 micras en su tabla y entre 1.000 y 1.500 unos párrafos más abajo, en la misma página, y el cold brew en 1.200–1.500 en un sitio y en «1.500 y más» en otro.",
    },
    {
      kind: "comparison",
      columns: ["Una tabla", "Otra tabla"],
      rows: [
        { label: "Espresso", values: ["180 – 380 µm", "200 – 400 µm"] },
        { label: "V60", values: ["400 – 700 µm", "400 – 500 µm"] },
        { label: "Vertido en general", values: ["410 – 930 µm", "400 – 700 µm"] },
        {
          label: "Prensa francesa",
          values: ["690 – 1.300 µm", "800 – 1.200 µm / 1.000 – 1.500 µm"],
        },
        { label: "Cold brew", values: ["800 – 1.400 µm", "1.200 – 1.500 µm"] },
      ],
      caption:
        "Dos guías tomadas al azar entre las que salen primero. Ninguna de las dos cita un estudio, una norma ni una medición propia; la primera escribe que los rangos los ha fijado ella, y la segunda se contradice consigo misma en la fila de la prensa francesa. Las dos están en las fuentes del final, porque aquí lo que se afirma es que dicen esto.",
    },
    {
      kind: "paragraph",
      text: "Ahora pon al lado lo único de todo esto que tiene una medición y una cata detrás. El estudio colombiano en el que se apoya la ficha del cold brew molió café de Huila y Nariño en dos puntos, midió el tamaño promedio de las partículas con el método de la norma colombiana y llamó **gruesa** a un promedio de 701 a 900 micras. Con esa molienda y veintidós horas se extrajo más café; con esa misma molienda y catorce horas salió la taza que más gustó a los catadores.",
    },
    {
      kind: "stat",
      value: "701 – 900 µm",
      label: "la molienda que en el estudio se llama «gruesa»",
      note: "Tamaño promedio medido con el método de la norma colombiana NTC 2441, sobre café de Huila y Nariño y con un molino comercial. Es el dato de ese café y ese molino, no una constante: lo que hace es enseñar dónde cae de verdad una molienda gruesa cuando alguien la mide.",
      source: "Córdoba et al., Scientific Reports (2019)",
    },
    {
      kind: "paragraph",
      text: "Mira las dos cosas juntas y verás el desajuste: las tablas empiezan la gruesa justo donde el estudio la termina, y al cold brew lo mandan a 1.200 o 1.500 micras, casi el doble de lo que se cató como mejor. No se trata de que las tablas estén mal por diez o veinte micras. Es que el suelo de su escala está por encima del techo de la única medición que alguien se ha molestado en probar en taza.",
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
      text: "Lo que escribe la única institución que se atreve",
    },
    {
      kind: "paragraph",
      text: "Hay un sitio donde el café de especialidad sí le pone un número a una molienda, y es el suyo propio: la catación, esa mesa donde se prueban cafés a cucharadas para puntuarlos. La asociación que fija ese procedimiento, la SCA, lo tiene escrito en su estándar vigente, y conviene leer la frase entera porque lo importante no es la cifra, es la forma: el café de catación se molerá de modo que «el 70-75 % de la molienda pase por el tamiz de malla 20 US (850 µm de luz)», y eso «es algo más grueso que lo que se usa normalmente para goteo con filtro de papel».",
    },
    {
      kind: "paragraph",
      text: "Fíjate en lo que no dice. No dice «las partículas medirán 850 micras». Dice cuánta parte de la molienda tiene que pasar por un agujero de ese tamaño, y da por hecho que el resto no pasa. Es una definición que admite desde el principio que en la misma cucharada hay trozos de todo, y que lo único que se puede fijar es la proporción. La institución que más razones tendría para publicar un tamaño no publica un tamaño: publica un reparto.",
    },
    {
      kind: "stat",
      value: "70 – 75 %",
      label: "de la molienda de catación pasa por un tamiz de 850 micras",
      note: "La frase lleva veinte años intacta: aparece igual en los protocolos de 2005 y en la revisión de 2015, y lo que le añadieron en el estándar de 2024 fue la equivalencia en micras de la malla 20. Que la propia SCA la escriba ahorra una discusión: por ahí se lee que esa malla son 900 micras, y son 850.",
      source: "SCA Standard 102-2024",
    },
    {
      kind: "paragraph",
      text: "Y hay un segundo silencio que dice todavía más. El mismo estándar contempla catar con otros aparatos —una cafetera de filtro, una prensa francesa— y ahí, cuando tendría que dar el número de cada uno, no lo da: dice que la molienda sea «la propia del método elegido» y se calla. Si alguien en el mundo tuviera una tabla de micras por método, sería esta gente. No la tienen.",
    },
    {
      kind: "heading",
      text: "Una molienda es un reparto",
    },
    {
      kind: "paragraph",
      text: "Imagina que pudieras separar una cucharada de café molido por tamaños, como se separan las monedas: un montón con los trozos grandes, otro con los medianos, otro con el polvo. Si dibujaras cuánto hay en cada montón no saldría una montaña con una sola cima, saldrían dos jorobas: un montón de polvo muy fino y otro de trozos bastante más grandes, con poca cosa en medio. En la literatura del café esto se da por sabido; los autores del estudio suizo de 2024 lo escriben como quien recuerda algo obvio: «el café tostado y molido es bien sabido que tiene una distribución de tamaño de partícula bimodal». Bimodal quiere decir exactamente eso, dos jorobas.",
    },
    {
      kind: "image",
      image: {
        // Foto pendiente: la ruta ya está escrita y el archivo todavía no. Hasta que
        // se guarde, `resolveContentImage` deja el bloque de color en su sitio.
        file: "/images/granos/la-molienda-cafe-molido.jpg",
        alt: "Primer plano extremo de un montón de café recién molido, visto desde arriba y ocupando todo el encuadre. De lejos parecería un polvo marrón uniforme, pero de cerca se distinguen trozos de tamaños muy distintos: algunos pedazos angulosos y brillantes del tamaño de un grano de sal gruesa, otros mucho menores, y entre todos ellos un polvo mate y clarísimo que rellena los huecos.",
        credit: null,
      },
      caption:
        "Lo que de lejos parece un polvo uniforme, de cerca son trozos de muchos tamaños con polvo entre ellos. Esa mezcla es la molienda.",
      shape: "landscape",
    },
    {
      kind: "paragraph",
      text: "Cuánto polvo hay es más de lo que nadie diría a ojo. En 2016, un equipo de once autores entre investigadores universitarios y baristas molió cuatro cafés de orígenes distintos y midió las partículas una por una: contándolas de esa manera, el 99 % medía 70 micras o menos. O sea que casi todo lo que sale del molino, en número de trozos, es polvo. Los pedazos que tú ves —los que te permiten decir «esto parece sal marina»— son una minoría diminuta de la cuenta, aunque sean casi toda la masa. Lo que ves es lo que pesa; lo que no ves es lo que abunda.",
    },
    {
      kind: "stat",
      value: "99 %",
      label: "de las partículas, contadas una a una, miden 70 micras o menos",
      note: "Medido en un solo molino —un EK 43 de laboratorio con muelas turcas y la apertura fija— y en un solo ajuste, muy fino: el número es de esa molienda y no de todas. Los dos montones que publican, 27,4 y 256,9 micras, son del estimado de superficie y no del recuento, y el aparato mide tratando cada partícula como si fuera una esfera, que no lo es.",
      source: "Uman et al., Scientific Reports (2016)",
    },
    {
      kind: "paragraph",
      text: "Con esto en la cabeza, la frase «moler más fino» cambia de significado. No es que cada trozo se haga más pequeño y ya está: lo que pasa es que el reparto entero se desplaza y, sobre todo, que la parte de polvo crece. Esa es la parte que decide casi todo lo que te va a salir mal, y tiene nombre propio.",
    },
    {
      kind: "heading",
      text: "Los finos, o el polvo que decide",
    },
    {
      kind: "paragraph",
      text: "A ese polvo se le llama **finos**, y por fin hay una definición con número: el estudio suizo llama finos a «la fracción en volumen de las partículas menores de 100 micras». Ojo con la frontera, porque es un convenio y no una medida de la naturaleza: el grupo de 2016 se calculó la suya con otro criterio y le salió en torno a 70 micras. Que dos trabajos serios pongan la raya en sitios distintos es lo primero que conviene saber antes de leer cualquier tabla de las de antes: «fino» es una palabra con dueño, y cada laboratorio declara el suyo.",
    },
    {
      kind: "paragraph",
      text: "Lo que ese estudio hizo fue ir a comprobar qué cambia cuando hay más finos, y lo hizo de la manera más limpia posible: tamizando el polvo aparte y echándolo de vuelta a propósito, para mover solo eso. El resultado es que el lecho de café —la capa mojada por la que pasa el agua— deja pasar menos agua cuanto más polvo tiene: el caudal baja y la extracción se alarga. Los finos no ocupan el hueco por donde pasa el agua, lo taponan.",
    },
    {
      kind: "paragraph",
      text: "Que es, palabra por palabra, lo que llevan diciendo cuatro fichas de este sitio cada una a su manera: que en la moka «los finos son los que taponan el filtro», que en el V60 «los finos taparon el papel», que en la prensa francesa el problema son «demasiados trozos finos, casi siempre por un molino de cuchillas», que en el sifón «el polvo de un molino de cuchillas tapona la tela». Las cuatro hablan de esto, y ahora ya sabes de qué tamaño es «esto».",
    },
    {
      kind: "scale",
      variant: "grind",
      intro: "Mueve el mando: los cinco puntos que usa el sitio y qué sale del molino en cada uno.",
      axes: ["Al tacto", "Quién la pide"],
      /*
       * Las referencias al tacto son **las mismas que ya escriben las fichas** —el azúcar
       * de mesa del V60, la arena de playa del colado en tela, la sal marina de la
       * prensa—, y eso no es pereza: si aquí dijeran otra cosa, el sitio tendría dos
       * descripciones distintas del mismo punto y el lector no sabría cuál vale.
       *
       * `figure` y la segunda nota no se escriben: se leen de `brewMethods`. Así el día
       * que entre un método nuevo, su nombre aparece en el peldaño que le toque sin que
       * nadie tenga que acordarse de este archivo. La cuenta de hoy es 1 · 3 · 3 · 1 · 2,
       * que son los diez métodos del sitio sin huérfanos.
       *
       * Los dos números de `spread` son el dibujo y no una medición: ver `GrindWeight`.
       * Van en escalera —el trozo baja de 5 a 1 mientras el polvo sube de 1 a 5— porque
       * eso es lo único que está medido, la dirección.
       */
      steps: [
        {
          name: "Fina",
          figure: grindDemandFigure("Fina"),
          notes: [
            "Entre la sal de mesa y la harina: todavía arenosa entre los dedos, ya casi polvo.",
            grindDemandNames("Fina"),
          ],
          spread: { chunk: 1, fines: 5 },
        },
        {
          name: "Media-fina",
          figure: grindDemandFigure("Media-fina"),
          notes: [
            "Como el azúcar de mesa: se siente granulada entre los dedos, no polvo.",
            grindDemandNames("Media-fina"),
          ],
          spread: { chunk: 2, fines: 4 },
        },
        {
          name: "Media",
          figure: grindDemandFigure("Media"),
          notes: [
            "Como la arena de playa: un punto más abierta que la del V60.",
            grindDemandNames("Media"),
          ],
          spread: { chunk: 3, fines: 3 },
        },
        {
          name: "Media-gruesa",
          figure: grindDemandFigure("Media-gruesa"),
          notes: [
            "Más abierta que el azúcar de mesa y sin llegar a la sal marina.",
            grindDemandNames("Media-gruesa"),
          ],
          spread: { chunk: 4, fines: 2 },
        },
        {
          name: "Gruesa",
          figure: grindDemandFigure("Gruesa"),
          notes: [
            "Como la sal marina gruesa: se distinguen los trozos a simple vista.",
            grindDemandNames("Gruesa"),
          ],
          spread: { chunk: 5, fines: 1 },
        },
      ],
      diagramNote:
        "El cuadro es un puñado de café molido visto muy de cerca. Las manchas son los trozos que reconocerías a simple vista y los puntos, los finos. Al apretar la molienda las manchas se hacen menores y los puntos aumentan: lo que nunca pasa es que el polvo desaparezca.",
      note: "El reparto del cuadro es un dibujo y no una medición: nadie ha publicado cuántos trozos de cada tamaño da «una molienda media», y lo único medido que cita este artículo sale de un molino de laboratorio en un solo ajuste. Lo que el dibujo cuenta es la dirección, que sí está medida: al moler más fino, la proporción de finos sube. Por eso las micras están arriba, en sus propios bloques, y no debajo de estos cinco peldaños: de los cinco, solo dos tienen una cifra medida detrás.",
    },
    {
      kind: "heading",
      text: "De dónde sale cada trozo",
    },
    {
      kind: "paragraph",
      text: "Un molino de muelas no corta el café: lo aprieta entre dos discos con dientes hasta que se rompe, y lo va empujando hacia la salida mientras el hueco entre los discos se estrecha. El estudio que mejor ha medido el espresso encontró que en ese recorrido pasan dos cosas en dos sitios distintos, y esa distinción es la que explica todo lo anterior: el tamaño de los trozos grandes lo fija la separación entre las muelas, y los finos se producen en el punto donde el grano se parte.",
    },
    {
      kind: "image",
      image: {
        // Foto pendiente: la ruta ya está escrita y el archivo todavía no. Hasta que
        // se guarde, `resolveContentImage` deja el bloque de color en su sitio.
        file: "/images/granos/la-molienda-muelas.jpg",
        alt: "Un molino de café de mano desmontado sobre una superficie clara. Se ven sus dos muelas de metal por separado: una cónica, con estrías talladas en diagonal que se hacen más finas hacia la punta, y el anillo que la envuelve, con estrías iguales por dentro. Entre las dos piezas queda el hueco por el que sale el café molido, y en las estrías se distinguen restos de polvo marrón.",
        credit: null,
      },
      caption:
        "Las dos piezas entre las que se rompe el grano. Lo que mueve la rosca del molino es el hueco que dejan entre ellas, no el tamaño del café.",
      shape: "portrait",
    },
    {
      kind: "paragraph",
      text: "O sea que los finos no son un defecto de tu molino ni una señal de que sea malo: son el subproducto inevitable de partir algo. Cuando rompes una galleta con las manos no te quedan dos mitades limpias, te quedan dos mitades y migas. La rosca del molino decide el tamaño de las mitades; las migas salen igual, y salen más cuantas más veces se parta.",
    },
    {
      kind: "paragraph",
      text: "Con esto se entiende de una vez por qué un molino de cuchillas no puede hacer bien este trabajo, que es algo que cinco fichas del sitio dan por sabido. Un molino de cuchillas no muele: trocea. No tiene ninguna separación que fije el tamaño de nada, así que el trozo que ya está pequeño sigue recibiendo golpes y se hace polvo, mientras que otro pedazo puede esquivar la cuchilla y salir casi entero. De ahí salen a la vez las dos cosas que arruinan una taza —el polvo que tapona y los grumos que no se extraen—, y no se arregla moliendo más o menos tiempo: más tiempo hace más polvo del que ya había.",
    },
    {
      kind: "paragraph",
      text: "Los molinos de muelas buenos anuncian su escala en micras por clic, y esa cifra también hay que leerla con cuidado. 1Zpresso publica que en su J-Max cada clic mueve las muelas 8,8 micras: es dato del fabricante y nadie lo ha comprobado desde fuera, pero el número sirve para ver de qué habla la rosca. Lo que se mueve 8,8 micras es *la separación entre las muelas*, no el tamaño del café que va a salir. La rosca gobierna el techo de los trozos grandes; sobre el polvo no manda.",
    },
    {
      // Frase pendiente: la escribe Juan. Mismo criterio que el otro hueco: dicho
      // popular sin atribución, o cita verificada con su `attribution`. Si se queda
      // vacía, el bloque no se pinta.
      kind: "pullquote",
      text: "",
    },
    {
      kind: "heading",
      text: "Y la uniformidad, ¿cuánto importa?",
    },
    {
      kind: "paragraph",
      text: "Llegados aquí es inevitable pensar que el molino ideal es el que da todos los trozos iguales, y es la idea con la que se venden. Conviene saber qué hay medido, porque es menos de lo que parece. El trabajo más grande que existe no está en una revista: lo hizo Jonathan Gagné, que analizó trescientas distribuciones de tamaño de partícula de veinticuatro molinos de espresso con un instrumento de laboratorio y lo publicó en su propio blog. No incluyó ni un molino manual, así que sobre esos no dice nada.",
    },
    {
      kind: "paragraph",
      text: "Y lo más honesto del trabajo es una frase de su autor: escribe que no está nada claro que esas diferencias de uniformidad se noten en la taza de una forma perceptible. Quien más ha mirado esto de cerca es quien menos promete. Tenlo a mano la próxima vez que alguien te explique que su molino es mejor porque es más uniforme: puede que lo sea, y aun así nadie ha demostrado que lo notes.",
    },
    {
      kind: "heading",
      text: "Qué hacer con todo esto",
    },
    {
      kind: "paragraph",
      text: "Nada de lo anterior te dice en qué número poner tu molino, y ninguna tabla puede decírtelo: el mismo clic da repartos distintos en dos molinos, y hasta en el mismo molino con dos cafés tostados de manera diferente. Lo que sí te da es una forma de leer las fichas de este sitio. Cuando una dice «media-fina» no está señalando un tamaño que exista en algún catálogo: está diciendo dónde ponerte en tu propio molino, y las comparaciones con el azúcar y la sal son la única referencia que funciona igual en todas las cocinas.",
    },
    {
      kind: "paragraph",
      text: "Y te da una pregunta mejor para cuando algo salga mal. No «qué tamaño tenía mi molienda», que no tiene respuesta, sino «cuánto polvo había»: si el agua se atascó, si la taza salió turbia y áspera, si el último sorbo traía poso, estabas mirando a los finos. Es lo último que le pasa al grano siendo grano. De aquí en adelante ya es agua, y de eso van los métodos de preparación.",
    },
  ],

  sources: [
    {
      publisher: "Specialty Coffee Association",
      title:
        "SCA Standard 102-2024, «Coffee Value Assessment: Sample Preparation and Tasting Mechanics» — de aquí sale el 70-75 % por el tamiz de malla 20 (850 µm), apartado 5.2.3",
      url: "https://sca.coffee/s/AW_SCA-102_Sample-Preparation_281024_Secured.pdf",
      retrieved: "2026-09-17",
    },
    {
      publisher: "Specialty Coffee Association of America",
      title:
        "«SCAA Protocols | Cupping Specialty Coffee», revisión del 16 de diciembre de 2015 — la misma frase sin la equivalencia en micras; el PDF original de scaa.org, hoy dominio muerto, leído en el archivo de la Wayback Machine",
      url: "https://web.archive.org/web/2019id_/https://www.scaa.org/PDF/resources/cupping-protocols.pdf",
      retrieved: "2026-09-17",
    },
    {
      publisher: "Specialty Coffee Association of America",
      title:
        "«Specialty Coffee Association of America Cupping Protocols», Cupping Committee, abril de 2005 — la misma frase de la molienda veinte años antes; copia alojada por un tercero, con el pie del comité impreso en el documento",
      url: "https://atlanticspecialtycoffee.com/wp-content/uploads/SCAA-Cupping-Protocols-2005.pdf",
      retrieved: "2026-09-17",
    },
    {
      publisher: "Scientific Reports",
      title:
        "Córdoba, N. et al., «Effect of grinding, extraction time and type of coffee on the physicochemical and flavour characteristics of cold brew coffee» (2019) — café colombiano; de aquí salen las dos moliendas medidas, 501–700 y 701–900 µm",
      url: "https://www.nature.com/articles/s41598-019-44886-w",
      retrieved: "2026-09-17",
    },
    {
      publisher: "Scientific Reports",
      title:
        "Smrke, S., Eiermann, A. y Yeretzian, C., «The role of fines in espresso extraction dynamics» (2024), Coffee Excellence Center de la ZHAW — la definición de fino por debajo de 100 µm y la caída de caudal al añadir finos",
      url: "https://www.nature.com/articles/s41598-024-55831-x",
      retrieved: "2026-09-17",
    },
    {
      publisher: "Scientific Reports",
      title:
        "Uman, E. et al., «The effect of bean origin and temperature on grinding roasted coffee» (2016) — el 99 % de las partículas por debajo de 70 µm, medido en un EK 43 con muelas turcas y la apertura fija",
      url: "https://www.nature.com/articles/srep24483",
      retrieved: "2026-09-17",
    },
    {
      publisher: "Matter",
      title:
        "Cameron, M. I. et al., «Systematically Improving Espresso: Insights from Mathematical Modeling and Experiment» (2020) — el tamaño de los trozos grandes lo fija la separación de las muelas y los finos nacen en el punto de fractura",
      url: "https://www.osti.gov/pages/biblio/1973594",
      retrieved: "2026-09-13",
    },
    {
      publisher: "1Zpresso",
      title:
        "Serie J, especificaciones del fabricante — las 8,8 micras por clic del J-Max",
      url: "https://1zpresso.coffee/j/",
      retrieved: "2026-09-13",
    },
    {
      publisher: "Coffee ad Astra",
      title:
        "Gagné, J., «What I learned from analyzing 300 particle size distributions for 24 espresso grinders» (2023) — autopublicado, sin molinos manuales, y con la advertencia de su autor sobre si la uniformidad se percibe",
      url: "https://coffeeadastra.com/2023/09/21/what-i-learned-from-analyzing-300-particle-size-distributions-for-24-espresso-grinders/",
      retrieved: "2026-09-13",
    },
    {
      publisher: "Honest Coffee Guide",
      title:
        "«Coffee Grind Size Chart» — la tabla que escribe «we've set the range» cada vez que da un rango en micras",
      url: "https://honestcoffeeguide.com/coffee-grind-size-chart/",
      retrieved: "2026-09-17",
    },
    {
      publisher: "BrewedLate",
      title:
        "«Coffee Grind Size Chart: Micron Guide for Every Brew» — la tabla que da la prensa francesa en 800–1.200 µm y en 1.000–1.500 µm en la misma página",
      url: "https://brewedlate.com/blog/coffee-grind-size-chart-complete-guide-for-every-brewing-method",
      retrieved: "2026-09-17",
    },
  ],
};
