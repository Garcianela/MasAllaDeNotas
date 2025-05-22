import { Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));

export default function App() {
  return (
    <Suspense fallback={<div className='text-white text-center pt-5'>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}