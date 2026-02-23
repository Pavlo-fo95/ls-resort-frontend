import { useEffect, useState } from "react";
import { NavLink,  useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import Popover, { type AnchorRect } from "../ui/Popover";
import Modal from "../ui/Modal";
import { useMe } from "../../hooks/useMe";
import SearchPopover from "../SearchPopover";

type MenuKey = "massage" | "training" | "herbs" | "about" | "reviews";

type Props = {
  brandText?: string;
};

type ViberLinks = {
  iryna: string;
  serhii: string;
  group: string;
};

export default function SiteHeader({ brandText = "Miraculous Wing" }: Props) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<AnchorRect | null>(null);
  const navigate = useNavigate();
  const me = useMe();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [viberOpen, setViberOpen] = useState(false);
  const OPEN_COUNT_KEY = "search_open_count_v1";
  const OPEN_CLEAR_AFTER = 20;
  const RECENT_KEY = "search_recent_v2";

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
    setIsSearchOpen((v) => {
      const next = !v;
      if (next) bumpOpenCountAndMaybeClear(); // ✅ делаем это только при открытии
      return next;
    });
  };
   // TODO: заменить на реальную авторизацию

  const cartCount = 0;

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onAccountClick = () => {
    navigate(me ? "/account" : "/auth");
  };

  const onCartClick = () => {
    navigate("/cart");
  };

  const { t, i18n } = useTranslation();

  const viber: ViberLinks = {
    iryna: "https://viber.com",
    serhii: "https://viber.com",
    group: "https://viber.com",
  };

  const closePopover = () => {
    setOpenMenu(null);
    setAnchorRect(null);
  };

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
    setViberOpen(false);
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
        setOpen(false);
        setViberOpen(false);
        closePopover();
        setStartOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setViberOpen(false);
    closePopover();
    setStartOpen(false);
  };

  const onLogout = () => {
    // 1) убираем токены/сессию (подстрой под свои ключи)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // если ты хранишь что-то ещё:
    localStorage.removeItem("token");
    localStorage.removeItem("me");

    // 2) закрываем попапы/меню
    closeAll();

    // 3) уводим на вход и обновляем состояние (быстрый 100% вариант)
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
            <span className="brand__badge">
              <img
                className="brand__logo"
                src={logo}
                alt=""
              />
            </span>

            <span className="brand__text">
              Miraculous Wing {brandText}
            </span>
          </Link>


          {/* NAV (desktop) */}
          <nav className="nav nav--desktop" aria-label="Навігація">
            {/* Масаж — popover */}
            <button
              type="button"
              className="nav__btn"
              onClick={(e) => openPopover("massage", e.currentTarget)}
            >
              {t("menu.massage")}
            </button>

            {/* Тренування — popover */}
            <button
              type="button"
              className="nav__btn"
              onClick={(e) => openPopover("training", e.currentTarget)}
            >
              {t("menu.training")}
            </button>

            {/* Трави — popover */}
            <button
              type="button"
              className="nav__btn"
              onClick={(e) => openPopover("herbs", e.currentTarget)}
            >
              {t("menu.herbs")}
            </button>

            {/* Остальные — обычные ссылки */}
            <NavLink to="/about" onClick={closeAll}>
              {t("menu.about")}
            </NavLink>

            <NavLink to="/schedule" onClick={closeAll}>
              {t("menu.schedule")}
            </NavLink>

            <NavLink to="/blog" onClick={closeAll}>
              {t("menu.blog")}
            </NavLink>

            <NavLink to="/reviews" onClick={closeAll}>
              {t("menu.reviews")}
            </NavLink>
            {/* “Почати” — Modal */}
            <button
              type="button"
              className="nav__btn"
              onClick={() => {
                setStartOpen(true);
                closePopover();
                setViberOpen(false);
              }}
            >
              {t("menu.start")}
            </button>
            <div className="header__actions">
              {!me ? (
                <Link className="btn btn--primary" to="/auth" onClick={closeAll}>
                  {t("menu.login")}
                </Link>
              ) : (
                <>
                  <Link className="btn btn--primary" to="/account" onClick={closeAll}>
                    {t("menu.account")}
                  </Link>

                  <button className="btn btn--ghost" type="button" onClick={onLogout}>
                    {t("menu.logout")}
                  </button>

                  {me.role === "admin" && (
                    <Link className="btn btn--ghost" to="/admin/inbox" onClick={closeAll}>
                      Адмін
                    </Link>
                  )}
                </>
              )}
            </div>
            <div className="langSwitch">
              <button type="button" onClick={() => i18n.changeLanguage("uk")}>
                UA
              </button>
              <button type="button" onClick={() => i18n.changeLanguage("ru")}>
                RU
              </button>
              <button type="button" onClick={() => i18n.changeLanguage("en")}>
                EN
              </button>
            </div>

            {/* Viber dropdown */}
            <div className="viberMenu" onMouseLeave={() => setViberOpen(false)}>
              <button
                className="btn btn--primary"
                type="button"
                aria-haspopup="menu"
                aria-expanded={viberOpen}
                onClick={() => {
                  setViberOpen((v) => !v);
                  closePopover();
                }}
              >
                {t("menu.bookViber")} ▾
              </button>

              {viberOpen && (
                <div className="viberMenu__dropdown" role="menu">
                  <a role="menuitem" href={viber.iryna} target="_blank" rel="noreferrer">
                    {t("viber.iryna")}
                  </a>
                  <a role="menuitem" href={viber.serhii} target="_blank" rel="noreferrer">
                    {t("viber.serhii")}
                  </a>
                  <a role="menuitem" href={viber.group} target="_blank" rel="noreferrer">
                    {t("viber.group")}
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* burger */}
         {/* RIGHT: icons + burger */}
          <div className="header__right">
            <div className="headerActions">
              <button className="iconBtn" type="button" onClick={onSearchToggle} aria-label="Search">
                <IconSearch />
              </button>

              <button className="iconBtn" type="button" onClick={onCartClick} aria-label="Cart">
                <IconCart />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </button>

              <button className="iconBtn" type="button" onClick={onAccountClick} aria-label="Account">
                <IconUser />
              </button>
            </div>

            <button
              className="burger"
              type="button"
              aria-label="Відкрити меню"
              aria-expanded={open}
              onClick={() => {
                setOpen((v) => !v);
                closePopover();
                setViberOpen(false);
                setStartOpen(false);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* mobile drawer */}
        {open && (
          <div className="drawer" role="dialog" aria-modal="true">
            <div className="drawer__panel">
              ...
            </div>
            <div className="drawer__backdrop" onClick={closeAll} />
          </div>
        )}

        {/* popover поиска */}
      <SearchPopover
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={i18n.language === "ru" ? "ru" : "ua"}
      />
      <button className="iconBtn" type="button" onClick={onSearchToggle} aria-label="Search">
        <IconSearch />
      </button>
      </header>
      {/* POPUP: Масаж */}
      <Popover open={openMenu === "massage"} onClose={closePopover} anchorRect={anchorRect}>
        <div className="mega__grid">
          <div className="mega__col">
            <div className="mega__title">{t("menu.massage")}</div>

            <Link className="mega__item" to="/massage" onClick={closeAll}>
              <div className="mega__itemTitle">Види масажу</div>
              <div className="mega__itemDesc">Релакс / лікувальний / спортивний…</div>
            </Link>

            <Link className="mega__item" to="/massage" onClick={closeAll}>
              <div className="mega__itemTitle">Кому підходить</div>
              <div className="mega__itemDesc">Спина, шия, напруга, відновлення</div>
            </Link>
          </div>

          <div className="mega__side">
            <div className="mega__sideTitle">Швидкий запис</div>
            <a className="btn btn--primary" href={viber.iryna} target="_blank" rel="noreferrer">
              Запис у Viber
            </a>
            <div className="mega__sideNote">Поки веде на Viber. Потім — на форму.</div>
          </div>
        </div>
      </Popover>

      {/* POPUP: Тренування (как Масаж) */}
      <Popover open={openMenu === "training"} onClose={closePopover} anchorRect={anchorRect}>
        <div className="mega__grid">
          <div className="mega__col">
            <div className="mega__title">{t("menu.training")}</div>

            <Link className="mega__item" to="/training" onClick={closeAll}>
              <div className="mega__itemTitle">Формати</div>
              <div className="mega__itemDesc">Індивідуально / групи / онлайн</div>
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
                setStartOpen(true);
                closePopover();
              }}
            >
              Почати
            </button>
            <div className="mega__sideNote">Швидкий вибір напряму</div>
          </div>
        </div>
      </Popover>

      {/* POPUP: Трави (как Масаж) */}
      <Popover open={openMenu === "herbs"} onClose={closePopover} anchorRect={anchorRect}>
        <div className="mega__grid">
          <div className="mega__col">
            <div className="mega__title">{t("menu.herbs")}</div>

            <Link className="mega__item" to="/herbs" onClick={closeAll}>
              <div className="mega__itemTitle">Авторські збори</div>
              <div className="mega__itemDesc">Підбір під запит та сезон</div>
            </Link>

            <Link className="mega__item" to="/herbs" onClick={closeAll}>
              <div className="mega__itemTitle">Як замовити</div>
              <div className="mega__itemDesc">Доставка / самовивіз / консультація</div>
            </Link>
          </div>

          <div className="mega__side">
            <div className="mega__sideTitle">Замовити</div>
            <a className="btn btn--primary" href={viber.group} target="_blank" rel="noreferrer">
              Viber
            </a>
            <div className="mega__sideNote">Пізніше — кошик / форма</div>
          </div>
        </div>
      </Popover>

      {/* MODAL “Почати” */}
      <Modal
        open={startOpen}
        onClose={() => setStartOpen(false)}
        title="Почати — оберіть напрям"
        overlayClassName="modal--heroPanel"
      >
        <div className="startGrid">
          <Link className="startCard" to="/about" onClick={closeAll}>
            <div className="startCard__t">Про нас</div>
            <div className="startCard__d">Підхід, студія, команда</div>
          </Link>

          <Link className="startCard" to="/massage" onClick={closeAll}>
            <div className="startCard__t">Масаж</div>
            <div className="startCard__d">Формати та запис</div>
          </Link>

          <Link className="startCard" to="/training" onClick={closeAll}>
            <div className="startCard__t">Тренування</div>
            <div className="startCard__d">Йогатерапія та рух</div>
          </Link>

          <Link className="startCard" to="/herbs" onClick={closeAll}>
            <div className="startCard__t">Трави</div>
            <div className="startCard__d">Збори та підбір</div>
          </Link>
        </div>
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