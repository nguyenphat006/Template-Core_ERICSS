"use client";

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getStore } from "@/store/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const { store, persistor } = getStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    persistor?.persist();
    setIsHydrated(true);
  }, [persistor]);

  return (
    <Provider store={store}>
      {typeof window !== "undefined" && persistor && isHydrated ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
};

export default StoreProvider;
