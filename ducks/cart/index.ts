import { Cart } from "@chec/commerce.js/types/cart";
import {
  Action,
  AddToCartAction,
  ADD_ITEM_TO_CART,
  InitializeCartAction,
  INITIALIZE_CART,
} from "./types";

export const addToCart = (newCart: Cart): AddToCartAction => {
  return { type: ADD_ITEM_TO_CART, newCart };
};

export const initializeCart = (cart: Cart): InitializeCartAction => {
  return { type: INITIALIZE_CART, cart };
};

const initialState: Cart = {
  id: "",
  created: 0,
  expires: 0,
  updated: 0,
  total_items: 0,
  total_unique_items: 0,
  currency: { symbol: "", code: "" },
  subtotal: {
    raw: 0,
    formatted: "",
    formatted_with_code: "",
    formatted_with_symbol: "",
  },
  discount_code: "",
  hosted_checkout_url: "",
  line_items: [],
};

export const reducer = (state: Cart = initialState, action: Action): Cart => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return { ...state, ...action.newCart };
    case INITIALIZE_CART:
      return { ...state, ...action.cart };
    default:
      return state;
  }
};

export default reducer;
