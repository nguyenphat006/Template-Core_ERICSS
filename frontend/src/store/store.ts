import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";
import alertReducer from "../store/features/alert/alertSlice"
import { persistReducer, persistStore, Persistor } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key: string, value: unknown) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({ auth: authReducer, alert:alertReducer });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredPaths: ["alert.onConfirm"]
        },
      }),
  });

  const persistor = typeof window !== "undefined" ? persistStore(store) : null;
  return { store, persistor };
};

let storeInstance: ReturnType<typeof makeStore> | null = null;

export const getStore = () => {
  if (!storeInstance) {
    storeInstance = makeStore();
  }
  return storeInstance;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["store"]["dispatch"];
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type { Persistor };
