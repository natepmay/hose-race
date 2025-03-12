// adapted from: https://blog.logrocket.com/dark-mode-react-in-depth-guide/#selecting-dark-theme-colors
// use-persisted-state seems to be abandonware though so replaced with useEffect. Won't persist across refresh.

import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useColorScheme() {
  const [isDark, setIsDark] = useState();

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined
  );

  const value = useMemo(
    () => (isDark === undefined ? !!systemPrefersDark : isDark),
    [isDark, systemPrefersDark]
  );

  useEffect(() => {
    if (value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [value]);

  return {
    isDark: value,
    setIsDark,
  };
}
