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
      const res = await fetch("/api/categories", {
        method: "Get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });
      const data = await res.json();
      // console.log(data);
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        return data
      }
    },

    async createCategory(formData) {

      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },
        body: formData,
      });
      const data = await res.json();
      // console.log(data)

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};

      }
    },

    async deleteCategory(categoryId) {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });
      const data = res.status !== 204 ? await res.json() : {};
      // console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;

      }
    },



  },
});
