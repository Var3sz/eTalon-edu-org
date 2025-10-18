import { FetchResponse } from '../../types/fetch-response';
import { httpRequestPOST } from '../api';

const getLoginUrl = () => {
  return `http://172.20.10.2:3001/auth/login`;
};

export const Login = async <RequestType, ResponseType>(body: RequestType): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST<RequestType, ResponseType>(getLoginUrl(), '', body);
};
