import { useEffect, useMemo, useState } from "react";

type Place = { display_name: string; lat: string; lon: string };

type Props = {
  defaultQuery?: string;
  lang?: "uk" | "ru" | "en";
};

const STUDIO_ADDRESS_UK =
  "вул. Ніла Армстронга, 2D, Дніпро, Україна";

const STUDIO_QUERY_UK =
  "вул. Ніла Армстронга, 2D, Дніпро, Україна";

// Автоподстановка по языку (можно подточить формулировки)
function getDefaultCityByLang(lang: Props["lang"]) {
  if (lang === "ru") return "Днепр";
  if (lang === "en") return "Dnipro";
  return "Дніпро";
}

export default function StartMapModalContent({ defaultQuery, lang = "uk" }: Props) {
  const [q, setQ] = useState(defaultQuery ?? getDefaultCityByLang(lang));
  const [results, setResults] = useState<Place[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
  void search(STUDIO_QUERY_UK);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // если меняют язык — мягко обновим дефолтный город, но НЕ перетираем ручной ввод
  useEffect(() => {
    if (defaultQuery) return; // если руками передали — не авто-меняем
    setQ((prev) => (prev?.trim() ? prev : getDefaultCityByLang(lang)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  async function search(queryOverride?: string) {
    const query = (queryOverride ?? q).trim();
    if (!query) return;

    setLoading(true);
    setErr(null);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=6&q=${encodeURIComponent(query)}`;
      const r = await fetch(url, { headers: { Accept: "application/json" } });
      const data = (await r.json()) as Place[];

      setResults(data);
      setSelected(data[0] ?? null);

      if (!data.length) setErr("Нічого не знайдено. Спробуй уточнити запит.");
    } catch {
      setErr("Помилка пошуку. Перевір інтернет і спробуй ще раз.");
    } finally {
      setLoading(false);
    }
  }

  function showStudio() {
    // одним кликом ставим маркер: делаем поиск по более “машиночитаемому” запросу
    void search(STUDIO_QUERY_UK);
  }

  function openRoute() {
    const dest = selected
      ? `${selected.lat},${selected.lon}`
      : STUDIO_ADDRESS_UK; // если еще ничего не выбрано — маршрут к студии

    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}&travelmode=driving`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const src = useMemo(() => {
    const lat = selected ? Number(selected.lat) : 48.4647;
    const lon = selected ? Number(selected.lon) : 35.0462;
    const bbox = `${lon - 0.06}%2C${lat - 0.03}%2C${lon + 0.06}%2C${lat + 0.03}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  }, [selected]);

  const openLink = useMemo(() => {
    const lat = selected?.lat ?? "48.4647";
    const lon = selected?.lon ?? "35.0462";
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`;
  }, [selected]);

  return (
    <div className="startMap">
      <div className="startMap__row">
        <input
          className="startMap__input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Місто / вулиця / адреса…"
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button className="startMap__btn" type="button" onClick={() => search()} disabled={loading}>
          {loading ? "..." : "Знайти"}
        </button>
      </div>

      {err && <div className="startMap__note startMap__note--err">{err}</div>}

      {results.length > 0 && (
        <div className="startMap__results">
          {results.map((p, i) => (
            <button
              key={i}
              type="button"
              className={`startMap__result ${selected === p ? "isActive" : ""}`}
              onClick={() => setSelected(p)}
              title={p.display_name}
            >
              {p.display_name}
            </button>
          ))}
        </div>
      )}

      <div className="startMap__frameWrap">
        <iframe title="map" src={src} className="startMap__frame" />
      </div>

      {/* НИЗ: адрес + кнопки */}
      <div className="startMap__bottom">
        <div className="startMap__address">
          <div className="startMap__addressLabel">Адреса студії</div>
          <div className="startMap__addressText">{STUDIO_ADDRESS_UK}</div>
        </div>

        <div className="startMap__actions">
          <button className="startMap__btnGhost" type="button" onClick={showStudio}>
            Показати адресу студії
          </button>

          <button className="startMap__btn" type="button" onClick={openRoute}>
            Маршрут
          </button>

          <a className="startMap__link" href={openLink} target="_blank" rel="noreferrer">
            Відкрити на мапі ↗
          </a>
        </div>
      </div>
    </div>
  );
}