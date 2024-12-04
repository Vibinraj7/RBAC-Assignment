import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './Pages/Dashboard';
import AdminDashboard from './Pages/AdminDashboard'
import { useAuth } from './contexts/AuthContext';



const App = () => {
  const { isAuthenticated ,isAdmin} = useAuth();
  // !isAuthenticated ? <Login /> : <Navigate to='/dashboard'/>
  return (
    <>
      <Router>
        <Routes> 
          <Route path='/' element={ !isAuthenticated ? <Register /> : <Navigate to='/dashboard' />} />
          <Route path='/login' element={isAdmin ? <Navigate to='/admin-dashboard' /> : isAuthenticated ? <Navigate to='/dashboard'/> : <Login/> } />
          <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/admin-dashboard' element={isAdmin ? <AdminDashboard/> : <Navigate to='/login'/> }/>
        </Routes>
      </Router>
    </>
  )
}

export default App
