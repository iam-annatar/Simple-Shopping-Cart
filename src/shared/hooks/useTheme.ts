import { useContext } from "react";

import { ThemeProviderContext } from "@/shared/context/ThemeProvider";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a themeProvider");
  }

  return context;
};
