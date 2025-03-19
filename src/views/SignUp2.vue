<template>
    <div>
      <h1>Login</h1>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleLogin">Login</button>
      <button @click="handleRegister">Register</button>
    </div>
  </template>
  
  <script>
  import { login, register } from '../auth';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async handleLogin() {
        try {
          await login(this.email, this.password);
          alert('Logged in successfully!');
        } catch (error) {
          alert(error.message);
        }
      },
      async handleRegister() {
        try {
          await register(this.email, this.password);
          alert('Registered successfully!');
        } catch (error) {
          alert(error.message);
        }
      }
    }
  };
  </script>
  