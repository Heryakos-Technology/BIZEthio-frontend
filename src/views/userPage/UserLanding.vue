<script setup>
import { ref, onMounted, computed } from 'vue';
import MapModal from '@/components/MapModal.vue';
import UserLayoutUser from '@/layout/UserLayoutUser.vue';
import axios from 'axios';
import { useCategoryStore } from '@/stores/category';
import { useReviewStore } from '@/stores/review';
import { useCompanyStore } from '@/stores/company';
import { useRouter } from 'vue-router';

const isMapVisible = ref(false);
// const mapSrc = 'YOUR_GOOGLE_MAP_EMBED_URL';
const search = ref('');
const categories = ref([]);
const error = ref('');
const companies = ref([]);
const reviews = ref([]);
const loading = ref(true);
const showSuggestions = ref(false);
const selectedCategories = ref([]);
const router = useRouter();
const mapSrc  = ref('');
const { getAllReviews } = useReviewStore();
const { getAllCategories } = useCategoryStore();
const { getAllCompanies } = useCompanyStore();


const openMapModal = (latitude, longitude) => {
      mapSrc.value = `https://maps.google.com/?q=${latitude},${longitude}`;
      isMapVisible.value = true;
    };
const closeMapModal = () => {
    isMapVisible.value = false;
};

const handleInput = () => {
    showSuggestions.value = true;
};

const filteredCompanies = computed(() => {
    
    if (selectedCategories.value.length === 0) {
        return companies.value;
    }
    return companies.value.filter(company =>
        company.category && selectedCategories.value.includes(company.category.name)
    );
});
const toggleCategory = (categoryName) => {
    const index = selectedCategories.value.indexOf(categoryName);
    if (index > -1) {
        selectedCategories.value.splice(index, 1);
    } else {
        selectedCategories.value.push(categoryName);
    }
};

const selectCompany = (companyId) => {
    router.push(`/company/${companyId}`);
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

onMounted(async () => {
    companies.value = await getAllCompanies()
    localStorage.setItem('companies', companies.value);
    console.log('company', companies[0]?.id);
    loading.value = false

})
onMounted(async () => {
    categories.value = await getAllCategories()
    localStorage.getItem('categories', categories.value);
    console.log('cat', categories.value);
}),
    onMounted(async () => {
        reviews.value = await getAllReviews()
        localStorage.setItem('reviews', reviews.value);
        console.log('reviews', reviews.value);
    })


</script>
<template>
    <UserLayoutUser>

        <div class="categories  lg:w-full mx-auto lg:mb-20">
                <div class="lg:pt-10 lg:ml-4 w-full mx-auto">
                    <div class="flex w-72 lg:w-1/5 mt-4 mx-auto">
                        <input v-model="search" @input="handleInput" type="text"
                            class="w-56 lg:w-72   lg:h-10  pl-12 h-9 bg-white outline-none rounded-tl-full rounded-br-full " />
                        <div v-if="showSuggestions && filteredCompanies.length > 0"
                            class="absolute w-1/5 lg:mt-12 lg:-ml-10 mx-auto bg-white border border-gray-300  rounded-md mt-1 z-10">
                            <ul>
                                <li v-for="company in filteredCompanies" :key="company.id"
                                    @click="selectCompany(company.id)" class="cursor-pointer hover:bg-gray-200 p-2">
                                    <img :src="getImageUrl(company.images)" alt="" class="w-8 h-8 inline-block mr-2">
                                    {{ company.name }}
                                </li>
                            </ul>
                        </div>
                        <div @click="handleInput"
                            class="w-20 h-9 lg:h-10 bg-[#075E86] rounded-tr-lg rounded-bl-xl  rounded-br-lg -ml-5">
                            <p class="text-center text-white mt-1 font-light hover:cursor-pointer">search</p>
                        </div>
                        <div class="fa-solid fa-magnifying-glass  text-gray-600 -ml-68 mt-3 lg:-ml-82"></div>
                    </div>
                </div>
            <div class="lg:-mt-40 md:-mt-56 lg:ml-4 w-11/12 mx-auto">
                <div class="lg:flex lg:-mt-40 lg:w lg:ml-64 md:flex md:-mt-40 md:w md:ml-14">
                    <div v-for="(category, index) in categories.slice(0, 3)" :key="category.id"
                        @click="toggleCategory(category.name)"
                        class="w-48 h-20 shadow-md cursor-pointer hover:scale-105 transition-all duration-200 mt-2 rounded-full flex"
                        :class="[
                            index === 0 ? 'ml-4 lg:ml-16'
                                : index === 1 ? 'ml-40 md:ml-20 lg:ml-32 md:mr-20'
                                    : 'ml-4 lg:ml-10',
                            { 'bg-[#b6d3ff]': selectedCategories.includes(category.name) },
                            { 'bg-[#F0EEFF]': !selectedCategories.includes(category.name) }
                        ]">
                        <img :src="category.image_link" alt="" class="w-12 h-10 lg:ml-4 lg:mt-5 mt-3 ml-2" />
                        <p class="w-40 ml-2 mt-3 text-xs lg:text-md lg:mt-7 lg:ml-1 md:font-semibold lg:font-semibold">
                            {{ category.name }}
                        </p>
                    </div>
                </div>

                <div class="lg:flex lg:mt-10 md:flex md:mt-10 lg:px-40">
                    <div v-for="(category, index) in categories.slice(3, 5)" :key="category.id"
                        @click="toggleCategory(category.name)"
                        class="w-48 h-20 shadow-md cursor-pointer hover:scale-105 transition-all duration-200 bg-[#F0EEFF] mt-2 rounded-full flex"
                        :class="[
                            index === 0 ? 'ml-48 lg:ml-28 md:mr-96 md:ml-24'
                                : index === 1 ? 'ml-12 lg:ml-40 md:ml-16'
                                    : 'ml-4 lg:ml-10',
                            { 'bg-[#b6d3ff]': selectedCategories.includes(category.name) },
                            { 'bg-[#F0EEFF]': !selectedCategories.includes(category.name) }
                        ]">
                        <img :src="category.image_link" alt="" class="w-12 h-10 lg:ml-4 lg:mt-5 mt-3 ml-2" />
                        <p class="w-40 ml-2 mt-3 text-xs lg:text-md lg:mt-7 lg:ml-1 md:font-semibold lg:font-semibold">
                            {{ category.name }}
                        </p>
                    </div>
                </div>

                <div class="lg:flex lg:mt-10 md:flex md:mt-10 px-36">
                    <div v-for="(category, index) in categories.slice(5, 9)" :key="category.id"
                        @click="toggleCategory(category.name)"
                        class="w-48 h-20 shadow-md cursor-pointer hover:scale-105 transition-all duration-200 mt-2 rounded-full flex"
                        :class="[
                            index === 0 ? 'ml-4 lg:ml-16'
                                : index === 1 ? 'ml-40 md:ml-20 lg:ml-32 md:mr-20'
                                    : 'ml-4 lg:ml-10',
                            { 'bg-[#b6d3ff]': selectedCategories.includes(category.name) },
                            { 'bg-[#F0EEFF]': !selectedCategories.includes(category.name) }
                        ]">
                        <img :src="category.image_link" alt="" class="w-12 h-10 lg:ml-4 lg:mt-5 mt-3 ml-2" />
                        <p class="w-40 ml-2 mt-3 text-xs lg:text-md lg:mt-7 lg:ml-1 md:font-semibold lg:font-semibold">
                            {{ category.name }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="lg:flex md:flex lg:w-11/12 lg:mx-auto second-cards ml-2 pb-4 mt-6">
                <div class="flex flex-wrap w-full px-2 lg:px-0 pb-6">
                    <div v-if="loading" class="flex justify-center items-center py-20 w-full mx-auto mt-16">
                        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8">
                        </div>
                    </div>
                    <div v-else-if="!filteredCompanies.length || filteredCompanies == '' || filteredCompanies == null"
                        class="justify-center items-center py-20 -mt-8 w-full mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 " fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                        </svg>
                        <p class="text-gray-400 ml-32 lg:ml-76">No companies yet!</p>
                    </div>

                    <div v-else v-for="company in filteredCompanies" :key="company.id"
                        class="rounded-t-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ">
                        <div class="bg-[#DCF2F8] h-76 lg:h-96 rounded-t-2xl w-11/12 mx-auto">
                            <img :src="getImageUrl(company.images)" alt=""
                                class="rounded-br-4xl rounded-t-lg w-full h-1/2" />
                            <p class="font-bold ml-2 h-6 text-xs mt-4 lg:text-lg">{{ company.name }}</p>
                            <p class="text-xs mt-4 ml-2 h-26 lg:h-26 font-normal pr-1">{{ company.description }}</p>
                            <div class="flex md:-mt-4 ml-4 h-10 lg:-mt-6">
                                <i @click="openMapModal({ latitude: company.latitude, longitude: company.longitude })"
                                    class="fa-solid fa-location-dot text-[#FF8C00] mr-12 mt-2 lg:mt-2 lg:ml-4 lg:text-xl cursor-pointer"></i>
                                <RouterLink :to="{ name: 'CompanyDetail', params: { id: company.id } }"
                                    class="w-20 lg:ml-20 md:ml-8 md:mt-0 lg:w-28 lg:h-10 h-8 bg-[#1B7590] rounded-lg">
                                    <p class="text-white text-xs hover:cursor-pointer text-center mt-2.5">Explore more
                                    </p>
                                </RouterLink>
                            </div>
                            <MapModal :visible="isMapVisible" :mapSrc="mapSrc" @close="closeMapModal" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="recommended-section w-5/6  mx-auto">
                <p class="ml-10 lg:ml-19 font-bold lg:text-2xl">recommended for you</p>
                <div class=" lg:flex w-11/12 px-6 mx-auto mt-4 lg:ml-">
                    <div class="bg-[#1B7590] rounded-lg h-96 lg:mt-4 lg:h-8/9 lg:mr-10 lg:pb-2">
                        <img src="/sishu.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                        <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                            <p class="mr-6 mt- text-sm font-semibold w-32 -mt-2 lg:w-40">Sishu Restaurant</p>
                            <div class="w-32 h-10 bg-[#1B7590] border-1 lg:ml-12 lg:-mt-2 rounded-md  border-white">
                                <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">see detail</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-[#1B7590] rounded-lg h-96 mt-4 lg:mr-10 lg:h-8/9 lg:pb-2">
                        <img src="/golden-plate.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                        <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                            <p class="mr-6 mt- text-sm font-semibold w-32 -mt-2 lg:w-40 ">Golden Plate Restaurant</p>
                            <div class="w-32 h-10 bg-[#1B7590] border-1 lg:ml-12 lg:-mt-2 rounded-md  border-white">
                                <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">see detail</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-[#1B7590] rounded-lg h-96 mt-4 lg:h-8/9 lg:pb-2">
                        <img src="/bole-medhanialem.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                        <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                            <p class="mr-6 mt- text-sm font-semibold w-32 -mt-2 lg:w-40">Bole Medanialem Shopping Center
                            </p>
                            <div class="w-32 h-10 bg-[#1B7590] border-1 lg:ml-12 lg:-mt-2 rounded-md  border-white">
                                <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">see detail</p>
                            </div>
                        </div>
                    </div>

                </div>
                <p class="underline text-[#003962] mt-2 lg:ml-20 md:ml-12 hover:cursor-pointer ml-10">More Results</p>

                <div class="Toppicks-section mt-18 w-5/6 -ml-0 mx-auto pb-20">
                    <p class="font-bold ml-10 lg:text-2xl lg:ml-17">Top picks</p>
                    <div class="w-11/12 px-6 mx-auto mt-4 lg:ml-">
                        <div class="lg:flex">
                            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                                <img src="/edna-mol.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2 ">
                                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Edna Mall</p>
                                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                                        <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">view
                                            detail</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                                <img src="/hayle-grand.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Haile Grand Addis Ababa</p>
                                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                                        <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">view
                                            detail</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                                <img src="/zefmesh.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Zefmesh Grand Mall</p>
                                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                                        <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">view
                                            detail</p>
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
                                        <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">view
                                            detail</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:mr-10 lg:pb-2">
                                <img src="/saron-beauty.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Saron Beauty</p>
                                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                                        <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">view
                                            detail</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-[#1B7590] rounded-lg rounded-t-2xl lg:h-8/9 h-96 mt-4 lg:pb-2">
                                <img src="/skylight.png" alt="" class="" style="border-bottom-right-radius: 180px;">
                                <div class="flex mt-6 w-11/12 mx-auto lg:pb-2">
                                    <p class="mr-6  text-sm font-semibold w-32 lg:w-40">Ethiopian Skylight Hotel</p>
                                    <div class="w-32 h-10 bg-[#1B7590] lg:ml-10 border-1 rounded-md  border-white">
                                        <p class="text-center text-white text-xs hover:cursor-pointer mt-2.5">view
                                            detail</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="underline lg:mt-2 -ml-0.5 text-[#1B7590] hover:cursor-pointer">Discover more</p>
                    </div>
                </div>
                <div class="Reviews-section  lg:px-80 lg:-ml-12 pb-20">
                    <p class="lg:ml-1.5 ml-2 font-bold lg:text-2xl">Reviews</p>
                    <div v-if="loading" class="flex justify-center items-center py-20 w-full mx-auto">
                        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-white -mt-8">
                        </div>
                    </div>
                    <div v-else-if="!companies || companies == null || companies == ''"
                        class=" justify-center items-center py-20 -mt-8 w-full mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                        </svg>
                        <p class="text-gray-400 ml-32 lg:ml-76 ">no user information yet!</p>
                    </div>
                    <div v-else v-for="review in reviews" :key="review"
                        class="ml-2 mr-2 rounded-md mt-4 h-40  transition-all duration-300 shadow-lg bg-[#1B7590] p-2 pb-4  ">
                        <!-- <img :src=getImageUrl(review.images) alt="" class="rounded-lg w-1/4 h-1/3 lg:w-64 lg:h-64">  -->
                        <p class="text-xs lg:text-lg text-gray-300 font-serif  ml-8">{{ review.company.name }}</p>
                        <div class="flex mt- w-64 ml-8">
                            <i class="fa-solid fa-user mr-4 text-gray-800 lg:mt-2"></i>
                            <p class="text-xs lg:text-md lg:mt-2.5 text-gray-300">{{ review.user.name }}</p>
                        </div>
                        <div class="w-80 mx-auto ml-8">
                            <p class="font-bold text-sm lg:text-md text-gray-200 text-center lg:mt-10  lg:mb-6">
                                {{ review.name }}
                            </p>
                            <div class="flex ml-0 -mt-6 w-10 h-6 mx-auto">
                                <div v-for="star in Array(
                                    Math.max(0, Math.floor(review.rating || 0))
                                )" :key="star" class="text-[11px] text-yellow-500 mx-auto">
                                    <i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <p class="w- h-32  text-xs lg:text-md lg:h-16 text-gray-300 mt-2 mb-4">{{ review.comment }}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UserLayoutUser>
</template>
