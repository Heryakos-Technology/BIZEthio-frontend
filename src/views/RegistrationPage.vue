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
      <input v-model="owner_name" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Company name</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="name" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-7 mt-4">
      <div class="flex">
        <p class="">Description</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="description" type="textArea"
        class="w-80 h-32 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">passowrd</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="password" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Contact Phone</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="contact_phone" type="number"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <label class="">category</label><br>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>

      <select name="category" v-model="category_id"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
        <option v-for="categories in category" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Email</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="contact_email" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Website</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">License URL</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="license_url" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Operating Hours</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="operating_hours" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4 mt-4 w-11/12 mx-auto">
            <div class="flex">
              <label for="country">Country</label>
              <p class="text-red-600 text-2xl font-medium ml-2">*</p>
            </div>

            <select name="country" v-model="selectedCountry"
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
      <input v-model="address" type="text"
        class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">Region</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="region" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">City</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="city" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

    <div class="px-4  mt-4 w-11/12 mx-auto">
      <div class="flex">
        <p class="">image</p>
        <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
      </div>
      <input v-model="images" type="text" class="w-80 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
    </div>

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

        <img src="/footerimgbig-registration.png" alt="" class="ml-40  mt-34">

      </div>
      <div class="ml-20 w-2/3">
        <p class="text-center text-3xl font-bold mt-4">Welcome to <span class="text-[#2178AC]">BIZEthio</span></p>

        <div class="flex w-full">
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Owner name</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="owner_name" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Company name</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="name" type="text"
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
            <textarea name="description" id="" cols="30" rows="6"
              class="border-2 border-[#60b5e6] rounded-md w-11/12"></textarea>
          </div>

          <div class="container">
            <div class="px-4  mt-8  mx-auto">
              <div class="flex">
                <p class="">Contact Phone</p>
                <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
              </div>
              <input v-model="contact_phone" type="number"
                class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
            </div>

            <div class="px-4  mt-4  mx-auto">
              <div class="flex">
                <label class="">category</label><br>
                <p class=" text-red-600 text-2xl font-medium ml-1">*</p>
              </div>

              <select name="category" v-model="category_id"
                class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
                <option v-for="categories in category" :key="category.id" :value="category.id">{{ category.name }}
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
            <input v-model="contact_email" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">passowrd</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="password" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <div class="flex">

          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">License URL</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="license_url" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Operating Hours</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="operating_hours" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <div class="flex">

          <div class="px-4 mt-4 w-11/12 mx-auto">
            <div class="flex">
              <label for="country">Country</label>
              <p class="text-red-600 text-2xl font-medium ml-2">*</p>
            </div>

            <select name="country" v-model="selectedCountry"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
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
            <input v-model="address" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <div class="flex">

          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Region</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="region" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">City</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="city" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>
        <div class="flex">
          <div class="px-4  mt-4 w-11/12 mx-auto">
            <div class="flex">
              <p class="">image</p>
              <p class=" text-red-600 text-2xl font-medium ml-2">*</p>
            </div>
            <input v-model="images" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

          <div class="px-4  mt-6 w-11/12 mx-auto">
            <div class="flex">
              <p class="">Website</p>
            </div>
            <input v-model="website" type="text"
              class="w-11/12 mx-auto h-10 bg-transparent border-2 border-[#60b5e6] rounded-md">
          </div>

        </div>


        <!-- <div class="px-7 mt-4">
          <div class="flex">
            <p class="">Social Media Links</p>
          </div>
          <input v-model="social_media_links" placeholder="facebook" type="text"
            class=" pl-5 w-56 h-10 bg-transparent border-2 border-[#60b5e6] rounded-md mb-4 mr-6">
          <input type="text" placeholder="LinkedIn"
            class="w-56 h-10 bg-transparent border-2 pl-5 border-[#60b5e6] rounded-md mb-4 mr-6">
          <input type="text" placeholder="linkedin"
            class="w-56 h-10 bg-transparent border-2 pl-5 border-[#60b5e6] rounded-md mb-4">
        </div>
        <button class="bg-[#2178AC] mb-8 ml-8 py-2 px-2 rounded-md text-white text-sm">add social media link </button> -->

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
      @click="createCompany"
      class="bg-[#2178AC] mb-8 ml-8 py-2 px-2 rounded-md text-white text-sm"
    >
      Create Company
    </button>
  </div>


        <div class=" mt-6 ml-20">
          <button class="bg-[#2178AC] mb-32 ml-40 py-3 px-40 -mt-80 rounded-md text-white text-md">Register
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
      },
      socialMediaLinks: {
        facebook: '',
        Instagram: '',
        LinkedIn: '',
      }
    }
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        this.countries = response.data;
      } catch (error) {
        this.error = 'Failed to fetch countries.';
        console.error(error);
      }
    },
  
    async createCompany() {
      this.companies.social_media_links = JSON.stringify(this.socialMediaLinks);

      const formData = new FormData();
      formData.append('name', this.companies.name);
      formData.append('owner_name', this.companies.owner_name);
      formData.append('description', this.companies.description);
      formData.append('password', this.companies.password);
      formData.append('operating_hours', this.companies.operating_hours);
      formData.append('category_id', this.companies.category_id);
      formData.append('address', this.companies.address);
      formData.append('city', this.companies.city);
      formData.append('region', this.companies.region);
      formData.append('country', this.companies.country);
      formData.append('contact_phone', this.companies.contact_phone);
      formData.append('contact_email', this.companies.contact_email);
      formData.append('website', this.companies.website);
      formData.append('social_media_links', this.companies.social_media_links);
      formData.append('status', this.companies.status);
      formData.append('rating_avg', this.companies.rating_avg);

      try {
        const response = await axios.post('https://bizethio-backend-production.up.railway.app/api/companies', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Company created successfully', response.data);

        this.resetForm();
      } catch (error) {
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred. Please try again.';
        console.error('Error creating company:', this.errorMessage);
      }
    },

    resetForm() {
      this.companies.name = '';
      this.companies.owner_name = '';
      this.companies.description = '';
      this.companies.password = '';
      this.companies.operating_hours = '';
      this.companies.category_id = '';
      this.companies.address = '';
      this.companies.city = '';
      this.companies.region = '';
      this.companies.country = '';
      this.companies.contact_phone = '';
      this.companies.contact_email = '';
      this.companies.website = '';
      this.companies.social_media_links = '';
      this.companies.status = '';
      this.companies.rating_avg = '';
      this.socialMediaLinks.facebook = '';
      this.socialMediaLinks.Instagram = '';
      this.socialMediaLinks.LinkedIn = '';
    }
  }
}
</script>
