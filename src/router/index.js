import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLanding from '../views/userPage/UserLanding.vue'
import UserProfile from '../views/userPage/UserProfile.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'
// import footer from '../components/footer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },    
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
    },
    
    {
      path: '/UserLanding',
      name: 'UserLanding',
      component: UserLanding,
    },
    {
      path: '/registration',
      name: 'RegistrationPage',
      component: RegistrationPage,
    },
    // {
    //   path: '/footer',
    //   name: 'footer',
    //   component: footer,
    // },
    
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
