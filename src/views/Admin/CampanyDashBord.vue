<template>
    <AdminLayout>
      
     <!--large screen-->
     <div class="pb-10 px-5">
        <h1 class="mb-3 text-gray-500 ">Featured Campaigns</h1>
        <div class="flex justify-center items-center mb-3" v-if="loadingCampanies">
        <div class="loader"></div>
    </div>
        <hr class="text-gray-300 -mx-9">
      <div v-if="singleampany" class=" shadow-md w-1/3  ml-165 mt-5 text-xs  bg-white mb-3 pb-6 rounded-md">
        <!-- <div v-if="images.length > 0">
            <img :src="images[0]" alt="Company Image" class="company-image" />
        </div> -->
        <img :src="getImageUrl(singleampany.images)"  alt="No Image For This Campany" class="rounded-[10px] w-11/11 h-60">
<div class="flex px-3 mt-10">
<div class="flex mr-7">
<div>
  <img src="/campantIcon.png" alt="" class="w-2/3">
</div>
<div>{{singleampany.name}}</div>
</div>
<div class="flex ">
<div>
  <img src="/profileicon.png" alt="" class="w-2/3">
</div>
<div>{{singleampany.owner_name}}
</div>
</div>
</div>
<div class="flex mt-3 px-3">
  <div>
      <img src="/textIcon.png" alt="" class=" mt-2 "> 
  </div>
  <div class="ml-2">
      <div>

      {{ singleampany.description }}
      <span v-if="!singleampany.showFullDescription">
                        {{ singleampany.description.slice(0, 50) }}... 
                        <a href="#" @click.prevent="toggleDescription(singleampany)" class="text-blue-400 underline">Show more</a>
                    </span>
                    <span v-else>
                        {{ singleampany.description }} 
                        <a href="#" @click.prevent="toggleDescription(singleampany)" class="text-blue-400 underline">Show less</a>
                    </span>
      </div>
     
  </div>
</div>
<div class="flex mt-3 px-3">
  <div>
      <img src="/locationicon.png" alt="" class="w-2/3 "> 
  </div>
  <div>{{singleampany.address}}
     
  </div>
</div>
<div class="flex mt-3 px-3">
  <div>
      <img src="/phoneicon.png" alt="" class="w-2/3"> 
  </div>
  <div>{{singleampany.contact_phone}}
     
  </div>
</div>
<div class="flex mt-3 px-3">
  <div>
      <img src="/messageicon.png" alt="" class=""> 
  </div>
  <div class="ml-1">{{singleampany.contact_email}}
     
  </div>
</div>
<div class="flex mt-3 px-3">
  <div>
      <img src="/linkicon.png" alt="" class="w-2/3"> 
  </div>
  <div class="">
    <div class="max-w-xs">
        <a :href="singleampany.website" class="text-blue-500 underline block truncate" target="_blank">
            {{ singleampany.website }}
        </a>
    </div>
      <div class="max-w-xs overflow-hidden">
        <a :href="singleampany.social_media_links" class="text-blue-500 underline block truncate" target="_blank">
            {{ singleampany.social_media_links }}
        </a>
    </div>
      <!-- <div v-for="(link, platform) in socialMediaLinks" :key="platform">
                <a :href="link" target="_blank">{{ platform }}</a>
            </div> -->
      <div><a href="#" class="text-blue-500 underline">{{singleampany.license_url}}</a></div>
      
     
  </div>
</div>
<div class="flex mt-3 px-3">
  <div>
      <img src="/rattingicon.png" alt="" class="w-2/3"> 
  </div>
  <div>{{singleampany.rating_avg}}
     
  </div>
</div>
<div class="flex mt-3 px-3 justify-between w-4/5 mx-auto" >
  <div><button class="bg-[#E0F7FF] px-5 py-1 rounded-md">Approve</button></div>
  <div><button class="bg-red-200 px-9 py-1 rounded-md">Ban</button></div>
</div>
      </div>
      <div>
        
      </div>
    </div>
    <p v-if="errors" class="text-red-400 text-xl text-center font-semibold">{{ errors }}</p>
    <div class="px-3">
      <div v-if="campanies.length>0" class="flex  mt-5 text-xs bg-white py-3 font-bold rounded-md px-5 w-11/11 ">

<div class="w-1/13" >Name</div>

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
    
    <div v-for="campany in campanies" :key="campany.id" class="px-3">
 

<div  class="flex bg-white py-3 mt-3 text-xs rounded-md px-2">

<div class=" break-words max-w-[80px] w-1/7">{{ campany.name }}</div>

<div class="w-1/10 ml-3">{{ campany.owner_name }}</div>

<div class="py-2 px-4 w-1/7">
                    <span v-if="!campany.showFullDescription">
                        {{ campany.description.slice(0, 50) }}... 
                        <a href="#" @click.prevent="toggleDescription(campany)" class="text-blue-400 underline">Show more</a>
                    </span>
                    <span v-else>
                        {{ campany.description }} 
                        <a href="#" @click.prevent="toggleDescription(campany)" class="text-blue-400 underline">Show less</a>
                    </span>
                </div>
<div class="w-1/15">{{ campany.category_id }}</div>

<div class="w-1/7">{{ campany.address }}</div>

<div class="w-1/10">{{ campany.contact_phone }}</div>

<div class="w-1/5">{{ campany.contact_email }}</div>

<div class="break-words max-w-[120px] w-1/13 ">{{ campany.website }}</div>


<div class="flex justify-between w-1/10 ml-6" >

<div class="relative" @click="fetchSingleCampany(campany.id)">

  <img src="/view.png" alt="">

</div>

<div>

<a href="">



  <img src="/approve.png" alt="">
</a>

</div>

<div>

<a href="">



  <img src="/ban.png" alt="">
</a>

</div>

</div>

</div>
    </div>

    <div v-if="campanies.length>0" class="px-3">
      <h1 class="mt-25 mb-3 text-gray-400 font-semibold">Campany Status</h1>
        <div class=" bg-white w-1/2 px-4 py-4 shadow-md">
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
import BarChart from '@/components/BarChart.vue';
import axios from "axios";
export default {
components:{
    AdminLayout,
    BarChart
},
setup() {
  const base_url = 'https://bizethio-backend-production.up.railway.app/api';
  const campanies = ref([]);
  const singleampany = ref('');
  const images = ref([]);
  const socialMediaLinks = ref({});
  const loadingCampanies = ref(true)
  const errors = ref('')
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
    const  toggleDescription = (campany)=> {
            campany.showFullDescription = !campany.showFullDescription; // Toggle the description state
        }
      const  fetchCampanies =  async ()=>{
       
        try{

          const response = await axios.get(`${base_url}/companies`)
          campanies.value = response.data
          console.log('campanies',campanies.value)
          loadingCampanies.value = false
        }catch(error){
          console.log('Errors',error)
          loadingCampanies.value = false
          errors.value = error
        }
     }
     const fetchSingleCampany = async (id)=>{
       window.scrollTo({
         top: 0,
         behavior: 'smooth', 
     });
      const response = await axios.get(`${base_url}/companies/${id}`)
      singleampany.value = response.data
      console.log('single campany', singleampany.value)
     }
    const  getImageUrl = (images)=> {
        if (images) {
            try {
                const parsedImages = JSON.parse(images);
                return parsedImages.length > 0 ? parsedImages[0] : '/defalt-company-image.jpg';
            } catch (error) {
                console.error('Error parsing image URL:', error);
                return '/defalt-company-image.jpg'; 
            }
        }
        return '/defalt-company-image.jpg'; 
    };
     onMounted(()=>{
      const token = localStorage.getItem('token');
        if (token) {
     // axios.defaults.withCredentials = true;
      axios.defaults.headers.common['Authorization'] =` Bearer ${token}`;
    
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
      this.$router.push({ name: 'SignIn' });
    }
     
     })
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
        errors
      };
    },
}
</script>

<style>
.loader {
    border: 8px solid #f3f3f3; /* Light gray */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px; /* Size of the spinner */
    height: 60px; /* Size of the spinner */
    animation: spin 1s linear infinite; /* Animation */
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
