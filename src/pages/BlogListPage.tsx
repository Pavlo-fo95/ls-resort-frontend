import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

export default function BlogListPage() {
  return (
    <div className="page">
      <main className="container section">
        <div className="pageTop">
          <div>
            <h1 className="pageTitle">БЛОГ</h1>
            <p className="pageLead">Короткие статьи, видео и полезные разборы от Ирины.</p>
          </div>
        </div>

        <div className="blogGrid">
          {blogPosts.map((p) => (
            <article key={p.slug} className="blogCard">
              <div className="blogMedia">Фото позже</div>

              <div>
                <h2 className="blogTitle">{p.title}</h2>
                <p className="blogExcerpt">{p.excerpt}</p>

                <Link to={`/blog/${p.slug}`} className="blogMore">
                  Детальніше <span className="blogMore__box">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}