import { Link, useParams } from "react-router-dom";
import { shopProducts } from "../data/shopData";
import "../styles/shop.css";

export default function ShopProductPage() {
  const { slug } = useParams();
  const product = shopProducts.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="page">
        <main className="container section">
          <h1>Товар не знайдено</h1>
          <Link to="/shop" className="btn btn--primary">
            ← Назад до магазину
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="container section">
        <div className="shopBreadcrumbs">
          <Link to="/">Головна</Link>
          <span>/</span>
          <Link to="/shop">Магазин</Link>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <div className="productDetails">
          <div className="productDetails__imageWrap">
            <img
              src={product.image}
              alt={product.title}
              className="productDetails__image"
            />
          </div>

          <div className="productDetails__content">
            <h1 className="productDetails__title">{product.title}</h1>

            <div className="shopCard__priceRow">
              <span className="shopCard__price">{product.price} грн</span>
              {product.oldPrice && (
                <span className="shopCard__oldPrice">{product.oldPrice} грн</span>
              )}
            </div>

            <p className="muted productDetails__text">
              Якісний товар для практики, відновлення та м’якої підтримки тіла.
              Пізніше тут можна додати повний опис, характеристики, спосіб використання
              та рекомендації.
            </p>

            <div className="productDetails__actions">
              <Link
                to="/shop"
                className="shopCard__btn shopCard__btn--ghost shopCard__linkBtn"
              >
                ← До магазину
              </Link>

              <Link
                to="/shop#order"
                className="shopCard__btn shopCard__btn--primary shopCard__linkBtn"
              >
                Як замовити
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}