import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { authApi, saveToken } from "../api/auth";
import type { TokenOut } from "../api/types";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

type Tab = "login" | "register";


async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      (typeof data === "object" && data !== null && "detail" in data && (data as { detail?: unknown }).detail) ||
      (typeof data === "object" && data !== null && "message" in data && (data as { message?: unknown }).message) ||
      `HTTP ${res.status} ${res.statusText}`;

    throw new Error(typeof msg === "string" ? msg : "Помилка");
  }

  return data as T;
}

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);

  // forms
  const [login, setLogin] = useState(""); // email OR phone
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  const title = useMemo(() => (tab === "login" ? "Увійти" : "Зареєструватися"), [tab]);

  const resetNote = () => {
    setStatus("idle");
    setNote("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetNote();

    if (tab === "login" && !login.trim()) {
      setStatus("error");
      setNote("Вкажи email або телефон 🙂");
      return;
    }

    if (tab === "register" && !phone.trim() && !email.trim()) {
      setStatus("error");
      setNote("Додай телефон або email 🙂");
      return;
    }

    if (!password.trim() || password.length < 6) {
      setStatus("error");
      setNote("Пароль має бути мінімум 6 символів");
      return;
    }

    try {
      setStatus("loading");

      let tok: TokenOut;

      if (tab === "login") {
        tok = await apiPost<TokenOut>("/api/auth/login", { login, password });
        setStatus("ok");
        setNote("Вхід успішний ✅");
        await saveTokenAndRouteByRole(tok, login);
      } else {
        tok = await apiPost<TokenOut>("/api/auth/register", {
          email: email || null,
          phone: phone || null,
          password,
        });
        setStatus("ok");
        setNote("Акаунт створено ✅");
        await saveTokenAndRouteByRole(tok, email || phone);
      }
    } catch (err: unknown) {
      setStatus("error");
      setNote(err instanceof Error ? err.message : "Помилка. Спробуй ще раз.");
    }
  };

  // Реальный Google -> бек -> токен
  const saveTokenAndRouteByRole = async (tok: TokenOut, who: string) => {
    saveToken(tok, who);

    try {
      const me = await authApi.me();
      navigate(me.role === "admin" ? "/admin/inbox" : "/account");
    } catch {
      navigate("/account");
    }
  };

  const onGoogleSuccess = async (cred: CredentialResponse) => {
    resetNote();

    if (!cred.credential) {
      setStatus("error");
      setNote("Google не повернув токен. Спробуй ще раз.");
      return;
    }

    try {
      setStatus("loading");

      const tok = await apiPost<TokenOut>("/api/auth/google/verify", {
        credential: cred.credential,
      });

      setStatus("ok");
      setNote("Google-вхід успішний ✅");

      console.log("GOOGLE CREDENTIAL:", cred.credential);

      await saveTokenAndRouteByRole(tok, "google");
    } catch (err: unknown) {
      setStatus("error");
      setNote(err instanceof Error ? err.message : "Помилка Google-входу");
    }
  };


  const onGoogleError = () => {
    resetNote();
    setStatus("error");
    setNote("Не вдалося авторизуватися через Google");
  };

  return (
    <div className="page">
      <main className="container">
        <div className="auth">
          <div className="auth__card">
            <div className="auth__tabs" role="tablist" aria-label="auth tabs">
              <button
                type="button"
                className={`auth__tab ${tab === "register" ? "is-active" : ""}`}
                onClick={() => {
                  setTab("register");
                  resetNote();
                }}
                role="tab"
                aria-selected={tab === "register"}
              >
                Зареєструватися
              </button>

              <button
                type="button"
                className={`auth__tab ${tab === "login" ? "is-active" : ""}`}
                onClick={() => {
                  setTab("login");
                  resetNote();
                }}
                role="tab"
                aria-selected={tab === "login"}
              >
                Увійти
              </button>
            </div>

            <h1 className="auth__title">{title}</h1>
            <p className="auth__hint">
              {tab === "login" ? "Повертаємось у студію ✨" : "Створимо акаунт за 30 секунд (майже як магія)."}
            </p>

            <form className="auth__form" onSubmit={onSubmit}>
              {tab === "login" ? (
                <label className="authField">
                  <span>Email або телефон</span>
                  <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="olga@example.com або +380..."
                    autoComplete="username"
                    inputMode="text"
                  />
                </label>
              ) : (
                <>
                  <label className="authField">
                    <span>Телефон</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+380..."
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </label>

                  <label className="authField">
                    <span>Email (опційно)</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </label>
                </>
              )}

              <label className="authField">
                <span>Пароль</span>
                <div className="authPass">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type={showPass ? "text" : "password"}
                    autoComplete={tab === "login" ? "current-password" : "new-password"}
                  />
                  <button
                    className="authPass__btn"
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Сховати пароль" : "Показати пароль"}
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </label>

              <div className="auth__row">
                <button className="btn btn--primary auth__submit" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "..." : title}
                </button>

                {tab === "login" && (
                  <button
                    type="button"
                    className="auth__link"
                    onClick={() => {
                      setStatus("idle");
                      setNote("“Забули пароль?” додамо наступним кроком 😉");
                    }}
                  >
                    Забули пароль?
                  </button>
                )}
              </div>

              <div className="auth__divider">
                <span>або</span>
              </div>

              <div className="authGoogleWrap">
                <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleError} />
              </div>

              {note && <p className={`auth__note ${status === "error" ? "is-error" : "is-ok"}`}>{note}</p>}

              <p className="auth__bottom">
                {tab === "login" ? (
                  <>
                    Нема акаунта?{" "}
                    <button
                      type="button"
                      className="auth__linkInline"
                      onClick={() => {
                        setTab("register");
                        resetNote();
                      }}
                    >
                      Зареєструватися
                    </button>
                  </>
                ) : (
                  <>
                    Вже маєш акаунт?{" "}
                    <button
                      type="button"
                      className="auth__linkInline"
                      onClick={() => {
                        setTab("login");
                        resetNote();
                      }}
                    >
                      Увійти
                    </button>
                  </>
                )}
              </p>

              <p className="auth__policy">
                Продовжуючи, ви погоджуєтесь з{" "}
                <Link to="/about" className="auth__linkInline">
                  умовами
                </Link>{" "}
                та{" "}
                <Link to="/about" className="auth__linkInline">
                  політикою конфіденційності
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
