'use server';

import { FetchResponse } from '@/api/types/fetch-response';
import { httpRequestGET } from '@/api/models/api';

const getMyProfileUrl = (userId: number) => {
  return `${process.env.SERVER_BASE_URL}user/${userId}`;
};

export const GetMyProfile = async <ResponseType>(
  userId: number,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getMyProfileUrl(userId), token);
};
