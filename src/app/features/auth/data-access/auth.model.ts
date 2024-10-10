export const initialUserValue: UserState = {
  email: '',
  password: ''
};

export const authInitialState: AuthState = {
  loggedIn: false,
  user: initialUserValue
};

export type AuthState = {
  loggedIn: boolean;
  user: UserState;
};

export interface UserState {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
