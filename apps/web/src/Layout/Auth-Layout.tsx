
import { Outlet } from 'react-router'
import img from "../assets/pexels-jplenio-1103970.jpg"

function Auth() {
  return (
    <div className="relative h-screen w-full">
     
      <img 
        src={img} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover  "/>
      
      
      <div className="absolute inset-0 flex justify-center items-center ">
        <Outlet />
      </div>
    </div>
  )
}

export default Auth
