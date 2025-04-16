'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  name: z.string().min(3, 'Nama harus minimal 3 karakter'),
  username: z.string().min(3, 'Username harus minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password harus minimal 6 karakter'),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Password tidak cocok",
  path: ["password_confirmation"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registrasi gagal');
      }

      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrasi gagal');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-8 pt-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Register</h2>
            <p className="text-sm text-gray-600 mb-6">
              Buat akun baru untuk mengakses FinLedger
            </p>
          </div>
        </div>

        <div className="px-8 pb-8">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50">
              {error}
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                {...form.register('name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                disabled={isLoading}
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...form.register('username')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                disabled={isLoading}
              />
              {form.formState.errors.username && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...form.register('email')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                disabled={isLoading}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...form.register('password')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                disabled={isLoading}
              />
              {form.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Password
              </label>
              <input
                id="password_confirmation"
                type="password"
                {...form.register('password_confirmation')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                disabled={isLoading}
              />
              {form.formState.errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.password_confirmation.message}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isLoading ? 'Loading...' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah memiliki akun?{' '}
              <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}