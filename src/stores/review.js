import { defineStore } from "pinia";
import router from "@/router";

export const useReviewStore = defineStore("reviewStore", {
  state: () => {
    return {
      errors: {},
    };
  },

  actions: {
    async getAllReviews() {
      const res = await fetch("https://bizethio-backend-production-d484.up.railway.app/api/reviews", {
        method: "Get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        return data;
      }
    },

    async getReview(companyId) {
      const localStorageKey = `reviews_company_${companyId}`;
      if (localStorage.getItem(localStorageKey)) {
        return JSON.parse(localStorage.getItem(localStorageKey));
      }

      const res = await fetch(`https://bizethio-backend-production-d484.up.railway.app/api/reviews/company/${companyId}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        return data;
      }
    },

    async createReview(reviewData) {
      const res = await fetch("https://bizethio-backend-production-d484.up.railway.app/api/reviews", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        return data;
      }
    },

    async updateReview(reviewId, reviewData) {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        return data;
      }
    },

    async deleteReview(reviewId) {
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        return data;
      }
    },
  },
});