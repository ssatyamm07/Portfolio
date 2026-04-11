import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top when the pathname changes (SPA route changes).
 * Hash-only updates on the same path are left to HashScroll.
 */
export default function RestoreScrollOnRoute() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
