const AUTH_TOKEN_COOKIE_NAME = "authToken";

const setCookie = (
  name: string,
  value: string,
  maxAgeSeconds: number
): void => {
  document.cookie = `${name}=${
    value || ""
  }; path=/; max-age=${maxAgeSeconds}; SameSite=Lax; Secure`;
};

const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : null;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax; Secure`;
};

export const getToken = (): string | null => {
  return getCookie(AUTH_TOKEN_COOKIE_NAME);
};

export const saveToken = (token: string): void => {
  const maxAge = 3600;
  setCookie(AUTH_TOKEN_COOKIE_NAME, token, maxAge);
};

export const removeToken = (): void => {
  deleteCookie(AUTH_TOKEN_COOKIE_NAME);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
