<script setup lang="ts">
import { removeToken } from "@/utils/storage";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionRoot,
} from "@headlessui/vue";
import { UserIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";

const router = useRouter();

type UserNavigationItem = {
  name: string;
  onClick?: () => void;
};

const logout = () => {
  removeToken()
  router.push({ name: "login" });
}
const userNavigation = [
  { name: "Your Profile", onClick: () => router.push({ name: "profile" }) },
  {
    name: "Sign out",
    onClick: () => logout(),
  },
];
</script>

<template>
  <Menu as="div" class="ml-3 relative">
    <div>
      <MenuButton
        class="max-w-xs bg-gray-200 p-2 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span class="sr-only">Open user menu</span>
        <UserIcon class="h-8 w-8 rounded-full" />
      </MenuButton>
    </div>
    <TransitionRoot
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        static
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem
          v-for="item in userNavigation"
          v-slot="{ active }"
          :key="item.name"
          as="div"
        >
          <div
            @click="item.onClick"
            :class="{ 'bg-gray-100': active }"
            class="block px-4 py-2 text-sm text-gray-700"
          >
            {{ item.name }}
          </div>
        </MenuItem>
      </MenuItems>
    </TransitionRoot>
  </Menu>
</template>
