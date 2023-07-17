<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";

import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

import { BaseButton } from "@/components/Elements";
import { BaseForm, InputField } from "@/components/Form";

import { loginWithEmailAndPassword, type LoginCredentialsDTO } from "..";
import { useLoading } from "@/stores/loadingSpinner";
import { setAuthInfo } from "@/utils/storage";

const router = useRouter();
const loadingState = useLoading();
const validationSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),
  })
);

type LoginFormEmits = {
  (e: "success"): void;
};

const emits = defineEmits<LoginFormEmits>();

const login = async (values: LoginCredentialsDTO) => {
  try {
    loadingState.isLoading = true;
    const response = await loginWithEmailAndPassword(values);
    setAuthInfo(response);
    router.push({name: "home"});
  } catch (error) {
    console.error(error);
  } finally {
    loadingState.isLoading = false;
  }
};
async function onSubmit(values: LoginCredentialsDTO) {
  await login(values);
  emits("success");
}
</script>

<template>
  <BaseForm @submit="onSubmit" :validation-schema="validationSchema">
    <InputField name="email" type="email" label="Email Address" />
    <InputField name="password" type="password" label="Password" />
    <div>
      <BaseButton type="submit" class="w-full"> Log in </BaseButton>
    </div>
  </BaseForm>
  <div class="mt-2 flex items-center justify-end">
    <div class="text-sm">
      <RouterLink
        to="/auth/register"
        class="font-medium text-blue-600 hover:text-blue-500"
      >
        Register
      </RouterLink>
    </div>
  </div>
</template>
