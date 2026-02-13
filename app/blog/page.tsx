import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - Coaching Hub | Guide e risorse per Personal Trainer',
  description: 'Articoli, guide e consigli pratici per personal trainer e coach online. Gestione clienti, piani alimentari, schede allenamento e business del fitness.',
  openGraph: {
    title: 'Blog - Coaching Hub',
    description: 'Guide e risorse per Personal Trainer e Coach Online',
    url: 'https://coachinghub.it/blog',
    siteName: 'Coaching Hub',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  
  return (
    <div className="min-h-screen bg-[#080c1c] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#080c1c]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80 transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bold text-lg">Coaching Hub</span>
          </Link>
          <Link href="/#prezzi" className="px-4 py-2 bg-[#bef264] text-[#0f172a] rounded-lg text-sm font-semibold hover:bg-[#a3e635] transition">
            Prova gratis 14 giorni
          </Link>
        </div>
      </nav>
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#bef264]/10 text-[#bef264] text-sm font-medium mb-6">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Guide e risorse per{' '}
            <span className="bg-gradient-to-r from-[#bef264] to-[#22d3ee] bg-clip-text text-transparent">
              Personal Trainer
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Consigli pratici per gestire i tuoi clienti, far crescere il tuo business e lavorare in modo più efficiente.
          </p>
        </div>
      </section>
      
      {/* Posts Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-white/40 py-20">Articoli in arrivo...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="h-full bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300">
                    {/* Category & Reading Time */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-[#bef264] bg-[#bef264]/10 px-2.5 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[#bef264] transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {post.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                      {post.description}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <time className="text-xs text-white/30">
                        {new Date(post.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </time>
                      <span className="flex items-center gap-1 text-sm text-[#bef264] font-medium group-hover:gap-2 transition-all">
                        Leggi <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] rounded-3xl p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Pronto a semplificare il tuo lavoro?
          </h2>
          <p className="text-white/50 mb-8">
            Prova Coaching Hub gratis per 14 giorni. Nessun pagamento richiesto.
          </p>
          <Link href="/#prezzi" className="inline-block px-8 py-3 bg-[#bef264] text-[#0f172a] rounded-xl font-semibold hover:bg-[#a3e635] transition">
            Inizia la prova gratuita
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Coaching Hub — Mauro Vallotti</p>
          <div className="flex gap-6">
            <Link href="/" className="text-white/30 hover:text-white/60 text-sm transition">Home</Link>
            <Link href="/blog" className="text-white/30 hover:text-white/60 text-sm transition">Blog</Link>
            <Link href="/#contatti" className="text-white/30 hover:text-white/60 text-sm transition">Contatti</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
