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
          `https://bizethio-backend-production-944c.up.railway.app/api/users/${userId}`,
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

    /********************* Logout User ********************** */
    async logout() {
      try {

        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_role");
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userWithToken");
        localStorage.removeItem("user information");

        // Clear user state
        this.user = null;

        // Navigate to sign in page
        router.push("/signin");

        return true;
      } catch (error) {
        console.error("Logout failed:", error);
        this.errors = error.response?.data || { message: "Failed to logout" };
        return false;
      }
    },
  },
});