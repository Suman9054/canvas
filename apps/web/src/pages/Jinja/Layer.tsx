import { Canvas } from "fabric";
import React, { useEffect, useState } from "react";

interface IAppProps {
  canvas: Canvas | null;
}

interface Layer {
  id: number;
  name: string;
  visible: boolean;
}

export const Layer_s: React.FC<IAppProps> = ({ canvas }: IAppProps) => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const updateLayers = () => {
      const objects = canvas.getObjects();
      const layersData = objects.map((object, index) => ({
        id: index,
        name: object.type,
        visible: object.visible,
      }));
      setLayers(layersData);
      if (layersData.length > 0) {
        setActiveLayer(layersData[0].id);
      }
    };

    updateLayers();

    canvas.on("object:added", updateLayers);
    canvas.on("object:removed", updateLayers);
    canvas.on("object:modified", updateLayers);

    return () => {
      canvas.off("object:added", updateLayers);
      canvas.off("object:removed", updateLayers);
      canvas.off("object:modified", updateLayers);
    };
  }, [canvas]);

  const toggleLayerVisibility = (id: number) => {
    const updatedLayers = layers.map((layer) => {
      if (layer.id === id) {
        const object = canvas?.item(id);
        if (object) {
          object.set("visible", !object.visible);
          canvas?.renderAll();
        }
        return { ...layer, visible: !layer.visible };
      }
      return layer;
    });
    setLayers(updatedLayers);
  };

  const setLayerActive = (id: number) => {
    setActiveLayer(id);
    canvas?.setActiveObject(canvas?.item(id));
  };

  return (
    <div className="space-y-2 p-4">
      <div className="bg-[#E0E0E2] p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-[#B5BAD0]  transform hover:scale-105">
        <h2 className="font-bold">Layers</h2>
      </div>

      {/* Layers List */}
      <div className="space-y-4">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`flex justify-between items-center p-2 rounded-lg border ${
              activeLayer === layer.id ? "bg-blue-100" : "bg-white"
            }`}
          >
            <div
              onClick={() => setLayerActive(layer.id)}
              className="cursor-pointer"
            >
              {layer.name} - {layer.visible ? "Visible" : "Hidden"}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleLayerVisibility(layer.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Toggle Visibility
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
