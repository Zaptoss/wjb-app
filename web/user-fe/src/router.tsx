import { createBrowserRouter } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <QuizPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
