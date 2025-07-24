import { create } from "zustand";

interface StoreState {
  pageLoaded: boolean;
  setPageLoaded: () => void;
}

const useStore = create<StoreState>((set) => ({
  pageLoaded: false,
  setPageLoaded: () => set(() => ({ pageLoaded: true })),
}));

export default useStore;
