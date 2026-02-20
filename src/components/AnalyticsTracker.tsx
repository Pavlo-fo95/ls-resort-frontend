import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// ----------------------
// local analytics (MVP)
// ----------------------
type PvMap = Record<string, number>;

function readPV(): PvMap {
  try {
    return JSON.parse(localStorage.getItem("pv") || "{}") as PvMap;
  } catch {
    return {};
  }
}

function writePV(map: PvMap) {
  localStorage.setItem("pv", JSON.stringify(map));
}

function incPV(routeName: string) {
  const pv = readPV();
  pv[routeName] = (pv[routeName] || 0) + 1;
  writePV(pv);
}

function prettyRoute(path: string) {
  if (path === "/") return "Home";
  if (path.startsWith("/blog")) return "Blog";
  if (path.startsWith("/schedule")) return "Schedule";
  if (path.startsWith("/massage")) return "Massage";
  if (path.startsWith("/training")) return "Training";
  if (path.startsWith("/herbs")) return "Herbs";
  if (path.startsWith("/reviews")) return "Reviews";
  if (path.startsWith("/about")) return "About";
  if (path.startsWith("/cart")) return "Cart";
  if (path.startsWith("/account")) return "Account";
  if (path.startsWith("/auth")) return "Auth";
  return "Other";
}

/**
 * Drop-in tracker:
 * - increments pv on every route change
 * - stores minimal session meta (optional)
 */
export default function AnalyticsTracker() {
  const location = useLocation();
  const lastKeyRef = useRef<string>("");

  useEffect(() => {
    const route = prettyRoute(location.pathname);

    // защита от двойного срабатывания в StrictMode (dev)
    // в React 18/19 эффекты могут дергаться дважды на маунте
    const key = `${location.key}:${route}`;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;

    incPV(route);

    // опционально: мини-мета о последнем заходе
    try {
      localStorage.setItem("pv_last_route", route);
      localStorage.setItem("pv_last_path", location.pathname);
      localStorage.setItem("pv_last_ts", String(Date.now()));

      // сессия: живёт пока вкладка открыта
      if (!sessionStorage.getItem("pv_session_start")) {
        sessionStorage.setItem("pv_session_start", String(Date.now()));
        sessionStorage.setItem("pv_ref", document.referrer || "");
      }
    } catch {
      // ignore
    }
  }, [location.key, location.pathname]);

  return null;
}