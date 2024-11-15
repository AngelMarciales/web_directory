import { createApp } from 'vue'
import './plugins/yup-config.js'; 
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import router from './router'; 
import { useUserStore } from "./stores/user";

const app = createApp(App);
const pinia = createPinia();

console.log(import.meta.env.VITE_API_URL);

app.use(pinia); 
app.use(router); 

const userStore = useUserStore();
userStore.loadUserData();


app.mount('#app');
