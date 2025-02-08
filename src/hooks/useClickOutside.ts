import { useEffect, useRef } from "react";

export const useClickOutside = (close: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickFunction(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener(
      "click",
      handleClickFunction as EventListener,
      true
    );

    return () => {
      document.removeEventListener("click", handleClickFunction);
    };
  }, [close]);

  return ref;
};
