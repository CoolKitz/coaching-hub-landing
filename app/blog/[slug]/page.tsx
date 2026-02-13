import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/blog'
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  
  return {
    title: `${post.title} - Coaching Hub Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://coachinghub.it/blog/${slug}`,
      siteName: 'Coaching Hub',
      locale: 'it_IT',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

// Simple markdown to HTML (no external deps needed)
function markdownToHtml(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold & Italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#bef264] hover:underline">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="border-white/10 my-8" />')
    // Line breaks to paragraphs
    .split('\n\n')
    .map(block => {
      block = block.trim()
      if (!block) return ''
      if (block.startsWith('<h') || block.startsWith('<hr') || block.startsWith('<li>')) {
        // Wrap consecutive <li> in <ul>
        if (block.includes('<li>')) {
          return `<ul class="space-y-2 my-4">${block}</ul>`
        }
        return block
      }
      return `<p>${block.replace(/\n/g, '<br />')}</p>`
    })
    .join('\n')
  
  return html
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 2)
  
  const htmlContent = markdownToHtml(post.content)
  
  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Coaching Hub',
      url: 'https://coachinghub.it',
    },
  }
  
  return (
    <div className="min-h-screen bg-[#080c1c] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#080c1c]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-white/60 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Torna al blog</span>
          </Link>
          <Link href="/#prezzi" className="px-4 py-2 bg-[#bef264] text-[#0f172a] rounded-lg text-sm font-semibold hover:bg-[#a3e635] transition">
            Prova gratis 14 giorni
          </Link>
        </div>
      </nav>
      
      {/* Article */}
      <article className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#bef264] bg-[#bef264]/10 px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
            <time className="text-xs text-white/30">
              {new Date(post.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            {post.title}
          </h1>
          
          {/* Content */}
          <div 
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </div>
      </article>
      
      {/* CTA inline */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#bef264]/10 to-[#22d3ee]/5 border border-[#bef264]/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Vuoi gestire tutto questo in automatico?
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Coaching Hub automatizza la gestione clienti, piani e comunicazioni. Provalo gratis per 14 giorni.
          </p>
          <Link href="/#prezzi" className="inline-block px-6 py-3 bg-[#bef264] text-[#0f172a] rounded-xl font-semibold hover:bg-[#a3e635] transition">
            Inizia la prova gratuita
          </Link>
        </div>
      </section>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-bold mb-6 text-white/60">Potrebbe interessarti anche</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map(related => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.06] hover:border-white/10 transition-all">
                    <span className="text-xs text-[#bef264] font-medium">{related.category}</span>
                    <h4 className="font-bold mt-2 mb-2 group-hover:text-[#bef264] transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {related.title}
                    </h4>
                    <p className="text-white/40 text-sm line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Coaching Hub — Mauro Vallotti</p>
          <div className="flex gap-6">
            <Link href="/" className="text-white/30 hover:text-white/60 text-sm transition">Home</Link>
            <Link href="/blog" className="text-white/30 hover:text-white/60 text-sm transition">Blog</Link>
            <Link href="/#contatti" className="text-white/30 hover:text-white/60 text-sm transition">Contatti</Link>
          </div>
        </div>
      </footer>
      
      {/* Styles for article content */}
      <style jsx global>{`
        .prose-custom {
          color: rgba(255,255,255,0.7);
          font-size: 1.05rem;
          line-height: 1.8;
        }
        .prose-custom h2 {
          color: white;
          font-size: 1.6rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-family: var(--font-space-grotesk);
        }
        .prose-custom h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-family: var(--font-space-grotesk);
        }
        .prose-custom p {
          margin-bottom: 1.25rem;
        }
        .prose-custom strong {
          color: rgba(255,255,255,0.9);
        }
        .prose-custom ul {
          list-style: none;
          padding: 0;
        }
        .prose-custom li {
          padding-left: 1.5rem;
          position: relative;
          margin-bottom: 0.5rem;
        }
        .prose-custom li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #bef264;
        }
        .prose-custom hr {
          border-color: rgba(255,255,255,0.1);
          margin: 2rem 0;
        }
        .prose-custom a {
          color: #bef264;
        }
        .prose-custom a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
