<script setup>
import { ref, onMounted, computed, watch } from "vue";
import MapModal from "@/components/MapModal.vue";
import UserLayoutUser from "@/layout/UserLayoutUser.vue";
import { useCategoryStore } from "@/stores/category";
import { useReviewStore } from "@/stores/review";
import { useCompanyStore } from "@/stores/company";
import { useRouter } from "vue-router";

const isMapVisible = ref(false);
const search = ref("");
const categories = ref([]);
const companies = ref([]);
const reviews = ref([]);
const loading = ref(true);
const showSuggestions = ref(false);
const selectedCategories = ref([]);
const router = useRouter();
const mapSrc = ref("");
const userLocation = ref(); // Hardcoded for now
const closestCompanies = ref([]); // For companies from your database
const nearbyPlaces = ref([]); // For Google Places API results
const nearbyPlacesLoading = ref(true);
const googleMapsApiKey = "AIzaSyDBGwRQtiXnydphnsYf5GJvj0bPH6x2r0w"; // Replace with your actual API key

// Generate category types mapping
const categoryToGoogleType = {
  Restaurant: "restaurant",
  Cafe: "cafe",
  Hotel: "lodging",
  Shopping: "shopping_mall",
  Hospital: "hospital",
  School: "school",
  Bank: "bank",
  "Gas Station": "gas_station",
  Pharmacy: "pharmacy",
  // Add more mappings as needed
};

const userInfoString = localStorage.getItem("userInfo");
const userInfo = JSON.parse(userInfoString);

onMounted(() => {
  userLocation.value = JSON.parse(userInfo.location);
  loadGoogleMapsAPI();
});

const loadGoogleMapsAPI = () => {
  // Check if the API is already loaded
  if (window.google && window.google.maps) {
    initGooglePlaces();
    return;
  }

  // Load Google Maps API with Places library
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=initGooglePlaces`;
  script.async = true;
  script.defer = true;

  // Define the callback function globally
  window.initGooglePlaces = () => {
    fetchNearbyPlaces();
  };

  document.head.appendChild(script);
};

const fetchNearbyPlaces = () => {
  if (!userLocation.value || !window.google) return;

  nearbyPlacesLoading.value = true;

  const location = new google.maps.LatLng(
    userLocation.value.lat,
    userLocation.value.lng
  );
  const service = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  // Get all selected Google place types
  let placeTypes = selectedCategories.value
    .map((cat) => categoryToGoogleType[cat])
    .filter(Boolean);

  // If no categories selected, use some default types
  if (!placeTypes.length) {
    placeTypes = ["restaurant", "store", "lodging", "shopping_mall"];
  }

  // Make a separate request for each type to get more diverse results
  const promises = placeTypes.map((type) => {
    return new Promise((resolve) => {
      service.nearbySearch(
        {
          location: location,
          radius: 5000, // 5km radius
          type: type,
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          } else {
            console.error(`Error fetching nearby ${type}:`, status);
            resolve([]);
          }
        }
      );
    });
  });

  Promise.all(promises)
    .then((resultsArray) => {
      // Combine all results and remove duplicates
      const allPlaces = [];
      const placeIds = new Set();

      resultsArray.forEach((places) => {
        places.forEach((place) => {
          if (!placeIds.has(place.place_id)) {
            placeIds.add(place.place_id);
            allPlaces.push(place);
          }
        });
      });

      // Transform the results for display
      nearbyPlaces.value = allPlaces.map((place) => ({
        id: place.place_id,
        name: place.name,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        address: place.vicinity,
        rating: place.rating,
        types: place.types,
        photos: place.photos
          ? [place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 })]
          : ["/defalt-company-image.jpg"],
        // For display purposes
        distance: calculateDistance(
          userLocation.value.lat,
          userLocation.value.lng,
          place.geometry.location.lat(),
          place.geometry.location.lng()
        ),
      }));

      nearbyPlacesLoading.value = false;
    })
    .catch((error) => {
      console.error("Error fetching nearby places:", error);
      nearbyPlacesLoading.value = false;
    });
};

// Watch for category selection changes to update Google Places
watch(selectedCategories, () => {
  if (window.google) {
    fetchNearbyPlaces();
  }
});

const { getAllReviews } = useReviewStore();
const { getAllCategories } = useCategoryStore();
const { getAllCompanies } = useCompanyStore();

// Function to calculate distance using the Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const openMapModal = (latitude, longitude) => {
  mapSrc.value = `https://maps.google.com/?q=${latitude},${longitude}`;
  isMapVisible.value = true;
};

const closeMapModal = () => {
  isMapVisible.value = false;
};

const handleInput = () => {
  showSuggestions.value = true;
};

const filteredCompanies = computed(() => {
  if (selectedCategories.value.length === 0) {
    return companies.value;
  }
  return companies.value.filter(
    (company) =>
      company.category &&
      selectedCategories.value.includes(company.category.name)
  );
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
};

const getImageUrl = (images) => {
  if (images) {
    try {
      const parsedImages =
        typeof images === "string" ? JSON.parse(images) : images;
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

onMounted(async () => {
  companies.value = await getAllCompanies();
  localStorage.setItem("companies", JSON.stringify(companies.value));
  console.log("company", companies.value[0]?.id);
  loading.value = false;
});

onMounted(async () => {
  categories.value = await getAllCategories();
  console.log("cat", categories.value);
});

onMounted(async () => {
  reviews.value = await getAllReviews();
  console.log("reviews", reviews.value);
});
</script>

<template>
  <UserLayoutUser>
    <div class="categories lg:w-full mx-auto lg:mb-20 mt-16">
      <!-- Search Bar and Categories -->
      <div class="lg:pt-10 lg:ml-4 w-full mx-auto">
        <div class="flex w-72 lg:w-1/5 mt-4 mx-auto">
          <input
            v-model="search"
            @input="handleInput"
            type="text"
            class="w-56 lg:w-72 lg:h-10 pl-12 h-9 bg-white outline-none rounded-tl-full rounded-br-full"
          />
          <div
            v-if="showSuggestions && filteredCompanies.length > 0"
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
        class="lg:flex md:flex lg:w-11/12 lg:mx-auto second-cards ml-2 pb-4 mt-6"
      >
        <div class="flex flex-wrap w-full px-2 lg:px-0 pb-6">
          <div
            v-if="loading"
            class="flex justify-center items-center py-20 w-full mx-auto mt-16"
          >
            <div
              class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8"
            ></div>
          </div>
          <div
            v-else-if="
              !filteredCompanies.length ||
              filteredCompanies == '' ||
              filteredCompanies == null
            "
            class="justify-center items-center py-20 -mt-8 w-full mx-auto"
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
            <p class="text-gray-400 ml-32 lg:ml-76">No companies yet!</p>
          </div>
          <div
            v-else
            class="grid w-full gap-4 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="company in filteredCompanies.slice(0, 8)"
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
                <p
                  class="text-xs mt-4 ml-2 h-26 lg:h-26 font-normal pr-1 truncate"
                >
                  {{ company.description }}
                </p>
                <div class="flex md:-mt-4 ml-4 h-10 lg:-mt-6">
                  <i
                    @click="
                      openMapModal({
                        latitude: company.latitude,
                        longitude: company.longitude,
                      })
                    "
                    class="fa-solid fa-location-dot text-[#FF8C00] mr-12 mt-2 lg:mt-2 lg:ml-4 lg:text-xl cursor-pointer"
                  ></i>
                  <RouterLink
                    :to="{ name: 'CompanyDetail', params: { id: company.id } }"
                    class="w-20 lg:ml-20 md:ml-8 md:mt-0 lg:w-28 lg:h-10 h-8 bg-[#1B7590] rounded-lg"
                  >
                    <p
                      class="text-white text-xs hover:cursor-pointer text-center mt-2.5"
                    >
                      Explore more
                    </p>
                  </RouterLink>
                </div>
                <MapModal
                  :visible="isMapVisible"
                  :mapSrc="mapSrc"
                  @close="closeMapModal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Google Places Nearby Companies -->
      <div class="lg:w-11/12 lg:mx-auto mt-12 pb-4">
        <h2 class="p-8 font-bold text-3xl text-primaryColor">
          Discover Nearby Places
        </h2>

        <!-- Loading Indicator -->
        <div
          v-if="nearbyPlacesLoading"
          class="flex justify-center items-center py-20 w-full mx-auto mt-16"
        >
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8"
          ></div>
        </div>

        <!-- No Places Found -->
        <div
          v-else-if="!nearbyPlaces.length"
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
            No places found near your location.
          </p>
        </div>

        <!-- Display Nearby Places -->
        <div
          v-else
          class="grid w-full gap-4 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="place in nearbyPlaces"
            :key="place.id"
            class="w-[300px] xs:w-[350px] pb-4 bg-white rounded-t-lg lg:w-[300px] 2xl:w-[350px]"
          >
            <div class="rounded-t-2xl">
              <img
                :src="getImageUrl(place.photos)"
                alt=""
                class="rounded-br-4xl rounded-t-lg w-full h-[250px]"
              />
              <div class="px-4 py-2">
                <p class="font-bold text-lg">{{ place.name }}</p>
                <p class="text-sm text-gray-600">{{ place.address }}</p>
                <p class="text-sm text-gray-600">Rating: {{ place.rating }}</p>
                <p class="text-sm text-gray-600">
                  Distance: {{ place.distance.toFixed(2) }} km
                </p>
              </div>
              <div class="flex justify-between items-center px-4 py-2">
                <button
                  @click="openMapModal(place.location.lat, place.location.lng)"
                  class="text-primaryColor hover:underline"
                >
                  View on Map
                </button>
                <RouterLink
                  :to="{ name: 'PlaceDetail', params: { id: place.id } }"
                  class="text-primaryColor hover:underline"
                >
                  Explore more
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayoutUser>
</template>
