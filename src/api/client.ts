const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export class ApiError extends Error {
  status: number;
  data?: unknown;
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

function buildHeaders(hasBody: boolean) {
  const headers: Record<string, string> = {};
  if (hasBody) headers["Content-Type"] = "application/json";

  const token = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("token_type") || "bearer";
  if (token) headers.Authorization = `${tokenType} ${token}`;

  return headers;
}

async function request<T>(method: HttpMethod, path: string, body?: unknown): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    method,
    headers: buildHeaders(Boolean(body)),
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data: unknown = text
    ? (() => {
        try { return JSON.parse(text); } catch { return text; }
      })()
    : null;

  if (!res.ok) {
    const msg =
      typeof data === "object" && data && "detail" in data
        ? String((data as { detail: unknown }).detail)
        : `HTTP ${res.status}`;
    throw new ApiError(res.status, msg, data);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body: unknown) => request<T>("POST", path, body),
  patch: <T>(path: string, body: unknown) => request<T>("PATCH", path, body),
  del: <T>(path: string) => request<T>("DELETE", path),
};
