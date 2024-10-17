export interface UserInfo {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const authInitialState: AuthState = {
  loggedIn: false,
  userInfo: null,
};

export type AuthState = {
  loggedIn: boolean;
  userInfo: UserInfo | null;
};

export interface UserState {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
