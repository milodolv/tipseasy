const MASKED_TOKEN_DISPLAY = "••••••••••••••••";

/** Jeton et URL réels : ASCII uniquement (stockage / copie). */
export function parseOverlayUrl(url: string) {
  const u = new URL(url);
  const token = u.searchParams.get("token") ?? "";
  return {
    origin: u.origin,
    pathname: u.pathname,
    token,
    full: url,
  };
}

export function buildOverlayUrl(origin: string, pathname: string, token: string) {
  const safe = encodeURIComponent(token);
  return `${origin}${pathname}?token=${safe}`;
}

/** Affichage masqué : les points ne passent pas par l'API URL (évite l'encodage). */
export function formatOverlayUrlForDisplay(url: string, showToken: boolean) {
  const { origin, pathname, token } = parseOverlayUrl(url);
  if (showToken) {
    return `${origin}${pathname}?token=${token}`;
  }
  return `${origin}${pathname}?token=${MASKED_TOKEN_DISPLAY}`;
}

export function generateDemoOverlayToken() {
  const suffix = Math.random().toString(36).slice(2, 8);
  return `tk_demo_${suffix}`;
}