import React, { useState, useEffect } from "react";
import { diccionario } from "@/api/diccionario";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReadingTextPanel from "../components/quiz/ReadingTextPanel";

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
  const selectedDifficulty = (
    searchParams.get("difficulty") || ""
  ).toLowerCase();

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
        modules.forEach((mod) => {
          const moduleQuestions = allQuestions.filter((q) => q.module === mod);
          const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
          filtered = [...filtered, ...shuffled.slice(0, 10)];
        });
      } else {
        let moduleQuestions = allQuestions.filter(
          (q) => q.module === selectedModule,
        );
        if (
          selectedDifficulty &&
          ["facil", "medio", "dificil"].includes(selectedDifficulty)
        ) {
          moduleQuestions = moduleQuestions.filter(
            (q) =>
              (q.difficulty || "medio").toLowerCase() === selectedDifficulty,
          );
        }
        const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
        filtered = shuffled.slice(0, 10);
      }

      console.log("Setting quiz questions", {
        filteredLength: filtered.length,
        filtered,
      });

      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setQuizQuestions(filtered);

      if (filtered.length > 0) {
        const hasReadingText =
          filtered[0].reading_text && filtered[0].reading_text.trim() !== "";

        setTimeLeft(hasReadingText ? 120 : 60);
      }
    }
  }, [allQuestions, mode, selectedModule]);

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
      question?.reading_text && question.reading_text.trim() !== "";
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

        difficulty: currentQuestion.difficulty,
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
      difficulty: selectedDifficulty || null,
      answers: finalAnswers,
    });
    localStorage.setItem("saberProScores", JSON.stringify(scores));

    navigate(
      createPageUrl("Results") +
        `?score=${score}&correct=${correctCount}&total=${quizQuestions.length}&mode=${mode}${
          mode === "quick" ? `&module=${selectedModule}` : ""
        }`,
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
    (!selectedDifficulty ||
      !["facil", "medio", "dificil"].includes(selectedDifficulty))
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full bg-white border rounded-lg shadow p-6 space-y-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Elige la dificultad
          </h2>
          <p className="text-sm text-gray-600">
            Selecciona la dificultad para el módulo{" "}
            {moduleNames[selectedModule] || selectedModule}
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() =>
                navigate(
                  `${createPageUrl("Quiz")}?mode=quick&module=${selectedModule}&difficulty=facil`,
                )
              }
              className="bg-green-600 hover:bg-green-700"
            >
              Fácil
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `${createPageUrl("Quiz")}?mode=quick&module=${selectedModule}&difficulty=medio`,
                )
              }
              className="bg-amber-600 hover:bg-amber-700"
            >
              Medio
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `${createPageUrl("Quiz")}?mode=quick&module=${selectedModule}&difficulty=dificil`,
                )
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Difícil
            </Button>
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
    currentQuestion.reading_text && currentQuestion.reading_text.trim() !== "";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "full"
                ? `Simulacro Completo — ${moduleNames[currentQuestion.module] || currentQuestion.module}`
                : `${moduleNames[selectedModule]}${
                    selectedDifficulty
                      ? " — " +
                        (selectedDifficulty === "facil"
                          ? "Fácil"
                          : selectedDifficulty === "medio"
                            ? "Medio"
                            : "Difícil")
                      : ""
                  }`}
            </h2>

            <p className="text-sm text-gray-500">
              Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
              <span className="ml-2 inline-flex items-center gap-2">
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">Dificultad:</span>
                {(() => {
                  const d = (
                    currentQuestion.difficulty || "medio"
                  ).toLowerCase();
                  const badge =
                    d === "facil"
                      ? {
                          label: "Fácil",
                          cls: "bg-green-100 text-green-700 border border-green-200",
                        }
                      : d === "dificil"
                        ? {
                            label: "Difícil",
                            cls: "bg-red-100 text-red-700 border border-red-200",
                          }
                        : {
                            label: "Medio",
                            cls: "bg-amber-100 text-amber-700 border border-amber-200",
                          };
                  return (
                    <span className={`px-2 py-0.5 rounded ${badge.cls}`}>
                      {badge.label}
                    </span>
                  );
                })()}
              </span>
              {hasReadingText && (
                <span className="ml-2 text-blue-600">
                  (con lectura - 2 minutos)
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span
              className={`text-lg font-semibold ${timeLeft <= 10 ? "text-red-600" : "text-gray-900"}`}
            >
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className={hasReadingText ? "grid md:grid-cols-2 gap-6" : ""}>
        {hasReadingText && (
          <ReadingTextPanel readingText={currentQuestion.reading_text} />
        )}

        <div className={hasReadingText ? "" : "max-w-3xl mx-auto"}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {currentQuestion.question_text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["A", "B", "C", "D"].map((option) => {
                  const optionText =
                    currentQuestion[`option_${option.toLowerCase()}`];
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correct_answer;
                  const showCorrect = showExplanation && isCorrect;
                  const showIncorrect =
                    showExplanation && isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? "border-green-500 bg-green-50"
                          : showIncorrect
                            ? "border-red-500 bg-red-50"
                            : isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                            showCorrect
                              ? "bg-green-500 text-white"
                              : showIncorrect
                                ? "bg-red-500 text-white"
                                : isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {option}
                        </div>
                        <span className="flex-1 pt-1">{optionText}</span>
                        {showCorrect && (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        )}
                        {showIncorrect && (
                          <XCircle className="w-6 h-6 text-red-500" />
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

              <div className="flex gap-3 mt-6">
                {!showExplanation ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="flex-1"
                    size="lg"
                  >
                    Verificar Respuesta
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700"
                    size="lg"
                  >
                    {currentQuestionIndex < quizQuestions.length - 1
                      ? "Siguiente Pregunta"
                      : "Ver Resultados"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
