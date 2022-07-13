import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import checkout from "./checkout";

const reducers = combineReducers({ cart, checkout });

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
