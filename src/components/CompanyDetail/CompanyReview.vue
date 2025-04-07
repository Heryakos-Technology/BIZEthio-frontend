<script setup>
import { onMounted, ref, watch } from "vue";
import { useReviewStore } from "@/stores/review";
import "vue-toast-notification/dist/theme-sugar.css";
import { storeToRefs } from "pinia";
import CompanyRatingBlock from "./CompanyRatingBlock.vue"; // Import the new component

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});

const { getReview } = useReviewStore();

const reviews = ref([]);

onMounted(async () => {
  reviews.value = await getReview(props.co);

  console.log("reviews", reviews.value);
});

const ratingDistribution = ref([
  { stars: 5, count: 50 },
  { stars: 4, count: 20 },
  { stars: 3, count: 10 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${day}, ${year}`;
};
</script>

<template>
  <h2 class="text-2xl font-bold text-darkBlue">
    Reviews And Ratings ({{ company?.rating_avg }})
  </h2>

  <div v-if="reviews.length === 0" class="font-bold text-primaryColor text-xl">
      No ratings found. Be the first to comment!
    </div>

  <!-- Rating Distribution -->
  <div v-else class="space-y-2">
    <div
      v-for="rating in ratingDistribution"
      :key="rating.stars"
      class="flex items-center space-x-2 max-w-[540px]"
    >
      <span class="text-sm text-gray-600"
        >{{ rating.stars }} Star{{ rating.stars > 1 ? "s" : "" }}</span
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
 

  <!-- Review List -->
  <div class="space-y-6 grid lg:grid-cols-2 gap-x-10 mt-8">
   
    <div
    
      v-for="review in reviews"
      :key="review.id"
      class="py-4 px-2 space-y-8 rounded-md bg-white max-w-[410px] lg:max-w-[480px] h-[175px]"
    >
      <div class="flex justify-between">
        <div class="space-y-2">
          <span class="text-sm font-medium text-gray-800">{{
            review.user.name
          }}</span>
          <p v-if="review.verified" class="text-xs text-green-600">
            Verified User
          </p>
        </div>
        <div class="flex items-center space-x-2 mt-1">
          <span class="text-yellow-500">
            <span v-for="n in 5" :key="n" class="inline-block">
              <svg
                v-if="n <= review.rating"
                class="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
              <svg
                v-else
                class="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 15.4l-4.6 2.4 1-4.9-3.8-3.3 5-1L12 4l1.4 4.6 5 1-3.8 3.3 1 4.9z"
                />
              </svg>
            </span>
          </span>
          <span class="text-sm text-gray-600">({{ review.rating }}/5)</span>
        </div>
      </div>
      <p class="text-sm text-gray-600 mt-2">{{ review.comment }}</p>
      <div class="flex items-center justify-end mt-2">
        <span class="text-sm text-gray-600">{{
          formatDate(review.updated_at)
        }}</span>
      </div>
    </div>
  </div>

</div>
  <CompanyRatingBlock :company="props.company" />
</template>
