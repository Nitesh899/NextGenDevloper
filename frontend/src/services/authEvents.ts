export const AUTH_LOGOUT_EVENT =
  "nextgen:auth-logout";

export function notifyAuthLogout() {
  window.dispatchEvent(
    new Event(AUTH_LOGOUT_EVENT)
  );
}