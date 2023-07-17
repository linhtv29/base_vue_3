<script setup lang="ts">
import { BaseButton, ConfirmationDialog } from "@/components/Elements";

import { useAuthentication } from "@/hooks/useAuthentication";
import { deleteUser } from "../api/deleteUser";

type DeleteUserProps = {
  id: string;
};

const props = defineProps<DeleteUserProps>();

const {user} = useAuthentication();

async function onClick() {
  await deleteUser({ userId: props.id })
}
</script>

<template>
  <ConfirmationDialog
    v-if="user?.id !== id"
    icon="danger"
    title="Delete User"
    body="Are you sure you want to delete this user?"
  >
    <template #triggerButton>
      <BaseButton variant="danger">Delete</BaseButton>
    </template>
    <template #confirmButton>
      <BaseButton
        @click="onClick"
        type="button"
        class="bg-red-600"
      >
        Delete User
      </BaseButton>
    </template>
  </ConfirmationDialog>
</template>
