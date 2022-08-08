import { CustomerOrdersCollection } from "@chec/commerce.js/features/customer";
import {
  Action,
  GenerateLoginTokenErrorAction,
  GenerateLoginTokenSuccessAction,
  GENERATE_LOGIN_TOKEN_ERROR,
  GENERATE_LOGIN_TOKEN_SUCCESS,
  GetCustomerErrorAction,
  GetCustomerOrdersAction,
  GetCustomerOrdersErrorAction,
  GetCustomerOrdersSuccessAction,
  GetCustomerSuccessAction,
  GET_CUSTOMER_ERROR,
  GET_CUSTOMER_ORDERS,
  GET_CUSTOMER_ORDERS_ERROR,
  GET_CUSTOMER_ORDERS_SUCCESS,
  GET_CUSTOMER_SUCCESS,
  InitLoginAction,
  INIT_LOGIN,
  LogoutErrorAction,
  LogoutSuccessAction,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  UpdateCustomerAction,
  UPDATE_CUSTOMER,
  User,
  UserState,
} from "./types";

export const initLogin = (): InitLoginAction => {
  return { type: INIT_LOGIN };
};

export const logoutSuccess = (): LogoutSuccessAction => {
  return { type: LOGOUT_SUCCESS };
};

export const logoutError = (errorMessage: string): LogoutErrorAction => {
  return { type: LOGOUT_ERROR, errorMessage };
};

export const generateLoginTokenSuccess =
  (): GenerateLoginTokenSuccessAction => {
    return { type: GENERATE_LOGIN_TOKEN_SUCCESS };
  };

export const generateLoginTokenError = (
  errorMessage: string
): GenerateLoginTokenErrorAction => {
  return { type: GENERATE_LOGIN_TOKEN_ERROR, errorMessage };
};

export const getCustomerSuccess = (user: User): GetCustomerSuccessAction => {
  return { type: GET_CUSTOMER_SUCCESS, user };
};

export const updateCustomer = (user: User): UpdateCustomerAction => {
  return { type: UPDATE_CUSTOMER, user };
};

export const getCustomerError = (
  errorMessage: string
): GetCustomerErrorAction => {
  return { type: GET_CUSTOMER_ERROR, errorMessage };
};

export const getCustomerOrders = (): GetCustomerOrdersAction => {
  return { type: GET_CUSTOMER_ORDERS };
};

export const getCustomerOrdersSuccess = (
  orders: CustomerOrdersCollection
): GetCustomerOrdersSuccessAction => {
  return { type: GET_CUSTOMER_ORDERS_SUCCESS, orders };
};

export const getCustomerOrdersError = (
  errorMessage: string
): GetCustomerOrdersErrorAction => {
  return { type: GET_CUSTOMER_ORDERS_ERROR, errorMessage };
};

const initialState: UserState = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  isLoading: false,
  isLoggedIn: false,
  errorMessage: "",
  isLoadingOrders: true,
  orders: null,
  ordersError: "",
};

export const reducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state,
        user: {
          firstName: "",
          lastName: "",
          email: "",
        },
        isLoading: true,
        errorMessage: "",
        isLoggedIn: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {
          firstName: "",
          lastName: "",
          email: "",
        },
        isLoading: false,
        errorMessage: "",
        isLoggedIn: false,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        user: {
          firstName: "",
          lastName: "",
          email: "",
        },
        isLoading: false,
        errorMessage: action.errorMessage,
        isLoggedIn: false,
      };
    case GENERATE_LOGIN_TOKEN_SUCCESS:
      return {
        ...state,
        errorMessage: "",
        isLoggedIn: true,
      };
    case GENERATE_LOGIN_TOKEN_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
        isLoggedIn: false,
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        errorMessage: "",
        isLoading: false,
        isLoggedIn: true,
        user: action.user,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        errorMessage: "",
        isLoading: false,
        isLoggedIn: true,
        user: action.user,
      };
    case GET_CUSTOMER_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
        isLoggedIn: false,
        user: {
          firstName: "",
          lastName: "",
          email: "",
        },
      };
    case GET_CUSTOMER_ORDERS:
      return {
        ...state,
        isLoadingOrders: true,
      };
    case GET_CUSTOMER_ORDERS_SUCCESS:
      return {
        ...state,
        isLoadingOrders: false,
        orders: action.orders,
        errorMessage: "",
      };
    case GET_CUSTOMER_ORDERS_ERROR:
      return {
        ...state,
        isLoadingOrders: false,
        orders: null,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
