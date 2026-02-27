import PageFrame from "../components/PageFrame";

export default function CartPage() {
  return (
    <PageFrame>
    <div className="page cartPage">
      <main className="container section">
        <h1 className="pageTitle">Кошик</h1>
        <p className="muted">Поки що порожньо. Тут буде кошик товарів/послуг.</p>
      </main>
    </div>
   </PageFrame>
  );
}
