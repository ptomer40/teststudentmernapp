import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import './App.css'
import Registration from './component/Registration';
import StudentDashboard from './component/StudentDashboard';
import TeacherDashboard from './component/TeacherDashboard';
import StudentAdmin from './component/StudentAdmin';  // Admin dashboard
import ProtectedRoute from './component/ProtectedRoute';  // Protecting routes based on roles

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/studentdashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <StudentAdmin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/teacherdashboard"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
