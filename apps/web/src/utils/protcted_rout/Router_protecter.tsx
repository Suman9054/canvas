import { Navigate} from "react-router"
import axios from "axios"
import { ReactNode } from "react"

const protected_rout =({children}: {children: ReactNode})=>{
try {
    axios.get("http://localhost:3000/api/v1/login-signup/auth").then((res)=>{
        if(res.status == 200){
            return children;
        }else{
            return <Navigate to ="/v1/auth/login"/>;
        }
    })
}catch(error){
    console.log(error);
    return <Navigate to ="/v1/auth/login"/>;
}

}

export default protected_rout