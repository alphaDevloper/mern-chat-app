import { create } from "zustand";

const useAuthStore = create((set) => ({
  authUser: { name: "joe", age: 20 },
  isLoading: false,

  login: () => {
    console.log("logged in ");
  },
}));

export default useAuthStore;
