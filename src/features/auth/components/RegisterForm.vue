<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

import { BaseButton } from "@/components/Elements";
import { BaseForm, InputField, SelectField } from "@/components/Form";

import { useAuth } from "@/composables/useAuth";

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

const validationSchema = toTypedSchema(schema)

const { register, isRegistering } = useAuth();
type RegisterFormEmits = {
  (e: "success"): void;
};

const emits = defineEmits<RegisterFormEmits>();

async function onSubmit(values) {
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
        <BaseButton type="submit" :isLoading="isRegistering" class="w-full">
          Register
        </BaseButton>
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
