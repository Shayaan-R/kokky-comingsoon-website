'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const newIsDarkMode = body.classList.contains('dark-mode');
    setIsDarkMode(newIsDarkMode);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button 
        id="themeToggle" 
        className="theme-btn" 
        aria-label="Switch Theme"
      >
        <span className="icon">Dark Mode</span> 
      </button>
    );
  }

  return (
    <button 
      id="themeToggle" 
      className="theme-btn" 
      onClick={toggleTheme}
      aria-label="Switch Theme"
    >
      <span className="icon">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </span> 
    </button>
  );
}
