import { Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Results = lazy(() => import('./components/Results'));

export default function App() {
  return (
    <Suspense fallback={<div className='text-white text-center pt-5'>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Suspense>
  );
}