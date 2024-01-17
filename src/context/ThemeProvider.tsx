import { ReactNode, createContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type Theme = 'light' | 'dark' | 'system';

type ThemeContextState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialValue: ThemeContextState = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeContextState>(initialValue);

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'Theme',
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('dark', 'light');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
