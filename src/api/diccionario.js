import { questionsData } from "../data/questions.js";

// Simulated delay to mimic network requests
const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock LLM integration for translation
const mockLLMTranslation = async (text) => {
  await simulateDelay(500);

  const translations = {
    // Core function words
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
    // Common verbs
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
    come: "venir",
    find: "encontrar",
    call: "llamar",
    know: "saber",
    // Time and quantity
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
    // Places and geography
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
    // Descriptions
    largest: "más grande",
    great: "gran",
    incredible: "increíble",
    different: "diferente",
    many: "muchos",

    // Nouns used in readings

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

    // Reading texts vocabulary (education, health, cities)
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

    many: "muchos",
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
    // Phrases broken by word-split

    however: "sin embargo",
    caused: "causada",
    threatens: "amenaza",
    // Measurements
    million: "millón",
    millions: "millones",

    square: "cuadrado",
    kilometer: "kilómetro",
    kilometers: "kilómetros",
    km2: "km²",
    // School/exam vocabulary
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
    // Extra useful words
    new: "nuevo",
    red: "rojo",
    blue: "azul",
    green: "verde",
    important: "importante",
    information: "información",

    complete: "completar",
    example: "ejemplo",
    group: "grupo",
    // Keep original baseline
    two: "dos",
    sound: "sonido",
    water: "agua",
    over: "sobre",
    first: "primero",
    down: "abajo",
    side: "lado",
    been: "sido",
    now: "ahora",
  };

  // Split text into words
  const words = text.toLowerCase().split(/\s+/);
  const translatedWords = words.map((word) => {
    // Remove punctuation for lookup
    const cleanWord = word.replace(/[.,!?;:]/g, "");
    return translations[cleanWord] || `[${word}]`;
  });

  return `Traducción: ${translatedWords.join(" ")}`;
};

// API diccionario (mock)

export const diccionario = {
  entities: {
    Question: {
      list: async () => {
        console.log("[base44Client] Fetching questions...");
        await simulateDelay(100);
        console.log("[base44Client] Questions loaded:", questionsData.length);
        if (questionsData.length > 0) {
          console.log("[base44Client] Sample question:", questionsData[0]);
        }
        // Return a copy to avoid mutation
        return [...questionsData];
      },

      get: async (id) => {
        await simulateDelay();
        return questionsData.find((q) => q.id === id) || null;
      },

      create: async (data) => {
        await simulateDelay();
        const newQuestion = {
          id: Date.now().toString(),
          ...data,
        };
        questionsData.push(newQuestion);
        return newQuestion;
      },

      update: async (id, data) => {
        await simulateDelay();
        const index = questionsData.findIndex((q) => q.id === id);
        if (index !== -1) {
          questionsData[index] = { ...questionsData[index], ...data };
          return questionsData[index];
        }
        return null;
      },

      delete: async (id) => {
        await simulateDelay();
        const index = questionsData.findIndex((q) => q.id === id);
        if (index !== -1) {
          questionsData.splice(index, 1);
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
