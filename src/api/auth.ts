import { api } from "./client";
import type { UserPublic, RegisterIn, LoginIn, GoogleVerifyIn } from "./authTypes";
import type { TokenOut } from "./types";
export const authApi = {
  register: (payload: RegisterIn) => api.post<TokenOut>("/api/auth/register", payload),
  login: (payload: LoginIn) => api.post<TokenOut>("/api/auth/login", payload),
  googleVerify: (payload: GoogleVerifyIn) => api.post<TokenOut>("/api/auth/google/verify", payload),
  me: () => api.get<UserPublic>("/api/auth/me"),
};

export function saveToken(tok: TokenOut, who: string) {
  localStorage.setItem("auth_login", who);
  localStorage.setItem("access_token", tok.access_token);
  localStorage.setItem("token_type", tok.token_type || "bearer");
}

export function logout() {
  localStorage.removeItem("auth_login");
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_type");
}