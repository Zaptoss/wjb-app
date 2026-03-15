import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getPostLoginRedirect, useAuthStore } from '../store/authStore';

interface Props {
  children: ReactNode;
}

export function RequireAuth({ children }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <>{children}</>;
}

export function PublicOnlyRoute({ children }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={getPostLoginRedirect(location.search)} replace />;
  }

  return <>{children}</>;
}
