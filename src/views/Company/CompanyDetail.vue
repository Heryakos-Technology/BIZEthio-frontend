<script setup>
import { onMounted, ref } from "vue";
import UserLayout from "@/layout/UserLayout.vue";
import horizon_hotel from "/images/ForYouSection/horizon_hotel.jpeg";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/stores/company";
import CompanyReview from "@/components/CompanyDetail/CompanyReview.vue"; // Import the new component

const { getCompany } = useCompanyStore();

const route = useRoute();
const company = ref(null);
const loading = ref(true);
const showSharePopup = ref(false);

onMounted(() => {
  window.scrollTo(0, 0);
});
onMounted(async () => {
  try {
    company.value = await getCompany(route.params.id);
  } catch (error) {
    console.error("Error fetching company:", error);
  } finally {
    loading.value = false;
  }
  console.log(company.value);
});

const getImageUrl = (images) => {
  if (images) {
    try {
      const parsedImages = JSON.parse(images);
      return parsedImages.length > 0
        ? parsedImages[0]
        : "/defalt-company-image.jpg";
    } catch (error) {
      console.error("Error parsing image URL:", error);
      return "/defalt-company-image.jpg";
    }
  }
  return "/defalt-company-image.jpg";
};

// Share functionality
const shareToSocialMedia = (platform) => {
  const currentUrl = window.location.href;
  let shareUrl = "";

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(
        `Check out ${company.value?.name} on BIZEthio!`
      )}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`;
      break;
    case "telegram":
      shareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(
        `Check out ${company.value?.name} on BIZEthio!`
      )}`;
      break;
    // Add more platforms as needed
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank");
    closeSharePopup(); // Close the popup after sharing
  }
};

const copyRoute = () => {
  const currentUrl = window.location.href;
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      alert("Link copied to clipboard!");
      closeSharePopup(); // Close the popup after copying
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

const openSharePopup = () => {
  showSharePopup.value = true;
};

const closeSharePopup = () => {
  showSharePopup.value = false;
};
</script>

<template>
  <UserLayout>
    <div class="min-h-screen px-4 sm:pt-5 lg:pt-10 md:pb-16">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primaryColor"
        ></div>
      </div>

      <!-- Content when not loading -->
      <div v-else>
        <!-- Hero Image -->
        <div
          class="mx-auto w-[90%] aspect-video rounded-md shadow-sm bg-center bg-cover lg:max-w-[780px] xl:max-w-[1025px] lg:max-h-[430px] xl:max-h-[500px]"
          :style="{ backgroundImage: `url(${getImageUrl(company?.images)})` }"
        ></div>

        <!-- Business Details -->
        <div class="w-[90%] mx-auto lg:max-w-[780px] xl:max-w-[1025px]">
          <div
            class="flex flex-col mt-8 gap-y-4 lg:gap-y-6 xl:gap-y-10 xl:mt-12"
          >
            <div class="flex gap-x-4 sm:items-end">
              <div class="sm:flex items-end gap-x-2 sm:gap-x-4">
                <h1
                  class="font-bold text-darkBlue text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase"
                >
                  {{ company?.name }}
                </h1>
                <p class="text-gray-500 text-sm sm:text-base">
                  {{ company?.category?.name }}
                </p>
              </div>

              <div class="flex gap-x-4 mt-2">
                <!-- Share Button (SVG) -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 hover:fill-primaryColor cursor-pointer"
                  viewBox="0 0 256 256"
                  @click="openSharePopup"
                >
                  <path
                    d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z"
                  ></path>
                </svg>
              </div>
            </div>

            <div class="flex items-center gap-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-6 hover:fill-primaryColor hover:scale-110 cursor-pointer"
                viewBox="0 0 256 256"
              >
                <path
                  d="M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19Zm-61.14,36L78.15,126.35l-49.6-9.73ZM88,200V152.52l24.79,21.74Zm87.53,8L92.85,135.5l119-85.29Z"
                ></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-6 hover:fill-primaryColor hover:scale-110 cursor-pointer"
                viewBox="0 0 256 256"
              >
                <path
                  d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"
                ></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-6 hover:fill-primaryColor hover:scale-110 cursor-pointer"
                viewBox="0 0 256 256"
              >
                <path
                  d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"
                ></path>
              </svg>
            </div>
          </div>

          <p class="text-gray-600 text-sm mt-8 text-pretty">
            {{ company?.description }}
          </p>

          <div class="space-y-7 text-gray-600 text-sm mt-8">
            <div class="flex items-center gap-x-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-6"
                viewBox="0 0 256 256"
              >
                <path
                  d="M112,80a16,16,0,1,1,16,16A16,16,0,0,1,112,80ZM64,80a64,64,0,0,1,128,0c0,59.95-57.58,93.54-60,94.95a8,8,0,0,1-7.94,0C121.58,173.54,64,140,64,80Zm16,0c0,42.2,35.84,70.21,48,78.5,12.15-8.28,48-36.3,48-78.5a48,48,0,0,0-96,0Zm122.77,67.63a8,8,0,0,0-5.54,15C213.74,168.74,224,176.92,224,184c0,13.36-36.52,32-96,32s-96-18.64-96-32c0-7.08,10.26-15.26,26.77-21.36a8,8,0,0,0-5.54-15C29.22,156.49,16,169.41,16,184c0,31.18,57.71,48,112,48s112-16.82,112-48C240,169.41,226.78,156.49,202.77,147.63Z"
                ></path>
              </svg>
              <p>
                {{ company?.city }} | {{ company?.address }}
              </p>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-x-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-6"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"
                  ></path>
                </svg>
                <p class="text-base text-primaryColor font-bold">
                  Operating Hours
                </p>
              </div>
              <div class="space-y-1">
                <p>{{ company?.operating_hours }} Hours</p>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-x-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-6"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M231.59,90.13h0C175.44,34,80.56,34,24.41,90.13c-20,20-21.92,49.49-4.69,71.71A16,16,0,0,0,32.35,168a15.8,15.8,0,0,0,5.75-1.08l49-17.37.29-.11a16,16,0,0,0,9.75-11.73l5.9-29.52a76.52,76.52,0,0,1,49.68-.11h0l6.21,29.75a16,16,0,0,0,9.72,11.59l.29.11,49,17.39a16,16,0,0,0,18.38-5.06C253.51,139.62,251.58,110.13,231.59,90.13ZM223.67,152l-.3-.12-48.82-17.33-6.21-29.74A16,16,0,0,0,158,93a92.56,92.56,0,0,0-60.34.13,16,16,0,0,0-10.32,12l-5.9,29.51L32.63,151.86c-.1,0-.17.13-.27.17-12.33-15.91-11-36.23,3.36-50.58,25-25,58.65-37.53,92.28-37.53s67.27,12.51,92.28,37.53C234.61,115.8,236,136.12,223.67,152Zm.32,48a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,200Z"
                  ></path>
                </svg>
                <p class="text-base text-primaryColor font-bold">
                  Contact Details
                </p>
              </div>
              <div class="space-y-1">
                <p>Phone: {{ company?.contact_phone }}</p>
                <p>Email: {{ company?.contact_email }}</p>
                <p>
                  Website:
                  <a
                    :href="company?.website"
                    target="_blank"
                    class="text-blue-600 hover:underline"
                    >{{ company?.website }}</a
                  >
                </p>
              </div>
            </div>

            <!-- Company Review Component -->
            <CompanyReview :company="company" />
          </div>
        </div>
      </div>

      <!-- Share Popup -->
      <div
        v-if="showSharePopup"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <!-- Subtle Backdrop -->
        <div class="absolute inset-0 bg-black opacity-25" @click="closeSharePopup"></div>

        <!-- Floating Card -->
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md  relative">
          <h3 class="text-2xl font-semibold text-darkBlue mb-4">Share this Company</h3>
          <div class="flex justify-around">
            <button @click="shareToSocialMedia('facebook')" class=" cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200">
              <i class="fab fa-facebook-f mr-2"></i> 
            </button>
            <button @click="shareToSocialMedia('twitter')" class=" cursor-pointer text-blue-400 hover:text-blue-600 transition duration-200">
              <i class="fab fa-twitter mr-2"></i> 
            </button>
            <button @click="shareToSocialMedia('linkedin')" class=" cursor-pointer text-blue-800 hover:text-blue-900 transition duration-200">
              <i class="fab fa-linkedin-in mr-2"></i> 
            </button>
            <button @click="shareToSocialMedia('telegram')" class=" cursor-pointer text-blue-500 hover:text-blue-700 transition duration-200">
              <i class="fab fa-telegram-plane mr-2"></i> 
            </button>
            <button @click="copyRoute" class="text-gray-600 cursor-pointer hover:text-gray-800 transition duration-200">
              <i class="fas fa-link mr-2"></i> Copy  
            </button>
          </div>
          <button
            @click="closeSharePopup"
            class="mt-4 px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

