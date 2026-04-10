/**
 * Contact form API URL resolution (dev proxy vs direct vs production).
 */

export const PRODUCTION_API = "https://portfolio-final-11s4.onrender.com";

/** Align with server default / Portfolio/.env PORT (avoid 5000 on macOS — AirPlay). */
export const DEFAULT_LOCAL_PORT = "5050";

export function isLocalHostName(hostname) {
  if (!hostname) return false;
  const h = String(hostname).toLowerCase();
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "[::1]" ||
    h === "::1"
  );
}

export function isWebpackDevServer() {
  try {
    return Boolean(typeof module !== "undefined" && module.hot);
  } catch {
    return false;
  }
}

export function getApiBase() {
  const forceProd =
    typeof process !== "undefined" &&
    process.env.REACT_APP_FORCE_PROD_API === "true";
  const noProxy =
    typeof process !== "undefined" && process.env.REACT_APP_NO_PROXY === "true";
  const useRegisterProxy = !noProxy && !forceProd && isWebpackDevServer();

  if (
    typeof window !== "undefined" &&
    !forceProd &&
    isLocalHostName(window.location.hostname) &&
    useRegisterProxy
  ) {
    return "";
  }

  if (
    typeof window !== "undefined" &&
    !forceProd &&
    isLocalHostName(window.location.hostname)
  ) {
    const port = (
      (typeof process !== "undefined" && process.env.REACT_APP_LOCAL_API_PORT) ||
      DEFAULT_LOCAL_PORT
    )
      .toString()
      .trim();
    const wh = window.location.hostname;
    const proto = window.location.protocol || "http:";
    const apiHost =
      wh === "[::1]" || wh === "::1" ? "127.0.0.1" : wh;
    return `${proto}//${apiHost}:${port || DEFAULT_LOCAL_PORT}`;
  }

  const explicit =
    typeof process !== "undefined" && process.env.REACT_APP_API_URL
      ? String(process.env.REACT_APP_API_URL).trim()
      : "";
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  if (forceProd) {
    return PRODUCTION_API;
  }

  if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
    return `http://127.0.0.1:${DEFAULT_LOCAL_PORT}`;
  }

  return PRODUCTION_API;
}

export function getRegisterUrl() {
  const base = getApiBase().replace(/\/$/, "");
  return base ? `${base}/register` : "/register";
}
