<template>
  <AdminLayout>
    <div class="pb-20">
        <div class="border-b-1 text-gray-400 -mt-8">
            <p class="text-gray-600 text-[20px] mb-5">High Ratted  Campanies this week</p>
        </div>
        <div class="flex px-20 mt-10">
            <div class="w-1/2 py-7 pl-5 bg-white rounded-2xl shadow-md mr-20">
                <img class="-mt-6 mb-4" src="/high-rated-admin-ratting.png" alt="">
                <div class="flex mt-4">
                    <img class="mr-2" src="/smaller-ratedimg-admin-rating.png" alt="">
                    <p class="mt-2">Heryakos Technologies</p>
                </div>
                <p class="text-gray-400 text-[14px] mb-2 ml-9.5">Avg Client Retting</p>
                <p class="ml-9.5 mt-2">9/10</p>
                <p class="ml-9.5 mt-2"><span class="text-green-400">+2.5 %</span> than last week</p>
            </div>
            <div class="w-1/2 py-7 pl-5 bg-white rounded-2xl shadow-md">
                <img class="-mt-6 mb-4" src="/high-rated-admin-ratting.png" alt="">
                <div class="flex mt-4">
                    <img class="mr-2" src="/smaller-ratedimg-admin-rating.png" alt="">
                    <p class="mt-2">Zoom Video Communications</p>
                </div>
                <p class="text-gray-400 text-[14px] mb-2 ml-9.5">Avg Client Retting</p>
                <p class="ml-9.5 mt-2">8/10</p>
                <p class="ml-9.5 mt-2"><span class="text-green-400">+2.5 %</span> than last week</p>
            </div>
        </div>
        <div ref="cardSection" class="border-b-1 text-gray-400 mt-10">
            <p class="text-gray-600 text-[20px] mb-5">Campanies rattings</p>
        </div>
        <div  class="bg-white rounded-sm w-1/3 h-[420px]  mx-auto mt-10 mb-10 shadow-md">
            <img class="w-full rounded-t-sm h-64"  :src="getCompanyImage(selectedCompany)"   alt="">
            <div class="flex mt-4 ">
                <div class="mt-">
                    <img class=" ml-10 " src="/smaller-ratedimg-admin-rating.png" alt="">
                </div>
                <div class="ml-4 m">
                    <p>{{ selectedCompany ? selectedCompany.name : 'select company' }}</p>
                    <p class="mt-4">Average Client Ratting</p>
                </div>
            </div>
            <div class="flex ml-21.5 mt-6">
                <i class="fa-solid fa-star text-yellow-400 mr-2"></i>
                <p class="-mt-1">{{selectedCompany ? selectedCompany.rating_avg : '-' }}</p>
            </div>

        </div>
        <div class="mb-10 w-full ml-10">
            <div class="bg-white w-9/10 flex pl-10 mb-6">
                <p class="h-16 pt-5 font-bold mr-50">No</p>
                <p class="h-16 pt-5 font-bold mr-46">Name</p>
                <p class="h-16 pt-5 font-bold mr-42 ml-26">Average Client Ratting</p>
                <p class="h-16 pt-5 font-bold ml-">Actions</p>
            </div>
            <div v-for="(company, index ) in companies" :key="index" class="bg-white w-9/10 mb-6 flex">
                <p class="h-16 ml-10 pt-5 mr-50 font-bold">{{ index + 1 }}</p>
                <p class="h-16 pt-5 -ml-8 w-56 mr-30">{{ company.name }}</p>
                <i class="fa-solid fa-star text-yellow-400 mr-2 mt-6 ml-24"></i>
                <p class="h-16 pt-5 mr-42 ml-">{{ company.rating_avg }}</p>
                <i @click="showCard(company)" 
                    class="fa-regular mt-6 ml-22 cursor-pointer hover:scale-105 hover:text-green-600"
                    :class="changeEyeIcon[company.id] ? 'fa-regular fa-eye text-yellow-400' : 'fa-regular fa-eye-slash'"></i>
            </div>
        </div>
    </div>
  </AdminLayout>
</template>
<script>
import AdminLayout from "@/layout/AdminLayout.vue"
import axios from 'axios'
export default {
components:{
    AdminLayout
},
mounted(){
    this.fetchCompanyRatting()
},
data(){
    return{
        companies: [],
        selectedCompany: null,
        changeEyeIcon: {}
    }
},
methods:{
    getCompanyImage(company) {
    if (company && company.images) {
      try {
        const imagesArray = JSON.parse(company.images);
        return imagesArray[0][0] || '/buildingimg-card-admin-rating.png';
      } catch (e) {
        console.error('Error parsing images:', e);
        return '/buildingimg-card-admin-rating.png'; 
      }
    }
    return '/buildingimg-card-admin-rating.png'; 
  },
    showCard(company){
        this.companies.forEach(comp =>{
            this.changeEyeIcon[comp.id] = false
        })
          this.selectedCompany = company
          this.changeEyeIcon[company.id] = true
          this.$refs.cardSection.scrollIntoView({behavoir: 'smooth', block: 'start'})
    },

    async fetchCompanyRatting(){
        try{
            const response =await axios.get('https://bizethio-backend-production.up.railway.app/api/companies',{
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        })
        this.companies = response.data
        console.log('company data', this.companies)
        }catch(error){
            console.error('error fetching data', error)
        }
    }
}
}
</script>

