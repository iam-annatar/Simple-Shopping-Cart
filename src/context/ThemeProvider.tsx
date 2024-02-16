import type { ReactNode } from "react";
import { createContext, useEffect, useMemo, useState } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

type Theme = "dark" | "light" | "system";

interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialValue: ThemeContextState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeContextState>(initialValue);

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "Theme",
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("dark", "light");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(() => {
    return {
      theme,
      setTheme: (t: Theme) => {
        localStorage.setItem(storageKey, theme);
        setTheme(t);
      },
    };
  }, [theme, storageKey]);

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
