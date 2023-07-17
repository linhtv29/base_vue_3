<script setup lang="ts">
import { ContentLayout } from "@/components/Layout";
import { useAuthentication } from "@/composables/useAuthentication";

const {user} = useAuthentication();
</script>

<template>
  <ContentLayout title="Dashboard">
    <h1 class="text-xl mt-2">
      Welcome <b>{{ user?.firstName }} {{ user?.lastName }}</b>
    </h1>
    <h4 class="my-3">
      Your role is : <b>{{ user?.role }}</b>
    </h4>
  </ContentLayout>
</template>
