import { useMutation } from "@tanstack/vue-query";

import { axios } from "@/lib/axios";

import type { MutationConfig } from "@/lib/vue-query";

import { useNotificationStore } from "@/stores/notifications";

export type UpdateProfileDTO = {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
  };
};

export const updateProfile = ({ data }: UpdateProfileDTO) => {
  return axios.patch(`/users/profile`, data);
};

type UseUpdateProfileOptions = {
  config?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const store = useNotificationStore();

  return useMutation({
    onSuccess: () => {
      store.add({
        type: "success",
        title: "User Updated",
      });
    },
    ...config,
    mutationFn: updateProfile,
  });
};
