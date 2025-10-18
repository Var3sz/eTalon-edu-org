export type FetchResponse<ResponseObjectType> =
  | FetchResponseOK<ResponseObjectType>
  | FetchResponseOKNoContent
  | FetchResponseError
  | FetchResponseUnauthorized
  | FetchDefault;

export type FetchResponseOKNoContent = {
  status: 204;
};

export type FetchResponseOK<ResponseObjectType> = {
  status: 200 | 201;
  data: ResponseObjectType;
  headers: Headers;
};
type FetchResponseError = {
  status: 500;
  error: FetchErrorModel;
};
type FetchResponseUnauthorized = {
  status: 401;
  error: string;
};

type FetchErrorModel = {
  Code: number | null;
  Message: string;
};
export type FetchErrorBody = {
  Error: FetchErrorModel;
};

type FetchDefault = {
  status: 0;
  response: Response;
};
