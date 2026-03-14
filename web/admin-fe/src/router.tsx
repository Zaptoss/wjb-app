import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlowListPage from './pages/FlowListPage';
import FlowEditorPage from './pages/FlowEditorPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/flows',
    element: <FlowListPage />,
  },
  {
    path: '/flows/:id',
    element: <FlowEditorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
