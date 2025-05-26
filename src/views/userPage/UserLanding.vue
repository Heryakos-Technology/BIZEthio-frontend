<script setup>
// filepath: src/views/userPage/UserLanding.vue
import { ref, onMounted, computed } from "vue";
import MapModal from "@/components/MapModal.vue";
import UserLayoutUser from "@/layout/UserLayoutUser.vue";
import { useCategoryStore } from "@/stores/category";
import { useReviewStore } from "@/stores/review";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const isMapVisible = ref(false);
const categories = ref([]);
const companies = ref([]);
const reviews = ref([]);
const loading = ref(true);
const selectedCategories = ref([]);
const router = useRouter();
const mapSrc = ref("");
const userLocation = ref(); 
const closestCompanies = ref([]); 
const search = ref("");
const isSearchFocused = ref(false);
const showSuggestions = ref("");
const $toast = useToast();

const userInfoString = localStorage.getItem("userInfo");
const userInfo = JSON.parse(userInfoString);

onMounted(() => {
  userLocation.value = JSON.parse(userInfo.location);
});

const { getAllReviews } = useReviewStore();
const { getAllCategories } = useCategoryStore();

// Function to calculate distance using the Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

// Function to find and sort companies by distance
const findClosestCompanies = () => {
  if (!userLocation.value) return;

  const companiesWithDistance = companies.value.map((company) => {
    let companyLocation;
    try {
      companyLocation =
        typeof company.location === "string"
          ? JSON.parse(company.location)
          : company.location;
    } catch (e) {
      console.error(`Error parsing location for company ${company.name}:`, e);
      return { ...company, distance: Infinity };
    }

    if (!companyLocation || !companyLocation.lat || !companyLocation.lng) {
      return { ...company, distance: Infinity }; 
    }

    const distance = calculateDistance(
      userLocation.value.lat,
      userLocation.value.lng,
      companyLocation.lat,
      companyLocation.lng
    );

    return { ...company, distance };
  });

  closestCompanies.value = companiesWithDistance
    .filter((company) => company.distance !== Infinity)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 15);
};

const openMapModal = (latitude, longitude) => {
  mapSrc.value = `https://maps.google.com/?q=${latitude},${longitude}`;
  isMapVisible.value = true;
};

const closeMapModal = () => {
  isMapVisible.value = false;
};

const handleInput = () => {
  showSuggestions.value = search.value.trim() !== "";
};

const filteredCompanies = computed(() => {
  let filtered = companies.value;

  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(
      (company) =>
        company.category &&
        selectedCategories.value.includes(company.category.name)
    );
  }

  if (search.value.trim() !== "") {
    filtered = filtered.filter((company) =>
      company.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  return filtered;
});

const toggleCategory = (categoryName) => {
  const index = selectedCategories.value.indexOf(categoryName);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(categoryName);
  }
};

const selectCompany = (companyId) => {
  router.push(`/company/${companyId}`);
  showSuggestions.value = false;
};

const getImageUrl = (images) => {
  if (images) {
    try {
      const parsedImages = JSON.parse(images);
      return parsedImages.length > 0
        ? parsedImages[0]
        : "/default-company-image.jpg";
    } catch (error) {
      console.error("Error parsing image URL:", error);
      return "/default-company-image.jpg";
    }
  }
  return "/default-company-image.jpg";
};

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        findClosestCompanies();
      },
      (error) => {
        console.error("Geolocation error:", error);
        $toast.error("Unable to retrieve your location. Using default location.", {
      position: "top",
    });
        findClosestCompanies(); 
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } else {
    $toast.error("Geolocation is not supported by your browser. Using default location.", {
      position: "top",
    });
    findClosestCompanies(); 
  }
};

const handleMapClick = (locationInput) => {
  try {
    const location = typeof locationInput === "string"
      ? JSON.parse(locationInput)
      : locationInput;

    if (location.lat && location.lng) {
      mapSrc.value = `https://www.google.com/maps?q=${location.lat},${location.lng}&hl=es;z=14&output=embed`;
      isMapVisible.value = true;
    } else {
      $toast.error("Location data is incomplete.", {
      position: "top",
    });
    }
  } catch (e) {
    $toast.error("Invalid location data format.", {
      position: "top",
    });
    console.error("Map click error:", e);
  }
};

const handleFocus = () => {
  isSearchFocused.value = true;
  showSuggestions.value = search.value.trim() !== "";
};

const handleBlur = () => {
  setTimeout(() => {
    isSearchFocused.value = false;
    showSuggestions.value = false;
  }, 200);
};

const getAllCompanies = async () => {
  const cachedCompanies = localStorage.getItem("all_companies");
  if (cachedCompanies) {
    try {
      const parsed = JSON.parse(cachedCompanies);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.warn("Invalid cached companies data");
    }
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found.");
    return [];
  }

  const res = await fetch("https://bizethio-backend-production-d484.up.railway.app/api/companies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log("Fetched data:", data);

  if (data.errors) {
    console.error("API returned errors:", data.errors);
    return [];
  }

  const companies = data.companies ?? data; // adapt based on actual API response
  localStorage.setItem("all_companies", JSON.stringify(companies));
  return companies;
};


onMounted(async () => {
  userLocation.value = JSON.parse(userInfo.location);

  [companies.value, categories.value, reviews.value] = await Promise.all([
    getAllCompanies(),
    getAllCategories(),
    getAllReviews()
  ]);

  loading.value = false;

  getUserLocation(); 
  findClosestCompanies(); 
});

</script>

<template>
  <UserLayoutUser>
    <div class="categories lg:w-full mx-auto lg:mb-20 mt-16 ">
      <!-- Search Bar and Categories -->
      <div class="lg:pt-10 lg:ml-4 w-full mx-auto">
        <div class="flex w-72 lg:w-1/5 mt-4 mx-auto">
          <input
            v-model="search"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            type="text"
            class="w-56 lg:w-72 lg:h-10 pl-12 h-9 bg-white outline-none rounded-tl-full rounded-br-full"
          />
          <div
            v-if="
              isSearchFocused && showSuggestions && filteredCompanies.length > 0
            "
            class="absolute w-1/5 lg:mt-12 lg:-ml-10 mx-auto bg-white border border-gray-300 rounded-md mt-1 z-10"
          >
            <ul>
              <li
                v-for="company in filteredCompanies"
                :key="company.id"
                @click="selectCompany(company.id)"
                class="cursor-pointer hover:bg-gray-200 p-2"
              >
                <img
                  :src="getImageUrl(company.images)"
                  alt=""
                  class="w-8 h-8 inline-block mr-2"
                />
                {{ company.name }}
              </li>
            </ul>
          </div>
          <div
            @click="handleInput"
            class="w-20 h-9 lg:h-10 bg-[#075E86] rounded-tr-lg rounded-bl-xl rounded-br-lg -ml-5"
          >
            <p
              class="text-center text-white mt-1 font-light hover:cursor-pointer"
            >
              search
            </p>
          </div>
          <div
            class="fa-solid fa-magnifying-glass text-gray-600 -ml-68 mt-3 lg:-ml-82"
          ></div>
        </div>
      </div>

      <!-- Categories -->
      <div class="lg:-mt-40 md:-mt-56 lg:ml-4 w-11/12 mx-auto space-y-6">
        <div
          class="lg:flex lg:-mt-40 lg:w lg:ml-64 md:flex md:-mt-40 md:w md:ml-14"
        >
          <div
            v-for="(category, index) in categories.slice(0, 3)"
            :key="category.id"
            @click="toggleCategory(category.name)"
            class="w-48 h-20 shadow-md cursor-pointer hover:scale-105 transition-all duration-200 mt-2 rounded-full flex"
            :class="[
              index === 0
                ? 'ml-4 lg:ml-16'
                : index === 1
                ? 'ml-40 md:ml-20 lg:ml-32 md:mr-20'
                : 'ml-4 lg:ml-10',
              { 'bg-[#b6d3ff]': selectedCategories.includes(category.name) },
              { 'bg-[#F0EEFF]': !selectedCategories.includes(category.name) },
            ]"
          >
            <img
              :src="category.image_link"
              alt=""
              class="w-12 h-10 lg:ml-4 lg:mt-5 mt-3 ml-2"
            />
            <p
              class="w-40 ml-2 mt-3 text-xs lg:text-md lg:mt-7 lg:ml-1 md:font-semibold lg:font-semibold"
            >
              {{ category.name }}
            </p>
          </div>
        </div>

        <div class="lg:flex lg:mt-10 md:flex md:mt-10 lg:px-40">
          <div
            v-for="(category, index) in categories.slice(3, 5)"
            :key="category.id"
            @click="toggleCategory(category.name)"
            class="w-48 h-20 shadow-md cursor-pointer hover:scale-105 transition-all duration-200 bg-[#F0EEFF] mt-2 rounded-full flex"
            :class="[
              index === 0
                ? 'ml-48 lg:ml-28 md:mr-96 md:ml-24'
                : index === 1
                ? 'ml-12 lg:ml-40 md:ml-16'
                : 'ml-4 lg:ml-10',
              { 'bg-[#b6d3ff]': selectedCategories.includes(category.name) },
              { 'bg-[#F0EEFF]': !selectedCategories.includes(category.name) },
            ]"
          >
            <img
              :src="category.image_link"
              alt=""
              class="w-12 h-10 lg:ml-4 lg:mt-5 mt-3 ml-2"
            />
            <p
              class="w-40 ml-2 mt-3 text-xs lg:text-md lg:mt-7 lg:ml-1 md:font-semibold lg:font-semibold"
            >
              {{ category.name }}
            </p>
          </div>
        </div>

        <div class="lg:flex lg:mt-10 md:flex md:mt-10 px-36">
          <div
            v-for="(category, index) in categories.slice(5, 9)"
            :key="category.id"
            @click="toggleCategory(category.name)"
            class="w-48 h-20 shadow-md cursor-pointer hover:scale-105 transition-all duration-200 mt-2 rounded-full flex"
            :class="[
              index === 0
                ? 'ml-4 lg:ml-16'
                : index === 1
                ? 'ml-40 md:ml-20 lg:ml-32 md:mr-20'
                : 'ml-4 lg:ml-10',
              { 'bg-[#b6d3ff]': selectedCategories.includes(category.name) },
              { 'bg-[#F0EEFF]': !selectedCategories.includes(category.name) },
            ]"
          >
            <img
              :src="category.image_link"
              alt=""
              class="w-12 h-10 lg:ml-4 lg:mt-5 mt-3 ml-2"
            />
            <p
              class="w-40 ml-2 mt-3 text-xs lg:text-md lg:mt-7 lg:ml-1 md:font-semibold lg:font-semibold"
            >
              {{ category.name }}
            </p>
          </div>
        </div>
      </div>

      <!-- Existing Companies -->
      <div
 class="lg:flex md:flex lg:w-11/12 lg:mx-auto second-cards ml-2 pb-4 mt-6">
  <div class="flex flex-wrap w-full px-2 lg:px-0 pb-6">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-20 w-full mx-auto mt-16">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8"></div>
    </div>

    <!-- No companies -->
    <div
      v-else-if="!filteredCompanies.length || filteredCompanies == '' || filteredCompanies == null"
      class="justify-center items-center py-20 -mt-8 w-full mx-auto"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
      </svg>
      <p class="text-gray-400 ml-32 lg:ml-76">No companies yet!</p>
    </div>

    <!-- Company cards -->
    <div v-else class="grid w-full gap-4 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="company in filteredCompanies"
        :key="company.id"
        class="w-[300px] xs:w-[350px] pb-4 bg-white rounded-t-lg lg:w-[300px] 2xl:w-[350px]"
      >
        <div class="rounded-t-2xl">
          <img
            :src="getImageUrl(company.images)"
            alt=""
            class="rounded-br-4xl rounded-t-lg w-full h-[250px]"
          />
          <p class="font-bold ml-2 h-6 text-xs mt-4 lg:text-lg">
            {{ company.name }}
          </p>
          <p class="text-xs mt-4 ml-2 h-26 lg:h-26 font-normal pr-1 truncate">
            {{ company.description }}
          </p>
          <div class="flex md:-mt-4 ml-4 h-10 lg:-mt-6">
<i

  @click="
    handleMapClick(
      company.location
        ? company.location
        : JSON.stringify({ lat: company.latitude, lng: company.longitude })
    )
  "
  class="fas fa-map-marker-alt text-[#FF8C00] mr-12 mt-2 lg:mt-2 lg:ml-4 lg:text-xl cursor-pointer"
></i>




            <RouterLink
              :to="{ name: 'CompanyDetail', params: { id: company.id } }"
              class="w-20 lg:ml-20 md:ml-8 md:mt-0 lg:w-28 lg:h-10 h-8 bg-[#1B7590] rounded-lg"
            >
              <p class="text-white text-xs hover:cursor-pointer text-center mt-2.5">
                Explore more
              </p>
            </RouterLink>
          </div>
        </div>
      </div>

     
      <MapModal v-if="isMapVisible" :mapSrc="mapSrc" @close="closeMapModal" />
    </div>
  </div>
</div>

      <!-- Closest Companies from Database -->
      <div class="lg:w-11/12 lg:mx-auto mt-12 pb-4">
        <h2 class="p-8 font-bold text-3xl text-primaryColor">
          Nearby Companies
        </h2>

        <!-- No Companies Found -->
        <div
          v-if="!closestCompanies.length"
          class="justify-center items-center py-20 w-full mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
            />
          </svg>
          <p class="text-gray-400 text-center">
            No companies found near your location.
          </p>
        </div>

        <!-- Display Closest Companies -->
        <div
          v-else
          class="grid w-full gap-4 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="company in closestCompanies"
            :key="company.id"
            class="w-[300px] xs:w-[350px] pb-4 bg-white rounded-t-lg lg:w-[300px] 2xl:w-[350px]"
          >
            <div class="rounded-t-2xl">
              <img
                :src="getImageUrl(company.images)"
                alt=""
                class="rounded-br-4xl rounded-t-lg w-full h-[250px]"
              />

              <div class="px-2 mt-3">
                <p class="font-bold">
                  {{ company.name }}
                </p>
                <p class=" ">
                  {{ company.description }}
                </p>
                <p class=" ">Distance: {{ company.distance.toFixed(2) }} km</p>
                <div class="flex">
                  <i
                    v-if="company.latitude && company.longitude"
                    @click="openMapModal(company.latitude, company.longitude)"
                    class="fa-solid fa-location-dot text-[#FF8C00] mr-12 mt-2 lg:mt-2 lg:ml-4 lg:text-xl cursor-pointer"
                  ></i>
                  <RouterLink
                    :to="{ name: 'CompanyDetail', params: { id: company.id } }"
                    class="flex justify-center items-center px-4 py-2 mt-3 bg-[#1B7590] rounded-md"
                  >
                    <p
                      class="text-white text-xs hover:cursor-pointer text-center"
                    >
                      Explore more
                    </p>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayoutUser>
</template>
