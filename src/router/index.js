import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import RegistrationPage from '../views/RegistrationPage.vue'

import UserRegistration1 from '../views/Users/UserRegistration1.vue'
import NextPage from '../views/Users/NextPage.vue'
import SignIn from '../views/Users/SignIn.vue'
// import AboutView from '@/views/AboutView.vue'
import EditProfile from '@/views/userPage/EditProfile.vue'
import ChangePassword from '@/views/userPage/ChangePassword.vue'
import UserLanding from '@/views/userPage/UserLanding.vue'
import UserProfile from '@/views/userPage/UserProfile.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {

      path: '/registration',
      name: 'RegistrationPage',
      component: RegistrationPage,
    },
    
{
      path: '/signup',
      name: 'UserRegistration1',
      component: UserRegistration1,
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword,
    },
    {
      path: '/UserProfile',
      name: 'UserProfile',
      component: UserProfile,
    },
    {
      path: '/UserLanding',
      name: 'UserLanding',
      component: UserLanding,
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
      path: '/EditProfile',
      name: 'EditProfile',
      component: EditProfile,
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutView
    // },
  ],
})

export default router
