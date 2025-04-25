<script setup>
import AdminLayout from '@/layout/AdminLayout.vue';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, reactive, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { getUserByEmail ,deleteUserByEmail} from '../../auth'; 
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'; 
// import { deleteUserByUid } from "../../auth";

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
const userToBeDeleted  = ref([])
// Loading states
const loading = ref({
  update: false,
  delete: false,
  fetch: false,
});

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
      console.log('users',users.value)
    } finally {
      loading.value.delete = false;
      userToDelete.value = null;
      showDeleteConfirm.value = false;
    }
  }

};
// const deleteUserAccount = async () => {
//       const auth = getAuth();
//       const user = userToDelete.value.email; // Get the currently logged-in user

//       if (user) {
//         try {
//           await deleteUser(user); // Delete the user account
//           console.log('User deleted from Firebase Authentication successfully');
//         } catch (error) {
//           console.error('Error deleting user from Authentication:', error.message);
//           throw error; // Rethrow to handle in confirmDelete
//         }
//       } else {
//         console.error('No user is currently logged in.');
//         throw new Error('No user is currently logged in.');
//       }
//     };
// const confirmDelete = async () => {
//   if (userToDelete.value) {
//     loading.value.delete = true;
//     try {
      
//       await Promise.all([
//       deleteUsers(userToDelete.value.id), 
//         deleteUserByEmail(userToDelete.value.email), 
//         deleteUserAccount()
//       ]);

//       //Refresh the user list

//       users.value = await getAllUsers();
//       console.log('users', users.value);
//     } catch (error) {
//       console.error('Error deleting user:', error.message);
//     } finally {
//       loading.value.delete = false;
//       userToDelete.value = null;
//       showDeleteConfirm.value = false; 
//     }
//   }
// };
// const deleteUserAccount = async (email) => {
//       const auth = getAuth();
//       const uid = await getUserUidByEmail(email); // Replace this with your method to get UID

//       if (uid) {
//         try {
//           // Delete the user from Firebase Authentication
//           await deleteUser(auth.currentUser); // You need to be logged in as the user or an admin
//           console.log('User deleted from Firebase Authentication successfully');
//         } catch (error) {
//           console.error('Error deleting user from Authentication:', error.message);
//           throw error; // Rethrow to handle in confirmDelete
//         }
//       } else {
//         console.error('User not found.');
//         throw new Error('User not found.');
//       }
//     };

    // const deleteUserFromFirestore = async (email) => {
    //   const db = getFirestore();
    //   const userDocRef = doc(db, 'users', email); // Assuming 'users' is your collection name
    //   await deleteDoc(userDocRef);
    //   console.log('User document deleted from Firestore successfully');
    // };

    // const confirmDelete = async () => {
    //   if (userToDelete.value) {
    //     loading.value.delete = true;
    //     try {
    //       deleteUserByEmail(userToDelete.value.id), 
    //       //deleteUserByEmail(userToDelete.value.email), 
    //       // deleteUserByEmail(userToDelete.value.email)
    //       //await deleteUser(userToDelete.value.email); // Delete from Firestore
          
    //       // Refresh the user list
    //       users.value = await getAllUsers();
    //       console.log('users', users.value);
    //     } catch (error) {
    //       console.error('Error deleting user:', error.message);
    //     } finally {
    //       loading.value.delete = false;
    //       userToDelete.value = null;
    //       // Optionally close confirmation dialog here
    //     }
    //   }
    // };
const cancelDelete = () => {
  userToDelete.value = null;
  showDeleteConfirm.value = false;
};

const handleDelete = (user) => {
  console.log('user to delete',user)
  userToBeDeleted.value = user
  console.log('user to be deleted',userToBeDeleted.value.password)
  userToDelete.value = user;
  showDeleteConfirm.value = true;
};

const fetchUser = async (email) => {
      console.log('Fetching user with email:', email);
      try {
        userData.value = await getUserByEmail(email);
        console.log('User data from firebase:', userData.value);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    const deleteUser =  async (email) => {
      console.log('Fetching delete with email:', email);
      try {
        await deleteUserByEmail(email);
        userData.value = null; 
        console.log('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error.message);
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
    formData.verification_status = userToUpdate.value.verification_status || "unverified";
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
      location: locationData,
      is_banned: formData.is_banned ? 1 : 0,
    };
    console.log("Sending update data:", updateData);

    await updateUser(updateData, userToUpdate.value.id);

    users.value = await getAllUsers();
    showUpdateModal.value = false;
    userToUpdate.value = null;
    resetForm();
  } catch (error) {
    console.error("Update failed:", error);
    console.error("Error details:", errors.value);
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
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 class="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p class="mb-6">
          Are you sure you want to delete the user
          <span class="font-semibold">{{ userToDelete?.name }}</span>? This
          action cannot be undone.
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

    <!-- Simplified Update User Modal -->
    <div
      v-if="showUpdateModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto py-10"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full mx-4 relative">
        <button
          @click="cancelUpdate"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
          :disabled="loading.update"
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

        <h3 class="text-lg font-bold mb-4">Update User Information</h3>

        <form @submit.prevent="submitUpdate" class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              :disabled="loading.update"
            />
            <p v-if="errors?.name" class="mt-1 text-sm text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              :disabled="loading.update"
            />
            <p v-if="errors?.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Phone Number -->
          <div>
            <label
              for="phone_number"
              class="block text-sm font-medium text-gray-700"
              >Phone Number</label
            >
            <input
              type="text"
              id="phone_number"
              v-model="formData.phone_number"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              :disabled="loading.update"
            />
            <p v-if="errors?.phone_number" class="mt-1 text-sm text-red-600">
              {{ errors.phone_number }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- City -->
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700"
                >City</label
              >
              <input
                type="text"
                id="city"
                v-model="formData.city"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                :disabled="loading.update"
              />
              <p v-if="errors?.city" class="mt-1 text-sm text-red-600">
                {{ errors.city }}
              </p>
            </div>

            <!-- Sub City -->
            <div>
              <label
                for="sub_city"
                class="block text-sm font-medium text-gray-700"
                >Sub City</label
              >
              <input
                type="text"
                id="sub_city"
                v-model="formData.sub_city"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                :disabled="loading.update"
              />
              <p v-if="errors?.sub_city" class="mt-1 text-sm text-red-600">
                {{ errors.sub_city }}
              </p>
            </div>
          </div>

          <!-- Verification Status -->
          <div>
            <label
              for="verification_status"
              class="block text-sm font-medium text-gray-700"
              >Verification Status</label
            >
            <select
              id="verification_status"
              v-model="formData.verification_status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
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
          <div class="flex items-center">
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
              >Ban User</label
            >
            <p v-if="errors?.is_banned" class="mt-1 text-sm text-red-600">
              {{ errors.is_banned }}
            </p>
          </div>

          <!-- Location (simplified) -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Location</label
            >
            <p class="text-xs text-gray-500 mb-1">
              Enter JSON format: {"lat": number, "lng": number}
            </p>
            <textarea
              v-model="formData.location"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder='{"lat": 0, "lng": 0}'
              :disabled="loading.update"
            ></textarea>
            <p v-if="errors?.location" class="mt-1 text-sm text-red-600">
              {{ errors.location }}
            </p>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="cancelUpdate"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 transition duration-200"
              :disabled="loading.update"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white transition duration-200 flex items-center justify-center min-w-[120px]"
              :disabled="loading.update"
            >
              <svg
                v-if="loading.update"
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
              {{ loading.update ? "Updating..." : "Update User" }}
            </button>
          </div>
        </form>
      </div>
    </div>

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
                  <div class="text-sm text-gray-900">{{ user.phone_number }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full':
                        true,
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
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full':
                        true,
                      'bg-red-100 text-red-800': user.is_banned,
                      'bg-green-100 text-green-800':
                        !user.is_banned && user.verification_status === 'verified',
                      'bg-yellow-100 text-yellow-800':
                        !user.is_banned && user.verification_status === 'pending',
                      'bg-gray-100 text-gray-800':
                        !user.is_banned && user.verification_status === 'unverified',
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
                      @click.prevent="handleDelete(user),fetchUser(user.email)"
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
