import { themes, ThemeType } from "@/theme";
import { createContext, ReactNode, useState } from "react";

type ThemeContextType = {
  theme: ThemeType;
  colors: {
    background: string;
    text: string;
  };
  images: {
    background: any;
  };
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("light");

  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: themes[theme].colors,
        images: themes[theme].images,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
