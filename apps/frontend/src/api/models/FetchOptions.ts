'use server';
import { FetchOptionBuilder, FetchOptions } from '../types/FetchOptions';

export const fetchOptions = async <T>({
  method,
  body,
  token,
  headers,
}: FetchOptionBuilder<T>): Promise<FetchOptions> => {
  const initDef: FetchOptions = {
    method: 'GET',
    headers: {},
    token: token,
  };

  switch (method) {
    case 'PUT':
      return {
        ...initDef,
        headers: {
          ...initDef.headers,
          'Content-Type': 'application/json',
          ...headers,
        },
        method: 'PUT',
        body: JSON.stringify(body),
      };
    case 'PATCH':
      return {
        ...initDef,
        headers: {
          ...initDef.headers,
          'Content-Type': 'application/json',
          ...headers,
        },
        method: 'PATCH',
        body: JSON.stringify(body),
      };
    case 'POST':
      return {
        ...initDef,
        headers: {
          ...initDef.headers,
          'Content-Type': 'application/json',
          ...headers,
        },
        method: 'POST',
        body: JSON.stringify(body),
      };
    case 'DELETE':
      return {
        ...initDef,
        headers: {
          ...initDef.headers,
          ...headers,
        },
        method: 'DELETE',
      };
    default:
      return initDef;
  }
};
