import { defineStore } from "pinia";

export const useLoading = defineStore("loadingSpinner", {
  state: () => ({
    isLoading: false,
  }),
  actions: {},
});
