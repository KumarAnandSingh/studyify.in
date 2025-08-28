import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('auto');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    };
    
    mediaQuery.addListener(handleSystemThemeChange);
    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [theme]);

  const applyTheme = (newTheme) => {
    let actualTheme = newTheme;
    
    if (newTheme === 'auto') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      actualTheme = systemPrefersDark ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', actualTheme);
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) return null;

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.5 10c-.25-.54-.54-1.05-.86-1.53L18.5 9.5c-.56-.43-1.18-.78-1.86-1.03L16.5 6.5c-.65-.14-1.32-.2-2-.2c-.68 0-1.35.06-2 .2L12.36 8.47c-.68.25-1.3.6-1.86 1.03L8.5 8.47c-.32.48-.61.99-.86 1.53L9.07 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97L7.64 14c.25.54.54 1.05.86 1.53L10.64 14.5c.56.43 1.18.78 1.86 1.03L12.64 17.5c.65.14 1.32.2 2 .2c.68 0 1.35-.06 2-.2L16.36 15.53c.68-.25 1.3-.6 1.86-1.03L20.36 15.5c.32-.48.61-.99.86-1.53L19.43 13z"/>
          </svg>
        );
      case 'dark':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.75 4.09L15.22 6.03L16.13 9.09L13.5 7.28L10.87 9.09L11.78 6.03L9.25 4.09L12.44 4L13.5 1L14.56 4L17.75 4.09M21.25 11L19.61 12.25L20.2 14.23L18.5 13.06L16.8 14.23L17.39 12.25L15.75 11L17.81 10.95L18.5 9L19.19 10.95L21.25 11M18.97 15.95C19.8 15.87 20.69 17.05 20.16 17.8C19.84 18.25 19.5 18.67 19.08 19.07C15.17 23 8.84 23 4.94 19.07C1.03 15.17 1.03 8.83 4.94 4.93C5.34 4.53 5.76 4.17 6.21 3.85C6.96 3.32 8.14 4.21 8.06 5.04C7.79 7.9 8.75 10.87 10.95 13.06C13.14 15.26 16.1 16.22 18.97 15.95Z"/>
          </svg>
        );
      case 'auto':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12A8 8 0 0 1 12 20V4Z"/>
          </svg>
        );
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={`Current theme: ${theme}. Click to cycle themes.`}
      title={`Theme: ${theme} (click to change)`}
    >
      {getThemeIcon()}
    </button>
  );
}