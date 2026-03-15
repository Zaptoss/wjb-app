import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/features/auth/api/authApi';
import { getPostLoginRedirect, saveAccessToken } from '@/features/auth';

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data as { detail?: string; title?: string } | undefined;
    return detail?.detail ?? detail?.title ?? 'Unable to sign in. Check your credentials and try again.';
  }

  return 'Unable to sign in. Check your credentials and try again.';
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveAccessToken(data.token);
      navigate(getPostLoginRedirect(location.search), { replace: true });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate({
      email: email.trim(),
      password,
    });
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-12"
      style={{
        background:
          'radial-gradient(circle at top, rgba(15, 118, 110, 0.14), transparent 38%), linear-gradient(180deg, var(--bg-body), var(--bg-surface-secondary))',
      }}
    >
      <div
        className="w-full max-w-md rounded-[28px] border p-8 shadow-[0_28px_80px_rgba(15,23,42,0.12)]"
        style={{
          borderColor: 'var(--border-default)',
          backgroundColor: 'var(--bg-surface)',
        }}
      >
        <p
          className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}
        >
          Wellness Builder Admin
        </p>
        <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Sign in
        </h1>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
          Use your admin email and password to manage flows, offers, and graph content.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors"
              style={{
                borderColor: 'var(--border-default)',
                backgroundColor: 'var(--bg-surface-secondary)',
                color: 'var(--text-primary)',
              }}
              placeholder="admin@example.com"
              required
            />
          </label>

          <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors"
              style={{
                borderColor: 'var(--border-default)',
                backgroundColor: 'var(--bg-surface-secondary)',
                color: 'var(--text-primary)',
              }}
              placeholder="Enter your password"
              required
            />
          </label>

          {loginMutation.isError && (
            <div
              className="rounded-2xl border px-4 py-3 text-sm"
              style={{
                borderColor: 'rgba(220, 38, 38, 0.2)',
                backgroundColor: 'rgba(254, 226, 226, 0.9)',
                color: '#991B1B',
              }}
            >
              {getErrorMessage(loginMutation.error)}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}
