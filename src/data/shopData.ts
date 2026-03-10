export type ShopCategory =
  | "all"
  | "mat"
  | "rollers"
  | "bricks"
  | "oils"
  | "herbs"
  | "vitamins";

export type ShopProduct = {
  id: number;
  slug: string;
  title: string;
  category: ShopCategory;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "new" | "hit" | "sale";
};

export const shopCategories = [
  { key: "all", label: "Усі товари" },
  { key: "mat", label: "Килимки" },
  { key: "rollers", label: "Роли та м’ячики" },
  { key: "bricks", label: "Цеглинки та ремені" },
  { key: "oils", label: "Масажні олії" },
  { key: "herbs", label: "Фітотовари" },
  { key: "vitamins", label: "Вітамінні комплекси" },
] as const;

export const shopProducts: ShopProduct[] = [
  {
    id: 1,
    slug: "premium-yoga-mat",
    title: "Преміум килимок для йоги",
    category: "mat",
    price: 1850,
    oldPrice: 2100,
    image: "/shop/mat-1.jpg",
    badge: "sale",
  },
  {
    id: 2,
    slug: "myofascial-roller",
    title: "М’який рол для міофасціального релізу",
    category: "rollers",
    price: 890,
    image: "/shop/roller-1.jpg",
    badge: "hit",
  },
  {
    id: 3,
    slug: "massage-ball-feet",
    title: "Масажний м’яч для стоп",
    category: "rollers",
    price: 320,
    image: "/shop/ball-1.jpg",
  },
  {
    id: 4,
    slug: "yoga-brick-eva",
    title: "Йога-цеглинка EVA",
    category: "bricks",
    price: 420,
    image: "/shop/brick-1.jpg",
  },
  {
    id: 5,
    slug: "stretch-strap",
    title: "Ремінь для розтяжки",
    category: "bricks",
    price: 350,
    image: "/shop/strap-1.jpg",
  },
  {
    id: 6,
    slug: "body-massage-oil",
    title: "Масажна олія для тіла",
    category: "oils",
    price: 540,
    image: "/shop/oil-1.jpg",
    badge: "new",
  },
  {
    id: 7,
    slug: "herbal-recovery-blend",
    title: "Трав’яний збір для відновлення",
    category: "herbs",
    price: 460,
    image: "/shop/herbs-1.jpg",
  },
  {
    id: 8,
    slug: "magnesium-b6",
    title: "Комплекс магній + B6",
    category: "vitamins",
    price: 690,
    image: "/shop/vitamins-1.jpg",
  },
];