<template>
  <AdminLayout>
    <div class="pb-20">
      <div class="border-b-1 text-gray-400 -mt-8">
        <p class="text-gray-600 text-[20px] mb-5">High Rated Companies</p>
      </div>
  <div class="flex flex-wrap justify-between px-32 mt-10">
        <div class="w-full sm:w-1/3 py-5 pl-5 bg-white rounded-2xl shadow-md mb-4 mx-2">
          <img class="-mt-2 mb-4" src="/high-rated-admin-ratting.png" alt="" />
          <div class="flex mt-4">
            <img class="mr-2" src="/smaller-ratedimg-admin-rating.png" alt="" />
            <p class="mt-2">{{ topRatedCompanies[0]?.name || "N/A" }}</p>
          </div>
          <p class="text-gray-400 text-[14px] mb-2 ml-9.5">Avg Client Rating</p>
          <p class="ml-9.5 mt-2">{{ topRatedCompanies[0]?.rating_avg || "N/A" }}</p>
        </div>
        <div class="w-full sm:w-1/3 py-5 pl-5 bg-white rounded-2xl shadow-md mb-4 mx-2">
          <img class="-mt-2 mb-4" src="/high-rated-admin-ratting.png" alt="" />
          <div class="flex mt-4">
            <img class="mr-2" src="/smaller-ratedimg-admin-rating.png" alt="" />
            <p class="mt-2">{{ topRatedCompanies[1]?.name || "N/A" }}</p>
          </div>
          <p class="text-gray-400 text-[14px] mb-2 ml-9.5">Avg Client Rating</p>
          <p class="ml-9.5 mt-2">{{ topRatedCompanies[1]?.rating_avg || "N/A" }}</p>
        </div>
      </div>
      <div ref="cardSection" class="border-b-1 text-gray-400 mt-10">
        <p class="text-gray-600 text-[20px] mb-5">Companies Ratings</p>
      </div>
      <div class="bg-white rounded-sm w-full sm:w-1/3 h-[420px] mx-auto mt-10 mb-10 shadow-md">
        <img class="w-full rounded-t-sm h-64" :src="getCompanyImage(selectedCompany)" alt="" />
        <div class="flex mt-4">
          <div class="mt-">
            <img class="ml-10" src="/smaller-ratedimg-admin-rating.png" alt="" />
          </div>
          <div class="ml-4">
            <p>{{ selectedCompany ? selectedCompany.name : "Select Company" }}</p>
            <p class="mt-4">Average Client Rating</p>
          </div>
        </div>
        <div class="flex ml-21.5 mt-6">
          <i class="fa-solid fa-star text-yellow-400 mr-2"></i>
          <p class="-mt-1">{{ selectedCompany ? selectedCompany.rating_avg : "-" }}</p>
        </div>
      </div>
      <div class="mb-10 w-11/12 mx-auto">
        <div class="bg-white w-full flex pl-10 mb-6">
          <p class="h-16 pt-5 font-bold text-[13px] w-1/5">No</p>
          <p class="h-16 pt-5 font-bold text-[13px] w-1/4">Name</p>
          <p class="h-16 pt-5 font-bold text-[13px] w-1/2">Average Client Rating</p>
          <p class="h-16 pt-5 font-bold text-[13px] w-1/4">Actions</p>
        </div>
        <div v-for="(company, index) in companies" :key="company.id" class="bg-white w-full mb-6 flex">
          <p class="h-16 ml-10 pt-5 font-bold w-1/5">{{ index + 1 }}</p>
          <p class="h-16 pt-5 w-1/4">{{ company.name }}</p>
          <i class="fa-solid fa-star text-yellow-400 ml-18 mt-6"></i>
          <p class="h-16 pt-5 w-1/4">{{ company.rating_avg }}</p>
          <i @click="showCard(company)"
             class="fa-regular mt-6 w-1/4 ml-48 cursor-pointer hover:scale-105 hover:text-green-600"
             :class="changeEyeIcon[company.id] ? 'fa-regular fa-eye text-yellow-400' : 'fa-regular fa-eye-slash'"></i>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script>
import AdminLayout from "@/layout/AdminLayout.vue";
import axios from "axios";
export default {
  components: {
    AdminLayout,
  },
  mounted() {
    this.fetchCompanyRatting();
  },
  data() {
    return {
      companies: [],
      selectedCompany: null,
      topRatedCompanies: [],
      changeEyeIcon: {},
    };
  },
  methods: {
    getCompanyImage(company) {
      if (company && company.images) {
        try {
          const imagesArray = JSON.parse(company.images);
          return imagesArray[0][0] || "/buildingimg-card-admin-rating.png";
        } catch (e) {
          console.error("Error parsing images:", e);
          return "/buildingimg-card-admin-rating.png";
        }
      }
      return "/buildingimg-card-admin-rating.png";
    },
    showCard(company) {
      this.companies.forEach((comp) => {
        this.changeEyeIcon[comp.id] = false;
      });
      this.selectedCompany = company;
      this.changeEyeIcon[company.id] = true;
      this.$refs.cardSection.scrollIntoView({
        behavoir: "smooth",
        block: "start",
      });
    },

async fetchCompanyRatting() {
  try {
    const response = await axios.get(
      "https://bizethio-backend-production-4c6c.up.railway.app/api/companies",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    this.companies = response.data;

    // Sort companies by rating_avg in descending order
    this.companies.sort((a, b) => b.rating_avg - a.rating_avg);

    // Select the top two companies
    this.topRatedCompanies = this.companies.slice(0, 2);
    console.log("Top rated companies", this.topRatedCompanies);
  } catch (error) {
    console.error("error fetching data", error);
  }
},
  },
};
</script>
