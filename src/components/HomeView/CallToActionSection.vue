<script setup>
import CTABackground from "/images/CTABackground.png";
import CTA_Graphics from "/images/CTA_Graphics.png";
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${CTABackground})` }"
    class="mt-16 w-full bg-cover bg-center pt-16 pb-16 px-2 xs:pl-10 sm:pl-16 relative lg:pl-24 xl:pl-32 2xl:pl-48 xl:pt-24 2xl:pt-32"
  >
    <div
      class="text-white space-y-3 max-w-[360px] sm:max-w-[390px] md:max-w-fit"
    >
      <p class="text-[#2FC7A1] text-sm text-nowrap">
        Ready to Connect with Ethiopia’s Best Businesses?
      </p>
      <h1 class="text-3xl font-bold sm:text-4xl md:text-5xl">
        Unlock Local Opportunities Today!
      </h1>
      <p class="text-sm md:text-base md:max-w-[500px]">
        Experience AI-powered recommendations to find the best businesses, or
        grow your customer base by joining BizEthio now
      </p>
    </div>

    <div
      class="text-white uppercase gap-4 md:gap-8 flex flex-col mt-10 md:flex-row lg:mt-18"
    >
      <RouterLink
        :to="{ name: 'UserRegistration1' }"
        class="w-[170px] bg-[#2FC7A1] py-4 flex items-center justify-center"
      >
        Join us client
      </RouterLink>
      <RouterLink
        :to="{ name: 'RegistrationPage' }"
        class="w-[170px] bg-[#674DF0] py-4 flex items-center justify-center"
      >
        Join us company
      </RouterLink>
    </div>
    <div
      :style="{ backgroundImage: `url(${CTA_Graphics})` }"
      class="w-32 h-48 absolute bg-cover bottom-0 right-0 sm:w-[180px] sm:h-[250px] lg:w-[250px] lg:h-[350px] xl:w-[400px] 2xl:w-[500px]"
    ></div>
  </div>
</template>
