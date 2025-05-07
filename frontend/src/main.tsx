import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './AppRoutes.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
)
