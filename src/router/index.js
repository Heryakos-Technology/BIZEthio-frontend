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
import CampanyStatus from '@/views/Admin/CampanyStatus.vue'
import CompanyDetail from '@/views/Company/CompanyDetail.vue'
import AdminUsers from '@/views/Admin/AdminUsers.vue';
import MoreCategories from '@/views/Company/MoreCategories.vue';
import CategoryPage from '@/views/Company/CategoryPage.vue';
import CampanySignIn from '@/views/Company/CampanySignIn.vue';
import CompanyPage from '@/views/Company/CompanyPage.vue';

import CampanyLogin from '@/views/Company/CampanyLogin.vue';
import AboutUsPage from '@/views/Users/AboutUsPage.vue';
import ContactUsPage from '@/views/Users/ContactUsPage.vue';




const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { welcome: true },

    },

    // Auth Related Routes
    {
      path: '/registration',
      name: 'RegistrationPage',
      component: RegistrationPage,
      meta: { guest: true },
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
      path: '/next',
      name: 'NextPage',
      component: NextPage,
    },

    {
      path: '/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
      //meta: { auth: true },
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword,
    },

    // User Related Routes
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
      meta: { auth: true },

    },
    {
      path: '/EditProfile',
      name: 'EditProfile',
      component: EditProfile,
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
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUsPage,
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUsPage,
    },

    // Admin Related Routes
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
      // meta: { admin: true },
    },
   
    // Company Related Routes
    {
      path: '/company/:id',
      name: 'CompanyDetail',
      component: CompanyDetail,
    },
    {
      path: '/company/categories',
      name: 'MoreCategories',
      component: MoreCategories,
    },
    {
      path: '/company/categories/:name',
      name: 'CategoryPage',
      component: CategoryPage,
    },
    {
      path: '/company/CampanySignIn',
      name: 'CampanySignIn',
      component: CampanySignIn,
    },
    
    // {
    //   path: '/profile/company/:id',
    //   name: 'CompanyPage',
    //   component: CompanyPage,
    // },
    {
      path: '/profile/company/:id',
      name: 'CompanyPage',
      component: CompanyPage,
    },
    {
      path: '/CampanyLogin',
      name: 'CampanyLogin',
      component: CampanyLogin,
    },
      {
      path: '/admin/CampanyStatus',
      name: 'CampanyStatus',
      component: CampanyStatus,
      // meta: { admin: true },
    },

    // {
    //   path: '/CompanyPage',
    //   name: 'CompanyPage',
    //   component: CompanyPage,
    // },
    
  ],
})


router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const userInfoString = localStorage.getItem("userInfo");

  const userInfo = JSON.parse(userInfoString);

  const user_role = userInfo?.role;
  const userId = userInfo?.id;


  if (user_role === "admin" && to.meta.guest) {
    return { name: "AdminProfile" };
  }
  if (user_role === "admin" && to.meta.auth) {
    return { name: "AdminProfile" };
  }
  if (user_role === "admin" && to.meta.welcome) {
    return { name: "AdminProfile" };
  }

  if (user_role === "user" && to.meta.welcome) {
    return { name: "UserLanding" };
  }
  if (user_role === "user" && to.meta.guest) {
    return { name: "UserLanding" };
  }

  if (!userId && to.meta.auth) {
    return { name: "SignIn" };
  }
});


export default router