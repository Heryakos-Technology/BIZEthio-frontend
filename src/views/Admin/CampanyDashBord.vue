<template>
  <AdminLayout>
    <div class="pb-20">

    
     <div class="pb-10 px-5 w-1/2 mx-auto" v-if="hasApprovedOrRejected">
      <h1 class="text-center py-8 font-bold text-xl text-blue-700">Company Statistics</h1>
      <!-- <div class="flex justify-center items-center mb-3" v-if="loadingCampanies">
        <div class="loader"></div>
      </div> -->
             <div v-if="loadingCampanies" class="flex justify-center py-10">
        <div class="flex items-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75" 
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-lg text-blue-700">Loading Campanies...</span>
        </div>
      </div>
      <p v-if="errors" class="text-red-400 text-xl text-center font-semibold">
        {{ errors }}
      </p>
      <div v-if="chartData.labels.length > 0" class="bg-white p-4 shadow-md">
        <PieChart :chartData="chartData" />
      </div>
      <!-- <p v-else class="text-center">Loading chart...</p> -->
    </div>
    <!--large screen-->
    <div class="pb-10 px-5">

      <!-- <div
        class="flex justify-center items-center mb-3"
        v-if="loadingCampanies"
      >
        <div class="loader"></div>
      </div> -->


<!-- <div v-for="campany in filteredCampanies" :key="campany.id" class="px-3">
  <div class="flex bg-white py-3 mt-3 text-xs rounded-md px-2">
    <div class="break-words max-w-[80px] w-1/7">{{ campany.name }}</div>
 
  </div>
</div> -->
      <h1 class="-mt-10 py-8 font-bold text-2xl text-blue-700">Featured Campaigns</h1>
            <div class=" px-5">
  <!-- <h1 class="text-center py-8 font-bold text-lg text-blue-700">Search Companies</h1> -->
  <div class="pt-2 relative py-4 max-w-screen-md mx-auto text-gray-600">

    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search by campany name..."
       class="border-2 w-full border-gray-300 bg-white h-10 py-2 px-5 pr-16 rounded-lg text-sm focus:outline-none"
    />
     <button type="submit" class="absolute right-0 top-0 mt-5 mr-4" @click="searchCompanies">
            <svg
              class="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
  </div>
</div>
           <div v-if="loadingCampanies && !hasApprovedOrRejected" class="flex justify-center py-10">
        <div class="flex items-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-lg text-blue-700">Loading campanies...</span>
        </div>
      </div>
      <!-- <div
        class="flex justify-center items-center mb-3"
        v-if="loadingCampanies2"
      >
        <div class="loader"></div>
      </div> -->
       <div v-if="loadingCampanies2" class="flex justify-center py-10">
        <div class="flex items-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-lg text-blue-700">Loading campanies...</span>
        </div>
      </div>
      <hr class="text-gray-300 -mx-9" />

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
    <div class="modal w-1/3 "  v-if="singleampany">
 
   <div class="flex">
     <div
       
         class="modal-content ">
        <!-- <div v-if="images.length > 0">
            <img :src="images[0]" alt="campany Image" class="campany-image" />
        </div> -->
     
       
<p :class="['text-right', 'font-bold', 'mb-2', 'text-xl', 
    singleampany.status === 'rejected' ? 'text-red-300' : 
    singleampany.status === 'approved' ? 'text-green-300' : 
    'text-blue-400']">
    {{ singleampany.status }}
</p>

        <img
          :src="getImageUrl(singleampany.images)"
          alt="No Image For This Campany"
          class="rounded-[10px]  h-60"
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
                <br>
                <a
                  href="#"
                  @click.prevent="toggleDescription(singleampany)"
                  class="text-blue-400 underline"
                  >Show more</a
                >
              </span>
               <span  v-else>
                 {{ singleampany.description }}
               
                
                <br><a
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
        
        <div class="flex  px-3 justify-between w-4/5 mx-auto">
          
          <button
            v-if="!loadingCampanies3[singleampany.id]"
            @click="
              singleampany?.status !== 'approved' &&
              singleampany?.status !== 'rejected'
                ? confirmApprove(singleampany.id)
                : null
            "
            class="bg-[#E0F7FF] px-5 py-1 rounded-md text-black"
            :class="{
              'opacity-50 cursor-not-allowed':
                singleampany?.status === 'approved' ||
                singleampany?.status === 'rejected',
              'hover:scale-130 transition-transform duration-300':
                singleampany?.status !== 'approved' &&
                singleampany?.status !== 'rejected',
              'cursor-pointer':
                singleampany?.status !== 'approved' &&
                singleampany?.status !== 'rejected',
            }"
            :disabled="
              singleampany?.status === 'approved' ||
              singleampany?.status === 'rejected'
            "
          >
            Approve
          </button>

                  <div v-if="showApproveConfirm" class="modalConfirm">
  <div class="modal-content">
    <h3 class="text-lg font-bold mb-4">Confirm Approval</h3>
    <p class="mb-6">
      Are you sure you want to approve the company? This action cannot be undone.
    </p>
    <div class="flex justify-end gap-3">
      <button
        @click="cancelApprove"
        class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 transition duration-200"
      >
        Cancel
      </button>
      <button
        @click="approveCampany(singleampany.id)"
        class="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white transition duration-200 flex items-center"
      >
        {{ approveMessage }}
      </button>
    </div>
  </div>
</div>
          <!-- <div
            v-if="showApproveConfirm"
            class="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center"
          >
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 class="text-lg font-bold mb-4">Confirm Approval</h3>
              <p class="mb-6">
                Are you sure you want to Approve the Campany

                action cannot be undone.
              </p>
              <div class="flex justify-end gap-3">
                <button
                  @click="cancelApprove"
                  class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  @click="approveCampany(singleampany.id)"
                  class="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white transition duration-200 flex items-center"
                >
     
               {{ approveMessage }}

                </button>
              </div>
            </div>
          </div> -->


          <button
            v-if="!loadingCampanies4[singleampany.id]"
            @click="
              singleampany?.status !== 'approved' &&
              singleampany?.status !== 'rejected'
                ? confirmReject(singleampany.id)
                : null
            "
            class="bg-[#FFCCCB] px-5 py-1 rounded-md text-black"
            :class="{
              'opacity-50 cursor-not-allowed':
                singleampany?.status === 'approved' ||
                singleampany?.status === 'rejected',
              'hover:scale-130 transition-transform duration-300':
                singleampany?.status !== 'approved' &&
                singleampany?.status !== 'rejected',
              'cursor-pointer':
                singleampany?.status !== 'approved' &&
                singleampany?.status !== 'rejected',
            }"
            :disabled="
              singleampany?.status === 'approved' ||
              singleampany?.status === 'rejected'
            "
          >
            Reject
          </button>
           <div
            v-if="showRejectConfirm"
            class="modalConfirm"
          >
            <div class="modal-content">
              <h3 class="text-lg font-bold mb-4">Confirm Rejection</h3>
              <p class="mb-6">
                Are you sure you want to reject the Campany
                <!-- <span class="font-semibold">{{ userToDelete?.name }}</span>? This -->
                action cannot be undone.
              </p>
              <div class="flex justify-end gap-3">
                <button
                  @click="cancelReject"
                  class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  @click="rejectCampany(singleampany.id)"
                  class="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white transition duration-200 flex items-center"
                >
      
               {{ rejectMessage }}

                </button>
              </div>
            </div>
          </div>

        
        </div>
       

      </div>
                           <div>
          <!-- <button @click="closeCompanyModal" class="  text-gray-600 hover:text-red-500 text-xl mt-20 ml-5">closee</button> -->
            <button @click="closeCompanyModal" class="mt-20 bg-red-500 rounded-full w-10 h-10  text-white  p-2 ml-5"><i class="fa-solid fa-xmark"></i></button>
      </div>
   </div>

      
      </div>
      
      <div v-if="noCampanyData" class="text-2xl text-center text-green-700 font-bold">{{  campanyData}}</div>
    <div v-for="campany in filteredCampanies" :key="campany.id" class="px-3">
 
      <div
        class="flex bg-white py-3 mt-3 text-xs rounded-md px-2"
        :style="{
          backgroundColor:
            campany?.status === 'approved'
              ? '#D4F7D4'
              : campany?.status === 'rejected'
              ? '#FFE5E5'
              : 'white',
        }"
      >
        <div class="break-words max-w-[80px] w-1/7">{{ campany.name }}</div>

        <div class="w-1/10 ml-3">{{ campany.owner_name }}</div>

     <div class="py-2 px-4 w-1/7">
  <span v-if="!campany.showFullDescription">
    <span v-if="campany.description">
      {{ campany.description.slice(0, 10) }}...
    </span>
    <br>
    <a
      href="#"
      @click.prevent="toggleDescription(campany)"
      class="text-blue-400 underline"
    >Show more</a>
  </span>
  <span v-else>
    <span v-if="campany.description">
      {{ campany.description }}
    </span>
    <br>
    <a
      href="#"
      @click.prevent="toggleDescription(campany)"
      class="text-blue-400 underline"
    >Show less</a>
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
          <div
            class="relative hover:scale-130 cursor-pointer shadow-md h-8"
            @click="fetchSingleCampany(campany.id);openCompanyModal(company.id)"
          >
            <img src="/view.png" alt="" class="hover:text-yellow-400" />
          </div>

          <div
            class="shadow-md h-8 cursor-pointer"
            @click="
              campany.status !== 'approved' && campany.status !== 'rejected'
                ? confirmApprove(campany.id)
                : null
            "
            :class="{
              'opacity-50 cursor-not-allowed':
                campany.status === 'approved' || campany.status === 'rejected',
              'hover:scale-130':
                campany.status !== 'approved' && campany.status !== 'rejected',
            }"
          >

            <div
              class="flex justify-center items-center mb-3"
              v-if="loadingCampanies3[campany.id]"
            >
              <div class="loader2"></div>
            </div>
            <img
              src="/approve.png"
              alt=""
              v-if="!loadingCampanies3[campany.id]"
            />
          </div>
               <div v-if="showApproveConfirm" class="modalConfirm">
  <div class="modal-content">
    <h3 class="text-lg font-bold mb-4">Confirm Approval</h3>
    <p class="mb-6">
      Are you sure you want to approve the company? This action cannot be undone.
    </p>
    <div class="flex justify-end gap-3">
      <button
        @click="cancelApprove"
        class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 transition duration-200"
      >
        Cancel
      </button>
      <button
        @click="approveCampany(currentCompanyId)"
        class="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white transition duration-200 flex items-center"
      >
        {{ approveMessage }}
      </button>
    </div>
  </div>
</div>
          <div
            class="shadow-md h-8 cursor-pointer"
            @click="
              campany.status !== 'approved' && campany.status !== 'rejected'
                ? confirmReject(campany.id)
                : null
            "
            :class="{
              'opacity-50 cursor-not-allowed':
                campany.status === 'approved' || campany.status === 'rejected',
              'hover:scale-130':
                campany.status !== 'approved' && campany.status !== 'rejected',
            }"
          >
            <div
              class="flex justify-center items-center mb-3"
              v-if="loadingCampanies4[campany.id]"
            >
              <div class="loader2"></div>
            </div>
            <img src="/ban.png" alt="" v-if="!loadingCampanies4[campany.id]" />
          </div>
           <div
            v-if="showRejectConfirm"
            class="modalConfirm"
          >
            <div class="modal-content">
              <h3 class="text-lg font-bold mb-4">Confirm Approval</h3>
              <p class="mb-6">
                Are you sure you want to reject the Campany
                <!-- <span class="font-semibold">{{ userToDelete?.name }}</span>? This -->
                action cannot be undone.
              </p>
              <div class="flex justify-end gap-3">
                <button
                  @click="cancelReject"
                  class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  @click="rejectCampany(currentCompanyId)"
                  class="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white transition duration-200 flex items-center"
                >
       
               {{ rejectMessage }}

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="flex justify-between w-1/2 mx-auto mt-5">
    <div>
      <button class="bg-white px-2 shadow-sm" @click="goToFirst" :class="{ active: activeNumber === 1 }">First</button>
    </div>
    <div>
      <button class="bg-white px-2 shadow-sm" @click="goToPrevious"  :disabled="activeNumber === 1">Previous</button>
    </div>
    <!-- <button class="number bg-white px-2 shadow-sm"  :class="{ active: activeNumber === 1 }" @click="handleButtonClick(1)">1</button> -->
    <button class="number bg-white px-2 shadow-sm" :class="{ active: activeNumber === 2 }"  @click="handleButtonClick(2)">2</button>
    <button class="number bg-white px-2 shadow-sm"  :class="{ active: activeNumber === 3 }" @click=" handleButtonClick(3)">3</button>
    <button class="number bg-white px-2 shadow-sm"  :class="{ active: activeNumber === 4 }" @click=" handleButtonClick(4)">4</button>
    <button class="number bg-white px-2 shadow-sm"  :class="{ active: activeNumber === 5 }" @click=" handleButtonClick(5)">5</button>
    <button class="number bg-white px-2 shadow-sm"  :class="{ active: activeNumber === 6 }" @click=" handleButtonClick(6)">6</button>
    <div>
      <button class="bg-white px-2 shadow-sm"   :disabled="activeNumber === totalPages" @click="goToNext">Next</button>
    </div>
    <div>
      <button class="bg-white px-2 shadow-sm" @click="goToLast"   :disabled="activeNumber === totalPages">Last</button>
    </div>
  </div>
 
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layout/AdminLayout.vue";
import { defineComponent, onMounted, ref } from "vue";
import BarChart from "@/components/BarChart.vue";
import PieChart from "@/components/PieChart.vue"; 
import axios from "axios";
import { useToast } from 'vue-toast-notification';
import { computed } from "vue";

export default {
  components: {
    AdminLayout,
    BarChart,
    PieChart
  },
  setup() {
      const chartData = ref({
      labels: [],
      datasets: [],
    });
const hasApprovedOrRejected = computed(() => {
  return (
    chartData.value.datasets &&
    chartData.value.datasets[0] &&
    (chartData.value.datasets[0].data[0] > 0 || chartData.value.datasets[0].data[1] > 0)
  );
});
    const $toast = useToast();
    const campanies = ref([]);
    const singleampany = ref("");
    const images = ref([]);
    const socialMediaLinks = ref({});
    const loadingCampanies = ref(true);
    const loadingCampanies2 = ref(false);
    const loadingCampanies3 = ref({});
    const loadingCampanies4 = ref({});
    const errors = ref("");
    const showCompanyModal = ref(false);
    const selectedCompany = ref(null);
    const showApproveConfirm = ref(false);
    const approvedCampany = ref(false)
    const approveMessage = ref("Approve");
    const rejectMessage = ref("Reject");

    const campanyData = ref([]);
    const noCampanyData = ref(false);
    const currentCompanyId = ref(null);
    const showRejectConfirm = ref(false)
    const searchTerm = ref('');
    const paginatedCampanies = ref([])
     const activeNumber = ref(1);
     const totalPages = ref(0);
    // Define chartData as a reactive reference
    const loading = ref({
      approve: false,
      reject: false,
    });
    const filteredCampanies = computed(() => {
  if (!searchTerm.value) return campanies.value;
  return campanies.value.filter(campany =>
    campany.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
    // const chartData = ref({
    //   labels: ["M", "T", "W", "T", "F", "S", "S"],
    //   datasets: [
    //     {
    //       label: "Approved",
    //       backgroundColor: "#007bff",
    //       data: [80, 50, 15, 40, 25, 20, 30],
    //     },
    //     {
    //       label: "Ban",
    //       backgroundColor: "#ff4d4d",
    //       data: [45, 48, 10, 45, 18, 60, 15],
    //     },
    //   ],
    // });
    const goToFirst = ()=> {
      setActive(1);
      fetchCampanies(1);
    }
    const goToPrevious = ()=> {
      if (activeNumber.value > 1) {
        setActive(activeNumber.value - 1);
        fetchCampanies(activeNumber.value - 1);
      }
    }
    const goToNext = ()=> {
      if (activeNumber.value < totalPages) {
        setActive(activeNumber.value + 1);
        fetchCampanies(activeNumber.value + 1);
      }
    }

   const goToLast = ()=> {
      setActive(totalPages);
      fetchCampanies(totalPages);
    }

    const cancelApprove = () => {
      singleampany.value = false
      showApproveConfirm.value = false;
    };
    const cancelReject = ()=>{
      singleampany.value = false
showRejectConfirm.value = false
    }
const approveCampany = async () => {
  if (!currentCompanyId.value) return;

  const id = currentCompanyId.value; // Use the stored id
  approveMessage.value = "Approving...";
  loading.value.approve = true;
  loadingCampanies3.value[id] = true;

  try {
    const response = await axios.put(
      `https://bizethio-backend-production-4c6c.up.railway.app/api/companies/${id}`,
      { status: "approved" }
    );
    approveMessage.value = 'Approved'
 showApproveConfirm.value = false;
    approveCampany.value = true;
    singleampany.value  = false
        $toast.success("Company Approved successfully.", { position: 'top' });
    // Refresh the page after success
    // location.reload();
    updateCompanyStats();
 if (singleampany.value.id === id) {
      singleampany.value.status = "approved";
    }

    const index = campanies.value.findIndex((c) => c.id === id);
    if (index !== -1) {
      campanies.value[index].status = "approved";
      console.log(`approved company ID: ${id}`); // Debugging log
    } else {
      console.error(`Company with ID ${id} not found`); // Debugging log
    }

  } catch (error) {
    showApproveConfirm.value = false;
    approveMessage.value = "Approve";
      $toast.error("Error approving company try again!.", { position: 'top' });
       singleampany.value  = false

  } finally {
    loadingCampanies3.value[id] = false;
    loading.value.approve = false;
    approveMessage.value = "Approve";
  }
};
   const confirmApprove = (id) => {
  currentCompanyId.value = id; // Store the id for the company to approve
  showApproveConfirm.value = true; // Show the approval confirmation modal
};
const confirmReject = (id)=>{
  showRejectConfirm.value = true
  currentCompanyId.value = id;
}


  const rejectCampany = async () => {
  if (!currentCompanyId.value) return; // Ensure we have a valid ID

  const id = currentCompanyId.value;
  rejectMessage.value = 'Rejecting...' // Use the stored ID
  loadingCampanies4.value[id] = true;

  try {
    const response = await axios.put(
      `https://bizethio-backend-production-4c6c.up.railway.app/api/companies/${id}`,
      {
        status: "rejected",
      }
    );
rejectMessage.value = 'Rejected'
 showRejectConfirm.value = false;
    rejectCampany.value = true;
    singleampany.value  = false
    
    $toast.success("Company Rejected successfully.", { position: 'top' });
    if (singleampany.value.id === id) {
      singleampany.value.status = "rejected";
    }

    const index = campanies.value.findIndex((c) => c.id === id);
    if (index !== -1) {
      campanies.value[index].status = "rejected";
      console.log(`Rejected company ID: ${id}`); // Debugging log
    } else {
      console.error(`Company with ID ${id} not found`); // Debugging log
    }

    console.log("Status:", response.data.status);
        // location.reload();(
        updateCompanyStats();
  } catch (error) {
    rejectCampany.value = "Reject"
        $toast.error("Error rejecting company try again!.", { position: 'top' });
       singleampany.value  = false
       showRejectConfirm.value = false;
    console.error("Error updating the company status:", error);
  } finally {
    loadingCampanies4.value[id] = false;
  }
};
    const toggleDescription = (campany) => {
      campany.showFullDescription = !campany.showFullDescription;
    };
    const fetchCampanies = async (number) => {
      try {
        const response = await axios.get(
          `https://bizethio-backend-production-4c6c.up.railway.app/api/companies/paginated?page=${number}`
        );
        campanies.value = response.data.data;
        noCampanyData.value = false;
        localStorage.setItem("campanies", JSON.stringify(campanies.value));
        console.log("campanies", campanies.value);
        totalPages.value = response.data.last_page;
        
        loadingCampanies.value = false;
      } catch (error) {
        console.log("Errors", error);
        loadingCampanies.value = false;
        errors.value = error;
      }
      if (campanies.value.length === 0) {
        noCampanyData.value = true;
        campanyData.value = "No Campany Found";
      }
      
    };
    const handleButtonClick = (number)=> {
      setActive(number);
      fetchCampanies(number);
    }
    // const fetchPaginatedCampanies = async()=>{
    //      try {
    //     const response = await axios.get(
    //       `https://bizethio-backend-production-4c6c.up.railway.app/api/companies/paginated?page=${page}`
    //     );
    //     campanies.value = response.data.data;
    //     localStorage.setItem("campanies", JSON.stringify(campanies.value));
    //     console.log("campanies", campanies.value);
    //     loadingCampanies.value = false;
    //   } catch (error) {
    //     console.log("Errors", error);
    //     loadingCampanies.value = false;
    //     errors.value = error;
    //   }
    //   if (campanies.value.length === 0) {
    //     noCampanyData.value = true;
    //     campanyData.value = "No Campany Found";
    //   }
    // } 
    const fetchCompanyStats = async () => {
      await fetchCampanies();
      const stats = {
        approved: 0,
        rejected: 0,
      };

      campanies.value.forEach(campany => {
        if (campany.status === "approved") {
          stats.approved++;
        } else if (campany.status === "rejected") {
          stats.rejected++;
        }
      });

      return stats;
    };
    
    const updateCompanyStats = async () => {
      const stats = await fetchCompanyStats();
      chartData.value = {
        labels: ["Approved", "Rejected"],
        datasets: [
          {
            label: "Company Status",
            backgroundColor: ["#007bff", "#ff4d4d"],
            data: [stats.approved, stats.rejected],
          },
        ],
      };
    };

    const fetchSingleCampany = async (id) => {
      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth",
      // });
      loadingCampanies2.value = true;
      const response = await axios.get(
        `https://bizethio-backend-production-4c6c.up.railway.app/api/companies/${id}`
      );
      singleampany.value = response.data;
      console.log("single campany", singleampany.value);
      loadingCampanies2.value = false;
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
const openCompanyModal = async (id) => {
  try {
    const response = await axios.get(`/admin/campanies/${id}`);
    selectedCompany.value = response.data;
    singleampany.value = true;
  } catch (error) {
    console.error(error);
    errors.value = "Failed to fetch company details";
  }
};

const closeCompanyModal = () => {
  singleampany.value = false;
  selectedCompany.value = null;
};
    onMounted(() => {
       updateCompanyStats();
      const token = localStorage.getItem("token");
      if (token) {
        // axios.defaults.withCredentials = true;
        axios.defaults.headers.common["Authorization"] = ` Bearer ${token}`;
   const storedCampanies = localStorage.getItem("campanies");

if (storedCampanies) {
  const campanies = JSON.parse(storedCampanies);
  console.log('campanies from local storage',campanies); // Use the retrieved campanies as needed
} else {
  console.log("No campanies found in local storage.");
}
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
 
    function setActive(number) {
      activeNumber.value = number; // Set the active number
    }
    return {
      totalPages,
      goToNext,
      goToPrevious,
      goToFirst,
      goToLast,
      activeNumber,
      handleButtonClick,
      chartData,
      setActive,
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
      loadingCampanies4,
      showApproveConfirm,
      cancelApprove,
      confirmApprove,
      loading,
      showCompanyModal,
      selectedCompany,
      openCompanyModal,
      closeCompanyModal,
      approvedCampany,
      approveMessage,
      campanyData,
      noCampanyData,
      currentCompanyId,
      cancelReject,
      confirmReject,
      showRejectConfirm,
      rejectMessage,
       chartData,
       fetchCompanyStats,
       updateCompanyStats,
      hasApprovedOrRejected,
      searchTerm,
      filteredCampanies,

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
.modalConfirm{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 100px;
  margin-left:210px;

  background-color: rgba(0, 0, 0, 0.423);
  /* display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; */
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {

  
  border-radius: 8px;
  /* padding: 20px; */
  /* max-width: 600px;
  width: 90%; */
  width:350px;          
  margin-left: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.active {
  color: blue; /* Change to the desired shade of blue */
  background-color: lightblue; /* Optional: Change background color */
}
.number {
  transition: background-color 0.3s; /* Smooth transition */
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
