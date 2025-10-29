import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Languages, Loader2 } from "lucide-react";
import { diccionario } from "@/api/diccionario";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ReadingTextPanel({ readingText }) {
  const [selectedText, setSelectedText] = useState("");
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleTextSelection = async () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text && text.length > 0) {
      setSelectedText(text);
      setPopoverOpen(true);
      setIsTranslating(true);
      setTranslation("");

      try {
        const result = await diccionario.integrations.Core.InvokeLLM({
          prompt: `Translate the following English text to Spanish. Only provide the translation, nothing else: "${text}"`,
        });
        setTranslation(result);
      } catch (error) {
        setTranslation("Error al traducir. Intenta de nuevo.");
      } finally {
        setIsTranslating(false);
      }
    }
  };

  return (
    <Card className="p-6 bg-blue-50 border-blue-200 h-fit sticky top-4">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900">Reading Text</h3>
        <div className="ml-auto flex items-center gap-2 text-sm text-blue-700">
          <Languages className="w-4 h-4" />
          <span>Toca para traducir</span>
        </div>
      </div>

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <div
            className="prose prose-sm cursor-text select-text"
            onMouseUp={handleTextSelection}
          >
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {readingText}
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-semibold">
              <Languages className="w-4 h-4" />
              <span>Traducción</span>
            </div>

            {selectedText && (
              <div className="text-sm">
                <p className="font-medium text-gray-900 mb-2">{selectedText}</p>

                {isTranslating ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Traduciendo...</span>
                  </div>
                ) : (
                  <p className="text-gray-700 bg-orange-50 border border-orange-200 rounded p-2">
                    {translation}
                  </p>
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Selecciona cualquier palabra u oración para
          ver su traducción al español.
        </p>
      </div>
    </Card>
  );
}
