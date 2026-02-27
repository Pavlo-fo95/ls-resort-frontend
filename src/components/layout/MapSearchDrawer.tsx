import { useEffect, useMemo, useState } from "react";

type Props = { open: boolean; onClose: () => void };

type Place = { display_name: string; lat: string; lon: string };

export default function MapSearchDrawer({ open, onClose }: Props) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const src = useMemo(() => {
    // если не выбрано — показываем Днепр
    const lat = selected ? Number(selected.lat) : 48.4647;
    const lon = selected ? Number(selected.lon) : 35.0462;
    const bbox = `${lon - 0.06}%2C${lat - 0.03}%2C${lon + 0.06}%2C${lat + 0.03}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  }, [selected]);

  async function search() {
    const query = q.trim();
    if (!query) return;
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=6&q=${encodeURIComponent(query)}`;
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    const data = (await r.json()) as Place[];
    setResults(data);
    if (data[0]) setSelected(data[0]);
  }

  if (!open) return null;

  return (
    <>
      <div className={`startOverlay ${open ? "isOpen" : ""}`} onClick={onClose} />
      <aside className={`startDrawer ${open ? "isOpen" : ""}`} role="dialog" aria-modal="true" aria-label="Адреса на мапі">
        <button className="startClose" onClick={onClose} aria-label="Закрити">✕</button>

        <h3 className="startTitle">Пошук адреси</h3>

        <div className="mapRow">
          <input
            className="mapInput"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Місто, вулиця, адреса…"
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <button className="mapBtn" onClick={search}>Знайти</button>
        </div>

        {results.length > 0 && (
          <div className="mapResults">
            {results.map((p, i) => (
              <button
                key={i}
                className="mapResultItem"
                onClick={() => setSelected(p)}
                title={p.display_name}
              >
                {p.display_name}
              </button>
            ))}
          </div>
        )}

        <div className="mapBox">
          <iframe title="map" src={src} className="mapFrame" />
        </div>

        {selected && (
          <a
            className="mapOpen"
            href={`https://www.openstreetmap.org/?mlat=${selected.lat}&mlon=${selected.lon}#map=16/${selected.lat}/${selected.lon}`}
            target="_blank"
            rel="noreferrer"
          >
            Відкрити на мапі ↗
          </a>
        )}
      </aside>
    </>
  );
}