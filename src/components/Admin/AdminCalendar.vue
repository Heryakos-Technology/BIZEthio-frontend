<script setup>
import { ref, computed } from "vue";

// State for the current month and year
const currentDate = ref(new Date(2018, 7, 1)); // Start with August 2018 (month is 0-based in JS)
const selectedDate = ref(new Date(2018, 7, 10)); // Pre-select August 10th to match the image

// Days of the week
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Computed properties for calendar data
const monthName = computed(() =>
  currentDate.value.toLocaleString("default", { month: "long" })
);
const year = computed(() => currentDate.value.getFullYear());

// Get the first day of the month (to determine starting day of the week)
const firstDayOfMonth = computed(() =>
  new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1
  ).getDay()
);

// Get the number of days in the current month
const daysInMonth = computed(() =>
  new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    0
  ).getDate()
);

// Generate the calendar days (including empty slots for days before the 1st)
const calendarDays = computed(() => {
  const days = [];
  const totalDays = daysInMonth.value;
  const firstDay = firstDayOfMonth.value;

  // Add empty slots for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add the actual days of the month
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return days;
});

// Navigate to the previous month
const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
  selectedDate.value = null; // Reset selected date when changing months
};

// Navigate to the next month
const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
  selectedDate.value = null; // Reset selected date when changing months
};

// Select a date
const selectDate = (day) => {
  if (day) {
    selectedDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      day
    );
  }
};

// Confirm the selected date (you can modify this to emit the date or perform an action)
const confirmSelection = () => {
  if (selectedDate.value) {
    console.log("Selected Date:", selectedDate.value.toLocaleDateString());
    // You can emit the selected date or perform other actions here
  }
};
</script>

<template>
  <div
    class="w-[90%] mx-auto max-w-[350px] p-4 mb-8 lg:h-[350px] bg-white mt-16 rounded-lg shadow-md xl:max-w-[450px] xl:h-p"
  >
    <!-- Header with month, year, and navigation arrows -->
    <div class="flex justify-between items-center mb-3">
      <button class="text-gray-600 hover:text-black text-lg" @click="prevMonth">
        ←
      </button>
      <span class="text-base font-bold text-gray-800"
        >{{ monthName }} {{ year }}</span
      >
      <button class="text-gray-600 hover:text-black text-lg" @click="nextMonth">
        →
      </button>
    </div>

    <!-- Days of the week -->
    <div class="grid grid-cols-7 text-center mb-2">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="text-xs text-gray-600 font-bold"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar days -->
    <div class="grid grid-cols-7 gap-1 xl:gap-y-2 text-center">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="p-2 text-sm text-gray-800 cursor-pointer rounded-full transition-colors"
        :class="{
          'bg-transparent cursor-default': !day,
          'hover:bg-blue-100': day,
          'bg-[#241ee5] text-white font-bold':
            day &&
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear(),
        }"
        @click="selectDate(day)"
      >
        {{ day || "" }}
      </div>
    </div>

    <!-- Select button -->
    <button
      class="w-full mt-3 py-2 bg-[#241ee5] text-white rounded-sm text-sm font-medium cursor-pointer hover:bg-[#241ee5] transition-colors"
      @click="confirmSelection"
    >
      Select
    </button>
  </div>
</template>
