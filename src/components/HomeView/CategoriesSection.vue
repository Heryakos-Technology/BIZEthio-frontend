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
    class="-translate-y-[70px] pb-16 xs:translate-y-0 md:mt-8 px-2 lg:mt-16 xl:max-w-[1200px] mx-auto"
  >
    <h1 class="text-primaryColor text-lg font-bold md:text-center md:text-3xl">
      Browse By Categories
    </h1>

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
