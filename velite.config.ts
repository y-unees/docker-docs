// velite.config.ts
import { defineConfig, defineCollection, s } from 'velite'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const docs = defineCollection({
  name: 'Doc',
  pattern: 'docs/**/*.mdx', 
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      slug: s.string().optional(), 
      order: s.number().default(0), 
      content: s.markdown(), 
    })
    .transform((data, { meta }) => {
      // Normalize slashes for Windows compatibility, then extract just the filename without extension
      const normalizedPath = meta.path.replace(/\\/g, '/')
      const filename = normalizedPath.split('/').pop()?.replace(/\.mdx$/, '') || ''
      
      const generatedSlug = data.slug || filename

      return {
        ...data,
        slug: generatedSlug,
        permalink: `/docs/${generatedSlug}`
      }
    })
})

export default defineConfig({
  root: 'content', 
  output: {
    data: '.velite',
    clean: true
  },
  collections: { docs },
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
})