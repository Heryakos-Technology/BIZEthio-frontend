<template>
    <Navbar class="" />
    <div class="lg:px-20 mb-40 lg:w-9/10 lg:mx-auto">
    <div class="bg-white h-4/5 lg:h-6/7 w-11/12 lg:w-8/9 mb-10 p-2 mt-4 ml-7 rounded-2xl ">
        <p class="font-semibold lg:font-bold lg:ml-4">Edit Profile</p>
        <div class="bg-gradient-to-l from-[#1B7590] to-[#1B7B90] relative h-[350px] w-11/12 lg:w-8/9 mx-auto mb-4 rounded-2xl p-20">
            <div class="ml-28">
                <div class="w-20 h-8 rounded-bl-4xl bg-white absolute top-0 right-0 rounded-tr-xl border-2 border-[#176678] text-[#1B7B90] text-xs font-semibold text-center pt-1">
                    <p>Approved</p>
                </div>
            </div>
                <div class="flex lg:-ml-20">
                    <img src="/profilepic.jpg" alt=""
                        class="-ml-18 -mt-6 w-16 h-16  rounded-full md:w-24 md:h-24 md:ml-10 lg:w-40 lg:h-40 ">
                    <i
                        class="fa-solid fa-camera-retro text-gray-200  mt-6 -ml-3 md:text-lg md:-ml-2 md:mt-10 lg:text-2xl lg:mt-20 lg:-ml-3"></i>
                    <div class="text-white -mt-6 lg:ml-10 -ml-2 w-11/12">

                        <div class="flex ml-4  w-56 mt-6 md:ml-20">
                            <div class="text-[12px] font-normal text-gray-100 md:text-[16px]">
                                <p class="mb-3">Name</p>
                                <p class="mb-3">Email</p>
                                <p class="mb-2">Phone</p>
                                <p class="mb-3">City</p>
                                <p class="mb-3">Subcity</p>
                                <p class="mb-3">Location</p>
                            </div>
                            <div class="text-[12px] w-5/6 font-normal text-gray-100 -mt-4 ml-5 md:text-[16px]">
                                <input type="text" v-model="name" class="border-b-2 w-56 outline-none h-9 "/>
                                <input type="text" v-model="email" class="border-b-2 w-56 outline-none h-9 "/>
                                <input type="text" v-model="phone_number" class="border-b-2 w-56 outline-none h-9"/>
                                <input type="text" v-model="city" class="border-b-2 w-56 outline-none h-9"/>
                                <input type="text" v-model="sub_city" class="border-b-2 w-56 outline-none h-9"/>
                                <input type="text" v-model="location" class="border-b-2 w-56 outline-none h-9"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex -ml-14 md:h-10 mt-10 lg:mt-2 w-80 lg:w-full md:w-full md:-mt-1 md:mx-auto">
                    <div class="flex bg-[#075E86] w-32 py- px-2 rounded-lg ">
                        <button class=" text-[14px] text-center  font-normal text-white">Change Password</button>
                    </div>
                    <div class="flex ml-16  bg-[#075E86] rounded-lg px-4 w-16 h-10 md:10 md:ml-72 lg:ml-64 lg:w-20 lg:mx-auto">
                        <button class=" text-[14px] font-normal text-white lg:text-center ml-2">save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <FooterPart class="" />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import FooterPart from '@/components/FooterPart.vue'
export default {
    components: {
        Navbar,
        FooterPart,

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