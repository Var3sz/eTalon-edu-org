'use server';

import { fetchData } from './http-client';

export async function getRequest<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  return await fetchData<T>(url, 'GET', headers);
}

export async function postRequest<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
  return fetchData<T>(url, 'POST', body, headers);
}

export async function putRequest<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
  return fetchData<T>(url, 'PUT', body, headers);
}

export async function patchRequest<T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> {
  return fetchData<T>(url, 'PATCH', body, headers);
}

export async function deleteRequest<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  return fetchData<T>(url, 'DELETE', headers);
}
