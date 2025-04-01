<script setup>
import restaurantIcon from "/images/categoriesIcons/restaurant.png";
import retailIcon from "/images/categoriesIcons/retail.png";
import electronicsIcon from "/images/categoriesIcons/electronics.png";
import hotelsIcon from "/images/categoriesIcons/hotels.png";
import healthIcon from "/images/categoriesIcons/health.png";
import entertainmentIcon from "/images/categoriesIcons/entertainment.png";
import automotiveIcon from "/images/categoriesIcons/automotive.png";
import educationIcon from "/images/categoriesIcons/education.png";
import pharmacyIcon from "/images/categoriesIcons/pharmacy.png";
import { useCategoryStore } from "@/stores/category";

const { getAllCategories } = useCategoryStore();

const categories = [
  {
    name: "Restaurants & Cafes",
    iconSrc: restaurantIcon,
  },
  {
    name: "Retail Shops",
    iconSrc: retailIcon,
  },
  {
    name: "Electronics",
    iconSrc: electronicsIcon,
  },
  {
    name: "Hotels & Accommodations",
    iconSrc: hotelsIcon,
  },
  {
    name: "Health & Wellness",
    iconSrc: healthIcon,
  },
  {
    name: "Entertainment & Events",
    iconSrc: entertainmentIcon,
  },
  {
    name: "Automotive Services",
    iconSrc: automotiveIcon,
  },
  {
    name: "Education & Training",
    iconSrc: educationIcon,
  },
  {
    name: "Pharmacy",
    iconSrc: pharmacyIcon,
  },
];
</script>

<template>
  <div
    class=" pb-4 xs:translate-y-0 md:mt-8 px-2 lg:mt-32 xl:max-w-[1200px] mx-auto"
  >
    <div
      class="flex justify-between items-center text-sm xs:text-base xs:px-4 sm:px-8 md:px-0"
    >
      <h1 class="text-primaryColor font-bold md:text-center md:text-3xl">
        Browse By Categories
      </h1>

      <RouterLink
        :to="{ name: 'Home' }"
        class="text-primaryColor font-bold flex items-center md:text-2xl"
      >
        More Categories
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="fill-primaryColor size-5 md:size-8 md:mt-1"
          viewBox="0 0 256 256"
        >
          <path
            d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
          ></path>
        </svg>
      </RouterLink>
    </div>

    <div
      class="grid gap-y-4 mt-8 md:mt-16 place-items-center sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="flex gap-x-4 bg-primaryColor/80 items-center w-full max-w-[300px] px-4 py-5 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-linear"
      >
        <div class="size-12">
          <img :src="category.iconSrc" class="w-full" :alt="category.name" />
        </div>
        <p class="text-white">{{ category.name }}</p>
      </div>
    </div>
  </div>
</template>
