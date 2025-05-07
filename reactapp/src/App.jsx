import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registration from './component/Registration'
import Login from './component/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/Home'
import Dashboard from './component/Dashboard'
import StudentAdmin from './component/StudentAdmin'
import StudentDashboard from './component/StudentDashboard'
import TeacherDashboard from './component/TeacherDashboard'

function App() {


  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>} >
   <Route path='/login' element={<Login />} />
   <Route path='/register' element={<Registration />} />
  </Route>
  <Route path='/studentdashboard' element={<StudentDashboard />} />
  <Route path='/admindashboard' element={<StudentAdmin />} />
  <Route path='/teacherdashboard' element={<TeacherDashboard />} />
  
   </Routes>
   </BrowserRouter>
  )
}

export default App
