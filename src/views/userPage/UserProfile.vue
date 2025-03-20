<template>
    <!-- <Navbar class="" /> -->
    <div class="lg:px-20 lg:w-9/10 lg:mx-auto lg:pt-24 ">
    <div class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl ">
        <p class="font-semibold lg:font-bold lg:ml-4">My profile</p>
        <div class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[350px] w-11/12 lg:w-8/9 mx-auto mb-4 rounded-2xl p-20">
            <div class="ml-28">
                <div class="w-20 h-8 rounded-bl-4xl bg-white absolute top-0 right-0 rounded-tr-xl border-2 border-[#176678] text-[#1B7B90] text-xs font-semibold text-center pt-1">
                    <p>Approved</p>
                </div>
            </div>
                <div class="flex lg:-ml-20">
                    <img src="/profilepic.png" alt=""
                        class="-ml-18 -mt-6 w-16 h-16  rounded-full md:w-24 md:h-24 md:ml-10 lg:w-40 lg:h-40 ">
                    <i
                        class="fa-solid fa-camera-retro text-gray-200  mt-6 -ml-3 md:text-lg md:-ml-2 md:mt-10 lg:text-2xl lg:mt-20 lg:-ml-3"></i>
                    <div class="text-white -mt-6 lg:ml-10 -ml-2 w-11/12">
                        <p class="ml-8 text-[17px] font-semibold text-gray-100 md:text-[20px] md:ml-20">Selam Belete</p>
                        <p class=" ml-8 text-[16px]  font-semibold text-gray-100 md:text-[18px] md:ml-20">Ethiopia,
                            Addis Abeba</p>
                        <div class="flex ml-6  w-56 mt-4 md:ml-20">
                            <div class="text-[14px] font-normal text-gray-100 md:text-[16px]">
                                <p class="">Email</p>
                                <p class="">Phone</p>
                                <p class="">City</p>
                                <p class="">Subcity</p>
                                <p class="">Location</p>
                            </div>
                            <div class="text-[14px] font-normal text-gray-100 ml-4 md:text-[16px]">
                                <p class="">not_realemail@gmail.com</p>
                                <p class="">+251 9 323232</p>
                                <p class="">Addis Abeba</p>
                                <p class="">Megenagna</p>
                                <p class="">Megenagna Square</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex -ml-14 md:-ml- mt-10 lg:mt-8 w-64 lg:w-full md:w-full md:mt-4 md:mx-auto">
                    <div class="flex bg-[#075E86] w-26 py-2 rounded-lg ">
                        <i class="fa-solid fa-pen mr-2 mt-1 ml-1"></i>
                        <router-link to="/EditProfile" class=" text-[14px] font-normal  text-white">Edit Profile</router-link>
                    </div>
                    <div class="flex ml-20 mt-2 md:ml-72 lg:ml-64 md:mt-4">
                        <i class="fa-solid fa-right-from-bracket text-red-700"></i>
                        <p class="text-[14px] -mt-1 font-light text-red-700">Log out</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mb-6 w-72 md:w-2/5 lg:w-2/7 mx-auto">
        <p class="text-center mb-4 text-bold text-lg">Recent Activity</p>
        <div v-for="search in searched" :key="search" class="bg-white mx-auto  mb-4 h-11 rounded-full flex">
            <p class="ml-4 mt-1 lg:mt-2 md:mt-1 w-7/8 md:w-8/9 lg:w-11/12 mr-10 text-[13px] md:text-[14px] lg:text-[14px]">{{
                search.name }}</p>
            <i class="fa-solid fa-xmark pr-2 mt-3"></i>
        </div>
        <p class="underline ml-5 text-[#10434f] -mt-4 text-[14px] md:text[15px] lg:text-[15px]">See More</p>
    </div>
    <div class="mb-20 w-11/12  lg:w-6/7 lg:mx-auto mx-auto lg:pb-10">
        <p class="text-center mb-4 text-bold text-lg lg:text-xl  lg:text-center">Rated companies</p>
        <div class="flex flex-wrap">
            <div v-for="(company, index) in companies" :key="index" class="w-full sm:w-1/2 lg:w-1/3 p-2 lg:mb-6">
                <div class="relative">
                    <img :src="company.img" alt="" class="rounded-[10px]">
                    <div class="bg-white h-20 w-4/5 lg:w-2/3 md:w-2/3  p-1 -mt-4 relative rounded-tr-4xl">
                        <p class="text-[13px] font-semibold h-10 w-50 mx-auto mt-2 lg:text-[15px] lg:font-semibold">{{ company.name }}</p>
                        <div class="flex w-10 h-6 mx-auto">
                            <div v-for="star in Array(company.rating)" :key="star"
                                class="text-[11px] text-yellow-500 mx-auto">
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <FooterPart class="" /> -->
</template>

<script>
// import Navbar from '@/components/Navbar.vue'
// import FooterPart from '@/components/FooterPart.vue'
export default {
    components: {
        // Navbar,
        // FooterPart,

    },
    data() {
        return {
            companies: [
                { name: "Ethiopian Skylight Hotel", img: "/skypro.png", rating: 5 },
                { name: "Kifiya Financial Technology Head Office", img: "/kifya-pro.png", rating: 3 },
                { name: "Addis Ababa City Mall", img: "/citymoll-pro.png", rating: 4 },
                { name: "Smart Barber’s shop", img: "/rechobarber-pro.png", rating: 4 },
                { name: "Zoe Beauty Salon", img: "/zoesbeauty-pro.png", rating: 3 },
                { name: "Chaka Coffee", img: "/chaka-pro.png", rating: 4 },
                { name: "sheba fashion", img: "/sheba-pro.png", rating: 5 },
                { name: "Mercato Internet Café", img: "/merkato-pro.png", rating: 2 },
                { name: "Kera Hotel", img: "/karahotel-pro.png", rating: 3 }
            ],
            searched: [
                { name: 'Smart Barber’s shop' },
                { name: 'Zoe Beauty Salon' },
                { name: 'Chaka Coffee' },
                { name: 'Ethiopian Skylight Hotel' },
                { name: 'Kifiya Financial Technology Head Office' },
            ]

        }
    }
}
</script>

<style></style>