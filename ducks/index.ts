import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "./cart";

const reducers = combineReducers({ cart });

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
