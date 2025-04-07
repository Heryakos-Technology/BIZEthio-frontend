<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";
import { useCategoryStore } from "@/stores/category";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Object,
    required: false, // Make it optional to handle initial null case
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "update"]);

const categoryStore = useCategoryStore();

// Use a computed property to ensure reactivity when category changes
const editFormData = computed({
  get: () => ({
    id: props.category?.id || null,
    name: props.category?.name || "",
    description: props.category?.description || "",
  }),
  set: (value) => {
    // This is intentionally left blank.  We don't want to directly
    // modify the computed property.  Instead, modifications should
    // trigger the 'update' event.
  },
});

const closeDialog = () => {
  emit("close");
};

const updateCategory = () => {
  emit("update", editFormData.value);
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-darkBlue">Edit Category</h3>
        <button
          @click="closeDialog"
          class="text-gray-600 hover:text-gray-800"
          :disabled="loading"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
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

      <!-- Display error message if any -->
      <div
        v-if="
          errorMessage ||
          categoryStore.errors.name ||
          categoryStore.errors.description
        "
        class="mb-4 p-3 bg-red-100 text-red-700 rounded"
      >
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <p v-if="categoryStore.errors.name">
          {{ categoryStore.errors.name[0] }}
        </p>
        <p v-if="categoryStore.errors.description">
          {{ categoryStore.errors.description[0] }}
        </p>
      </div>

      <div class="mb-4">
        <label
          for="edit-name"
          class="block text-gray-700 text-sm font-bold mb-1"
          >Name:</label
        >
        <input
          type="text"
          id="edit-name"
          v-model="editFormData.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :disabled="loading"
        />
      </div>

      <div class="mb-4">
        <label
          for="edit-description"
          class="block text-gray-700 text-sm font-bold mb-1"
          >Description:</label
        >
        <textarea
          id="edit-description"
          v-model="editFormData.description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :disabled="loading"
        ></textarea>
      </div>

      <div class="flex justify-end space-x-2">
        <button
          @click="closeDialog"
          class="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100 transition duration-200"
          :disabled="loading"
        >
          Cancel
        </button>
        <button
          @click="updateCategory"
          class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
          :disabled="loading"
        >
          <span v-if="!loading">Update</span>
          <span v-else class="flex items-center">
            <svg
              class="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Updating...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
