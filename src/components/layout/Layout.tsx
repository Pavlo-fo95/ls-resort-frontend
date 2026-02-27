import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

import StartFab from "../start/StartFab";
import StartPanel from "../start/StartPanel";
import "../../styles/start.css";

export default function Layout() {
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStartOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="appShell">
      <SiteHeader brandText="" onStart={() => setStartOpen(true)} />

      <main className="appContent">
        <Outlet />
      </main>

      {/* Кнопка справа у края */}
      <StartFab open={startOpen} onToggle={() => setStartOpen(v => !v)} />
      <StartPanel open={startOpen} onClose={() => setStartOpen(false)} />

      <SiteFooter />
    </div>
  );
}