import { Canvas } from "fabric";
import { useState, useEffect } from "react";

export interface IAppProps {
  canvas: Canvas | null;
}

export function TextboxSettings({ canvas }: IAppProps) {
  
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");
  const [textAlign, setTextAlign] = useState("left");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  // Update settings when a textbox is selected
  useEffect(() => {
    if (!canvas) return;

    const handleSelectionCreated = (e: any) => {
      const selectedObject = e.selected?.[0];
      if (!selectedObject || selectedObject.type !== 'textbox') return;

      
      setFontSize(selectedObject.fontSize || 24);
      setFontFamily(selectedObject.fontFamily || "Arial");
      setTextColor(selectedObject.fill || "#000000");
      setTextAlign(selectedObject.textAlign || "left");
      setBold(selectedObject.fontWeight === 'bold');
      setItalic(selectedObject.fontStyle === 'italic');
      setUnderline(selectedObject.underline || false);
    };

    canvas.on('selection:created', handleSelectionCreated);
    canvas.on('selection:updated', handleSelectionCreated);

    return () => {
      canvas.off('selection:created', handleSelectionCreated);
      canvas.off('selection:updated', handleSelectionCreated);
    };
  }, [canvas]);

  // Apply text changes to selected textbox
  

  // Apply style changes to selected textbox
  const applyTextStyles = () => {
    if (!canvas || !canvas._activeObject || canvas._activeObject.type !== 'textbox') return;
    
    canvas._activeObject.set({
      fontSize: fontSize,
      fontFamily: fontFamily,
      fill: textColor,
      textAlign: textAlign,
      fontWeight: bold ? 'bold' : 'normal',
      fontStyle: italic ? 'italic' : 'normal',
      underline: underline
    });
    canvas._activeObject.hasControls = true;
    canvas._activeObject.hasBorders = true;
    
    
    canvas.renderAll();
  };

  // Call applyTextStyles whenever a style setting changes
  useEffect(() => {
    applyTextStyles();
  }, [fontSize, fontFamily, textColor, textAlign, bold, italic, underline]);

  const fontFamilies = [
    "Arial", "Helvetica", "Times New Roman", "Courier New", 
    "Georgia", "Verdana", "Impact", "Comic Sans MS"
  ];

  return (
    <div className="p-4 bg-white rounded shadow max-h-96 overflow-y-auto scrollbar-thin scroll-smooth">
      <h3 className="text-lg font-medium mb-3 top-1">Text Settings</h3>
      
      <div className="space-y-4 ">
       
        
        {/* Font Family */}
        <div>
          <label className="block text-sm mb-1">Font Family</label>
          <select
            className="w-full p-2 border rounded"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            {fontFamilies.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
        
        {/* Font Size */}
        <div>
          <label className="block text-sm mb-1">Font Size: {fontSize}px</label>
          <input
            type="range"
            min="8"
            max="72"
            className="w-full"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
        </div>
        
        {/* Text Color */}
        <div>
          <label className="block text-sm mb-1">Text Color</label>
          <div className="flex items-center">
            <input
              type="color"
              className="w-10 h-10 rounded cursor-pointer"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
            <span className="ml-2 text-sm font-mono">{textColor}</span>
          </div>
        </div>
        
        {/* Text Alignment */}
        <div>
          <label className="block text-sm mb-1">Text Alignment</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`border rounded py-1 px-2 text-sm ${textAlign === "left" ? "bg-blue-100 border-blue-500" : "bg-gray-50"}`}
              onClick={() => setTextAlign("left")}
            >
              Left
            </button>
            <button
              className={`border rounded py-1 px-2 text-sm ${textAlign === "center" ? "bg-blue-100 border-blue-500" : "bg-gray-50"}`}
              onClick={() => setTextAlign("center")}
            >
              Center
            </button>
            <button
              className={`border rounded py-1 px-2 text-sm ${textAlign === "right" ? "bg-blue-100 border-blue-500" : "bg-gray-50"}`}
              onClick={() => setTextAlign("right")}
            >
              Right
            </button>
          </div>
        </div>
        
        {/* Text Style Buttons */}
        <div>
          <label className="block text-sm mb-1">Text Style</label>
          <div className="flex space-x-2">
            <button
              className={`border rounded py-1 px-2 text-sm min-w-8 ${bold ? "bg-blue-100 border-blue-500" : "bg-gray-50"}`}
              onClick={() => setBold(!bold)}
            >
              B
            </button>
            <button
              className={`border rounded py-1 px-2 text-sm italic min-w-8 ${italic ? "bg-blue-100 border-blue-500" : "bg-gray-50"}`}
              onClick={() => setItalic(!italic)}
            >
              I
            </button>
            <button
              className={`border rounded py-1 px-2 text-sm underline min-w-8 ${underline ? "bg-blue-100 border-blue-500" : "bg-gray-50"}`}
              onClick={() => setUnderline(!underline)}
            >
              U
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}