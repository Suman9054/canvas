import { Canvas } from "fabric";

import React, { ChangeEvent, useEffect, useState } from "react";

interface IAppProps {
  canvas: Canvas | null;
}

export const Erasur: React.FC<IAppProps> = ({ canvas }: IAppProps) => {
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    if (!canvas) return;

    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = 5;
      canvas.freeDrawingBrush.color = "rgb(209,213,219)";
      canvas.selection = false;
    }
  }, []);

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!canvas?.freeDrawingBrush) return;
    setBrushSize(parseFloat(e.target.value));
    canvas.freeDrawingBrush.color = "rgb(209,213,219)";
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
            min={2}
            max={10}
          />
        </div>
      </div>
    </div>
  );
};
