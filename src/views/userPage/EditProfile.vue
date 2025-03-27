<template>
  <UserLayout>
    <div class="lg:px-20 mb-40 lg:w-9/10 lg:mx-auto lg:pt-24 lg:pb-40">
      <div class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl">
        <p class="font-semibold lg:font-bold lg:ml-4">Edit Profile</p>
        <div class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[350px] w-11/12 lg:w-8/9 mx-auto mb-4 rounded-2xl p-20">
          <!-- <div class="ml-28">
            <div class="w-20 h-8 rounded-bl-4xl bg-white absolute top-0 right-0 rounded-tr-xl border-2 border-[#176678] text-[#1B7B90] text-xs font-semibold text-center pt-1">
              <p>Approved</p>
            </div>
          </div> -->
          <div class="flex lg:-ml-20">
            <img :src="userInformations.profile_picture_url" alt="Profile Picture"
                 class="-ml-18 -mt-6 w-16 h-16 rounded-full md:w-24 md:h-24 md:ml-10 lg:w-64 lg:h-64 lg:-mt-16">
            <i class="fa-solid fa-camera-retro text-gray-200 mt-6 -ml-3 md:text-lg md:-ml-2 md:mt-10 lg:text-2xl lg:mt-32 lg:-ml-8"></i>
            <div class="text-white -mt-6 lg:ml-10 -ml-2 w-11/12">
              <div class="flex ml-4 w-56 mt-6 md:ml-20">
                <div class="text-[12px] font-normal text-gray-100 md:text-[16px]">
                  <p class="mb-3">Name</p>
                  <p class="mb-3">Email</p>
                  <p class="mb-2">Phone</p>
                  <p class="mb-3">City</p>
                  <p class="mb-3">Subcity</p>
                  <p class="mb-3">Location</p>
                </div>
                <div class="text-[12px] w-5/6 font-normal text-gray-100 -mt-4 ml-5 md:text-[16px]">
                  <input type="text" v-model="userInformations.name" class="border-b-2 w-56 outline-none h-9" placeholder="Enter your name"/>
                  <input type="email" v-model="userInformations.email" class="border-b-2 w-56 outline-none h-9" placeholder="Enter your email"/>
                  <input type="text" v-model="userInformations.phone_number" class="border-b-2 w-56 outline-none h-9" placeholder="Enter your phone number"/>
                  <input type="text" v-model="userInformations.city" class="border-b-2 w-56 outline-none h-9" placeholder="Enter your city"/>
                  <input type="text" v-model="userInformations.sub_city" class="border-b-2 w-56 outline-none h-9" placeholder="Enter your subcity"/>
                  <input type="text" v-model="userInformations.location" class="border-b-2 w-56 outline-none h-9" placeholder="Enter your location"/>
                </div>
              </div>
            </div>
          </div>
          <div class="flex -ml-14 md:h-10 mt-10 lg:mt-2 w-80 lg:w-full md:w-full md:-mt-1 md:mx-auto">
            <div class="flex ml-16 bg-[#075E86] rounded-lg px-4 w-16 h-10 md:10 md:ml-72 lg:-ml-10 lg:w-20 lg:mx-auto">
              <button @click="backToProfile" class="text-[14px] font-normal text-white lg:text-center ml-2 cursor-pointer">back</button>
            </div>
            <div class="flex bg-[#075E86] w-36 py-2 px-2 rounded-lg ">
              <router-link to="/ChangePassword" class="text-[14px] text-center w-30 mx-auto lg:mt- font-normal text-white">Change Password</router-link>
            </div>
            <div class="flex ml-16 bg-[#075E86] rounded-lg px-4 w-16 h-10 md:10 md:ml-72 lg:ml-10 lg:w-20 lg:mx-auto">
              <button @click="saveUserInfo" class="text-[14px] font-normal text-white lg:text-center ml-2">Save</button>
            </div>

        </div>
        </div>
      </div>
    </div>
  </UserLayout>
  </template>
  
  <script>
  import axios from 'axios';
  import UserLayout from '@/layout/UserLayout.vue'
  export default {
    components:{
      UserLayout
    },
    data() {
      return {
        userInformations: {}, 

      };
    },
    mounted() {
      this.fetchUserInfo();

    },
    methods: {
      async fetchUserInfo() {
        try {
          const userId = localStorage.getItem('user_id'); 
          if (!userId) {
            console.error('User ID not found in localStorage');
            return; 
          }
  
          const response = await axios.get(`https://bizethio-backend-production.up.railway.app/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
          });
  
          this.userInformations = response.data; 
          console.log('User Informations:', this.userInformations);
        } catch (error) {
          console.error('Error fetching user information:', error); 
        }
      },
      async saveUserInfo() {
        try {
          const userId = localStorage.getItem('user_id');
          const response = await axios.put(`https://bizethio-backend-production.up.railway.app/api/users/${userId}`, this.userInformations, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('User Information updated:', response.data);
          alert('Profile updated successfully!');
        } catch (error) {
          console.error('Error updating user information:', error);
          alert('Failed to update profile.');
        }
      },

      backToProfile(){
        this.$router.push('/UserProfile')
      }
    }
  }
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>