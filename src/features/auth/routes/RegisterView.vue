<script setup lang="ts">
import { useRouter } from "vue-router";
import AuthLayout from "../components/AuthLayout.vue";
import RegisterForm from "../components/RegisterForm.vue";

const router = useRouter();

const onSuccess = () => {
  router.push({ path: "/" });
};
</script>

<template>
  <AuthLayout title="Register your account">
    <RegisterForm @success="onSuccess" />
  </AuthLayout>
</template>
