<script setup lang="tsx">
import { AppNotifications } from "@/components/Notifications";
import { AuthProvider } from "@/providers";
import { useLoading } from "@/stores/loadingSpinner";
import { BaseSpinner } from "@/components/Elements";

const loadingState = useLoading();
</script>

<template>
  <AppNotifications />
  <div
    class="fixed top-0 left-0 bg-white bg-opacity-25 z-50"
    v-if="loadingState.isLoading"
  >
    <div class="w-screen h-screen flex justify-center items-center">
      <BaseSpinner size="xl" />
    </div>
  </div>
  <AuthProvider>
    <slot></slot>
  </AuthProvider>
</template>
