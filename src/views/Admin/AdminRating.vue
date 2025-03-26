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
        <div class="border-b-1 text-gray-400 mt-10">
            <p class="text-gray-600 text-[20px] mb-5">Campanies rattings</p>
        </div>
        <div class="bg-white rounded-sm w-1/3 h-[420px]  mx-auto mt-10 mb-10 shadow-md">
            <img class="w-full rounded-t-sm" src="/buildingimg-card-admin-rating.png" alt="">
            <div class="flex mt-4 ">
                <div class="mt-">
                    <img class=" ml-10 " src="/smaller-ratedimg-admin-rating.png" alt="">
                </div>
                <div class="ml-4 m">
                    <p>Heryakos Technologies</p>
                    <p class="mt-4">Average Client Ratting</p>
                </div>
            </div>
            <div class="flex ml-21.5 mt-6">
                <i class="fa-solid fa-star text-yellow-400 mr-2"></i>
                <p class="-mt-1">4.7</p>
            </div>

        </div>
        <div class="mb-10 w-full ml-10">
            <div class="bg-white w-9/10 flex pl-10 mb-6">
                <p class="h-16 pt-5 font-bold mr-50">No</p>
                <p class="h-16 pt-5 font-bold mr-46">Name</p>
                <p class="h-16 pt-5 font-bold mr-42 ml-26">Average Client Ratting</p>
                <p class="h-16 pt-5 font-bold ml-">Actions</p>
            </div>
            <div v-for="ratingData in ratingDatas" :key="ratingData" class="bg-white w-9/10 mb-6 flex">
                <p class="h-16 ml-10 pt-5 mr-50 font-bold">{{ ratingData.no }}</p>
                <p class="h-16 pt-5 -ml-8 w-56 mr-30">{{ ratingData.name }}</p>
                <i class="fa-solid fa-star text-yellow-400 mr-2 mt-6 ml-24"></i>
                <p class="h-16 pt-5 mr-42 ml-">{{ ratingData.AverageClientRatting }}</p>
                <i class="fa-regular fa-eye-slash mt-6 ml-22"></i>
            </div>
        </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layout/AdminLayout.vue"
export default {
components:{
    AdminLayout
},
data(){
    return{
        ratingDatas: [
            {no: 1, name: "Heryakos Technologies", AverageClientRatting: "4.7", icon: ''},
            {no: 2, name: "Zoom Video Communications", AverageClientRatting: "4.7", icon: ''},
            {no: 3, name: "Heryakos Technologies", AverageClientRatting: "4.7", icon: ''},
            {no: 4, name: "Zoom Video Communications", AverageClientRatting: "4.7", icon: ''},
        ]
    }
}
}
</script>

<style>

</style>