// src/components/Navbar.tsx
import Link from 'next/link'
import { Terminal, Milestone } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="bg-blue-600/10 p-1.5 rounded-md border border-blue-500/20">
          <Terminal className="h-4 w-4 text-blue-400" />
        </div>
        <Link href="/" className="font-bold text-white text-[15px] tracking-tight hover:opacity-90 flex items-center gap-1.5">
          DevDocs <span className="text-[10px] bg-zinc-900 text-zinc-400 font-mono px-1.5 py-0.5 rounded border border-zinc-800">v1.0</span>
        </Link>
      </div>
      <nav className="flex items-center gap-6 text-[13.5px] font-medium text-zinc-400">
        <Link href="/docs/getting-started" className="hover:text-white transition-colors">
          Docs
        </Link>
        
        {/* New DevOps Journey Link with Milestone Icon */}
        <Link href="/journey" className="hover:text-white transition-colors flex items-center gap-1.5">
          <Milestone className="h-3.5 w-3.5 text-zinc-500" />
          DevOps Journey
        </Link>

        <a 
          href="https://github.com/y-unees" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          {/* Inline SVG for GitHub brand icon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          GitHub
        </a>
      </nav>
    </header>
  )
}