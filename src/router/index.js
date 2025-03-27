import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import RegistrationPage from '../views/RegistrationPage.vue'

import UserRegistration1 from '../views/Users/UserRegistration1.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import NextPage from '../views/Users/NextPage.vue'
import SignIn from '../views/Users/SignIn.vue'
// import Verify from '../views/Users/Verify.vue'
// import PasswordStrength from '../views/Users/PasswordStrength.vue'
// import PasswordVesibility from '../views/Users/PasswordVesibility.vue'
// import InputValidation from '../views/Users/InputValidation.vue'


import EditProfile from '@/views/userPage/EditProfile.vue'
import ChangePassword from '@/views/userPage/ChangePassword.vue'
import UserLanding from '@/views/userPage/UserLanding.vue'
import UserProfile from '@/views/userPage/UserProfile.vue'
import AdminProfile from '@/views/Admin/AdminProfile.vue'
import CampanyDashBord from '@/views/Admin/CampanyDashBord.vue'

import AdminCategories from '@/views/Admin/AdminCategories.vue'

import AdminRating from '@/views/Admin/AdminRating.vue'
import CompanyDetail from '@/views/Company/CompanyDetail.vue'




const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },

    {

      path: '/registration',
      name: 'RegistrationPage',
      component: RegistrationPage,
    },
    {

      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
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
    // {
    //   path: '/verify-email',
    //   name: 'Verify',
    //   component: Verify,
    // },
    // {
    //   path: '/InputValidation',
    //   name: 'InputValidation',
    //   component: InputValidation,
    // },

    // {
    //   path: '/PasswordVesibility',
    //   name: 'PasswordVesibility',
    //   component: PasswordVesibility,
    // },

    // {
    //   path: '/PasswordStrength',
    //   name: 'PasswordStrength',
    //   component: PasswordStrength,
    // },



    {
      path: '/EditProfile',
      name: 'EditProfile',
      component: EditProfile,
    },
    {
      path: '/admin/profile',
      name: 'AdminProfile',
      component: AdminProfile,
    },
    {

      path: '/admin/categories',
      name: 'AdminCategories',
      component: AdminCategories,
    },
    {
      path: '/admin/AdminRating',
      name: 'AdminRating',
      component: AdminRating,

    },


    {
      path: '/admin/campany',
      name: 'CampanyDashBord',
      component: CampanyDashBord,
    },
    {
      path: '/company/:id',
      name: 'CompanyDetail',
      component: CompanyDetail,
    },


  ],
})

export default router
