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

  // Загрузка пользователя, если он ещё не загружен
  if (!userStore.currentUser) {
    await userStore.loadUserFromDB();
  }

  const isPublicPage = publicPages.includes(to.path);
  const isAuthenticated = !!userStore.currentUser;
  const hasProfile = userStore.hasProfile;

  // Если пользователь не авторизован и страница не публичная — отправляем на логин
  if (!isAuthenticated && !isPublicPage) {
    return next('/login');
  }

  // Если пользователь авторизован, но не прошёл онбординг — перенаправляем на онбординг
  if (isAuthenticated && !hasProfile && to.path !== '/onboarding') {
    return next('/onboarding');
  }

  // Если пользователь авторизован и уже прошёл онбординг — запрет на доступ к login/register/onboarding
  if (isAuthenticated && hasProfile && isPublicPage) {
    return next('/');
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
