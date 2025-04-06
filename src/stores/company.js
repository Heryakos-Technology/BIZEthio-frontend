import { defineStore } from "pinia";
import router from "@/router";

export const useCompanyStore = defineStore("companyStore", {
  state: () => {
    return {
      errors: {},
    };
  },

  actions: {



    async getAllCompanies() {
      const res = await fetch("/api/companies", {
        method: "Get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });
      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        return data
      }
    },
    async getCompany(company) {
      const res = await fetch(`/api/companies/${company}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });
      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        return data
      }
    },



  },
});
