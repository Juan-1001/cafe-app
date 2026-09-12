import type { BrewMethod } from "./types";

export const v60: BrewMethod = {
  slug: "v60",
  name: "V60",
  tagline:
    "Un cono acanalado y un filtro de papel para una taza limpia, aromática y fácil de repetir todas las mañanas.",
  difficulty: { label: "Intermedio", level: 2 },

  recipe: {
    coffeeGramsPerCup: 15,
    // Aquí la única pérdida es el agua que se quedan el molido y el papel: el cono
    // se vacía entero en la jarra, así que no hay nada más que descontar.
    waterRetainedPerGram: 2,
    // Gramos de agua por gramo de café en cada hito del vertido.
    waterMarks: { floracion: 3, vertido1: 10 },
  },

  specs: {
    ratio: {
      value: "1:16",
      note: "{cafe} de café por {agua} de agua. Sube a 1:15 si la quieres más intensa.",
    },
    grind: {
      value: "Media-fina",
      note: "Como el azúcar de mesa: se siente granulada entre los dedos, no polvo.",
    },
    waterTemperature: {
      value: "92–94 °C",
      note: "En Bogotá el agua hierve cerca de los 91 °C, así que puedes usarla apenas la retiras del fuego.",
    },
    totalTime: {
      value: "3:00 – 3:30",
      note: "Desde el primer vertido hasta que deja de gotear.",
    },
    output: {
      value: "{rendimiento}",
      note: "Lo que llega a la taza: el molido se queda con unos {retenida} de agua.",
    },
    cupProfile: {
      value: "Limpia",
      note: "El papel retiene los aceites y las partículas más finas del molido, así que la bebida queda casi transparente y los sabores se distinguen uno a uno. Es el método donde más se nota de dónde viene el grano.",
    },
  },

  equipment: [
    {
      name: "Cono V60 tamaño 02",
      note: "El de plástico conserva el calor mejor que el de cerámica.",
      image: { src: null, alt: "Cono V60 apoyado sobre una jarra de vidrio" },
    },
    {
      name: "Filtros de papel 02",
      note: "Los naturales saben a papel si no los enjuagas.",
      image: { src: null, alt: "Filtros de papel cónicos para V60" },
    },
    {
      name: "Molino de muelas",
      note: "El de cuchillas parte el grano en trozos desiguales.",
      image: { src: null, alt: "Molino manual de muelas junto a granos de café" },
    },
    {
      name: "Báscula con temporizador",
      note: "Precisión de 0,1 g: pesar en vez de medir por cucharadas lo cambia todo.",
      image: { src: null, alt: "Báscula digital con una jarra encima" },
    },
    {
      name: "Hervidor de cuello de cisne",
      note: "Su pico fino te da control sobre el caudal del agua.",
      image: { src: null, alt: "Hervidor de cuello de cisne vertiendo agua en espiral" },
    },
    {
      name: "Jarra o servidor de vidrio",
      note: "Cualquier taza sirve, pero en la jarra ves el nivel de la bebida.",
      image: { src: null, alt: "Jarra de vidrio recibiendo el café bajo el cono" },
    },
  ],

  steps: [
    {
      time: "Previo",
      title: "Enjuaga el filtro y precalienta",
      description:
        "Pon el filtro en el cono, apóyalo sobre la jarra y vierte agua caliente hasta empaparlo por completo. Bota esa agua antes de seguir.",
      why: "El papel sin enjuagar aporta un sabor a cartón, y un cono frío le roba calor al agua justo cuando más falta hace.",
    },
    {
      time: "Previo",
      title: "Añade el café y nivela el lecho",
      description:
        "Vierte los {cafe} de café recién molido, dale un golpecito al cono para aplanar la superficie y hunde un dedo en el centro para hacer un pequeño hoyo.",
      why: "Un lecho plano hace que el agua atraviese todo el café por igual. El hoyo ayuda a que el primer chorro moje también el molido del fondo.",
    },
    {
      time: "0:00 – 0:45",
      title: "Floración",
      description:
        "Arranca el cronómetro y vierte {floracion} de agua, el triple del peso del café, mojando todo el molido. Verás una espuma que sube y baja sola.",
      why: "El café recién tostado guarda CO₂. Ese gas empuja el agua hacia afuera, así que si no lo dejas escapar primero, la extracción sale despareja.",
    },
    {
      time: "0:45 – 1:15",
      title: "Primer vertido, hasta {vertido1}",
      description:
        "Vierte en espiral, del centro hacia afuera, sin llegar a tocar las paredes del filtro.",
      why: "La espiral moja el café que quedó seco arriba. Si mojas el papel, parte del agua baja por el borde sin pasar por el café.",
    },
    {
      time: "1:15 – 1:45",
      title: "Segundo vertido, hasta {agua}",
      description:
        "Completa los {agua} con vertidos más suaves, manteniendo el nivel del agua alto pero sin que rebose.",
      why: "Con el lecho siempre cubierto, la temperatura y el ritmo de extracción se sostienen hasta el final.",
    },
    {
      time: "1:45",
      title: "Asienta el lecho",
      description:
        "Toma el cono y dale un giro corto y horizontal para que el café pegado a las paredes vuelva al fondo.",
      why: "El café que se queda en la pared nunca se extrae, y un lecho desnivelado hace que el agua se abra camino por un solo lado.",
    },
    {
      time: "≈ 3:00",
      title: "Deja escurrir y sirve",
      description:
        "El goteo debe terminar entre 3:00 y 3:30. Retira el cono, gira la jarra para mezclar la bebida y sirve.",
      why: "El tiempo total es tu mejor señal: si termina mucho antes, la molienda está gruesa; si se pasa, está demasiado fina.",
    },
  ],

  commonMistakes: [
    {
      problem: "La taza sabe amarga y deja la boca seca",
      cause:
        "Sobreextracción: el agua estuvo demasiado tiempo en contacto con el café o entró muy caliente.",
      fix: "Muele un punto más grueso, baja el agua a 90 °C y apunta a terminar cerca de 3:00.",
    },
    {
      problem: "La taza sabe ácida, salada o aguada",
      cause:
        "Subextracción: el agua pasó tan rápido que no alcanzó a sacar los azúcares del café.",
      fix: "Muele más fino, usa el agua apenas fuera del hervor y reparte el segundo vertido en dos tandas.",
    },
    {
      problem: "El agua tarda más de cuatro minutos en pasar",
      cause:
        "La molienda está muy fina o los finos taparon el papel, casi siempre por revolver el lecho.",
      fix: "Muele más grueso y no uses la cuchara dentro del cono: el giro del final es suficiente para nivelar.",
    },
    {
      problem: "Queda café pegado en las paredes del filtro",
      cause: "El vertido fue desde muy alto o demasiado hacia el borde.",
      fix: "Vierte desde unos 3 a 5 cm sobre el lecho, en espiral, y cierra con el giro para asentarlo.",
    },
  ],

  // Fuente: https://www.hario.co.uk/blogs/news/birth-of-the-hario-v60
  funFact: {
    text: "Casi nadie lo piensa al comprarlo, pero el nombre del V60 no es un código: es el plano del aparato. La V es el cono y el 60 son los grados exactos que abren sus paredes.",
  },
};
