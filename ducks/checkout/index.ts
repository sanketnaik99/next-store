import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import {
  Action,
  CaptureOrderErrorAction,
  CaptureOrderSuccessAction,
  CAPTURE_ORDER_ERROR,
  CAPTURE_ORDER_SUCCESS,
  CheckoutState,
  GenerateCheckoutTokenErrorAction,
  GenerateCheckoutTokenLoadingAction,
  GenerateCheckoutTokenSuccessAction,
  GENERATE_CHECKOUT_TOKEN_ERROR,
  GENERATE_CHECKOUT_TOKEN_LOADING,
  GENERATE_CHECKOUT_TOKEN_SUCCESS,
  RESET_CHECKOUT_ERROR,
} from "./types";

export const generateCheckoutTokenLoading =
  (): GenerateCheckoutTokenLoadingAction => {
    return { type: GENERATE_CHECKOUT_TOKEN_LOADING };
  };

export const generateCheckoutTokenSuccess = (
  checkoutToken: CheckoutToken
): GenerateCheckoutTokenSuccessAction => {
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

export const captureOrderSuccess = (
  checkoutResponse: CheckoutCaptureResponse
): CaptureOrderSuccessAction => {
  return { type: CAPTURE_ORDER_SUCCESS, checkoutResponse };
};

export const captureOrderError = (
  errorMessage: string
): CaptureOrderErrorAction => {
  return { type: CAPTURE_ORDER_ERROR, errorMessage };
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
    case CAPTURE_ORDER_SUCCESS:
      return {
        ...state,
        checkoutResponse: action.checkoutResponse,
        isLoading: false,
      };
    case CAPTURE_ORDER_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
