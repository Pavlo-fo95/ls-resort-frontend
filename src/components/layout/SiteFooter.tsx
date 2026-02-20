import { useTranslation } from "react-i18next";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="footer" id="contacts">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="brand__mark">SwanS</span>
            <span className="brand__infty">∞</span>
            {/* если хочешь убрать “Resort Studio” рядом с лого — оставь пусто или t("brand") */}
            <span className="brand__text">{t("brand")}</span>
          </div>

          <div className="footer__muted">{t("footer.tagline")}</div>
        </div>

        <div className="footer__col">
          <div className="footer__title">{t("footer.contactsTitle")}</div>
          <a className="footer__link" href="tel:+380000000000">
            +38 (000) 000-00-00
          </a>
          <a className="footer__link" href="mailto:swans@miraculous_wing.studio">
            swans@miraculous_wing.studio
          </a>
          <div className="footer__muted">{t("footer.addressNote")}</div>
        </div>

        <div className="footer__col">
          <div className="footer__title">{t("footer.socialTitle")}</div>
          <div className="footer__social">
            <a className="socialBtn" href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="socialBtn" href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>
          © {year} LS ∞ {t("brand")}. {t("footer.rights")}
        </span>
      </div>
    </footer>
  );
}
