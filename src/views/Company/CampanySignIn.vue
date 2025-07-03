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
      status:'',
    };
  },
  methods: {
    handleLogin() {
      axios
        .post(
          "https://bizethio-backend-production-4c6c.up.railway.app/api/company/login",
          {
            email: this.email,
            password: this.password,
          }
        )
        .then((response) => {
          console.log('status',response.data.status);
          // Handle successful login here, e.g., redirect to another page or store token
        });
    },
  },
};
</script>

<style></style>
