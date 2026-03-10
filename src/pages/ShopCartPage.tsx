import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PageFrame from "../components/PageFrame";
import "../styles/shop.css";

type ShopCartItem = {
  id: number;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function ShopCartPage() {
  const [items, setItems] = useState<ShopCartItem[]>(() => {
    const saved = localStorage.getItem("lebedi-shop-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lebedi-shop-cart", JSON.stringify(items));
  }, [items]);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const increase = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <PageFrame>
      <div className="cartPage">
        <div className="container section">
          <div className="cartPage__top">
            <div>
              <p className="cartPage__label">Кошик магазину</p>
              <h1 className="cartPage__title">Ваші вибрані товари</h1>
              <p className="cartPage__text">
                Перевірте склад замовлення перед оформленням.
              </p>
            </div>

            <div className="cartPage__actions">
              <Link to="/shop" className="cartBtn cartBtn--ghost">
                ← Назад до магазину
              </Link>

              {items.length > 0 && (
                <button
                  type="button"
                  className="cartBtn cartBtn--ghost"
                  onClick={clearCart}
                >
                  Очистити кошик
                </button>
              )}
            </div>
          </div>

          {items.length === 0 ? (
            <div className="cartEmpty">
              <h2>Кошик поки що порожній</h2>
              <p>Додайте товари для практики, масла або інші корисні позиції.</p>
              <Link to="/shop" className="cartBtn cartBtn--primary">
                Перейти до магазину
              </Link>
            </div>
          ) : (
            <div className="cartLayout">
              <div className="cartList">
                {items.map((item) => (
                  <article key={item.id} className="cartItem">
                    <img src={item.image} alt={item.title} className="cartItem__image" />

                    <div className="cartItem__info">
                      <p className="cartItem__category">Товар магазину</p>
                      <h3 className="cartItem__title">{item.title}</h3>
                    </div>

                    <div className="cartItem__side">
                      <div className="cartItem__price">{item.price} грн</div>

                      <div className="cartItem__quantity">
                        <button type="button" onClick={() => decrease(item.id)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => increase(item.id)}>
                          +
                        </button>
                      </div>

                      <div className="cartItem__sum">{item.price * item.quantity} грн</div>

                      <button
                        type="button"
                        className="cartItem__remove"
                        onClick={() => removeItem(item.id)}
                      >
                        Видалити
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="cartSummary">
                <p className="cartSummary__label">Разом</p>
                <h2 className="cartSummary__count">{totalCount} поз.</h2>
                <div className="cartSummary__total">{totalPrice} грн</div>

                <div className="cartSummary__buttons">
                  <Link to="/shop#order" className="cartBtn cartBtn--primary">
                    Оформити замовлення
                  </Link>
                  <Link to="/shop" className="cartBtn cartBtn--ghost">
                    Продовжити вибір
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </PageFrame>
  );
}