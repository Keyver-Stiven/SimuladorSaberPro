import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, CheckCircle2, XCircle, RotateCcw, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Results() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const score = parseInt(searchParams.get("score"));
  const correct = parseInt(searchParams.get("correct"));
  const total = parseInt(searchParams.get("total"));
  const mode = searchParams.get("mode");
  const module = searchParams.get("module");

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return "¡Excelente! Dominas el tema.";
    if (score >= 80) return "¡Muy bien! Vas por buen camino.";
    if (score >= 70) return "Buen trabajo. Sigue practicando.";
    if (score >= 60) return "Puedes mejorar. Continúa estudiando.";
    return "Necesitas más práctica. ¡No te rindas!";
  };

  const handleRetry = () => {
    if (mode === "full") {
      navigate(createPageUrl("Quiz") + "?mode=full");
    } else {
      navigate(createPageUrl("Quiz") + `?mode=quick&module=${module}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Results Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Simulacro Completado
        </h1>
        <p className="text-gray-600">
          {mode === "full" ? "Simulacro Completo" : "Práctica Rápida"}
        </p>
      </div>

      {/* Score Card */}
      <Card className="mb-8 border-2">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className={`text-7xl font-bold mb-4 ${getScoreColor(score)}`}>
              {score}%
            </div>
            <p className="text-2xl font-semibold text-gray-700 mb-2">
              {getScoreMessage(score)}
            </p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-lg">
                  <strong>{correct}</strong> correctas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-lg">
                  <strong>{total - correct}</strong> incorrectas
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Desglose de Desempeño</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Respuestas Correctas</span>
              <span className="font-semibold text-green-600">
                {correct}/{total} ({Math.round((correct / total) * 100)}%)
              </span>
            </div>
            <Progress
              value={(correct / total) * 100}
              className="h-3 bg-green-100"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Respuestas Incorrectas</span>
              <span className="font-semibold text-red-600">
                {total - correct}/{total} (
                {Math.round(((total - correct) / total) * 100)}%)
              </span>
            </div>
            <Progress
              value={((total - correct) / total) * 100}
              className="h-3 bg-red-100"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-orange-50 border-0">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-3">Recomendaciones</h3>
          <ul className="space-y-2 text-gray-700">
            {score < 70 && (
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>Revisa los temas donde tuviste más errores</span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Practica regularmente para mejorar tu desempeño</span>
            </li>
            {score >= 80 && (
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>
                  ¡Excelente trabajo! Intenta el simulacro completo si aún no lo
                  has hecho
                </span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Lee cuidadosamente cada pregunta antes de responder</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleRetry}
          variant="outline"
          className="flex-1 h-12"
          size="lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Intentar de Nuevo
        </Button>
        <Button
          onClick={() => navigate(createPageUrl("Home"))}
          className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          size="lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
}
