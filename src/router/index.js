import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserRegistration1 from '../views/Users/UserRegistration1.vue'
import NextPage from '../views/Users/NextPage.vue'
import SignIn from '../views/Users/SignIn.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
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


  ],
})

export default router
