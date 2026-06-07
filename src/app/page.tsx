// src/app/page.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-center py-20">
      <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-4">
        Developer Documentation Engine
      </h1>
      <p className="text-zinc-400 text-lg max-w-2xl mb-8 leading-relaxed">
        Welcome! This layout is built with Next.js App Router and Velite data parsing. Clean, ultra-fast, and completely markdown-driven.
      </p>
      <Link
        href="/docs/getting-started"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-3 rounded-lg transition-all"
      >
        View Documentation <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}