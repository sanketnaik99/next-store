import { Cart } from "@chec/commerce.js/types/cart";
import { Product } from "@chec/commerce.js/types/product";

export const ADD_ITEM_TO_CART = "next-ecommerce/cart/ADD_ITEM_TO_CART";
export const INITIALIZE_CART = "next-ecommerce/cart/INITIALIZE_CART";

export type Action = AddToCartAction | InitializeCartAction;

export interface AddToCartAction {
  readonly type: typeof ADD_ITEM_TO_CART;
  newCart: Cart;
}

export interface InitializeCartAction {
  readonly type: typeof INITIALIZE_CART;
  cart: Cart;
}
