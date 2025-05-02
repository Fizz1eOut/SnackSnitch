import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TheLogin from '@/views/LoginView.vue';
import TheRegister from '@/views/RegisterView.vue';
import TheOnboarding from '@/views/OnboardingView.vue';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/login', component: TheLogin, meta: { title: 'Login' } },
    { path: '/register', component: TheRegister, meta: { title: 'Register' } },
    { path: '/onboarding', component: TheOnboarding, meta: { title: 'Onboarding' } },
  ],
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/register', '/onboarding'];
  const userStore = useUserStore();

  if (!userStore.currentUser) {
    await userStore.loadUserFromDB();
  }

  if (!userStore.currentUser && !publicPages.includes(to.path)) {
    return next('/login');
  }

  if (userStore.currentUser && !userStore.hasProfile && to.path !== '/onboarding') {
    return next('/onboarding');
  }

  next();
});

router.afterEach((to) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = title;
  }
});

export default router;
