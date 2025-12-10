import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { DatePatterns } from 'src/api/consts/date-patterns';

export const formatDateCustom = (date: Date | string | null, pattern: string = DatePatterns.DATE) => {
  if (date) {
    return format(date, pattern, {
      locale: hu,
    });
  } else {
    return null;
  }
};

// Számla Agent util függvények a Session kezeléshez
// JSESSIONID kinyerése a Számla Agent sütikből
export function extractJSessionId(setCookie: string | string[] | undefined): string | null {
  if (!setCookie) return null;
  const arr = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const line of arr) {
    const parts = line.split(';');
    const first = parts[0]?.trim();
    if (!first) continue;
    const [name, value] = first.split('=');
    if (name?.trim().toUpperCase() === 'JSESSIONID' && value !== null) {
      return value.trim();
    }
  }
  return null;
}

// Cookie header felépítése
export function buildCookieHeaderFromJ(sessionId: string | null): string | undefined {
  return sessionId ? `JSESSIONID=${sessionId}` : undefined;
}
