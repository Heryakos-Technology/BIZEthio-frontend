import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios"; // Import Axios

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: null,
      errors: {}, // Store errors if any
    };
  },

  actions: {
    /********************* Get Authenticated User ********************** */
    async getUser() {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const response = await axios.get(
          `https://bizethio-backend-production.up.railway.app/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        this.user = response.data;
        // console.log("User Information:", this.user);
      } catch (error) {
        console.error("Error fetching user information:", error);
        this.errors = error.response?.data || { message: "Failed to fetch user" };
      }
    },
  },
});