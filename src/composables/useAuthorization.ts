import { useAuthentication } from "./useAuthentication";

export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type RoleTypes = keyof typeof ROLES;

export const useAuthorization = () => {
  const { user } = useAuthentication();

  if (!user.value) {
    throw Error("User does not exist!");
  }

  const checkAccess = ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
    if (allowedRoles && allowedRoles.length > 0) {
      return allowedRoles?.includes(user.value.role);
    }

    return true;
  };

  return { checkAccess, role: user.value.role };
};
