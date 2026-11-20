'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push(from);
        router.refresh();
      } else {
        setError('Incorrect password');
        setPassword('');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="md-card p-8">
          <h1 className="font-secondary text-headline-medium text-on-surface mb-6 text-center">
            Password Protected
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-label-large text-on-surface mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="md-field"
                placeholder="Enter password"
                required
                autoFocus
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-body-small text-error" role="alert">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="md-filled-button md-state w-full"
            >
              {isLoading ? 'Verifying...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="md-card p-8">
            <h1 className="font-secondary text-headline-medium text-on-surface mb-6 text-center">
              Portfolio Access
            </h1>
            <div className="text-center text-body-large text-on-surface-variant">Loading...</div>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
