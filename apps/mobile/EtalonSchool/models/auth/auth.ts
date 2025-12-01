export type TokensType = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type User = {
  id: number;
  email: string;
  name: string;
  roleId: number;
  agentKey: string;
  sessionCookie: string;
};

export type LoginDto = {
  username: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  tokens: TokensType;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // timestamp ms-ben
};
