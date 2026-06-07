// src/components/Sidebar.tsx
import Link from 'next/link'
import { docs } from '../../.velite'

export default function Sidebar() {
  const sortedDocs = [...docs].sort((a, b) => a.order - b.order)

  return (
    <aside className="w-68 border-r border-zinc-900/80 bg-zinc-950 p-6 hidden md:block h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto no-scrollbar">
      <div className="space-y-6">
        <div>
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
            Getting Started
          </h4>
          <ul className="space-y-1.5 border-l border-zinc-900">
            {sortedDocs.map((doc) => (
              <li key={doc.permalink} className="relative">
                <Link
                  href={doc.permalink}
                  className="block text-[13.5px] pl-4 py-1 text-zinc-400 hover:text-white transition-colors duration-200 font-medium leading-5"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}