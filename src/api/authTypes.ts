export type TokenOut = { access_token: string; token_type: "bearer" };

export type UserPublic = {
  id: number;
  email: string | null;
  phone: string | null;
  role: "user" | "admin";
  created_at?: string;
};

export type RegisterIn = { email: string | null; phone: string | null; password: string };
export type LoginIn = { login: string; password: string };
export type GoogleVerifyIn = { credential: string };
