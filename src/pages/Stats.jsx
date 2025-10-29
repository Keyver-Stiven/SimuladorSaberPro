import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Award, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Stats() {
  const [scores, setScores] = React.useState([]);
  const [stats, setStats] = React.useState({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    totalQuestions: 0,
  });

  React.useEffect(() => {
    const savedScores = JSON.parse(
      localStorage.getItem("saberProScores") || "[]",
    );
    setScores(savedScores.reverse());

    if (savedScores.length > 0) {
      const avgScore = Math.round(
        savedScores.reduce((sum, s) => sum + s.score, 0) / savedScores.length,
      );
      const bestScore = Math.max(...savedScores.map((s) => s.score));
      const totalQuestions = savedScores.reduce((sum, s) => sum + s.total, 0);

      setStats({
        totalAttempts: savedScores.length,
        averageScore: avgScore,
        bestScore,
        totalQuestions,
      });
    }
  }, []);

  const clearHistory = () => {
    if (
      window.confirm("¿Estás seguro de que quieres borrar todo el historial?")
    ) {
      localStorage.removeItem("saberProScores");
      setScores([]);
      setStats({
        totalAttempts: 0,
        averageScore: 0,
        bestScore: 0,
        totalQuestions: 0,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Estadísticas</h1>
        <p className="text-gray-600">Revisa tu progreso y desempeño</p>
      </div>

      {scores.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay estadísticas aún
            </h3>
            <p className="text-gray-600">
              Completa tu primer simulacro para ver tus estadísticas
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Intentos Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.totalAttempts}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Promedio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {stats.averageScore}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Mejor Puntaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {stats.bestScore}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Preguntas Resueltas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">
                  {stats.totalQuestions}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Historial de Intentos</CardTitle>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Borrar Historial
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scores.map((score, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {score.moduleName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(score.date).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          score.score >= 80
                            ? "default"
                            : score.score >= 60
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {score.score}%
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Correctas</span>
                        <span className="font-medium">
                          {score.correct}/{score.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(score.correct / score.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
