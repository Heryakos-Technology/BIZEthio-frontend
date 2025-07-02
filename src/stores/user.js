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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',

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
      console.log('data', data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },


    /********************* Update User Profile  ********************** */
    async updateUser(user) {
      const res = await fetch(`https://bizethio-backend-production-d484.up.railway.app/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(user),
      });


      console.log("data in userStore: ", user);

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.user = data;
        return data;
      }
    },

  },
});
