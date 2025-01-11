import './App.css'

import { Routes, Route } from "react-router";

// import { useEffect } from 'react'
// import supabase from './lib/supabase'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';

function Page() {
  return (
    <Routes>
  <Route index element={<Home />} />
   <Route path="dashboard" element={<Dashboard />} />
{/*
  <Route element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
*/}
  <Route path="auth">
    <Route index element={<Auth />} />
    {/* <Route path="login" element={<Login />} />
    <Route path="signup" element={<SignUp />} /> */}
  </Route>
</Routes>

  )
}
export default Page
