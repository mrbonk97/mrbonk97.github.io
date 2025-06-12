"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Loader, MoonIcon, SunIcon } from "lucide-react";

export const DarkModeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleClick = () => {
    if (theme == "dark") setTheme("light");
    else setTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <button type="button">
        <Loader className="animate-spin" />
      </button>
    );

  return (
    <button type="button" onClick={handleClick}>
      {theme == "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
