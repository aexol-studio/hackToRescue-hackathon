import { create } from "zustand";

type AppStore = {
  educationOpen: boolean;
  setEducationOpen: (state: boolean) => void;
};

export const useAppStore = create<AppStore>()((set, get) => {
  const setEducationOpen = (state: boolean) => {
    set({ educationOpen: state });
  };

  return {
    educationOpen: false,
    setEducationOpen,
  };
});
