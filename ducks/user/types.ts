export const INIT_LOGIN = "next-ecommerce/users/INIT_LOGIN";
export const GENERATE_LOGIN_TOKEN_SUCCESS =
  "next-ecommerce/users/GENERATE_LOGIN_TOKEN_SUCCESS";
export const GENERATE_LOGIN_TOKEN_ERROR =
  "next-ecommerce/users/GENERATE_LOGIN_TOKEN_ERROR";
export const GET_CUSTOMER_SUCCESS = "next-ecommerce/users/GET_CUSTOMER_SUCCESS";
export const GET_CUSTOMER_ERROR = "next-ecommerce/users/GET_CUSTOMER_ERROR";

export type Action =
  | InitLoginAction
  | GenerateLoginTokenSuccessAction
  | GenerateLoginTokenErrorAction
  | GetCustomerSuccessAction
  | GetCustomerErrorAction;

export interface InitLoginAction {
  readonly type: typeof INIT_LOGIN;
}

export interface GenerateLoginTokenSuccessAction {
  readonly type: typeof GENERATE_LOGIN_TOKEN_SUCCESS;
}

export interface GenerateLoginTokenErrorAction {
  readonly type: typeof GENERATE_LOGIN_TOKEN_ERROR;
  errorMessage: string;
}

export interface GetCustomerSuccessAction {
  readonly type: typeof GET_CUSTOMER_SUCCESS;
  user: User;
}

export interface GetCustomerErrorAction {
  readonly type: typeof GET_CUSTOMER_ERROR;
  errorMessage: string;
}

export interface UserState {
  user: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}
