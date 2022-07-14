import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";

export const GENERATE_CHECKOUT_TOKEN_LOADING =
  "next-ecommerce/checkout/GENERATE_CHECKOUT_TOKEN_LOADING";
export const GENERATE_CHECKOUT_TOKEN_SUCCESS =
  "next-ecommerce/checkout/GENERATE_CHECKOUT_TOKEN_SUCCESS";
export const GENERATE_CHECKOUT_TOKEN_ERROR =
  "next-ecommerce/checkout/GENERATE_CHECKOUT_TOKEN_ERROR";
export const RESET_CHECKOUT_ERROR =
  "next-ecommerce/checkout/RESET_CHECKOUT_ERROR";
export const CAPTURE_ORDER_SUCCESS =
  "next-ecommerce/checkout/CAPTURE_ORDER_SUCCESS";
export const CAPTURE_ORDER_ERROR =
  "next-ecommerce/checkout/CAPTURE_ORDER_ERROR";

export type Action =
  | GenerateCheckoutTokenLoadingAction
  | GenerateCheckoutTokenSuccessAction
  | GenerateCheckoutTokenErrorAction
  | ResetCheckoutErrorAction
  | CaptureOrderSuccessAction
  | CaptureOrderErrorAction;

export interface GenerateCheckoutTokenLoadingAction {
  readonly type: typeof GENERATE_CHECKOUT_TOKEN_LOADING;
}

export interface GenerateCheckoutTokenSuccessAction {
  readonly type: typeof GENERATE_CHECKOUT_TOKEN_SUCCESS;
  checkoutToken: CheckoutToken;
}

export interface GenerateCheckoutTokenErrorAction {
  readonly type: typeof GENERATE_CHECKOUT_TOKEN_ERROR;
  errorMessage: string;
}

export interface CaptureOrderSuccessAction {
  readonly type: typeof CAPTURE_ORDER_SUCCESS;
  checkoutResponse: CheckoutCaptureResponse;
}

export interface CaptureOrderErrorAction {
  readonly type: typeof CAPTURE_ORDER_ERROR;
  errorMessage: string;
}

export interface ResetCheckoutErrorAction {
  readonly type: typeof RESET_CHECKOUT_ERROR;
}

export interface CheckoutState {
  isLoading: boolean;
  checkoutToken?: CheckoutToken;
  errorMessage?: string;
  checkoutResponse?: CheckoutCaptureResponse;
}
