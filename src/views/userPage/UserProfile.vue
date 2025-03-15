<template>
     <Navbar class=""/>
<div class="bg-white h-4/5 w-11/12 mb-10 p-2 mt-4 ml-7 rounded-2xl">
    <p class="font-semibold">My profile</p>
    <div class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] h-[350px] w-11/12  ml-9 mb-4 rounded-2xl p-20">
        <div class="w-20 h-8 rounded-bl-4xl bg-white ml-37.5 -mt-19.5 relative mb-20 border-1 rounded-tr-lg border-[#176678] text-[#1B7B90] text-xs font-semibold text-center pt-1">Approved</div>
        <div class="flex">
            <img src="/profilepic.png" alt="" class="-ml-18 -mt-6 w-16 h-16 rounded-full">
            <i class="fa-solid fa-camera-retro text-white mt-6 -ml-3"></i>
            <div class="text-white -mt-6 -ml-2">
                <p class="ml-8 text-[17px] font-semibold text-gray-100">Selam Belete</p>
                <p class=" ml-8 text-[16px] font-semibold text-gray-100">Ethiopia, Addis Abeba</p>
                <div class="flex  ml-6 w-56 mt-4">
                    <div class="text-[14px] font-normal text-gray-100">
                        <p class="">Email</p>
                        <p class="">Phone</p>
                        <p class="">City</p>
                        <p class="">Subcity</p>
                        <p class="">Location</p>
                    </div>
                    <div class="text-[14px] font-normal text-gray-100 ml-4">
                        <p class="">fake@gmail.com</p>
                        <p class="">+251 9 323232</p>
                        <p class="">Addis Abeba</p>
                        <p class="">Megenagna</p>
                        <p class="">Megenagna Square</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex -ml-14 mt-10 w-64">
            <div class="flex bg-[#075E86] w-26 py-2 rounded-lg ">
                <i class="fa-solid fa-pen mr-2 mt-1 ml-1"></i>
                <button class=" text-[14px] font-normal text-white">Edit Profile</button>
            </div>
            <div class="flex ml-20 mt-2">
                <i class="fa-solid fa-right-from-bracket text-red-700"></i>
                <p class="text-[14px] -mt-1 font-light text-red-700">Log out</p>
            </div>
        </div>
    </div>
</div>  
<div class="mb-6 w-72 mx-auto">
    <p class="text-center mb-4 text-bold text-lg">Recent Activity</p>
    <div v-for="search in searched" :key="search" class="bg-white mx-auto w-11/12 mb-4 h-11 rounded-full flex">
        <p class="ml-4 mt-1 w-6/7 mr-10 text-[13px]">{{ search.name }}</p>
        <i class="fa-solid fa-xmark pr-2 mt-3"></i>
    </div>
    <p class="underline ml-5 text-[#10434f] -mt-4 text-[14px]">See More</p>
</div>
<div class="mb-20 w-72 mx-auto">
    <p class="text-center mb-4 text-bold text-lg">Rated companies</p>
    <div class="flex flex-wrap">
    <div v-for="(company, index) in companies" :key="index" class="w-1/2 p-2">
        <div class="relative">
            <img :src="company.img" alt="" class="rounded-[10px]">
            <div class="bg-white h-16 w-full p-1 -mt-4 relative rounded-tr-4xl">
                <p class="text-[10px] h-7 mt-2">{{ company.name }}</p>
                <div class="flex w-10 h-6">
                    <div v-for="star in Array(company.rating)" :key="star" class=" text-[11px] text-yellow-500   mx-auto">
                        <i class="fa-solid fa-star flex"></i>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</div>
<FooterPart class=""/>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import FooterPart from '@/components/FooterPart.vue'
export default {
    components:{
    Navbar,
    FooterPart,
   
},
data(){
    return{
        companies:[
            {name:"Ethiopian Skylight Hotel",img:"/skypro.png", rating:5},
            {name:"Kifiya Financial Technology Head Office",img:"/kifya-pro.png", rating:3},
            {name:"Addis Ababa City Mall",img:"/citymoll-pro.png",rating:4},
            {name:"Smart Barber’s shop",img:"/rechobarber-pro.png", rating:4},
            {name:"Zoe Beauty Salon",img:"/zoesbeauty-pro.png", rating:3},
            {name:"Chaka Coffee",img:"/chaka-pro.png", rating: 4},
            {name:"sheba fashion",img:"/sheba-pro.png", rating:5},
            {name:"Mercato Internet Café",img:"/merkato-pro.png", rating:2},
            {name:"Kera Hotel",img:"/karahotel-pro.png", rating:3}
        ],
        searched:[
        {name:'Smart Barber’s shop'},
        {name:'Zoe Beauty Salon'},
        {name:'Chaka Coffee'},
        {name:'Ethiopian Skylight Hotel'},
        {name:'Kifiya Financial Technology Head Office'},
        ]

    }
}
}
</script>

<style>

</style>