import { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../../assets/logo.png";
import Popover, { type AnchorRect } from "../ui/Popover";
import Modal from "../ui/Modal";
import SearchPopover from "../SearchPopover";
import StartMapModalContent from "../start/StartMapModalContent";
import SideMenuDrawer from "./SideMenuDrawer";

import { useMe } from "../../hooks/useMe";
import { useCart } from "../../context/useCart";

type MenuKey = "massage" | "training" | "collections";

type Props = {
  brandName?: string;
  onStart?: () => void;
};

type ViberLinks = {
  iryna: string;
  serhii: string;
  group: string;
};

export default function SiteHeader({ brandName = "LebedI", onStart }: Props) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<AnchorRect | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const me = useMe();
  const { t, i18n } = useTranslation();
  const { items, totalCount } = useCart();

  const cartCount = typeof totalCount === "number" ? totalCount : items.length;

  const OPEN_COUNT_KEY = "search_open_count_v1";
  const OPEN_CLEAR_AFTER = 20;
  const RECENT_KEY = "search_recent_v2";

  const viber: ViberLinks = {
    iryna: "https://viber.com",
    serhii: "https://viber.com",
    group: "https://viber.com",
  };

  function clearRecent() {
    localStorage.removeItem(RECENT_KEY);
  }

  function bumpOpenCountAndMaybeClear() {
    const raw = localStorage.getItem(OPEN_COUNT_KEY);
    const n = raw ? Number(raw) : 0;
    const next = Number.isFinite(n) ? n + 1 : 1;

    if (next >= OPEN_CLEAR_AFTER) {
      clearRecent();
      localStorage.setItem(OPEN_COUNT_KEY, "0");
      return;
    }

    localStorage.setItem(OPEN_COUNT_KEY, String(next));
  }

  const onSearchToggle = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) bumpOpenCountAndMaybeClear();
      return next;
    });
  };

  const onAccountClick = () => {
    navigate(me ? "/account" : "/auth");
  };

  const onCartClick = () => {
    navigate("/cart");
  };

  const closePopover = useCallback(() => {
    setOpenMenu(null);
    setAnchorRect(null);
  }, []);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setAnchorRect(null);
    setStartOpen(false);
    setIsSearchOpen(false);
    setMenuOpen(false);
  }, []);

  const openPopover = (k: MenuKey, el: HTMLElement) => {
    const r = el.getBoundingClientRect();

    setAnchorRect({
      top: r.top,
      left: r.left,
      bottom: r.bottom,
      width: r.width,
      height: r.height,
    });

    setOpenMenu((prev) => (prev === k ? null : k));
    setStartOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  const onLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token");
    localStorage.removeItem("me");

    closeAll();
    navigate("/auth");
    window.location.reload();
  };

  return (
    <>
      <header className={`header ${scrolled ? "header--solid" : ""}`}>
        <div className="header__inner">
        <Link
          className="brand"
          to="/"
          onClick={closeAll}
          aria-label="На головну"
        >
          <span className="brandLogo">
            <img
              src={logo}
              alt="LebedI"
              className="brandLogo__img"
            />

            <span className="brandName">
              {brandName.slice(0, -1)}
              <span className="brandAccent">
                {brandName.slice(-1)}
              </span>
            </span>
          </span>
        </Link>

          <nav className="nav nav--desktop" aria-label="Навігація">
            <button
              type="button"
              className="nav__btn"
              onClick={(e) => openPopover("massage", e.currentTarget)}
            >
              {t("menu.massage")}
            </button>

            <button
              type="button"
              className="nav__btn"
              onClick={(e) => openPopover("training", e.currentTarget)}
            >
              {t("menu.training")}
            </button>

            <button
              type="button"
              className="nav__btn"
              onClick={(e) => openPopover("collections", e.currentTarget)}
            >
              {t("menu.herbs")}
            </button>

            <NavLink to="/about" onClick={closeAll}>
              {t("menu.about")}
            </NavLink>

            <NavLink to="/schedule" onClick={closeAll}>
              {t("menu.schedule")}
            </NavLink>

            <NavLink to="/blog" onClick={closeAll}>
              {t("menu.blog")}
            </NavLink>

            <NavLink
              to="/health-cards"
              className={({ isActive }) =>
                `navLink ${isActive ? "navLink--active" : ""}`
              }
              onClick={closeAll}
            >
              Карти здоров&apos;я
            </NavLink>

            <NavLink to="/reviews" onClick={closeAll}>
              {t("menu.reviews")}
            </NavLink>
          </nav>

          <div className="header__right">
            <div className="headerActions">
              <button
                className="iconBtn"
                type="button"
                onClick={onSearchToggle}
                aria-label="Пошук"
              >
                <IconSearch />
              </button>

              <button
                className="iconBtn"
                type="button"
                onClick={onCartClick}
                aria-label="Кошик"
              >
                <IconCart />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </button>

              <button
                className="iconBtn"
                type="button"
                onClick={onAccountClick}
                aria-label="Кабінет"
              >
                <IconUser />
              </button>
            </div>

            <button
              className="burger"
              type="button"
              aria-label="Відкрити меню"
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((prev) => !prev);
                closePopover();
                setStartOpen(false);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <SearchPopover
          open={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          lang={i18n.language === "ru" ? "ru" : "ua"}
        />
      </header>

      <SideMenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        me={me}
        onLogout={onLogout}
        onOpenMap={() => {
          setStartOpen(true);
          setMenuOpen(false);
        }}
        onOpenSearch={() => {
          setIsSearchOpen(true);
        }}
        onChangeLanguage={(lang: "uk" | "ru" | "en") => {
          void i18n.changeLanguage(lang);
        }}
        viberUrl={viber.iryna}
      />
      <Popover
        open={openMenu === "massage"}
        onClose={closePopover}
        anchorRect={anchorRect}
      >
        <div className="mega__grid">
          <div className="mega__col">
            <div className="mega__title">{t("menu.massage")}</div>

            <Link className="mega__item" to="/massage" onClick={closeAll}>
              <div className="mega__itemTitle">Види масажу</div>
              <div className="mega__itemDesc">
                Релакс, лікувальний, спортивний
              </div>
            </Link>

            <Link className="mega__item" to="/massage" onClick={closeAll}>
              <div className="mega__itemTitle">Кому підходить</div>
              <div className="mega__itemDesc">
                Спина, шия, напруга, відновлення
              </div>
            </Link>
          </div>

          <div className="mega__side">
            <div className="mega__sideTitle">Швидкий запис</div>
            <a
              className="btn btn--primary"
              href={viber.iryna}
              target="_blank"
              rel="noreferrer"
            >
              Viber
            </a>
            <div className="mega__sideNote">Швидкий зв&apos;язок для запису</div>
          </div>
        </div>
      </Popover>

      <Popover
        open={openMenu === "training"}
        onClose={closePopover}
        anchorRect={anchorRect}
      >
        <div className="mega__grid">
          <div className="mega__col">
            <div className="mega__title">{t("menu.training")}</div>

            <Link className="mega__item" to="/training" onClick={closeAll}>
              <div className="mega__itemTitle">Формати</div>
              <div className="mega__itemDesc">Індивідуально, групи, онлайн</div>
            </Link>

            <Link className="mega__item" to="/training" onClick={closeAll}>
              <div className="mega__itemTitle">Напрями</div>
              <div className="mega__itemDesc">Йогатерапія, рух, відновлення</div>
            </Link>
          </div>

          <div className="mega__side">
            <div className="mega__sideTitle">Швидкий старт</div>
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => {
                closePopover();
                onStart?.();
              }}
            >
              Мапа
            </button>
            <div className="mega__sideNote">Швидкий вибір напряму</div>
          </div>
        </div>
      </Popover>


      <Popover
        open={openMenu === "collections"}
        onClose={closePopover}
        anchorRect={anchorRect}
      >
        <div className="mega__grid">
          <div className="mega__col">

            <div className="mega__title">Добірки</div>

            <Link className="mega__item" to="/herbs" onClick={closeAll}>
              <div className="mega__itemTitle">Авторські добірки</div>
              <div className="mega__itemDesc">
                Трав’яні збори та індивідуальний підбір
              </div>
            </Link>

            <Link className="mega__item" to="/shop" onClick={closeAll}>
              <div className="mega__itemTitle">Корисне</div>
              <div className="mega__itemDesc">
                Масла для тіла, добавки, товари для практики
              </div>
            </Link>

            <Link className="mega__item" to="/herbs#order" onClick={closeAll}>
              <div className="mega__itemTitle">Як замовити</div>
              <div className="mega__itemDesc">
                Доставка, самовивіз, консультація
              </div>
            </Link>

          </div>
        </div>
      </Popover>

      <Modal
        open={startOpen}
        onClose={() => setStartOpen(false)}
        title="Пошук адреси"
        overlayClassName="modal--map"
      >
        <StartMapModalContent
          lang={
            i18n.language === "ru"
              ? "ru"
              : i18n.language === "en"
              ? "en"
              : "uk"
          }
        />
      </Modal>
    </>
  );
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20 21a8 8 0 1 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 7.5-7.5A7.5 7.5 0 0 1 10.5 18Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 7h15l-1.5 9H7.5L6 7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 7 5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        fill="currentColor"
      />
    </svg>
  );
}