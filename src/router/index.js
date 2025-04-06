import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "@/stores/auth";
import RegistrationPage from '../views/RegistrationPage.vue'

import UserRegistration1 from '../views/Users/UserRegistration1.vue'
import Social from '../views/Users/Social.vue'

import FileUpload from '../views/Users/FileUpload.vue'

import ForgotPassword from '../views/ForgotPassword.vue'
import NextPage from '../views/Users/NextPage.vue'
import SignIn from '../views/Users/SignIn.vue'



import EditProfile from '@/views/userPage/EditProfile.vue'
import ChangePassword from '@/views/userPage/ChangePassword.vue'
import UserLanding from '@/views/userPage/UserLanding.vue'
import UserProfile from '@/views/userPage/UserProfile.vue'
import AdminProfile from '@/views/Admin/AdminProfile.vue'
import CampanyDashBord from '@/views/Admin/CampanyDashBord.vue'

import AdminCategories from '@/views/Admin/AdminCategories.vue'

import AdminRating from '@/views/Admin/AdminRating.vue'
import CompanyDetail from '@/views/Company/CompanyDetail.vue'
import AdminUsers from '@/views/Admin/AdminUsers.vue';




const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { welcome: true },

    },

    {

      path: '/registration',
      name: 'RegistrationPage',
      component: RegistrationPage,
      meta: { guest: true },

    },
    {

      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: { auth: true },

    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      meta: { guest: true },

    },


    {
      path: '/signup',
      name: 'UserRegistration1',
      component: UserRegistration1,
      meta: { guest: true },

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
      meta: { auth: true },

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
      path: '/Social',
      name: 'Social',
      component: Social,
    },


    {
      path: '/FileUpload',
      name: 'FileUpload',
      component: FileUpload,
    },

    {
      path: '/EditProfile',
      name: 'EditProfile',
      component: EditProfile,
    },
    {
      path: '/admin/profile',
      name: 'AdminProfile',
      component: AdminProfile,
      meta: { admin: true },

    },
    {

      path: '/admin/categories',
      name: 'AdminCategories',
      component: AdminCategories,
      meta: { admin: true },
    },
    {
      path: '/admin/Rating',
      name: 'AdminRating',
      component: AdminRating,
      meta: { admin: true },

    },
    {
      path: '/admin/users',
      name: 'AdminUsers',
      component: AdminUsers,
      meta: { admin: true },

    },


    {
      path: '/admin/campany',
      name: 'CampanyDashBord',
      component: CampanyDashBord,
      meta: { admin: true },
    },

    {
      path: '/company/:id',
      name: 'CompanyDetail',
      component: CompanyDetail,
    },


  ],
})


router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const user_role = localStorage.getItem("user_role");
  const userId = localStorage.getItem("user_id");



  if (user_role === "admin" && to.meta.guest) {
    return { name: "AdminProfile" };
  }
  if (user_role === "admin" && to.meta.auth) {
    return { name: "AdminProfile" };
  }
  if (user_role === "admin" && to.meta.welcome) {
    return { name: "AdminProfile" };
  }

  if (!userId && to.meta.auth) {
    return { name: "SignIn" };
  }
  if (userId && to.meta.welcome) {
    return { name: "UserLanding" };
  }
  if (userId && to.meta.guest) {
    return { name: "UserLanding" };
  }
});


export default router
