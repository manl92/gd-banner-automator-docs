import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

interface Section {
  id: string;
  title: string;
}

const Navigation: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Find all section headings in the document
    const headings = document.querySelectorAll('h1, h2');
    const extractedSections: Section[] = [];

    headings.forEach((heading) => {
      if (heading.id) {
        extractedSections.push({
          id: heading.id,
          title: heading.textContent || '',
        });
      } else {
        // Create an ID if none exists
        const id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || `section-${extractedSections.length}`;
        heading.id = id;
        extractedSections.push({
          id,
          title: heading.textContent || '',
        });
      }
    });

    setSections(extractedSections);

    // Set up intersection observer to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-0 h-screen overflow-y-auto p-6 w-64 bg-gray-50 hidden md:block">
      <div className="text-xl font-bold mb-4">Contents</div>
      <nav>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <ScrollLink
                to={section.id}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className={`block py-2 px-3 cursor-pointer hover:bg-gray-200 rounded ${
                  activeSection === section.id ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-700'
                }`}
              >
                {section.title}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation; 