import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import {
  Action,
  CheckoutState,
  GenerateCheckoutTokenErrorAction,
  GenerateCheckoutTokenLoadingAction,
  GENERATE_CHECKOUT_TOKEN_ERROR,
  GENERATE_CHECKOUT_TOKEN_LOADING,
  GENERATE_CHECKOUT_TOKEN_SUCCESS,
  RESET_CHECKOUT_ERROR,
} from "./types";

export const generateCheckoutTokenLoading =
  (): GenerateCheckoutTokenLoadingAction => {
    return { type: GENERATE_CHECKOUT_TOKEN_LOADING };
  };

export const generateCheckoutTokenSuccess = (checkoutToken: CheckoutToken) => {
  return { type: GENERATE_CHECKOUT_TOKEN_SUCCESS, checkoutToken };
};

export const generateCheckoutTokenError = (
  errorMessage: string
): GenerateCheckoutTokenErrorAction => {
  return { type: GENERATE_CHECKOUT_TOKEN_ERROR, errorMessage };
};

export const resetCheckoutError = () => {
  return { type: RESET_CHECKOUT_ERROR };
};

const initialState: CheckoutState = {
  isLoading: false,
  errorMessage: "",
};

export const reducer = (
  state: CheckoutState = initialState,
  action: Action
): CheckoutState => {
  switch (action.type) {
    case GENERATE_CHECKOUT_TOKEN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GENERATE_CHECKOUT_TOKEN_SUCCESS:
      return {
        ...state,
        checkoutToken: action.checkoutToken,
      };
    case GENERATE_CHECKOUT_TOKEN_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    case RESET_CHECKOUT_ERROR:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default reducer;
