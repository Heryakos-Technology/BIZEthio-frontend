import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserRegistration1 from '../views/Users/UserRegistration1.vue'
import NextPage from '../views/Users/NextPage.vue'
import SignIn from '../views/Users/SignIn.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'UserRegistration1',
      component: UserRegistration1,
    },
    {
      path: '/next',
      name: 'NextPage',
      component: NextPage,
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
    },

    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
  ],
})

export default router
