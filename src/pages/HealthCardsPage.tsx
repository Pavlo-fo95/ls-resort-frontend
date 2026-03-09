import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

type Offer = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  details: string[];
  badge?: string;
  kind: "session" | "card";
};

const baseSessions: Offer[] = [
  {
    id: "individual-training",
    title: "Індивідуальне заняття",
    subtitle:
      "Персональна практика йога-терапії для відновлення тіла, дихання та внутрішнього балансу.",
    price: "1200 грн",
    details: ["1 заняття", "60 хвилин", "персональна практика"],
    kind: "session",
  },
  {
    id: "group-training",
    title: "Загальне заняття",
    subtitle:
      "Групова практика для підтримки гнучкості, сили, м’якого навантаження та гарного самопочуття.",
    price: "300 грн",
    details: ["групове заняття", "для регулярної практики"],
    kind: "session",
  },
  {
    id: "massage-women",
    title: "Масаж",
    subtitle:
      "Глибока робота з тілом для зняття напруження, відновлення ресурсу та покращення самопочуття.",
    price: "1000 грн",
    details: ["жінки", "1 година"],
    kind: "session",
  },
  {
    id: "massage-men",
    title: "Масаж",
    subtitle:
      "Глибока робота з тілом для зняття напруження, відновлення ресурсу та покращення самопочуття.",
    price: "1100 грн",
    details: ["чоловіки", "1 година"],
    kind: "session",
  },
];

const healthCards: Offer[] = [
  {
    id: "health-card",
    title: "Карта здоров'я",
    subtitle:
      "Комплексна програма для регулярної практики, підтримки тіла та м’якого відновлення.",
    price: "5500 грн",
    details: ["8 занять", "4 масажі (1 година кожен)", "економія 1000 грн"],
    badge: "популярний вибір",
    kind: "card",
  },
  {
    id: "recovery-card",
    title: "Карта відновлення",
    subtitle:
      "Програма з акцентом на тілесне розслаблення, зняття затисків та відновлення ресурсу.",
    price: "4500 грн",
    details: ["5 масажів", "1 година кожен", "економія 500 грн"],
    kind: "card",
  },
  {
    id: "practice-card",
    title: "Карта практики",
    subtitle:
      "Регулярні групові заняття для підтримки здоров’я тіла, рухливості та стабільного результату.",
    price: "2500 грн",
    details: ["10 загальних занять", "економія 500 грн"],
    kind: "card",
  },
];

function OfferCard({ offer }: { offer: Offer }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = () => {
    addToCart(offer.id);
    navigate("/cart");
  };

  return (
    <article className={`healthCard ${offer.kind === "card" ? "healthCard--accent" : ""}`}>
      {offer.badge && <div className="healthCard__badge">{offer.badge}</div>}

      <div className="healthCard__content">
        <p className="healthCard__eyebrow">
          {offer.kind === "card" ? "Інвестиція у здоров'я" : "Базовий сеанс"}
        </p>

        <h3 className="healthCard__title">{offer.title}</h3>

        {offer.subtitle && <p className="healthCard__subtitle">{offer.subtitle}</p>}

        <div className="healthCard__price">{offer.price}</div>

        <ul className="healthCard__list">
          {offer.details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="healthCard__actions">
          <button className="btnPrimary" type="button" onClick={handleAdd}>
            {offer.kind === "card" ? "Придбати карту" : "У кошик"}
          </button>

          <Link
            to={offer.kind === "card" ? "/cart" : "/schedule"}
            className="btnGhost"
          >
            {offer.kind === "card" ? "Відкрити кошик" : "Розклад"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HealthCardsPage() {
  return (
    <div className="healthPage">
      <section className="healthHero">
        <div className="container">
          <p className="healthHero__label">Карти здоров'я</p>

          <h1 className="healthHero__title">
            Інвестиція у здоров'я, рух і відновлення тіла
          </h1>

          <p className="healthHero__text">
            Практики та програми, які допомагають підтримувати тіло, зменшувати
            напруження і повертати відчуття внутрішньої опори.
          </p>

          <div className="healthHero__nav">
            <Link to="/cart" className="heroAction heroAction--primary">
              Кошик
            </Link>

            <Link to="/account" className="heroAction">
              Кабінет користувача
            </Link>

            <Link to="/admin" className="heroAction">
              Адмін-панель
            </Link>
          </div>
        </div>
      </section>

      <section className="healthSection">
        <div className="container">
          <div className="healthSection__top">
            <p className="healthSection__kicker">Базові сеанси</p>
            <h2 className="healthSection__title">Тренування та масажі</h2>
          </div>

          <div className="healthGrid healthGrid--sessions">
            {baseSessions.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      <section className="healthSection healthSection--cards">
        <div className="container">
          <div className="healthSection__top">
            <p className="healthSection__kicker">Карти здоров'я</p>
            <h2 className="healthSection__title">
              Програми для регулярної практики та відновлення
            </h2>
          </div>

          <div className="healthGrid healthGrid--cards">
            {healthCards.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}