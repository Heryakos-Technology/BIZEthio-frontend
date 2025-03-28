<script setup>
import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";

const categoryStore = useCategoryStore();
const { getAllCategories, deleteCategory, createCategory } = categoryStore;

const isAddOpen = ref(false);

const categories = ref([]);
const formdata = ref({
  name: "",
  description: "",
});

onMounted(async () => {
  await fetchCategories();
});

const fetchCategories = async () => {
  categories.value = await getAllCategories();
  // console.log(categories.value);
};

const handleDelete = async (id) => {
  await deleteCategory(id);
  await fetchCategories();
};

const handleAddCategory = async () => {
  const newFormData = new FormData();
  newFormData.append("name", formdata.value.name);
  newFormData.append("description", formdata.value.description);

  await createCategory(newFormData);

  formdata.value.name = "";
  formdata.value.description = "";

  isAddOpen.value = false;

  await fetchCategories();
};

const toggleAddForm = () => {
  isAddOpen.value = !isAddOpen.value;
};
</script>

<template>
  <div class="px-4 relative">
    <div
      v-if="isAddOpen"
      class="w-[90%] bg-white shadow-lg left-[-10px] xs:left-0 absolute p-4 z-50"
    >
      <div class="flex justify-between mb-2">
        <h2 class="text-lg font-semibold">Add New Category</h2>
        <button
          @click="toggleAddForm"
          class="text-gray-500 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="mb-2">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-1"
          >Name:</label
        >
        <input
          type="text"
          id="name"
          v-model="formdata.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label
          for="description"
          class="block text-gray-700 text-sm font-bold mb-1"
          >Description:</label
        >
        <textarea
          id="description"
          v-model="formdata.description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <button
        @click="handleAddCategory"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
      >
        Add
      </button>
    </div>

    <div class="mt-16 xs:ml-4">
      <h1 class="font-bold text-3xl lg:text-4xl my-8 uppercase">categories</h1>
      <button
        @click="toggleAddForm"
        class="flex font-bold items-center cursor-pointer justify-center gap-x-3 bg-white py-2 rounded-sm mt-2 px-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path
            d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"
          ></path>
        </svg>
        Add Category
      </button>
    </div>
  </div>
  <div class="overflow-x-auto xl:col-span-2 mt-8 px-4">
    <div class="min-w-[600px] max-w-[100%] w rounded-lg shadow-md">
      <!-- Table Header -->
      <div
        class="grid grid-cols-[50px_140px_1fr_100px] bg-white uppercase font-bold"
      >
        <div class="p-3 lg:py-5 text-sm text-black sticky left-0 bg-white z-10">
          No
        </div>
        <div
          class="p-3 lg:py-5 text-sm text-black sticky left-[50px] bg-white z-10"
        >
          Name
        </div>
        <div class="p-3 lg:py-5 text-sm text-black">description</div>
        <div class="p-3 lg:py-5 text-sm text-black">Actions</div>
      </div>

      <!-- Table Body -->
      <div
        v-for="(category, index) in categories"
        :key="category.id"
        class="grid grid-cols-[50px_160px_1fr_100px] last:-b-0 my-3 bg-white font-semibold lg:py-2"
      >
        <div
          class="p-3 text-sm lg:text-base text-black font-bold sticky left-0 bg-white z-10"
        >
          {{ index + 1 }}
        </div>
        <div
          class="p-3 text-sm lg:text-base text-black font-bold sticky left-[50px] bg-white z-10"
        >
          {{ category.name }}
        </div>
        <div class="p-3 text-sm lg:text-base text-black font-bold">
          {{ category.description }}
        </div>
        <div class="p-3 flex gap-x-2 lg:gap-x-4 justify-center">
          <button class="text-gray-500 hover:text-black" title="Edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 lg:size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <button
            @click="handleDelete(category.id)"
            class="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5 lg:size-6"
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
