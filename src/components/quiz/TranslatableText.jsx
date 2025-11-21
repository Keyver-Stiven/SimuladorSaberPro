import React, { useState, useMemo } from "react";
import { Languages, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { translateFromDictionary } from "@/api/traductor";

export default function TranslatableText({ text, className = "" }) {
  const [selectedText, setSelectedText] = useState("");
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Check if text is a React element/JSX
  const isJSX = text && typeof text === 'object' && text.$$typeof;

  // Translate text and update state
  const translateTextFunc = async (text) => {
    if (!text || !text.trim()) return;
    
    setSelectedText(text);
    setPopoverOpen(true);
    setIsTranslating(true);
    setTranslation("");
    
    try {
      const result = await translateFromDictionary(text);
      setTranslation(result);
    } catch (error) {
      setTranslation("Error al traducir. Intenta de nuevo.");
    } finally {
      setIsTranslating(false);
    }
  };

  // Handle word tap (touch on mobile) to translate
  const handleTapWord = async (word) => {
    const cleanWord = (word || "").trim();
    if (!cleanWord) return;
    await translateTextFunc(cleanWord);
  };

  // Disable text selection translation - only allow word clicking
  const handleTextSelection = () => {
    // Clear any selection to prevent translation of multiple words
    const selection = window.getSelection();
    if (selection && selection.toString().trim().split(/\s+/).length > 1) {
      // If more than one word is selected, clear the selection
      selection.removeAllRanges();
    }
  };

  // Tokenize text preserving spaces and punctuation for word-by-word tapping
  const tokens = useMemo(() => {
    // If text is JSX/React element, return empty array (can't tokenize JSX)
    if (!text || isJSX) return [];
    
    // Split by words and separators (spaces and punctuation)
    const parts = text.split(/(\w+|\W+)/).filter(Boolean);
    return parts.map((part, index) => {
      // Consider "word" an alphanumeric sequence
      const isWord = /^\w+$/.test(part);
      return { 
        type: isWord ? "word" : "sep", 
        value: part,
        key: `token-${index}-${part}`
      };
    });
  }, [text, isJSX]);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <div
        className={`cursor-text ${className}`}
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
      >
        {isJSX ? (
          // If text is JSX, render it directly without word-by-word translation
          <div>{text}</div>
        ) : (
          <PopoverTrigger asChild>
            <div className="inline">
              {tokens.map((token) =>
                token.type === "word" ? (
                  <span
                    key={token.key}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTapWord(token.value);
                    }}
                    className="inline px-0.5 rounded hover:bg-blue-100 focus:bg-blue-100 focus:outline-none active:bg-blue-200 transition-colors cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleTapWord(token.value);
                      }
                    }}
                    aria-label={`Translate word ${token.value}`}
                  >
                    {token.value}
                  </span>
                ) : (
                  <span key={token.key}>{token.value}</span>
                ),
              )}
            </div>
          </PopoverTrigger>
        )}
      </div>
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
          
          {!selectedText && (
            <p className="text-sm text-gray-500">
              Toca una palabra para traducir
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}