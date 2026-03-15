import { createBrowserRouter } from 'react-router-dom';
import { PublicOnlyRoute, RequireAuth } from '@/features/auth';
import HomePage from './pages/HomePage';
import FlowListPage from './pages/FlowListPage';
import FlowEditorPage from './pages/FlowEditorPage';
import OffersPage from './pages/OffersPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: '/flows',
    element: (
      <RequireAuth>
        <FlowListPage />
      </RequireAuth>
    ),
  },
  {
    path: '/flows/:id',
    element: (
      <RequireAuth>
        <FlowEditorPage />
      </RequireAuth>
    ),
  },
  {
    path: '/offers',
    element: (
      <RequireAuth>
        <OffersPage />
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
