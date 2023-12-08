"use client";
import { useStore } from "zustand";
import { useContext, useRef, createContext } from "react";
import { useAppStoreType, AppStoreProps, AppStoreState, createAppStore } from "./useAppStore";

export const AppStoreContext = createContext<useAppStoreType | null>(null);
type StoreContextProps = React.PropsWithChildren<AppStoreProps>;

export function AppStoreProvider({ children, ...props }: StoreContextProps) {
  const storeRef = useRef<useAppStoreType>();
  if (!storeRef.current) {
    storeRef.current = createAppStore(props);
  }
  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
}

export function useAppStore<T>(selector: (state: AppStoreState) => T): T {
  const store = useContext(AppStoreContext);
  if (!store) throw new Error("Missing CartContext.Provider in the tree");
  return useStore(store, selector);
}
