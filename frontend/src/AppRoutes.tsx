import { useState } from 'react'
import './css/App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Testing from './pages/testing'
import Layout from "./Layout";

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="testing" element={<Testing />} />
        </Route>
      </Routes>
  
    </>
  )
}

export default App
