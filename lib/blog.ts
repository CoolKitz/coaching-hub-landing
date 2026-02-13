import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  readingTime: string
  image?: string
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const filePath = path.join(BLOG_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || 'Coaching Hub',
      category: data.category || 'Guide',
      readingTime: data.readingTime || `${Math.ceil(content.split(/\s+/).length / 200)} min`,
      image: data.image || undefined,
      content,
    }
  })
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'Coaching Hub',
    category: data.category || 'Guide',
    readingTime: data.readingTime || `${Math.ceil(content.split(/\s+/).length / 200)} min`,
    image: data.image || undefined,
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
}
