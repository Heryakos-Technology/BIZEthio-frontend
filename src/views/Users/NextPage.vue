<template>
 

    <div class="px-2 py-5">
      <div class="bg-white rounded-sm pb-10 lg:hidden">
        <img src="/public/logo.png" alt="" class="mx-auto pt-5">
        <h1 class="text-center mt-8 text-xl">Create an account</h1>
        <div class="flex justify-between w-1/3 mx-auto text-gray-400 mt-4 md:w-1/5 md:mx-auto">
          <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
          <div><i class="fa-brands fa-twitter text-2xl"></i></div>
          <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
        </div>
        <p class="text-gray-400 text-center mt-4">Fill the form for registration</p>
        <div class="w-2/3 mx-auto mt-10">
          <div class="mt-9">
            <div class="flex">
              <div><p>Password</p></div>
              <div><p class="text-red-400 mt-1 ml-1">*</p></div>
            </div>
            <div class="mt-2">
              <input type="password" class="focus:outline-none pl-3 border-2 rounded-md border-blue-300 w-13/13 md:h-12" v-model="model.user.password">
            </div>
          </div>
          <div class="mt-9">
            <div class="flex">
              <div><p>Confirm password</p></div>
              <div><p class="text-red-400 mt-1 ml-1">*</p></div>
            </div>
            <div class="mt-2">
              <input type="password" class="focus:outline-none pl-3 border-2 rounded-md border-blue-300 w-13/13 md:h-12" v-model="model.user.password_confirmation">
            </div>
          </div>
          <div class="mt-9">
            <div class="flex">
              <div><p>Profile picture</p></div>
             
            </div>
            <div class="mt-2 w-13/13">
              <input type="file" class="border focus:outline-none  er-2 rounded-md pl-3 pt-1 border-blue-300 w-13/13 md:h-12" @change="handleFileUpload" accept="image/*">
              <p class="text-center mt-5 text-cyan-500">{{ uploaded }}</p>
              <button @click="uploadFile" style="background: linear-gradient(to bottom left, #8AE4FF 0%, #FFFFFF 48%, #00D2EA 98%);" class=" text-black px-6 py-1 rounded-sm mt-5 w-1/2 text-sm mx-auto cursor-pointer">Upload File</button>
            </div>
            <div style="background: linear-gradient(to bottom left, #8AE4FF 0%, #FFFFFF 48%, #00D2EA 98%);" class="rounded-xl shadow-md w-13/14 pb-5  mx-auto pt-7 pr-4 mt-16 md:w-3/4">
      <div class="flex justify-between">
          <div class="w-1/3">
              <img src="/public/logo.png" alt="">
          </div>
          <div class="md:w-2/3 ml-4"> 
              <p class="">Privacy Information</p>
          </div>
      </div>
      <div>
  <p class="w-7/8 md:w-2/3 text-center mx-auto mt-4 text-sm">At [Business Name], 
  we prioritize your privacy and
  are committed to protecting 
  your personal information.</p>
      </div>
  </div>
  <p class="text-red-400">{{ checkboxMessage }}</p>
  <div class="flex mt-10 md:w-1/2 md:mx-auto" >
    <div class="mr-2 ">
        <input type="checkbox" class="focus:outline-none pl-3 border border-cyan-300">
    </div>
   
    <div class="w-11/12"><p class=" text-sm">agree with terms and agreements</p></div>
  </div>
         
          <div class="mx-auto w-1/2 mt-6 md:w-1/3 md:mx-auto">

              <button  @click="handleRegister" class="bg-cyan-700 text-white px-8 py-2 rounded-sm cursor-pointer" >Submit</button>

              

          </div>
          <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm text-center"> Do you have an account ? <span class="text-cyan-500 ">Login</span> </p>

          </div>
          <!-- <div class="mt-5 w-12/13 mx-auto md:w-2/3 md:mx-auto">
              <p class="md:text-lg text-sm text-center"> Do you have an account ? <span class="text-cyan-500 cursor-pointer">Login</span> </p>
          </div> -->
          <p class="text-gray-400 text-center" @click="()=>{this.$router.push('/signup')}">Back to previous page</p>
      </div>
      </div>
           
          </div>
         
         
        </div>
        
      <div class="hidden lg:block w-2/3 mx-auto pb-20 pt-10">
  <div class="flex justify-between">
  <div class="bg-[#BDE5F2] rounded-l-md px-10 pt-20 w-1/2 pb-20">
  <div class="w-2/3 mx-auto">
      <img src="/public/logolarge.png" alt="">
  </div>
  <h1 class="mt-20 text-center font-bold w-3/4">Elevate Your Business Online</h1>
  <p class="text-sm w-10/11 mx-auto mt-16">An online platform designed to showcase your 
  products and services, connect with customers,
  and enhance your brand's visibility. This website 
  serves as a critical tool for engaging with your
  audience, providing essential information, and 
  facilitating transactions. It typically includes 
  features such as an about page, product listings, 
  a blog for content marketing, customer
  testimonials, and contact information to fost
  er communication and trust.</p>
  <div style="background: linear-gradient(to bottom left, #8AE4FF 0%, #FFFFFF 48%, #00D2EA 98%);" class="rounded-xl shadow-md w-5/6 pb-5 mx-auto pt-7 pr-4 mt-30">
      <div class="flex justify-between">
          <div class="w-1/3">
              <img src="/public/logo.png" alt="">
          </div>
          <div class=""> 
              <p class="">Privacy Information</p>
          </div>
      </div>
      <div>
  <p class="w-7/8 text-center mx-auto mt-4">At [Business Name], 
  we prioritize your privacy and
  are committed to protecting 
  your personal information.</p>
      </div>
  </div>
  </div>
  <div class="bg-white rounded-r-md w-2/3 mx-auto px-10 pb-20">
  <h1 class="mt-10 w-1/2 mx-auto text-xl text-center">Create and account</h1>
  <div class="flex justify-between w-1/4 mx-auto text-gray-400 mt-7">
      <div><i class="fa-brands fa-facebook-f text-2xl"></i></div>
      <div><i class="fa-brands fa-twitter text-2xl"></i></div>
      <div><i class="fa-brands fa-linkedin-in text-2xl"></i></div>
  </div>
  <p class="w-1/2 text-center mx-auto mt-6 text-gray-400">fill the form for registration</p>
  <div>
      <div class="mt-4">
              <div class="flex">
                  <div>
  
                      <p>Password </p>
                  </div>
                  <div>
                      <p class="text-red-400 mt-1 ml-1">*</p>
                  </div>
              </div>
              <div class="mt-2 ">

                  <input type="password" class="border focus:outline-none pl-3 er-2 rounded-xl border-blue-300 w-13/13 md:h-12" v-model="model.user.password">

              </div>
          </div>
          <div class="mt-9">
              <div class="flex">
                  <div>
  
                      <p>Confirm password </p>
                  </div>
                  <div>
                      <p class="text-red-400 mt-1 ml-1">*</p>
                  </div>
              </div>
              <div class="mt-2 ">

                  <input type="password" class="border focus:outline-none pl-3 er-2 rounded-xl border-blue-300 w-13/13 md:h-12" v-model="model.user.password_confirmation">

              </div>
          </div>
        
          <div class="mt-9">
            <div class="flex">
                  <div>
  
                      <p>Profile picture </p>
                  </div>
                  
              </div>
              <div class="mt-2 ">

                  <input type="file" class="border focus:outline-none pl-3 er-2 rounded-xl  pt-2 border-blue-300 w-13/13 md:h-12 relative" @change="handleFileUpload" accept="image/" >
                  <button @click="uploadFile" style="background: linear-gradient(to bottom left, #8AE4FF 0%, #FFFFFF 48%, #00D2EA 98%);" class=" text-black px-8 py-2 rounded-md h-1/17  absolute top-126 left-240 cursor-pointer">Upload File</button>

              </div>
          </div>
          <p class="text-center mt-5 text-cyan-500">{{ uploaded }}</p>
          <div class="mt-9">
            <p class="text-red-400">{{ checkboxMessage }}</p>
              <div class="flex w-3/4 mx-auto">
                <div class="mt-2 ">
                  <input type="checkbox" id="myCheckbox" class="focus:outline-none pl-3 border-2 rounded-xl border-blue-300  md:h-12">
              </div>
              
              <p class="mt-4 ml-3">agree with terms and agreements</p>
              </div>
              
          </div>
        

          <div class="mx-auto w-1/2 mt-4 md:w-1/3 md:mx-auto">
            <p  class="text-red-400 lg:w-25/10 -ml-30 mb-5">{{ errors }}</p>
              <button  @click="handleRegister" class="bg-cyan-700 text-white px-14 py-2 rounded-sm text-lg cursor-pointer" >Submit</button>
              <p class="text-cyan-500 underline text-center w-12/11 mt-4 cursor-pointer" @click="()=>{this.$router.push('/signup')} ">Back to previous page</p>

          </div>
         
  </div>
  </div>
  <div>
     
  </div>
  </div>
  </div>
 

  </template>
  
  <script>

import axios from 'axios';
import { ref } from 'vue';
import { login, register } from '../../auth';
import { useRouter } from 'vue-router';
import CryptoJS from 'crypto-js'; // Import CryptoJS

export default {
  setup() {
    const base_url = 'https://bizethio-backend-production.up.railway.app/api';
    
    const model = ref({
      user: {
        name: "",
        email: "",
        phone_number: "",
        city: "",
        sub_city: "",
        location: "",
        password: "",
        password_confirmation: "",
        verification_status: "unverified",
        profile_picture_url: "",
        role: "user",
        is_banned: 1,
      }
    });
    const router = useRouter();
    const file = ref(null);
    const uploadPreset = 'ml_default';
    const cloudName = 'dzofoegwf';
    const errors = ref('');
    const uploaded = ref('');
    const checkboxMessage = ref('');
    const registered = ref(false)

    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };

    const uploadFile = async () => {
      uploaded.value = 'Uploading...';
      if (!file.value) return;

      const timestamp = Math.floor(Date.now() / 1000);
      const params = {
        timestamp,
        upload_preset: uploadPreset,
      };

      const { signature } = generateSignature(params);

      const formData = new FormData();
      formData.append('file', file.value);
      formData.append('upload_preset', uploadPreset);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('api_key', '734174595538154');


      try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
        uploaded.value = 'Photo Uploaded Successfully';
        console.log('Upload response:', response.data.secure_url);
        model.value.user.profile_picture_url = response.data.secure_url;
      } catch (error) {
        uploaded.value = 'Failed to upload photo';
        console.error('Error uploading file:', error.response.data);
      }
    };

    const generateSignature = (params) => {
      const apiSecret = 'A5D7SF1aLxGmy_TUAao-iA5C3rM';
      const sortedParams = Object.entries(params)
        .sort()
        .map(([key, value]) => `${key}=${value}`)
        .join('&') + apiSecret;

      const signature = CryptoJS.SHA1(sortedParams).toString(CryptoJS.enc.Hex);
      return { signature };
    };

   

    const handleRegister = async () => {
  const checkbox = document.getElementById('myCheckbox');
  if (!checkbox.checked) {
    checkboxMessage.value = "Please agree to the terms and agreements to proceed";
    return;
  }

  checkboxMessage.value = '';
  const formData = new FormData();
  formData.append('name', localStorage.getItem('name'));
  formData.append('email', localStorage.getItem('email'));
  formData.append('phone_number', localStorage.getItem('phone_number'));
  formData.append('city', localStorage.getItem('city'));
  formData.append('sub_city', localStorage.getItem('sub_city'));

  const locationData = localStorage.getItem('location');
  let parsedLocation;
  try {
    parsedLocation = JSON.parse(locationData);
  } catch (error) {
    console.error('Error parsing location data:', error);
  }
  if (parsedLocation) {
    formData.append('location', JSON.stringify(parsedLocation));
  } else {
    console.warn('No valid location data found to append.');
  }

  formData.append('password', model.value.user.password);
  formData.append('password_confirmation', model.value.user.password_confirmation);
  formData.append('verification_status', model.value.user.verification_status);
  formData.append('is_banned', model.value.user.is_banned);
  formData.append('role', model.value.user.role);
  formData.append('profile_picture_url', model.value.user.profile_picture_url);

  try {
    const response = await axios.post(`${base_url}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('User created successfully', response.data);
    registered.value = true;

    // Proceed to Firebase registration
    await register(localStorage.getItem('email'), model.value.user.password);
    alert('Registered successfully on Firebase!');
    
    // Redirect after successful registration
    router.push('/signin');
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data.message : 'An error occurred. Please try again.');
    errors.value = error.response.data.message;
    console.log('errors', errors.value);
  }
};
    return {
      base_url,
      model,
      file,
      uploadPreset,
      cloudName,
      errors,
      uploaded,
      checkboxMessage,
      handleFileUpload,
      uploadFile,
      handleRegister,
      // handleRegister,
    };
  },
};
</script>