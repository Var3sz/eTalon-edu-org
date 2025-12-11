import { FetchResponse } from '../../types/fetch-response';
import { httpRequestPOST } from '../api';

// Ezt módosítsd, ha nem működik a mobil app!!!
export const SERVER_BASE_URL = 'http://172.20.10.2:3001/';

const getLoginUrl = () => {
  return `${SERVER_BASE_URL}auth/login`;
};

export const Login = async <RequestType, ResponseType>(body: RequestType): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST<RequestType, ResponseType>(getLoginUrl(), '', body);
};
