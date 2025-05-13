import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'gd-banner-automator-docs.html');
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Apply some transformations to make the content work better with our styling
    // Add IDs to headings for scrollspy functionality
    content = content.replace(/<(h[1-6])>(.*?)<\/\1>/g, (match, tag, text) => {
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return `<${tag} id="${id}">${text}</${tag}>`;
    });

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error serving documentation file:', error);
    return new NextResponse('Error loading documentation', { status: 500 });
  }
} 