<script setup>
import AdminLayout from "@/layout/AdminLayout.vue";
import { useUserStore } from "@/stores/user";
import { computed, onMounted, ref, reactive, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { getUserByEmail, deleteUserByEmail } from "../../auth";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
// import { deleteUserByUid } from "../../auth";
import Modal from "@/components/UserProfile/Modal.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const { getAllUsers, deleteUsers, updateUser } = useUserStore();
const { errors } = storeToRefs(useUserStore());
const users = ref([]);
const searchQuery = ref("");
const showDeleteConfirm = ref(false);
const userToDelete = ref(null);
const showUpdateModal = ref(false);
const userToUpdate = ref(null);

const formData = reactive({
  name: "",
  email: "",
  phone_number: "",
  city: "",
  sub_city: "",
  location: "",
  verification_status: "unverified",
  is_banned: false,
});


const userData = ref(null);
const userToBeDeleted = ref([]);


const loading = ref({
  update: false,
  delete: false,
  fetch: false,
});

const $toast = useToast();

onMounted(async () => {
  loading.value.fetch = true;
  try {
    users.value = await getAllUsers();
    console.log("Fetched users:", users.value);
  } finally {
    loading.value.fetch = false;
  }
});

const confirmDelete = async () => {
  if (userToDelete.value) {
    loading.value.delete = true;
    try {
      await deleteUser(userToDelete.value.id);
      users.value = await getAllUsers();
      console.log("users", users.value);
    } finally {
      loading.value.delete = false;
      userToDelete.value = null;
      showDeleteConfirm.value = false;
    }
  }
};
const cancelDelete = () => {
  userToDelete.value = null;
  showDeleteConfirm.value = false;
};

const handleDelete = (user) => {
  console.log("user to delete", user);
  userToBeDeleted.value = user;
  userToDelete.value = user;
  showDeleteConfirm.value = true;
};

const fetchUser = async (email) => {
  console.log("Fetching user with email:", email);
  try {
    userData.value = await getUserByEmail(email);
    console.log("User data from firebase:", userData.value);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
const deleteUser = async (email) => {
  console.log("Fetching delete with email:", email);
  try {
    await deleteUserByEmail(email);
    try {
      await deleteUsers(userData.value.id);
      userData.value = null;
      console.log("User deleted successfully");
    } catch (dbError) {
      console.error("Error deleting user from database:", dbError.message);
      // Attempt to recreate the Firebase user if database deletion fails
      // This might not always be possible and depends on your specific requirements
      console.warn("Attempting to re-create user in Firebase due to database deletion failure.");
      // You might need to implement a function to re-create the user in Firebase
      // Example: await createUserInFirebase(userData.value);
      throw dbError; // Re-throw the error to signal overall failure
    }
  } catch (authError) {
    console.error("Error deleting user from Firebase:", authError.message);
    throw authError; // Re-throw the error to prevent database deletion
  }
};

const handleUpdate = (user) => {
  userToUpdate.value = user;
  showUpdateModal.value = true;
  console.log("Opening update modal for:", user);
};

const cancelUpdate = () => {
  userToUpdate.value = null;
  showUpdateModal.value = false;
};

const resetForm = () => {
  Object.assign(formData, {
    name: "",
    email: "",
    phone_number: "",
    city: "",
    sub_city: "",
    location: "",
    verification_status: "unverified",
    is_banned: false,
  });
};

watchEffect(() => {
  if (userToUpdate.value) {
    formData.name = userToUpdate.value.name || "";
    formData.email = userToUpdate.value.email || "";
    formData.phone_number = userToUpdate.value.phone_number || "";
    formData.city = userToUpdate.value.city || "";
    formData.sub_city = userToUpdate.value.sub_city || "";
    formData.location = userToUpdate.value.location
      ? JSON.stringify(userToUpdate.value.location)
      : '{"lat": 0, "lng": 0}';
    formData.verification_status =
      userToUpdate.value.verification_status || "unverified";
    formData.is_banned = !!userToUpdate.value.is_banned;
  }
});

const submitUpdate = async () => {
  if (!userToUpdate.value) return;



  loading.value.update = true;
  try {
    let locationData = null;
    try {
      locationData = JSON.parse(formData.location);
    } catch (e) {
      console.error("Invalid JSON for location", formData.location);
      locationData = { lat: 0, lng: 0 };
    }

    const updateData = {
      ...formData,
      id:userToUpdate.value.id,
      location: locationData,
      is_banned: formData.is_banned ? 1 : 0,
    };
    console.log("Sending update data:", updateData);


    
    await updateUser(updateData, userToUpdate.value.id);

    users.value = await getAllUsers();
    showUpdateModal.value = false;
    userToUpdate.value = null;
    resetForm();
    $toast.success("User updated successfully!", {
      position: "top",
    });
  } catch (error) {
    console.error("Update failed:", error);
    console.error("Error details:", errors.value);
    $toast.error("Failed to update user.", {
      position: "top",
    });
  } finally {
    loading.value.update = false;
  }
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value;
  }
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <AdminLayout>
    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/50 backdrop-blur-[5px] z-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 class="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p class="mb-6">
          Are you sure you want to delete the user
          <span class="font-semibold">{{ userToDelete?.name }}</span
          >? This action cannot be undone.
        </p>
        <div class="flex justify-end gap-3">
          <button
            @click="cancelDelete"
            class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 transition duration-200"
            :disabled="loading.delete"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white transition duration-200 flex items-center"
            :disabled="loading.delete"
          >
            <svg
              v-if="loading.delete"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            {{ loading.delete ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Update User Modal -->
    <Modal v-if="showUpdateModal" @close="cancelUpdate">
      <template #body>
        <div
          class="no-scrollbar relative min-w-full translate-x-12 w-full xs:min-w-0 mx-auto max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 ark:bg-gray-900 lg:p-11 2xl:translate-x-16"
        >
          <!-- close btn -->
          <button
            @click="cancelUpdate"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 ark:bg-gray-700 ark:bg-white/[0.05] ark:text-gray-400 ark:hover:bg-white/[0.07] ark:hover:text-gray-300"
          >
            <svg
              class="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill=""
              />
            </svg>
          </button>
          <div class="px-2 pr-14">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 capitalize">
              Edit User Information
            </h4>
            <p class="mb-6 text-sm text-gray-500 ark:text-gray-400 lg:mb-7">
              Update user details to keep the information up-to-date.
            </p>
          </div>
          <form @submit.prevent="submitUpdate" class="flex flex-col">
            <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
              <div class="mt-7">
                <h5
                  class="mb-5 text-lg font-medium text-gray-800 capitalize lg:mb-6"
                >
                  Personal Information
                </h5>

                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 ark:text-gray-400"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      v-model="formData.name"
                      class="ark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 capitalize ark:placeholder:text-white/30 ark:focus:border-brand-800"
                      :disabled="loading.update"
                    />
                    <p v-if="errors?.name" class="mt-1 text-sm text-red-600">
                      {{ errors.name }}
                    </p>
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 ark:text-gray-400"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      v-model="formData.phone_number"
                      class="ark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 capitalize ark:placeholder:text-white/30 ark:focus:border-brand-800"
                      :disabled="loading.update"
                    />
                    <p
                      v-if="errors?.phone_number"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ errors.phone_number }}
                    </p>
                  </div>
                </div>

                <div class="px-2 pr-14 mt-8">
                  <h4 class="mb-2 text-2xl font-semibold text-gray-800">
                    Edit Address
                  </h4>
                </div>

                <div class="flex flex-col">
                  <div class="px-2 overflow-y-auto custom-scrollbar">
                    <div
                      class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"
                    >
                      <div>
                        <label
                          class="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          v-model="formData.city"
                          class="ark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 ark:placeholder:text-white/30 ark:focus:border-brand-800"
                          :disabled="loading.update"
                        />
                        <p v-if="errors?.city" class="mt-1 text-sm text-red-600">
                          {{ errors.city }}
                        </p>
                      </div>

                      <div>
                        <label
                          class="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                          Sub City
                        </label>
                        <input
                          type="text"
                          id="sub_city"
                          v-model="formData.sub_city"
                          class="ark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 ark:placeholder:text-white/30 ark:focus:border-brand-800"
                          :disabled="loading.update"
                        />
                        <p
                          v-if="errors?.sub_city"
                          class="mt-1 text-sm text-red-600"
                        >
                          {{ errors.sub_city }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-7">
                  <h5
                    class="mb-5 text-lg font-medium text-gray-800 capitalize lg:mb-6"
                  >
                    Other Information
                  </h5>

                  <!-- Verification Status -->
                  <div>
                    <label
                      for="verification_status"
                      class="mb-1.5 block text-sm font-medium text-gray-700 ark:text-gray-400"
                    >
                      Verification Status
                    </label>
                    <select
                      id="verification_status"
                      v-model="formData.verification_status"
                      class="ark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 capitalize ark:placeholder:text-white/30 ark:focus:border-brand-800"
                      :disabled="loading.update"
                    >
                      <option value="unverified">Unverified</option>
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                    </select>
                    <p
                      v-if="errors?.verification_status"
                      class="mt-1 text-sm text-red-600"
                    >
                      {{ errors.verification_status }}
                    </p>
                  </div>

                  <!-- Ban Status -->
                  <div class="flex items-center mt-5">
                    <input
                      type="checkbox"
                      id="is_banned"
                      v-model="formData.is_banned"
                      class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-4 w-4"
                      :disabled="loading.update"
                    />
                    <label
                      for="is_banned"
                      class="ml-2 block text-sm font-medium text-red-700"
                    >
                      Ban User
                    </label>
                    <p v-if="errors?.is_banned" class="mt-1 text-sm text-red-600">
                      {{ errors.is_banned }}
                    </p>
                  </div>

                  <!-- Location (simplified) -->
                  <div class="mt-5">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 ark:text-gray-400"
                    >
                      Location
                    </label>
                    <p class="text-xs text-gray-500 mb-1">
                      Enter JSON format: {"lat": number, "lng": number}
                    </p>
                    <textarea
                      v-model="formData.location"
                      rows="2"
                      class="ark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 ark:border-gray-700 ark:bg-gray-900 capitalize ark:placeholder:text-white/30 ark:focus:border-brand-800"
                      placeholder='{"lat": 0, "lng": 0}'
                      :disabled="loading.update"
                    ></textarea>
                    <p v-if="errors?.location" class="mt-1 text-sm text-red-600">
                      {{ errors.location }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button
                type="button"
                @click="cancelUpdate"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-primaryColor sm:w-auto cursor-pointer"
                :disabled="loading.update"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-white hover:bg-primaryColor sm:w-auto cursor-pointer"
                :disabled="loading.update"
              >
                <span v-if="loading.update">Updating...</span>
                <span v-else>Update User</span>
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>

    <div v-if="users" class="px-4">
      <h1 class="text-center py-8 font-bold text-4xl text-blue-700">Users</h1>

      <!-- Loading indicator for initial fetch -->
      <div v-if="loading.fetch" class="flex justify-center py-10">
        <div class="flex items-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500"
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
          <span class="text-lg text-blue-700">Loading users...</span>
        </div>
      </div>

      <div v-else>
        <div class="pt-2 relative py-4 max-w-screen-md mx-auto text-gray-600">
          <input
            v-model="searchQuery"
            class="border-2 w-full border-gray-300 bg-white h-10 py-2 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search by name, email or role"
          />
          <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
            <svg
              class="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 mb-8">
            <thead class="bg-gray-50">
              <tr class="">
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                >
                  User Phone Number
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(user, index) in filteredUsers"
                :key="index"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-2">
                      <div class="text-sm font-medium text-gray-900">
                        {{ user.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ user.phone_number }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-green-100 text-green-800': user.role === 'Admin',
                      'bg-yellow-100 text-yellow-800':
                        user.role === 'Business Owner',
                      'bg-blue-100 text-blue-800': user.role === 'User',
                    }"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-red-100 text-red-800': user.is_banned,
                      'bg-green-100 text-green-800':
                        !user.is_banned &&
                        user.verification_status === 'verified',
                      'bg-yellow-100 text-yellow-800':
                        !user.is_banned &&
                        user.verification_status === 'pending',
                      'bg-gray-100 text-gray-800':
                        !user.is_banned &&
                        user.verification_status === 'unverified',
                    }"
                  >
                    {{ user.is_banned ? "Banned" : user.verification_status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click.prevent="handleUpdate(user)"
                      class="bg-blue-500 text-white hover:bg-blue-600 px-3 rounded-md py-1 transition duration-200 transform hover:scale-105"
                      :disabled="loading.update || loading.delete"
                    >
                      Edit
                    </button>
                    <button
                      @click.prevent="handleDelete(user), fetchUser(user.email)"
                      class="bg-red-500 text-white hover:bg-red-600 px-3 rounded-md py-1 transition duration-200 transform hover:scale-105"
                      :disabled="loading.update || loading.delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty state message -->
          <div
            v-if="filteredUsers.length === 0 && !loading.fetch"
            class="text-center py-8"
          >
            <p class="text-gray-500">
              No users found matching your search criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
  </template>

<style scoped>
  .overflow-x-auto {
    max-width: 100%;
    overflow-x: auto;
  }

  /* Disabled button styles */
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style>