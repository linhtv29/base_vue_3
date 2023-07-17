import type { AuthUser, UserResponse } from "@/features/auth";

const storagePrefix = "base_vue";

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function deleteCookie(name: string): void {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function setAuthInfo(value: UserResponse): void {
  setCookie("authUser", JSON.stringify(value), 1);
}

export function getUserInfo(): AuthUser | null {
  console.log(isAuthenticated());
  if(isAuthenticated()){
    console.log('pass');
    return JSON.parse(getCookie("authUser") as string).user;
  }
  return null
}
export function getToken(): string | null {
  if(isAuthenticated()){
    return JSON.parse(getCookie("authUser") as string).jwt;
  }
  return null
}

export function removeToken(): void {
  deleteCookie("authUser");
}
function isAuthenticated() {
  return !!getCookie("authUser");
}