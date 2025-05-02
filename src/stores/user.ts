// src/stores/user.ts
import { defineStore } from 'pinia';
import type { User, UserProfile } from '@/interface/user.interface';
import { getUser } from '@/utils/bd/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    hasProfile: (state) => !!state.currentUser?.profile
  },

  actions: {
    setUser(user: User) {
      this.currentUser = user;
      localStorage.setItem('currentUser', user.username);
    },

    clearUser() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    },

    updateProfile(profile: UserProfile) {
      if (this.currentUser) {
        this.currentUser.profile = profile;
      }
    },

    async loadUserFromDB() {
      const username = localStorage.getItem('currentUser');
      if (username) {
        const user = await getUser(username);
        if (user) this.currentUser = user;
      }
    }
  }
});
