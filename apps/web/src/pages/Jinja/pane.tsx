import { Canvas } from "fabric";

import React, { useEffect, ChangeEvent, useState } from "react";

export interface IAppProps {
  canvas: Canvas | null;
}

export const Pen: React.FC<IAppProps> = ({ canvas }: IAppProps) => {
  const [brushSize, setBrushSize] = useState(1);
  const [color, setColor] = useState("#000000");
  useEffect(() => {
    if (!canvas) return;

    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = 1;
      canvas.freeDrawingBrush.color = "rgb(2,6,23)";
    }
  }, []);
  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!canvas?.freeDrawingBrush) return;
    setBrushSize(parseFloat(e.target.value));
    canvas.freeDrawingBrush.width = parseFloat(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Pencil Size: {brushSize}
        </label>
        <div className="flex items-center justify-center bg-gray-50 rounded-md p-2">
          <input
            type="number"
            className="w-20 text-center border rounded-md p-1"
            onChange={onchange}
            value={brushSize}
            min={1}
            max={5}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            className="w-10 h-10 rounded cursor-pointer"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              if (!canvas?.freeDrawingBrush) return;
              canvas.freeDrawingBrush.color = e.target.value;
            }}
          />
          <span className="text-sm text-gray-600">{color.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
