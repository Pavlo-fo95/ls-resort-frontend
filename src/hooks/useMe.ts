import { useEffect, useState } from "react";
import { authApi } from "../api/auth";
import type { UserPublic } from "../api/authTypes";

export function useMe() {
  const [me, setMe] = useState<UserPublic | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    authApi.me()
      .then(setMe)
      .catch(() => setMe(null));
  }, []);

  return me;
}
