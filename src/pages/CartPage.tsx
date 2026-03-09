import PageFrame from "../components/PageFrame";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";


export default function CartPage() {
  const { items, totalPrice, totalCount, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();

  return (
  <PageFrame>
    <div className="cartPage">
      <div className="container">
        <div className="cartPage__top">
          <div>
            <p className="cartPage__label">Корзина</p>
            <h1 className="cartPage__title">Ваші вибрані практики і карти</h1>
            <p className="cartPage__text">
              Тут можна перевірити склад замовлення перед оформленням.
            </p>
          </div>

          <div className="cartPage__actions">
            <Link to="/health-cards" className="cartBtn cartBtn--ghost">
              ← Назад до карт здоров'я
            </Link>
            {items.length > 0 && (
              <button type="button" className="cartBtn cartBtn--ghost" onClick={clearCart}>
                Очистити корзину
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cartEmpty">
            <h2>Корзина поки що порожня</h2>
            <p>Додайте тренування, масаж чи карту здоров'я.</p>
            <Link to="/health-cards" className="cartBtn cartBtn--primary">
              Перейти до вибору
            </Link>
          </div>
        ) : (
          <div className="cartLayout">
            <div className="cartList">
              {items.map(({ item, quantity }) => (
                <article key={item.id} className="cartItem">
                  <div className="cartItem__info">
                    <p className="cartItem__category">
                      {item.category === "card" ? "Карта здоров'я" : "Базовий сеанс"}
                    </p>
                    <h3 className="cartItem__title">{item.title}</h3>
                    {item.subtitle && <p className="cartItem__subtitle">{item.subtitle}</p>}
                    {item.unit && <p className="cartItem__unit">{item.unit}</p>}
                  </div>

                  <div className="cartItem__side">
                    <div className="cartItem__price">{item.price} грн</div>

                    <div className="cartItem__quantity">
                      <button type="button" onClick={() => decreaseQuantity(item.id)}>
                        −
                      </button>
                      <span>{quantity}</span>
                      <button type="button" onClick={() => addToCart(item.id)}>
                        +
                      </button>
                    </div>

                    <div className="cartItem__sum">{item.price * quantity} грн</div>

                    <button
                      type="button"
                      className="cartItem__remove"
                      onClick={() => removeFromCart(item.id)}
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
                <Link to="/account" className="cartBtn cartBtn--primary">
                  Оформити через кабінет
                </Link>
                <Link to="/admin" className="cartBtn cartBtn--ghost">
                  Акаунт адміна
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
