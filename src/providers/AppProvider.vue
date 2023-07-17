<script setup lang="tsx">
import VErrorBoundary from "vue-error-boundary";

import { ErrorFallback } from "@/components/Error";
import { AppNotifications } from "@/components/Notifications";
import { AuthProvider } from "@/providers";
import { useLoading } from "@/stores/loadingSpinner";

const loadingState = useLoading();
</script>

<template>
  <VErrorBoundary :fall-back="ErrorFallback">
    <AppNotifications />
    <div v-if="loadingState.isLoading" class="w-screen h-screen flex justify-center items-center">
      <BaseSpinner size="xl" />
    </div>
    <AuthProvider>
      <slot></slot>
    </AuthProvider>
  </VErrorBoundary>
</template>
