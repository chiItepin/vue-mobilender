import { createApp, reactive, readonly } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';
import 'element-plus/lib/theme-chalk/display.css';

const state = reactive({
   authToken: localStorage.getItem('token') ? localStorage.getItem('token') : '',
   email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
});

const setAuth = (token, email) => {
   state.authToken = token;
   state.email = email;
};

const logOut = () => {
   state.authToken = '';
   state.email = '';
   localStorage.removeItem('token');
   localStorage.removeItem('email');
};

export const store = readonly({
   state,
   setAuth,
   logOut,
 });

createApp(App).use(router, ElementPlus).mount('#app');
