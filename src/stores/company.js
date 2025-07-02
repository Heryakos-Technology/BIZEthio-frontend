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
      const res = await fetch("https://bizethio-backend-production-4c6c.up.railway.app/api/companies", {
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
    async getCompany(companyId) {
      if (localStorage.getItem("all_companies")) {
        const allCompanies = JSON.parse(localStorage.getItem("all_companies"));
        const company = allCompanies.find((c) => c.id === parseInt(companyId));
        if (company) {
          return company;
        }
      }

      const res = await fetch(`https://bizethio-backend-production-4c6c.up.railway.app/api/companies/${companyId}`, {
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

      localStorage.removeItem("all_companies");
      const res = await fetch(`https://bizethio-backend-production-4c6c.up.railway.app/api/companies/${company}`, {
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