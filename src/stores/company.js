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
      if (localStorage.getItem("all_companies")) {
        return JSON.parse(localStorage.getItem("all_companies"));
      }
      const res = await fetch("https://bizethio-backend-production-944c.up.railway.app/api/companies", {
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
        localStorage.setItem("all_companies", JSON.stringify(data));
        return data
      }
    },
    async getCompany(company) {
      const res = await fetch(`https://bizethio-backend-production-944c.up.railway.app/api/companies/${company}`, {
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

    async updateCompany(payload, company) {
      const res = await fetch(`https://bizethio-backend-production-944c.up.railway.app/api/companies/${company}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        this.errors = data.errors;
        return { success: false, error: data.errors };
      } else {
        this.errors = {};
        return { success: true, data: data };
      }
    },


  },
});