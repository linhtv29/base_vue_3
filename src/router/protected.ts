import { MainLayout } from "@/components/Layout";

const DashboardView = () => import("@/features/misc/routes/DashboardView.vue");
const UsersView = () => import("@/features/users/routes/UsersView.vue");
const ProfileView = () => import("@/features/users/routes/ProfileView.vue");

export const protectedPaths = [
  {
    path: "",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "users",
    name: "users",
    component: UsersView,
  },
  {
    path: "profile",
    name: "profile",
    component: ProfileView,
  },
];

export const protectedRoutes = [
  {
    path: "/",
    name: "home",
    component: MainLayout,
    children: protectedPaths,
  },
];
