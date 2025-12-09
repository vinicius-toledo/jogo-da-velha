import { themes, ThemeType } from "@/theme";
import { createContext, ReactNode, useState } from "react";

type ThemeContextType = {
  theme: ThemeType;
  colors: typeof themes.light;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: themes.light,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("light");

  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: themes[theme],
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
