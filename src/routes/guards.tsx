import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("access_token");
  if (!token) return <Navigate to="/auth" replace />;
  return children;
}

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role"); // опционально (можно хранить после /me)
  if (!token) return <Navigate to="/auth" replace />;
  if (role && role !== "admin") return <Navigate to="/account" replace />;
  return children;
}