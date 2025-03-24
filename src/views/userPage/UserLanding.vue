<template>
 
  <div class="">
    <div class="categories  lg:w-full mx-auto lg:mb-20">
        <div class="lg:pt-44 lg:ml-4">
           <p class="text-center lg:font-semibold lg:text-lg lg:-ml-14">Quick search</p>
        <div class="flex w-72 lg:w-80 mt-4 mx-auto">
            <div class="w-56 lg:w-72 lg:-ml-10 lg:h-10  h-9 bg-[#F0EEFF] rounded-tl-full rounded-br-full "></div>
            <div class="w-20 h-9 lg:h-10 bg-[#075E86] rounded-tr-lg rounded-bl-xl  rounded-br-lg -ml-5">
                <p class="text-center text-white mt-1 font-light">search</p>
            </div>
            <div class="fa-solid fa-magnifying-glass text-gray-600 -ml-68 mt-3 lg:-ml-80"></div>
        </div>
       </div>
       <div class="lg:-mt-48 md:-mt-56 lg:ml-4">
           <div class="lg:flex lg:-mt-40 lg:w lg:ml-64 md:flex md:-mt-40 md:w md:ml-14">
               <div class="w-48 h-20 bg-[#C3DEEE] ml-4 lg:ml-16 mt-2 rounded-tl-4xl rounded-l-4xl rounded-r-lg flex">
               <img src="/restaurantIcon.png" alt="" class="w-12 h-10  mt-3  ml-2">
               <p class="w-40 ml-2 mt-3 text-xs md:font-semibold lg:font-semibold">Enjoy a variety of delicious dining options for any occasion!</p>
           </div>
           <div class="w-48 h-20 bg-[#C3DEEE] ml-40 md:ml-20 lg:ml-32 md:mr-20 mt-2 rounded-tl-4xl rounded-l-4xl rounded-r-lg flex">
               <img src="/retailcart.png" alt="" class="w-12 h-10  mt-3  ml-2">
               <p class="w-40 ml-2 mt-3 text-xs md:font-semibold lg:font-semibold">Fun retail stores with trendy items and unique gifts</p>
           </div>
           <div class="w-48 h-20 bg-[#C3DEEE] ml-4 lg:ml-10 lg:mt-2 mt-2 rounded-tl-4xl rounded-l-4xl rounded-r-lg flex">
               <img src="/hospital.png" alt="" class="w-12 h-10  mt-3  ml-2">
               <p class="w-40 ml-2 mt-3 text-xs md:font-semibold lg:font-semibold">Trustworthy hospitals that prioritize patient care and well-being</p>
           </div>
           </div>
          <div class="lg:flex lg:mt-10 md:flex md:mt-10 lg:px-40">
            <div class="w-48 h-20 bg-[#C3DEEE] ml-40 mt-2 lg:ml-20 md:mr-96 md:ml-10 rounded-tl-4xl rounded-l-4xl rounded-r-lg flex">
               <img src="/bank.png" alt="" class="w-12 h-10  mt-3  ml-2">
               <p class="w-40 ml-2 mt-3 text-xs md:font-semibold lg:font-semibold">Helpful banks for easy money management and loans.</p>
           </div>
           <div class="lg:ml-80 ">
           <div class="w-48 h-20 bg-[#C3DEEE] ml-4 lg:-ml-24 md:ml-10 mt-2 rounded-tl-4xl rounded-l-4xl rounded-r-lg flex">
                   <img src="/gas.png" alt="" class="w-12 h-10  mt-3  ml-2">
                   <p class="w-40 ml-2 mt-3 text-xs md:font-semibold lg:font-semibold">Convenient gas stations for fueling up and snacks.</p>
               </div>
           </div>
          </div>
         <div class="lg:flex lg:mt-10 md:flex md:mt-10 ">
           <div class="w-48 h-20 bg-[#C3DEEE] lg:ml-78 ml-40 md:ml-20 mt-2 rounded-tl-4xl rounded-l-4xl rounded-r-lg flex">
               <img src="/gym.png" alt="" class="w-12 h-10  mt-3  ml-2">
               <p class="w-40 ml-2 mt-3 text-xs md:font-semibold lg:font-semibold">Welcoming gyms with fun classes to keep you active.</p>
           </div>
           <div class="w-48 h-20 bg-[#C3DEEE] ml-4 lg:ml-32 mt-2 md:ml-20 rounded-tl-4xl rounded-l-4xl rounded-r-lg flex">
               <img src="/hotel.png" alt="" class="w-12 h-10  mt-3  ml-2">
               <p class="w-40 ml-2 mt-3 text-xs md:font-semibold lg:font-semibold">Find cozy hotels with great service for relaxing stays.</p>
           </div>
           <div class="w-48 h-20 bg-[#C3DEEE] ml-40 lg:ml-32 mt-2 md:ml-20 rounded-tl-4xl rounded-l-4xl rounded-r-lg flex">
               <img src="/barbershop.png" alt="" class="w-12 h-10  mt-3  ml-2">
               <p class="w-40 ml-2 mt-3 text-xs md:font-semibold lg:font-semibold">Stylish salons and barber shops for great haircuts.</p>
           </div>

       </div>
      </div>
    </div>
    <div class=" lg:flex md:flex lg:w-11/12 lg:mx-auto  second-cards ml-2 lg:ml-22 pb-4 mt-6">
        <div class="flex w-screen px-2 lg:px-0 pb-6">
            <div class="rounded-t-lg">
                <div class="bg-[#DCF2F8] h-76 lg:h-96 rounded-t-2xl  w-11/12 lg:mr-2 lg:w-11/12">
                    <img src="/kategna (2).png" alt="" class="rounded-br-4xl lg:w-full lg:h-1/2">
                    <p class="font-bold ml-2 h-6  text-xs mt-4 lg:text-lg">Kategna Restaurant</p>
                    <p class="text-xs   mt-4  ml-2 h-26 lg:h-26  font-normal pr-1">Kategna provides an authentic Ethiopian experience, featuring shared dishes and unique spices that celebrate loyalty and friendship.</p>
                    <div class="flex md:-mt-4  ml-4 h-10 lg:-mt-6">
                        <i @click="openMapModal" class="fa-solid fa-location-dot text-[#FF8C00] mr-12 mt-2 lg:mt-3 lg:ml-4 lg:text-xl cursor-pointer" ></i>
                        <div class="w-20 lg:ml-20 md:ml-8 md:mt-0 lg:w-28 lg:h-10  h-8 bg-[#1B7590] rounded-lg">
                            <p class="text-white text-xs text-center mt-2.5">explore more</p>
                        </div>
                    </div>
                    <MapModal
      :visible="isMapVisible"
      :mapSrc="mapSrc"
      @close="closeMapModal"
    />
                </div>
            </div>
            <div class="rounded-t-lg">
                <div class="bg-[#DCF2F8] h-76 lg:h-96 rounded-t-2xl  w-11/12 lg:mr-2 lg:w-11/12">
                    <img src="/tikur-ambesa.png" alt="" class="rounded-br-4xl lg:w-full lg:h-1/2">
                    <p class="font-bold ml-2 h-6  text-xs mt-4 lg:text-lg">Tikur Anbessa Hospital</p>
                    <p class="text-xs  mt-4  ml-2 h-26 lg:h-18 lg:mb-1 font-normal pr-1">Tikur Anbessa Hospital is a key healthcare facility in Ethiopia, offering diverse medical services and prioritizing quality patient care.</p>
                    <div class="flex md:-mt-4  ml-4 h-10 lg:mt-2">
                        <i @click="openMapModal" class="fa-solid fa-location-dot text-[#FF8C00] mr-12 mt-2 lg:mt-3 lg:ml-4 lg:text-xl cursor-pointer" ></i>
                        <div class="w-20 lg:ml-20 md:ml-8 md:mt-0 lg:w-28 lg:h-10  h-8 bg-[#1B7590] rounded-lg">
                            <p class="text-white text-xs text-center mt-2.5">explore more</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex w-screen px-2 lg:px-0 md:px-0 pb-6">
            <div class="rounded-t-lg">
                <div class="bg-[#DCF2F8] h-76 lg:h-96 rounded-t-2xl  w-11/12 lg:mr-2 lg:w-11/12">
                    <img src="/nigdbank.png" alt="" class="rounded-br-4xl lg:w-full lg:h-1/2">
                    <p class="font-bold ml-2 h-6  text-xs mt-4 lg:text-lg">Commercial Bank of Ethiopia</p>
                    <p class="text-xs  mt-4 w-40 lg:w-80 lg: ml-2 h-26 lg:h-20 lg:pr-4  font-normal pr-1">CBE is Ethiopia's largest bank, providing essential financial services nationwide.</p>
                    <div class="flex md:-mt-4  ml-4 h-10 lg:mt-0.5">
                        <i @click="openMapModal" class="fa-solid fa-location-dot text-[#FF8C00] mr-12 mt-2 lg:mt-3 lg:ml-4 lg:text-xl cursor-pointer" ></i>
                        <div class="w-20 lg:ml-20 md:ml-8 md:mt-0 lg:w-28 lg:h-10  h-8 bg-[#1B7590] rounded-lg">
                            <p class="text-white text-xs text-center mt-2.5">explore more</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rounded-t-lg">
                <div class="bg-[#DCF2F8] h-76 lg:h-96 rounded-t-2xl  w-11/12 lg:mr-2 lg:w-11/12">
                    <img src="/total.png" alt="" class="rounded-br-4xl lg:w-full lg:h-1/2">
                    <p class="font-bold ml-2 h-6  text-xs mt-4 lg:text-lg">Total Ethiopia</p>
                    <p class="text-xs w-40  mt-4 lg:w-80  ml-2 h-26 lg:h-26 font-normal lg:pr-4 pr-1">Total Ethiopia provides quality fuel at convenient locations across the country.</p>
                    <div class="flex md:-mt-4  ml-4 h-10 lg:-mt-6">
                        <i @click="openMapModal" class="fa-solid fa-location-dot text-[#FF8C00] mr-12 mt-2 lg:mt-3 lg:ml-4 lg:text-xl cursor-pointer" ></i>
                        <div class="w-20 lg:ml-20 md:ml-8 md:mt-0 lg:w-28 lg:h-10  h-8 bg-[#1B7590] rounded-lg">
                            <p class="text-white text-xs text-center mt-2.5">explore more</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="recommended-section ">
        <p class="ml-10 lg:ml-46 font-bold lg:text-2xl">recommended for you</p>
        <div class=" lg:flex w-11/12 px-6 mx-auto mt-4 lg:ml-40">
            <div class="bg-[#1B7590] rounded-lg h-96 lg:mt-4 lg:h-8/9 lg:mr-10 lg:pb-2">
                <img src="/sishu.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                    <p class="mr-6 mt- text-sm font-semibold w-32 -mt-2 lg:w-40">Sishu Restaurant</p>
                    <div class="w-32 h-10 bg-[#1B7590] border-1 lg:ml-12 lg:-mt-2 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">see detail</p>
                    </div>
                </div>
            </div>
            <div class="bg-[#1B7590] rounded-lg h-96 mt-4 lg:mr-10 lg:h-8/9 lg:pb-2">
                <img src="/golden-plate.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                    <p class="mr-6 mt- text-sm font-semibold w-32 -mt-2 lg:w-40 ">Golden Plate Restaurant</p>
                    <div class="w-32 h-10 bg-[#1B7590] border-1 lg:ml-12 lg:-mt-2 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">see detail</p>
                    </div>
                </div>
            </div>
            <div class="bg-[#1B7590] rounded-lg h-96 mt-4 lg:h-8/9 lg:pb-2">
                <img src="/bole-medhanialem.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                    <p class="mr-6 mt- text-sm font-semibold w-32 -mt-2 lg:w-40">Bole Medanialem Shopping Center</p>
                    <div class="w-32 h-10 bg-[#1B7590] border-1 lg:ml-12 lg:-mt-2 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">see detail</p>
                    </div>
                </div>
            </div>
            
        </div>
        <p class="underline text-[#003962] mt-2 lg:ml-46 md:ml-12 ml-10">More Results</p>

        <div class="Toppicks-section mt-18 pb-20">
            <p class="font-bold ml-10 lg:text-2xl lg:ml-44">Top picks</p>
            <div class="w-11/12 px-6 mx-auto mt-4 lg:ml-40">
                <div class="lg:flex">
                    <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                <img src="/edna-mol.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2 ">
                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Edna Mall</p>
                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">view detail</p>
                    </div>
                </div>
            </div>
            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                <img src="/hayle-grand.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Haile Grand Addis Ababa</p>
                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">view detail</p>
                    </div>
                </div>
            </div>
            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                <img src="/zefmesh.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Zefmesh Grand Mall</p>
                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">view detail</p>
                    </div>
                </div>
            </div>
                </div>
                <div class="lg:flex lg:mt-6">
                    <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                <img src="/fit-addis.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Fit Addis</p>
                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">view detail</p>
                    </div>
                </div>
            </div>
            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                <img src="/saron-beauty.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Saron Beauty</p>
                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">view detail</p>
                    </div>
                </div>
            </div>
            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:pb-2">
                <img src="/skylight.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Ethiopian Skylight Hotel</p>
                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                        <p class="text-center text-white text-xs mt-2.5">view detail</p>
                    </div>
                </div>
            </div>
                </div>
                <p class="underline lg:mt-2 -ml-0.5 text-[#1B7590]">Discover more</p>
            </div>
        </div>
        <div class="Reviews-section  lg:px-56 lg:-ml-12">
            <p class="lg:ml-1.5 ml-2 font-bold lg:text-2xl">Reviews</p>
            <div class="ml-2 mr-2 rounded-md mt-4 bg-[#1B7590] p-2 pb-4  flex">
                <img src="/kategna-ratting.png" alt="" class="rounded-lg w-1/4 h-1/3 lg:w-80 lg:h-72">
                <div class="ml-4 ">
                    <p class="font-bold text-sm text-gray-200 lg:mt-10 lg:text-xl lg:mb-6">Kategna Restaurant</p>
                    <div class="flex mt-1 lg:mb-8">
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-regular fa-star w-4 h-4 mr-1 text-[#7abcd0]"></i>
                        <i class="fa-regular fa-star w-4 h-4 text-[#7abcd0]"></i>
                    </div>
                    <p class="w- h-32  text-xs lg:h-16 text-gray-300 mt-2 mb-4">Kategna Restaurant offers a delightful Ethiopian dining experience with flavorful dishes served on a communal plate. The warm atmosphere and friendly service enhance the meal, making it a must-visit for anyone seeking authentic cuisine.</p>
                   <div class="flex -mt-4">
                    <i class="fa-solid fa-user mr-4 text-gray-800"></i>
                    <p class="text-xs text-gray-300">Selam Belete</p>
                   </div>
                </div>
            </div>
            <div class="ml-2 mr-2 rounded-md mt-4 bg-[#1B7590] p-2 pb-4  flex">
                <img src="/yod.png" alt="" class="rounded-lg w-1/4 h-1/3 lg:w-80 lg:h-72">
                <div class="ml-4 ">
                    <p class="font-bold text-sm text-gray-200 lg:mt-10 lg:text-xl lg:mb-6">Yod Abyssinia Traditional Restaurant</p>
                    <div class="flex mt-1 lg:mb-8">
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-regular fa-star w-4 h-4 mr-1 text-[#7abcd0]"></i>
                        <i class="fa-regular fa-star w-4 h-4 text-[#7abcd0]"></i>
                    </div>
                    <p class="w- h-32  text-xs lg:h-16 text-gray-300 mt-2 mb-4">Abissinia Restaurant is known for its delightful Ethiopian cuisine, offering a variety of traditional dishes like injera and doro wat. The restaurant provides a cozy atmosphere, perfect for enjoying rich flavors and experiencing Ethiopian dining culture with friends and family.</p>
                    <div class="flex -mt-4">
                        <i class="fa-solid fa-user mr-4 text-gray-800"></i>
                        <p class="text-xs text-gray-300">Mekdes kefyalew</p>
                    </div>
                </div>
            </div>
            <div class="ml-2 mr-2 rounded-md mt-4 bg-[#1B7590] p-2 pb-4 flex">
                <img src="/sky-ratting.png" alt="" class="rounded-lg w-1/4 h-1/3 lg:w-80 lg:h-72">
                <div class="ml-4 ">
                    <p class="font-bold text-sm text-gray-200 lg:mt-10 lg:text-xl lg:mb-6">Ethiopian Airlines Sky Restaurant</p>
                    <div class="flex mt-1 lg:mb-8">
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                        <i class="fa-solid fa-star w-4 h-4 mr-1 text-yellow-500"></i>
                    </div>
                    <p class="w- h-32  text-xs lg:h-16 text-gray-300 mt-2 mb-4">This restaurant offers authentic Ethiopian cuisine with runway views. It’s a convenient stop for travelers seeking quality service and flavorful dishes.</p>
                    <div class="flex -mt-4">
                        <i class="fa-solid fa-user mr-4 text-gray-800"></i>
                        <p class="text-xs text-gray-300">Selam Belete</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import MapModal from '@/components/MapModal.vue';
export default {
components:{
    MapModal
},
data(){
    return{
              isMapVisible: false,
      mapSrc: 'YOUR_GOOGLE_MAP_EMBED_URL'
    }
},
methods: {
    openMapModal() {
      this.isMapVisible = true;
    },
    closeMapModal() {
      this.isMapVisible = false;
    },
  },
}
</script>

<style scoped>

</style>