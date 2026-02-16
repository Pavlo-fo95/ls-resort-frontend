export type ServiceCategory = "massage" | "training" | "herbs";
export type ServicesResponse = Record<ServiceCategory, string[]>;

// contact
export type ContactInfo = {
  viber: { iryna: string; serhii: string; group: string };
  email: string;
  phone: string;
};

export type ContactSendIn = {
  name: string;
  phone: string;
  email?: string | null;
  topic?: string | null;
  message: string;
  preferred_contact?: string;
};

export type SendResponse = {
  ok: boolean;
  id: number;
  received_at: string;
  note: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  topic: string | null;
  message: string;
  preferred_contact: string;
  created_at: string;
  status: "new" | "closed" | "spam";
  is_read: boolean;
};

export type ContactPatchIn = {
  is_read?: boolean;
  status?: "new" | "closed" | "spam";
};

// reviews (как на бэке)
export type Review = {
  id: number;
  author_name: string;
  rating: number;
  text: string;
  status: "pending" | "published" | "hidden";
  is_featured: boolean;
  created_at: string;
};

export type ReviewIn = {
  author_name: string;
  rating: number;
  text: string;
};

// бэк возвращает массив
export type ReviewsListResponse = Review[];

export type TokenOut = { access_token: string; token_type: string };
