import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      errors: {},
      user: null,
    };
  },

  actions: {


    /********************* Get All Users  ********************** */
    async getAllUsers() {
      const res = await fetch('https://bizethio-backend-production-d484.up.railway.app/api/users', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,

        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },

    /********************* Delete User  ********************** */
    async deleteUsers(userId) {
      const res = await fetch(`https://bizethio-backend-production-d484.up.railway.app/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,

        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      const userData = res.data
      console.log('dataaaa', userData);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },


    /********************* Update User Profile  ********************** */
    async updateUser(userData) {
      const res = await fetch('https://bizethio-backend-production-d484.up.railway.app/api/users/', {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.user = data;
        return data;
      }
    },

  },
});
