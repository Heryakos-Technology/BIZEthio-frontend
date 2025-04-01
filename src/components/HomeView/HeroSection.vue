<script setup>
import HeroImage from "/images/Hero_Image.png";
import ai_health_brain from "/images/HeroSection/ai_health_brain.png";
import handshake from "/images/HeroSection/handshake.png";
import network_home from "/images/HeroSection/network_home.png";
import remote_location_medical from "/images/HeroSection/remote_location_medical.png";
</script>

<template>
  <div class="mb-52  relative">

  <img :src="network_home"   class="left-[0] -top-[40px] absolute size-[50px] md:size-[80px] lg:size-[100px] min-[470px]:left-[5%] min-[470px]:top-[-25px] md:top-[-50px] xl:left-[8%] " alt="">
  <img :src="remote_location_medical"   class="absolute right-0 -top-[40px]  size-[50px] md:size-[80px] lg:size-[100px] min-[470px]:right-[5%] min-[470px]:top-[-25px] md:top-[-50px] xl:right-[8%]" alt="">
  <img :src="handshake"   class="absolute left-[5px] bottom-0 size-[50px] md:size-[80px] lg:size-[100px] min-[470px]:left-[5%] min-[470px]:bottom-[5px] xl:left-[8%] " alt="">
  <img :src="ai_health_brain"   class="absolute size-[50px] md:size-[80px] lg:size-[100px] right-0 bottom-0 min-[470px]:right-[5%] min-[470px]:bottom-[5px] xl:right-[8%]" alt="">
    <div
      class="text-center text-2xl space-y-2 font-semibold px-2 xs:text-3xl max-w-[425px] mx-auto sm:max-w-[640px] sm:text-5xl md:mt-6 lg:max-w-[900px] lg:text-6xl lg:space-y-3 xl:max-w-[1120px] xl:text-7xl xl:mt-8 2xl:mt-10 2xl:text-8xl 2xl:space-y-5"
    >
      <h1 class="">Empower Your Business Discovery With</h1>
      <div
        class="relative border-2 border-primaryColor w-fit mx-auto p-2 lg:p-3"
      >
        <h1 class="text-primaryColor">Artificial Intelligence</h1>
        <div class="absolute top-0 left-0 bg-[#2178AC]/20 w-full h-full"></div>
        <div
          class="bg-white size-2 border-2 border-[#4F46E5] absolute top-[-5px] left-[-5px] xl:size-3 xl:border-3 2xl:border-4 2xl:size-4"
        ></div>
        <div
          class="bg-white size-2 border-2 border-[#4F46E5] absolute top-[-5px] right-[-5px] xl:size-3 xl:border-3 2xl:border-4 2xl:size-4"
        ></div>
        <div
          class="bg-white size-2 border-2 border-[#4F46E5] absolute bottom-[-5px] left-[-5px] xl:size-3 xl:border-3 2xl:border-4 2xl:size-4"
        ></div>
        <div
          class="bg-white size-2 border-2 border-[#4F46E5] absolute bottom-[-5px] right-[-5px] xl:size-3 xl:border-3 2xl:border-4 2xl:size-4"
        ></div>
      </div>
      <p
        class="text-sm mt-4 text-gray-700 mx-auto xs:max-w-[350px] sm:max-w-[450px] md:max-w-[550px] md:text-base xl:text-lg xl:max-w-[650px]"
      >
        Join AI-powered local directories that help you discover businesses,
        connect with owners, and other companies.
      </p>
    </div>
    <RouterLink :to="{ name: 'SignIn' }">
      <div class="w-fit bg-[#1B7590]/80 p-1.5 my-6 rounded-4xl mx-auto">
        <div
          class="innerShadow innerShadow2 w-full bg-primaryColor py-2 px-4 text-white rounded-4xl xl:px-5 2xl:px-7 2xl:py-3"
        >
          Start Your Journey
        </div>
      </div>
    </RouterLink>
    <!-- <div
      class="w-[90%] mx-auto h-fit aspect-video bg-no-repeat bg-left bg-cover lg:rounded-[35px] mt-1 max-w-[430px] sm:max-w-[660px] lg:max-w-[950px] xl:max-w-[1200px] xl:max-h-[550px] drop-shadow-2xl"
      :style="{ backgroundImage: `url(${HeroImage})` }"
    ></div> -->
  </div>
</template>
<style scoped>
.innerShadow {
  box-shadow: inset 0 4px 6px rgba(79, 70, 229, 0.25); /* Matches #4F46E5 with 50% opacity */
}
.innerShadow2 {
  box-shadow: inset 0 4px 5px rgba(0, 0, 0, 0.3); /* Matches #4F46E5 with 50% opacity */
}
</style>
