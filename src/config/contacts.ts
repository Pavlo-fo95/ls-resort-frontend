export const viberLinks = {
  iryna: "https://viber.com", 
  serhii: "https://viber.com",
  group: "https://viber.com",
};

const isDev = import.meta.env.DEV;

// фейк в dev, в прод — только через env (пусто = не покажем кнопку)
export const phones = {
  iryna: isDev ? "+380000000000" : (import.meta.env.VITE_PHONE_IRYNA || ""),
  serhii: isDev ? "+380000000001" : (import.meta.env.VITE_PHONE_SERHII || ""),
};