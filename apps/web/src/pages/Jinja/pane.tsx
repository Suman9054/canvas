import { Canvas, } from "fabric";


import React, { useEffect, ChangeEvent } from "react";



export interface IAppProps {
    canvas: Canvas | null; 
}



export const Pen: React.FC<IAppProps> = ({ canvas }: IAppProps) => {
  
  useEffect(()=>{
    if(!canvas)return;
    
    if(canvas.freeDrawingBrush){
      canvas.freeDrawingBrush.width=1;
      canvas.freeDrawingBrush.color='rgb(2,6,23)'
    }
    
    
    
  },[])
  const onchange=(e: ChangeEvent<HTMLInputElement>)=>{
      if(!canvas?.freeDrawingBrush) return;
      console.log(e.target.value);
      canvas.freeDrawingBrush.width = parseFloat(e.target.value);
  } 
 

  return (
    
<div className="flex items-center justify-center">
  <input type="number" className="w-full h-full border-none outline-none" onChange={onchange} defaultValue={1} min={1} max={10} />
</div>
    
    

     

   
  );
}

