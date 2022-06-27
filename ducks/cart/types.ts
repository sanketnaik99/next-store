import { Cart } from "@chec/commerce.js/types/cart";

export const ADD_TO_CART_LOADING = "next-ecommerce/cart/ADD_TO_CART_LOADING";
export const ADD_TO_CART_SUCCESS = "next-ecommerce/cart/ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_ERROR = "next-ecommerce/cart/ADD_TO_CART_ERROR";
export const INITIALIZE_CART = "next-ecommerce/cart/INITIALIZE_CART";
export const UPDATE_CART_LOADING = "next-ecommerce/cart/UPDATE_CART_LOADING";
export const UPDATE_CART_SUCCESS = "next-ecommerce/cart/UPDATE_CART_SUCCESS";
export const UPDATE_CART_ERROR = "next-ecommerce/cart/UPDATE_CART_ERROR";

export type Action =
  | InitializeCartAction
  | AddToCartLoadingAction
  | AddToCartSuccessAction
  | AddToCartErrorAction
  | UpdateCartLoadingAction
  | UpdateCartSuccessAction
  | UpdateCartErrorAction;

export interface AddToCartLoadingAction {
  readonly type: typeof ADD_TO_CART_LOADING;
  productId: string;
}

export interface AddToCartSuccessAction {
  readonly type: typeof ADD_TO_CART_SUCCESS;
  newCart: Cart;
}

export interface AddToCartErrorAction {
  readonly type: typeof ADD_TO_CART_ERROR;
}

export interface InitializeCartAction {
  readonly type: typeof INITIALIZE_CART;
  cart: Cart;
}

export interface UpdateCartLoadingAction {
  readonly type: typeof UPDATE_CART_LOADING;
  productId: string;
}

export interface UpdateCartSuccessAction {
  readonly type: typeof UPDATE_CART_SUCCESS;
  newCart: Cart;
}

export interface UpdateCartErrorAction {
  readonly type: typeof UPDATE_CART_ERROR;
}

export interface CartState {
  cart: Cart;
  isLoading: boolean;
  errorMessage?: string;
  currentProductId?: string;
}
