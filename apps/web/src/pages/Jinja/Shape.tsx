import {
  Rect,
  Circle,
  Path,
  Canvas,
  Polygon,
  loadSVGFromString,
  util,
} from "fabric";
import {
  RectangleEllipsis,
  Triangle,
  Circle as CircleIcon,
  Hexagon,
  DiamondIcon,
  Badge,
  HeartIcon,
  Pentagon,
  ArrowRight,
} from "lucide-react";
import React, { useState } from "react";

interface ShapesProps {
  canvas: Canvas | null;
}

const canvasWidth = 1000;
const canvasHeight = 600;

const Shapes: React.FC<ShapesProps> = ({ canvas }) => {
  const [activeButton, setActiveButton] = useState<number | undefined>();

  const rect = () => {
    if (!canvas) return;

    const rectangle = new Rect({
      left: canvasWidth / 2 - 50,
      top: canvasHeight / 2 - 50,
      width: 100,
      height: 100,
      fill: "",
      stroke: "rgb(2,6,23)",
      strokeWidth: 1.5,
      selectable: true,
      strokeLineJoin: "miter",
      strokeLineCap: "round",
      angle: 90,
      rx: 10,
      ry: 10,
    });

    canvas.add(rectangle);
    canvas.renderAll();
  };
  const rectt = () => {
    if (!canvas) return;

    const rectangle = new Rect({
      left: canvasWidth / 2 - 50,
      top: canvasHeight / 2 - 50,
      width: 100,
      height: 100,
      fill: "",
      stroke: "rgb(2,6,23)",
      strokeWidth: 1.5,
      selectable: true,
      strokeLineJoin: "miter",
      strokeLineCap: "round",
      angle: 45,
      rx: 10,
      ry: 10,
    });

    console.log("Adding rectangle:", rectangle);
    canvas.add(rectangle);
    canvas.renderAll();
  };

  const createCircle = () => {
    if (!canvas) return;

    const circle = new Circle({
      left: canvasWidth / 2 - 25,
      top: canvasHeight / 2 - 25,
      radius: 50,
      fill: "",
      stroke: "rgb(2,6,23)",
      strokeWidth: 2,
      selectable: true,
      strokeLineJoin: "miter",
      strokeLineCap: "round",
      rx: 10,
      ry: 10,
    });

    canvas.add(circle);
    canvas.renderAll();
  };
  const createpoligon = () => {
    if (!canvas) {
      console.log("nocanva");
      return;
    }

    const hexagonPoints = [
      { x: 100, y: 0 },
      { x: 200, y: 0 },
      { x: 250, y: 87 },
      { x: 200, y: 174 },
      { x: 100, y: 174 },
      { x: 50, y: 87 },
    ];
    const polygon = new Polygon(hexagonPoints, {
      fill: "",
      stroke: "rgb(2,6,23)",
      strokeWidth: 3,
      left: canvasWidth / 2 - 25,
      top: canvasHeight / 2 - 25,
      selectable: true,
      strokeLineJoin: "miter",
      strokeLineCap: "round",
      width: 100,
      height: 100,
    });
    canvas.add(polygon);

    canvas.renderAll();
  };

  const createTriangle = () => {
    if (!canvas) return;

    const triangle = new Path("M 0 0 L 100 0 L 50 100 z", {
      left: canvasWidth / 2 - 50,
      top: canvasHeight / 2 - 50,
      fill: "",
      stroke: "rgb(2,6,23)",
      strokeWidth: 2,
      selectable: true,
      flipX: true,
      strokeLineJoin: "miter",
      strokeLineCap: "round",
    });

    console.log("Adding triangle:", triangle);
    canvas.add(triangle);
    canvas.renderAll();
  };
  const svg = async () => {
    if (!canvas) return;
    const svgst = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="rgb(2,6,23)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/></svg>`;
    try {
      const result = await loadSVGFromString(svgst);
      const svgobj = util.groupSVGElements(
        result.objects.filter(
          (obj): obj is NonNullable<typeof obj> => obj !== null,
        ),
        result.options,
      );
      svgobj.set({
        screenX: 10,
        screenY: 10,

        left: canvasWidth / 2 - 50,
        top: canvasHeight / 2 - 50,
      });
      canvas.add(svgobj);
      canvas.renderAll();
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  };
  const svgs = async () => {
    if (!canvas) return;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="rgb(2,6,23)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    try {
      const result = await loadSVGFromString(svg);
      const svgobj = util.groupSVGElements(
        result.objects.filter(
          (obj): obj is NonNullable<typeof obj> => obj !== null,
        ),
        result.options,
      );
      svgobj.set({
        screenX: 10,
        screenY: 10,

        left: canvasWidth / 2 - 50,
        top: canvasHeight / 2 - 50,
      });
      canvas.add(svgobj);
      canvas.renderAll();
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  };
  const svgss = async () => {
    if (!canvas) return;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="rgb(2,6,23)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pentagon"><path d="M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z"/></svg>`;
    try {
      const result = await loadSVGFromString(svg);
      const svgobj = util.groupSVGElements(
        result.objects.filter(
          (obj): obj is NonNullable<typeof obj> => obj !== null,
        ),
        result.options,
      );
      svgobj.set({
        screenX: 10,
        screenY: 10,

        left: canvasWidth / 2 - 50,
        top: canvasHeight / 2 - 50,
      });
      canvas.add(svgobj);
      canvas.renderAll();
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  };
  const arro = async () => {
    if (!canvas) return;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="rgb(2,6,23)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
    try {
      const result = await loadSVGFromString(svg);
      const svgobj = util.groupSVGElements(
        result.objects.filter(
          (obj): obj is NonNullable<typeof obj> => obj !== null,
        ),
        result.options,
      );
      svgobj.set({
        screenX: 10,
        screenY: 10,

        left: canvasWidth / 2 - 50,
        top: canvasHeight / 2 - 50,
      });
      canvas.add(svgobj);
      canvas.renderAll();
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  };

  const buttons = [
    { id: 1, label: <RectangleEllipsis />, onClick: rect },
    { id: 2, label: <Triangle />, onClick: createTriangle },
    { id: 3, label: <CircleIcon />, onClick: createCircle },
    { id: 4, label: <Hexagon />, onClick: createpoligon },
    { id: 5, label: <DiamondIcon />, onClick: rectt },
    { id: 6, label: <Badge />, onClick: svg },
    { id: 7, label: <HeartIcon />, onClick: svgs },
    { id: 8, label: <Pentagon />, onClick: svgss },
    { id: 9, label: <ArrowRight />, onClick: arro },
  ];

  return (
    <div className=" grid grid-cols-3  gap-3 ">
      {buttons.map((b) => (
        <button
          key={b.id}
          onClick={() => {
            setActiveButton(b.id);
            b.onClick();
          }}
          className={`px-4 py-2 rounded-md transition-all duration-200o   ${
            activeButton === b.id
              ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
};

export default Shapes;
