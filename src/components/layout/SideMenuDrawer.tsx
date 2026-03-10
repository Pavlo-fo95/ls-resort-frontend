import { useState } from "react";
import { Link } from "react-router-dom";

type DrawerSection =
  | "massage"
  | "training"
  | "herbs"
  | "health"
  | "shop"
  | "blog";

type UserLike = {
  role?: string;
} | null;

type Props = {
  open: boolean;
  onClose: () => void;
  me: UserLike;
  onLogout: () => void;
  onOpenMap: () => void;
  onOpenSearch: () => void;
  onChangeLanguage: (lang: "uk" | "ru" | "en") => void | Promise<unknown>;
  viberUrl: string;
};

export default function SideMenuDrawer({
  open,
  onClose,
  me,
  onLogout,
  onOpenMap,
  onOpenSearch,
  onChangeLanguage,
  viberUrl,
}: Props) {
  const [openSection, setOpenSection] = useState<DrawerSection | null>(null);

  const toggleSection = (name: DrawerSection) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  if (!open) return null;

  return (
    <div className="sideMenuWrap" role="dialog" aria-modal="true">
      <div className="sideMenuWrap__backdrop" onClick={onClose} />

      <aside className="sideMenu">
        <div className="sideMenu__top">
          <button type="button" className="sideMenu__tab sideMenu__tab--active">
            Меню
          </button>

          <button
            type="button"
            className="sideMenu__tab"
            onClick={() => {
              onClose();
              window.location.href = me ? "/account" : "/auth";
            }}
          >
            Кабінет
          </button>

          <button
            type="button"
            className="sideMenu__close"
            onClick={onClose}
            aria-label="Закрити меню"
          >
            ×
          </button>
        </div>

        <div className="sideMenu__search">
          <button
            type="button"
            className="sideMenu__searchBtn"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
          >
            <span>Пошук</span>
            <span className="sideMenu__searchIcon">⌕</span>
          </button>
        </div>

        <div className="sideMenu__group">
          <button
            type="button"
            className={`sideMenu__section ${openSection === "massage" ? "is-open" : ""}`}
            onClick={() => toggleSection("massage")}
          >
            <span>Масаж</span>
          </button>

          <div className={`sideMenu__panel ${openSection === "massage" ? "is-open" : ""}`}>
            <div className="sideMenu__links">
              <Link to="/massage" onClick={onClose}>Види масажу</Link>
              <Link to="/massage" onClick={onClose}>Масаж обличчя</Link>
              <Link to="/massage" onClick={onClose}>Вісцеральний масаж</Link>
              <Link to="/massage" onClick={onClose}>Для жінок</Link>
              <Link to="/massage" onClick={onClose}>Для чоловіків</Link>
            </div>
          </div>
        </div>

        <div className="sideMenu__group">
          <button
            type="button"
            className={`sideMenu__section ${openSection === "training" ? "is-open" : ""}`}
            onClick={() => toggleSection("training")}
          >
            <span>Тренування</span>
          </button>

          <div className={`sideMenu__panel ${openSection === "training" ? "is-open" : ""}`}>
            <div className="sideMenu__links">
              <Link to="/training" onClick={onClose}>Індивідуальні заняття</Link>
              <Link to="/training" onClick={onClose}>Загальні заняття</Link>
              <Link to="/training" onClick={onClose}>Йогатерапія</Link>
              <Link to="/schedule" onClick={onClose}>Розклад</Link>
            </div>
          </div>
        </div>

        <div className="sideMenu__group">
          <button
            type="button"
            className={`sideMenu__section ${openSection === "herbs" ? "is-open" : ""}`}
            onClick={() => toggleSection("herbs")}
          >
            <span>Фітозбори</span>
          </button>

          <div className={`sideMenu__panel ${openSection === "herbs" ? "is-open" : ""}`}>
            <div className="sideMenu__links">
              <Link to="/herbs" onClick={onClose}>Авторські збори</Link>
              <Link to="/herbs" onClick={onClose}>Олії</Link>
              <Link to="/herbs" onClick={onClose}>Рекомендації</Link>
              <Link to="/herbs" onClick={onClose}>Як замовити</Link>
            </div>
          </div>
        </div>

        <div className="sideMenu__group">
          <button
            type="button"
            className={`sideMenu__section ${openSection === "health" ? "is-open" : ""}`}
            onClick={() => toggleSection("health")}
          >
            <span>Карти здоров&apos;я</span>
          </button>

          <div className={`sideMenu__panel ${openSection === "health" ? "is-open" : ""}`}>
            <div className="sideMenu__links">
              <Link to="/health-cards" onClick={onClose}>Карта здоров&apos;я</Link>
              <Link to="/health-cards" onClick={onClose}>Карта відновлення</Link>
              <Link to="/health-cards" onClick={onClose}>Карта практики</Link>
              <Link to="/health-cards" onClick={onClose}>Усі пропозиції</Link>
            </div>
          </div>
        </div>

        <div className="sideMenu__group">
          <button
            type="button"
            className={`sideMenu__section ${openSection === "shop" ? "is-open" : ""}`}
            onClick={() => toggleSection("shop")}
          >
            <span>Магазин</span>
          </button>

          <div className={`sideMenu__panel ${openSection === "shop" ? "is-open" : ""}`}>
            <div className="sideMenu__links">
              <Link to="/shop" onClick={onClose}>Килимки</Link>
              <Link to="/shop" onClick={onClose}>Роли та м&apos;ячики</Link>
              <Link to="/shop" onClick={onClose}>Цеглинки та ремені</Link>
              <Link to="/shop" onClick={onClose}>Масажні олії</Link>
              <Link to="/shop" onClick={onClose}>Фітотовари</Link>
              <Link to="/shop" onClick={onClose}>Вітамінні комплекси</Link>
            </div>
          </div>
        </div>

        <div className="sideMenu__group">
          <button
            type="button"
            className={`sideMenu__section ${openSection === "blog" ? "is-open" : ""}`}
            onClick={() => toggleSection("blog")}
          >
            <span>Блог і корисне</span>
          </button>

          <div className={`sideMenu__panel ${openSection === "blog" ? "is-open" : ""}`}>
            <div className="sideMenu__links">
              <Link to="/blog" onClick={onClose}>Статті</Link>
              <Link to="/reviews" onClick={onClose}>Відгуки</Link>
              <Link to="/about" onClick={onClose}>Про нас</Link>
            </div>
          </div>
        </div>

        <div className="sideMenu__meta">
          <a href="tel:+380503739900">+38 (050) 37 39 900</a>
          <a href={viberUrl} target="_blank" rel="noreferrer">Viber</a>
          <button type="button" onClick={onOpenMap}>Мапа</button>
        </div>

        <div className="sideMenu__account">
          {!me ? (
            <Link to="/auth" className="sideMenu__accountLink" onClick={onClose}>
              Увійти
            </Link>
          ) : (
            <>
              <Link to="/account" className="sideMenu__accountLink" onClick={onClose}>
                Кабінет
              </Link>

              <button
                type="button"
                className="sideMenu__accountLink sideMenu__accountLink--ghost"
                onClick={onLogout}
              >
                Вийти
              </button>

              {me.role === "admin" && (
                <Link
                  to="/admin/inbox"
                  className="sideMenu__accountLink sideMenu__accountLink--ghost"
                  onClick={onClose}
                >
                  Адмін
                </Link>
              )}
            </>
          )}
        </div>

        <div className="sideMenu__langs">
          <button type="button" onClick={() => onChangeLanguage("uk")}>UA</button>
          <button type="button" onClick={() => onChangeLanguage("ru")}>RU</button>
          <button type="button" onClick={() => onChangeLanguage("en")}>EN</button>
        </div>
      </aside>
    </div>
  );
}