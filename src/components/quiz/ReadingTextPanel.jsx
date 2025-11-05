import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Languages } from "lucide-react";
import TranslatableText from "./TranslatableText";

export default function ReadingTextPanel({ readingText }) {

  return (
    <Card className="p-6 bg-blue-50 border-blue-200 h-fit sticky top-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900">Reading Text</h3>
        <div className="ml-auto flex items-center gap-2 text-sm text-blue-700">
          <Languages className="w-4 h-4" />
          <span>Toca palabras</span>
        </div>
      </div>

      <TranslatableText 
        text={readingText} 
        className="prose prose-sm"
      />

      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Toca una palabra individual para ver su traducción.
        </p>
      </div>
    </Card>
  );
}
