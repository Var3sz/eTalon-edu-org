// const BASE_URL = 'http://172.20.10.2:3001/';

// type RefreshResponse = { accessToken: string; refreshToken: string; expiresIn: number };

// let refreshInFlight: Promise<string> | null = null;

// export async function refreshAccessToken(): Promise<string> {
//   if (!refreshInFlight) {
//     refreshInFlight = (async () => {
//       const refresh = await getRefreshToken();
//       if (!refresh) throw new Error('No refresh token');

//       const res = await fetch(`${BASE_URL}auth/refresh`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ refreshToken: refresh }),
//       });

//       if (!res.ok) throw new Error('Refresh failed');

//       const data = (await res.json()) as RefreshResponse;
//       await saveTokens(data.accessToken, data.refreshToken ?? refresh);
//       return data.accessToken;
//     })().finally(() => {
//       refreshInFlight = null;
//     });
//   }
//   return refreshInFlight;
// }

// export async function failRefreshCleanup() {
//   await clearTokens();
// }
