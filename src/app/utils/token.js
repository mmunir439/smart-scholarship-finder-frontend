import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ✅ Set token in sessionStorage + Cookie (for middleware)
export function setToken(token) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("token", token);

    // ✅ Also save as cookie so middleware.js can read it
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;

    setAxiosAuthToken(token);
  }
}

// ✅ Remove token from both places
export function removeToken() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    // ✅ Also clear the cookie
    document.cookie = "token=; path=/; max-age=0";

    setAxiosAuthToken(null);
  }
}

// rest of your code stays exactly the same...
export function getToken() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null;
}

export function setUser(user) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
}

export function getUser() {
  if (typeof window !== "undefined") {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function setAxiosAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function decodeToken() {
  const token = getToken();
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
}
