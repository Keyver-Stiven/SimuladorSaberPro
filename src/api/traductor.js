import { questionsData } from "../data/preguntas.jsx";
import { additionalQuestionsData } from "../data/preguntas_adicionales.js";

// Combine all questions
const allQuestionsData = [...questionsData, ...additionalQuestionsData];

// Simulated delay to mimic network requests
const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock LLM integration for translation
const mockLLMTranslation = async (text) => {
  await simulateDelay(500);

  const translations = {
  
  the: "el/la",
  and: "y",
  is: "es",
  are: "son",
  in: "en",
  to: "a/para",
  of: "de",
  a: "un/una",
  an: "un/una",
  that: "que",
  it: "eso/lo",
  for: "para",
  with: "con",
  on: "en/sobre",
  at: "en",
  by: "por",
  from: "de/desde",
  this: "este/esta",
  these: "estos/estas",
  those: "esos/esas",
  they: "ellos/ellas",
  have: "tener",
  has: "tiene",
  had: "tenía",
  or: "o",
  but: "pero",
  not: "no",
  what: "qué",
  which: "cual",
  who: "quién",
  when: "cuando",
  where: "dónde",
  why: "por qué",
  how: "cómo",
  your: "tu/su",
  their: "su",
  our: "nuestro",
  my: "mi",
  me: "me",
  we: "nosotros",
  you: "tú/usted",
  if: "si",
  then: "entonces",
  so: "así/por lo tanto",
  because: "porque",
  than: "que",
  as: "como",
  also: "también",
  only: "solo",
  very: "muy",
  more: "más",
  most: "más",
  some: "algunos",
  any: "cualquier",
  each: "cada",
  all: "todo",
  no: "no",
  yes: "sí",
  do: "hacer",
  does: "hace",
  did: "hizo",
  will: "hará",
  would: "haría",
  can: "poder",
  could: "podría",
  may: "puede",
  might: "podría",
  must: "debe",
  should: "debería",
  say: "decir",
  said: "dijo",
  make: "hacer",
  see: "ver",
  look: "mirar",
  use: "usar",
  go: "ir",
  call: "llamar",
  know: "saber",
  day: "día",
  year: "año",
  years: "años",
  month: "mes",
  months: "meses",
  time: "tiempo",
  number: "número",
  percent: "porcentaje",
  approximately: "aproximadamente",
  about: "aproximadamente",
  amazon: "amazonas",
  rainforest: "selva tropical",
  forest: "bosque",
  earth: "tierra",
  world: "mundo",
  south: "sur",
  america: "américa",
  countries: "países",
  country: "país",
  across: "a través de",
  largest: "más grande",
  great: "gran",
  incredible: "increíble",
  different: "diferente",
  many: "muchos",
  much: "muchos",
  home: "hogar",
  diversity: "diversidad",
  species: "especies",
  scientists: "científicos",
  estimate: "estiman",
  contains: "contiene",
  activity: "actividad",
  activities: "actividades",
  agriculture: "agricultura",
  logging: "tala",
  deforestation: "deforestación",
  future: "futuro",
  online: "en línea",
  learning: "aprendizaje",
  allows: "permite",
  students: "estudiantes",
  access: "acceso",
  courses: "cursos",
  anywhere: "cualquier lugar",
  yet: "sin embargo",
  digital: "digital",
  divide: "brecha",
  still: "todavía",
  limits: "limita",
  regular: "regular",
  exercise: "ejercicio",
  improves: "mejora",
  both: "ambos",
  physical: "físico",
  mental: "mental",
  health: "salud",
  reducing: "reduciendo",
  stress: "estrés",
  increasing: "aumentando",
  energy: "energía",
  levels: "niveles",
  cities: "ciudades",
  investing: "invirtiendo",
  bike: "bicicleta",
  lanes: "carriles",
  reduce: "reducir",
  traffic: "tráfico",
  pollution: "contaminación",
  while: "mientras",
  promoting: "promoviendo",
  healthier: "más saludables",
  lifestyles: "estilos de vida",
  however: "sin embargo",
  caused: "causada",
  threatens: "amenaza",
  million: "millón",
  millions: "millones",
  square: "cuadrado",
  kilometer: "kilómetro",
  kilometers: "kilómetros",
  km2: "km²",
  text: "texto",
  word: "palabra",
  sentence: "oración",
  paragraph: "párrafo",
  question: "pregunta",
  answer: "respuesta",
  correct: "correcto",
  incorrect: "incorrecto",
  choose: "elige",
  select: "seleccionar",
  selected: "seleccionado",
  following: "siguiente",
  provide: "proporcionar",
  nothing: "nada",
  translate: "traducir",
  translation: "traducción",
  english: "inglés",
  spanish: "español",
  reading: "lectura",
  panel: "panel",
  tip: "consejo",
  click: "clic",
  touch: "tocar",
  new: "nuevo",
  red: "rojo",
  blue: "azul",
  green: "verde",
  important: "importante",
  information: "información",
  complete: "completar",
  example: "ejemplo",
  group: "grupo",
  two: "dos",
  sound: "sonido",
  water: "agua",
  over: "sobre",
  first: "primero",
  down: "abajo",
  side: "lado",
  been: "sido",
  now: "ahora",
  up: "arriba",
  leaves: "hojas",
  according: "según",

  // ====== PALABRAS CRÍTICAS FALTANTES (agregadas para cobertura total) ======
  // Pronombres y posesivos esenciales
  i: "yo",
  he: "él",
  she: "ella",
  her: "ella/su",
  his: "su (de él)",
  us: "nosotros",
  them: "ellos/ellas",
  its: "su (de ello)",

  // Verbos básicos (todas las formas comunes)
  be: "ser/estar",
  am: "soy",
  is: "es",
  are: "son", // ya existía, pero reforzado
  was: "fue/era",
  were: "fueron/eran",
  being: "siendo",
  been: "sido", // ya existía
  have: "tener", // ya existía
  has: "tiene", // ya existía
  had: "tenía", // ya existía
  having: "teniendo",
  do: "hacer", // ya existía
  does: "hace", // ya existía
  did: "hizo", // ya existía
  doing: "haciendo",
  go: "ir", // ya existía
  goes: "va",
  going: "yendo",
  gone: "ido",
  get: "conseguir",
  gets: "consigue",
  getting: "consiguiendo",
  got: "conseguió",
  take: "tomar",
  takes: "toma",
  taking: "tomando",
  took: "tomó",
  make: "hacer", // ya existía
  makes: "hace",
  making: "haciendo",
  made: "hizo",
  see: "ver", // ya existía
  sees: "ve",
  seeing: "viendo",
  saw: "vio",
  buy: "comprar",
  buys: "compra",
  buying: "comprando",
  bought: "compró",
  pay: "pagar",
  pays: "paga",
  paying: "pagando",
  paid: "pagó",
  save: "ahorrar",
  saves: "ahorra",
  saving: "ahorrando",
  saved: "ahorró",
  need: "necesitar",
  needs: "necesita",
  needing: "necesitando",
  needed: "necesitó",
  want: "querer",
  wants: "quiere",
  wanting: "queriendo",
  wanted: "quiso",
  think: "pensar",
  thinks: "piensa",
  thinking: "pensando",
  thought: "pensó",
  know: "saber", // ya existía
  knows: "sabe",
  knowing: "sabiendo",
  knew: "sabía",
  like: "gustar",
  likes: "gusta",
  liking: "gustando",
  liked: "gustó",
  love: "amar",
  loves: "ama",
  loving: "amando",
  loved: "amó",
  hate: "odiar",
  hates: "odia",
  hating: "odiando",
  hated: "odió",
  work: "trabajo/trabajar",
  works: "trabaja",
  working: "trabajando",
  worked: "trabajó",
  study: "estudiar/estudio",
  studies: "estudia",
  studying: "estudiando",
  studied: "estudió",
  live: "vivir",
  lives: "vive",
  living: "viviendo",
  lived: "vivió",
  arrive: "llegar",
  arrives: "llega",
  arriving: "llegando",
  arrived: "llegó",
  run: "correr",
  runs: "corre",
  running: "corriendo",
  ran: "corrió",
  catch: "atrapar/tomar (transporte)",
  catches: "atrapa",
  catching: "atrapando",
  caught: "atrapó",
  reach: "alcanzar/llegar",
  reaches: "alcanza",
  reaching: "alcanzando",
  reached: "alcanzó",
  prepare: "preparar",
  prepares: "prepara",
  preparing: "preparando",
  prepared: "preparó",
  depend: "depender",
  depends: "depende",
  depending: "dependiendo",
  depended: "dependió",
  produce: "producir",
  produces: "produce",
  producing: "produciendo",
  produced: "produjo",
  store: "almacenar",
  stores: "almacena",
  storing: "almacenando",
  stored: "almacenó",
  host: "albergar",
  hosts: "alberga",
  hosting: "albergando",
  hosted: "albergó",
  threaten: "amenazar",
  threatens: "amenaza", // ya existía
  threatening: "amenazando",
  threatened: "amenazó",
  accelerate: "acelerar",
  accelerates: "acelera",
  accelerating: "acelerando",
  accelerated: "aceleró",
  offer: "ofrecer",
  offers: "ofrece",
  offering: "ofreciendo",
  offered: "ofreció",
  avoid: "evitar",
  avoids: "evita",
  avoiding: "evitando", // ya existía
  avoided: "evitó",
  maintain: "mantener",
  maintains: "mantiene",
  maintaining: "manteniendo", // ya existía
  maintained: "mantuvo",
  recommend: "recomendar",
  recommends: "recomienda",
  recommending: "recomendando",
  recommended: "recomendado",
  close: "cerrar",
  closes: "cierra",
  closing: "cerrando",
  closed: "cerrado",
  guide: "guiar",
  guides: "guía",
  guiding: "guiando",
  guided: "guiado",
  suggest: "sugerir",
  suggests: "sugiere",
  suggesting: "sugiriendo",
  suggested: "sugirió",
  consume: "consumir",
  consumes: "consume",
  consuming: "consumiendo",
  consumed: "consumió",
  cause: "causar",
  causes: "causa",
  causing: "causando",
  caused: "causó", // ya existía
  improve: "mejorar",
  improves: "mejora", // ya existía
  improving: "mejorando",
  improved: "mejoró",
  drink: "beber",
  drinks: "bebe",
  drinking: "bebiendo", // ya existía
  drank: "bebió",
  sleep: "dormir/sueño",
  sleeps: "duerme",
  sleeping: "durmiendo",
  slept: "durmió",

  // Adjetivos básicos
  good: "bueno/a",
  better: "mejor",
  best: "mejor (superlativo)",
  bad: "malo/a",
  worse: "peor",
  worst: "peor (superlativo)",
  big: "grande",
  bigger: "más grande",
  biggest: "el más grande",
  small: "pequeño/a",
  smaller: "más pequeño/a",
  smallest: "el más pequeño/a",
  hot: "caliente",
  hotter: "más caliente",
  hottest: "el más caliente",
  cold: "frío/a",
  colder: "más frío/a",
  coldest: "el más frío/a",
  easy: "fácil",
  easier: "más fácil",
  easiest: "el más fácil",
  difficult: "difícil",
  more_difficult: "más difícil",
  most_difficult: "el más difícil",
  important: "importante", // ya existía
  more_important: "más importante",
  most_important: "el más importante",
  happy: "feliz",
  happier: "más feliz",
  happiest: "el más feliz",
  sad: "triste",
  sadder: "más triste",
  saddest: "el más triste",
  new: "nuevo/a", // ya existía
  newer: "más nuevo/a",
  newest: "el más nuevo/a",
  old: "viejo/a",
  older: "más viejo/a",
  oldest: "el más viejo/a",
  short: "corto/a",
  shorter: "más corto/a",
  shortest: "el más corto/a",
  long: "largo/a",
  longer: "más largo/a",
  longest: "el más largo/a",
  clean: "limpio/a",
  cleaner: "más limpio/a",
  cleanest: "el más limpio/a",
  dirty: "sucio/a",
  dirtier: "más sucio/a",
  dirtiest: "el más sucio/a",
  healthy: "saludable",
  healthier: "más saludable", // ya existía
  healthiest: "el más saludable",
  local: "local",
  modern: "moderno/a",
  available: "disponible",
  countless: "incontables",
  recent: "reciente",
  moderate: "moderado/a",
  alert: "alerta",
  alertness: "estado de alerta",
  anxious: "ansioso/a",
  full: "lleno/a",
  empty: "vacío/a",
  open: "abierto/a",
  closed: "cerrado/a", // ya existía como verbo, ahora también adjetivo

  // Adverbios y preposiciones clave
  here: "aquí",
  there: "allí",
  today: "hoy",
  tomorrow: "mañana",
  yesterday: "ayer",
  always: "siempre",
  never: "nunca",
  often: "a menudo",
  sometimes: "a veces",
  usually: "normalmente",
  rarely: "raramente",
  early: "temprano",
  late: "tarde",
  since: "desde",
  until: "hasta",
  after: "después",
  before: "antes",
  during: "durante",
  between: "entre",
  through: "a través de", // ya existía
  although: "aunque",
  because: "porque", // ya existía
  if: "si", // ya existía
  when: "cuando", // ya existía
  where: "dónde", // ya existía
  why: "por qué", // ya existía
  how: "cómo", // ya existía
  too: "demasiado",
  very: "muy", // ya existía
  quite: "bastante",
  really: "realmente",
  almost: "casi",
  just: "justo/solo",
  already: "ya",
  still: "todavía", // ya existía
  yet: "todavía/aún", // ya existía
  even: "incluso",
  only: "solo", // ya existía

  // Sustantivos comunes en tus textos
  minute: "minuto",
  minutes: "minutos",
  hour: "hora",
  hours: "horas",
  day: "día", // ya existía
  days: "días",
  week: "semana",
  weeks: "semanas",
  book: "libro",
  books: "libros",
  weekday: "día de semana",
  weekend: "fin de semana",
  morning: "mañana",
  afternoon: "tarde",
  evening: "noche",
  night: "noche",
  time: "tiempo", // ya existía
  bus: "autobús",
  train: "tren",
  car: "coche",
  bike: "bicicleta", // ya existía
  office: "oficina",
  home: "hogar", // ya existía
  museum: "museo",
  art: "arte",
  wing: "ala",
  notice: "aviso",
  tour: "tour/visita",
  tours: "tours/visitas",
  maintenance: "mantenimiento",
  gym: "gimnasio",
  doctor: "médico",
  apple: "manzana",
  dinner: "cena",
  breakfast: "desayuno",
  lunch: "almuerzo",
  coffee: "café",
  tea: "té",
  water: "agua", // ya existía
  fruit: "fruta",
  oatmeal: "avena",
  food: "comida/alimento",
  money: "dinero",
  price: "precio",
  cost: "costo",
  total: "total",
  dollar: "dólar",
  change: "cambio",
  carbon: "carbono",
  oxygen: "oxígeno",
  climate: "clima",
  biodiversity: "biodiversidad",
  community: "comunidad",
  communities: "comunidades",
  livelihood: "medio de vida",
  livelihoods: "medios de vida",
  company: "empresa",
  companies: "empresas",
  employee: "empleado/a",
  employees: "empleados/as",
  commute: "desplazamiento",
  commutes: "desplazamientos",
  routine: "rutina",
  routines: "rutinas",
  boundary: "límite",
  boundaries: "límites",
  balance: "equilibrio",
  study: "estudio", // ya existía como verbo
  concentration: "concentración",
  anxiety: "ansiedad",
  problem: "problema",
  problems: "problemas",
  decision: "decisión",
  option: "opción",
  options: "opciones",
  error: "error",
  pm: "p.m.",
  am: "a.m.",
  tuesday: "martes",
  wednesday: "miércoles",
  thursday: "jueves",
  friday: "viernes",
  saturday: "sábado",
  sunday: "domingo",

  // ====== TÉRMINOS DE INSTRUCCIÓN (claves para ejercicios) ======
  question: "pregunta", // ya existía
  answer: "respuesta", // ya existía
  correct: "correcto", // ya existía
  incorrect: "incorrecto", // ya existía
  choose: "elige", // ya existía
  select: "selecciona", // ya existía
  option: "opción", // ¡crítico para ejercicios!
  options: "opciones",
  following: "siguiente", // ya existía
  example: "ejemplo", // ya existía
  tip: "consejo", // ya existía
  hint: "pista",
  explanation: "explicación",
  translate: "traducir", // ya existía
  practice: "practicar",
  test: "examen/prueba",
  score: "puntaje",
  level: "nivel",
  beginner: "principiante",
  intermediate: "intermedio",
  advanced: "avanzado",

  // ====== NUEVAS TRADUCCIONES AGREGADAS ======
  airport: "aeropuerto",
  area: "área",
  around: "alrededor",
  article: "artículo",
  away: "lejos",
  benefit: "beneficio",
  bicycle: "bicicleta",
  cafe: "cafetería",
  caffeine: "cafeína",
  calendar: "calendario",
  capacity: "capacidad",
  cappuccino: "capuchino",
  central: "central",
  challenge: "desafío",
  checks: "revisa",
  city: "ciudad",
  clear: "claro",
  client: "cliente",
  commuting: "viajar diariamente",
  comparative: "comparativo",
  consumption: "consumo",
  cures: "cura",
  daily: "diario",
  date: "fecha",
  dehydration: "deshidratación",
  describes: "describe",
  design: "diseño",
  development: "desarrollo",
  doesn: "no",
  don: "no",
  dont: "no",
  doesnt: "no",
  im: "soy/estoy",
  ive: "he",
  "car-only": "solo para autos",
  "pedestrian-only": "solo para peatones",
  "work-life": "vida laboral",
  drives: "conduce",
  effect: "efecto",
  electricity: "electricidad",
  emails: "correos electrónicos",
  emma: "Emma",
  enhance: "mejorar",
  entry: "entrada",
  espresso: "café expreso",
  event: "evento",
  every: "cada",
  excessive: "excesivo",
  faster: "más rápido",
  fewest: "menos",
  finding: "encontrando",
  finish: "terminar",
  finished: "terminado",
  form: "forma",
  four: "cuatro",
  free: "gratis/libre",
  freezing: "helado",
  garden: "jardín",
  glass: "vaso",
  glasses: "vasos",
  gooder: "más bueno (incorrecto)",
  hall: "pasillo",
  help: "ayuda",
  higher: "más alto",
  highest: "el más alto",
  history: "historia",
  humid: "húmedo",
  increase: "aumentar",
  indicate: "indicar",
  ingredients: "ingredientes",
  insomnia: "insomnio",
  intake: "ingesta",
  interested: "interesado",
  internet: "internet",
  item: "artículo",
  join: "unirse",
  keep: "mantener",
  keeps: "mantiene",
  lane: "carril",
  latte: "café con leche",
  library: "biblioteca",
  life: "vida",
  line: "línea",
  list: "lista",
  lobby: "vestíbulo",
  main: "principal",
  meeting: "reunión",
  mentioned: "mencionado",
  metabolism: "metabolismo",
  milk: "leche",
  ml: "mililitros",
  negative: "negativo",
  none: "ninguno",
  one: "uno",
  painting: "pintura",
  part: "parte",
  path: "camino",
  pedestrian: "peatón",
  per: "por",
  pick: "elegir",
  please: "por favor",
  potential: "potencial",
  preposition: "preposición",
  product: "producto",
  providers: "proveedores",
  providing: "proporcionando",
  quarter: "trimestre",
  quarterly: "trimestral",
  quiet: "tranquilo",
  rained: "llovió",
  raining: "lloviendo",
  rains: "llueve",
  remote: "remoto",
  remove: "eliminar",
  renovation: "renovación",
  rent: "alquiler",
  retro: "retro",
  review: "reseña",
  riverside: "orilla del río",
  road: "camino",
  sales: "ventas",
  same: "mismo",
  schedule: "horario",
  scheduled: "programado",
  sculpture: "escultura",
  seats: "asientos",
  shop: "tienda",
  shower: "ducha",
  skip: "saltar",
  smoothie: "batido",
  soon: "pronto",
  sprint: "sprint",
  stay: "quedarse",
  supporting: "apoyando",
  symbol: "símbolo",
  synonym: "sinónimo",
  team: "equipo",
  temperature: "temperatura",
  three: "tres",
  tourism: "turismo",
  typically: "típicamente",
  units: "unidades",
  urban: "urbano",
  ve: "he (haber)",
  visitors: "visitantes",
  wakes: "despierta",
  waking: "despertando",
  warm: "cálido",
  without: "sin",
  worsen: "empeorar",
};

  // Split text into words

  const words = text.toLowerCase().split(/\s+/);

  const translatedWords = words.map((word) => {
    // Normalize token: remove punctuation, quotes, parentheses, and curly/smart quotes
    let clean = word.replace(/[.,!?;:()"'`]/g, "").replace(/[’‘“”]/g, "");

    // Strip English possessive 's or ’s
    clean = clean.replace(/(?:'|’)(s)$/i, "");

    // Simple stemming: try to map common inflections to base form
    // Priority: direct match -> stemmed match -> original fallback
    const tryKeys = [clean];

    // If not directly found, strip common suffixes (ing, ed, es, s)
    if (!translations[clean]) {
      let stem = clean;
      // avoid stripping 'ss' plural artifacts (e.g., 'glass' -> don't remove final s)
      const original = stem;
      // 1) -ing
      if (!translations[stem] && /ing$/.test(stem)) {
        stem = stem.replace(/ing$/, "");
        tryKeys.push(stem);
      }
      // 2) -ed
      if (!translations[stem] && /ed$/.test(stem)) {
        stem = stem.replace(/ed$/, "");
        tryKeys.push(stem);
      }
      // 3) -es
      if (!translations[stem] && /es$/.test(stem)) {
        // handle cases like 'watches' -> 'watch'
        stem = stem.replace(/es$/, "");
        tryKeys.push(stem);
      }
      // 4) -s (avoid words ending with 'ss')
      if (!translations[stem] && /s$/.test(stem) && !/ss$/.test(stem)) {
        stem = stem.replace(/s$/, "");
        tryKeys.push(stem);
      }

      // If still nothing and we altered it too much, keep original as last resort
      if (stem !== original && !translations[stem]) {
        tryKeys.push(original);
      }
    }

    // Pick first key that exists in translations
    const key = tryKeys.find((k) => translations[k]) ?? null;

    return key ? translations[key] : `[${word}]`;
  });

  return `Traducción: ${translatedWords.join(" ")}`;
};

// Función de traducción simplificada para el componente TranslatableText
export const translateFromDictionary = async (text) => {
  await simulateDelay(300);
  
  if (!text || text.trim() === "") {
    return "Por favor seleccione texto para traducir.";
  }
  
  return await mockLLMTranslation(text);
};

// API diccionario (mock)

export const diccionario = {
  entities: {
    Question: {
      list: async () => {
        console.log("[base44Client] Fetching questions...");
        await simulateDelay(100);
        console.log("[base44Client] Questions loaded:", allQuestionsData.length);
        if (allQuestionsData.length > 0) {
          console.log("[base44Client] Sample question:", allQuestionsData[0]);
        }
        // Return a copy to avoid mutation
        return [...allQuestionsData];
      },

      get: async (id) => {
        await simulateDelay();
        return allQuestionsData.find((q) => q.id === id) || null;
      },

      create: async (data) => {
        await simulateDelay();
        const newQuestion = {
          id: Date.now().toString(),
          ...data,
        };
        allQuestionsData.push(newQuestion);
        return newQuestion;
      },

      update: async (id, data) => {
        await simulateDelay();
        const index = allQuestionsData.findIndex((q) => q.id === id);
        if (index !== -1) {
          allQuestionsData[index] = { ...allQuestionsData[index], ...data };
          return allQuestionsData[index];
        }
        return null;
      },

      delete: async (id) => {
        await simulateDelay();
        const index = allQuestionsData.findIndex((q) => q.id === id);
        if (index !== -1) {
          allQuestionsData.splice(index, 1);
          return { success: true };
        }
        return { success: false };
      },
    },
  },

  integrations: {
    Core: {
      InvokeLLM: async ({ prompt }) => {
        // Extract the text to translate from the prompt
        const match = prompt.match(/"([^"]+)"/);
        if (match && match[1]) {
          return await mockLLMTranslation(match[1]);
        }
        return "Error: No se pudo extraer el texto a traducir.";
      },
    },
  },
};

export default diccionario;
