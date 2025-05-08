import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import ProfessorLogin from './components/ProfessorLogin';
import AdminPage from './components/AdminPage';
import ProfessorPage from './components/ProfessorPage';
import SoftwareList from './components/SoftwareList';
import SoftwareForm from './components/SoftwareForm';
import SolicitacaoForm from './components/SolicitacaoForm';
import MinhasSolicitacoes from './components/MinhasSolicitacoes';
import RelatoProblemaForm from './components/RelatoProblemaForm';
import ProfessorList from './components/ProfessorList';
import RemoveSoftwareFromLab from './components/RemoveSoftwareFromLab';
import HomePage from './components/HomePage';
import TwoFactorAuthPage from './components/TwoFactorAuthPage';
import ProtectedRoute from './api/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/professor" element={<ProfessorLogin />} />
        <Route path="/2fa" element={<TwoFactorAuthPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role={['ADMIN']}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professor"
          element={
            <ProtectedRoute role={['PROFESSOR']}>
              <ProfessorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/softwares"
          element={
            <ProtectedRoute role={['ADMIN', 'PROFESSOR']}>
              <SoftwareList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/softwares/novo"
          element={
            <ProtectedRoute role={['ADMIN']}>
              <SoftwareForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/softwares/editar/:id"
          element={
            <ProtectedRoute role={['ADMIN']}>
              <SoftwareForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/solicitacoes/novo"
          element={
            <ProtectedRoute role={['PROFESSOR']}>
              <SolicitacaoForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/solicitacoes/minhas"
          element={
            <ProtectedRoute role={['ADMIN', 'PROFESSOR']}>
              <MinhasSolicitacoes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatos/novo"
          element={
            <ProtectedRoute role={['PROFESSOR']}>
              <RelatoProblemaForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/professores"
          element={
            <ProtectedRoute role={['ADMIN']}>
              <ProfessorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/softwares/remover-do-lab"
          element={
            <ProtectedRoute role={['PROFESSOR']}>
              <RemoveSoftwareFromLab />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;