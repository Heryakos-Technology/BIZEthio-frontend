<template>
  <div class="border-b-1 border-b-gray-600 py-2">
    <img src="/BIZEthio-logo.png" alt="" class="w-26 pt-1 ml-4">
  </div>
  <div class="block md:hidden">
    <p class="text-center text-2xl mt-4">Welcome to <span class="text-[#2178AC]">BIZEthio</span></p>
    <p class="text-sm font-medium px-10 text-center mt-2">Connect, Discover, and Grow with AI-Powered Local Business
      Listings!</p>
  </div>
  <!-- mobile view -->
  <div class="block md:hidden">
    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Owner name</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.owner_name" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Company name</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.name" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-7 mt-4">
      <div class="flex">
        <p class="">Description</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.description" type="textArea"
        class="w-80 h-32 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">passowrd</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.password" type="password"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Contact Phone</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.contact_phone" type="number"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <label class="">category</label><br>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>

      <select name="category" v-model="companies.category_id"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Email</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.contact_email" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Website</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.website" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">License URL</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.license_url" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Operating Hours</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.operating_hours" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4 mt-4 w-11/12 mx-auto">
            <div class="flex">
              <label for="country">Country</label>
              <p class="text-red-600 text-2xl font-medium ml-2">*</p>
            </div>

            <select name="country" v-model="companies.country"
            class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
              <option v-for="country in countries" :key="country.alpha2Code" :value="country.name">
                {{ country.name }}
              </option>
            </select>

            <p v-if="selectedCountry" class="mt-2">You selected: {{ selectedCountry }}</p>
            <p v-if="error" class="text-red-600">{{ error }}</p>
          </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Address</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.address" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Region</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.region" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">City</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="companies.city" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>
<!-- image -->
    <div class="px-4 mt-4 w-11/12 mx-auto">
    <div class="flex">
      <p>Image</p>
      <p class="text-red-600 text-2xl font-medium ml-2">*</p>
    </div>
    <input
      v-model="companies.images"
      type="text"
      class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md"
      placeholder="Upload an image"
      readonly
    />
    <input type="file" @change="handleFileUpload" class="mt-2" />
    <button @click="uploadImage" class="mt-2 bg-[#60b5e6] text-white rounded-md px-4 py-2">
      Upload
    </button>
    <div v-if="imageUrl" class="mt-4">
      <h3>Uploaded Image:</h3>
      <img :src="imageUrl" alt="Uploaded Image" class="mt-2 w-80 h-auto rounded-md" />
    </div>
  </div>

<!-- end of image -->

    <div class="px-7 mt-4">
      <div class="flex">
        <p class="">Social Media Links</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4">
      <input type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4">
      <input type="text" class="w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4">
    </div>
    <button class="bg-[#2178AC] mb-8 ml-8 py-2 px-2 rounded-md text-white text-sm">add social media link </button>
    <div class="">
      <img src="/footer-image.png" alt="" class="-ml-26 -mt-16">
      <div class="-mt-40 -ml-8">
        <button class="bg-[#2178AC] mb-32 ml-40 py-3 px-10 -mt-80 rounded-md text-white text-md">Register
          Company</button>
      </div>
    </div>
  </div>
  <!-- /end of mobile view -->

  <!-- desktop -->

  <div class="hidden md:block px-4">
    <div class="flex">
      <div class=" bg-gradient-to-r from-[#0087e1] to-[#2178AC] w-1/3 -ml-4">
        <p class="text-2xl font-medium text-white mt-16 w-11/12 px-10 text-center">Connect, Discover, and Grow with
          AI-Powered Local Business Listings!</p>
        <div style="height: 300px"
          class=" ml-10 mt-6 rounded-3xl w-56 bg-gradient-to-b from-[#e8fffe] to-[#00D2EA] shadow-sm">
          <i class="fa-solid fa-robot text-4xl mt-16 text-[#2178AC] ml-4"></i>
          <p class="font-semibold text-lg ml-6 mt-4">AI-Powered Experience</p>
          <p class="font-medium text-sm mt-2 mb-2 text-center">Smarter Searches, Better Results</p>
          <p class="text-xs mt-4 w-48 text-center mx-auto">Our AI-driven platform helps you discover the best businesses
            with personalized recommendations.</p>
        </div>

        <div class="h-48 mb-20  mt-10 ml-4 shadow-sm rounded-4xl w-11/12 bg-gradient-to-l from-[#FFFFFF] to-[#00D2EA]">
          <div class=" flex">
            <div class="ml-10 mt-16">
              <div class="w-16 h-1 ml-6 bg-[#1b6489] rounded-full mb-3"></div>
              <div class="w-24 h-1 -ml-4 bg-gray-300 rounded-full mb-3"></div>
              <div class="w-24 -ml-4 h-1 bg-gray-300 rounded-full mb-3"></div>
              <div class="w-24 ml-2 h-1 bg-[#1b6489] rounded-full mb-3"></div>
              <div class="w-24  h-1 bg-gray-300 rounded-full mb-3"></div>
            </div>
            <div class="ml-4">
              <i class="fa-solid fa-key text-4xl ml-20 mt-6 text-[#2178AC]"></i>
              <p class="text-sm font-bold text-center mt-4">Your Security, Our Priority</p>
              <p class="text-xs ml-12 mt-4">We protect your data with advanced encryption, ensuring privacy </p>
            </div>
          </div>
        </div>

        <img src="/Bottom Desogn Card.png" alt="" class="  mt-36">

      </div>
      <div class="ml-20 w-2/3">
        <p class="text-center text-3xl font-bold mt-4">Welcome to <span class="text-[#2178AC]">BIZEthio</span></p>

        <div class="flex w-full">
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Owner name</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.owner_name" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Company name</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.name" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <div class="flex ">
          <div class="px-7 mt-4 w-full -ml-2">
            <div class="flex">
              <p class="">Description</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <!-- <input v-model="description" type="textArea" class="w-11/12 h-32 bg-transparent border-2 border-[#60b5e6] rounded-md"> -->
            <textarea v-model="companies.description" name="description" id="" cols="30" rows="6"
              class="border-2 border-[#60b5e6] rounded-md w-11/12"></textarea>
          </div>

          <div class="container">
            <div class="px-4  mt-8  mx-auto">
              <div class="flex">
                <p class="">Contact Phone</p>
                <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="companies.contact_phone" type="number"
                class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
            </div>

            <div class="px-4  mt-4  mx-auto">
              <div class="flex">
                <label class="">category</label><br>
                <p class=" text-red-600 text-2xl font-medium ml-1">*</p>
              </div>

              <select name="category" v-model="companies.category_id"
                class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
                <option v-for="category in categories " :key="category.id" :value="category.id">{{ category.name }}
                </option>
              </select>
            </div>

          </div>
        </div>
        <div class="flex">
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Email</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.contact_email" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">passowrd</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.password" type="password"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <div class="flex">


<div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class=""> confirm passowrd</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.password_confirmation" type="password"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Operating Hours</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.operating_hours" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <div class="flex">

          <div>
        <label  class="font-serif text-md">Country</label><br>
        <select name="country" v-model="companies.country" class="border-2 w-80 border-gray-200 mb-3 focus:outline-none h-8 rounded-md mr-10">
          <option value="">Select country</option>
          <option v-for="country in countries" :key="country.id" :value="country.name"  class="border-2  bg-gray-100 rounded-lg mt-2">
            {{ country.name }}
          </option>
        </select>
      </div>

          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Address</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.address" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <div class="flex">

          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Region</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.region" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">City</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.city" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <!-- image -->
        <div class="flex">

<div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">License URL</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="companies.license_url" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>
    <div class="px-4 mt-6 w-11/12 mx-auto">
      <div class="flex">
        <p>Website</p>
      </div>
      <input
        v-model="companies.website"
        type="text"
        class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md"
        placeholder="Enter website URL"
      />
    </div>
  </div>

  <div class="px-4 mt-4 w-88">
      <div class="flex">
        <p>Image</p>

      </div>
      <input
        v-model="companies.images"
        type="text"
        class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md"
        placeholder="Upload an image"
        readonly
      />
      <input type="file" @change="handleFileUpload" class="mt-2" />
      <button @click="uploadImage" class="mt-2 bg-[#60b5e6] text-white rounded-md px-4 py-2">
        Upload
      </button>
      <div v-if="imageUrl" class="mt-4">
        <h3>Uploaded Image:</h3>
        <img :src="imageUrl" alt="Uploaded Image" class="mt-2 w-full h-auto rounded-md" />
      </div>
    </div>
  <!-- end of image -->

        <div class="px-7 mt-4">
    <div class="flex">
      <div><p>Social Media Links</p></div>
      <div>
      </div>
      <div class="flex mt-8 -ml-20">
        <input
          v-model="socialMediaLinks.facebook"
          type="text"
          placeholder="Facebook "
          class="w-56 h-10 bg-transparent pl-20 border-2 border-[#60b5e6] rounded-md mb-4 mr-6"
        />
        <input
          v-model="socialMediaLinks.Instagram"
          type="text"
          placeholder="Instagram "
          class="w-56 h-10 bg-transparent pl-20 border-2 border-[#60b5e6] rounded-md mb-4 mr-6"
        />
        <input
          v-model="socialMediaLinks.LinkedIn"
          type="text"
          placeholder="LinkedIn"
          class="w-56 h-10 bg-transparent pl-20 border-2 border-[#60b5e6] rounded-md mb-4"
        />
      </div>
        
      </div>
    <button
      
      class="bg-[#2178AC] mb-8 ml-8 py-2 px-2 rounded-md text-white text-sm"
    >
      Create Company
    </button>
  </div>


        <div class=" mt-6 ml-20">
          <button @click="createCompany" class="bg-[#2178AC] mb-32 ml-40 py-3 px-40 -mt-80 rounded-md text-white text-md">Register
            Company</button>

        </div>

      </div>
    </div>
    <!-- /end of desktop -->
  </div>


</template>
<script>
import axios from 'axios';

export default {
  created() {
   
   
  },
  mounted(){
    this.fetchCategories();
    this.fetchCountries();
  },
  data() {
    return {
      selectedCountry: null,
      countries: [],
      error: null,
      categories: [],
      companies: {
        name: '',
        owner_name: '',
        description: '',
        password: '',
        password_confirmation: '',
        operating_hours: '',
        category_id: '',
        address: '',
        city: '',
        region: '',
        country: '',
        contact_phone: '',
        contact_email: '',
        website: '',
        social_media_links: '',
        status: '',
        rating_avg: '',
        images: {}, 
      },
      socialMediaLinks: {
        facebook: '',
        Instagram: '',
        LinkedIn: '',
      },
      images: '',
      file: null,
      imageUrl: null,
      cloudName: 'dwh8v2zhg',  
      apiKey: '934859592498419', 
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.images = this.file.name; 
      }
    },async uploadImage() {
  if (!this.file) return;

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
  const formData = new FormData();
  formData.append('file', this.file);
  formData.append('upload_preset', 'my_unsigned_preset'); 


  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.secure_url) {
      this.imageUrl = data.secure_url; 
      this.companies.images = this.imageUrl; 
    } else {
      console.error('Upload failed:', data);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
},
    
    async fetchCategories() {
  try {
    const response = await axios.get('https://bizethio-backend-production.up.railway.app/api/categories');
    this.categories = response.data; 
    console.log('categoriessss', this.categories);
  } catch (error) {
    this.error = 'Failed to fetch categories.';
    console.error(error);
  }
},
    async fetchCountries() {
      try { 
        const response = await axios.get('https://restcountries.com/v2/all');
        this.countries = response.data;
        console.log('countryyyy',this.countries);
      } catch (error) {
        this.error = 'Failed to fetch countries.';
        console.error(error);
      }
    },async createCompany() {
  this.companies.social_media_links = JSON.stringify(this.socialMediaLinks);
  

  if (this.imageUrl) {
    this.companies.images = JSON.stringify([this.imageUrl]); 
  } else {
    this.companies.images = JSON.stringify([]); 
  }

  const formData = new FormData();
  Object.entries(this.companies).forEach(([key, value]) => {
    formData.append(key, value);
  });

 
  formData.append('status', 'pending');
  formData.append('rating_avg', 5);

  try {
    const response = await axios.post('https://bizethio-backend-production.up.railway.app/api/companies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Company created successfully', response.data);
    this.resetForm();
  } catch (error) {
    this.errorMessage = error.response ? error.response.data.message : 'An error occurred. Please try again.';
    console.error('Error creating company:', this.errorMessage);
  }
},
    resetForm() {
      this.companies = {
        name: '',
        owner_name: '',
        description: '',
        password: '',
        operating_hours: '',
        category_id: '',
        address: '',
        city: '',
        region: '',
        country: '',
        contact_phone: '',
        contact_email: '',
        website: '',
        social_media_links: '',
        status: '',
        rating_avg: '',
        images: '',
      };
      this.socialMediaLinks = {
        facebook: '',
        Instagram: '',
        LinkedIn: '',
      };
      this.images = '';
      this.file = null;
      this.imageUrl = null;
    },
  },
};
</script>

<style scoped>

</style>