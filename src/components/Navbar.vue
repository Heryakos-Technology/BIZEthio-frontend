<template>
  <div class="pt-5">
    <div class="block md:hidden">
      <div class="flex w-screen">
        <img src="\logo.png" alt="" class="w-32 p-2" />
        <div class="ml-48"><i class="fa-solid fa-bars mt-6"></i></div>
      </div>
    </div>
    <div class="hidden md:block">
      <div class="w-1/2 md:w-2/3 mx-auto p-1 rounded-full h-14 bg-[#C8EDF8]">
        <div class="flex">
          <div class="flex">
            <img
              src="\logo.png"
              alt=""
              class="lg:w-14 lg:h-10 lg:mt-1 ml-4 md:w-16 md:h-8 md:mt-2"
            />
            <p
              class="lg:mt-2 ml-2 lg:text-lg md:text-[13px] md:font-semibold md:-ml-0.5 lg:mr-8"
            >
              BIZEthio
            </p>
          </div>
          <div
            class="flex lg:w-3/4 md:w-40 lg:ml-40 font-semibold md:ml-5 lg:mx-auto mx-auto mt-3 md:text-[12px] lg:text-[16px]"
          >
            <router-link to="/UserLanding" class="lg:mr-32 md:mr-4"
              >Home</router-link
            >
            <router-link to="#" class="lg:mr-32 md:mr-4">about us</router-link>
            <router-link to="#">contacts</router-link>
          </div>

          <RouterLink
            v-if="!userId"
            :to="{ name: 'SignIn' }"
            class="cursor-pointer w-[160px] m-2 rounded-full bg-[#1B7590] px-6 py-2 font-medium text-white lg:px-6"
          >
            Get Started
          </RouterLink>

          <div v-else class="mt-3 lg:-ml-16 md:-ml-4">
            <router-link
              to="/UserProfile"
              class="fa-solid fa-user mr-4 -ml-14 text-gray-800 md:text-text-sm lg:text-xl"
            ></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
