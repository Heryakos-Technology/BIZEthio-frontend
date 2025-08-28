<script setup>
import { onMounted, ref } from "vue";
import UserLayout from "@/layout/UserLayout.vue";
import { useRoute } from "vue-router";
import { useCompanyStore } from "@/stores/company";
import { useReviewStore } from "@/stores/review";
import { useCategoryStore } from "@/stores/category";
import { useAuthStore } from "@/stores/auth";

const { getCompany, updateCompany } = useCompanyStore();
const { getReview } = useReviewStore();
const { getAllCategories } = useCategoryStore();

const route = useRoute();
const company = ref(null);
const loading = ref(true);
const reviews = ref([]);
const loadingReviews = ref(true);
const isPopoverVisible = ref(false);
const authStore = useAuthStore();
const editableCompany = ref({});
const socialMediaLinks = ref(["", "", ""]);
const categories = ref([]);
const isSaving = ref(false); // Add a loading state for the save button
const handleLogout = async () => {
//  const confirmLogout = confirm("Are you sure you want to log out?");
  // if (!confirmLogout) {
  //   return; 
  // }

  try {
    await authStore.logoutCampany();

  } catch (error) {
    console.error("Logout failed:", error);
  }
};
onMounted(async () => {
  try {
    const response = await getReview(props.company?.id);
    if (response && response.message === "No reviews found for this company") {
      reviews.value = [];
    } else {
      reviews.value = response;
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);

    reviews.value = [];
  } finally {
    loadingReviews.value = false;
  }
  console.log("reviews", reviews.value);
});

onMounted(() => {
  window.scrollTo(0, 0);
});

onMounted(async () => {
  try {
    company.value = await getCompany(route.params.id);
    editableCompany.value = { ...company.value };

    if (company.value?.social_media_links) {
      try {
        socialMediaLinks.value = JSON.parse(company.value.social_media_links);
        // Ensure the array has at least 3 elements
        while (socialMediaLinks.value.length < 3) {
          socialMediaLinks.value.push("");
        }
      } catch (error) {
        console.error("Error parsing social media links:", error);
        socialMediaLinks.value = ["", "", ""];
      }
    }

    // Fetch categories
    try {
      categories.value = await getAllCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  } catch (error) {
    console.error("Error fetching company:", error);
  } finally {
    loading.value = false;
  }
  // console.log(company.value);
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

const togglePopover = () => {
  isPopoverVisible.value = !isPopoverVisible.value;
  if (isPopoverVisible.value) {
    editableCompany.value = { ...company.value };
  }
};

const saveChanges = async () => {
  isSaving.value = true; // Set loading state to true when saving starts

  const payload = {
    ...editableCompany.value,
    social_media_links: JSON.stringify(socialMediaLinks.value),
  };

  try {
    const response = await updateCompany(payload, payload.id);
    if (response.success) {
      company.value = { ...editableCompany.value };
      isPopoverVisible.value = false; // Close the popover
    } else {
      console.error("Error updating company:", response.error);
    }
  } catch (error) {
    console.error("Error updating company:", error);
  } finally {
    console.log("Saving changes:", payload);
    isPopoverVisible.value = false;
    isSaving.value = false; // Set loading state to false when saving completes (success or failure)
  }
};

const cancelChanges = () => {
  isPopoverVisible.value = false;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
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
         <div class="flex">

           <div
             class="mx-auto w-[90%] aspect-video rounded-md shadow-sm bg-center bg-cover lg:max-w-[780px] xl:max-w-[1025px] lg:max-h-[430px] xl:max-h-[500px]"
             :style="{ backgroundImage: `url(${getImageUrl(company?.images)})` }"
           ></div>
           <div  @click="handleLogout"
                 class="flex bg-[#b63030] hover:bg-[#be6e6e] cursor-pointer -mt-0.5 md:w-32 lg:w-28 w-28 pl-3 pt-3 h-10 rounded-lg ml-10 "
   
               >
                 <i
                   class="fa-solid fa-right-from-bracket lg:text-md text-xs md:text-sm  lg:ml-3 ml-3 mt-  mr-2 font-light text-white"
                 ></i>
                 <p class="lg:-mt-1 lg:text-[13px] text-[10px] -ml-1 mt-0.5 font-light text-white">Log out</p>
               </div>
         </div>
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

                <button
                  @click="togglePopover"
                  class="flex items-center text-white gap-x-1 py-2 px-2 cursor-pointer rounded-md hover:bg-lightBlue justify-center bg-primaryColor"
                >
                  Edit Profile

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-white size-5"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"
                    ></path>
                  </svg>
                </button>
              </div>

              <div class="flex gap-x-4 mt-2"></div>
            </div>

            <p class="text-gray-500 text-lg">
              Category: {{ company?.category?.name }}
            </p>
          </div>

          <div class="">
            <p class="text-base text-primaryColor font-bold">Description</p>

            <p class="text-gray-600 text-sm mt-8 text-pretty">
              {{ company?.description }}
            </p>
          </div>

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
              <p>{{ company?.city }} | {{ company?.address }}</p>
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
            <div class="">
              <h2 class="text-2xl font-bold text-darkBlue">
                Recent Reviews And Ratings ({{ company?.rating_avg }}/5)
              </h2>

              <div
                v-if="loadingReviews"
                class="flex justify-center items-center py-10"
              >
                <div
                  class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primaryColor"
                ></div>
              </div>

              <div
                v-else-if="reviews.length === 0"
                class="font-bold text-primaryColor text-xl mt-8"
              >
                No ratings found.
              </div>
              <div  @click="handleLogout"
                 class="flex bg-[#b63030] hover:bg-[#be6e6e] cursor-pointer mt-5 md:w-32 lg:w-28 w-28 pl-3 pt-3 h-10 rounded-lg"
   
               >
                 <i
                   class="fa-solid fa-right-from-bracket lg:text-md text-xs md:text-sm  lg:ml-3 ml-3 mt-  mr-2 font-light text-white"
                 ></i>
                 <p class="lg:-mt-1 lg:text-[13px] text-[10px] -ml-1 mt-0.5 font-light text-white">Log out</p>
               </div>

              <div class="space-y-6 grid lg:grid-cols-2 gap-x-10 mt-8">
                <div
                  v-for="review in reviews"
                  :key="review.id"
                  class="py-4 px-2 space-y-8 rounded-md bg-white max-w-[410px] lg:max-w-[480px] h-[175px]"
                >
                  <div class="flex justify-between">
                    <div class="space-y-2">
                      <span class="text-sm font-medium text-gray-800">{{
                        review.user.name
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
                  <div class="flex items-center justify-end mt-2">
                    <span class="text-sm text-gray-600">{{
                      formatDate(review.updated_at)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popover -->
    <div
      v-if="isPopoverVisible"
      class="fixed  top-12 left-0 w-full h-full pb-8 bg-black flex justify-center items-center overflow-auto"
    >
      <div
        class="bg-white pt-32 p-8 rounded-md shadow-lg w-[90%] max-w-3xl max-h-[700px] overflow-y-auto"
      >
        <h2 class="text-2xl font-bold mb-4">Edit Company Profile</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Column 1 -->
          <div>
            <div class="mb-4">
              <label
                for="name"
                class="block text-sm/6 font-medium text-gray-900"
                >Name</label
              >
              <input
                type="text"
                id="name"
                v-model="editableCompany.name"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="owner_name"
                class="block text-sm/6 font-medium text-gray-900"
                >Owner Name</label
              >
              <input
                type="text"
                id="owner_name"
                v-model="editableCompany.owner_name"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="operating_hours"
                class="block text-sm/6 font-medium text-gray-900"
                >Operating Hours</label
              >
              <input
                type="number"
                id="operating_hours"
                v-model.number="editableCompany.operating_hours"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="category_id"
                class="block text-sm/6 font-medium text-gray-900"
                >Category</label
              >
              <select
                id="category_id"
                v-model="editableCompany.category_id"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="contact_phone"
                class="block text-sm/6 font-medium text-gray-900"
                >Contact Phone</label
              >
              <input
                type="text"
                id="contact_phone"
                v-model="editableCompany.contact_phone"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="contact_email"
                class="block text-sm/6 font-medium text-gray-900"
                >Contact Email</label
              >
              <input
                type="email"
                id="contact_email"
                v-model="editableCompany.contact_email"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <!-- Column 2 -->
          <div>
            <div class="mb-4">
              <label
                for="address"
                class="block text-sm/6 font-medium text-gray-900"
                >Address</label
              >
              <input
                type="text"
                id="address"
                v-model="editableCompany.address"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="city"
                class="block text-sm/6 font-medium text-gray-900"
                >City</label
              >
              <input
                type="text"
                id="city"
                v-model="editableCompany.city"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="region"
                class="block text-sm/6 font-medium text-gray-900"
                >Region</label
              >
              <input
                type="text"
                id="region"
                v-model="editableCompany.region"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="country"
                class="block text-sm/6 font-medium text-gray-900"
                >Country</label
              >
              <input
                type="text"
                id="country"
                v-model="editableCompany.country"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="website"
                class="block text-sm/6 font-medium text-gray-900"
                >Website</label
              >
              <input
                type="url"
                id="website"
                v-model="editableCompany.website"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            <div class="mb-4">
              <label
                for="status"
                class="block text-sm/6 font-medium text-gray-900"
                >Status</label
              >
              <select
                id="status"
                v-model="editableCompany.status"
                class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Full-width elements outside the grid -->
        <div class="mb-4">
          <label
            for="description"
            class="block text-sm/6 font-medium text-gray-900"
            >Description</label
          >
          <textarea
            id="description"
            v-model="editableCompany.description"
            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-sm/6 font-medium text-gray-900"
            >Social Media Links</label
          >
          <div class="flex flex-col md:flex-row gap-2">
            <input
              type="url"
              v-model="socialMediaLinks[0]"
              placeholder="Facebook"
              class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="url"
              v-model="socialMediaLinks[1]"
              placeholder="Instagram"
              class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              type="url"
              v-model="socialMediaLinks[2]"
              placeholder="Linkedin"
              class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div class="flex justify-end mt-6 gap-x-4">
          <button
            @click="cancelChanges"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="bg-primaryColor cursor-pointer hover:bg-lightBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="isSaving"
          >
            <span v-if="isSaving">Saving...</span>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
