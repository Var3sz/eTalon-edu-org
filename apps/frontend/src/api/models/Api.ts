import { ApiLocales } from '@/locales/api-locales';

import { FetchOptions } from '../types/FetchOptions';
import { FetchErrorBody, FetchResponse, FetchResponseOK } from '../types/FetchResponse';
import { fetchOptions } from './FetchOptions';

const httpRequest = async <ObjectType>(
  url: string,
  options: FetchOptions,
  isFile?: boolean,
  isJsonBody?: boolean
): Promise<FetchResponse<ObjectType>> => {
  const fetchAndReadStream = async (fetchResponse: Response) => {
    const reader = (await fetchResponse.blob()).stream().getReader();
    const chunks = [];
    let done, value;
    while (!done) {
      ({ done, value } = await reader.read());
      if (value) {
        chunks.push(value);
      }
    }
    const completeFile = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
      completeFile.set(chunk, offset);
      offset += chunk.length;
    }

    return completeFile;
  };

  const fetchResponse: Response = await fetch(url, {
    ...options,
    headers: isFile
      ? {
          ...options.headers,
          'Content-Type': `${isJsonBody ? 'application/json' : 'application/octet-stream'}`,
          Authorization: `Bearer ${options.token}`,
        }
      : {
          ...options.headers,
          Authorization: `Bearer ${options.token}`,
        },
    cache: 'no-store',
  });
  switch (fetchResponse.status) {
    case 200:
    case 201: {
      let responseBody: any = null;

      if (fetchResponse.body !== null) {
        if (isFile) {
          responseBody = await fetchAndReadStream(fetchResponse);
        } else {
          responseBody = await fetchResponse.json();
        }
      }

      const responseHeaders = fetchResponse.headers;
      return {
        status: 200,
        data: responseBody,
        headers: responseHeaders,
      } as FetchResponseOK<ObjectType>;
    }
    case 204:
      return {
        status: 204,
      };
    case 500:
    case 400:
    case 403:
    case 405: {
      const responseError = ((await fetchResponse.json()) as FetchErrorBody).Error;
      return {
        status: 500,
        error: responseError,
      };
    }
    case 401:
      return {
        status: 401,
        error: ApiLocales.UNAUTHORIZED,
      };
    default: {
      const responseDefault = await fetchResponse.json();
      return {
        status: 0,
        response: responseDefault,
      };
    }
  }
};

export const httpRequestGET = async <ObjectType>(
  url: string,
  token: string,
  isFile: boolean = false
): Promise<FetchResponse<ObjectType>> => {
  const options: FetchOptions = await fetchOptions<ObjectType>({
    method: 'GET',
    token: token,
  });

  return await httpRequest(url, options, isFile);
};

export const httpRequestPUT = async <RequestType, ResponseType>(
  url: string,
  token: string,
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  const options: FetchOptions = await fetchOptions<RequestType>({
    method: 'PUT',
    body: body,
    token: token,
  });
  return await httpRequest(url, options);
};

export const httpRequestPATCH = async <RequestType, ResponseType>(
  url: string,
  token: string,
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  const options: FetchOptions = await fetchOptions<RequestType>({
    method: 'PATCH',
    body: body,
    token: token,
  });
  return await httpRequest(url, options);
};

export const httpRequestPOST = async <RequestType, ResponseType>(
  url: string,
  token: string,
  body: RequestType,
  isFile: boolean = false,
  isJsonBody: boolean = false
): Promise<FetchResponse<ResponseType>> => {
  const options: FetchOptions = await fetchOptions<RequestType>({
    method: 'POST',
    body: body,
    token: token,
  });
  return await httpRequest(url, options, isFile, isJsonBody);
};

export const httpRequestDELETE = async <RequestType, ResponseType>(
  url: string,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  const options: FetchOptions = await fetchOptions<RequestType>({
    method: 'DELETE',
    token: token,
  });
  return await httpRequest(url, options);
};
