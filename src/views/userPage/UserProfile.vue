<script setup>
import UserLayoutUser from "@/layout/UserLayoutUser.vue";
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted } from "vue";
import axios from "axios";

const authStore = useAuthStore();
const userInformations = ref([null]);
const companies = ref([]);
const loading = ref(true); 


onMounted(() => {
  localStorage.getItem("user_id");
  fetchUserInfo();
  fetchratedCompany();
  // localStorage.getItem('user information' ) || '[]';
  localStorage.getItem('userInformations') && (userInformations.value = JSON.parse(localStorage.getItem('userInformations')));
  localStorage.getItem('companies') || '[]';
  console.log('tokennn',localStorage.getItem('token'))
});
const handleLogout = async () => {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (!confirmLogout) {
    return; 
  }

  try {
    await authStore.logout();

  } catch (error) {
    console.error("Logout failed:", error);
  }
};

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

const fetchUserInfo = async () => {
  loading.value = true;
  try {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const response = await axios.get(`https://bizethio-backend-production-944c.up.railway.app/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    userInformations.value = response.data;
    localStorage.setItem('user information', userInformations.value);
    console.log("User Informations:", userInformations.value);
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
  finally {
    loading.value = false; 
  }
};

const fetchratedCompany = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`https://bizethio-backend-production-944c.up.railway.app/api/companies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    companies.value = response.data;
    localStorage.setItem('companies', companies.value);
    console.log("companies", companies.value);
  } catch (error) {
    console.error("error fetching company data");
  }
  finally {
    loading.value = false; 
  }
};
</script>

<template>
  <!-- <Navbar class="" /> -->
  <UserLayoutUser>
    <div class="lg:px-20 lg:w-9/10 lg:ml-28 lg:mx-auto lg:-pt-20">
      <div
        class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl"
      >
        <p class="font-semibold lg:font-bold lg:ml-4">My profile</p>
        <div
          class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[350px] w-11/12 lg:w-8/9 mx-auto mb-4 rounded-2xl p-20"
        >
          <div class="ml-28">
            <div
              class="w-20 h-8 rounded-bl-4xl bg-white absolute top-0 right-0 rounded-tr-xl border-2 border-[#176678] text-[#1B7B90] text-xs font-semibold text-center pt-1"
            >
              <p>{{ userInformations.verification_status }}</p>
            </div>
          </div>

          <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8"></div>
        </div>
        <div v-else-if="!userInformations || userInformations == null || userInformations == ''" class=" justify-center items-center py-20 -mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
          </svg>
          <p class="text-gray-400 ml-32 lg:ml-76 ">no user information yet!</p>
        </div>
          <div v-else class="flex lg:-ml-20 lg:-mt-10">
            <img
              :src="userInformations.profile_picture_url"
              alt=""
              class="-ml-18 -mt-6 w-24 h-24 rounded-md md:w-24 md:h-24 md:ml-10 lg:w-64 lg:h-64"
            />
            <!-- <i
              class="fa-solid fa-camera-retro text-gray-200 mt-6 -ml-3 md:text-lg md:-ml-2 md:mt-10 lg:text-2xl lg:mt-40 lg:-ml-8"
            ></i> -->
            <div class="text-white -mt-6 lg:ml-10 ml-32 md:ml-32 w-11/12 lg:mt-6">
              <p
                class="ml-8 lg:ml-10 text-[17px] font-semibold text-gray-100 md:text-[20px] md:ml-20"
              >
                {{ userInformations.name }}
              </p>
              <p
                class="ml-8 lg:ml-10 text-[16px] font-semibold text-gray-100 md:text-[18px] md:ml-20"
              >
                {{ userInformations.city }}, {{ userInformations.sub_city }}
              </p>
              <div class="flex ml-6 w-56 mt-4 md:ml-20">
                <div
                  class="text-[14px] font-normal text-gray-100 -ml-10 md:text-[16px]"
                >
                  <p class="">
                    <span class="mr-5">Email</span> {{ userInformations.email }}
                  </p>
                  <p class="">
                    <span class="mr-4.5">Phone</span>
                    {{ userInformations.phone_number }}
                  </p>
                  <p class="">
                    <span class="mr-9">City</span> {{ userInformations.city }}
                  </p>
                  <p class="">
                    <span class="mr-3">Subcity</span>
                    {{ userInformations.sub_city }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex ml-10 md:-ml- mt-10 lg:mt-4  md:mt-4"
          >
            <div class="flex bg-[#075E86] hover:bg-[#6291a7] lg:w-28  md:w-32 w-32 pl-2 pt-2 h-10 rounded-lg">
              <i class="fa-solid fa-pen mr-2 text-[12px] lg:text-[13px] lg:mt-1 mt-2  lg:ml-1 -ml-1"></i>
              <router-link
                to="/EditProfile"
                class="lg:text-[13px] text-[10px] mt- font-normal text-white"
                >Edit Profile</router-link
              >
            </div>

            <div  @click="handleLogout"
              class="flex bg-[#b63030] hover:bg-[#be6e6e] cursor-pointer -mt-0.5 md:w-32 lg:w-28 w-28 pl-3 pt-3 h-10 rounded-lg ml-10 lg:ml-72"

            >
              <i
                class="fa-solid fa-right-from-bracket lg:text-md text-xs md:text-sm  lg:ml-3 ml-3 mt-  mr-2 font-light text-white"
              ></i>
              <p class="lg:-mt-1 lg:text-[13px] text-[10px] -ml-1 mt-0.5 font-light text-white">Log out</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-20 w-11/12 lg:w-6/7 lg:mx-auto mx-auto lg:pb-10">
      <p class="text-center mb-4 text-bold text-lg lg:text-xl lg:text-center">
        Rated companies
      </p>
      <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8"></div>
        </div>
        <div v-else-if="!companies || companies == null || companies == '' " class=" justify-center items-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
          </svg>
          <p class="text-gray-500 text-center">No Companies Yet!</p>
        </div>
      <div v-else class="flex flex-wrap">
        <div
          v-for="(company, index) in companies"
          :key="index"
          class="w-full sm:w-1/2 lg:w-1/3 p-2 lg:mb-6"
        >
          <div class="relative">
            <img
              :src="getImageUrl(company.images)"
              alt=""
              class="rounded-[10px] w-80 h-60"
            />
            <div
              class="bg-white h-20 w-4/5 lg:w-2/3 md:w-2/3 p-1 -mt-4 relative rounded-tr-4xl"
            >
              <p
                class="text-[13px] font-semibold h-10 w-50 mx-auto mt-2 lg:text-[15px] lg:font-semibold"
              >
                {{ company.name }}
              </p>
              <div class="flex w-10 h-6 mx-auto">
                <div
                  v-for="star in Array(
                    Math.max(0, Math.floor(company.rating_avg || 0))
                  )"
                  :key="star"
                  class="text-[11px] text-yellow-500 mx-auto"
                >
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <FooterPart class="" /> -->
  </UserLayoutUser>
</template>
