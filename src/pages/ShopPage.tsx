import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  shopCategories,
  shopProducts,
  type ShopCategory,
  type ShopProduct,
} from "../data/shopData";
import "../styles/shop.css";

type SortType = "latest" | "cheap" | "expensive";

type CartItem = {
  id: number;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("all");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("lebedi-shop-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lebedi-shop-cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    let items = [...shopProducts];

    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (sortBy === "cheap") {
      items.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "expensive") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [activeCategory, sortBy]);

  const addToCart = (product: ShopProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="shopPage">
      <section className="shopHero">
        <div className="container shopHero__inner">
          <div className="shopHero__content">
            <div className="shopHero__eyebrow">LebedI Store</div>
            <h1 className="shopHero__title">Магазин для здоров’я, руху та відновлення</h1>
            <p className="shopHero__text">
              Добірка корисних товарів для занять, самомасажу, м’якого відновлення та
              домашньої практики.
            </p>
            <a href="#shopCatalog" className="shopHero__button">
              Перейти до товарів
            </a>
          </div>
        </div>
      </section>

      <section className="shopPromo">
        <div className="container shopPromo__inner">
          <div>
            <div className="shopPromo__title">Практика має значення</div>
            <div className="shopPromo__text">
              Товари підібрані під йога-терапію, масаж, мобільність та домашнє відновлення.
            </div>
          </div>

          <Link to="/contacts" className="shopPromo__link">
            Консультація
          </Link>
        </div>
      </section>

      <section id="order" className="section chooseBlock">
        <div className="container">
          <div className="chooseBlock__box">
            <h3>Як замовити</h3>
            <p className="muted">
              Оберіть товар, додайте його у кошик або напишіть у Viber для консультації.
            </p>
          </div>
        </div>
      </section>

      <section className="container shopCatalog" id="shopCatalog">
        <div className="shopBreadcrumbs">
          <Link to="/">Головна</Link>
          <span>/</span>
          <span>Магазин</span>
        </div>

        <div className="shopToolbar shopToolbar--top">
          <div className="shopToolbar__results">
            Показано <strong>{filteredProducts.length}</strong> товарів
          </div>

          <div className="shopToolbar__right">
            <Link to="/shop-cart" className="shopCartLink">
              Кошик ({totalCount})
            </Link>

            <select
              className="shopToolbar__select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
            >
              <option value="latest">Сортувати: за замовчуванням</option>
              <option value="cheap">Спочатку дешевші</option>
              <option value="expensive">Спочатку дорожчі</option>
            </select>
          </div>
        </div>

        <div className="shopLayout">
          <aside className="shopSidebar">
            <div className="shopSidebar__card">
              <h3 className="shopSidebar__title">Категорії товарів</h3>

              <nav className="shopSidebar__nav">
                {shopCategories.map((category) => (
                  <button
                    key={category.key}
                    className={`shopSidebar__link ${
                      activeCategory === category.key ? "is-active" : ""
                    }`}
                    onClick={() => setActiveCategory(category.key)}
                    type="button"
                  >
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="shopContent">
            <div className="shopGrid">
              {filteredProducts.map((product) => (
                <article className="shopCard" key={product.id}>
                  <div className="shopCard__imageWrap">
                    {product.badge && (
                      <span className={`shopCard__badge shopCard__badge--${product.badge}`}>
                        {product.badge === "new" && "NEW"}
                        {product.badge === "hit" && "HIT"}
                        {product.badge === "sale" && "SALE"}
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.title}
                      className="shopCard__image"
                    />
                  </div>

                  <div className="shopCard__body">
                    <h3 className="shopCard__title">{product.title}</h3>

                    <div className="shopCard__priceRow">
                      <span className="shopCard__price">{product.price} грн</span>
                      {product.oldPrice && (
                        <span className="shopCard__oldPrice">{product.oldPrice} грн</span>
                      )}
                    </div>

                    <div className="shopCard__actions">
                      <button
                        className="shopCard__btn shopCard__btn--primary"
                        type="button"
                        onClick={() => addToCart(product)}
                      >
                        У кошик
                      </button>

                      <Link
                        className="shopCard__btn shopCard__btn--ghost shopCard__linkBtn"
                        to={`/shop/${product.slug}`}
                      >
                        Детальніше
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}