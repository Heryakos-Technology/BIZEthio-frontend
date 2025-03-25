<script setup>
import { ref } from "vue";

// Sample table data
const categories = ref([
  {
    id: 1,
    name: "Technology",
    description: "All companies related to technology and innovation.",
  },
  {
    id: 2,
    name: "Healthcare",
    description: "Companies providing health-related products and services.",
  },
  {
    id: 3,
    name: "Hotels",
    description:
      "Provide accommodation services for travelers, often with amenities.",
  },
  {
    id: 4,
    name: "Travel Agencies",
    description:
      "Companies that assist customers in planning and booking travel arrangements.",
  },
  {
    id: 5,
    name: "Catering Services",
    description:
      "Companies that provide food and beverage services for events and gatherings.",
  },
]);

const deleteCategory = (id) => {
  categories.value = categories.value.filter((category) => category.id !== id);
  console.log(`Deleted category with id: ${id}`);
};
</script>

<template>
  <div class="w-full overflow-x-auto col-span-2 mt-16">
    <div class="min-w-[600px] max-w-[1000px] w rounded-lg shadow-md">
      <!-- Table Header -->
      <div class="grid grid-cols-[50px_150px_1fr_100px] bg-white font-bold">
        <div
          class="p-3 lg:py-5 text-sm text-gray-700 sticky left-0 bg-white z-10"
        >
          No
        </div>
        <div
          class="p-3 lg:py-5 text-sm text-gray-700 sticky left-[50px] bg-white z-10"
        >
          Name
        </div>
        <div class="p-3 lg:py-5 text-sm text-gray-700">description</div>
        <div class="p-3 lg:py-5 text-sm text-gray-700">Actions</div>
      </div>

      <!-- Table Body -->
      <div
        v-for="(category, index) in categories"
        :key="category.id"
        class="grid grid-cols-[50px_150px_1fr_100px] last:-b-0 my-3 bg-white font-semibold lg:py-2"
      >
        <div class="p-3 text-sm text-gray-600 sticky left-0 bg-white z-10">
          {{ index + 1 }}
        </div>
        <div class="p-3 text-sm text-gray-600 sticky left-[50px] bg-white z-10">
          {{ category.name }}
        </div>
        <div class="p-3 text-sm text-gray-600">{{ category.description }}</div>
        <div class="p-3 flex gap-x-2 justify-center">
          <button class="text-gray-500 hover:text-gray-700" title="Delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <button
            @click="deleteCategory(category.id)"
            class="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16m-4 4v6m-4-6v6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
