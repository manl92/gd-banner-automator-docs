import fs from 'fs'
import path from 'path'

export default function Home() {
  // Read the HTML content
  const htmlContent = fs.readFileSync(path.join(process.cwd(), 'gd-banner-automator-docs.html'), 'utf-8')
  
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div 
        className="prose prose-lg max-w-4xl mx-auto"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </main>
  )
} 