import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { ProfilePage } from '../pages/profile';
import { RegisterPage } from '../pages/register';
import { isAuthorized } from './auth';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (!isAuthorized()) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export const App = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
        path="/profile"
      />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
};
