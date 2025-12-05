// src/entities/user/model/userStore.ts
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { ref } from 'vue';

interface User {
  id: string;
  email: string;
}

const COOKIE_NAME = 'jobtrack_session';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  const init = () => {
    const cookie = Cookies.get(COOKIE_NAME);
    if (cookie) {
      try {
        const session = JSON.parse(cookie);
        user.value = session.user;
        isAuthenticated.value = session.isAuthenticated;
      } catch {
        logout();
      }
    }
  };

  const login = (email: string) => {
    const userId = `user-${Date.now()}`;
    const session = {
      user: { id: userId, email },
      isAuthenticated: true,
    };
    Cookies.set(COOKIE_NAME, JSON.stringify(session), { expires: 7 });
    user.value = session.user;
    isAuthenticated.value = true;
    return true;
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    Cookies.remove(COOKIE_NAME);
  };

  init();

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
});
