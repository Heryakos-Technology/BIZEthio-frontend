import { defineStore } from "pinia";
import router from "@/router";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => {
    return {
      errors: {},
    };
  },

  actions: {
    async getAllCategories() {
      if (localStorage.getItem("all_categories")) {
        return JSON.parse(localStorage.getItem("all_categories"));
      }
      const res = await fetch("https://bizethio-backend-production-944c.up.railway.app/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        localStorage.setItem("all_categories", JSON.stringify(data));
        return data;
      }
    },
    async getMostPopularCategories() {
      if (localStorage.getItem("popular_categories")) {
        return JSON.parse(localStorage.getItem("popular_categories"));
      }
      const res = await fetch("https://bizethio-backend-production-944c.up.railway.app/api/categories/popular", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        localStorage.setItem("popular_categories", JSON.stringify(data));
        return data;
      }
    },


    async getLeastPopularCategories() {
      if (localStorage.getItem("least_categories")) {
        return JSON.parse(localStorage.getItem("least_categories"));
      }
      const res = await fetch("https://bizethio-backend-production-944c.up.railway.app/api/categories/least-popular", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        localStorage.setItem("least_categories", JSON.stringify(data));
        return data;
      }
    },

    async createCategory(formData) {
      localStorage.removeItem("all_categories");
      const res = await fetch("https://bizethio-backend-production-944c.up.railway.app/api/categories", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      console.log(formData);
      console.log(data);
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
      }
    },

    async deleteCategory(categoryId) {
      localStorage.removeItem("all_categories");
      const res = await fetch(`https://bizethio-backend-production-944c.up.railway.app/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.status !== 204 ? await res.json() : {};
      if (data.errors) {
        w
        this.errors = data.errors;
      } else {
        return data;
      }
    },

    async updateCategory(formData, categoryId) {
      localStorage.removeItem("all_categories");
      const res = await fetch(`https://bizethio-backend-production-944c.up.railway.app/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        return data;
      }
    },
  },
});