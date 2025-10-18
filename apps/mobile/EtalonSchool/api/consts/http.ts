export const HTTPMethodConst = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const FetchCacheConst = {
  DEFAULT: 'default',
  NOCACHE: 'no-cache',
  RELOAD: 'reload',
  FORCECASH: 'force-cache',
  ONLYIFCACHED: 'only-if-cached',
} as const;

export const ContentTypeConst = {
  JSON: 'application/json',
  TEXT: 'text/plain',
} as const;
