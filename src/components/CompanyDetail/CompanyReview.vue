<script setup>
import { ref, watch } from "vue";
import { useReviewStore } from "@/stores/review";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { storeToRefs } from "pinia";

const $toast = useToast();

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});

const reviewStore = useReviewStore();
const { errors } = storeToRefs(useReviewStore());

const userId = ref(localStorage.getItem("user_id"));
const rating = ref(0);
const comment = ref("");
const isSubmitting = ref(false); // Add a ref to track submission state

const setRating = (selectedRating) => {
  rating.value = selectedRating;
};

const submitReview = async () => {
  if (!rating.value) {
    $toast.error("Please select a rating.", {
      position: 'top'
    });
    return;
  }

  const reviewData = {
    user_id: 7,
    company_id: props.company.id,
    rating: rating.value,
    comment: comment.value,
    sentiment_score: 80,
    is_spam: false,
  };

  isSubmitting.value = true;  

  try {
    const response = await reviewStore.createReview(reviewData);

    console.log(response.message)

    if (response && response.error) {
      // Check for specific error messages
      if (response.message.includes("The user id field is required.")) {
        $toast.error("You have to login first.", {
          position: 'top'
        });
      }
       else if (response.message.includes("The comment field is required.")) {
        $toast.error("Comment is Required", {
          position: 'top'
        });
      }
      else {
        // Generic error message
        console.error("Error submitting review:", response.message);
        $toast.error(response.message, {
          position: 'top'
        });
      }
    } else {
      $toast.success("Review submitted successfully!", {
        position: 'top'
      });

      rating.value = 0;
      comment.value = "";
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    $toast.error("Failed to submit review. Please try again.", {
      position: 'top'
    });
  } finally {
    isSubmitting.value = false; // Reset submitting state
  }
};

watch(
  () => errors.value,
  (newErrors) => {
    if (newErrors && Object.keys(newErrors).length > 0) {
      // Display the first error message
      const firstErrorKey = Object.keys(newErrors)[0];
      const firstErrorMessage = newErrors[firstErrorKey][0]; // Assuming each error key has an array of messages
      $toast.error(firstErrorMessage, {
        position: 'top'
      });
    }
  }
);

const reviews = ref([
  {
    userName: "Abebe T.",
    verified: true,
    rating: 4,
    comment:
      "I stayed at Horizon Hotel for a business trip, and it was fantastic! The rooms are clean and spacious, and the staff were incredibly friendly. The restaurant’s injera and tibs were delicious, and I loved the coffee at the cafe. Highly recommend!",
    date: "Nov 12, 2024",
  },
  {
    userName: "Sarah M.",
    verified: true,
    rating: 3,
    comment:
      "The location is great, right in Mexico Square, but the Wi-Fi was a bit slow in the rooms. The food at the restaurant was amazing, though—especially the breakfast buffet.",
    date: "Feb 12, 2025",
  },
  {
    userName: "Tewodros K.",
    verified: true,
    rating: 5,
    comment:
      "Horizon Hotel exceeded my expectations! The view from my room was breathtaking, and the staff went above and beyond to make my stay comfortable. The cafe’s Ethiopian coffee is the best I’ve ever had. I’ll definitely be back!",
    date: "Mar 15, 2025",
  },
  {
    userName: "Lydia B.",
    verified: true,
    rating: 2,
    comment:
      "The hotel has a great location, but I was disappointed with the service. The check-in process was slow, and my room wasn’t ready on time. The food was good, but I expected better overall for the price.",
    date: "Jan 20, 2025",
  },
]);

const ratingDistribution = ref([
  { stars: 5, count: 50 },
  { stars: 4, count: 20 },
  { stars: 3, count: 10 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
]);
</script>

<template>
  <!-- Rate The Company Block -->
  <div class="mt-6 p-6 bg-white rounded-lg shadow-sm max-w-[420px]">
    <h3 class="text-lg font-bold text-darkBlue mb-2">Rate The Company!</h3>
    <p class="text-sm text-gray-600 mb-4">
      Help us improve our service to best suit your needs by rating us here!
    </p>
    <div class="flex items-center justify-between space-x-2 mb-4">
      <span v-for="n in 5" :key="n" class="cursor-pointer" @click="setRating(n)">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-10 " viewBox="0 0 256 256"
          :class="{ 'text-yellow-500': n <= rating, 'fill-yellow-500': n <= rating }">
          <path
            d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z">
          </path>
        </svg>
      </span>
    </div>
    <div class="mb-4">
      <label class="block text-sm text-gray-600 mb-2">Can you tell us more?</label>
      <textarea class="w-full p-2 border rounded-md" rows="2" placeholder="Add feedback" v-model="comment"></textarea>
    </div>
    <div class="flex justify-end space-x-2">
      <button class="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100" :disabled="isSubmitting">
        Cancel
      </button>
      <button class="px-4 py-2 cursor-pointer text-white bg-lightBlue rounded-md hover:bg-blue-700" @click="submitReview"
        :disabled="isSubmitting">
        <span v-if="isSubmitting">Submitting...</span>
        <span v-else>Submit</span>
      </button>
    </div>
  </div>

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
  <!-- Rating Distribution -->
  <div class="space-y-2">
    <div v-for="rating in ratingDistribution" :key="rating.stars" class="flex items-center space-x-2 max-w-[540px]">
      <span class="text-sm text-gray-600">{{ rating.stars }} Star{{ rating.stars > 1 ? "s" : "" }}</span>
      <div class="flex-1 h-2 bg-gray-200 rounded">
        <div :style="{
          width: `${(rating.count /
            Math.max(...ratingDistribution.map((r) => r.count))) *
            100
            }%`,
        }" class="h-2 bg-yellow-400 rounded"></div>
      </div>
      <span class="text-sm text-gray-600">{{ rating.count }}</span>
    </div>
  </div>
</template>