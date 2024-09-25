import { ReactNode } from "react";
import { create } from "zustand";

interface State {
  isModalOpen: boolean;
  toggleModal: () => void;
  modalContent: ReactNode;
  setModalContent: (content: ReactNode) => void;
}

export const useUIStore = create<State>()(set => ({
  isModalOpen: false,
  modalContent: null,
  toggleModal: () => set(state => ({ isModalOpen: !state.isModalOpen })),
  setModalContent: (content: ReactNode) =>
    set(() => ({ modalContent: content }))
}));
