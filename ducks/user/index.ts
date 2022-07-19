import {
  Action,
  GenerateLoginTokenErrorAction,
  GenerateLoginTokenSuccessAction,
  GENERATE_LOGIN_TOKEN_ERROR,
  GENERATE_LOGIN_TOKEN_SUCCESS,
  GetCustomerErrorAction,
  GetCustomerSuccessAction,
  GET_CUSTOMER_ERROR,
  GET_CUSTOMER_SUCCESS,
  InitLoginAction,
  INIT_LOGIN,
  User,
  UserState,
} from "./types";

export const initLogin = (): InitLoginAction => {
  return { type: INIT_LOGIN };
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

export const getCustomerError = (
  errorMessage: string
): GetCustomerErrorAction => {
  return { type: GET_CUSTOMER_ERROR, errorMessage };
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
    default:
      return state;
  }
};

export default reducer;
