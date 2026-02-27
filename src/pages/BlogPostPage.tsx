import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import PageFrame from "../components/PageFrame";

function toEmbedUrl(url: string) {
  // playlist
  if (url.includes("youtube.com/playlist")) {
    const u = new URL(url);
    const list = u.searchParams.get("list");
    return list ? `https://www.youtube.com/embed/videoseries?list=${list}` : url;
  }

  // youtu.be/<id>
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }

  // youtube.com/watch?v=<id>
  if (url.includes("youtube.com/watch")) {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    return v ? `https://www.youtube.com/embed/${v}` : url;
  }

  return url;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="container section">
        <p>Стаття не знайдена.</p>
        <Link className="btn btn--ghost" to="/blog">
          ← Назад у блог
        </Link>
      </main>
    );
  }

  return (
    <PageFrame>
    <div className="page">
      <main className="container section">
        
       <Link className="btn" to="/#massage">
          ← На головну
        </Link>
        <h1 className="pageTitle" style={{ marginTop: 12 }}>
          {post.title}
        </h1>
        <p className="pageLead">{post.excerpt}</p>

        <div className="blogArticle">{post.content}</div>

        {post.youtube?.length ? (
          <div style={{ marginTop: 18, display: "grid", gap: 16 }}>
            <h2 style={{ margin: 0 }}>Відео</h2>

            {post.youtube.map((url) => (
              <div key={url} className="blogVideo">
                <iframe
                  width="100%"
                  height="420"
                  src={toEmbedUrl(url)}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="blogVideo__foot">
                  Посилання:{" "}
                  <a href={url} target="_blank" rel="noreferrer">
                    відкрити на YouTube
                  </a>
                </div>
                <Link to="/blog" className="breadcrumb">
                  ← До списку статей
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </main>
    </div>
   </PageFrame>
  );
}