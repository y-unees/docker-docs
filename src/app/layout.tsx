// src/app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DevDocs Platform',
  description: 'Professional documentation site built with Next.js & Velite',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50 min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex flex-1 max-w-8xl w-full mx-auto">
          <Sidebar />
          <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}