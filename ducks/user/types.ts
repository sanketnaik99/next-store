import { CustomerOrdersCollection } from "@chec/commerce.js/features/customer";
import { CheckoutResponseData } from "../checkout/types";

export const INIT_LOGIN = "next-ecommerce/users/INIT_LOGIN";
export const LOGOUT_SUCCESS = "next-ecommerce/users/LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "next-ecommerce/users/LOGOUT_ERROR";
export const GENERATE_LOGIN_TOKEN_SUCCESS =
  "next-ecommerce/users/GENERATE_LOGIN_TOKEN_SUCCESS";
export const GENERATE_LOGIN_TOKEN_ERROR =
  "next-ecommerce/users/GENERATE_LOGIN_TOKEN_ERROR";
export const GET_CUSTOMER_SUCCESS = "next-ecommerce/users/GET_CUSTOMER_SUCCESS";
export const UPDATE_CUSTOMER = "next-ecommerce/users/UPDATE_CUSTOMER";
export const GET_CUSTOMER_ERROR = "next-ecommerce/users/GET_CUSTOMER_ERROR";
export const GET_CUSTOMER_ORDERS = "next-ecommerce/users/GET_CUSTOMER_ORDERS";
export const GET_CUSTOMER_ORDERS_SUCCESS =
  "next-ecommerce/users/GET_CUSTOMER_ORDERS_SUCCESS";
export const GET_CUSTOMER_ORDERS_ERROR =
  "next-ecommerce/users/GET_CUSTOMER_ORDERS_ERROR";

export type Action =
  | InitLoginAction
  | GenerateLoginTokenSuccessAction
  | GenerateLoginTokenErrorAction
  | GetCustomerSuccessAction
  | GetCustomerErrorAction
  | GetCustomerOrdersAction
  | GetCustomerOrdersSuccessAction
  | GetCustomerOrdersErrorAction
  | LogoutSuccessAction
  | LogoutErrorAction
  | UpdateCustomerAction;

export interface InitLoginAction {
  readonly type: typeof INIT_LOGIN;
}

export interface LogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface LogoutErrorAction {
  readonly type: typeof LOGOUT_ERROR;
  errorMessage: string;
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

export interface UpdateCustomerAction {
  readonly type: typeof UPDATE_CUSTOMER;
  user: User;
}

export interface GetCustomerErrorAction {
  readonly type: typeof GET_CUSTOMER_ERROR;
  errorMessage: string;
}

export interface GetCustomerOrdersAction {
  readonly type: typeof GET_CUSTOMER_ORDERS;
}
export interface GetCustomerOrdersSuccessAction {
  readonly type: typeof GET_CUSTOMER_ORDERS_SUCCESS;
  orders: CustomerOrdersCollection;
}

export interface GetCustomerOrdersErrorAction {
  readonly type: typeof GET_CUSTOMER_ORDERS_ERROR;
  errorMessage: string;
}

export interface UserState {
  user: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;
  isLoadingOrders: boolean;
  orders: CustomerOrdersCollection | null;
  ordersError: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}
