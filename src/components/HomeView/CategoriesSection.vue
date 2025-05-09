<script setup>
import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";

const { getAllCategories } = useCategoryStore();
const categories = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    categories.value = await getAllCategories();
    console.log(categories.value);
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    loading.value = false;
  }
});

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
</script>

<template>
  <div
    class="pb-4 xs:translate-y-0 md:mt-8 px-2 lg:mt-32 xl:max-w-[1200px] mx-auto"
  >
    <div
      class="flex justify-between items-center text-sm xs:text-base xs:px-4 sm:px-8 md:px-0"
    >
      <h1 class="text-primaryColor font-bold md:text-center md:text-3xl">
        Browse By Categories
      </h1>

      <RouterLink
        :to="{ name: 'MoreCategories' }"
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

    <!-- Loading spinner while fetching data -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primaryColor"
      ></div>
    </div>

    <div v-else-if="categories.length === 0" class="py-20 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
        />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">
        No Categories found
      </h3>
      <p class="mt-1 text-gray-500">
        We couldn't find any Categories to display at the moment.
      </p>
    </div>

    <div
      v-else
      class="grid gap-y-4 mt-8 md:mt-16 place-items-center sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(category, index) in categories.slice(0, 9)"
        :key="index"
        class="flex gap-x-4 bg-primaryColor/80 items-center w-full max-w-[300px] px-4 py-5 rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-linear relative"
      >
        <div class="size-12">
          <img
            :src="category.image_link"
            class="w-[80%]"
            :alt="category.name"
          />
        </div>
        <p class="text-white">{{ category.name }}</p>

        <RouterLink
          :to="{ name: 'CategoryPage', params: { name: category.name } }"
          class="inset-0 absolute z-10"
        ></RouterLink>
      </div>
    </div>
  </div>
</template>
