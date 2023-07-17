<script setup lang="ts">
import { RouterLink } from "vue-router";

import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

import { BaseButton } from "@/components/Elements";
import { BaseForm, InputField } from "@/components/Form";

import { registerWithEmailAndPassword } from "..";

type RegisterFormProps = {
  onSuccess: () => void;
};

const props = defineProps<RegisterFormProps>();

const schema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

const validationSchema = toTypedSchema(schema);

type RegisterFormEmits = {
  (e: "success"): void;
};

const emits = defineEmits<RegisterFormEmits>();

const register = async (values: any) => {
  try {
    await registerWithEmailAndPassword(values);
  } catch (error) {
    console.error(error);
  }
};

async function onSubmit(values: any) {
  await register(values);
  emits("success");
}
</script>

<template>
  <div>
    <BaseForm @submit="onSubmit" :validation-schema="validationSchema">
      <InputField name="firstName" type="text" label="First Name" />
      <InputField name="lastName" type="text" label="Last Name" />
      <InputField name="email" type="email" label="Email Address" />
      <InputField name="password" type="password" label="Password" />
      <div>
        <BaseButton type="submit" class="w-full"> Register </BaseButton>
      </div>
    </BaseForm>
    <div class="mt-2 flex items-center justify-end">
      <div class="text-sm">
        <RouterLink
          to="/auth/login"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          Log In
        </RouterLink>
      </div>
    </div>
  </div>
</template>
