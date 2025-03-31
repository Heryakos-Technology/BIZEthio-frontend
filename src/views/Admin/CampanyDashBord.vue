<template>
  <AdminLayout>
    <!--large screen-->
    <div class="pb-10 px-5">
      <h1 class="mb-3 text-gray-500">Featured Campaigns</h1>
      <div
        class="flex justify-center items-center mb-3"
        v-if="loadingCampanies"
      >
        <div class="loader"></div>
      </div>
      <div
        class="flex justify-center items-center mb-3 "
        v-if="loadingCampanies2"
      >
        <div class="loader"></div>
      </div>
      <hr class="text-gray-300 -mx-9" />
      <div
        v-if="singleampany"
        class="shadow-md w-1/3 ml-165 mt-5 text-xs bg-white mb-3 pb-6 rounded-md"
      >
        <!-- <div v-if="images.length > 0">
            <img :src="images[0]" alt="campany Image" class="campany-image" />
        </div> -->
        <img
          :src="getImageUrl(singleampany.images)"
          alt="No Image For This Campany"
          class="rounded-[10px] w-11/11 h-60"
        />
        <div class="flex px-3 mt-10">
          <div class="flex mr-7">
            <div>
              <img src="/campantIcon.png" alt="" class="w-2/3" />
            </div>
            <div>{{ singleampany.name }}</div>
          </div>
          <div class="flex">
            <div>
              <img src="/profileicon.png" alt="" class="w-2/3" />
            </div>
            <div>{{ singleampany.owner_name }}</div>
          </div>
        </div>
        <div class="flex mt-3 px-3">
          <div>
            <img src="/textIcon.png" alt="" class="mt-2" />
          </div>
          <div class="ml-2">
            <div>
              {{ singleampany.description }}
              <span v-if="!singleampany.showFullDescription">
                {{ singleampany.description.slice(0, 50) }}...
                <a
                  href="#"
                  @click.prevent="toggleDescription(singleampany)"
                  class="text-blue-400 underline"
                  >Show more</a
                >
              </span>
              <span v-else>
                {{ singleampany.description }}
                <a
                  href="#"
                  @click.prevent="toggleDescription(singleampany)"
                  class="text-blue-400 underline"
                  >Show less</a
                >
              </span>
            </div>
          </div>
        </div>
        <div class="flex mt-3 px-3">
          <div>
            <img src="/locationicon.png" alt="" class="w-2/3" />
          </div>
          <div>{{ singleampany.address }}</div>
        </div>
        <div class="flex mt-3 px-3">
          <div>
            <img src="/phoneicon.png" alt="" class="w-2/3" />
          </div>
          <div>{{ singleampany.contact_phone }}</div>
        </div>
        <div class="flex mt-3 px-3">
          <div>
            <img src="/messageicon.png" alt="" class="" />
          </div>
          <div class="ml-1">{{ singleampany.contact_email }}</div>
        </div>
        <div class="flex mt-3 px-3">
          <div>
            <img src="/linkicon.png" alt="" class="w-2/3" />
          </div>
          <div class="">
            <div class="max-w-xs">
              <a
                :href="singleampany.website"
                class="text-blue-500 underline block truncate"
                target="_blank"
              >
                {{ singleampany.website }}
              </a>
            </div>
            <div class="max-w-xs overflow-hidden">
              <a
                :href="singleampany.social_media_links"
                class="text-blue-500 underline block truncate"
                target="_blank"
              >
                {{ singleampany.social_media_links }}
              </a>
            </div>
            <div>
              <a href="#" class="text-blue-500 underline">{{
                singleampany.license_url
              }}</a>
            </div>
          </div>
        </div>
        <div class="flex mt-3 px-3">
          <div>
            <img src="/rattingicon.png" alt="" class="w-2/3" />
          </div>
          <div>{{ singleampany.rating_avg }}</div>
        </div>
        <div class="flex mt-3 px-3 justify-between w-4/5 mx-auto">
          <button v-if="!loadingCampanies3[singleampany.id]" 
  @click="singleampany?.status !== 'approved' && singleampany?.status !== 'rejected' ? approveCampany(singleampany.id) : null"
  class="bg-[#E0F7FF] px-5 py-1 rounded-md text-black 
         "
  :class="{ 'opacity-50 cursor-not-allowed': singleampany?.status === 'approved' || singleampany?.status === 'rejected','hover:scale-130 transition-transform duration-300' : singleampany?.status !== 'approved' && singleampany?.status !== 'rejected','cursor-pointer' : singleampany?.status !== 'approved' && singleampany?.status !== 'rejected'}"
  :disabled="singleampany?.status === 'approved' || singleampany?.status === 'rejected'"
>
  Approve
</button>
<div
        class="flex justify-center items-center mb-3"
       v-if="loadingCampanies3[singleampany.id]"
      >
        <div class="loader2"></div>
      </div>
<button  v-if="!loadingCampanies4[singleampany.id]"
  @click="singleampany?.status !== 'approved' && singleampany?.status !== 'rejected' ? rejectCampany(singleampany.id) : null"
  class="bg-[#FFCCCB] px-5 py-1 rounded-md text-black 
         "
  :class="{ 'opacity-50 cursor-not-allowed': singleampany?.status === 'approved' || singleampany?.status === 'rejected','hover:scale-130 transition-transform duration-300' : singleampany?.status !== 'approved' && singleampany?.status !== 'rejected','cursor-pointer' : singleampany?.status !== 'approved' && singleampany?.status !== 'rejected'}"
  :disabled="singleampany?.status === 'approved' || singleampany?.status === 'rejected'"
>
Reject
</button>
<div
        class="flex justify-center items-center mb-3"
       v-if="loadingCampanies4[singleampany.id]"
      >
        <div class="loader2"></div>
      </div>
          <!-- <div  @click="singleampany?.status !== 'approved' && singleampany?.status !== 'rejected' ? rejectCampany(singleampany.id) : null" 
          :class="{ 'opacity-50 cursor-not-allowed': singleampany?.status === 'approved' || singleampany?.status === 'rejected','hover:scale-130' : singleampany?.status !== 'approved' && singleampany?.status !== 'rejected'  }">
            <button  class="bg-[#FFCCCB] px-5 py-1 rounded-md text-black" 
    :disabled="singleampany?.status === 'approved' || singleampany?.status === 'rejected'" 
    @click.stop>Reject</button>
          </div> -->
        </div>
      </div>
      <div></div>
    </div>
    <p v-if="errors" class="text-red-400 text-xl text-center font-semibold">
      {{ errors }}
    </p>
    <div class="px-3">
    
      <div
        v-if="campanies.length > 0"
        class="flex mt-5 text-xs bg-white py-3 font-bold rounded-md px-5 w-11/11"
      >
      
        <div class="w-1/13">Name</div>

        <div class="w-1/9">owner_name</div>

        <div class="w-1/9">description</div>

        <div class="w-1/11">category</div>

        <div class="w-1/8">address</div>

        <div class="w-1/8">contact_phone</div>

        <div class="w-1/7">contact_email</div>

        <div class="w-1/7">website</div>

        <div class="w-1/13">actions</div>
      </div>
      
    </div>

    <div v-for="campany in campanies" :key="campany.id" class="px-3" >
      <div class="flex bg-white py-3 mt-3 text-xs rounded-md px-2" :style="{ backgroundColor: campany?.status === 'approved' ? '#D4F7D4' : campany?.status === 'rejected' ? '#FFE5E5' : 'white' }">
        <div class="break-words max-w-[80px] w-1/7">{{ campany.name }}</div>

        <div class="w-1/10 ml-3">{{ campany.owner_name }}</div>

        <div class="py-2 px-4 w-1/7">
          <span v-if="!campany.showFullDescription">
            {{ campany.description.slice(0, 50) }}...
            <a
              href="#"
              @click.prevent="toggleDescription(campany)"
              class="text-blue-400 underline"
              >Show more</a
            >
          </span>
          <span v-else>
            {{ campany.description }}
            <a
              href="#"
              @click.prevent="toggleDescription(campany)"
              class="text-blue-400 underline"
              >Show less</a
            >
          </span>
        </div>
        <div class="w-1/15">{{ campany.category_id }}</div>

        <div class="w-1/7">{{ campany.address }}</div>

        <div class="w-1/10">{{ campany.contact_phone }}</div>

        <div class="w-1/5">{{ campany.contact_email }}</div>

        <div class="break-words max-w-[120px] w-1/13">
          {{ campany.website }}
        </div>

        <div class="flex justify-between w-1/9 ml-6">
          <div class="relative hover:scale-130 cursor-pointer shadow-md h-8" @click="fetchSingleCampany(campany.id)">
            <img src="/view.png" alt="" class="hover:text-yellow-400 "/>
          </div>
       
          <div 
  class="shadow-md h-8   cursor-pointer" 
  @click="campany.status !== 'approved' && campany.status !== 'rejected' ? approveCampany(campany.id) : null " 
  :class="{ 'opacity-50 cursor-not-allowed': campany.status === 'approved' || campany.status === 'rejected', 'hover:scale-130' : campany.status !== 'approved' && campany.status !== 'rejected'   } "
>
<div
        class="flex justify-center items-center mb-3"
       v-if="loadingCampanies3[campany.id]"
      >
        <div class="loader2"></div>
      </div>
  <img src="/approve.png" alt=""  v-if="!loadingCampanies3[campany.id]"/>
</div>

          <div class="shadow-md h-8  cursor-pointer" @click="campany.status !== 'approved' && campany.status !== 'rejected' ? rejectCampany(campany.id) : null "   :class="{ 'opacity-50 cursor-not-allowed': campany.status === 'approved' || campany.status === 'rejected', 'hover:scale-130' : campany.status !== 'approved' && campany.status !== 'rejected' } ">
            <div
        class="flex justify-center items-center mb-3"
       v-if="loadingCampanies4[campany.id]"
      >
        <div class="loader2"></div>
      </div>
              <img src="/ban.png" alt="" v-if="!loadingCampanies4[campany.id]"/>
          
          </div>
        </div>
      </div>
    </div>

    <div v-if="campanies.length > 0" class="px-3">
      <h1 class="mt-25 mb-3 text-gray-400 font-semibold">Campany Status</h1>
      <div class="bg-white w-1/2 px-4 py-4 shadow-md">
        <h1 class="text-gray-400 text-sm mb-3">Last Campany Performance</h1>
        <BarChart v-if="chartData.labels.length" :chartData="chartData" />
        <p v-else>Loading chart...</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layout/AdminLayout.vue";
import { defineComponent, onMounted, ref } from "vue";
import BarChart from "@/components/BarChart.vue";
import axios from "axios";
export default {
  components: {
    AdminLayout,
    BarChart,
  },
  setup() {
    const campanies = ref([]);
    const singleampany = ref("");
    const images = ref([]);
    const socialMediaLinks = ref({});
    const loadingCampanies = ref(true);
    const loadingCampanies2 = ref(false);
    const loadingCampanies3 = ref({});
    const loadingCampanies4 = ref({})
    const errors = ref("");
    // Define chartData as a reactive reference
    const chartData = ref({
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: [
        {
          label: "Approved",
          backgroundColor: "#007bff",
          data: [80, 50, 15, 40, 25, 20, 30],
        },
        {
          label: "Ban",
          backgroundColor: "#ff4d4d",
          data: [45, 48, 10, 45, 18, 60, 15],
        },
      ],
    });
    const approveCampany = async (id) => {
      //alert(`You clicked me`)
      console.log('You Clicked Me')
      loadingCampanies3.value[id] = true;
  try {
    const response = await axios.put(`https://bizethio-backend-production-944c.up.railway.app/api/companies/${id}`, {
      status: 'approved' 
    });
    if (singleampany.value.id === id) {
      singleampany.value.status = 'approved'; 
    }
    const index = campanies.value.findIndex(c => c.id === id);
    if (index !== -1) {
      campanies.value[index].status = 'approved'; 
      singleampany.value[index].status = 'approved'; 
      
    }
    loadingCampanies3.value[id] = false;
    console.log('Status:', response.data.status); 
  } catch (error) {
    loadingCampanies3.value = false
    console.error('Error updating the campany status:', error);
  } finally {
    loadingCampanies3.value[id] = false; 
  }
};

const rejectCampany = async (id) => {
  loadingCampanies4.value[id] = true;
  try {
    const response = await axios.put(`https://bizethio-backend-production-944c.up.railway.app/api/companies/${id}`, {
      status: 'rejected' 
    });
    if (singleampany.value.id === id) {
      singleampany.value.status = 'rejected'; 
    }
    const index = campanies.value.findIndex(c => c.id === id);
    if (index !== -1) {
      campanies.value[index].status = 'rejected'; 
      singleampany.value[index].status = 'rejected'; 
      
    }
    loadingCampanies4.value[id] = false;
    console.log('Status:', response.data.status); 
  } catch (error) {
    loadingCampanies4.value[id] = false;
    console.error('Error updating the campany status:', error);

  } finally {
    loadingCampanies4.value[id] = false; 
  }
};
    const toggleDescription = (campany) => {
      campany.showFullDescription = !campany.showFullDescription; 
    };
    const fetchCampanies = async () => {
      try {
        const response = await axios.get(`https://bizethio-backend-production-944c.up.railway.app/api/companies`);
        campanies.value = response.data;
        console.log("campanies", campanies.value);
        loadingCampanies.value = false;
      } catch (error) {
        console.log("Errors", error);
        loadingCampanies.value = false;
        errors.value = error;
      }
    };
    const fetchSingleCampany = async (id) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      loadingCampanies2.value = true
      const response = await axios.get(`https://bizethio-backend-production-944c.up.railway.app/api/companies/${id}`);
      singleampany.value = response.data;
      console.log("single campany", singleampany.value);
      loadingCampanies2.value = false

    };
    const getImageUrl = (images) => {
      if (images) {
        try {
          const parsedImages = JSON.parse(images);
          return parsedImages.length > 0
            ? parsedImages[0]
            : "/defalt-campany-image.jpg";
        } catch (error) {
          console.error("Error parsing image URL:", error);
          return "/defalt-campany-image.jpg";
        }
      }
      return "/defalt-campany-image.jpg";
    };
 
    onMounted(() => {
      const token = localStorage.getItem("token");
      if (token) {
        // axios.defaults.withCredentials = true;
        axios.defaults.headers.common["Authorization"] = ` Bearer ${token}`;

        fetchCampanies();

        // try {
        //           if (singleampany.value.images) {
        //               images.value = JSON.parse(singleampany.value.images);
        //           } else {
        //               console.error("Images data is undefined");
        //           }
        //       } catch (error) {
        //           console.error("Error parsing images:", error);
        //       }

        //       // Parse the social media links into an object with error handling
        //       try {
        //           if (singleampany.value.social_media_links) {
        //               socialMediaLinks.value = JSON.parse(singleampany.value.social_media_links);
        //           } else {
        //               console.error("Social media links data is undefined");
        //           }
        //       } catch (error) {
        //           console.error("Error parsing social media links:", error);
        //       }
      } else {
        this.$router.push({ name: "SignIn" });
      }
    });
    return {
      chartData,
      fetchCampanies,
      campanies,
      toggleDescription,
      fetchSingleCampany,
      singleampany,
      images,
      socialMediaLinks,
      getImageUrl,
      loadingCampanies,
      loadingCampanies2,
      errors,
      approveCampany,
      rejectCampany,
      loadingCampanies3,
      loadingCampanies4
    };
  },
};
</script>

<style>
.loader {
  border: 8px solid #f3f3f3; 
  border-top: 8px solid #3498db; 
  border-radius: 50%;
  width: 60px; 
  height: 60px; 
  animation: spin 1s linear infinite; 
}
.loader2 {
  border: 8px solid #f3f3f3; 
  border-top: 8px solid #3498db; 
  border-radius: 50%;
  width: 20px; 
  height: 20px; 
  animation: spin 1s linear infinite; 
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
