// Enhanced translation service with better phrase matching and context awareness

const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Comprehensive phrase dictionary with context-aware translations
const phraseDictionary = {
  // Common titles and headers (including variations with special characters)
  "cafe price list": "lista de precios del café",
  "price list": "lista de precios",
  "coffee menu": "menú de café",
  "list of items": "lista de artículos",
  "menu items": "artículos del menú",
  "price | item": "precio | artículo",
  "item | price": "artículo | precio",
  "menu | coffee | tea": "menú | café | té",
  
  // Basic terms
  "item": "artículo",
  "items": "artículos",
  "price": "precio",
  "prices": "precios",
  "menu": "menú",
  "cafe": "café",
  "coffee": "café",
  "list": "lista",
  
  // Reading comprehension phrases
  "according to the text": "según el texto",
  "based on the passage": "basado en el pasaje",
  "the main idea of": "la idea principal de",
  "the author's purpose": "el propósito del autor",
  "what can be inferred": "qué se puede inferir",
  "which of the following": "cuál de las siguientes",
  "the best answer is": "la mejor respuesta es",
  "most likely": "más probablemente",
  "least likely": "menos probablemente",
  "in other words": "en otras palabras",
  "for example": "por ejemplo",
  "such as": "tal como",
  "on the other hand": "por otro lado",
  "in addition": "además",
  "as a result": "como resultado",
  "in conclusion": "en conclusión",
  "it is important to note": "es importante notar",
  "it should be noted": "debe notarse",
  
  // Academic phrases
  "research shows that": "la investigación muestra que",
  "studies indicate": "los estudios indican",
  "evidence suggests": "la evidencia sugiere",
  "experts believe": "los expertos creen",
  "scientists have discovered": "los científicos han descubierto",
  "recent findings": "hallazgos recientes",
  
  // Research study phrases (from example)
  "a recent study suggests": "un estudio reciente sugiere",
  "a recent study suggests that": "un estudio reciente sugiere que",
  "moderate coffee consumption": "consumo moderado de café",
  "can improve alertness": "puede mejorar la alerta",
  "improve alertness and concentration": "mejorar la alerta y la concentración",
  "drinking too much": "beber demasiado",
  "drinking too much coffee": "beber demasiado café",
  "may cause anxiety": "puede causar ansiedad",
  "cause anxiety and sleep problems": "causar ansiedad y problemas de sueño",
  "anxiety and sleep problems": "ansiedad y problemas de sueño",
  
  // Time phrases
  "in the past": "en el pasado",
  "in recent years": "en años recientes",
  "over time": "con el tiempo",
  "at the same time": "al mismo tiempo",
  "in the future": "en el futuro",
  "from now on": "desde ahora",
  "up to now": "hasta ahora",
  "so far": "hasta ahora",
  
  // Cause and effect
  "because of": "debido a",
  "due to": "debido a",
  "as a result of": "como resultado de",
  "leads to": "lleva a",
  "results in": "resulta en",
  "causes": "causa",
  "is caused by": "es causado por",
  "is responsible for": "es responsable de",
  
  // Comparison
  "compared to": "comparado con",
  "in comparison": "en comparación",
  "similar to": "similar a",
  "different from": "diferente de",
  "unlike": "a diferencia de",
  "rather than": "en lugar de",
  "instead of": "en lugar de",
  "on the contrary": "por el contrario",
  
  // Opinion
  "it is believed that": "se cree que",
  "it is thought that": "se piensa que",
  "it is said that": "se dice que",
  "many people think": "mucha gente piensa",
  "some people argue": "algunas personas argumentan",
  "critics argue": "los críticos argumentan",
  "supporters claim": "los partidarios afirman",
  
  // Certainty
  "it is certain": "es cierto",
  "it is possible": "es posible",
  "it is likely": "es probable",
  "it is unlikely": "es improbable",
  "there is no doubt": "no hay duda",
  "without a doubt": "sin duda",
  "probably": "probablemente",
  "possibly": "posiblemente",
  "certainly": "ciertamente",
  "definitely": "definitivamente",
  
  // Reading specific
  "the passage suggests": "el pasaje sugiere",
  "according to the author": "según el autor",
  "the writer implies": "el escritor implica",
  "the text indicates": "el texto indica",
  "the article states": "el artículo afirma",
  "as mentioned in": "como se menciona en",
  "described in": "descrito en",
  "discussed in": "discutido en",
  "presented in": "presentado en",
  
  // Academic vocab
  "significant": "significativo",
  "important": "importante",
  "necessary": "necesario",
  "essential": "esencial",
  "relevant": "relevante",
  "appropriate": "apropiado",
  "effective": "efectivo",
  "efficient": "eficiente",
  "successful": "exitoso",
  "unsuccessful": "sin éxito",
  "advantageous": "ventajoso",
  "disadvantageous": "desventajoso",
  
  // Problem/solution
  "the problem is": "el problema es",
  "the solution is": "la solución es",
  "one solution": "una solución",
  "another solution": "otra solución",
  "to solve this": "para resolver esto",
  "to address this": "para abordar esto",
  "to deal with": "para lidiar con",
  "to overcome": "para superar",
};

// Word-level dictionary
const wordDictionary = {
  // Common words
  the: "el", a: "un", an: "una", and: "y", or: "o", but: "pero",
  in: "en", on: "en", at: "en", to: "a", for: "para", with: "con",
  without: "sin", from: "de", by: "por", of: "de", about: "acerca de",
  between: "entre", among: "entre", through: "a través de", during: "durante",
  before: "antes de", after: "después de", above: "encima de", below: "debajo de",
  over: "sobre", under: "bajo", inside: "dentro de", outside: "fuera de",
  near: "cerca de", far: "lejos", here: "aquí", there: "allí", where: "dónde",
  when: "cuándo", why: "por qué", how: "cómo", what: "qué", who: "quién",
  
  // Common adjectives
  big: "grande", small: "pequeño", large: "grande", little: "pequeño", good: "bueno", bad: "malo",
  better: "mejor", best: "mejor", worse: "peor", worst: "peor", happy: "feliz", sad: "triste",
  easy: "fácil", difficult: "difícil", hard: "difícil", simple: "simple", complex: "complejo",
  fast: "rápido", slow: "lento", hot: "caliente", cold: "frío", warm: "tibio", cool: "fresco",
  young: "joven", old: "viejo", new: "nuevo", used: "usado", clean: "limpio", dirty: "sucio",
  right: "correcto/derecho", wrong: "incorrecto", left: "izquierda", same: "mismo", different: "diferente",
  early: "temprano", late: "tarde", ready: "listo", busy: "ocupado", free: "libre", full: "lleno",
  empty: "vacío", open: "abierto", closed: "cerrado", high: "alto", low: "bajo", long: "largo",
  short: "corto", wide: "ancho", narrow: "estrecho", deep: "profundo", shallow: "superficial",
  
  // Common adverbs
  very: "muy", quite: "bastante", really: "realmente", too: "demasiado", so: "tan", more: "más",
  less: "menos", most: "más", least: "menos", always: "siempre", never: "nunca", sometimes: "a veces",
  often: "a menudo", usually: "usualmente", generally: "generalmente", quickly: "rápidamente", slowly: "lentamente",
  carefully: "cuidadosamente", easily: "fácilmente", well: "bien", badly: "mal", together: "juntos",
  
  // Common verbs
  is: "es", are: "son", was: "era", were: "eran", be: "ser", been: "sido",
  have: "tener", has: "tiene", had: "tenía", do: "hacer", does: "hace", did: "hizo",
  will: "will", would: "would", could: "podría", should: "debería", can: "puede",
  may: "puede", might: "podría", must: "debe", shall: "shall",
  go: "ir", goes: "va", went: "fue", come: "venir", comes: "viene", came: "vino",
  get: "obtener", gets: "obtiene", got: "obtuvo", make: "hacer", makes: "hace", made: "hizo",
  take: "tomar", takes: "toma", took: "tomó", give: "dar", gives: "da", gave: "dio",
  see: "ver", sees: "ve", saw: "vio", look: "mirar", looks: "mira", looked: "miró",
  think: "pensar", thinks: "piensa", thought: "pensó", know: "saber", knows: "sabe", knew: "sabía",
  say: "decir", says: "dice", said: "dijo", tell: "contar", tells: "cuenta", told: "contó",
  ask: "preguntar", asks: "pregunta", asked: "preguntó", answer: "responder", answers: "responde", answered: "respondió",
  use: "usar", uses: "usa", used: "usó", find: "encontrar", finds: "encuentra", found: "encontró",
  work: "trabajar", works: "trabaja", worked: "trabajó", help: "ayudar", helps: "ayuda", helped: "ayudó",
  
  // Common nouns
  person: "persona", people: "personas", man: "hombre", woman: "mujer", child: "niño", children: "niños",
  family: "familia", friend: "amigo", house: "casa", home: "hogar", room: "habitación", door: "puerta",
  window: "ventana", table: "mesa", chair: "silla", bed: "cama", kitchen: "cocina", bathroom: "baño",
  school: "escuela", university: "universidad", student: "estudiante", teacher: "profesor", class: "clase",
  book: "libro", page: "página", pen: "pluma", paper: "papel", bag: "bolsa", box: "caja", car: "coche",
  bus: "autobús", train: "tren", plane: "avión", street: "calle", road: "carretera", city: "ciudad",
  town: "pueblo", country: "país", world: "mundo", life: "vida", time: "tiempo", day: "día", night: "noche",
  week: "semana", month: "mes", year: "año", morning: "mañana", afternoon: "tarde", evening: "noche",
  today: "hoy", tomorrow: "mañana", yesterday: "ayer", now: "ahora", then: "entonces", soon: "pronto",
  always: "siempre", never: "nunca", sometimes: "a veces", often: "a menudo", usually: "usualmente",
  water: "agua", food: "comida", bread: "pan", milk: "leche", coffee: "café", tea: "té", sugar: "azúcar",
  salt: "sal", meat: "carne", fish: "pescado", fruit: "fruta", vegetable: "verdura", egg: "huevo",
  
  // Academic/Educational terms
  exam: "examen", test: "prueba", question: "pregunta", answer: "respuesta", problem: "problema",
  solution: "solución", exercise: "ejercicio", practice: "práctica", study: "estudio", learn: "aprendizaje",
  knowledge: "conocimiento", information: "información", data: "datos", result: "resultado", score: "puntaje",
  grade: "nota", subject: "materia", topic: "tema", lesson: "lección", course: "curso", program: "programa",
  research: "investigación", project: "proyecto", assignment: "tarea", homework: "tarea", reading: "lectura",
  writing: "escritura", speaking: "habla", listening: "escucha", comprehension: "comprensión", vocabulary: "vocabulario",
  grammar: "gramática", sentence: "oración", paragraph: "párrafo", text: "texto", story: "historia", article: "artículo",
  report: "informe", essay: "ensayo", thesis: "tesis", degree: "título", certificate: "certificado", diploma: "diploma",
  
  // Research/Study terms (from example text)
  study: "estudio", suggests: "sugiere", moderate: "moderado", consumption: "consumo", improve: "mejorar",
  alertness: "alerta", concentration: "concentración", however: "sin embargo", drinking: "beber", cause: "causar",
  anxiety: "ansiedad", sleep: "sueño", problems: "problemas", recent: "reciente", can: "puede", much: "mucho",
  that: "que", too: "demasiado",
  
  // Additional academic verbs
  show: "mostrar", shows: "muestra", indicate: "indicar", indicates: "indica", demonstrate: "demostrar",
  demonstrates: "demuestra", prove: "probar", proves: "prueba", conclude: "concluir", concludes: "concluye",
  
  // Mental/Physical states
  attention: "atención", focus: "enfoque", memory: "memoria", learning: "aprendizaje", performance: "rendimiento",
  health: "salud", wellness: "bienestar", stress: "estrés", fatigue: "fatiga", energy: "energía",
  
  // Common connectors and transitions
  also: "también", furthermore: "además", moreover: "además", therefore: "por lo tanto", thus: "así",
  hence: "por lo tanto", consequently: "consecuentemente", nevertheless: "sin embargo", nonetheless: "no obstante",
  whereas: "mientras que", while: "mientras", although: "aunque", though: "aunque", despite: "a pesar de",
  
  // Common adjectives for descriptions
  beautiful: "hermoso", ugly: "feo", pretty: "bonito", handsome: "guapo", clean: "limpio", dirty: "sucio",
  strong: "fuerte", weak: "débil", heavy: "pesado", light: "ligero", bright: "brillante", dark: "oscuro",
  loud: "ruidoso", quiet: "silencioso", sweet: "dulce", sour: "agrio", bitter: "amargo", salty: "salado",
  fresh: "fresco", stale: "rancio", smooth: "suave", rough: "áspero", soft: "blando", hard: "duro",
  expensive: "caro", cheap: "barato", rich: "rico", poor: "pobre", lucky: "afortunado", unlucky: "desafortunado",
  
  // Common everyday verbs
  walk: "caminar", walks: "camina", walked: "caminó", run: "correr", runs: "corre", ran: "corrió",
  jump: "saltar", jumps: "salta", jumped: "saltó", swim: "nadar", swims: "nada", swam: "nadó",
  fly: "volar", flies: "vuela", flew: "voló", drive: "conducir", drives: "conduce", drove: "condujo",
  ride: "montar", rides: "monta", rode: "montó", sit: "sentarse", sits: "se sienta", sat: "se sentó",
  stand: "estar de pie", stands: "está de pie", stood: "estuvo de pie", sleep: "dormir", sleeps: "duerme", slept: "durmió",
  wake: "despertar", wakes: "despierta", woke: "despertó", eat: "comer", eats: "come", ate: "comió",
  drink: "beber", drinks: "bebe", drank: "bebió", speak: "hablar", speaks: "habla", spoke: "habló",
  talk: "hablar", talks: "habla", talked: "habló", listen: "escuchar", listens: "escucha", listened: "escuchó",
  read: "leer", reads: "lee", read: "leyó", write: "escribir", writes: "escribe", wrote: "escribió",
  
  // Common prepositions and conjunctions
  between: "entre", among: "entre", during: "durante", since: "desde", until: "hasta", toward: "hacia",
  against: "contra", across: "a través de", along: "a lo largo de", around: "alrededor de", behind: "detrás de",
  beyond: "más allá de", except: "excepto", including: "incluyendo", regarding: "respecto a", concerning: "concerniente a",
  
  // Common question words and relatives
  which: "cuál", whose: "cuyo", whom: "a quién", whatever: "lo que sea", whenever: "cuando sea", wherever: "donde sea",
  however: "sin embargo", whichever: "cualquiera que", whoever: "quien sea", whomever: "a quien sea",
  
  // Reading comprehension terms
  main: "principal", idea: "idea", detail: "detalle", fact: "hecho", opinion: "opinión",
  conclusion: "conclusión", summary: "resumen", introduction: "introducción", development: "desarrollo", ending: "final",
  character: "personaje", author: "autor", writer: "escritor", narrator: "narrador", reader: "lector",
  theme: "tema", plot: "trama", setting: "configuración", context: "contexto", purpose: "propósito",
  
  // Additional common nouns
  word: "palabra", correct: "correcto", incorrect: "incorrecto", choose: "elige", select: "seleccionar",
  selected: "seleccionado", following: "siguiente", provide: "proporcionar", nothing: "nada", translate: "traducir",
  translation: "traducción", english: "inglés", spanish: "español", panel: "panel", tip: "consejo", click: "clic",
  touch: "tocar", new: "nuevo", red: "rojo", blue: "azul", green: "verde", important: "importante",
  complete: "completar", example: "ejemplo", group: "grupo", two: "dos", sound: "sonido", first: "primero",
  down: "abajo", side: "lado", clock: "reloj", watch: "reloj", calendar: "calendario", date: "fecha",
  hour: "hora", minute: "minuto", second: "segundo", success: "éxito", failure: "fracaso",
  
  // Missing words from user request
  up: "arriba", leaves: "hojas", according: "según",
};

// Enhanced phrase matching function
function findBestPhraseMatch(text) {
  const lowerText = text.toLowerCase().trim();
  
  // Try exact matches first
  for (const [phrase, translation] of Object.entries(phraseDictionary)) {
    if (lowerText === phrase) {
      return translation;
    }
  }
  
  // Try exact matches with punctuation removed
  const cleanText = lowerText.replace(/[.,!?;:()"'`]/g, "").trim();
  for (const [phrase, translation] of Object.entries(phraseDictionary)) {
    if (cleanText === phrase) {
      return translation;
    }
  }
  
  // Try partial matches for longer phrases (only for phrases with 3+ words)
  for (const [phrase, translation] of Object.entries(phraseDictionary)) {
    const phraseWords = phrase.split(" ");
    if (phraseWords.length >= 3 && lowerText.includes(phrase)) {
      return translation;
    }
  }
  
  // Try to match individual words from the text
  const textWords = cleanText.split(/\s+/);
  const translations = [];
  
  for (const word of textWords) {
    if (word.length > 1) { // Skip single letters and symbols
      for (const [phrase, translation] of Object.entries(phraseDictionary)) {
        const phraseWords = phrase.split(" ");
        if (phraseWords.length === 1 && word === phrase) {
          translations.push(translation);
          break;
        }
      }
    }
  }
  
  // If we found translations for individual words, return them
  if (translations.length > 0 && translations.length === textWords.length) {
    return translations.join(" ");
  }
  
  return null;
}

// Word-by-word translation with context awareness
function translateWords(text) {
  const words = text.split(/\s+/); // Don't convert to lowercase yet
  const translatedWords = words.map((word) => {
    // Check if it's a special character or symbol
    if (/^[|@#$%^&*()_+=\[\]{};:'"\\|,.<>\/?`~]*$/.test(word)) {
      return word; // Return special characters as-is
    }
    
    // Clean word from punctuation but preserve the original word for display
    let clean = word.toLowerCase().replace(/[.,!?;:()"'`]/g, "").replace(/[''""]/g, "");
    clean = clean.replace(/(?:'|')(s)$/i, "");
    
    // Try direct match
    if (wordDictionary[clean]) {
      return wordDictionary[clean];
    }
    
    // Try stemming for common suffixes
    const suffixes = ['ing', 'ed', 'es', 's'];
    for (const suffix of suffixes) {
      if (clean.endsWith(suffix) && clean.length > suffix.length + 2) {
        const stem = clean.slice(0, -suffix.length);
        if (wordDictionary[stem]) {
          return wordDictionary[stem];
        }
      }
    }
    
    // Return original word in brackets if no translation found
    return `[${word}]`;
  });
  
  return translatedWords.join(" ");
}

// Main translation function
export const translateText = async (text) => {
  await simulateDelay(400);
  
  if (!text || text.trim() === "") {
    return "Por favor seleccione texto para traducir.";
  }
  
  // Clean the input text for better matching
  const cleanText = text.trim();
  
  // Try phrase matching first (with original text)
  const phraseMatch = findBestPhraseMatch(cleanText);
  if (phraseMatch) {
    return `Traducción: ${phraseMatch}`;
  }
  
  // Try with lowercase version for better matching
  const lowerPhraseMatch = findBestPhraseMatch(cleanText.toLowerCase());
  if (lowerPhraseMatch) {
    return `Traducción: ${lowerPhraseMatch}`;
  }
  
  // Fall back to word-by-word translation
  const wordTranslation = translateWords(cleanText);
  return `Traducción: ${wordTranslation}`;
};

export default {
  translateText,
};