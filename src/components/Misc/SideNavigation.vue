<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { HomeIcon, UsersIcon } from "@heroicons/vue/24/outline";
import { useAuthorization, ROLES } from "@/hooks/useAuthorization";
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue";

type SideNavigationItem = {
  name: string;
  to: string;
  icon?:  FunctionalComponent<HTMLAttributes & VNodeProps, {}, any>;
};

const { checkAccess } = useAuthorization();

const navigation = [
  { name: "Dashboard", to: { name: "dashboard" }, icon: HomeIcon },
  checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
    name: "Users",
    to: { name: "users" },
    icon: UsersIcon,
  },
].filter(Boolean) as SideNavigationItem[];

const currentRoute = useRoute();

const isActive = (route: any) => {
  return route.name === "dashboard"
    ? currentRoute.path == route.path
    : currentRoute.path.startsWith(route.path);
};
</script>

<template>
  <RouterLink
    v-slot="{ route }"
    v-for="item in navigation"
    :key="item.name"
    :to="item.to"
  >
    <span
      class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
      :class="isActive(route) && 'bg-gray-900 text-white'"
    >
      <component
        :is="item.icon"
        class="text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6"
        aria-hidden="true"
      />
      {{ item.name }}
    </span>
  </RouterLink>
</template>
