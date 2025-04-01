<script setup>
import { onMounted, ref } from "vue";
import UserLayout from "@/layout/UserLayout.vue";
import horizon_hotel from "/images/ForYouSection/horizon_hotel.jpeg";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/stores/company";

const { getCompany } = useCompanyStore();

const route = useRoute();
const company = ref(null);
const loading = ref(true);  

onMounted(()=>{
  window.scrollTo(0, 0);

})
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

// Business data (static)
const business = {
  name: "Horizon Hotel",
  category: "Restaurant & Cafe",
  description:
    "Horizon Hotel Restaurant & Cafe is a modern and welcoming establishment located in the heart of Addis Ababa at Mexico Square. Offering a blend of comfortable accommodations, delicious dining, and a cozy cafe experience, Horizon is the perfect spot for travelers, business professionals, and locals alike. Our hotel features well-appointed rooms with stunning views of the city, while our restaurant serves a mix of authentic Ethiopian cuisine and international dishes. The cafe is a popular spot for enjoying freshly brewed Ethiopian coffee, pastries, and light meals in a relaxed atmosphere. Whether you’re staying with us or just stopping by for a meal, Horizon Hotel Restaurant & Cafe promises exceptional",
  location: "Mexico Square, Lideta Sub-City, Woreda 02, Addis Ababa, Ethiopia",
  operatingHours:
    "Hotel: 24/7 check-in and reception\nRestaurant: Monday–Sunday, 7:00 AM–10:00 PM\nCafe: Monday–Sunday, 6:00 AM–8:00 PM",
  phone: "+251 91 123 4567",
  email: "info@horizonhoteladdis.com",
  website: "www.horizonhoteladdis.com",
  averageRating: 4.2,
};

// Reviews data (static)
const reviews = [
  {
    userName: "Abebe T.",
    verified: true,
    rating: 4,
    comment:
      "I stayed at Horizon Hotel for a business trip, and it was fantastic! The rooms are clean and spacious, and the staff were incredibly friendly. The restaurant’s injera and tibs were delicious, and I loved the coffee at the cafe. Highly recommend!",
    date: "Nov 12, 2024",
  },
  {
    userName: "Sarah M.",
    verified: true,
    rating: 3,
    comment:
      "The location is great, right in Mexico Square, but the Wi-Fi was a bit slow in the rooms. The food at the restaurant was amazing, though—especially the breakfast buffet.",
    date: "Feb 12, 2025",
  },
  {
    userName: "Tewodros K.",
    verified: true,
    rating: 5,
    comment:
      "Horizon Hotel exceeded my expectations! The view from my room was breathtaking, and the staff went above and beyond to make my stay comfortable. The cafe’s Ethiopian coffee is the best I’ve ever had. I’ll definitely be back!",
    date: "Mar 15, 2025",
  },
  {
    userName: "Lydia B.",
    verified: true,
    rating: 2,
    comment:
      "The hotel has a great location, but I was disappointed with the service. The check-in process was slow, and my room wasn’t ready on time. The food was good, but I expected better overall for the price.",
    date: "Jan 20, 2025",
  },
];

// Rating distribution (static)
const ratingDistribution = [
  { stars: 5, count: 50 },
  { stars: 4, count: 20 },
  { stars: 3, count: 10 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
];
</script>

<template>
  <UserLayout>
    <div class="min-h-screen px-4 sm:pt-5 lg:pt-10 md:pb-16">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primaryColor"></div>
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
          <div class="flex flex-col mt-8 gap-y-4 lg:gap-y-6 xl:gap-y-10 xl:mt-12">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 stroke-black hover:fill-red-500 cursor-pointer transition-colors duration-200"
                  viewBox="0 0 256 256"
                  fill="transparent"
                >
                  <path
                    d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"
                    stroke-width="10"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 hover:fill-primaryColor cursor-pointer"
                  viewBox="0 0 256 256"
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

            <!-- Reviews and Ratings Section (UI Only) -->
            <div class="mt-12 space-y-6">
              <h2 class="text-2xl font-bold text-darkBlue">
                Reviews And Ratings ({{company?.rating_avg}})
              </h2>

              <!-- Rating Distribution -->
              <div class="space-y-2">
                <div
                  v-for="rating in ratingDistribution"
                  :key="rating.stars"
                  class="flex items-center space-x-2 max-w-[540px]"
                >
                  <span class="text-sm text-gray-600"
                    >{{ rating.stars }} Star{{
                      rating.stars > 1 ? "s" : ""
                    }}</span
                  >
                  <div class="flex-1 h-2 bg-gray-200 rounded">
                    <div
                      :style="{
                        width: `${
                          (rating.count /
                            Math.max(...ratingDistribution.map((r) => r.count))) *
                          100
                        }%`,
                      }"
                      class="h-2 bg-yellow-400 rounded"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600">{{ rating.count }}</span>
                </div>
              </div>

              <!-- Review List -->
              <div class="space-y-6 grid lg:grid-cols-2 gap-x-10 mt-8">
                <div
                  v-for="review in reviews"
                  :key="review.id"
                  class="py-4 px-2 space-y-8 rounded-md bg-white max-w-[410px] lg:max-w-[480px] h-[275px]"
                >
                  <div class="flex justify-between">
                    <div class="space-y-2">
                      <span class="text-sm font-medium text-gray-800">{{
                        review.userName
                      }}</span>
                      <p v-if="review.verified" class="text-xs text-green-600">
                        Verified User
                      </p>
                    </div>
                    <div class="flex items-center space-x-2 mt-1">
                      <span class="text-yellow-500">
                        <span v-for="n in 5" :key="n" class="inline-block">
                          <svg
                            v-if="n <= review.rating"
                            class="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            />
                          </svg>
                          <svg
                            v-else
                            class="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 15.4l-4.6 2.4 1-4.9-3.8-3.3 5-1L12 4l1.4 4.6 5 1-3.8 3.3 1 4.9z"
                            />
                          </svg>
                        </span>
                      </span>
                      <span class="text-sm text-gray-600"
                        >({{ review.rating }}/5)</span
                      >
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mt-2">{{ review.comment }}</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-sm text-gray-600"
                      >Helpful? Yes (2) No (0)</span
                    >
                    <span class="text-sm text-gray-600">{{ review.date }}</span>
                  </div>
                </div>
              </div>

              <!-- Rate The Company Block (Inline) -->
              <div class="mt-6 p-6 bg-white rounded-lg shadow-sm max-w-[420px]">
                <h3 class="text-lg font-bold text-darkBlue mb-2">
                  Rate The Company!
                </h3>
                <p class="text-sm text-gray-600 mb-4">
                  Help us improve our service to best suit your needs by rating
                  us here!
                </p>
                <div class="flex items-center justify-between space-x-2 mb-4">
                  <span v-for="n in 5" :key="n" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-10"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div class="mb-4">
                  <label class="block text-sm text-gray-600 mb-2"
                    >Can you tell us more?</label
                  >
                  <textarea
                    class="w-full p-2 border rounded-md"
                    rows="2"
                    placeholder="Add feedback"
                  ></textarea>
                </div>
                <div class="flex justify-end space-x-2">
                  <button
                    class="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    class="px-4 py-2 text-white bg-lightBlue rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>