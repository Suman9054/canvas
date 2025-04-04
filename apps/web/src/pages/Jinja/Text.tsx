import React, { ChangeEvent, useState } from "react";
import { Canvas, Textbox } from "fabric";
import { Button } from "./component/button";
import { Input } from "./component/Input";
import { Slider } from "./component/slidebur";
import { PlusCircle } from "lucide-react";

 interface IAppProps {
  canvas: Canvas | null;
}

export const Text: React.FC<IAppProps> = ({ canvas }) => {
  const [text, setText] = useState("Hello, world!");
  const [fontSize, setFontSize] = useState(20);
  const [textColor, setTextColor] = useState("#020617");
  const [activeTextbox, setActiveTextbox] = useState<Textbox | null>(null);

  const createNewTextbox = () => {
    if (!canvas) return;

    const textbox = new Textbox(text, {
      left: Math.random() * (canvas.width ?? 400 - 150),
      top: Math.random() * (canvas.height ?? 300 - 50),
      width: 150,
      fontSize,
      fontFamily: "Arial",
      textAlign: "center",
      fill: textColor,
      borderColor: "#2563eb",
      cornerColor: "#2563eb",
      cornerSize: 6,
      transparentCorners: false,
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    setActiveTextbox(textbox);

    textbox.on("modified", () => {
      canvas.renderAll();
    });

    textbox.on("selected", () => {
      setActiveTextbox(textbox);
      setText(textbox.text ?? "");
      setFontSize(textbox.fontSize ?? 20);
      setTextColor(textbox.fill?.toString() ?? "#020617");
    });

    textbox.on("deselected", () => {
      setActiveTextbox(null);
    });

    canvas.renderAll();
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    if (activeTextbox) {
      activeTextbox.set("text", newText);
      canvas?.renderAll();
    }
  };

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    if (activeTextbox) {
      activeTextbox.set("fontSize", newSize);
      canvas?.renderAll();
    }
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
    if (activeTextbox) {
      activeTextbox.set("fill", newColor);
      canvas?.renderAll();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Text Content
        </label>
        <Input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="w-full"
          placeholder="Enter text"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Font Size: {fontSize}px
        </label>
        <Slider
          value={[fontSize]}
          onValueChange={handleFontSizeChange}
          min={10}
          max={72}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Text Color
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={textColor}
            onChange={handleColorChange}
            className="w-10 h-10 rounded cursor-pointer"
          />
          <Button
            onClick={createNewTextbox}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            <PlusCircle className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Text;
