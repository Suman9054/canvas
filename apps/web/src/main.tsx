import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './pages/landing/Landing'
import FileManager from './Layout/Home-Layout'
import { BrowserRouter,Routes,Route } from 'react-router'
import LoginForm from './pages/Auth/Login'
import SingupForm from './pages/Auth/Sing-up'
import Auth from './Layout/Auth-Layout'
import HomeIndex from './pages/Home/Home-Index'


createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
     <Route element={<FileManager />}>
        <Route path="/home" element={<HomeIndex />} />
      </Route>
     
      
      <Route path="*" element={<h1>Not Found</h1>} />
      <Route   element={<Auth />}>
       <Route path="/v1/auth/login" element={<LoginForm />} />
       <Route path="/v1/auth/register" element={<SingupForm />} />
      </Route>
    </Routes>
    </BrowserRouter>
   
  </StrictMode>,
)
