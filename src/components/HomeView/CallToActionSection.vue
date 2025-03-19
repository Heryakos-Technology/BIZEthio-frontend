<script setup>
import CTABackground from "/images/CTABackground.png";
import CTA_Graphics from "/images/CTA_Graphics.png";
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${CTABackground})` }"
    class="mt-16 w-full bg-cover bg-center pt-16 pb-24 px-2 xs:pl-10 sm:pl-16 relative"
  >
    <div class="text-white space-y-3 max-w-[360px]">
      <p class="text-[#2FC7A1] text-sm text-nowrap">
        Ready to Connect with Ethiopia’s Best Businesses?
      </p>
      <h1 class="text-3xl font-bold">Unlock Local Opportunities Today!</h1>
      <p class="text-sm">
        Experience AI-powered recommendations to find the best businesses, or
        grow your customer base by joining BizEthio now
      </p>
    </div>

    <div
      class="text-white uppercase gap-4 md:gap-8 flex flex-col mt-10 md:flex-row"
    >
      <div class="w-[170px] bg-[#2FC7A1] py-4 flex items-center justify-center">
        Join us client
      </div>
      <div class="w-[170px] bg-[#674DF0] py-4 flex items-center justify-center">
        Join us company
      </div>
    </div>
    <div
      :style="{ backgroundImage: `url(${CTA_Graphics})` }"
      class="w-32 h-48 absolute bg-cover bottom-0 right-0 xs:"
    ></div>
  </div>
</template>
