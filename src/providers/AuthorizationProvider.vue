<script setup lang="ts">
import { computed } from "vue";
import {
  useAuthorization,
  type RoleTypes,
} from "@/hooks/useAuthorization";

// TODO: Improve type
type AuthorizationProps = {
  allowedRoles?: RoleTypes[];
  policyCheck?: boolean | undefined;
};

const props = withDefaults(defineProps<AuthorizationProps>(), {
  policyCheck: undefined,
});

const { checkAccess } = useAuthorization();

const canAccess = computed(() => {
  let f = false;

  if (props.allowedRoles) {
    f = checkAccess({ allowedRoles: props.allowedRoles });
  }

  if (
    typeof props.policyCheck !== "undefined" &&
    typeof props.policyCheck === "boolean"
  ) {
    f = props.policyCheck;
  }

  return f;
});
</script>

<template>
  <template v-if="canAccess">
    <slot></slot>
  </template>
  <template v-else>
    <slot name="forbiddenFallback"></slot>
  </template>
</template>
