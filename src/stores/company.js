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
      const res = await fetch("https://bizethio-backend-production.up.railway.app/api/companies", {
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
        return data
      }
    },



  },
});
