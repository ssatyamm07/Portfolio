import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to #id when route or hash changes (e.g. /#/journey from another page).
 */
export default function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    if (!id) return;

    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const timer = window.setTimeout(scroll, pathname === "/" ? 80 : 120);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
