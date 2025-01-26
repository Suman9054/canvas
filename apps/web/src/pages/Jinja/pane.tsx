import { Canvas } from "fabric";
import React, { useEffect, useState } from "react";


export interface IAppProps {
    canvas: Canvas | null; 
}

export const Pen: React.FC<IAppProps> = ({ canvas }: IAppProps) => {
  const [value,setvalue] = useState<number>(10);
  useEffect(()=>{
    if(!canvas)return;
    canvas.isDrawingMode = true;
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = value;
    }
  },[])

  return (
    <div>
      <input>hii
      </input>
    </div>
  );
}

