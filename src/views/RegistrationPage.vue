<template>
  <div class="border-b-1 border-b-gray-600 py-2">
    <img src="/BIZEthio-logo.png" alt="" class="w-26 pt-1 ml-4">
  </div>
  <div class="block md:hidden">
    <p class="text-center text-2xl mt-4">Welcome to <span class="text-[#2178AC]">BIZEthio</span></p>
    <p class="text-sm font-medium px-10 text-center mt-2">Connect, Discover, and Grow with AI-Powered Local Business Listings!</p>
  </div>
  <!-- mobile view -->
  <div class="block md:hidden">
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Owner name</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="owner_name" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Company name</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="name" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-7 mt-4">
      <div class="flex">
          <p class="">Description</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="description" type="textArea" class="w-80 h-32 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Contact Phone</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="contact_phone" type="number" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Website</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="website" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Email</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="contact_email" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Website</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">License URL</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="license_url" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Operating Hours</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="operating_hours" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Country</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="country" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Address</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="address" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">Region</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="region" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
  
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
          <p class="">City</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="city" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
    
    <div class="px-7 mt-4">
      <div class="flex">
          <p class="">Social Media Links</p>
          <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4">
      <input type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4">
      <input type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4">
    </div>
    <button class="bg-[#2178AC] mb-8 ml-8 py-2 px-2 rounded-md text-white text-sm">add social media link </button>
    <div class="">
      <img src="/footer-image.png" alt="" class="-ml-26 -mt-16">
      <div class="-mt-40 -ml-8">
        <button class="bg-[#2178AC] mb-32 ml-40 py-3 px-10 -mt-80 rounded-md text-white text-md">Register Company</button>
      </div>
    </div>
    </div>
  <!-- /end of mobile view -->

  <!-- desktop -->
   
  <div class="hidden md:block px-4">
    <div class="flex">
      <div class=" bg-gradient-to-r from-[#0071FF] to-[#2178AC] w-1/3 -ml-4">
        <p class="text-2xl font-medium text-white mt-16 w-11/12 px-10 text-center">Connect, Discover, and Grow with AI-Powered Local Business Listings!</p>
        <div style="height: 300px" class=" ml-10 mt-6 rounded-3xl w-56 bg-gradient-to-b from-[#e8fffe] to-[#00D2EA] shadow-sm">
          <i class="fa-solid fa-robot text-4xl mt-16 text-[#2178AC] ml-4"></i>
          <p class="font-semibold text-lg ml-6 mt-4">AI-Powered Experience</p>
          <p class="font-medium text-sm mt-2 mb-2 text-center">Smarter Searches, Better Results</p>
          <p class="text-xs mt-4 w-48 text-center mx-auto">Our AI-driven platform helps you discover the best businesses with personalized recommendations.</p>
        </div>

        <div class="h-48 mb-20  mt-10 ml-4 shadow-sm rounded-4xl w-11/12 bg-gradient-to-l from-[#FFFFFF] to-[#00D2EA]">
          <div class=" flex">
            <div class="ml-10 mt-16">
              <div class="w-16 h-1 ml-6 bg-[#1b6489] rounded-full mb-3"></div>
              <div class="w-24 h-1 -ml-4 bg-gray-300 rounded-full mb-3"></div>
              <div class="w-24 -ml-4 h-1 bg-gray-300 rounded-full mb-3"></div>
              <div class="w-24 ml-2 h-1 bg-[#1b6489] rounded-full mb-3"></div>
              <div class="w-24  h-1 bg-gray-300 rounded-full mb-3"></div>
            </div>
            <div class="ml-4">
              <i class="fa-solid fa-key text-4xl ml-20 mt-6 text-[#2178AC]"></i>
          <p class="text-sm font-bold text-center mt-4">Your Security, Our Priority</p>
          <p class="text-xs ml-12 mt-4">We protect your data with advanced encryption, ensuring privacy </p>
            </div>
          </div>
        </div>

        <img src="/footerimgbig-registration.png" alt="" class="ml-40 -mt-16 ">

<!-- <div class="">
  <div  class="bg-[#1b6489] w-80 h-3/4 rounded-xl transform rotate-45 "></div>
  <div  class="bg-[#1b6489] w-80 h-  rounded-xl transform rotate-x-90 "></div>
</div> -->
  <!-- <div class="flex h-60 overflow-hidden">
    <div class="w-72 ml-2 h-80 mt-2 bg-[#1b6489] rounded-lg relative rotate-45 "></div>
    <div class="w-72 ml-2 h-96 mt-2 bg-[#1b6489] rounded-lg absolute rotate-45"></div>
  </div> -->

      </div>
      <div class="ml-20 w-2/3">
     <p class="text-center text-3xl font-bold mt-4">Welcome to <span class="text-[#2178AC]">BIZEthio</span></p>

     <div class="flex w-full">
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Owner name</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="owner_name" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
     
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Company name</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="name" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
     </div>
     <div class="flex ">
       <div class="px-7 mt-4 w-11/12">
         <div class="flex">
             <p class="">Description</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="description" type="textArea" class="w-11/12 h-32 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
     <div class="container">
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Contact Phone</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="contact_phone" type="number" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Website</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
       
     </div>
     </div>
     <div class="flex">
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Email</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="contact_email" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Website</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="website" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>

     </div>
     <div class="flex">
     
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">License URL</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="license_url" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Operating Hours</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="operating_hours" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>

     </div>
     <div class="flex">
     
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Country</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="country" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Address</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="address" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
       
     </div>
     <div class="flex">
     
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">Region</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="region" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
       <div class="px-4  mt-4 w-11/12 mx-auto">
         <div class="flex">
             <p class="">City</p>
             <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
         </div>
         <input v-model="city" type="text" class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
       </div>
       
     </div>
 

     <div class="px-7 mt-4">
       <div class="flex">
           <p class="">Social Media Links</p>
       </div>
       <input v-model="social_media_links" type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4 mr-6">
       <input type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4 mr-6">
       <input type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4">
     </div>
     <button class="bg-[#2178AC] mb-8 ml-8 py-2 px-2 rounded-md text-white text-sm">add social media link </button>
  

       <div class=" mt-6">
         <button class="bg-[#2178AC] mb-32 ml-40 py-3 px-40 -mt-80 rounded-md text-white text-md">Register Company</button>
    
     </div>
   </div>
  </div>
    <!-- /end of desktop -->
  </div>


</template>

<script>
export default {

}
</script>

<style>

</style>