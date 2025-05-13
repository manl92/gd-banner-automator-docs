import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Figma Plugin Documentation',
  description: 'Modern documentation for the Figma plugin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold text-gray-900">Figma Plugin Docs</div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
                <li><a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">Figma</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">GitHub</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        {children}
        
        <footer className="bg-gray-800 text-white py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-sm text-gray-400 mt-4">
              © {new Date().getFullYear()} Figma Plugin Documentation
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 