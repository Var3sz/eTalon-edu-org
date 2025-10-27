/** Kinyeri a JSESSIONID értéket a Set-Cookie fejlécekből (string vagy string[]). */
export function extractJSessionId(setCookie: string | string[] | undefined): string | null {
  if (!setCookie) return null;
  const arr = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const line of arr) {
    // Példák:
    // "JSESSIONID=abc123; Path=/; HttpOnly"
    // "BIGipServer=...; Path=/"
    // csak a JSESSIONID érdekel
    const parts = line.split(';');
    const first = parts[0]?.trim(); // "JSESSIONID=abc123"
    if (!first) continue;
    const [name, value] = first.split('=');
    if (name?.trim().toUpperCase() === 'JSESSIONID' && value != null) {
      return value.trim();
    }
  }
  return null;
}

/** Cookie header felépítése csak a JSESSIONID-vel. */
export function buildCookieHeaderFromJ(sessionId: string | null): string | undefined {
  return sessionId ? `JSESSIONID=${sessionId}` : undefined;
}
