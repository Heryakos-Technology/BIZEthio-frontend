<template>
  <div v-if="!showPassword" class="ml-20 w-2/3">
          <p class="text-center text-3xl font-bold mt-4">
            Welcome to <span class="text-[#2178AC]">BIZEthio</span>
          </p>

          <div class="lg:flex md:flex w-full">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Owner name</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.owner_name" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.owner_name" class="text-red-500 text-sm">
                {{ errors.owner_name }}
              </p>
            </div>

            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Company name</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.name" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.name" class="text-red-500 text-sm">
                {{ errors.name }}
              </p>
            </div>
          </div>
          <div class="lg:flex md:flex">
            <div class="lg:px-6 md:px-6 px-2.5 mt-4 w-full lg:-ml-2 md:-ml-2">
              <div class="flex">
                <p class="">Description</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <!-- <input v-model="description" type="textArea" class="w-11/12 outline-none h-32 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2"> -->
              <textarea v-model="companies.description" name="description" id="" cols="30" rows="6"
                @input="validateFields"
                class="border-2 border-[#60b5e6] rounded-md w-11/12 px-2 outline-none h-34 pt-1"></textarea>
              <p v-if="errors.description" class="text-red-500 text-sm">
                {{ errors.description }}
              </p>
            </div>

            <div class="container">
              <div class="lg:px-3 px-3 md:px-3 -ml-1 mr-1 mt-4 mx-auto">
                <div class="flex">
                  <p class="">Contact Phone</p>
                  <p class="text-red-600 text-2xl font-medium ml-2">*</p>
                </div>
                <input v-model="companies.contact_phone" type="text" @input="handlePhoneInput"
                  class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
                <p v-if="errors.contact_phone" class="text-red-500 text-sm">
                  {{ errors.contact_phone }}
                </p>
              </div>

              <div class="px-3 -ml-1 mr-1 mt-4 mx-auto">
                <div class="lg:flex md:flex">
                  <label class="">Category</label><br />
                  <p class="text-red-600 text-2xl font-medium ml-1">*</p>
                </div>

                <select name="category" v-model="companies.category_id" @change="validateFields"
                  class="cursor-pointer w-11/12 mx-auto h-10 p-1 bg-transparent border-2 border-[#60b5e6] rounded-md transition-all duration-300 focus:outline-none hover:bg-[#eaf8ff] placeholder:text-center">
                  <option value="">Select category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <p v-if="errors.category_id" class="text-red-500 text-sm">
                  {{ errors.category_id }}
                </p>
              </div>
            </div>
          </div>
          <div class="lg:flex md:flex">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Email</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.contact_email" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.contact_email" class="text-red-500 text-sm">
                {{ errors.contact_email }}
              </p>
            </div>

            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Operating Hours</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.operating_hours" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.operating_hours" class="text-red-500 text-sm">
                {{ errors.operating_hours }}
              </p>
            </div>
          </div>
          <div class="lg:flex md:flex">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <label class="text-md">Country</label><br />
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <select name="country" v-model="companies.country" @change="validateFields"
                class="cursor-pointer w-11/12 mx-auto h-10 p-1 bg-transparent border-2 border-[#60b5e6] rounded-md transition-all duration-300 focus:outline-none hover:bg-[#eaf8ff] placeholder:text-center">
                <option value="">Select country</option>
                <option v-for="country in countries" :key="country.id" :value="country.name"
                  class="border-[#84d2ffb7] rounded-lg mt-2">
                  {{ country.name }}
                </option>
              </select>
              <p v-if="errors.country" class="text-red-500 text-sm">
                {{ errors.country }}
              </p>
            </div>

            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Address</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.address" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.address" class="text-red-500 text-sm">
                {{ errors.address }}
              </p>
            </div>
          </div>
          <div class="lg:flex md:flex">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">Region</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.region" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.region" class="text-red-500 text-sm">
                {{ errors.region }}
              </p>
            </div>
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">City</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.city" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.city" class="text-red-500 text-sm">
                {{ errors.city }}
              </p>
            </div>
          </div>
          <!-- image -->
          <div class="lg:flex md:flex">
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="">License URL</p>
                <p class="text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.license_url" type="text" @input="validateFields"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.license_url" class="text-red-500 text-sm">
                {{ errors.license_url }}
              </p>
            </div>
            <div class="lg:px-4 md:px-4 mt-4 w-11/12 mx-auto">
              <div class="flex">
                <p class="mb-2">Website</p>
              </div>
              <input v-model="companies.website" type="text"
                class="w-11/12 outline-none mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md pl-2" />
              <p v-if="errors.website" class="text-red-500 text-sm">
                {{ errors.website }}
              </p>
            </div>
          </div>
          <div class="lg:px-4 md:px-4 mt-4 lg:w-full md:w-1/2">
            <div class="lg:px-4 -ml-4 md:px-4 mt-full md:w-1/2">
              <div class="flex">
                <p class="mb-2">Upload Image</p>
              </div>

              <input v-model="companies.images" type="text"
                class="w-11/12 hidden h-10 bg-transparent border-2 border-[#60b5e6] rounded-md"
                placeholder="Upload images" readonly />

              <!-- Hidden file input for selecting images -->
              <input type="file" @change="handleFileChange" ref="fileInput" class="hidden" multiple />

              <!-- Button to trigger file input -->
              <button @click="triggerFileInput"
                class="mt-2 ml- bg-[#409cd0] hover:scale-105 hover:bg-[#6b8ea1] transition-all duration-300 cursor-pointer text-white rounded-md px-4 py-2">
                Browse
              </button>

              <div v-if="imageUrl && imageUrl.length" class="mt-4">
                <h3 class="text-green-600">Image Uploaded successfully!</h3>
                <div v-for="(url, index) in imageUrl" :key="index">
                  <img :src="url" alt="Uploaded Image" class="mt-2 w-full h-auto rounded-md" />
                </div>
              </div>

              <p v-if="errors.images" class="text-red-500 text-sm">
                {{ errors.images }}
              </p>

              <p v-if="isUploading" class="mt-2 ml-4 text-green-600">
                Uploading...
              </p>
            </div>
            </div>
            <!-- end of image -->

            <div class="lg:px-7 md:px-7 mt-4">
              <div class="">
                <div class="md:w-56 mt-6">
                  <p class="md:text-s md:w-40 lg:-ml-3">Social Media Links</p>
                </div>
                <div></div>
                <div class="lg:flex mt-4 -ml-3">
                  <input v-model="socialMediaLinks.facebook" type="text" placeholder="Facebook "
                    class="w-56 h-10 bg-transparent outline-none pl-2 border-2 border-[#60b5e6] rounded-md mb-4 mr-6" />
                  <input v-model="socialMediaLinks.Instagram" type="text" placeholder="Instagram "
                    class="w-56 h-10 bg-transparent outline-none pl-2 border-2 border-[#60b5e6] rounded-md mb-4 mr-6" />
                  <input v-model="socialMediaLinks.LinkedIn" type="text" placeholder="LinkedIn"
                    class="w-56 h-10 bg-transparent outline-none pl-2 border-2 border-[#60b5e6] rounded-md mb-4" />
                </div>
              </div>
            </div>
            <div class="mt-10 lg:ml-20 -ml-40 md:-ml-10">
              <button @click="registerCompany"
                class="bg-[#2178AC] mb-32 hover: ml-40 py-3 cursor-pointer transition-all duration-300 hover:scale-105 px-26 md:px-32 lg:px-40 -mt-80 md:ml-20 rounded-md text-white text-md">
                {{ this.changeNaxt }}
              </button>
            </div>
          </div>
  
</template>

<script>
export default {
  props: {
    companies: Object,
    
    errors: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    },
    socialMediaLinks: {
      type: Object,
      required: true,
    },
    changeNaxt: {
      type: String,
      default: 'Next', 
    },
    isUploading: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

