import React, { useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center h-10 w-10 hover:animate-bounce"
    >
      {theme === "dark" ? "🌜" : "🌞"}
    </button>
  );
}