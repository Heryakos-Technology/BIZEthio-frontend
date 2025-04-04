<script setup>
import addisCafeImage from "/images/ForYouSection/addis_cafe.jpeg";
import ethioFashionImage from "/images/ForYouSection/ethio_fashion.jpeg";
import sabaSalonImage from "/images/ForYouSection/saba_salon.jpeg";
import bolePharmacyImage from "/images/ForYouSection/bole_pharmacy.jpeg";
import horizonHotelImage from "/images/ForYouSection/horizon_hotel.jpeg";
import unityAutoImage from "/images/ForYouSection/unity_auto.jpeg";
import { onMounted, ref } from "vue";
import { useCompanyStore } from "@/stores/company";

const companies = ref([]);
const loading = ref(true);  
const { getAllCompanies } = useCompanyStore();

onMounted(async () => {
  try {
 
    loading.value = true;
    companies.value = await getAllCompanies();
    console.log(companies.value);
  } catch (error) {
    console.error("Error fetching companies:", error);

  } finally {
    loading.value = false;
  }
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

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;

  let stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push({ type: "full" });
  }

  if (hasHalfStar) {
    stars.push({ type: "half" });
  }

  return stars;
}
</script>

<template>
  <div class="px-4 xl:max-w-[1200px] mx-auto sm:mt-16">
    <h1 class="text-primaryColor text-lg font-bold md:text-3xl">For You</h1>
    
    <!-- Loading spinner while fetching data -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primaryColor"></div>
    </div>
    
    <!-- No companies found state -->
    <div v-else-if="companies.length === 0" class="py-20 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">No companies found</h3>
      <p class="mt-1 text-gray-500">We couldn't find any companies to display at the moment.</p>
    </div>
    
    <!-- Companies grid -->
    <div
      v-else
      class="grid gap-y-8 place-items-center mt-10 gap-x-4 xl:gap-x-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <div

        v-for="(item, index) in companies"
        :key="index"
        class="bg-white w-full max-w-[400px] min-h-[450px] pt-2 pb-4 rounded-xl px-2 shadow-md hover:shadow-lg transition-shadow"
      >
        <div
          class="w-full h-[250px] hover:scale-105 transition-all duration-300 ease-linear bg-cover rounded-t-xl"
          :style="{ backgroundImage: `url(${getImageUrl(item.images)})` }"
        ></div>
        <div class="mt-3 space-y-2 pl-2">
          <div class="flex">
            <div
              v-for="(star, index) in generateStars(item.rating_avg)"
              :key="index"
            >
              <svg
                v-if="star.type === 'full'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="size-6 fill-amber-300"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else-if="star.type === 'half'"
                class="size-6 fill-amber-300"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 276.901 276.901"
                xml:space="preserve"
              >
                <path
                  d="M275.922,105.676c-2.353-7.24-8.612-12.517-16.146-13.611l-71.441-10.381l-31.95-64.737
                    c-3.369-6.826-10.322-11.148-17.935-11.148c-7.613,0-14.565,4.322-17.935,11.148L88.566,81.684L17.125,92.065
                    c-7.533,1.095-13.793,6.371-16.146,13.611s-0.391,15.188,5.062,20.502l51.695,50.391l-12.203,71.153
                    c-1.287,7.504,1.798,15.087,7.956,19.562c6.159,4.475,14.326,5.065,21.063,1.521l63.898-33.594l63.899,33.594
                    c2.927,1.539,6.121,2.298,9.305,2.298c4.146,0,8.273-1.288,11.758-3.819c6.159-4.475,9.243-12.059,7.956-19.562l-12.204-71.153
                    l51.696-50.39C276.312,120.864,278.274,112.916,275.922,105.676z M183.715,155.264c-4.714,4.595-6.865,11.215-5.752,17.703
                    l7.131,41.575l-37.337-19.629c-2.913-1.532-6.11-2.298-9.306-2.298V70.99l18.669,37.826c2.913,5.902,8.545,9.994,15.059,10.94
                    l41.743,6.065L183.715,155.264z"
                />
              </svg>
            </div>

            <p class="mx-3">({{ item.rating_avg || 0 }})</p>
          </div>
          <h1 class="font-semibold ml-1 uppercase">{{ item.name }}</h1>
          <div class="flex gap-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              viewBox="0 0 256 256"
            >
              <path
                d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"
              ></path>
            </svg>
            <p class="">{{ item.operating_hours }}</p>
          </div>

          <div class="flex gap-x-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              viewBox="0 0 256 256"
            >
              <path
                d="M200,224H150.54A266.56,266.56,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25a88,88,0,0,0-176,0c0,31.4,14.51,64.68,42,96.25A266.56,266.56,0,0,0,105.46,224H56a8,8,0,0,0,0,16H200a8,8,0,0,0,0-16ZM56,104a72,72,0,0,1,144,0c0,57.23-55.47,105-72,118C111.47,209,56,161.23,56,104Zm112,0a40,40,0,1,0-40,40A40,40,0,0,0,168,104Zm-64,0a24,24,0,1,1,24,24A24,24,0,0,1,104,104Z"
              ></path>
            </svg>
            <p class="">{{ item.region }}</p>
          </div>
          <p class="font-semibold">{{ item.category?.name || 'Uncategorized' }}</p>

          <RouterLink :to="{ name: 'CompanyDetail', params: { id: item.id } }"
            class="bg-primaryColor w-32 flex mt-5 rounded-lg text-white cursor-pointer items-center justify-center py-2"
          >
            View Details
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles for loader animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>