// src/search/searchIndex.ts
import { blogPosts } from "../data/blogPosts";

export type SearchDocType = "page" | "section" | "blog";

export type SearchDoc = {
  id: string;
  type: SearchDocType;
  title: string;
  route: string;
  body: string;
  tags?: string[];
  breadcrumbs?: string;
};

// ✅ Ручной список страниц + секций (это “гугл-выдача” по сайту)
const siteDocs: SearchDoc[] = [
  {
    id: "page-massage",
    type: "page",
    title: "Масаж",
    route: "/massage",
    body: "Види масажу: релакс, лікувальний, спортивний. Спина, шия, напруга, відновлення.",
    tags: ["масаж", "спина", "шия", "релакс", "відновлення"],
    breadcrumbs: "Послуги",
  },
  {
    id: "page-training",
    type: "page",
    title: "Тренування",
    route: "/training",
    body: "Йогатерапія, рух, відновлення. Формати: індивідуально, групи, онлайн. Вправи для спини, шиї, плечей.",
    tags: ["тренування", "йога", "вправи", "відновлення", "плече"],
    breadcrumbs: "Послуги",
  },
  {
    id: "page-herbs",
    type: "page",
    title: "Трави та збори",
    route: "/herbs",
    body: "Авторські збори, підбір під запит, сезонність. Підтримка балансу та відновлення.",
    tags: ["трави", "збори", "чай", "підбір"],
    breadcrumbs: "Послуги",
  },
  {
    id: "page-recommendations",
    type: "page",
    title: "Рекомендації",
    route: "/recommendations",
    body: "Поради для підтримки балансу: біль у плечі, шия, спина, сон, стрес, самодопомога.",
    tags: ["рекомендації", "біль", "плече", "шия", "сон", "стрес"],
    breadcrumbs: "Матеріали",
  },
  { id: "page-about", type: "page", title: "Про нас", route: "/about", body: "Підхід, студія, команда.", breadcrumbs: "Інфо" },
  { id: "page-reviews", type: "page", title: "Відгуки", route: "/reviews", body: "Відгуки клієнтів.", breadcrumbs: "Інфо" },
  { id: "page-blog", type: "page", title: "Блог", route: "/blog", body: "Статті та відео.", breadcrumbs: "Матеріали" },

  // ✅ Примеры секций-якорей (подставь реальные якоря, если есть)
  {
    id: "sec-shoulder",
    type: "section",
    title: "Біль у плечі — що робити",
    route: "/recommendations#shoulder",
    body: "Причини болю, м’які вправи, коли допомагає масаж, коли звернутись до спеціаліста.",
    tags: ["біль у плечі", "плече", "вправи", "масаж"],
    breadcrumbs: "Рекомендації • Секція",
  },
  {
    id: "sec-face",
    type: "section",
    title: "Масаж обличчя",
    route: "/massage#face",
    body: "Набряки, тонус, релакс, лімфодренаж.",
    tags: ["масаж обличчя", "обличчя", "лімфа"],
    breadcrumbs: "Масаж • Секція",
  },
];

// ✅ Блог: аккуратно собираем body без tags/youtubeUrl (у тебя youtube)
function blogDocs(): SearchDoc[] {
  return blogPosts.map((p) => {
    // подстрой поля под твой BlogPost:
    // чаще всего там есть: slug, title, excerpt?, content? или text?
    const title = (p as { title: string }).title;
    const slug = (p as { slug: string }).slug;

    const excerpt = (p as { excerpt?: string }).excerpt ?? "";
    const content = (p as { content?: string; text?: string }).content ?? (p as { text?: string }).text ?? "";
    const youtube = (p as { youtube?: string }).youtube ?? "";

    const body = [excerpt, content, youtube].filter(Boolean).join("\n");

    return {
      id: `blog-${slug}`,
      type: "blog",
      title,
      route: `/blog/${slug}`,
      body,
      breadcrumbs: "Блог • Стаття",
    };
  });
}

export function buildSearchIndex(): SearchDoc[] {
  return [...siteDocs, ...blogDocs()];
}