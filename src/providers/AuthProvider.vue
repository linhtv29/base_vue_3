<script lang="ts">
import { useAuthentication } from "@/hooks/useAuthentication";
import router from "@/router";
import { protectedPaths } from "@/router/protected";
import type { RouteRecordName } from "vue-router";

const {isAuthenticated} = useAuthentication();
const isProtected = (name: RouteRecordName | null | undefined) => {
  return protectedPaths.find((c) => c.name === name);
};

router.beforeEach((to, from, next) => {
  if (isProtected(to.name) && !isAuthenticated.value) {
    next({ name: "login" });
  } else {
    next();
  }
});
</script>

<template>
    <slot></slot>
</template>
