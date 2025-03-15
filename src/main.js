import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth } from './firebase'; 
import { onAuthStateChanged } from "firebase/auth";
import App from './App.vue'
import router from './router'

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

app.mount('#app')
