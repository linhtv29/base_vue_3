<script lang="ts">
import router from "@/router";
import { protectedPaths } from "@/router/protected";
import { useAuthentication } from "@/composables/useAuthentication";

const {isAuthenticated} = useAuthentication();
const isProtected = (name) => {
  return protectedPaths.find((c) => c.name === name);
};

router.beforeEach((to, from, next) => {
  if (isProtected(to.name) && !isAuthenticated.value) {
    console.log('out');
    next({ name: "login" });
  } else {
    next();
  }
});
</script>

<script setup lang="ts">
import { provideAuth } from "@/composables/useAuth";

const {
  isSuccess,
  isLoading,
  waitInitial,
  isIdle,
  status,
  error,
  LoaderComponent,
  ErrorComponent,
} = provideAuth();
</script>

<template>
  <template v-if="isSuccess || !waitInitial">
    <slot></slot>
  </template>
  <template v-else-if="isLoading || isIdle">
    <component :is="LoaderComponent" />
  </template>
  <template v-else-if="error">
    <component :is="ErrorComponent" :error="error" />
  </template>
  <template v-else>
    <div>Unhandled status: {{ status }}</div>
  </template>
</template>
