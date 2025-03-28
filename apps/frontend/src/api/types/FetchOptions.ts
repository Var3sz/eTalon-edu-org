import { ContentTypeConstantType } from './ContentTypes';
import { HTTPMethodConstantType } from './HTTPMethods';

// Fetch Request Builder Type

export type FetchOptionBuilder<T> = {
  method: HTTPMethodConstantType;
  token: string;
  body?: T;
  headers?: FetchHeaders;
  isFile?: boolean;
};

// Fetch Request Types

export type FetchOptions =
  | FetchOptionBase // GET - DELETE
  | (FetchOptionBase & FetchBody); // POST - PUT - PATCH

export type FetchOptionBase = {
  method: HTTPMethodConstantType;
  headers: FetchHeaders;
  token: string;
};

type FetchBody = {
  // POST - PUT - PATCH
  body: any;
};

type FetchHeaders = {
  // GET - DELETE
  'Content-Type'?: ContentTypeConstantType;
  'Cache-Control'?: 'no-cache';
  cache?: 'no-store';
};
