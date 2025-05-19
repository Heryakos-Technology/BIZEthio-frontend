<script setup>
import { ref, watch } from "vue";
import { useReviewStore } from "@/stores/review";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { storeToRefs } from "pinia";

const $toast = useToast();

const emit = defineEmits(["fetchCompanyReviews"]);

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
  fetchCompanyReviews: {
    type: Function,
    required: false,
  },
});

const { createReview } = useReviewStore();
const { errors } = storeToRefs(useReviewStore());

const userId = ref(localStorage.getItem("user_id"));
const rating = ref(0);
const comment = ref("");
const isSubmitting = ref(false);

const setRating = (selectedRating) => {
  rating.value = selectedRating;
};

const submitReview = async () => {
  if (!rating.value) {
    $toast.error("Please select a rating.", {
      position: "top",
    });
    return;
  }

  const reviewData = {
    user_id: userId.value,
    company_id: props.company.id,
    rating: rating.value,
    comment: comment.value,
    sentiment_score: 80,
    is_spam: false,
  };

  isSubmitting.value = true;

  try {
    const response = await createReview(reviewData);

    if (response && response.error) {
      // Check for specific error messages
      if (response.message.includes("The user id field is required.")) {
        $toast.error("You have to login first.", {
          position: "top",
        });
      } else if (response.message.includes("The comment field is required.")) {
        $toast.error("Comment is Required", {
          position: "top",
        });
      } else {
        // Generic error message
        console.error("Error submitting review:", response.message);
        $toast.error("Error submitting review:", {
          position: "top",
        });
      }
    } else {
      $toast.success("Review submitted successfully!", {
        position: "top",
      });

      rating.value = 0;
      comment.value = "";
      emit("fetchCompanyReviews");

      // Call the fetch function to refresh reviews
      if (props.fetchCompanyReviews) {
        await props.fetchCompanyReviews();
      }
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    $toast.error("Failed to submit review. Please try again.", {
      position: "top",
    });
  } finally {
    isSubmitting.value = false;
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
        position: "top",
      });
    }
  }
);
</script>

<template>
  <!-- Rate The Company Block -->
  <div
    v-if="userId"
    class="mt-6 p-6 bg-white rounded-lg shadow-sm max-w-[420px]"
  >
    <h3 class="text-lg font-bold text-darkBlue mb-2">Rate The Company!</h3>
    <p class="text-sm text-gray-600 mb-4">
      Help us improve our service to best suit your needs by rating us here!
    </p>
    <div class="flex items-center justify-between space-x-2 mb-4">
      <span
        v-for="n in 5"
        :key="n"
        class="cursor-pointer"
        @click="setRating(n)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-10"
          viewBox="0 0 256 256"
          :class="{
            'text-yellow-500': n <= rating,
            'fill-yellow-500': n <= rating,
          }"
        >
          <path
            d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"
          ></path>
        </svg>
      </span>
    </div>
    <div class="mb-4">
      <label class="block text-sm text-gray-600 mb-2"
        >Can you tell us more?</label
      >
      <textarea
        class="w-full p-2 border rounded-md"
        rows="2"
        placeholder="Add feedback"
        v-model="comment"
      ></textarea>
    </div>
    <div class="flex justify-end space-x-2">
      <button
        class="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
        :disabled="isSubmitting"
      >
        Cancel
      </button>
      <button
        class="px-4 py-2 cursor-pointer text-white bg-lightBlue rounded-md hover:bg-blue-700"
        @click="submitReview"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">Submitting...</span>
        <span v-else>Submit</span>
      </button>
    </div>
  </div>
</template>
