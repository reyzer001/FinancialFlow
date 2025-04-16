'use client';

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/hooks/use-language';
import { CurrencyProvider } from '@/hooks/use-currency';
import { ReactQueryProvider } from '@/lib/providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinLedger - Accounting System',
  description: 'Modern accounting web application with sales, purchases, inventory, and financial reporting functionality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <CurrencyProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </CurrencyProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}