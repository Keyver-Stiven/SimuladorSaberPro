import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function SimpleReadingText({ readingText }) {
  if (!readingText) return null;

  return (
    <Card className="p-6 bg-gray-50 border-gray-200 h-fit sticky top-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Texto de Lectura</h3>
      </div>
      
      <div className="prose prose-sm">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {readingText}
        </div>
      </div>
    </Card>
  );
}