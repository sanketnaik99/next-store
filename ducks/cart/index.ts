import { Cart } from "@chec/commerce.js/types/cart";
import {
  Action,
  AddToCartErrorAction,
  AddToCartSuccessAction,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  CartState,
  InitializeCartAction,
  INITIALIZE_CART,
  REMOVE_ITEM_ERROR,
  REMOVE_ITEM_LOADING,
  REMOVE_ITEM_SUCCESS,
  UpdateCartLoadingAction,
  UPDATE_CART_ERROR,
  UPDATE_CART_LOADING,
  UPDATE_CART_SUCCESS,
} from "./types";

export const initializeCart = (cart: Cart): InitializeCartAction => {
  return { type: INITIALIZE_CART, cart };
};

export const addToCartLoading = (productId: string) => {
  return { type: ADD_TO_CART_LOADING, productId };
};

export const addToCartSuccess = (newCart: Cart): AddToCartSuccessAction => {
  return { type: ADD_TO_CART_SUCCESS, newCart };
};

export const addToCartError = (): AddToCartErrorAction => {
  return { type: ADD_TO_CART_ERROR };
};

export const updateCartLoading = (
  productId: string
): UpdateCartLoadingAction => {
  return { type: UPDATE_CART_LOADING, productId };
};

export const updateCartSuccess = (newCart: Cart) => {
  return { type: UPDATE_CART_SUCCESS, newCart };
};

export const updateCartError = () => {
  return { type: UPDATE_CART_ERROR };
};

export const removeItemLoading = (productId: string) => {
  return { type: REMOVE_ITEM_LOADING, productId };
};

export const removeItemSuccess = (newCart: Cart) => {
  return { type: REMOVE_ITEM_SUCCESS, newCart };
};

export const removeItemError = () => {
  return { type: REMOVE_ITEM_ERROR };
};

const initialState: CartState = {
  cart: {
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
  },
  isLoading: false,
  isRemovingItem: false,
};

export const reducer = (
  state: CartState = initialState,
  action: Action
): CartState => {
  switch (action.type) {
    case INITIALIZE_CART:
      return { ...state, cart: { ...action.cart } };
    case ADD_TO_CART_LOADING:
      return { ...state, isLoading: true, currentProductId: action.productId };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: { ...action.newCart },
        isLoading: false,
        currentProductId: "",
      };
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        currentProductId: "",
        errorMessage: "There was an error adding your item to cart",
      };
    case UPDATE_CART_LOADING:
      return {
        ...state,
        isLoading: true,
        currentProductId: action.productId,
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cart: action.newCart,
        currentProductId: "",
      };
    case UPDATE_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        currentProductId: "",
        errorMessage: "There was an error adding your item to cart",
      };
    case REMOVE_ITEM_LOADING:
      return {
        ...state,
        isRemovingItem: true,
        currentProductId: action.productId,
      };
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        cart: action.newCart,
        isRemovingItem: false,
        currentProductId: "",
      };
    case REMOVE_ITEM_ERROR:
      return {
        ...state,
        isRemovingItem: false,
        currentProductId: "",
      };
    default:
      return state;
  }
};

export default reducer;
