import { Canvas, CircleBrush, PencilBrush, } from 'fabric';
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
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeButton, setActiveButton] = useState<number>(1);
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

if (activeButton===1){
  canvas.freeDrawingBrush = new PencilBrush(canvas);
  canvas.isDrawingMode= true;

} else if (activeButton===2){
  canvas.freeDrawingBrush = new PencilBrush(canvas);
 
}else if(activeButton===3){
  canvas.freeDrawingBrush = new PencilBrush(canvas);
 }else{
  canvas.isDrawingMode= false ;
 }

},[activeButton,canvas])
useEffect(()=>{
  if (!canvas) return;
  canvas.on('object:added', function(e) {
    
    if (canvas._activeObject) {
        canvas._activeObject.setControlVisible('all', true);
      }
  });
},[canvas])

  
  return (
    <div className="h-screen w-full bg-gray-200 p-4">
      <div className="rounded-lg bg-white shadow-lg h-full overflow-hidden">
        <div className="w-full h-14 bg-gray-50 border-b border-gray-400 px-4 flex items-center place-content-center gap-2">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => {
                setActiveButton(button.id);
                
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
              <div className="w-full h-full bg-gray-50 border-b border-gray-200 px-4 ">
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
          
          
        </div>
      </div>
    </div>
  );
};

export default Layout;
