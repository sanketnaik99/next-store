import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import checkout from "./checkout";
import user from "./user";

const reducers = combineReducers({ cart, checkout, user });

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
