'use client';

import fs from 'fs'
import path from 'path'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Navigation component to avoid SSR issues
const Navigation = dynamic(() => import('../components/Navigation'), { ssr: false })

export default function Home() {
  const [htmlContent, setHtmlContent] = useState<string>('')

  useEffect(() => {
    // Fetch the HTML file on the client side
    fetch('/api/docs')
      .then(response => response.text())
      .then(content => {
        setHtmlContent(content)
      })
      .catch(error => console.error('Error loading documentation:', error))
  }, [])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Navigation sidebar */}
      <Navigation />
      
      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        <div 
          className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>
    </div>
  )
} 