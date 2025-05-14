<template>
  <div>
    <input
      type="text"
      v-model="email"
      class="border-2 border-gray-300 rounded-md p-2"
      placeholder="Email"
    />
    <input type="text" v-model="password" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      axios
        .post(
          "https://bizethio-backend-production-d484.up.railway.app/api/company/login",
          {
            email: this.email,
            password: this.password,
          }
        )
        .then((response) => {
          console.log(response.data);
          // Handle successful login here, e.g., redirect to another page or store token
        });
    },
  },
};
</script>

<style></style>
