"use client";

import { useEffect, useState } from "react";
import axios from "@/app/utils/axios";
import { getUser } from "@/app/utils/token";

export function getDashboardPath(user) {
  if (!user) return "/register";
  return user.role === "admin" ? "/admin/dashboard" : "/dashboard";
}

function readStoredUser() {
  try {
    const fromSession = getUser();
    if (fromSession) return fromSession;

    const fromLocal = localStorage.getItem("user");
    return fromLocal ? JSON.parse(fromLocal) : null;
  } catch {
    return null;
  }
}

export function useGetStartedHref() {
  const [href, setHref] = useState("/register");

  useEffect(() => {
    let mounted = true;

    const resolve = (user) => {
      if (mounted) setHref(getDashboardPath(user));
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/getCurrentUser");
        if (!mounted) return;
        if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
        resolve(res.data);
      } catch {
        resolve(readStoredUser());
      }
    };

    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  return href;
}
