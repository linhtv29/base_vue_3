import type { AuthUser } from '@/features/auth';
import { getCookie, getUserInfo, removeToken } from '@/utils/storage';
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';


interface State {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export function useAuthentication() {
  const router = useRouter();
  const state = reactive<State>({
    isAuthenticated: false,
    user: null,
  });

  function checkAuthentication() {
		state.isAuthenticated = !!getCookie("authUser");
		state.user = getUserInfo()
  }
  checkAuthentication();

  function logout() {
		removeToken()
		console.log("logout");
    state.isAuthenticated = false;
    state.user = null;
    router.push('/auth/login'); // Chuyển hướng đến trang đăng nhập
  }

  return {
    ...toRefs(state),
    logout,
  };
}
