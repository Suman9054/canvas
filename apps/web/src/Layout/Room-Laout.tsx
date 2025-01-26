import { Canvas,} from 'fabric';
import { 
  ArrowBigUpDash, BotIcon, BrushIcon, EraserIcon, 
  HandIcon, PenIcon, ShapesIcon, Share, Share2, TextQuote 
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Shapes from '../pages/Jinja/Shape';
import { Brush } from '../pages/Jinja/Brush';
import { Pen } from '../pages/Jinja/pane';

interface Button {
  id: number;
  label: React.ReactNode;
  onClick?: () => void;
}

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  
  const buttons: Button[] = [
    { id: 1, label: <PenIcon /> },
    { id: 2, label: <BrushIcon /> },
    { id: 3, label: <EraserIcon /> },
    { id: 4, label: <TextQuote /> },
    { id: 5, label: <ShapesIcon /> },
    { id: 6, label: <ArrowBigUpDash /> },
    { id: 7, label: <HandIcon /> },
    { id: 8, label: <BotIcon /> },
    { id: 9, label: <Share /> },
    { id: 10, label: <Share2 /> },
  ];

  // UseEffect for canvas initialization
  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new Canvas(canvasRef.current, {
        width: 1000,
        height: 600,
        renderOnAddRemove: true,
        backgroundColor:'rgb(209,213,219)',
        
      });
      
      setCanvas(fabricCanvas);
  
      fabricCanvas.renderAll();

      return () =>{
        fabricCanvas.dispose();
      }
    }
    
  }, []);
//useEffect for pen 
useEffect(()=>{
if(!canvas)return;



const svgCursor = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>`;
const encodedSvg = `data:image/svg+xml;base64,${btoa(svgCursor)}`;
 canvas.freeDrawingCursor = `url("${encodedSvg}"), pointer`;
 
 

},[activeButton===1])
useEffect(()=>{
  if(!canvas)return;
  const svgCursor = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brush"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>
    `;
  const encodedSvg = `data:image/svg+xml;base64,${btoa(svgCursor)}`;
  canvas.freeDrawingCursor = `url("${encodedSvg}"), pointer`;
  },[activeButton===2])
  useEffect(()=>{
    if(!canvas)return;
    const svgCursor = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eraser"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
      `;
    const encodedSvg = `data:image/svg+xml;base64,${btoa(svgCursor)}`;
    canvas.defaultCursor = `url("${encodedSvg}"), pointer`;
    },[activeButton===3])
  return (
    <div className="h-screen w-full bg-gray-200 p-4">
      <div className="rounded-lg bg-white shadow-lg h-full overflow-hidden">
        <div className="w-full h-14 bg-gray-50 border-b border-gray-400 px-4 flex items-center place-content-center gap-2">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => {
                setActiveButton(button.id);
                setSidebarOpen(true);
              }}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                activeButton === button.id
                  ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className="flex h-[calc(100%-3.5rem)]">
          <div
            className={`transition-all duration-300 ease-in-out border-r border-gray-400  
              ${isSidebarOpen ? 'w-64' : 'w-7'}`}
          >
            <div className="p-4">
              <div className="w-full h-full bg-gray-50 border-b border-gray-200 px-4 grid grid-cols-2 gap-4">
                {/* Sidebar content */}
               {activeButton === 5 && <Shapes canvas={canvas} />}
                {activeButton === 2 && <Brush />}
                {activeButton === 1 && <Pen canvas={canvas} />}
              </div>
            </div>
          </div>

          <div
            className="w-1 hover:bg-blue-200 cursor-col-resize relative group"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <div className="space-y-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 bg-white h-full overflow-hidden">
            <div className="h-full w-full flex justify-center items-center">
              <canvas
                ref={canvasRef}
                height={700}
                width={1000}
                className="max-w-full max-h-full border border-gray-200 "
              />
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out border-l border-gray-400 bg-gray-50 
              ${isSidebarOpen ? 'w-64' : 'w-7'}`}
          >
            <div className="p-4">
              <div className="space-y-4 bg-gray-300">
                {/* Sidebar content */}
              </div>
            </div>
          </div>
          <div
            className="w-1 hover:bg-blue-200 cursor-col-resize relative group"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <div className="absolute top-1/2 -translate-y-1/2 right-1/2 -translate-x-1/2">
              <div className="space-y-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
