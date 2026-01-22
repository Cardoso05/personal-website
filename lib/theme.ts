"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const THEME_KEY = "site-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Inicializar tema do localStorage (padrão: light)
  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Tema padrão é light
      setTheme("light");
      applyTheme("light");
    }
  }, []);

  // Aplicar tema no documento
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Alternar tema
  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme: Theme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, newTheme);
      applyTheme(newTheme);
      return newTheme;
    });
  };

  // Definir tema específico
  const setSpecificTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
    mounted,
  };
}
