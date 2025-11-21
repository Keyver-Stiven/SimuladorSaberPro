import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utilidades";
import { Brain, Book, Users, Edit, Globe, Zap, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [selectedStartModule, setSelectedStartModule] = useState("razonamiento_cuantitativo");

  const moduleNames = {
    razonamiento_cuantitativo: "Razonamiento Cuantitativo",
    lectura_critica: "Lectura Crítica",
    competencias_ciudadanas: "Competencias Ciudadanas",
    comunicacion_escrita: "Comunicación Escrita",
    ingles: "Inglés",
  };

  const modules = [
    {
      id: "razonamiento_cuantitativo",
      name: "Razonamiento Cuantitativo",
      icon: Brain,
      color: "from-blue-500 to-blue-600",
      description: "Resuelve problemas matemáticos y de lógica",
      questions: 10,
    },
    {
      id: "lectura_critica",
      name: "Lectura Crítica",
      icon: Book,
      color: "from-purple-500 to-purple-600",
      description: "Analiza y comprende textos complejos",
      questions: 10,
    },
    {
      id: "competencias_ciudadanas",
      name: "Competencias Ciudadanas",
      icon: Users,
      color: "from-green-500 to-green-600",
      description: "Evalúa situaciones sociales y cívicas",
      questions: 10,
    },
    {
      id: "comunicacion_escrita",
      name: "Comunicación Escrita",
      icon: Edit,
      color: "from-orange-500 to-orange-600",
      description: "Desarrolla habilidades de escritura",
      questions: 10,
    },
    {
      id: "ingles",
      name: "Inglés",
      icon: Globe,
      color: "from-red-500 to-red-600",
      description: "Practica comprensión en inglés",
      questions: 10,
    },
  ];
 
  const [recentScores, setRecentScores] = React.useState([]);

  React.useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("saberProScores") || "[]");
    setRecentScores(scores.slice(-3).reverse());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
          <Target className="w-4 h-4" />
          <span className="text-sm font-medium">Prepárate con confianza</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Simulador Saber PRO
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Solterita.com practica con exámenes simulados realistas y mejora tu desempeño en las
          Pruebas Saber PRO
        </p>
      </div>

      {/* Mode Selection */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="border-2 hover:border-orange-500 transition-all duration-300 hover:shadow-lg h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Simulacro Completo</CardTitle>
                <CardDescription>Los 5 módulos seguidos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Experimenta el examen completo con todas las preguntas disponibles. 
              Simula las condiciones reales del Saber PRO.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Por qué módulo quieres empezar?
              </label>
              <Select value={selectedStartModule} onValueChange={setSelectedStartModule}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un módulo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(moduleNames).map(([key, name]) => (
                    <SelectItem key={key} value={key}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Link 
              to={createPageUrl("Quiz") + `?mode=full&startModule=${selectedStartModule}`}
              className="block w-full"
            >
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                Comenzar Simulacro
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Módulos Disponibles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.id}
                to={createPageUrl("Quiz") + `?mode=quick&module=${module.id}`}
              >
                <Card className="border hover:border-gray-300 transition-all duration-300 hover:shadow-lg h-full group">
                  <CardHeader>
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {module.questions} preguntas
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-gray-100"
                      >
                        Practicar →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Scores */}
      {recentScores.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Intentos Recientes
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recentScores.map((score, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {score.score}%
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {score.correct}/{score.total} correctas
                    </p>
                    <p className="text-xs text-gray-400">
                      {score.mode === "full"
                        ? "Simulacro Completo"
                        : score.moduleName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(score.date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
