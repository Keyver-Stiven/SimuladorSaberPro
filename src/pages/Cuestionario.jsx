import React, { useState, useEffect } from "react";
import { diccionario } from "@/api/traductor";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utilidades";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReadingTextPanel from "../components/quiz/ReadingTextPanel";
import SimpleReadingText from "../components/quiz/SimpleReadingText";
import TranslatableText from "../components/quiz/TranslatableText";

const moduleNames = {
  razonamiento_cuantitativo: "Razonamiento Cuantitativo",
  lectura_critica: "Lectura Crítica",
  competencias_ciudadanas: "Competencias Ciudadanas",
  comunicacion_escrita: "Comunicación Escrita",
  ingles: "Inglés",
};

export default function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const selectedModule = searchParams.get("module");

  const selectedCount = parseInt(searchParams.get("count") || "", 10);
  const startModule = searchParams.get("startModule");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const {
    data: allQuestions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions"],

    queryFn: async () => {
      console.log("Fetching questions from API...");

      const result = await diccionario.entities.Question.list();

      console.log("Questions fetched:", result.length);

      return result;
    },
  });

  // Agregar función de barajado Fisher-Yates (mejor aleatoriedad)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    console.log("Quiz useEffect triggered", {
      allQuestionsLength: allQuestions?.length || 0,
      quizQuestionsLength: quizQuestions.length,
      mode,
      selectedModule,
      isLoading,
    });

    if (allQuestions && allQuestions.length > 0) {
      let filtered = [];

      if (mode === "full") {
        const modules = Object.keys(moduleNames);
        const questionsByModule = {};
        
        // Organizar preguntas por módulo
        modules.forEach((mod) => {
          const moduleQuestions = allQuestions.filter((q) => q.module === mod);
          // Reemplazar barajado sesgado por Fisher-Yates
          const shuffledQuestions = shuffleArray(moduleQuestions);
          questionsByModule[mod] = shuffledQuestions;
        });
        
        // Si hay un módulo de inicio, empezar por ese
        if (startModule && questionsByModule[startModule]) {
          // Agregar primero el módulo seleccionado
          filtered = [...questionsByModule[startModule]];
          // Luego agregar el resto de módulos en orden
          modules.forEach((mod) => {
            if (mod !== startModule) {
              filtered = [...filtered, ...questionsByModule[mod]];
            }
          });
        } else {
          // Si no hay módulo de inicio, agregar todos en orden
          modules.forEach((mod) => {
            filtered = [...filtered, ...questionsByModule[mod]];
          });
        }
      } else {
        let moduleQuestions = allQuestions.filter(
          (q) => q.module === selectedModule,
        );
        // Reemplazar barajado sesgado por Fisher-Yates
        const shuffledQuestions = shuffleArray(moduleQuestions);

        const countVal =
          Number.isFinite(selectedCount) && [10, 20, 30].includes(selectedCount)
            ? selectedCount
            : 10;
        filtered = shuffledQuestions.slice(0, countVal);
      }

      // Barajar opciones de respuesta para cada pregunta
      const questionsWithShuffledAnswers = filtered.map(question => {
        // Asegurarse de que las opciones de respuesta existan antes de barajar
        if (question.option_a && question.option_b && question.option_c && question.option_d) {
          const options = [
            { key: 'A', value: question.option_a },
            { key: 'B', value: question.option_b },
            { key: 'C', value: question.option_c },
            { key: 'D', value: question.option_d },
          ];
          const shuffledOptions = shuffleArray(options);
          const newQuestion = { ...question };
          shuffledOptions.forEach((opt, index) => {
            newQuestion[`option_${String.fromCharCode(65 + index).toLowerCase()}`] = opt.value;
            // Si esta opción es la correcta, actualizar la letra de la respuesta correcta
            if (opt.key === question.correct_answer) {
              newQuestion.correct_answer = String.fromCharCode(65 + index);
            }
          });
          return newQuestion;
        }
        return question;
      });

      console.log("Setting quiz questions", {
        filteredLength: filtered.length,
        filtered,
      });

      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      // Usar preguntas con opciones barajadas
      setQuizQuestions(questionsWithShuffledAnswers);

      if (filtered.length > 0) {
        const hasReadingText =
          filtered[0].reading_text && (
            typeof filtered[0].reading_text === 'string' 
              ? filtered[0].reading_text.trim() !== ""
              : filtered[0].reading_text !== null && filtered[0].reading_text !== undefined
          );

        setTimeLeft(hasReadingText ? 120 : 60);
      }
    }
  }, [allQuestions, mode, selectedModule, selectedCount, startModule]); // Agregado startModule a las dependencias

  useEffect(() => {
    if (showExplanation || quizQuestions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return getTimeForQuestion(
            quizQuestions[
              Math.min(currentQuestionIndex + 1, quizQuestions.length - 1)
            ],
          );
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showExplanation, quizQuestions]);

  const getTimeForQuestion = (question) => {
    const hasReadingText =
      question?.reading_text && (
        typeof question.reading_text === 'string' 
          ? question.reading_text.trim() !== ""
          : question.reading_text !== null && question.reading_text !== undefined
      );
    return hasReadingText ? 120 : 60;
  };

  const handleAnswerSelect = (option) => {
    if (showExplanation) return;
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setAnswers([
      ...answers,

      {
        question: currentQuestion.question_text,

        selected: selectedAnswer,

        correct: currentQuestion.correct_answer,

        isCorrect,

        difficulty: currentQuestion.difficulty, // Mantener en el estado si es necesario para resultados, pero no se muestra
      },
    ]);

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(getTimeForQuestion(quizQuestions[nextIndex]));
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalAnswers = [...answers];
    if (selectedAnswer && !showExplanation) {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correct_answer;

      finalAnswers.push({
        question: currentQuestion.question_text,

        selected: selectedAnswer,

        correct: currentQuestion.correct_answer,

        isCorrect,

        difficulty: currentQuestion.difficulty,
      });
    }

    const correctCount = finalAnswers.filter((a) => a.isCorrect).length;
    const score = Math.round((correctCount / quizQuestions.length) * 100);

    const scores = JSON.parse(localStorage.getItem("saberProScores") || "[]");
    scores.push({
      date: new Date().toISOString(),
      mode,
      moduleName:
        mode === "quick" ? moduleNames[selectedModule] : "Simulacro Completo",

      score,

      correct: correctCount,

      total: quizQuestions.length,

      count: Number.isFinite(selectedCount) ? selectedCount : null,
      answers: finalAnswers,
    });
    localStorage.setItem("saberProScores", JSON.stringify(scores));

    navigate(
      createPageUrl("Results") +
        `?score=${score}&correct=${correctCount}&total=${quizQuestions.length}&mode=${mode}${mode === "quick" ? `&module=${selectedModule}` : ""}`,
    );
  };

  console.log("Quiz render", {
    isLoading,
    quizQuestionsLength: quizQuestions.length,
    allQuestionsLength: allQuestions?.length || 0,
    mode,
    selectedModule,
    error,
  });

  if (
    mode === "quick" &&
    !(Number.isFinite(selectedCount) && [10, 20, 30].includes(selectedCount))
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full bg-white border rounded-lg shadow p-6 space-y-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Elige la cantidad de preguntas
          </h2>
          <p className="text-sm text-gray-600">
            Selecciona cuántas preguntas quieres para el módulo{" "}
            {moduleNames[selectedModule] || selectedModule}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <button
              onClick={() =>
                navigate(
                  `${createPageUrl("Quiz")}?mode=quick&module=${selectedModule}&count=10`,
                )
              }
              className="group relative bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4 sm:py-6 px-3 sm:px-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">10</div>
                <div className="text-xs sm:text-sm opacity-90 leading-tight">PREGUNTAS</div>
                <div className="text-xs opacity-75 mt-0.5 sm:mt-1 leading-tight">Rápido</div>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg sm:rounded-xl transition-opacity duration-200"></div>
            </button>

            <button
              onClick={() =>
                navigate(
                  `${createPageUrl("Quiz")}?mode=quick&module=${selectedModule}&count=20`,
                )
              }
              className="group relative bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-4 sm:py-6 px-3 sm:px-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">20</div>
                <div className="text-xs sm:text-sm opacity-90 leading-tight">PREGUNTAS</div>
                <div className="text-xs opacity-75 mt-0.5 sm:mt-1 leading-tight">Intermedio</div>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg sm:rounded-xl transition-opacity duration-200"></div>
            </button>

            <button
              onClick={() =>
                navigate(
                  `${createPageUrl("Quiz")}?mode=quick&module=${selectedModule}&count=30`,
                )
              }
              className="group relative bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-4 sm:py-6 px-3 sm:px-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">30</div>
                <div className="text-xs sm:text-sm opacity-90 leading-tight">PREGUNTAS</div>
                <div className="text-xs opacity-75 mt-0.5 sm:mt-1 leading-tight">Completo</div>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg sm:rounded-xl transition-opacity duration-200"></div>
            </button>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate(createPageUrl("Home"))}
          >
            Volver
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 text-xl font-semibold mb-2">
            Error al cargar preguntas
          </p>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando preguntas...</p>
          <p className="text-sm text-gray-500 mt-2">
            Modo: {mode === "full" ? "Simulacro Completo" : selectedModule}
          </p>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <p className="text-gray-900 text-xl font-semibold mb-2">
            No hay preguntas disponibles
          </p>
          <p className="text-gray-600 mb-4">
            No se encontraron preguntas para el módulo seleccionado.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Modo: {mode}, Módulo: {selectedModule}, Total preguntas:{" "}
            {allQuestions?.length || 0}
          </p>
          <Button onClick={() => navigate(createPageUrl("Home"))}>
            Volver al Inicio
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const hasReadingText =
    currentQuestion.reading_text && (
      typeof currentQuestion.reading_text === 'string' 
        ? currentQuestion.reading_text.trim() !== ""
        : currentQuestion.reading_text !== null && currentQuestion.reading_text !== undefined
    );

  return (
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 quiz-content-flow">
      <div className="mb-4 sm:mb-6 quiz-section">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {mode === "full"
                ? `Simulacro Completo — ${moduleNames[currentQuestion.module] || currentQuestion.module}`
                : `${moduleNames[selectedModule]}`}
            </h2>
            {Number.isFinite(selectedCount) && [10, 20, 30].includes(selectedCount) && (
              <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-2">
                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                  selectedCount === 10 ? 'bg-blue-100 text-blue-800' :
                  selectedCount === 20 ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {selectedCount} PREGUNTAS
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  selectedCount === 10 ? 'bg-blue-50 text-blue-600' :
                  selectedCount === 20 ? 'bg-green-50 text-green-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  {selectedCount === 10 ? 'Rápido' :
                   selectedCount === 20 ? 'Intermedio' : 'Completo'}
                </div>
              </div>
            )}

            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
              Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
              {/* Eliminada la sección de dificultad */}
              {hasReadingText && (
                <span className="ml-1 sm:ml-2 text-blue-600 block sm:inline">
                  (con lectura - 2 minutos)
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center sm:ml-4">
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${
              timeLeft <= 10 ? 'bg-red-50 border-red-200 text-red-700' :
              timeLeft <= 30 ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
              'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-mono font-bold text-lg sm:text-xl">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className={hasReadingText ? "grid md:grid-cols-2 gap-6 quiz-content-flow" : "quiz-content-flow"}>
        {hasReadingText && currentQuestion.module === "ingles" && (
          <ReadingTextPanel readingText={currentQuestion.reading_text} />
        )}
        {hasReadingText && currentQuestion.module !== "ingles" && (
          <SimpleReadingText readingText={currentQuestion.reading_text} />
        )}

        <div className={hasReadingText ? "" : "max-w-3xl mx-auto"}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {currentQuestion.module === "ingles" ? (
                  <TranslatableText text={currentQuestion.question_text} />
                ) : (
                  currentQuestion.question_text
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Mapear las opciones de respuesta dinámicamente */}
                {['A', 'B', 'C', 'D'].map((optionKey, index) => {
                  const optionValue = currentQuestion[`option_${optionKey.toLowerCase()}`];
                  const isSelected = selectedAnswer === optionKey;
                  const isCorrect = optionKey === currentQuestion.correct_answer;
                  const showCorrect = showExplanation && isCorrect;
                  const showIncorrect = showExplanation && isSelected && !isCorrect;

                  return (
                    <button
                      key={optionKey}
                      onClick={() => handleAnswerSelect(optionKey)}
                      disabled={showExplanation}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? "border-green-500 bg-green-50"
                          : showIncorrect
                            ? "border-red-500 bg-red-50"
                            : isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div
                          className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                            showCorrect
                              ? "bg-green-500 text-white"
                              : showIncorrect
                                ? "bg-red-500 text-white"
                                : isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {optionKey}
                        </div>
                        <span className="flex-1 pt-0.5 sm:pt-1 text-sm sm:text-base">
                          {currentQuestion.module === "ingles" ? (
                            <TranslatableText text={optionValue} />
                          ) : (
                            optionValue
                          )}
                        </span>
                        {showCorrect && (
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                        )}
                        {showIncorrect && (
                          <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <Alert className="mt-6 bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-sm">
                    <strong className="text-blue-900">Explicación:</strong>
                    <p className="mt-1 text-gray-700">
                      {currentQuestion.explanation}
                    </p>
                  </AlertDescription>
                </Alert>
              )}

              {/* Botón de acción principal - más prominente en móvil */}
              <div className="sticky bottom-0 bg-white pt-3 pb-4 -mx-6 px-6 border-t border-gray-200 sm:static sm:bg-transparent sm:border-0 sm:p-0 sm:m-0">
                <div className="flex flex-col gap-2">
                  {!showExplanation ? (
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                      className="w-full py-3 sm:py-2 text-base sm:text-sm font-semibold shadow-lg sm:shadow-none"
                      size={selectedAnswer ? "lg" : "default"}
                    >
                      Verificar Respuesta
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="w-full py-3 sm:py-2 text-base sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sm:shadow-none"
                      size="lg"
                    >
                      {currentQuestionIndex < quizQuestions.length - 1
                        ? "Siguiente Pregunta"
                        : "Ver Resultados"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
