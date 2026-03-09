export type ShopItem = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  unit?: string;
  category: "session" | "card";
};

export const shopItems: ShopItem[] = [
  {
    id: "individual-training",
    title: "Індивідуальне заняття",
    subtitle: "Персональна практика йога-терапії",
    price: 1200,
    unit: "1 заняття • 60 хвилин",
    category: "session",
  },
  {
    id: "group-training",
    title: "Загальне заняття",
    subtitle: "Групова практика йога-терапії",
    price: 300,
    unit: "групове заняття",
    category: "session",
  },
  {
    id: "massage-women",
    title: "Масаж (жінки)",
    subtitle: "Терапевтичний масаж",
    price: 1000,
    unit: "1 година",
    category: "session",
  },
  {
    id: "massage-men",
    title: "Масаж (чоловіки)",
    subtitle: "Терапевтичний масаж",
    price: 1100,
    unit: "1 година",
    category: "session",
  },
  {
    id: "health-card",
    title: "Карта здоров'я",
    subtitle: "8 занять + 4 масажі",
    price: 5500,
    unit: "економія 1000 грн",
    category: "card",
  },
  {
    id: "recovery-card",
    title: "Карта відновлення",
    subtitle: "5 масажів",
    price: 4500,
    unit: "економія 500 грн",
    category: "card",
  },
  {
    id: "practice-card",
    title: "Карта практики",
    subtitle: "10 загальних занять",
    price: 2500,
    unit: "економія 500 грн",
    category: "card",
  },
];

export function getItemById(id: string) {
  return shopItems.find((item) => item.id === id);
}