import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { HashRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HashRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<ListEmployeeComponent />}></Route>
          <Route path='/employees' element={<ListEmployeeComponent />}></Route>
          <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
          <Route path='/update' element = {<EmployeeComponent/>}></Route>
        </Routes>
        <FooterComponent />
      </HashRouter>
    </>
  )
}

export default App
