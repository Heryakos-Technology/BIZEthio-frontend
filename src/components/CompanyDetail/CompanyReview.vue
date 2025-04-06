<script setup>
import { onMounted, ref, watch } from "vue";
import { useReviewStore } from "@/stores/review";
import 'vue-toast-notification/dist/theme-sugar.css';
import { storeToRefs } from "pinia";
import CompanyRatingBlock from './CompanyRatingBlock.vue'; // Import the new component
 
const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});

const {getACompanyReviews} = useReviewStore();

const reviews =ref([]);

onMounted( async()=>{
  
  reviews.value = await getACompanyReviews(props.company.id);

  console.log(reviews.value);
})


// const reviews = ref([
//   {
//     userName: "Abebe T.",
//     verified: true,
//     rating: 4,
//     comment:
//       "I stayed at Horizon Hotel for a business trip, and it was fantastic! The rooms are clean and spacious, and the staff were incredibly friendly. The restaurant’s injera and tibs were delicious, and I loved the coffee at the cafe. Highly recommend!",
//     date: "Nov 12, 2024",
//   },
//   {
//     userName: "Sarah M.",
//     verified: true,
//     rating: 3,
//     comment:
//       "The location is great, right in Mexico Square, but the Wi-Fi was a bit slow in the rooms. The food at the restaurant was amazing, though—especially the breakfast buffet.",
//     date: "Feb 12, 2025",
//   },
//   {
//     userName: "Tewodros K.",
//     verified: true,
//     rating: 5,
//     comment:
//       "Horizon Hotel exceeded my expectations! The view from my room was breathtaking, and the staff went above and beyond to make my stay comfortable. The cafe’s Ethiopian coffee is the best I’ve ever had. I’ll definitely be back!",
//     date: "Mar 15, 2025",
//   },
//   {
//     userName: "Lydia B.",
//     verified: true,
//     rating: 2,
//     comment:
//       "The hotel has a great location, but I was disappointed with the service. The check-in process was slow, and my room wasn’t ready on time. The food was good, but I expected better overall for the price.",
//     date: "Jan 20, 2025",
//   },
// ]);

const ratingDistribution = ref([
  { stars: 5, count: 50 },
  { stars: 4, count: 20 },
  { stars: 3, count: 10 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
]);
</script>

<template>

    <h2 class="text-2xl font-bold text-darkBlue">
      Reviews And Ratings ({{company?.rating_avg}}/5) 
    </h2>

    <!-- Rating Distribution -->
    <!-- <div class="space-y-2">
      <div
        v-for="rating in ratingDistribution"
        :key="rating.stars"
        class="flex items-center space-x-2 max-w-[540px]"
      >
        <span class="text-sm text-gray-600"
          >{{ rating.stars }} Star{{
            rating.stars > 1 ? "s" : ""
          }}</span
        >
        <div class="flex-1 h-2 bg-gray-200 rounded">
          <div
            :style="{
              width: `${
                (rating.count /
                  Math.max(...ratingDistribution.map((r) => r.count))) *
                100
              }%`,
            }"
            class="h-2 bg-yellow-400 rounded"
          ></div>
        </div>
        <span class="text-sm text-gray-600">{{ rating.count }}</span>
      </div>
    </div> -->
  

  <!-- Review List -->
  <div class="space-y-6 grid lg:grid-cols-2 gap-x-10 mt-8">
    <div v-for="review in reviews" :key="review.userName"
      class="py-4 px-2 space-y-8 rounded-md bg-white max-w-[410px] lg:max-w-[480px] h-[275px]">
      <div class="flex justify-between">
        <div class="space-y-2">
          <span class="text-sm font-medium text-gray-800">{{
            review.userName
          }}</span>
          <p v-if="review.verified" class="text-xs text-green-600">
            Verified User
          </p>
        </div>
        <div class="flex items-center space-x-2 mt-1">
          <span class="text-yellow-500">
            <span v-for="n in 5" :key="n" class="inline-block">
              <svg v-if="n <= review.rating" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg v-else class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 15.4l-4.6 2.4 1-4.9-3.8-3.3 5-1L12 4l1.4 4.6 5 1-3.8 3.3 1 4.9z" />
              </svg>
            </span>
          </span>
          <span class="text-sm text-gray-600">({{ review.rating }}/5)</span>
        </div>
      </div>
      <p class="text-sm text-gray-600 mt-2">{{ review.comment }}</p>
      <div class="flex items-center justify-end mt-2">
        
        <span class="text-sm text-gray-600">{{ review.date }}</span>
      </div>
    </div>
  </div>
  <CompanyRatingBlock :company="props.company"   />
</template>