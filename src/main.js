import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth } from './firebase';
import ToastPlugin from 'vue-toast-notification';
import { onAuthStateChanged } from "firebase/auth";
import VueApexCharts from 'vue3-apexcharts';
import App from './App.vue'
import router from './router'
import 'leaflet/dist/leaflet.css';

const app = createApp(App)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('No user is signed in.');
  }
});
app.use(createPinia())
app.use(router)
app.use(VueApexCharts);
app.use(ToastPlugin);
app.mount('#app')
