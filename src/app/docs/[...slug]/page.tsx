// src/app/docs/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import { docs } from '../../../../.velite'

interface PageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  return docs.map((doc) => ({
    slug: doc.slug.split('/'),
  }))
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params
  const currentSlug = resolvedParams.slug.join('/')
  
  const doc = docs.find((d) => d.slug === currentSlug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="py-4 xl:py-8 max-w-3xl mx-auto">
      <article className="markdown-content">
        <h1>{doc.title}</h1>
        {doc.description && (
          <p className="text-zinc-400 text-base md:text-lg mb-8 font-light leading-relaxed">
            {doc.description}
          </p>
        )}
        <div className="h-[1px] bg-zinc-900 my-6" />
        <div 
          className="space-y-4"
          dangerouslySetInnerHTML={{ __html: doc.content }} 
        />
      </article>
    </div>
  )
}