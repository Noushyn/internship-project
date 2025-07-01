import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import chartReducer from "./chartSlice";
import usersReducer from "./usersSlice";
import productsReducer from "./productsSlice.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  charts: chartReducer,
  users: usersReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
