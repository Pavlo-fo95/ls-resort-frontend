import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // путь к png

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  const brandName = t("brand");

  return (
    <footer className="footer" id="contacts">
      <div className="footer__inner">

        <div className="footer__brand">

          <Link to="/" className="brand" aria-label="На головну">

            <span className="brandLogo">

              <img
                src={logo}
                alt={brandName}
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

          <div className="footer__muted">
            {t("footer.tagline")}
          </div>

        </div>

        <div className="footer__col">
          <div className="footer__title">
            {t("footer.contactsTitle")}
          </div>

          <a className="footer__link" href="tel:+380000000000">
            +38 (000) 000-00-00
          </a>

          <a className="footer__link" href="mailto:lebed@i.com">
            lebed@i.com
          </a>

          <div className="footer__muted">
            {t("footer.addressNote")}
          </div>
        </div>

        <div className="footer__col">
          <div className="footer__title">
            {t("footer.socialTitle")}
          </div>

          <div className="footer__social">
            <a
              className="socialBtn"
              href="https://www.instagram.com/irina.lebed.yoga/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              className="socialBtn"
              href="https://www.facebook.com/irina.lebed.666819"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <span>
          © {year} {brandName}. {t("footer.rights")} {t("footer.websiteNote")}
        </span>
      </div>

    </footer>
  );
}