import { Canvas } from "fabric";
import { useState, useEffect } from "react";

export interface IAppProps {
  canvas: Canvas | null;
}

export default function LineSettings({ canvas }: IAppProps) {
  const [color, setColor] = useState("#020617");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!canvas || !canvas._activeObject) return;

    const activeObject = canvas._activeObject;

    if ("stroke" in activeObject) {
      activeObject.set({
        stroke: color,
        strokeWidth: strokeWidth,
        opacity: opacity,
      });

      canvas.renderAll();
    }
  }, [color, strokeWidth, opacity, canvas]);

  useEffect(() => {
    if (!canvas) return;

    const handleSelectionCreated = (e: any) => {
      const selectedObject = e.selected?.[0];
      if (!selectedObject) return;

      if ("stroke" in selectedObject) {
        setColor(selectedObject.stroke || "#020617");
        setStrokeWidth(selectedObject.strokeWidth || 2);
        setOpacity(selectedObject.opacity || 1);
      }
    };

    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionCreated);

    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:updated", handleSelectionCreated);
    };
  }, [canvas]);

  return (
    <div className="p-3 bg-white rounded shadow">
      <h3 className="text-lg font-medium mb-3">Stoke Settings</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Stoke Color</label>
          <div className="flex items-center">
            <input
              type="color"
              className="w-10 h-10 rounded cursor-pointer"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
            <span className="ml-2 text-sm font-mono">{color}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">
            Stoke Width: {strokeWidth}px
          </label>
          <input
            type="range"
            min="1"
            max="20"
            className="w-full"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Opacity: {Math.round(opacity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="w-full"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
